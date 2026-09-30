import React, { useEffect } from 'react';
import { ProjectItem } from '../data/btpData';
import { X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactAboutProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactAboutProject,
}) => {
  // Fermeture par touche Echap et verrouillage du scroll de fond
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        // Clic dans le vide (sur le fond) ferme la modale
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Conteneur de modale borné à 92vh maximum avec Header et Footer fixes */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ============================================================ */}
        {/* HEADER FIXE : Toujours visible en haut, avec bouton fermeture */}
        {/* ============================================================ */}
        <div className="shrink-0 flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-800 bg-[#0B1320] text-white z-20 shadow-xs">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FAB005] truncate">
              {project.categoryLabel}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-300 truncate">Fiche technique d’ouvrage</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Fermer la fiche projet"
            title="Fermer (ou cliquer dans le vide)"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* ============================================================ */}
        {/* CORPS SCROLLABLE : Défilement fluide interne si l'écran est petit */}
        {/* ============================================================ */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Hero Image in Modal */}
          <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-slate-900 overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            
            <div className="absolute bottom-3 sm:bottom-4 left-5 right-5 text-white">
              <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#FAB005]" />
                <span>{project.location}</span>
              </div>
              <h3 id="modal-title" className="text-lg sm:text-2xl font-black font-heading text-white drop-shadow-xs leading-snug">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 sm:p-7 space-y-5">
            {project.isPlaceholder && (
              <div className="p-3 bg-amber-50/90 border-l-4 border-[#FAB005] rounded-r-lg text-xs text-amber-950 leading-relaxed shadow-2xs">
                <span className="font-bold text-amber-900 block mb-0.5">Emplacement de référence technique</span>
                Ce modèle de projet illustre la typologie d’ouvrages pris en charge par ES-BTP au Gabon. Les données spécifiques, métrés et photographies de chantiers réels seront intégrés selon la feuille de route du client.
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Description de l'ouvrage
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.keyMetric && (
              <div className="p-3.5 bg-[#0B1320] text-white rounded-xl flex items-center justify-between border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#FAB005] block">
                    Indicateur de référence
                  </span>
                  <span className="text-xs text-slate-300">
                    {project.keyMetric.label}
                  </span>
                </div>
                <span className="text-base sm:text-lg font-black text-[#FAB005] font-mono px-3 py-1 bg-white/10 rounded-lg">
                  {project.keyMetric.value}
                </span>
              </div>
            )}

            {/* Technical Specifications Grid */}
            {project.technicalSpecs && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                  Données techniques disponibles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                        {spec.label}
                      </span>
                      <span className="block text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Assurance Note */}
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-0.5">Exigence d'exécution ES-BTP</span>
                Chaque phase de gros œuvre et d’infrastructure fait l’objet de contrôles géotechniques, d’essais de matériaux et de rapports de conformité rigoureux.
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* FOOTER FIXE : Toujours visible en bas de l'écran avec boutons */}
        {/* ============================================================ */}
        <div className="shrink-0 px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Catégorie : <strong className="text-slate-800">{project.categoryLabel}</strong>
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white rounded-xl transition-colors cursor-pointer w-1/3 sm:w-auto text-center"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onContactAboutProject(project.title);
              }}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-gradient-to-r from-[#FAB005] to-amber-400 hover:brightness-105 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer w-2/3 sm:w-auto shadow-xs font-heading"
            >
              <span>Échanger sur ce type de projet</span>
              <ArrowRight className="w-4 h-4 text-[#0B1320]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
