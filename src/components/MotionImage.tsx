import React, { useEffect, useRef, useState } from 'react';

export type MotionImageVariant =
  | 'auto'
  | 'zoom-out'
  | 'zoom-in'
  | 'slide-up'
  | 'slide-left'
  | 'slide-right'
  | 'tilt-left'
  | 'tilt-right';

interface MotionImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. "aspect-4/3", "aspect-16/10", "aspect-16/9", "aspect-square"
  variant?: MotionImageVariant;
  index?: number;
  delay?: number;
  containerClassName?: string;
  imageClassName?: string;
  showSheen?: boolean;
  cornerAccents?: boolean;
  hoverScale?: boolean;
}

const MOTION_ROTATION: MotionImageVariant[] = [
  'zoom-out',
  'slide-up',
  'slide-left',
  'zoom-in',
  'slide-right',
  'tilt-left',
  'tilt-right',
];

export const MotionImage: React.FC<MotionImageProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-4/3',
  variant = 'auto',
  index,
  delay = 0,
  containerClassName = '',
  imageClassName = '',
  showSheen = true,
  cornerAccents = false,
  hoverScale = true,
  className = '',
  loading = 'lazy',
  ...imgProps
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Vérifier si l'image est déjà en cache lors du montage
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  // Résolution de la variante de mouvement
  let resolvedVariant: MotionImageVariant = 'zoom-out';
  if (variant === 'auto' || index !== undefined) {
    const idx = (index ?? 0) % MOTION_ROTATION.length;
    resolvedVariant = variant !== 'auto' ? variant : MOTION_ROTATION[idx];
  } else {
    resolvedVariant = variant;
  }

  // Calcul du délai pour apparition en cascade
  const effectiveDelay = delay > 0 ? delay : index !== undefined ? Math.min(index * 90, 450) : 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Si déjà visible à l'écran dès l'ouverture
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Transformation initiale selon la variante (60fps matériel via CSS)
  const getInitialTransformClass = () => {
    switch (resolvedVariant) {
      case 'slide-up':
        return 'translate-y-8';
      case 'slide-left':
        return 'translate-x-8';
      case 'slide-right':
        return '-translate-x-8';
      case 'zoom-in':
        return 'scale-90';
      case 'zoom-out':
        return 'scale-108';
      case 'tilt-left':
        return 'translate-y-6 -rotate-1';
      case 'tilt-right':
        return 'translate-y-6 rotate-1';
      default:
        return 'translate-y-6';
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        transitionDelay: effectiveDelay ? `${effectiveDelay}ms` : undefined,
      }}
      className={`relative w-full ${aspectRatio} overflow-hidden bg-[#07111E] ${
        showSheen ? 'img-sheen' : ''
      } ${isIntersecting ? 'is-revealed' : ''} ${containerClassName}`}
    >
      {/* Texture d'attente technique & discrète */}
      <div
        className={`absolute inset-0 bg-slate-900 transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Image avec animation mixte fluide */}
      {!hasError ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          style={{
            transitionDelay: effectiveDelay ? `${effectiveDelay}ms` : undefined,
          }}
          className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${
            isIntersecting
              ? 'opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0'
              : `opacity-0 ${getInitialTransformClass()}`
          } ${
            hoverScale ? 'group-hover:scale-105 transition-transform duration-500' : ''
          } ${imageClassName} ${className}`}
          {...imgProps}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0B1523] to-slate-950 p-6 text-center">
          <div className="w-10 h-10 rounded-full bg-[#FAB005]/10 border border-[#FAB005]/30 flex items-center justify-center mb-2">
            <span className="text-[#FAB005] font-black text-xs">ES</span>
          </div>
          <span className="text-xs font-semibold text-slate-300">{alt}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">ES-BTP Gabon</span>
        </div>
      )}

      {/* Éléments de cadrage architectural facultatifs */}
      {cornerAccents && (
        <>
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FAB005] pointer-events-none opacity-80" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FAB005] pointer-events-none opacity-80" />
        </>
      )}
    </div>
  );
};
