import React from 'react';
import { COMMITMENTS } from '../data/btpData';
import { ArrowRight, ShieldCheck, CheckCircle2, Award, HardHat, Compass, Leaf, Sparkles } from 'lucide-react';
import estuaireNatureImg from '../assets/images/gabon_estuaire_nature_1790147925382.jpg';
import { EsBtpAccentBar } from '../components/EsBtpAccentBar';
import { ZoomReveal } from '../components/ZoomReveal';

interface EngagementsViewProps {
  onOpenContact: () => void;
}

export const EngagementsView: React.FC<EngagementsViewProps> = ({ onOpenContact }) => {
  const detailedEngagements = [
    {
      title: 'QUALITÉ',
      subtitle: 'Exigence d’exécution et fidélité aux cahiers des charges',
      icon: Award,
      text: 'Une attention portée à la qualité d’exécution et aux exigences propres à chaque projet.',
      points: [
        'Sélection contrôlée des agrégats, fers à béton et liants hydrauliques',
        'Contrôles systématiques de compactage et d’affaissement (Slump test)',
        'Audits d’avancement et suivi rigoureux des procès-verbaux de réception',
      ],
    },
    {
      title: 'RIGUEUR',
      subtitle: 'Organisation méthodique et pilotage des flux',
      icon: Compass,
      text: 'Une organisation structurée pour accompagner chaque étape du projet.',
      points: [
        'Planification opérationnelle et respect des jalons d’intervention',
        'Gestion anticipée des approvisionnements sur le territoire national',
        'Coordination technique fluide entre maîtrise d’œuvre et encadrement',
      ],
    },
    {
      title: 'SÉCURITÉ',
      subtitle: 'Protection des personnes et prévention des risques',
      icon: ShieldCheck,
      text: 'La sécurité occupe une place centrale dans la conduite des travaux et l’organisation des chantiers.',
      points: [
        'Port obligatoire des Équipements de Protection Individuelle (EPI)',
        'Briefings quotidiens de sécurité et identification des zones à risque',
        'Sécurisation périmétrique des chantiers et signalisation routière conforme',
      ],
    },
    {
      title: 'DURABILITÉ',
      subtitle: 'Pérennité des ouvrages et respect du milieu naturel',
      icon: Leaf,
      text: 'Concevoir des ouvrages pensés pour leur usage et leur pérennité face aux contraintes climatiques équatoriales.',
      points: [
        'Dimensionnement adapté au régime pluviométrique équatorial',
        'Gestion des écoulements et prévention de l’érosion des talus',
        'Gestion responsable des déchets de chantier et limitation des nuisances',
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* HERO HEADER — AVEC ESTUAIRE & NATURE DU GABON */}
      {/* ============================================================ */}
      <section className="relative bg-[#081320] text-white py-16 sm:py-24 border-b border-slate-800 overflow-hidden">
        {/* Image de fond : Estuaire et nature préservée du Gabon */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={estuaireNatureImg}
            alt="Estuaire naturel et préservation environnementale - ES-BTP"
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
                <ShieldCheck className="w-3.5 h-3.5 text-[#FAB005]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#FAB005]">
                  Charte Opérationnelle & Valeurs
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-4 text-white drop-shadow-md">
                NOS ENGAGEMENTS
              </h1>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed drop-shadow-sm">
                Une démarche sobre, exigeante et responsable pour garantir la conformité technique et environnementale de chaque ouvrage.
              </p>
              <div className="mt-4">
                <EsBtpAccentBar />
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* Main Pillars avec cartes et badges arrondis */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ZoomReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {detailedEngagements.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 bg-white border border-slate-200 hover:border-[#FAB005]/80 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#FAB005]">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold text-slate-400 block">
                              PILIER 0{idx + 1}
                            </span>
                            <h2 className="text-xl font-black font-heading text-[#0B1320] tracking-tight">
                              {item.title}
                            </h2>
                          </div>
                        </div>

                        <span className="w-2.5 h-2.5 rounded-full bg-[#FAB005]" />
                      </div>

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                        {item.subtitle}
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {item.text}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-slate-100">
                        {item.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Encadré QHSE arrondi */}
            <div className="mt-14 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-heading text-[#0B1320]">
                    Politique QHSE & Contrôles d'Exécution
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Nos conducteurs de travaux et ingénieurs veillent quotidiennement à l'application rigoureuse des normes de sécurité et de conformité.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenContact}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] rounded-xl transition-all shadow-md shrink-0 cursor-pointer font-heading"
              >
                Échanger avec notre direction
              </button>
            </div>
          </ZoomReveal>
        </div>
      </section>
    </div>
  );
};
