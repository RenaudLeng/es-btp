import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Building, ShieldCheck, ChevronLeft, ChevronRight, ThumbsUp, Award } from 'lucide-react';
import { ZoomReveal } from './ZoomReveal';
import { EsBtpAccentBar } from './EsBtpAccentBar';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  rating: number; // 1 to 5
  projectType: string;
  date: string;
  feedback: string;
  highlight: string;
  verified: boolean;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'M. Jean-Paul NDONG MVE',
    role: 'Directeur des Opérations Immobilières',
    organization: 'Groupe Patrimoine & Logistique Gabon',
    location: 'Libreville, Estuaire',
    rating: 5,
    projectType: 'Gros Œuvre & Bâtiment Tertiaire (R+3)',
    date: 'Janvier 2026',
    feedback:
      "Sur notre complexe tertiaire d'Oloumi, ES-BTP a fait preuve d'une rigueur d'ingénierie impressionnante. Les délais de coulage et le ferraillage ont été validés sans aucune réserve par le bureau de contrôle technique. Une équipe disponible et un suivi de chantier transparent.",
    highlight: 'Zéro réserve technique et respect scrupuleux du planning contractuel.',
    verified: true,
  },
  {
    id: 'test-2',
    name: 'Ing. Serge ONDO ASSOUMOU',
    role: 'Chef de Mission / Consultant Voiries',
    organization: 'Bureau d’Études & d’Ingénierie Urbaine',
    location: 'Owendo / Akanda',
    rating: 5,
    projectType: 'Aménagement de Voiries & Ouvrages de Drainage',
    date: 'Décembre 2025',
    feedback:
      "Le terrassement et la gestion des sols latéritiques en saison des pluies sont les plus grands défis au Gabon. Les équipes d'ES-BTP maîtrisent parfaitement les contraintes hydrologiques locales. Le dimensionnement des dalots et caniveaux d'évacuation est irréprochable.",
    highlight: 'Maîtrise remarquable du drainage équatorial et des sols exigeants.',
    verified: true,
  },
  {
    id: 'test-3',
    name: 'Mme Clarisse BOUANGA',
    role: 'Promotrice & Maître d’Ouvrage Privé',
    organization: 'Résidences Panoramiques du Nord',
    location: 'Angondjé, Libreville',
    rating: 5,
    projectType: 'Ensemble Résidentiel de Standing',
    date: 'Octobre 2025',
    feedback:
      "Trouver une entreprise de construction qui allie devis clair, honnêteté technique et finition soignée est rare. ES-BTP nous a accompagnés avec des conseils avisés pour optimiser les coûts sans rogner sur la robustesse du béton armé.",
    highlight: 'Transparence financière exemplaire et excellente qualité de finition.',
    verified: true,
  },
  {
    id: 'test-4',
    name: 'M. Christian MEZUI ENGONE',
    role: 'Directeur Technique Régional',
    organization: 'Société d’Aménagement des Plateformes Minières & Industrielles',
    location: 'Port-Gentil / Intérieur',
    rating: 5,
    projectType: 'Plateforme Industrielle & Pistes Renforcées',
    date: 'Août 2025',
    feedback:
      "La mobilisation des engins et le respect strict des consignes de sécurité QHSE ont été décisifs sur notre site logistique. Le personnel portait tous ses EPI et les normes environnementales ont été scrupuleusement honorées.",
    highlight: 'Conformité QHSE exemplaire et réactivité des équipes mécanisées.',
    verified: true,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#071322] text-white relative overflow-hidden border-y border-slate-800">
      {/* Halo architectural discret en arrière-plan */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FAB005]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ZoomReveal>
          {/* Header de section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAB005]/10 border border-[#FAB005]/30 rounded-full mb-3 text-xs font-bold text-[#FAB005] uppercase tracking-wider">
                <ThumbsUp className="w-3.5 h-3.5 text-[#FAB005]" />
                <span>Retours d'expérience sur chantiers</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight text-white">
                ILS NOUS FONT CONFIANCE
              </h2>
              <div className="mt-4">
                <EsBtpAccentBar />
              </div>
            </div>

            {/* Note d'appréciation partenaires */}
            <div className="flex items-center gap-4 bg-white/5 border border-slate-700/80 px-5 py-3 rounded-2xl backdrop-blur-sm self-start md:self-auto">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black font-heading text-[#FAB005] leading-none">
                  4.8 / 5.0
                </span>
                <span className="text-[11px] text-slate-300 font-medium mt-1">
                  Appréciation de nos maîtres d'ouvrage
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#FAB005]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i === 4 ? 'fill-[#FAB005]/70' : 'fill-[#FAB005]'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Corps principal : Grand avis en vedette + Carrousel des cartes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Colonne gauche (7 cols) : Témoignage actif détaillé */}
            <div className="lg:col-span-7 bg-white/5 border border-slate-700/70 rounded-3xl p-6 sm:p-10 flex flex-col justify-between backdrop-blur-md relative shadow-xl">
              <Quote className="w-16 h-16 text-[#FAB005]/15 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Métadonnées du chantier */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#FAB005]/15 text-[#FAB005] text-xs font-bold rounded-lg uppercase tracking-wider">
                    {current.projectType}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    · {current.location}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    · {current.date}
                  </span>
                </div>

                {/* Étoiles de notation */}
                <div className="flex items-center gap-1.5 mb-5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FAB005] text-[#FAB005]" />
                  ))}
                  <span className="ml-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                    Avis d'exécution certifié
                  </span>
                </div>

                {/* Citation percutante */}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-4 leading-snug">
                  « {current.highlight} »
                </h3>

                {/* Texte complet */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
                  "{current.feedback}"
                </p>
              </div>

              {/* Auteur du témoignage & Navigation */}
              <div className="pt-6 border-t border-slate-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAB005] to-amber-600 text-[#0B1320] font-black font-heading flex items-center justify-center text-base shadow-md">
                    {current.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white font-heading">
                        {current.name}
                      </h4>
                      {current.verified && (
                        <span title="Maître d'ouvrage vérifié" className="inline-flex">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {current.role} · <strong className="text-slate-300 font-semibold">{current.organization}</strong>
                    </p>
                  </div>
                </div>

                {/* Boutons Suivant / Précédent */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#FAB005] hover:text-[#0B1320] text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Témoignage précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#FAB005] hover:text-[#0B1320] text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Témoignage suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Colonne droite (5 cols) : Mini-liste de réassurance */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="space-y-3.5">
                {TESTIMONIALS_DATA.map((t, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-[#FAB005]/15 border-[#FAB005] shadow-lg shadow-[#FAB005]/5'
                          : 'bg-white/5 border-slate-800 hover:bg-white/10 hover:border-slate-700'
                      }`}
                    >
                      <div className="mt-1 flex items-center gap-0.5 text-[#FAB005] shrink-0">
                        <Star className="w-4 h-4 fill-[#FAB005]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-white truncate font-heading">
                            {t.organization}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">
                            {t.rating}.0/5
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                          « {t.highlight} »
                        </p>
                        <span className="text-[10px] text-[#FAB005] font-semibold mt-1 block">
                          {t.name} · {t.location}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bandeau d'engagement qualité BTP */}
              <div className="p-4 bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAB005]/20 text-[#FAB005] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#FAB005]" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Garantie & Audit des Travaux</h5>
                  <p className="text-[11px] text-slate-400">
                    Tous nos chantiers font l'objet de procès-verbaux de réception conformes aux normes gabonaises et internationales.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </ZoomReveal>
      </div>
    </section>
  );
};
