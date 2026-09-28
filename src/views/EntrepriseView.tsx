import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/btpData';
import { ArrowRight, Quote, ShieldCheck, CheckCircle2, Award, Sparkles, Building2, HardHat, Compass, FileText, Download } from 'lucide-react';
import { EsBtpLogo } from '../components/EsBtpLogo';
import { EsBtpAccentBar } from '../components/EsBtpAccentBar';
import { TeamSection } from '../components/TeamSection';
import { AnimatedValuesSection } from '../components/AnimatedValuesSection';
import { StatsCounterSection } from '../components/StatsCounterSection';
import { ZoomReveal } from '../components/ZoomReveal';
import { MotionImage } from '../components/MotionImage';
import { FuturisticMeshBackdrop } from '../components/FuturisticMeshBackdrop';
import { FuturisticBanner } from '../components/FuturisticBanner';
import { PartnersSection } from '../components/PartnersSection';
import { useDgPhoto } from '../context/DgPhotoContext';
import { ExecutivePortraitPoster } from '../components/ExecutivePortraitPoster';
import { CorporateBrochureModal } from '../components/CorporateBrochureModal';
import foretGabonaiseImg from '../assets/images/foret_gabonaise_1790112563726.jpg';
import batimentAfricanImg from '../assets/images/chantier_africain_batiment_1790108101216.jpg';
import routesAfricanImg from '../assets/images/chantier_africain_routes_1790108090031.jpg';
import infraAfricanImg from '../assets/images/chantier_africain_infra_1790108112692.jpg';

interface EntrepriseViewProps {
  onOpenContact: () => void;
}

