import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  Sparkles, 
  Building2, 
  HardHat, 
  CheckCircle2,
  LayoutGrid,
  Presentation
} from 'lucide-react';
import { EsBtpAccentBar } from './EsBtpAccentBar';
import { FuturisticMeshBackdrop } from './FuturisticMeshBackdrop';
import { MotionImage } from './MotionImage';

// Importation des portraits de l'équipe
import portraitRh from '../assets/images/portrait_rh_gabon_1790111047981.jpg';
import portraitConducteur from '../assets/images/portrait_conducteur_travaux_1790111063901.jpg';
import portraitComptable from '../assets/images/portrait_comptable_gabon_1790111080903.jpg';
import portraitIt from '../assets/images/portrait_it_gabon_1790111093628.jpg';
import portraitAssistante from '../assets/images/portrait_assistante_gabon_1790111105478.jpg';
import portraitQhse from '../assets/images/portrait_qhse_gabon_1790111118042.jpg';

export interface TeamMember {
  id: string;
  prenom: string;
  nom: string;
  role: string;
  departement: 'rh' | 'chantiers' | 'finance' | 'it' | 'qhse' | 'direction';
  departementLabel: string;
  photo: string;
  bio: string;
  competences: string[];
  responsabilite: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'rh-nadege',
    prenom: 'Nadège',
    nom: 'BIKENE BI NDONG',
    role: 'Directrice des Ressources Humaines (GRH)',
    departement: 'rh',
    departementLabel: 'Ressources Humaines & Talents',
    photo: portraitRh,
    responsabilite: 'Gestion prévisionnelle, recrutement de pointe & valorisation du capital humain',
    bio: 'Pilote la stratégie de développement des compétences, la politique d’inclusion et l’épanouissement professionnel des équipes d’ES-BTP. Elle veille à l’application rigoureuse du droit social et à la sécurité sociale sur chaque base-vie.',
    competences: ['Gestion des carrières', 'Droit social & RSE', 'Formation continue', 'Politique QVT'],
  },
  {
    id: 'chantiers-fabrice',
    prenom: 'Fabrice',
    nom: 'KOUMBA MAVOUNGOU',
    role: 'Conducteur Principal de Travaux & Chef de Chantier',
    departement: 'chantiers',
    departementLabel: 'Direction des Travaux & Exécution',
    photo: portraitConducteur,
    responsabilite: 'Pilotage opérationnel de terrain, gros œuvre & respect strict des délais de livraison',
    bio: 'Supervise l’implantation topographique, le coulage béton, le déploiement des engins et la coordination quotidienne des équipes d’exécution sur les chantiers de Libreville comme de l’intérieur du Gabon.',
    competences: ['Gros œuvre & Génie civil', 'VRD & Topographie', 'Coordination de chantiers', 'Sécurité active des hommes'],
  },
  {
    id: 'finance-clarisse',
    prenom: 'Clarisse',
    nom: 'ONDOUNGA BATEKE',
    role: 'Chef Comptable & Responsable Financière',
    departement: 'finance',
    departementLabel: 'Administration & Finances',
    photo: portraitComptable,
    responsabilite: 'Gouvernance budgétaire, décomptes provisoires & transparence des marchés',
    bio: 'Garantit la rigueur financière, le suivi des décomptes mensuels des marchés publics et privés, et la gestion prévisionnelle de la trésorerie au standard SYSCOHADA révisé.',
    competences: ['Comptabilité analytique BTP', 'Décomptes mensuels & finaux', 'Audit financier SYSCOHADA', 'Gestion des flux de trésorerie'],
  },
  {
    id: 'it-ghislain',
    prenom: 'Ghislain',
    nom: 'NGOUABI MIKOLO',
    role: 'Responsable Informatique & Digital BTP',
    departement: 'it',
    departementLabel: 'Systèmes d’Information & Innovation',
    photo: portraitIt,
    responsabilite: 'Digitalisation des chantiers, connectivité isolée & sécurité de l’infrastructure SI',
    bio: 'Assure l’interconnexion des bases de vie par liaisons sécurisées, la gestion électronique des plans d’architecte sur tablettes tactiles et la protection des données sensibles d’ES-BTP.',
    competences: ['Réseaux sécurisés chantiers', 'Digitalisation du suivi travaux', 'Cybersécurité des données', 'Support technique terrain'],
  },
  {
    id: 'assistante-elodie',
    prenom: 'Élodie',
    nom: 'MBOUMBA NZAMBA',
    role: 'Secrétaire Générale & Assistante de Direction',
    departement: 'direction',
    departementLabel: 'Secrétariat & Accueil Direction',
    photo: portraitAssistante,
    responsabilite: 'Coordination administrative de haut rang, dossiers d’appels d’offres & protocole',
    bio: 'Interface de premier plan entre la Direction Générale, les maîtres d’ouvrage institutionnels et les partenaires stratégiques. Elle pilote le montage administratif des dossiers d’offres et la conformité contractuelle.',
    competences: ['Montage d’offres administratives', 'Protocole institutionnel', 'Gestion documentaire sécurisée', 'Relation maîtres d’ouvrage'],
  },
  {
    id: 'qhse-aicha',
    prenom: 'Aïcha',
    nom: 'MAGANGA BOUNDZANGA',
    role: 'Ingénieure QHSE & Sécurité Chantiers',
    departement: 'qhse',
    departementLabel: 'Qualité, Hygiène, Sécurité & Environnement',
    photo: portraitQhse,
    responsabilite: 'Objectif « Zéro Accident », audits sécurité & respect des normes environnementales',
    bio: 'Garante de l’intégrité physique de nos équipes sur le terrain. Elle conduit quotidiennement les audits de port d’EPI, les quarts d’heure sécurité et veille au strict respect des standards ISO 9001 / 45001.',
    competences: ['PPSPS & Analyses des risques', 'Normes ISO 9001 & 45001', 'Contrôles environnementaux', 'Prévention active'],
  },
];

