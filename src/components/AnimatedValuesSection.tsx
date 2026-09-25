import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Target, 
  Award, 
  Layers, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Clock,
  ArrowRight
} from 'lucide-react';
import { FuturisticMeshBackdrop } from './FuturisticMeshBackdrop';

export interface CompanyValue {
  id: string;
  number: string;
  title: string;
  tagline: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  keyMetric: string;
  metricLabel: string;
  pillars: string[];
  color: string;
}

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'professionnalisme',
    number: '01',
    title: 'Professionnalisme',
    tagline: 'Écoute, méthode & responsabilité totale',
    desc: 'Une posture d’écoute, de rigueur technique et de responsabilité sur chaque chantier.',
    icon: Award,
    keyMetric: '100%',
    metricLabel: 'Engagement contractuel & technique',
    pillars: [
      'Écoute proactive des maîtres d’ouvrage et partenaires',
      'Traçabilité rigoureuse de chaque étape d’exécution',
      'Discipline opérationnelle et respect des engagements'
    ],
    color: '#FAB005'
  },
  {
    id: 'precision',
    number: '02',
    title: 'Précision',
    tagline: 'Excellence géométrique & respect des spécifications',
    desc: 'Le respect scrupuleux des cahiers des charges, des tolérances et des spécifications.',
    icon: Target,
    keyMetric: '± 0 mm',
    metricLabel: 'Tolérances et contrôles géométriques',
    pillars: [
      'Conformité stricte aux CCTP et normes internationales',
      'Contrôles topographiques et essais de laboratoire continus',
      'Maîtrise millimétrique des calages et des nivellements'
    ],
    color: '#0284C7'
  },
  {
    id: 'securite',
    number: '03',
    title: 'Sécurité',
    tagline: 'Protection des vies humaines & prévention active',
    desc: 'La protection de la vie humaine et la prévention active des risques sur tous les sites.',
    icon: ShieldCheck,
    keyMetric: 'ZÉRO',
    metricLabel: 'Objectif accident & prévention absolue',
    pillars: [
      'Quarts d’heure sécurité obligatoires chaque matin',
      'Port systématique des Équipements de Protection (EPI)',
      'Plans Particuliers de Sécurité et de Protection (PPSPS)'
    ],
    color: '#10B981'
  },
  {
    id: 'durabilite',
    number: '04',
    title: 'Durabilité',
    tagline: 'Résistance équatoriale & longévité des ouvrages',
    desc: 'Des ouvrages conçus pour résister au climat équatorial et traverser les décennies.',
    icon: Layers,
    keyMetric: '30+ ans',
    metricLabel: 'Conception pour traverser les générations',
    pillars: [
      'Bétons et enrobés formulés pour l’hygrométrie équatoriale',
      'Dimensionnement hydraulique face aux fortes pluies',
      'Préservation écologique des sols et des écosystèmes locaux'
    ],
    color: '#F59E0B'
  }
];

interface AnimatedValuesSectionProps {
  onCtaClick?: () => void;
  showMarquee?: boolean;
}

