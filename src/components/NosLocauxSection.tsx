import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Clock, Phone, Building2, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/btpData';
import { ZoomReveal } from './ZoomReveal';

export const NosLocauxSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const plusCode = '9FGF+HJ6';
  const fullAddress = 'Sogatole Face à la FOPI, Owendo, Gabon';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=9FGF%2BHJ6+Owendo+Gabon';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(plusCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="nos-locaux" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-200/80 relative overflow-hidden">
      {/* Motifs géométriques décoratifs légers */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAB005]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ZoomReveal>
          {/* En-tête de section */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAB005]/15 border border-[#FAB005]/40 text-[#0B1320] text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-4 h-4 text-[#FAB005]" />
              <span>Implantation Géographique & Bureaux</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#0B1320] tracking-tight">
              Nos Locaux à Owendo
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Venez échanger directement avec la Direction Générale et le Bureau d’Études d'ES-BTP. 
              Nos bureaux et ateliers techniques sont idéalement situés dans la zone industrielle d'Owendo.
            </p>
          </div>

          {/* Grille principale : Carte Interactive & Fiche Pratique */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* CARTE GOOGLE MAPS INTERACTIVE (7 COLS) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-[#0B1320] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex-1 flex flex-col relative group">
                {/* Bandeau d'information supérieur */}
                <div className="p-4 sm:p-5 bg-[#07111E] border-b border-slate-800 flex items-center justify-between gap-3 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAB005]/20 text-[#FAB005] flex items-center justify-center font-bold text-sm shrink-0">
                      <Building2 className="w-5 h-5 text-[#FAB005]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black font-heading text-white flex items-center gap-2">
                        <span>Siège Social & Ateliers ES-BTP</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </h3>
                      <p className="text-xs text-slate-400">
                        Owendo · Face à la FOPI (Gabon)
                      </p>
                    </div>
                  </div>

                  {/* Badge Plus Code interactif */}
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-mono font-bold text-[#FAB005]">
                    <span>{plusCode}</span>
                  </div>
                </div>

                {/* Cadre de la Carte Interactive centrée au mètre près sur le 9FGF+HJ6 */}
                <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] bg-slate-900">
                  <iframe
                    title="Carte Interactive Google Maps ES-BTP Owendo 9FGF+HJ6"
                    src="https://maps.google.com/maps?q=9FGF%2BHJ6%20Owendo,%20Gabon&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter saturate-105 contrast-105"
                    loading="lazy"
                    allowFullScreen
                  />

                  {/* Étiquette d'ancrage flottante sur la carte */}
                  <div className="absolute top-4 left-4 z-10 bg-[#0B1320]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#FAB005]/40 text-white shadow-xl pointer-events-none flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#FAB005] animate-ping" />
                    <div>
                      <span className="text-[11px] font-bold text-[#FAB005] block uppercase tracking-wider">
                        Repère GPS Précis
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        9FGF+HJ6 · Owendo
                      </span>
                    </div>
                  </div>

                  {/* Bouton d'accès rapide direct sur la carte */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 font-heading cursor-pointer"
                    >
                      <Navigation className="w-4 h-4 text-[#0B1320]" />
                      <span>Démarrer l'itinéraire GPS</span>
                    </a>
                  </div>
                </div>

                {/* Pied de carte informatif */}
                <div className="p-4 bg-[#091526] border-t border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Accès sécurisé pour poids lourds, véhicules légers et visiteurs</span>
                  </span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FAB005] hover:text-amber-300 transition-colors font-semibold flex items-center gap-1 shrink-0"
                  >
                    <span>Ouvrir dans l'application Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#FAB005]" />
                  </a>
                </div>
              </div>
            </div>

            {/* FICHE PRATIQUE & GUIDAGE ITINÉRAIRE (5 COLS) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Carte 1 : Adresse officielle & Coordonnées GPS */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#FAB005] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#FAB005]" />
                  </div>
                  <div>
                    <h3 className="text-base font-black font-heading text-[#0B1320]">
                      Adresse & Coordonnées GPS
                    </h3>
                    <p className="text-xs text-slate-500">
                      Localisation exacte des bureaux
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                      Adresse Physique
                    </span>
                    <p className="font-bold text-slate-900 text-base">
                      Sogatole Face à la FOPI
                    </p>
                    <p className="text-slate-600 font-medium">
                      BP 18394 Owendo, Estuaire · Gabon
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Google Maps Plus Code
                      </span>
                      <span className="font-mono font-black text-sm text-[#0B1320]">
                        {plusCode}
                      </span>
                    </div>

                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer"
                      title="Copier le code GPS"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Conseils d'accès */}
                  <div className="pt-2 text-xs text-slate-600 space-y-1.5">
                    <p className="font-semibold text-slate-800">
                      🚗 Repères d'accès routier :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                      <li>Zone industrielle et portuaire d'Owendo.</li>
                      <li>Face aux installations de la <strong>FOPI</strong> (Sogatole).</li>
                      <li>Grand portail d'accès pour engins de génie civil et parking visiteurs.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Carte 2 : Permanence & Accueil Visiteurs */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-black font-heading text-[#0B1320]">
                      Horaires d'Accueil
                    </h3>
                    <p className="text-xs text-slate-500">
                      Bureaux techniques & Direction
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700">Du Lundi au Vendredi</span>
                    <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      07h30 – 17h30
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700">Samedi & Urgences chantiers</span>
                    <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-lg">
                      Sur rendez-vous
                    </span>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                    <a
                      href="tel:+24177088346"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B1320] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FAB005]" />
                      <span>Appeler l'accueil (+241) 77 088 346</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </ZoomReveal>
      </div>
    </section>
  );
};
