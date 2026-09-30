import React, { useState, useEffect } from 'react';
import { PageId } from '../components/Header';
import { ProjectItem, PROJECTS, EXPERTISES, COMMITMENTS, COMPANY_INFO } from '../data/btpData';
import { updatePageSeo } from '../utils/seo';
import { ArrowRight, ArrowUpRight, MapPin, Building2, HardHat, Compass, ShieldCheck, CheckCircle2, Quote, Award, Sparkles } from 'lucide-react';
import { EsBtpAccentBar } from '../components/EsBtpAccentBar';
import { ZoomReveal } from '../components/ZoomReveal';
import { MotionImage } from '../components/MotionImage';
import { FuturisticMeshBackdrop } from '../components/FuturisticMeshBackdrop';
import { FuturisticBanner } from '../components/FuturisticBanner';
import { StatsCounterSection } from '../components/StatsCounterSection';
import { PartnersSection } from '../components/PartnersSection';
import { TeamSection } from '../components/TeamSection';
import { AnimatedValuesSection } from '../components/AnimatedValuesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { useDgPhoto } from '../context/DgPhotoContext';
import { ExecutivePortraitPoster } from '../components/ExecutivePortraitPoster';
import heroImg from '../assets/images/chantier_africain_routes_1790108090031.jpg';
import chantierImg from '../assets/images/chantier_africain_infra_1790108112692.jpg';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onOpenProjectContact: (projectTitle?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenProjectContact,
  onSelectProject,
}) => {
  const { dgPhotoUrl, isCustomPhoto } = useDgPhoto();
  const [projectFilter, setProjectFilter] = useState<'ALL' | 'BATIMENT' | 'ROUTES' | 'INFRASTRUCTURES'>('ALL');

  const filteredProjects = PROJECTS.filter((p) => {
    if (projectFilter === 'ALL') return true;
    return p.category === projectFilter;
  });

  useEffect(() => {
    updatePageSeo({
      title: 'ES-BTP | Bâtiment, Travaux Routiers & Génie Civil au Gabon',
      description: 'Entreprise leader de BTP au Gabon : construction de bâtiments, travaux routiers, bitumage, ponts et infrastructures durables à Libreville et dans tout le pays.',
      keywords: 'ES-BTP, BTP Gabon, entreprise BTP Libreville, travaux routiers Gabon, génie civil Gabon, construction bâtiment Libreville, voiries et réseaux divers Gabon',
      canonicalPath: '/',
    });
  }, []);

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* SECTION 1 — HERO */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] bg-[#07111E] flex items-end overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Chantier de génie civil et travaux routiers au Gabon par ES-BTP"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center transform scale-100"
            referrerPolicy="no-referrer"
          />
          {/* Architectural Contrast Gradients: deep midnight navy bottom & left vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111E] via-[#07111E]/80 to-[#07111E]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111E]/95 via-[#07111E]/60 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-3xl">
            {/* Main Title (H1) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-[1.08] mb-6 drop-shadow-sm">
              LE FUTUR SE CONSTRUIT MAINTENANT.
            </h1>

            {/* Secondary Text */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl text-balance">
              Entreprise de référence au Gabon, <strong className="text-white font-semibold">ES-BTP</strong> mobilise une ingénierie rigoureuse et des équipements modernes pour bâtir des infrastructures pérennes au service du développement économique.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('realisations')}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition-all rounded-xl shadow-md text-center cursor-pointer"
              >
                Nos réalisations
              </button>

              <button
                onClick={() => onOpenProjectContact()}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] active:bg-[#c98e03] transition-all rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg font-heading"
              >
                <span>Parler de votre projet</span>
                <ArrowRight className="w-4 h-4 text-[#0B1320]" />
              </button>

              <button
                onClick={() => onNavigate('entreprise')}
                className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 transition-all border border-slate-600/70 rounded-xl text-center cursor-pointer"
              >
                Découvrir ES-BTP
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B1320] via-[#FAB005] to-[#0284C7]" />
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — PRÉSENTATION COURTE */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100 relative overflow-hidden">
        <FuturisticMeshBackdrop variant="light" showGrid={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column - Glissement fluide depuis la gauche avec cadrage architectural */}
            <div className="lg:col-span-5 relative">
              <ZoomReveal variant="right">
                <div className="relative overflow-hidden bg-slate-100 border border-slate-200 rounded-2xl shadow-lg">
                  <MotionImage
                    src={chantierImg}
                    alt="Supervision technique de chantier de construction ES-BTP"
                    aspectRatio="aspect-4/3"
                    variant="zoom-out"
                    cornerAccents={true}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>DIRECTION TECHNIQUE</span>
                  <span>MAÎTRISE TECHNIQUE D’EXÉCUTION</span>
                </div>
              </ZoomReveal>
            </div>

            {/* Text Column - Glissement fluide depuis la droite */}
            <div className="lg:col-span-7">
              <ZoomReveal variant="left" delay={120}>
                <div className="max-w-xl">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-4 h-0.5 bg-[#FAB005]" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B1320]">
                      Présentation institutionnelle
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight leading-tight mb-6">
                    CONSTRUIRE AVEC UNE VISION.
                  </h2>

                  <p className="text-base text-slate-600 leading-relaxed mb-8">
                    ES-BTP intervient dans les domaines du bâtiment, des travaux routiers et des infrastructures, avec une approche fondée sur la rigueur, la maîtrise des projets et la qualité d'exécution.
                  </p>

                  <div>
                    <button
                      onClick={() => onNavigate('entreprise')}
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0B1320] hover:bg-[#163A63] rounded-xl transition-all shadow-md cursor-pointer font-heading"
                    >
                      <span>Découvrir ES-BTP</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FAB005]" />
                    </button>
                  </div>
                </div>
              </ZoomReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION EXECUTIVE : LE MOT DU DIRECTEUR GÉNÉRAL (Spotlight) */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-[#0B1320] text-white relative overflow-hidden border-b border-slate-800">
        <FuturisticMeshBackdrop variant="dark" showGrid={false} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* DG Portrait Card */}
              <div className="lg:col-span-4 flex justify-center">
                <ExecutivePortraitPoster />
              </div>

              {/* DG Quote & Message preview */}
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 bg-white/5 border border-slate-700 text-[#FAB005] text-xs font-bold uppercase tracking-widest rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#FAB005]" />
                  <span>Direction Générale · ES-BTP</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight mb-3">
                  « LE FUTUR SE CONSTRUIT MAINTENANT »
                </h2>
                <EsBtpAccentBar className="mb-6" />

                <div className="relative pl-6 py-3 border-l-4 border-[#FAB005] mb-6 bg-white/5 p-5 rounded-2xl backdrop-blur-xs">
                  <Quote className="w-8 h-8 text-[#FAB005]/30 absolute top-2 right-4 pointer-events-none" />
                  <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed italic">
                    « {COMPANY_INFO.management.quote} »
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  {COMPANY_INFO.management.speech[0]}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('entreprise')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] transition-all rounded-xl cursor-pointer shadow-md font-heading"
                  >
                    <span>Lire l'intégralité du Mot du Directeur Général</span>
                    <ArrowRight className="w-4 h-4 text-[#0B1320]" />
                  </button>

                  <button
                    onClick={() => onOpenProjectContact()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/10 border border-slate-700 transition-all rounded-xl cursor-pointer"
                  >
                    <span>Prendre contact</span>
                  </button>
                </div>
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION CHIFFRES CLÉS & DONNÉES DU TERRAIN */}
      {/* ============================================================ */}
      <ZoomReveal>
        <StatsCounterSection />
      </ZoomReveal>

      {/* ============================================================ */}
      {/* SECTION 3 — EXPERTISES */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <FuturisticMeshBackdrop variant="light" showGrid={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            {/* Section Header */}
            <div className="max-w-2xl mb-14">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-4 h-0.5 bg-[#FAB005]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B1320]">
                  Nos compétences
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight mb-2">
                NOS DOMAINES D'EXPERTISE
              </h2>
              <EsBtpAccentBar className="mb-4" />
              <p className="text-base text-slate-600 leading-relaxed">
                Des compétences mobilisées pour répondre aux exigences de chaque projet.
              </p>
            </div>

            {/* Three Visual Blocks avec design arrondi et mouvements mixtes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {EXPERTISES.map((exp, index) => (
                <div
                  key={exp.id}
                  className="group bg-white border border-slate-200 hover:border-[#FAB005]/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    {/* Visual Image avec animation mixte non-monotone */}
                    <div className="relative w-full overflow-hidden">
                      <MotionImage
                        src={exp.image}
                        alt={exp.title}
                        aspectRatio="aspect-4/3"
                        index={index}
                        variant="auto"
                        cornerAccents={true}
                        hoverScale={true}
                      />
                      <div className="absolute top-3 left-3 bg-[#0B1320]/90 backdrop-blur-md text-[#FAB005] px-3 py-1 text-[11px] font-bold font-mono tracking-wider rounded-full shadow-md z-10">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black font-heading text-[#0B1320] tracking-tight mb-3">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('expertises')}
                      className="text-xs font-bold uppercase tracking-wider text-[#0B1320] group-hover:text-[#FAB005] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Consulter le domaine</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FAB005] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* BANNIÈRE FUTURISTE D'IMPACT DANS HOME */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <ZoomReveal>
          <FuturisticBanner
            theme="gabon-prestige"
            title="L’EXCELLENCE DES BÂTISSEURS DU GABON MODERNE"
            subtitle="Génie civil de pointe, voiries et réseaux divers (VRD), structures en béton armé et projets d'infrastructures d’envergure."
            tagline="HORIZON 2030+ · INNOVATION & EXCELLENCE"
            onCtaClick={() => onNavigate('realisations')}
            ctaText="Explorer nos réalisations"
          />
        </ZoomReveal>
      </div>

      {/* ============================================================ */}
      {/* SECTION 4 — RÉALISATIONS */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
        <FuturisticMeshBackdrop variant="light" showGrid={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            {/* Header & Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-4 h-0.5 bg-[#FAB005]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B1320]">
                    Ouvrages et chantiers
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight mb-2">
                  DES PROJETS. DES OUVRAGES. DES RÉSULTATS.
                </h2>
                <EsBtpAccentBar className="mb-4" />
                <p className="text-base text-slate-600">
                  Découvrez les projets réalisés ou accompagnés par ES-BTP.
                </p>
              </div>

              {/* Interactive Filter Tabs Arrondis */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 border border-slate-200 rounded-full self-start lg:self-auto overflow-x-auto max-w-full shadow-xs">
                {[
                  { id: 'ALL', label: 'TOUS' },
                  { id: 'BATIMENT', label: 'BÂTIMENT' },
                  { id: 'ROUTES', label: 'ROUTES' },
                  { id: 'INFRASTRUCTURES', label: 'INFRASTRUCTURES' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setProjectFilter(tab.id as any)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      projectFilter === tab.id
                        ? 'bg-[#0B1320] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Cards Grid avec formes arrondies */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group bg-white border border-slate-200 hover:border-[#FAB005]/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image avec animation d'apparition alternée */}
                    <div className="relative w-full overflow-hidden">
                      <MotionImage
                        src={project.image}
                        alt={project.title}
                        aspectRatio="aspect-16/10"
                        index={index}
                        variant="auto"
                        cornerAccents={true}
                        hoverScale={true}
                      />
                      <div className="absolute top-3 left-3 bg-[#0B1320]/90 backdrop-blur-md text-[#FAB005] px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md z-10">
                        {project.categoryLabel}
                      </div>

                      {project.isPlaceholder && (
                        <div className="absolute bottom-2.5 right-2.5 bg-slate-900/85 backdrop-blur-xs text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-full z-10">
                          Projet à renseigner
                        </div>
                      )}
                    </div>

                    {/* Project Text */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FAB005] shrink-0" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className="text-lg font-black font-heading text-[#0B1320] group-hover:text-[#163A63] transition-colors leading-snug mb-2">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-semibold bg-slate-50/50 group-hover:bg-amber-50/30 transition-colors">
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">
                      Détails techniques
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white border border-slate-200 group-hover:border-[#FAB005] flex items-center justify-center text-[#FAB005] shadow-xs group-hover:translate-x-0.5 transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => onNavigate('realisations')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-300 cursor-pointer shadow-xs font-heading"
              >
                <span>Voir l'ensemble des réalisations</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0B1320]" />
              </button>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — NOS VALEURS EN MOUVEMENT (PROFESSIONNALISME, PRÉCISION, SÉCURITÉ, DURABILITÉ) */}
      {/* ============================================================ */}
      <AnimatedValuesSection onCtaClick={() => onOpenProjectContact()} />

      {/* ============================================================ */}
      {/* SECTION CAPITAL HUMAIN & L'ÉQUIPE ES-BTP (PRÉSENTATION HOMEPAGE PUBLIÉE) */}
      {/* ============================================================ */}
      <div id="equipe-es-btp">
        <TeamSection />
      </div>

      {/* ============================================================ */}
      {/* SECTION PARTENAIRES : ILS NOUS FONT CONFIANCE */}
      {/* ============================================================ */}
      <ZoomReveal>
        <PartnersSection />
      </ZoomReveal>

      {/* ============================================================ */}
      {/* SECTION 6 — ES-BTP AU GABON */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
        <FuturisticMeshBackdrop variant="light" showGrid={false} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Context & Description */}
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-4 h-0.5 bg-[#FAB005]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B1320]">
                    Territoire & Proximité
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight mb-6">
                  CONSTRUIRE AU CŒUR DU GABON
                </h2>

                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  Acteur engagé dans la modernisation des infrastructures gabonaises, ES-BTP mobilise des moyens humains et techniques adaptés aux réalités géographiques, climatiques et logistiques du pays.
                </p>

                <div className="space-y-3 border-l-2 border-slate-200 pl-4 mb-8 text-sm text-slate-700">
                  <p>
                    <strong className="text-[#0B1320]">Adaptabilité aux sols :</strong> Maîtrise des sols latéritiques et des exigences de drainage équatorial.
                  </p>
                  <p>
                    <strong className="text-[#0B1320]">Continuité logistique :</strong> Organisation méthodique des approvisionnements en agrégats, ciments et bitumes.
                  </p>
                  <p>
                    <strong className="text-[#0B1320]">Compétences locales :</strong> Valorisation des savoir-faire et formation continue des équipes opérationnelles.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('entreprise')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition-all cursor-pointer font-heading shadow-xs"
                >
                  <span>En savoir plus sur notre implantation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FAB005]" />
                </button>
              </div>

              {/* Discrete Architectural Geographic Frame arrondi */}
              <div className="lg:col-span-6">
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-900 block">
                        Rayonnement opérationnel
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        PROVINCES D'INTERVENTION
                      </span>
                    </div>
                    <span className="w-2.5 h-2.5 bg-[#FAB005] rounded-full" />
                  </div>

                  {/* Minimalist Regional Schematic Nodes arrondis */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                      <span className="font-bold text-[#0B1320] block">Estuaire & Libreville</span>
                      <span className="text-slate-500 mt-1 block">Ouvrages de bâtiment et voiries urbaines</span>
                    </div>

                    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                      <span className="font-bold text-[#0B1320] block">Ogooué-Maritime</span>
                      <span className="text-slate-500 mt-1 block">Plateformes techniques et infrastructures</span>
                    </div>

                    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                      <span className="font-bold text-[#0B1320] block">Haut-Ogooué</span>
                      <span className="text-slate-500 mt-1 block">Réseaux routiers et génie civil lourd</span>
                    </div>

                    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                      <span className="font-bold text-[#0B1320] block">Provinces de l'Intérieur</span>
                      <span className="text-slate-500 mt-1 block">Désenclavement, ponts et pistes aménagées</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
                    Siège opérationnel : Sogatole Face à la FOPI · <span className="font-mono text-slate-700">BP : 18394 Libreville, Gabon</span>
                  </div>
                </div>
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION TÉMOIGNAGES CLIENTS & NOTATION PAR ÉTOILES */}
      {/* ============================================================ */}
      <TestimonialsSection />

      {/* ============================================================ */}
      {/* SECTION 7 — APPEL À L'ACTION */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#071426] text-white relative overflow-hidden">
        <FuturisticMeshBackdrop variant="dark" showGrid={false} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E68A00] block mb-3">
                Collaboration professionnelle
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight mb-4">
                UN PROJET À CONSTRUIRE ?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto">
                Échangeons sur vos besoins et les solutions adaptées à votre projet.
              </p>

              <button
                onClick={() => onOpenProjectContact()}
                className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#0B192C] bg-white hover:bg-slate-100 transition-colors cursor-pointer shadow-lg border-l-4 border-[#E68A00]"
              >
                <span>Parler de votre projet</span>
                <ArrowRight className="w-4 h-4 text-[#E68A00]" />
              </button>
            </div>
          </ZoomReveal>
        </div>
      </section>
    </div>
  );
};
