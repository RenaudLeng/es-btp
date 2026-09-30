import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Milestone, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Award,
  RotateCw,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { EsBtpAccentBar } from './EsBtpAccentBar';
import { FuturisticMeshBackdrop } from './FuturisticMeshBackdrop';
import batimentImg from '../assets/images/chantier_africain_batiment_1790108101216.jpg';
import routesImg from '../assets/images/chantier_africain_routes_1790108090031.jpg';

export const StatsCounterSection: React.FC = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'batiment' | 'routes'>('all');

  // Valeurs cibles pour l'animation (réalistes et crédibles pour une PME BTP gabonaise active et rigoureuse)
  const targets = {
    batimentM2: 12500,
    routesKm: 28,
    provinces: 5,
    qhse: 100,
    experience: 12,
    reception: 98,
  };

  const [counts, setCounts] = useState({
    batimentM2: 0,
    routesKm: 0,
    provinces: 0,
    qhse: 0,
    experience: 0,
    reception: 0,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  const runAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsCounting(true);
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing exponentiel pour une sensation de décélération fluide
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        batimentM2: easeProgress * targets.batimentM2,
        routesKm: easeProgress * targets.routesKm,
        provinces: easeProgress * targets.provinces,
        qhse: easeProgress * targets.qhse,
        experience: easeProgress * targets.experience,
        reception: easeProgress * targets.reception,
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsCounting(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          runAnimation();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const timer = setTimeout(() => {
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        runAnimation();
      }
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chiffres-cles-esbtp"
      className="py-16 sm:py-24 bg-[#060D17] text-white relative overflow-hidden border-t border-b border-slate-800/90"
    >
      {/* Trame architecturale & halo discret */}
      <FuturisticMeshBackdrop variant="dark" showGrid={true} />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#FAB005]/5 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#38BDF8]/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* EN-TÊTE LINÉAIRE : SOBRE, ÉPURÉ, CLASSE DIRIGEANTE */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-[#FAB005]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FAB005] font-bold">
                Capacité & Bilan Opérationnel
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              L’IMPACT D’ES-BTP EN CHIFFRES
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              La crédibilité d'un constructeur réside dans les surfaces réellement érigées, les kilomètres ouverts et la rigueur appliquée sur chaque chantier gabonais.
            </p>
          </div>

          {/* Bouton de relance discret */}
          <div className="shrink-0 self-start md:self-end">
            <button
              onClick={() => runAnimation()}
              disabled={isCounting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-[#FAB005]/60 transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-60"
              title="Rejouer l'incrémentation en direct"
            >
              <RotateCw className={`w-3.5 h-3.5 text-[#FAB005] ${isCounting ? 'animate-spin' : ''}`} />
              <span>{isCounting ? 'Comptage en cours...' : 'Rejouer les chiffres'}</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ÉTAGE 1 : LES 2 GRANDS PILIERS CHANTIERS (SPLIT CINÉMATIQUE 50/50) */}
        {/* Fin des petites cartes : place à deux grands blocs architecturaux */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          
          {/* PILIER 1 : BÂTIMENT & GÉNIE CIVIL */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#0B1829] via-[#0E1F35] to-[#08121E] border border-slate-700/80 p-8 sm:p-10 overflow-hidden shadow-2xl group hover:border-[#FAB005]/60 transition-all duration-300 flex flex-col justify-between">
            {/* Texture photo subtile en arrière-plan (fondu cinéma 15% opacity) */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity">
              <img
                src={batimentImg}
                alt="Chantier gros œuvre BTP"
                className="w-full h-full object-cover object-center filter grayscale mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1829] to-transparent" />
            </div>

            {/* Accent supérieur doré */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FAB005] opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#FAB005] font-bold">
                  Pôle Bâtiment & Gros Œuvre
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#FAB005]/10 border border-[#FAB005]/20 flex items-center justify-center text-[#FAB005]">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              {/* Chiffre Majeur */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white tabular-nums drop-shadow-md">
                  +{Math.floor(counts.batimentM2).toLocaleString('fr-FR')}
                </span>
                <span className="text-2xl font-bold font-mono text-[#FAB005]">
                  m²
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2">
                Surfaces Bâties & Ouvrages Réalisés
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mb-6">
                Bâtiments administratifs, aménagements tertiaires, résidences et dallages industriels exécutés avec rigueur et contrôle géotechnique.
              </p>
            </div>

            {/* Repères techniques épurés en ligne (sans boîtes) */}
            <div className="relative z-10 pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
              <span className="text-white font-medium">Bétons B25 / B30 certifiés</span>
              <span className="text-slate-600">·</span>
              <span>Fondations spéciales</span>
              <span className="text-slate-600">·</span>
              <span>Tolérances millimétriques</span>
            </div>
          </div>

          {/* PILIER 2 : ROUTES & VOIRIES */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#0B1829] via-[#0E1F35] to-[#08121E] border border-slate-700/80 p-8 sm:p-10 overflow-hidden shadow-2xl group hover:border-[#38BDF8]/60 transition-all duration-300 flex flex-col justify-between">
            {/* Texture photo subtile en arrière-plan */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity">
              <img
                src={routesImg}
                alt="Travaux routiers bitumage"
                className="w-full h-full object-cover object-center filter grayscale mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1829] to-transparent" />
            </div>

            {/* Accent supérieur bleu ciel */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#38BDF8] opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8] font-bold">
                  Pôle Travaux Routiers & VRD
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8]">
                  <Milestone className="w-5 h-5" />
                </div>
              </div>

              {/* Chiffre Majeur */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white tabular-nums drop-shadow-md">
                  +{Math.floor(counts.routesKm)}
                </span>
                <span className="text-2xl font-bold font-mono text-[#38BDF8]">
                  km
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2">
                Linéaires Traités & Voiries Aménagées
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mb-6">
                Voiries urbaines, pistes traitées, canalisations de drainage pluvial et réfection d'accès pour désenclaver et sécuriser les zones d'activités.
              </p>
            </div>

            {/* Repères techniques épurés en ligne */}
            <div className="relative z-10 pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
              <span className="text-white font-medium">Couches de roulement BB</span>
              <span className="text-slate-600">·</span>
              <span>Assainissement pluvial</span>
              <span className="text-slate-600">·</span>
              <span>Pistes traitées</span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* ÉTAGE 2 : LE RUBAN DE RIGUEUR OPÉRATIONNELLE (4 COLONNES CONTINUES) */}
        {/* Aucun encadrement individuel : un bandeau architectural élégant */}
        {/* ============================================================ */}
        <div className="rounded-2xl bg-[#091524] border border-slate-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/90">
            
            {/* 1. Couverture Territoriale */}
            <div className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Territoire</span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-tight tabular-nums mb-1">
                  {Math.floor(counts.provinces)} / 9
                </div>
                <div className="text-xs font-bold text-slate-200">
                  Provinces Déjà Touchées
                </div>
                <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                  Interventions régulières dans l'Estuaire, l'Ogooué-Maritime et l'Intérieur.
                </p>
              </div>
            </div>

            {/* 2. Normes QHSE */}
            <div className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FAB005]" />
                  <span>Sécurité</span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-tight tabular-nums mb-1">
                  {Math.floor(counts.qhse)}%
                </div>
                <div className="text-xs font-bold text-slate-200">
                  Conformité Sécurité
                </div>
                <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                  Port systématique des EPI et sensibilisation active sur chaque base-vie.
                </p>
              </div>
            </div>

            {/* 3. Expérience */}
            <div className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 mb-2">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Fondation</span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-tight tabular-nums mb-1">
                  {Math.floor(counts.experience)} Ans
                </div>
                <div className="text-xs font-bold text-slate-200">
                  Présence au Gabon
                </div>
                <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                  Créée en 2013, bâtie pas à pas avec des équipes locales dévouées.
                </p>
              </div>
            </div>

            {/* 4. Taux de Réception */}
            <div className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 mb-2">
                  <Award className="w-3.5 h-3.5 text-rose-400" />
                  <span>Exigence</span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-tight tabular-nums mb-1">
                  {Math.floor(counts.reception)}%
                </div>
                <div className="text-xs font-bold text-slate-200">
                  Livraisons Conformes
                </div>
                <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                  Respect strict des tolérances et validation en laboratoire agréé.
                </p>
              </div>
            </div>

          </div>

          {/* Bandeau inférieur de garantie */}
          <div className="px-6 py-3.5 bg-black/40 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Chaque chantier engagé par ES-BTP fait l’objet d’un <strong className="text-white">Plan d'Assurance Qualité (PAQ)</strong>.
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#FAB005]">
              Contrôles géotechniques agréés · Libreville, Gabon
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