export const AnimatedValuesSection: React.FC<AnimatedValuesSectionProps> = ({
  onCtaClick,
  showMarquee = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [displayMode, setDisplayMode] = useState<'flow' | 'grid'>('flow');
  const [progress, setProgress] = useState(0);
  const intervalTime = 4800; // ms
  const progressStep = 50; // update interval ms
  const touchStartXRef = useRef<number | null>(null);

  // Auto-play timer with progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const totalSteps = intervalTime / progressStep;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const nextProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        currentStep = 0;
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % COMPANY_VALUES.length);
      }
    }, progressStep);

    return () => clearInterval(timer);
  }, [isPlaying, activeIndex]);

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  const handlePrev = () => {
    setProgress(0);
    setActiveIndex((prev) => (prev - 1 + COMPANY_VALUES.length) % COMPANY_VALUES.length);
  };

  const handleNext = () => {
    setProgress(0);
    setActiveIndex((prev) => (prev + 1) % COMPANY_VALUES.length);
  };

  const activeValue = COMPANY_VALUES[activeIndex];
  const ActiveIcon = activeValue.icon;

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-b border-slate-200 relative overflow-hidden">
      <FuturisticMeshBackdrop variant="light" showGrid={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================ */}
        {/* EN-TÊTE DE SECTION AVEC BADGE & COMMUTATEUR DE MODES */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-1 bg-[#FAB005] rounded-full" />
              <span className="text-xs uppercase tracking-[0.2em] font-black text-[#0B1320] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FAB005]" />
                Lignes de conduite & Exigences opérationnelles
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-[#0B1320] tracking-tight mb-3">
              NOS VALEURS EN MOUVEMENT
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Des principes intangibles incarnés en mouvement permanent par l'ensemble de nos ingénieurs, techniciens et compagnons sur chaque chantier au Gabon.
            </p>
          </div>

          {/* Contrôles d'affichage & Mouvement */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl shadow-xs">
              <button
                onClick={() => setDisplayMode('flow')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  displayMode === 'flow'
                    ? 'bg-[#0B1320] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1320]'
                }`}
                title="Défilement dynamique cinétique"
              >
                <Flame className="w-3.5 h-3.5 text-[#FAB005]" />
                <span>Mouvement interactif</span>
              </button>

              <button
                onClick={() => setDisplayMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  displayMode === 'grid'
                    ? 'bg-[#0B1320] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1320]'
                }`}
                title="Vue d'ensemble 4 colonnes"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Grille animée</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BANDEAU ONGLETS EN MOUVEMENT (SÉLECTEUR RAPIDE AVEC PROGRESSION) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {COMPANY_VALUES.map((val, idx) => {
            const isActive = idx === activeIndex;
            const Icon = val.icon;
            return (
              <button
                key={val.id}
                onClick={() => handleSelect(idx)}
                className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
                  isActive
                    ? 'bg-[#0B1320] text-white border-[#FAB005] shadow-xl ring-2 ring-[#FAB005]/30 -translate-y-1'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md'
                }`}
              >
                {/* Barre de progression pour l'onglet actif */}
                {isActive && isPlaying && displayMode === 'flow' && (
                  <div
                    className="absolute top-0 left-0 h-1 bg-[#FAB005] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#FAB005]' : 'text-slate-400'}`}>
                      {val.number}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FAB005] animate-ping' : 'bg-slate-300'}`} />
                  </div>
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-white/10 text-[#FAB005]' : 'bg-slate-100 text-slate-600 group-hover:text-[#0B1320]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className={`text-sm sm:text-base font-black font-heading mb-1 ${
                  isActive ? 'text-white' : 'text-[#0B1320]'
                }`}>
                  {val.title}
                </h3>

                <p className={`text-[11px] sm:text-xs line-clamp-1 ${
                  isActive ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {val.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MODE 1: DÉFILEMENT DYNAMIQUE EN MOUVEMENT IMMERSIF */}
        {/* ============================================================ */}
        {displayMode === 'flow' ? (
          <div
            className="relative bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden"
            onTouchStart={(e) => {
              touchStartXRef.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartXRef.current === null) return;
              const diff = touchStartXRef.current - e.changedTouches[0].clientX;
              if (diff > 40) handleNext();
              else if (diff < -40) handlePrev();
              touchStartXRef.current = null;
            }}
          >
            {/* Ruban haut avec accent or et cyan */}
            <div className="h-1.5 bg-gradient-to-r from-[#FAB005] via-[#0284C7] to-[#10B981] w-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] items-stretch">
              {/* Colonne Gauche: Carte Majeure en mouvement */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1320] via-[#0D1C30] to-[#07111E] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
                {/* Motif géométrique abstrait en arrière-plan */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="valGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#valGrid)" />
                  </svg>
                </div>

                {/* Halo lumineux dynamique */}
                <div 
                  className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700"
                  style={{ backgroundColor: activeValue.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-[#FAB005] text-[#0B1320] text-xs font-black uppercase tracking-wider rounded-lg shadow-sm">
                      Valeur clé {activeValue.number} / 04
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 bg-white/10 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3 h-3 text-[#FAB005]" />
                      Actif en continu
                    </span>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#FAB005] mb-6 shadow-lg">
                    <ActiveIcon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-tight mb-3">
                    {activeValue.title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed mb-6">
                    « {activeValue.desc} »
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/15">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#FAB005]">
                      {activeValue.keyMetric}
                    </span>
                    <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
                      {activeValue.metricLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Colonne Droite: Déclinaison concrète & Piliers chantiers */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#FAB005] font-bold block">
                        Application sur nos chantiers
                      </span>
                      <h4 className="text-lg sm:text-xl font-black font-heading text-[#0B1320] mt-0.5">
                        {activeValue.tagline}
                      </h4>
                    </div>

                    <span className="text-xs font-mono text-slate-400">
                      Standard ES-BTP Gabon
                    </span>
                  </div>

                  <div className="mt-8 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Engagements concrets sur le terrain :
                    </p>

                    {activeValue.pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5 hover:border-[#FAB005]/70 hover:bg-amber-50/20 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#FAB005]/20 text-[#0B1320] flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-[#FAB005]" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                            {pillar}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Barre de contrôle du mouvement en bas */}
                <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  {/* Play/Pause control */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-black bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all cursor-pointer"
                      title={isPlaying ? 'Mettre le mouvement en pause' : 'Reprendre le mouvement automatique'}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-[#FAB005]" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-[#FAB005]" />
                          <span>Mouvement auto</span>
                        </>
                      )}
                    </button>

                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      Rotation toutes les 4.8s
                    </span>
                  </div>

                  {/* Previous / Next buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 bg-slate-100 hover:bg-[#0B1320] text-slate-700 hover:text-white border border-slate-300 hover:border-[#0B1320] rounded-xl transition-all cursor-pointer shadow-xs"
                      aria-label="Valeur précédente"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 px-2">
                      {COMPANY_VALUES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          className={`h-2 transition-all rounded-full cursor-pointer ${
                            idx === activeIndex
                              ? 'w-6 bg-[#FAB005]'
                              : 'w-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                          aria-label={`Aller à la valeur ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      className="p-2.5 bg-slate-100 hover:bg-[#0B1320] text-slate-700 hover:text-white border border-slate-300 hover:border-[#0B1320] rounded-xl transition-all cursor-pointer shadow-xs"
                      aria-label="Valeur suivante"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* MODE 2: GRILLE 4 COLONNES ANIMÉE EN MOUVEMENT SIMULTANÉ */
          /* ============================================================ */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_VALUES.map((val, idx) => {
              const Icon = val.icon;
              const isActive = idx === activeIndex;
              return (
                <div
                  key={val.id}
                  onClick={() => handleSelect(idx)}
                  className={`p-6 bg-slate-50 border rounded-2xl shadow-xs transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 ${
                    isActive
                      ? 'border-[#FAB005] bg-gradient-to-b from-amber-50/40 via-white to-white shadow-lg ring-2 ring-[#FAB005]/20'
                      : 'border-slate-200 hover:border-[#FAB005]/70 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#FAB005]">
                        {val.number}
                      </span>
                      <div className="p-2 rounded-xl bg-white border border-slate-200 group-hover:border-[#FAB005] group-hover:bg-[#FAB005]/10 text-[#0B1320] group-hover:text-[#0B1320] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="w-8 h-1 bg-[#FAB005] rounded-full mb-3 group-hover:w-12 transition-all" />

                    <h3 className="text-base sm:text-lg font-black font-heading text-[#0B1320] mb-2">
                      {val.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {val.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                      Indicateur clé
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-base font-black font-mono text-[#0B1320] group-hover:text-[#FAB005]">
                        {val.keyMetric}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {val.metricLabel.split(' ')[0]}...
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/* BANDEAU RUBAN DÉFILANT CONTINU (MARQUEE EN MOUVEMENT PERPÉTUEL) */}
        {/* ============================================================ */}
        {showMarquee && (
          <div className="mt-12 overflow-hidden bg-[#07111E] rounded-2xl border border-slate-800 p-3 sm:p-4 shadow-lg group">
            <div className="flex items-center gap-6 animate-marquee-flow whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em] text-white">
              {/* Première passe */}
              <span className="text-[#FAB005] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                PROFESSIONNALISME
              </span>
              <span className="text-slate-400">· Une posture d'écoute & de rigueur technique ·</span>
              <span className="text-[#0284C7] flex items-center gap-2">
                <Target className="w-3.5 h-3.5" />
                PRÉCISION
              </span>
              <span className="text-slate-400">· Le respect scrupuleux des cahiers des charges & tolérances ·</span>
              <span className="text-[#10B981] flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                SÉCURITÉ
              </span>
              <span className="text-slate-400">· Protection de la vie humaine & prévention active ·</span>
              <span className="text-[#FAB005] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                DURABILITÉ
              </span>
              <span className="text-slate-400">· Des ouvrages conçus pour résister au climat équatorial ·</span>

              {/* Deuxième passe identique pour boucle fluide sans accroc */}
              <span className="text-[#FAB005] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                PROFESSIONNALISME
              </span>
              <span className="text-slate-400">· Une posture d'écoute & de rigueur technique ·</span>
              <span className="text-[#0284C7] flex items-center gap-2">
                <Target className="w-3.5 h-3.5" />
                PRÉCISION
              </span>
              <span className="text-slate-400">· Le respect scrupuleux des cahiers des charges & tolérances ·</span>
              <span className="text-[#10B981] flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                SÉCURITÉ
              </span>
              <span className="text-slate-400">· Protection de la vie humaine & prévention active ·</span>
              <span className="text-[#FAB005] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                DURABILITÉ
              </span>
              <span className="text-slate-400">· Des ouvrages conçus pour résister au climat équatorial ·</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
