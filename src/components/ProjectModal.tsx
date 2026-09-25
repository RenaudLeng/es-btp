import React from 'react';
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
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#0B192C] text-white">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E68A00]">
              {project.categoryLabel}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-xs text-slate-300">Fiche technique d’ouvrage</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer la fiche projet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image in Modal */}
        <div className="relative aspect-16/9 w-full bg-slate-900 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#E68A00]" />
              <span>{project.location}</span>
            </div>
            <h3 id="modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {project.isPlaceholder && (
            <div className="p-3 bg-amber-50/80 border-l-4 border-[#E68A00] text-xs text-amber-900">
              <span className="font-semibold block mb-0.5">Emplacement de référence technique</span>
              Ce modèle de projet illustre la typologie d’ouvrages pris en charge par ES-BTP au Gabon. Les données spécifiques, métrés et photographies de chantiers réels seront intégrés selon la feuille de route du client.
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Description de l'ouvrage
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          {project.technicalSpecs && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Données techniques disponibles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100">
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                      {spec.label}
                    </span>
                    <span className="block text-sm font-medium text-slate-900 mt-1">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Assurance Note */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-900 block">Exigence d'exécution ES-BTP</span>
              Chaque phase de gros œuvre et d’infrastructure fait l’objet de contrôles géotechniques, d’essais de matériaux et de rapports de conformité rigoureux.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Catégorie : <strong className="text-slate-800">{project.categoryLabel}</strong>
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white transition-colors cursor-pointer w-full sm:w-auto"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onContactAboutProject(project.title);
              }}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0B192C] hover:bg-[#163A63] border-l-2 border-[#E68A00] transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
            >
              <span>Échanger sur ce type de projet</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E68A00]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
