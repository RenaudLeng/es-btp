import React, { useState } from 'react';
import { NEWS, NewsItem } from '../data/btpData';
import { ArrowRight, X, Calendar, Tag, Newspaper, Sparkles, Building2 } from 'lucide-react';
import portLogistiqueImg from '../assets/images/gabon_port_logistique_1790147937593.jpg';
import { EsBtpAccentBar } from '../components/EsBtpAccentBar';
import { ZoomReveal } from '../components/ZoomReveal';
import { MotionImage } from '../components/MotionImage';

export const ActualitesView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* HERO HEADER — AVEC PÔLE LOGISTIQUE & PORT MODERNE */}
      {/* ============================================================ */}
      <section className="relative bg-[#081320] text-white py-16 sm:py-24 border-b border-slate-800 overflow-hidden">
        {/* Image de fond : Port et hub logistique moderne */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={portLogistiqueImg}
            alt="Pôle logistique et approvisionnements de chantier - ES-BTP"
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
                <Newspaper className="w-3.5 h-3.5 text-[#FAB005]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#FAB005]">
                  Espace Éditorial & Informations
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-4 text-white drop-shadow-md">
                ACTUALITÉS & VIE DE L'ENTREPRISE
              </h1>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed drop-shadow-sm">
                Suivi des activités, informations techniques et avancées des chantiers.
              </p>
              <div className="mt-4">
                <EsBtpAccentBar />
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* Articles Grid avec cartes arrondies */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ZoomReveal>
            <div className="mb-8 p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-xs text-slate-600 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#FAB005] shrink-0" />
              <span>
                <strong className="text-slate-800">Espace d'information officiel :</strong> Retrouvez ici les communiqués, nouvelles acquisitions matérielles et étapes majeures de nos projets.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {NEWS.map((article, index) => (
                <article
                  key={article.id}
                  className="group bg-white border border-slate-200 hover:border-[#FAB005]/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full overflow-hidden">
                      <MotionImage
                        src={article.image}
                        alt={article.title}
                        aspectRatio="aspect-16/9"
                        index={index}
                        variant="auto"
                        cornerAccents={true}
                        hoverScale={true}
                      />
                      <div className="absolute top-3 left-3 bg-[#0B1320]/90 backdrop-blur-md text-[#FAB005] px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md z-10">
                        {article.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[#FAB005]" />
                          {article.date}
                        </span>
                        <span>•</span>
                        <span className="text-slate-500 font-medium">Communication ES-BTP</span>
                      </div>

                      <h2 className="text-xl font-black font-heading text-[#0B1320] group-hover:text-[#163A63] transition-colors leading-tight mb-3">
                        {article.title}
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/60 group-hover:bg-amber-50/30 transition-colors">
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-bold uppercase tracking-wider text-[#0B1320] group-hover:text-[#FAB005] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Lire l'article complet</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FAB005] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* Modal de lecture d'article arrondi */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative aspect-16/9 w-full bg-slate-900">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-bold uppercase tracking-wider rounded-full">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span className="font-mono">{selectedArticle.date}</span>
              </div>

              <h2 className="text-2xl font-black font-heading text-[#0B1320] tracking-tight mb-4">
                {selectedArticle.title}
              </h2>

              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p className="font-semibold text-slate-900 text-base leading-relaxed">
                  {selectedArticle.excerpt}
                </p>
                <p>
                  Dans le cadre de ses activités et de son engagement envers ses partenaires, ES-BTP veille à maintenir une communication claire et rigoureuse sur l’état d’avancement de ses projets et ses orientations stratégiques.
                </p>
                <p>
                  Pour toute information complémentaire relative à cette publication ou pour solliciter un échange avec notre service communication, nos équipes demeurent à votre disposition.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
