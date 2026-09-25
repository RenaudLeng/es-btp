import React, { useEffect, useState } from 'react';
import { useLogo } from '../context/LogoContext';

export interface EsBtpLogoProps {
  variant?: 'light' | 'dark'; // 'dark' = for light/white backgrounds; 'light' = for dark navy backgrounds
  mode?: 'horizontal' | 'full' | 'emblem';
  showSignature?: boolean;
  showCategories?: boolean;
  className?: string;
  height?: number | string;
  withGlow?: boolean; // Lueur subtile et design autour du logo (actif par défaut)
}

export const EsBtpLogo: React.FC<EsBtpLogoProps> = ({
  variant = 'dark',
  mode = 'horizontal',
  className = '',
  height,
  withGlow = true,
}) => {
  const { customLogoUrl } = useLogo();
  const isLight = variant === 'light';
  const [cleanedCustomLogoUrl, setCleanedCustomLogoUrl] = useState<string | null>(customLogoUrl);

  // Automatically remove any solid white background from uploaded logos so they blend flawlessly into photos/banners
  useEffect(() => {
    if (!customLogoUrl) {
      setCleanedCustomLogoUrl(null);
      return;
    }

    // Attempt client-side canvas transparency for uploaded JPG/PNG with white backgrounds
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setCleanedCustomLogoUrl(customLogoUrl);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Sample corners to detect if background is white/near-white
        const corners = [
          0,
          (canvas.width - 1) * 4,
          ((canvas.height - 1) * canvas.width) * 4,
          ((canvas.height - 1) * canvas.width + (canvas.width - 1)) * 4,
        ];
        const isWhiteCorner = corners.some(
          (idx) => data[idx] > 230 && data[idx + 1] > 230 && data[idx + 2] > 230
        );

        if (isWhiteCorner) {
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            if (r > 228 && g > 228 && b > 228) {
              const minChannel = Math.min(r, g, b);
              if (minChannel > 248) {
                data[i + 3] = 0; // 100% transparent
              } else {
                // smooth edge anti-aliasing
                data[i + 3] = Math.round(data[i + 3] * ((255 - minChannel) / 27));
              }
            }
          }
          ctx.putImageData(imgData, 0, 0);
          setCleanedCustomLogoUrl(canvas.toDataURL('image/png'));
        } else {
          setCleanedCustomLogoUrl(customLogoUrl);
        }
      } catch {
        setCleanedCustomLogoUrl(customLogoUrl);
      }
    };
    img.onerror = () => setCleanedCustomLogoUrl(customLogoUrl);
    img.src = customLogoUrl;
  }, [customLogoUrl]);

  // Classe de lueur vectorielle élégante et subtile sur l'image
  const imageGlowClass = withGlow
    ? isLight
      ? 'filter drop-shadow-[0_0_12px_rgba(250,176,5,0.38)] drop-shadow-[0_0_24px_rgba(56,189,248,0.22)] drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)]'
      : 'filter drop-shadow-[0_0_9px_rgba(250,176,5,0.32)] drop-shadow-[0_0_2px_rgba(250,176,5,0.40)] drop-shadow-[0_2px_8px_rgba(12,21,35,0.08)]'
    : isLight
    ? 'filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]'
    : '';

  // Halo d'ambiance doux et diffus à 360° pour mettre le logo en valeur avec subtilité
  const renderAuraGlow = () => {
    if (!withGlow) return null;
    return (
      <>
        {/* Halo d'ambiance doux et diffus */}
        <span
          className={`absolute -inset-x-3.5 -inset-y-2 rounded-full pointer-events-none transition-all duration-700 animate-logo-aura ${
            isLight
              ? 'bg-[radial-gradient(ellipse_at_center,rgba(250,176,5,0.25)_0%,rgba(56,189,248,0.18)_45%,transparent_75%)]'
              : 'bg-[radial-gradient(ellipse_at_center,rgba(250,176,5,0.20)_0%,rgba(56,189,248,0.10)_48%,transparent_75%)]'
          }`}
          aria-hidden="true"
        />
        {/* Micro-lueur centrale au cœur du logo pour un relief design haut de gamme */}
        <span
          className={`absolute -inset-x-1.5 -inset-y-1 rounded-full pointer-events-none transition-opacity duration-500 blur-xs ${
            isLight ? 'bg-[#FAB005]/15 opacity-80' : 'bg-[#FAB005]/12 opacity-70'
          }`}
          aria-hidden="true"
        />
      </>
    );
  };

  // 1. If user uploaded a custom logo image, use it with guaranteed transparency and enhanced visibility on dark backgrounds
  if (customLogoUrl) {
    return (
      <div className={`relative inline-flex items-center select-none bg-transparent group/logo ${className}`}>
        {renderAuraGlow()}
        <img
          src={cleanedCustomLogoUrl || customLogoUrl}
          alt="ES-BTP"
          style={{ height: height || undefined }}
          className={`relative z-10 w-auto object-contain bg-transparent transition-all duration-300 group-hover/logo:scale-[1.015] ${
            isLight
              ? 'filter drop-shadow-[0_0_12px_rgba(250,176,5,0.38)] drop-shadow-[0_0_24px_rgba(56,189,248,0.22)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] brightness-105'
              : 'filter drop-shadow-[0_0_8px_rgba(250,176,5,0.30)] drop-shadow-[0_2px_8px_rgba(12,21,35,0.08)]'
          } ${
            !height ? (mode === 'horizontal' ? 'h-11 sm:h-12' : 'h-16 sm:h-20') : ''
          }`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // 2. Official High-Fidelity Vector Logo
  if (mode === 'emblem') {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none bg-transparent group/logo ${className}`}
        style={{ height: height || '44px', width: height || '44px' }}
      >
        {renderAuraGlow()}
        <img
          src={isLight ? '/logo-es-btp-white.svg' : '/logo-es-btp.svg'}
          alt="ES-BTP Emblème"
          className={`relative z-10 w-full h-full object-contain bg-transparent transition-all duration-300 group-hover/logo:scale-[1.02] ${imageGlowClass}`}
        />
      </div>
    );
  }

  if (mode === 'horizontal') {
    const horizontalSvg = isLight ? '/logo-es-btp-horizontal-white.svg' : '/logo-es-btp-horizontal.svg';
    return (
      <div className={`relative inline-flex items-center select-none bg-transparent group/logo ${className}`}>
        {renderAuraGlow()}
        <img
          src={horizontalSvg}
          alt="ES-BTP Gabon"
          style={{ height: height || undefined }}
          className={`relative z-10 w-auto object-contain bg-transparent transition-all duration-300 group-hover/logo:scale-[1.015] ${imageGlowClass} ${
            !height
              ? 'h-10 sm:h-12 md:h-13 max-w-[280px] sm:max-w-[340px] md:max-w-[380px]'
              : 'max-w-full'
          }`}
        />
      </div>
    );
  }

  // mode === 'full' (Vertical / Complete Official Logo)
  const fullSvg = isLight ? '/logo-es-btp-white.svg' : '/logo-es-btp.svg';
  return (
    <div className={`relative inline-flex flex-col items-center text-center select-none bg-transparent group/logo ${className}`}>
      {renderAuraGlow()}
      <img
        src={fullSvg}
        alt="ES-BTP - Le futur se construit maintenant"
        style={{ height: height || undefined }}
        className={`relative z-10 w-auto max-w-full object-contain bg-transparent transition-all duration-300 group-hover/logo:scale-[1.015] ${imageGlowClass} ${
          !height ? 'h-24 sm:h-32 md:h-36' : ''
        }`}
      />
    </div>
  );
};

