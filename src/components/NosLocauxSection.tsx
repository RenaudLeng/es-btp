import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Clock, Phone, Building2, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/btpData';
import { ZoomReveal } from './ZoomReveal';
import { InteractiveGoogleMap } from './InteractiveGoogleMap';

export const NosLocauxSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const plusCode = '9FGF+HJ6';
  const fullAddress = 'Sogatole Face à la FOPI, Libreville, Gabon';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=9FGF%2BHJ6+Libreville+Gabon';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(plusCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="nos-locaux" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ZoomReveal>
          {/* En-tête de section sobre et professionnel */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAB005]/15 border border-[#FAB005]/40 text-[#0B1320] text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#FAB005]" />
              <span>Localisation & Bureaux</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-[#0B1320] tracking-tight">
              Nos Locaux à Libreville
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Siège social et ateliers techniques d'ES-BTP situés à Libreville (Sogatole Face à la FOPI).
            </p>
          </div>

          {/* Grille principale : Carte Interactive épurée & Fiche pratique */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* CARTE GOOGLE MAPS ÉPURÉE (7 COLS) - SANS TEXTES POLLUANTS SUR LA CARTE */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex-1 flex flex-col">
                {/* En-tête épuré de la carte */}
                <div className="px-5 py-3.5 bg-[#0B1320] text-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-[#FAB005]" />
                    <span className="text-xs sm:text-sm font-bold font-heading text-white">
                      Siège Social & Ateliers ES-BTP · Libreville
                    </span>
                  </div>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] text-xs font-bold rounded-lg transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Itinéraire</span>
                  </a>
                </div>

                {/* Composant de carte interactive Google Maps avec SDK @vis.gl/react-google-maps & Advanced Markers */}
                <div className="relative w-full h-[380px] sm:h-[420px] lg:h-[460px] bg-slate-900">
                  <InteractiveGoogleMap />
                </div>

                {/* Barre de statut sobre sous la carte */}
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono">Coordonnées GPS : 9FGF+HJ6 (Libreville)</span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B1320] hover:text-[#FAB005] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Ouvrir dans Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* FICHE PRATIQUE (5 COLS) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Adresse & GPS */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-md">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FAB005]" />
                  <span>Adresse Officielle</span>
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold text-slate-900 text-base">
                      Sogatole Face à la FOPI
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                      BP 18394 Libreville, Gabon
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Plus Code Google Maps
                      </span>
                      <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                        {plusCode}
                      </span>
                    </div>

                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copié</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Horaires & Accueil */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-md">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span>Horaires d'Ouverture</span>
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-600">Lundi – Vendredi</span>
                    <span className="font-bold text-slate-900">07h30 – 17h30</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-600">Samedi</span>
                    <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                      Sur rendez-vous
                    </span>
                  </div>

                  <a
                    href="tel:+24177088346"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B1320] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FAB005]" />
                    <span>Contact Accueil : (+241) 77 088 346</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </ZoomReveal>
      </div>
    </section>
  );
};
