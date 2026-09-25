import React from 'react';
import { Handshake, ShieldCheck, Sparkles } from 'lucide-react';
import { FuturisticMeshBackdrop } from './FuturisticMeshBackdrop';

export interface CompactPartner {
  id: string;
  name: string;
  logoSrc: string;
  logoBg?: string;
  badgeWidth?: string;
}

export const PARTNERS_COMPACT: CompactPartner[] = [
  {
    id: 'rl-services',
    name: 'RL Services.Inc · Conception & Digital',
    logoSrc: '/partners/rl_services.jpg',
    logoBg: 'bg-white',
    badgeWidth: 'w-44 sm:w-52',
  },
  {
    id: 'totalenergies',
    name: 'TotalEnergies',
    logoSrc: '/partners/totalenergies.svg',
    logoBg: 'bg-white',
    badgeWidth: 'w-44 sm:w-52',
  },
  {
    id: 'bgfi',
    name: 'BGFIBank',
    logoSrc: '/partners/bgfi.png',
    logoBg: 'bg-white',
    badgeWidth: 'w-44 sm:w-52',
  },
  {
    id: 'gsez',
    name: 'GSEZ Nkok',
    logoSrc: '/partners/gsez.png',
    logoBg: 'bg-white',
    badgeWidth: 'w-44 sm:w-52',
  },
  {
    id: 'ministere-tp',
    name: 'Travaux Publics Gabon',
    logoSrc: '/partners/ministere_tp.svg',
    logoBg: 'bg-white',
    badgeWidth: 'w-36 sm:w-44',
  },
  {
    id: 'mairie-libreville',
    name: 'Ville de Libreville',
    logoSrc: '/partners/mairie_libreville.svg',
    logoBg: 'bg-white',
    badgeWidth: 'w-36 sm:w-44',
  },
  {
    id: 'sobraga',
    name: 'Groupe Sobraga',
    logoSrc: '/partners/sobraga.png',
    logoBg: 'bg-white',
    badgeWidth: 'w-44 sm:w-52',
  },
  {
    id: 'mika-services',
    name: 'Mika Services',
    logoSrc: '/partners/mika_services.svg',
    logoBg: 'bg-[#0B1320]',
    badgeWidth: 'w-48 sm:w-56',
  },
  {
    id: 'angti',
    name: 'A.N.G.T.I.',
    logoSrc: '/partners/angti.svg',
    logoBg: 'bg-[#07111E]',
    badgeWidth: 'w-48 sm:w-56',
  },
];

// Déduplication exacte (2 jeux complets) pour un défilement infini -50% parfaitement transparent et continu
const CIRCULATING_PARTNERS = [
  ...PARTNERS_COMPACT,
  ...PARTNERS_COMPACT,
];

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#08121E] text-white relative overflow-hidden border-t border-b border-slate-800/80">
      {/* Fond fluide et trame futuriste discrète */}
      <FuturisticMeshBackdrop variant="dark" showGrid={false} />

      {/* Halos lumineux subtils */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 bg-[#FAB005]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        {/* En-tête sobre et épuré */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-[#FAB005]/30 rounded-full mb-3 backdrop-blur-md">
            <Handshake className="w-3.5 h-3.5 text-[#FAB005]" />
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#FAB005] font-bold">
              Références & Partenaires
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
            ILS NOUS FONT CONFIANCE
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Grandes institutions publiques, géants industriels et concepteurs de référence.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BANDE CIRCULANTE CONTINUE (DÉFILEMENT INFINI HORIZONTAL)     */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Masque dégradé gauche pour fondu fluide */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#08121E] via-[#08121E]/90 to-transparent z-20 pointer-events-none" />

        {/* Masque dégradé droite pour fondu fluide */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#08121E] via-[#08121E]/90 to-transparent z-20 pointer-events-none" />

        {/* Ligne continue de logos sans texte en bas */}
        <div className="flex items-center gap-4 sm:gap-6 animate-marquee-flow hover:[animation-play-state:paused] cursor-pointer">
          {CIRCULATING_PARTNERS.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className={`h-20 sm:h-24 ${
                partner.badgeWidth || 'w-44 sm:w-52'
              } ${partner.logoBg || 'bg-white'} rounded-2xl border border-slate-700/60 hover:border-[#FAB005] shadow-lg hover:shadow-2xl flex items-center justify-center p-3 sm:p-4 shrink-0 transition-all duration-300 transform hover:scale-105 group select-none`}
              title={partner.name}
            >
              <img
                src={partner.logoSrc}
                alt={partner.name}
                className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Ligne discrète de réassurance et d'attribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#FAB005]" />
          <span>Marchés publics & projets d'envergure exécutés au Gabon</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <span>Conception & Architecture Digitale :</span>
          <span className="font-bold text-white flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            RL Services.Inc
          </span>
        </div>
      </div>
    </section>
  );
};
