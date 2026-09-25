import React from 'react';

export interface SocialLinksProps {
  variant?: 'light' | 'dark' | 'color' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
  whatsappNumber?: string; // e.g. "+24177000000" or empty
}

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.94-4.47V8.75a8.28 8.28 0 0 0 4.83 1.55V6.85c-.34-.01-.68-.06-1-.16z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const SOCIAL_PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'ES-BTP Officiel',
    url: 'https://www.facebook.com/search/top?q=ES-BTP%20Gabon',
    color: '#1877F2',
    hoverBg: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    icon: FacebookIcon,
    description: 'Suivez nos chantiers en direct et l’actualité des ouvrages',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@esbtp.gabon',
    url: 'https://www.tiktok.com',
    color: '#000000',
    hoverBg: 'hover:bg-black hover:text-[#00f2fe] hover:border-black',
    icon: TikTokIcon,
    description: 'Coulisses de nos équipes, engins et réalisations en vidéo',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: 'Direct Projets',
    url: 'https://wa.me/24177088346?text=Bonjour%20ES-BTP%2C%20je%20souhaite%20des%20renseignements%20sur%20vos%20projets%20et%20prestations.',
    color: '#25D366',
    hoverBg: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
    icon: WhatsAppIcon,
    description: 'Échangez instantanément avec notre service technique',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'ES-BTP Bâtiment & Travaux',
    url: 'https://www.youtube.com',
    color: '#FF0000',
    hoverBg: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]',
    icon: YouTubeIcon,
    description: 'Reportages complets, documentaires chantiers et vue aérienne',
  },
];

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'gold',
  size = 'md',
  showLabels = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 sm:w-10 sm:h-10 text-sm',
    lg: 'w-11 h-11 sm:w-12 sm:h-12 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
    lg: 'w-5 h-5 sm:w-5.5 sm:h-5.5',
  };

  const getVariantClasses = (platform: typeof SOCIAL_PLATFORMS[0]) => {
    switch (variant) {
      case 'gold':
        return 'bg-white/5 border border-slate-700/80 text-slate-300 hover:text-[#0B1320] hover:bg-[#FAB005] hover:border-[#FAB005] hover:shadow-lg hover:shadow-amber-500/20';
      case 'light':
        return 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-white ' + platform.hoverBg;
      case 'dark':
        return 'bg-[#0B1320] border border-slate-800 text-slate-300 hover:text-white ' + platform.hoverBg;
      case 'color':
      default:
        return 'bg-white border border-slate-200 text-slate-700 shadow-xs ' + platform.hoverBg;
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {SOCIAL_PLATFORMS.map((platform) => {
        const IconComponent = platform.icon;
        return (
          <a
            key={platform.id}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${platform.name} · ${platform.description}`}
            aria-label={`Rejoindre ES-BTP sur ${platform.name}`}
            className={`group inline-flex items-center gap-2 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 ${
              showLabels ? 'px-3.5 py-1.5' : sizeClasses[size]
            } ${getVariantClasses(platform)} ${
              showLabels ? 'border' : 'justify-center'
            }`}
          >
            <IconComponent className={iconSizes[size]} />
            {showLabels && (
              <span className="text-xs font-bold uppercase tracking-wider font-heading">
                {platform.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <aside aria-label="WhatsApp ES-BTP" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/24177088346?text=Bonjour%20ES-BTP%2C%20je%20souhaite%20des%20renseignements%20sur%20vos%20travaux%20et%20chantiers."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40 cursor-pointer"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>
    </aside>
  );
};
