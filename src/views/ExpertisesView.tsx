import React from 'react';
import { EXPERTISES } from '../data/btpData';
import { ArrowRight, Check, Compass, Building2, HardHat, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import pontBordMerImg from '../assets/images/gabon_pont_bord_mer_1790147890714.jpg';
import { EsBtpAccentBar } from '../components/EsBtpAccentBar';
import { ZoomReveal } from '../components/ZoomReveal';
import { MotionImage } from '../components/MotionImage';

interface ExpertisesViewProps {
  onOpenContactForExpertise: (domain: string) => void;
}

export const ExpertisesView: React.FC<ExpertisesViewProps> = ({
  onOpenContactForExpertise,
}) => {
  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* HERO HEADER — AVEC OUVRAGE D'ART & BORD DE MER DU GABON */}
      {/* ============================================================ */}
      <section className="relative bg-[#081320] text-white py-16 sm:py-24 border-b border-slate-800 overflow-hidden">
        {/* Image de fond : Pont et Boulevard Maritime du Gabon */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={pontBordMerImg}
            alt="Ouvrages d'art, ponts et voiries maritimes - ES-BTP"
            className="w-full h-full object-cover object-center opacity-70 transform scale-102"
            referrerPolicy="no-referrer"
          />
          {/* Beau fondu progressif sur les côtés */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#081320] via-[#081320]/80 via-20% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#081320] via-[#081320]/80 via-20% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081320] via-[#081320]/40 to-[#081320]/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-[#FAB005]/40 rounded-full mb-4 backdrop-blur-md">
                <Compass className="w-3.5 h-3.5 text-[#FAB005]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#FAB005]">
                  Savoir-Faire & Métiers
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-4 text-white drop-shadow-md">
                NOS EXPERTISES
              </h1>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed drop-shadow-sm">
                Une maîtrise technique transversale pour concevoir, dimensionner et bâtir les ouvrages structurants avec une exigence de longévité.
              </p>
              <div className="mt-4">
                <EsBtpAccentBar />
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* Expertise Detailed Sections avec cartes arrondies et icônes */}
      <div className="divide-y divide-slate-100 bg-white">
        {EXPERTISES.map((exp, index) => {
          const isEven = index % 2 === 1;

          return (
            <section
              key={exp.id}
              id={exp.id}
              className="py-16 sm:py-24"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ZoomReveal>
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Colonne Photo arrondie avec apparition mixte */}
                    <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative w-full bg-slate-900 border border-slate-200 overflow-hidden rounded-2xl shadow-xl group">
                        <MotionImage
                          src={exp.image}
                          alt={`Expertise ${exp.title} par ES-BTP`}
                          aspectRatio="aspect-4/3"
                          index={index}
                          variant={isEven ? 'slide-left' : 'slide-right'}
                          cornerAccents={true}
                          hoverScale={true}
                        />
                        <div className="absolute top-4 left-4 bg-[#0B1320]/90 backdrop-blur-md text-white px-3 py-1.5 text-xs font-mono font-bold tracking-wider rounded-lg border-l-2 border-[#FAB005] shadow-md flex items-center gap-2 z-10">
                          <Layers className="w-3.5 h-3.5 text-[#FAB005]" />
                          <span>PÔLE TECHNIQUE 0{index + 1}</span>
                        </div>
                      </div>
                    </div>

                    {/* Colonne Textes & Compétences */}
                    <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-0.5 bg-[#FAB005] rounded-full" />
                        <span className="text-xs uppercase tracking-widest font-extrabold text-[#0B1320]">
                          Domaine d'intervention spécialisé
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight mb-4">
                        {exp.title}
                      </h2>

                      <p className="text-base text-slate-600 leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Liste des prestations clés */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 mb-8 shadow-xs">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-4">
                          <Sparkles className="w-4 h-4 text-[#FAB005]" />
                          <span>Prestations & capacités opérationnelles :</span>
                        </div>

                        <ul className="space-y-3">
                          {exp.typesDeTravaux.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-3 text-sm text-slate-700">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </span>
                              <span className="leading-snug">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => onOpenContactForExpertise(exp.title)}
                        className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer font-heading"
                      >
                        <span>Consulter nos ingénieurs pour ce domaine</span>
                        <ArrowRight className="w-4 h-4 text-[#0B1320]" />
                      </button>
                    </div>
                  </div>
                </ZoomReveal>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