export const EntrepriseView: React.FC<EntrepriseViewProps> = ({ onOpenContact }) => {
  const { dgPhotoUrl, isCustomPhoto } = useDgPhoto();
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  return (
    <div className="w-full relative overflow-hidden">
      {/* ============================================================ */}
      {/* HERO HEADER — BANNIÈRE INSTITUTIONNELLE AVEC FORÊT GABONAISE */}
      {/* ============================================================ */}
      <section className="bg-[#0B1320] text-white py-14 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        {/* Arrière-plan Forêt Gabonaise bien visible */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={foretGabonaiseImg}
            alt="Forêt équatoriale du Gabon - ES-BTP"
            className="w-full h-full object-cover object-center opacity-85"
            referrerPolicy="no-referrer"
          />

          {/* Joli fondu progressif et doux sur les côtés gauche et droit */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1320] via-[#0B1320]/70 via-15% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0B1320] via-[#0B1320]/70 via-15% to-transparent" />
          
          {/* Voile léger pour assurer la lisibilité tout en gardant la forêt éclatante */}
          <div className="absolute inset-0 bg-[#0B1320]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/80 via-transparent to-[#0B1320]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-[#FAB005]/40 rounded-full mb-3 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FAB005]" />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#FAB005]">
                    Profil Institutionnel & Gouvernance
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-3 text-white drop-shadow-md">
                  ES-BTP
                </h1>
                <p className="text-base sm:text-lg text-slate-100 font-semibold tracking-wide drop-shadow-md flex items-center gap-2.5">
                  <span className="w-5 h-0.5 bg-[#FAB005]" />
                  « LE FUTUR SE CONSTRUIT MAINTENANT »
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-start lg:justify-end items-center">
                {/* Logo complètement libéré de tout rectangle : expression pure, fluide et agrandie sur l'image */}
                <div className="relative group transition-transform duration-300 hover:scale-[1.03] filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                  {/* Version agrandie sur écrans moyens et grands */}
                  <EsBtpLogo
                    variant="light"
                    mode="horizontal"
                    showSignature={false}
                    height="78px"
                    className="bg-transparent hidden sm:inline-flex"
                  />
                  {/* Version mobile adaptée */}
                  <EsBtpLogo
                    variant="light"
                    mode="horizontal"
                    showSignature={false}
                    height="56px"
                    className="bg-transparent sm:hidden inline-flex"
                  />
                </div>
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION EXECUTIVE : LE MOT DU DIRECTEUR GÉNÉRAL */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 relative overflow-hidden">
        <FuturisticMeshBackdrop variant="light" showGrid={false} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-0.5 bg-[#FAB005]" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#0B1320]">
                  Direction Générale
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight">
                LE MOT DU DIRECTEUR GÉNÉRAL
              </h2>
              <div className="mt-3">
                <EsBtpAccentBar />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Colonne Portrait Officiel du DG */}
              <div className="lg:col-span-5 flex justify-center">
                <ExecutivePortraitPoster />
              </div>

              {/* Colonne Discours & Vision du DG */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                {/* Quote d'accroche arrondi */}
                <div className="relative pl-6 py-4 border-l-4 border-[#FAB005] mb-8 bg-amber-50/50 p-6 rounded-2xl shadow-xs">
                  <Quote className="w-8 h-8 text-[#FAB005]/40 absolute top-3 right-4 pointer-events-none" />
                  <p className="text-base sm:text-lg font-bold text-[#0B1320] leading-snug font-heading italic">
                    « {COMPANY_INFO.management.quote} »
                  </p>
                </div>

                {/* Texte officiel du Mot du DG */}
                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {COMPANY_INFO.management.speech.map((paragraph, idx) => (
                    <p key={idx} className="text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Bloc Signature Institutionnelle */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase font-extrabold tracking-widest text-[#FAB005]">
                      Direction Générale
                    </p>
                    <p className="text-base font-black text-[#0B1320] font-heading mt-0.5">
                      Guy Alain SEKOULA
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      Directeur Général · ES-BTP
                    </p>
                  </div>

                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] transition-all rounded-xl cursor-pointer shadow-md font-heading"
                  >
                    <span>Échanger sur votre projet</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0B1320]" />
                  </button>
                </div>
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: NOTRE ENTREPRISE & CHANTIERS */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
        <FuturisticMeshBackdrop variant="light" showGrid={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-0.5 bg-[#FAB005]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-[#0B1320]">
                    Présentation
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight mb-3">
                  NOTRE ENTREPRISE
                </h2>
                <EsBtpAccentBar className="mb-6" />
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  Active dans le secteur du BTP au Gabon, ES-BTP est une entreprise dédiée à la conception, l'ingénierie et la réalisation de projets de bâtiment, de travaux routiers et d'infrastructures.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  Notre mission repose sur la mobilisation de savoir-faire techniques pointus, d'équipements adaptés et d'une gestion de chantier stricte pour répondre aux standards de qualité les plus exigeants du pays.
                </p>

                {/* Repères institutionnels arrondis */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs">
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                      Marché d'intervention
                    </span>
                    <span className="block text-sm font-bold text-[#0B1320] mt-1">
                      Territoire National
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs">
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                      Direction Générale
                    </span>
                    <span className="block text-sm font-bold text-[#0B1320] mt-1">
                      Guy Alain SEKOULA
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative bg-slate-100 border border-slate-200 overflow-hidden rounded-2xl shadow-lg">
                  <MotionImage
                    src={batimentAfricanImg}
                    alt="Chantier de bâtiment ES-BTP au Gabon"
                    aspectRatio="aspect-4/3"
                    variant="slide-left"
                    cornerAccents={true}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B1320] via-black/40 to-transparent p-5 text-white text-xs z-10 pointer-events-none">
                    <span className="text-[10px] uppercase font-bold text-[#FAB005] block mb-1">Chantier Bâtiment</span>
                    Supervision d'exécution et maîtrise des structures en béton armé
                  </div>
                </div>
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: NOTRE VISION & NOTRE APPROCHE */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <FuturisticMeshBackdrop variant="light" showGrid={false} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision arrondie */}
              <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-0.5 bg-[#FAB005]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-[#0B1320]">
                    Cap stratégique
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-[#0B1320] tracking-tight mb-4">
                  NOTRE VISION
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Participer activement à la modernisation du tissu urbain et du réseau d’infrastructures au Gabon en bâtissant des ouvrages sûrs, pérennes et adaptés au développement socio-économique des territoires.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Notre ambition s’inscrit dans la durée : allier rigueur opérationnelle et respect inconditionnel des engagements contractuels.
                </p>
              </div>

              {/* Approche arrondie */}
              <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-0.5 bg-[#FAB005]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-[#0B1320]">
                    Méthode opérationnelle
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-[#0B1320] tracking-tight mb-4">
                  NOTRE APPROCHE
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Une conduite de projet méthodique : de l’analyse géotechnique préalable au contrôle final de conformité, chaque phase est documentée, vérifiée et exécutée par des spécialistes qualifiés.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Maîtrise rigoureuse des délais et des approvisionnements</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sélection contrôlée des agrégats et matériaux de structure</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Respect inconditionnel des normes environnementales et de sécurité</span>
                  </li>
                </ul>
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* BANNIÈRE FUTURISTE CORPORATE INTÉGRÉE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <ZoomReveal>
          <FuturisticBanner
            title="INGÉNIERIE & INFRASTRUCTURES DURABLES AU GABON"
            subtitle="ES-BTP allie rigueur des calculs de structures, matériaux certifiés et engagement éco-responsable sur l’ensemble du territoire."
            tagline="STANDARDS INTERNATIONAUX"
            onCtaClick={onOpenContact}
            ctaText="Nous consulter"
          />
        </ZoomReveal>
      </div>

      {/* ============================================================ */}
      {/* SECTION 3: NOS VALEURS EN MOUVEMENT (PROFESSIONNALISME, PRÉCISION, SÉCURITÉ, DURABILITÉ) */}
      {/* ============================================================ */}
      <AnimatedValuesSection onCtaClick={onOpenContact} />

      {/* ============================================================ */}
      {/* SECTION 4: CAPITAL HUMAIN & L'ÉQUIPE ES-BTP (DIAPORAMA & TALENTS GABONAIS) */}
      {/* ============================================================ */}
      <div id="equipe-es-btp">
        <TeamSection />
      </div>

      {/* ============================================================ */}
      {/* SECTION CHIFFRES CLÉS & COMPTEURS DIGITAUX ES-BTP */}
      {/* ============================================================ */}
      <ZoomReveal>
        <StatsCounterSection />
      </ZoomReveal>

      {/* ============================================================ */}
      {/* SECTION 5: IMPLANTATION & CHANTIERS ROUTIERS */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
        <FuturisticMeshBackdrop variant="light" showGrid={false} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-0.5 bg-[#FAB005]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-[#0B1320]">
                    Ancrage Territorial
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight mb-3">
                  NOTRE IMPLANTATION
                </h2>
                <EsBtpAccentBar className="mb-6" />
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  ES-BTP opère depuis le Gabon avec une capacité de projection sur l’ensemble des provinces pour des projets routiers, de génie civil et de bâtiment.
                </p>
                
                <div className="p-4 bg-white border-l-4 border-[#FAB005] text-xs text-slate-700 mb-6 shadow-xs rounded-xl space-y-1">
                  <p className="font-bold text-[#0B1320] mb-1 text-sm">Siège & Direction :</p>
                  <p><span className="font-semibold text-slate-900">Adresse :</span> Sogatole Face à la FOPI, Libreville</p>
                  <p><span className="font-semibold text-slate-900">Boîte Postale :</span> BP 18394 Libreville, Gabon</p>
                  <p><span className="font-semibold text-slate-900">Contact :</span> <a href="tel:+24177088346" className="text-amber-700 font-mono font-bold hover:underline">(+241) 77 088 346</a> · <a href="mailto:esbtp2013@gmail.com" className="text-slate-800 font-mono font-bold hover:underline">esbtp2013@gmail.com</a></p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] rounded-xl transition-all cursor-pointer shadow-md font-heading"
                  >
                    <span>Prendre contact avec la direction</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0B1320]" />
                  </button>

                  <button
                    onClick={() => setIsBrochureOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl transition-all cursor-pointer shadow-xs font-heading"
                  >
                    <Download className="w-4 h-4 text-[#FAB005]" />
                    <span>Plaquette d'entreprise (PDF)</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative bg-slate-100 border border-slate-200 overflow-hidden rounded-2xl shadow-lg">
                  <MotionImage
                    src={routesAfricanImg}
                    alt="Chantier de travaux routiers en Afrique au Gabon"
                    aspectRatio="aspect-4/3"
                    variant="zoom-out"
                    cornerAccents={true}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B1320] via-black/40 to-transparent p-5 text-white text-xs z-10 pointer-events-none">
                    <span className="text-[10px] uppercase font-bold text-[#FAB005] block mb-1">Travaux Routiers</span>
                    Asphaltage, voiries lourdes et aménagement des axes de communication
                  </div>
                </div>
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* BANNIÈRE FLUIDE INSTITUTIONNELLE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <ZoomReveal>
          <FuturisticBanner
            theme="warm-amber"
            title="L’ENGAGEMENT TECHNIQUE AU SERVICE DE LA NATION"
            subtitle="ES-BTP met un point d’honneur à respecter rigoureusement les calendriers d’exécution, la sécurité de ses équipes et la pérennité des chantiers."
            tagline="PARTENARIATS D’EXCELLENCE"
            onCtaClick={onOpenContact}
            ctaText="Contacter notre direction"
          />
        </ZoomReveal>
      </div>

      {/* SECTION PARTENAIRES & CONFIANCE INSTITUTIONNELLE */}
      <ZoomReveal>
        <PartnersSection />
      </ZoomReveal>

      {/* Modal de Téléchargement de la Plaquette Institutionnelle */}
      <CorporateBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </div>
  );
};