export const TeamSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [displayMode, setDisplayMode] = useState<'diapo' | 'grid'>('diapo');
  const [selectedMemberModal, setSelectedMemberModal] = useState<TeamMember | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const lastWheelTimeRef = useRef<number>(0);

  const totalMembers = TEAM_MEMBERS.length;
  const currentMember = TEAM_MEMBERS[currentIndex];
  const prevIndex = (currentIndex - 1 + totalMembers) % totalMembers;
  const nextIndex = (currentIndex + 1) % totalMembers;
  const prevMember = TEAM_MEMBERS[prevIndex];
  const nextMember = TEAM_MEMBERS[nextIndex];

  // Auto-play du diaporama (se met en pause lorsque le curseur survole la photo)
  useEffect(() => {
    if (!isPlaying || isHovered || displayMode !== 'diapo') return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalMembers);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, displayMode, totalMembers]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalMembers) % totalMembers);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMembers);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 300) return;
    lastWheelTimeRef.current = now;
    if (e.deltaY > 0 || e.deltaX > 0) {
      handleNext();
    } else if (e.deltaY < 0 || e.deltaX < 0) {
      handlePrev();
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-200 relative overflow-hidden">
      {/* Trame de fond fluide futuriste */}
      <FuturisticMeshBackdrop variant="light" showGrid={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================ */}
        {/* EN-TÊTE DE SECTION AVEC STYLE SIGNATURE DG */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-1 bg-[#FAB005]" />
              <span className="text-xs uppercase tracking-[0.2em] font-black text-[#0B1320]">
                Capital Humain & Expertises Gabonaises
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#0B1320] tracking-tight">
              L'ÉQUIPE ES-BTP
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              La réussite d'un ouvrage repose avant tout sur les femmes et les hommes qui le bâtissent. Découvrez les compétences pluridisciplinaires au service de nos projets au Gabon.
            </p>

            <div className="mt-4">
              <EsBtpAccentBar />
            </div>
          </div>

          {/* Sélecteur de mode (Diaporama ou Grille) + Contrôles du Diapo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="inline-flex p-1 bg-white border border-slate-300 rounded-xs shadow-xs">
              <button
                onClick={() => setDisplayMode('diapo')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                  displayMode === 'diapo'
                    ? 'bg-[#0B1320] text-white'
                    : 'text-slate-600 hover:text-[#0B1320]'
                }`}
                title="Affichage en Diaporama"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Diaporama</span>
              </button>

              <button
                onClick={() => setDisplayMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                  displayMode === 'grid'
                    ? 'bg-[#0B1320] text-white'
                    : 'text-slate-600 hover:text-[#0B1320]'
                }`}
                title="Affichage en Grille"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Vue d'ensemble</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MODE DIAPORAMA (SLIDESHOW INTERACTIF PREMIUM) */}
        {/* ============================================================ */}
        {displayMode === 'diapo' ? (
          <div className="space-y-6">
            {/* Boîte principale du Diaporama */}
            <div
              className="bg-white border border-slate-200/90 shadow-2xl rounded-xs overflow-hidden relative group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Ligne lumineuse dorée en haut */}
              <div className="h-1.5 bg-[#FAB005] w-full" />

              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* 1. Zone Portrait Format Cadré avec commandes directes au survol du curseur */}
                <div
                  className="lg:col-span-4 xl:col-span-4 relative bg-[#07111E] overflow-hidden min-h-[350px] sm:min-h-[390px] lg:min-h-[420px] max-h-[460px] group/photo select-none"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onWheel={handleWheel}
                >
                  <img
                    key={currentMember.id}
                    src={currentMember.photo}
                    alt={`${currentMember.prenom} ${currentMember.nom}`}
                    className="w-full h-full object-cover object-top transition-all duration-700 transform scale-100 group-hover/photo:scale-105"
                  />

                  {/* Gradient cinématique sombre avec reflet architectural */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/30 to-transparent opacity-90 pointer-events-none" />

                  {/* Badge Département flottant en haut à gauche */}
                  <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0B1320] bg-[#FAB005] rounded-xs shadow-md">
                      {currentMember.departementLabel.split(' ')[0]}
                    </span>
                  </div>

                  {/* Compteur Diapo + Contrôle Play/Pause direct sur l'image en haut à droite */}
                  <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      className="px-2 py-0.5 text-xs font-mono font-bold text-white bg-[#0B1320]/85 hover:bg-[#FAB005] hover:text-[#0B1320] border border-white/20 backdrop-blur-md rounded-xs flex items-center gap-1 transition-colors cursor-pointer shadow-md"
                      title={isPlaying ? 'Mettre en pause' : 'Relancer le défilement auto'}
                      aria-label="Pause/Lecture défilement"
                    >
                      {isPlaying ? (
                        <Pause className="w-3 h-3 text-[#FAB005]" />
                      ) : (
                        <Play className="w-3 h-3 text-[#FAB005]" />
                      )}
                      <span>0{currentIndex + 1} / 0{totalMembers}</span>
                    </button>
                  </div>

                  {/* Zones tactiles et cliquables Gauche / Droite directement sur l'image */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute inset-y-0 left-0 w-1/2 z-10 cursor-pointer focus:outline-hidden"
                    aria-label={`Aller au profil précédent : ${prevMember.prenom}`}
                    title={`Cliquer pour voir le profil précédent : ${prevMember.prenom} ${prevMember.nom}`}
                  />
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute inset-y-0 right-0 w-1/2 z-10 cursor-pointer focus:outline-hidden"
                    aria-label={`Aller au profil suivant : ${nextMember.prenom}`}
                    title={`Cliquer pour voir le profil suivant : ${nextMember.prenom} ${nextMember.nom}`}
                  />

                  {/* ============================================================ */}
                  {/* GALERIE DOCK DE MINI-PORTRAITS SUR L'IMAGE (SURVOL IMMÉDIAT) */}
                  {/* ============================================================ */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#0B1320]/90 backdrop-blur-md rounded-full border border-white/25 shadow-2xl opacity-90 group-hover/photo:opacity-100 transition-all duration-300 pointer-events-auto">
                    {TEAM_MEMBERS.map((m, idx) => {
                      const isCurrent = idx === currentIndex;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onMouseEnter={() => {
                            setCurrentIndex(idx);
                            setIsPlaying(false);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(idx);
                            setIsPlaying(false);
                          }}
                          className={`group/avatar relative transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? 'ring-2 ring-[#FAB005] scale-110 shadow-lg'
                              : 'opacity-65 hover:opacity-100 hover:scale-110'
                          }`}
                          aria-label={`Voir ${m.prenom} ${m.nom}`}
                          title={`Survoler pour voir : ${m.prenom} ${m.nom}`}
                        >
                          <img
                            src={m.photo}
                            alt={m.prenom}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover object-top border ${
                              isCurrent ? 'border-[#FAB005]' : 'border-white/40'
                            }`}
                          />

                          {/* Bulle d'information flottante au survol */}
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#0B1320] text-white text-[10px] font-bold uppercase tracking-wider rounded border border-[#FAB005]/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-40">
                            {m.prenom} · {m.departementLabel.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ============================================================ */}
                  {/* GRANDES COMMANDES FLOTTANTES AU SURVOL DU CURSEUR            */}
                  {/* ============================================================ */}

                  {/* Bouton Flèche Gauche directe sur l'image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-[#0B1320]/90 hover:bg-[#FAB005] text-white hover:text-[#0B1320] border border-white/30 hover:border-[#FAB005] backdrop-blur-md shadow-2xl flex items-center gap-1.5 transition-all duration-300 transform opacity-80 group-hover/photo:opacity-100 -translate-x-1 group-hover/photo:translate-x-0 hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label={`Profil précédent: ${prevMember.prenom}`}
                    title={`Précédent : ${prevMember.prenom} ${prevMember.nom}`}
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider pr-1 hidden sm:inline">
                      {prevMember.prenom}
                    </span>
                  </button>

                  {/* Bouton Flèche Droite directe sur l'image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-[#0B1320]/90 hover:bg-[#FAB005] text-white hover:text-[#0B1320] border border-white/30 hover:border-[#FAB005] backdrop-blur-md shadow-2xl flex items-center gap-1.5 transition-all duration-300 transform opacity-80 group-hover/photo:opacity-100 translate-x-1 group-hover/photo:translate-x-0 hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label={`Profil suivant: ${nextMember.prenom}`}
                    title={`Suivant : ${nextMember.prenom} ${nextMember.nom}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider pl-1 hidden sm:inline">
                      {nextMember.prenom}
                    </span>
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  {/* Nom officiel au bas du portrait style DG */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-20 text-white pointer-events-none">
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <span className="text-lg sm:text-xl font-black font-heading tracking-tight text-white drop-shadow-sm">
                        {currentMember.prenom}
                      </span>
                      <span className="text-lg sm:text-xl font-black font-heading tracking-tight text-[#FAB005] drop-shadow-sm">
                        {currentMember.nom}
                      </span>
                    </div>
                    <p className="text-[11px] uppercase font-bold tracking-wider text-slate-300 mt-0.5">
                      {currentMember.role}
                    </p>

                    {/* Indication visuelle discrète au survol du curseur */}
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/15 text-[10px] font-mono text-slate-300 opacity-90 group-hover/photo:opacity-100 transition-opacity duration-300">
                      <span className="text-[#FAB005] flex items-center gap-1">
                        ← {prevMember.prenom}
                      </span>
                      <span className="text-slate-300 font-sans text-[10px] tracking-wide">
                        Survoler ou molette pour faire défiler
                      </span>
                      <span className="text-[#FAB005] flex items-center gap-1">
                        {nextMember.prenom} →
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Zone Détails & Rôle Corporate */}
                <div className="lg:col-span-8 xl:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-white to-slate-50 relative">
                  <div>
                    {/* En-tête de fiche */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-[#FAB005] font-bold block">
                          Pôle d'intervention
                        </span>
                        <h3 className="text-lg sm:text-xl font-black font-heading text-[#0B1320] mt-0.5">
                          {currentMember.departementLabel}
                        </h3>
                      </div>

                      {/* Barre signature compacte */}
                      <EsBtpAccentBar variant="compact" />
                    </div>

                    {/* Responsabilité clé */}
                    <div className="mt-6 p-4 bg-slate-100/80 border-l-4 border-[#FAB005] rounded-r-xs">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1320] mb-1">
                        <Briefcase className="w-3.5 h-3.5 text-[#FAB005]" />
                        <span>Mission Stratégique</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                        {currentMember.responsabilite}
                      </p>
                    </div>

                    {/* Biographie & Parcours */}
                    <div className="mt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Présentation du collaborateur
                      </h4>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {currentMember.bio}
                      </p>
                    </div>

                    {/* Compétences certifiées */}
                    <div className="mt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                        Domaines de maîtrise & compétences
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentMember.competences.map((comp, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B1320] bg-amber-50 border border-[#FAB005]/40 rounded-xs"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#FAB005]" />
                            <span>{comp}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mention certifiée d'encadrement technique (navigation entièrement déportée sur le portrait interactif) */}
                  <div className="mt-8 pt-4 border-t border-slate-200/90 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-slate-700">
                        Encadrement Technique & Direction Opérationnelle · ES-BTP Gabon
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                      <span>Collaborateur 0{currentIndex + 1} / 0{totalMembers}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* MODE GRILLE / VUE D'ENSEMBLE COMPLÈTE */
          /* ============================================================ */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.id}
                onClick={() => setSelectedMemberModal(member)}
                className="bg-white border border-slate-200 shadow-md rounded-xs overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Portrait avec format équilibré & légèrement réduit */}
                  <div className="relative w-full bg-[#07111E] overflow-hidden h-48 sm:h-52">
                    <img
                      src={member.photo}
                      alt={`${member.prenom} ${member.nom}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0B1320] bg-[#FAB005] shadow-xs rounded-xs">
                        {member.departementLabel.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Bandeau officiel style DG */}
                  <div className="bg-[#0B1320] text-white p-4 relative overflow-hidden border-t-2 border-[#FAB005]">
                    <div className="flex flex-col relative z-10">
                      <div className="flex flex-wrap items-baseline gap-1.5 leading-tight">
                        <span className="text-base font-black font-heading text-white">
                          {member.prenom}
                        </span>
                        <span className="text-base font-black font-heading text-[#FAB005]">
                          {member.nom}
                        </span>
                      </div>
                      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-300 line-clamp-1">
                        {member.role}
                      </div>
                    </div>
                    {/* Biseau or décoratif en coin */}
                    <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-[#FAB005] opacity-25 rotate-45 pointer-events-none" />
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-100 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                    {member.bio}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {member.competences.slice(0, 2).map((comp, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 text-[9.5px] font-medium text-slate-600 bg-slate-100 rounded-xs"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>

                    <span className="text-[10px] font-bold text-[#FAB005] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                      Détails +
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODALE DÉTAIL DU COLLABORATEUR (POUR LA VUE GRILLE) */}
      {/* ============================================================ */}
      {selectedMemberModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedMemberModal(null);
          }}
        >
          <div
            className="relative w-full max-w-lg bg-white border border-slate-200 shadow-2xl rounded-xs overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/9 bg-slate-950 overflow-hidden">
              <img
                src={selectedMemberModal.photo}
                alt={selectedMemberModal.prenom}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/60 to-transparent" />

              <button
                onClick={() => setSelectedMemberModal(null)}
                className="absolute top-3 right-3 p-1.5 bg-[#0B1320]/80 text-white hover:bg-white hover:text-[#0B1320] rounded-xs transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                ✕
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAB005] block">
                  {selectedMemberModal.departementLabel}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black font-heading">{selectedMemberModal.prenom}</span>
                  <span className="text-xl font-black font-heading text-[#FAB005]">{selectedMemberModal.nom}</span>
                </div>
                <p className="text-xs text-slate-300 font-bold uppercase">{selectedMemberModal.role}</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                  Mission & Rôle
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedMemberModal.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Compétences techniques
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMemberModal.competences.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium text-[#0B1320] bg-amber-50 border border-[#FAB005]/40 rounded-xs"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Cadre & Talent · ES-BTP Gabon
                </span>
                <button
                  onClick={() => setSelectedMemberModal(null)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0B1320] hover:bg-[#163A63] border-l-2 border-[#FAB005] rounded-xs cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
