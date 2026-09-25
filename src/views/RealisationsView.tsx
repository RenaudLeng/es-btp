import React, { useState } from 'react';
import { ProjectItem, PROJECTS } from '../data/btpData';
import { MapPin, ArrowUpRight, Plus, SlidersHorizontal, Building2, HardHat, Compass, Sparkles } from 'lucide-react';
import skylineUrbainImg from '../assets/images/gabon_skyline_urbain_1790147905493.jpg';
import { EsBtpAccentBar } from '../components/EsBtpAccentBar';
import { ZoomReveal } from '../components/ZoomReveal';
import { MotionImage } from '../components/MotionImage';

interface RealisationsViewProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenContact: (projectTitle?: string) => void;
}

export const RealisationsView: React.FC<RealisationsViewProps> = ({
  onSelectProject,
  onOpenContact,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'BATIMENT' | 'ROUTES' | 'INFRASTRUCTURES'>('ALL');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'ALL') return true;
    return p.category === filter;
  });

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* HERO HEADER — AVEC PAYSAGE URBAIN & ARCHITECTURE MODERNE */}
      {/* ============================================================ */}
      <section className="relative bg-[#081320] text-white py-16 sm:py-24 border-b border-slate-800 overflow-hidden">
        {/* Image de fond : Skyline urbain et infrastructures modernes */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={skylineUrbainImg}
            alt="Infrastructures urbaines et génie civil moderne - ES-BTP"
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
                <Building2 className="w-3.5 h-3.5 text-[#FAB005]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#FAB005]">
                  Bibliothèque d'Ouvrages
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-4 text-white drop-shadow-md">
                NOS RÉALISATIONS
              </h1>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed drop-shadow-sm">
                Une sélection d’opérations et de typologies d’ouvrages conduits dans le respect rigoureux des règles de l’art.
              </p>
              <div className="mt-4">
                <EsBtpAccentBar />
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* Main Content & Gallery */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ZoomReveal>
            {/* Filter Bar avec boutons arrondis */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-12">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                <SlidersHorizontal className="w-4 h-4 text-[#FAB005]" />
                <span>Filtrer par catégorie ({filteredProjects.length} résultat{filteredProjects.length > 1 ? 's' : ''})</span>
              </div>

              {/* Boutons onglets arrondis (rounded-full) */}
              <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-full shadow-xs overflow-x-auto max-w-full">
                {[
                  { id: 'ALL', label: 'Tous les projets' },
                  { id: 'BATIMENT', label: 'Bâtiment' },
                  { id: 'ROUTES', label: 'Travaux Routiers' },
                  { id: 'INFRASTRUCTURES', label: 'Infrastructures' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id as any)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      filter === item.id
                        ? 'bg-[#0B1320] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid des cartes projets avec formes arrondies et mouvements mixtes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group bg-white border border-slate-200 hover:border-[#FAB005]/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image avec apparition dynamique & mixte */}
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
                        <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-xs text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-full z-10">
                          Projet type
                        </div>
                      )}
                    </div>

                    {/* Project Text */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#FAB005] shrink-0" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className="text-lg font-black font-heading text-[#0B1320] group-hover:text-[#163A63] transition-colors leading-snug mb-3">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action arrondi */}
                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-semibold bg-slate-50/60 group-hover:bg-amber-50/40 transition-colors">
                    <span className="text-[11px] text-slate-600 uppercase tracking-wider font-bold">
                      Fiche technique & détails
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 group-hover:border-[#FAB005] flex items-center justify-center text-[#FAB005] shadow-xs group-hover:translate-x-1 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Encadré d'action pour soumettre un projet */}
            <div className="mt-16 p-8 bg-gradient-to-r from-[#0B1320] to-[#163A63] text-white rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#FAB005] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Un projet d'infrastructure ou de bâtiment ?</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-heading">
                  Confiez l'étude et la réalisation à nos équipes d'ingénieurs
                </h3>
              </div>

              <button
                onClick={() => onOpenContact()}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] rounded-xl transition-all shadow-md shrink-0 cursor-pointer font-heading"
              >
                Demander un échange technique
              </button>
            </div>
          </ZoomReveal>
        </div>
      </section>
    </div>
  );
};
