import React from 'react';
import { Sparkles, ShieldCheck, Award, ArrowRight, HardHat, Compass, Activity, Zap } from 'lucide-react';
import { EsBtpAccentBar } from './EsBtpAccentBar';

export type BannerTheme = 'gold-navy' | 'gabon-prestige' | 'electric-cyan' | 'warm-amber';

interface FuturisticBannerProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  onCtaClick?: () => void;
  ctaText?: string;
  theme?: BannerTheme;
  className?: string;
}

export const FuturisticBanner: React.FC<FuturisticBannerProps> = ({
  title = 'HORIZON 2030+ · L’INGÉNIERIE D’AVENIR DU GABON',
  subtitle = 'ES-BTP déploie des standards de pointe en génie civil, ouvrages d’art et infrastructures durables.',
  tagline = 'INNOVATION & HAUTE EXIGENCE',
  onCtaClick,
  ctaText = 'Découvrir nos réalisations',
  theme = 'gold-navy',
  className = '',
}) => {
  // Config selon le thème de couleur fluide
  const getThemeStyles = () => {
    switch (theme) {
      case 'gabon-prestige':
        return {
          bg: 'bg-gradient-to-r from-[#071912] via-[#0b2535] to-[#1a1c0d]',
          border: 'border-emerald-500/40 hover:border-[#FAB005]/60',
          halo1: 'bg-emerald-500/25',
          halo2: 'bg-[#FAB005]/20',
          halo3: 'bg-blue-500/20',
          accent: '#FAB005',
          tagBg: 'bg-emerald-950/80 border-emerald-400/40 text-emerald-300',
        };
      case 'electric-cyan':
        return {
          bg: 'bg-gradient-to-r from-[#071329] via-[#0d2247] to-[#0a1829]',
          border: 'border-cyan-500/40 hover:border-cyan-300/60',
          halo1: 'bg-cyan-500/25',
          halo2: 'bg-blue-600/30',
          halo3: 'bg-[#FAB005]/15',
          accent: '#38BDF8',
          tagBg: 'bg-cyan-950/80 border-cyan-400/40 text-cyan-300',
        };
      case 'warm-amber':
        return {
          bg: 'bg-gradient-to-r from-[#1c1206] via-[#2a1708] to-[#120e09]',
          border: 'border-amber-500/40 hover:border-amber-300/60',
          halo1: 'bg-amber-500/30',
          halo2: 'bg-orange-600/20',
          halo3: 'bg-yellow-400/15',
          accent: '#F59E0B',
          tagBg: 'bg-amber-950/80 border-amber-400/40 text-amber-300',
        };
      case 'gold-navy':
      default:
        return {
          bg: 'bg-gradient-to-r from-[#07111E] via-[#0e213b] to-[#07111E]',
          border: 'border-slate-700/80 hover:border-[#FAB005]/60',
          halo1: 'bg-[#FAB005]/20',
          halo2: 'bg-[#163A63]/60',
          halo3: 'bg-cyan-500/20',
          accent: '#FAB005',
          tagBg: 'bg-white/10 border-[#FAB005]/40 text-[#FAB005]',
        };
    }
  };

  const t = getThemeStyles();

  return (
    <div className={`relative overflow-hidden rounded-xs border ${t.border} ${t.bg} shadow-2xl text-white my-8 transition-all duration-300 ${className}`}>
      {/* Trame de fond futuriste avec halos lumineux colorés ultra-fluides */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grille tech blueprint */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(to right, #FAB005 1px, transparent 1px), linear-gradient(to bottom, #FAB005 1px, transparent 1px)',
            backgroundSize: '2.5rem 2.5rem',
          }}
        />

        {/* Halos colorés fluides vivants */}
        <div className={`absolute -top-20 -left-20 w-80 h-80 ${t.halo1} rounded-full filter blur-[80px] animate-pulse`} />
        <div className={`absolute -bottom-20 -right-20 w-96 h-96 ${t.halo2} rounded-full filter blur-[100px]`} />
        <div className={`absolute top-1/2 right-1/4 w-64 h-64 ${t.halo3} rounded-full filter blur-[80px]`} />

        {/* Liseré lumineux supérieur animé */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${t.accent} 50%, transparent 100%)`,
          }}
        />
      </div>

      {/* Contenu de la bannière */}
      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-3xl">
          {/* Badge haute technologie */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-xs mb-3 backdrop-blur-md ${t.tagBg}`}>
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: t.accent }} />
            <span className="text-[10.5px] uppercase font-mono tracking-widest font-bold">
              {tagline}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading tracking-tight text-white leading-tight">
            {title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          {/* Micro-barre design ES-BTP */}
          <div className="mt-4">
            <EsBtpAccentBar variant="compact" />
          </div>
        </div>

        {/* Métriques / Badges futuristes à droite */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xs backdrop-blur-xs">
              <div className="flex items-center justify-center gap-1 font-black text-sm" style={{ color: t.accent }}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100%</span>
              </div>
              <p className="text-[9.5px] font-mono text-slate-400 uppercase mt-0.5">Normes QHSE</p>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xs backdrop-blur-xs">
              <div className="flex items-center justify-center gap-1 font-black text-sm" style={{ color: t.accent }}>
                <Activity className="w-3.5 h-3.5" />
                <span>9 Prov.</span>
              </div>
              <p className="text-[9.5px] font-mono text-slate-400 uppercase mt-0.5">Gabon</p>
            </div>
          </div>

          {onCtaClick && (
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] rounded-xs shadow-lg transition-all cursor-pointer group hover:scale-102"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
