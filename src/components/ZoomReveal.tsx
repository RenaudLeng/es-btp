import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant =
  | 'up'
  | 'left'
  | 'right'
  | 'zoom-in'
  | 'zoom-out'
  | 'rotate-left'
  | 'rotate-right'
  | 'mixed';

export interface ZoomRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // millisecondes manuelles
  threshold?: number;
  initialScale?: number; // Rétrocompatibilité
  variant?: RevealVariant;
  index?: number; // Index dans une grille/liste pour panacher automatiquement
}

const MIXED_SEQUENCE: RevealVariant[] = [
  'up',
  'zoom-out',
  'left',
  'right',
  'rotate-left',
  'rotate-right',
  'zoom-in',
];

export const ZoomReveal: React.FC<ZoomRevealProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  variant,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Détermination du mouvement sélectionné :
  // Si variant === 'mixed', ou si index est fourni sans variante explicite, on alterne intelligemment
  let resolvedVariant: RevealVariant = 'up';
  if (variant === 'mixed' || (!variant && index !== undefined)) {
    const sequenceIndex = (index ?? 0) % MIXED_SEQUENCE.length;
    resolvedVariant = MIXED_SEQUENCE[sequenceIndex];
  } else if (variant) {
    resolvedVariant = variant;
  }

  // Calcul du délai échelonné automatique si index est spécifié et delay non forcé
  const effectiveDelay = delay > 0 ? delay : index !== undefined ? Math.min(index * 90, 450) : 0;

  // Classe CSS de départ selon la variante
  const variantClass =
    resolvedVariant === 'left'
      ? 'reveal-left'
      : resolvedVariant === 'right'
      ? 'reveal-right'
      : resolvedVariant === 'zoom-in'
      ? 'reveal-zoom-in'
      : resolvedVariant === 'zoom-out'
      ? 'reveal-zoom-out'
      : resolvedVariant === 'rotate-left'
      ? 'reveal-rotate-left'
      : resolvedVariant === 'rotate-right'
      ? 'reveal-rotate-right'
      : 'reveal-up';

  useEffect(() => {
    const currentEl = elementRef.current;
    if (!currentEl) return;

    // Détection immédiate si l'élément est déjà dans le viewport initial (évite tout retard au premier chargement)
    const rect = currentEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      style={{
        transitionDelay: effectiveDelay ? `${effectiveDelay}ms` : undefined,
      }}
      className={`reveal-item ${variantClass} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

