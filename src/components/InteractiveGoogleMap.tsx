import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import {
  Building2,
  Navigation,
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

// Coordonnées précises du siège ES-BTP à Libreville (Sogatole Face à la FOPI / Zone Portuaire & Industrielle)
// Plus Code: 9FGF+HJ6 Libreville, Gabon
// Latitude: 0.35402, Longitude: 9.48912
const ES_BTP_COORDINATES = {
  lat: 0.35402,
  lng: 9.48912,
};

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${ES_BTP_COORDINATES.lat},${ES_BTP_COORDINATES.lng}+ES-BTP+Libreville+Gabon`;

interface InteractiveMapProps {
  apiKey: string;
}

const EsBtpMapContent: React.FC = () => {
  const { companyInfo } = useSiteData();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'hybrid'>('roadmap');

  return (
    <>
      <Map
        mapId="DEMO_MAP_ID"
        defaultCenter={ES_BTP_COORDINATES}
        defaultZoom={16}
        mapTypeId={mapTypeId}
        gestureHandling="cooperative"
        disableDefaultUI={false}
        className="w-full h-full"
        internalUsageAttributionIds={['gmp_git_agentskills_v1']}
      >
        <AdvancedMarker
          ref={markerRef}
          position={ES_BTP_COORDINATES}
          title="ES-BTP · Siège Social & Ateliers Techniques"
          onClick={() => setInfoWindowOpen((prev) => !prev)}
        >
          <Pin
            background="#0B1320"
            borderColor="#FAB005"
            glyphColor="#FAB005"
            scale={1.3}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#FAB005] animate-ping" />
          </Pin>
        </AdvancedMarker>

        {infoWindowOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={320}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
            <div className="p-1 font-sans text-slate-900">
              <div className="flex items-center gap-2 mb-1.5 border-b border-slate-100 pb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FAB005] bg-[#0B1320] px-2 py-0.5 rounded">
                  ES-BTP Gabon
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Siège Principal</span>
              </div>

              <h4 className="font-black text-xs text-[#0B1320] leading-snug">
                ES-BTP Gabon
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug font-medium">
                {companyInfo.address || 'Sogatole Face à la FOPI'}
              </p>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                {companyInfo.bp} {companyInfo.city} · Plus Code: 9FGF+HJ6
              </p>

              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <a
                  href={`tel:${(companyInfo.phone1 || '+241 77 08 83 46').replace(/\s+/g, '')}`}
                  className="font-bold text-slate-800 hover:text-amber-600 flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#FAB005]" />
                  <span>{companyInfo.phone1 || '+241 77 08 83 46'}</span>
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0B1320] hover:text-amber-600 underline"
                >
                  <span>Itinéraire GPS</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>

      {/* Bouton de bascule Vue Plan / Satellite */}
      <div className="absolute top-3 left-3 z-10">
        <button
          type="button"
          onClick={() => setMapTypeId((prev) => (prev === 'roadmap' ? 'hybrid' : 'roadmap'))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1320]/90 hover:bg-[#0B1320] text-white text-xs font-bold shadow-lg backdrop-blur-md border border-slate-700 transition-all cursor-pointer group"
          title="Basculer entre la vue Plan et Satellite"
        >
          <Layers className="w-3.5 h-3.5 text-[#FAB005] group-hover:rotate-12 transition-transform" />
          <span>{mapTypeId === 'roadmap' ? 'Vue Satellite' : 'Vue Plan'}</span>
        </button>
      </div>

      {/* Badge de localisation en direct */}
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B1320]/80 backdrop-blur-md border border-[#FAB005]/40 text-[#FAB005] text-[10px] font-mono font-bold shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>9FGF+HJ6 · Libreville</span>
        </div>
      </div>
    </>
  );
};

export const InteractiveGoogleMap: React.FC = () => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  // Si aucune clé API n'est configurée, on propose un fallback propre avec iframe officielle
  if (!apiKey) {
    return (
      <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-700">
        <iframe
          title="Carte Google Maps Siège Social ES-BTP Libreville"
          src="https://maps.google.com/maps?q=9FGF%2BHJ6%20Libreville,%20Gabon&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
      <APIProvider apiKey={apiKey} libraries={['marker']}>
        <EsBtpMapContent />
      </APIProvider>
    </div>
  );
};
