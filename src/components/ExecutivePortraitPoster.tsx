import React, { useState } from 'react';
import { useDgPhoto } from '../context/DgPhotoContext';
import { ShieldCheck } from 'lucide-react';

interface ExecutivePortraitPosterProps {
  className?: string;
}

export const ExecutivePortraitPoster: React.FC<ExecutivePortraitPosterProps> = ({ className = '' }) => {
  const { dgPhotoUrl } = useDgPhoto();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative w-full max-w-sm mx-auto select-none group ${className}`}>
      {/* Decorative Golden Ambient Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-br from-[#FAB005]/30 via-transparent to-[#1E3A5F]/40 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main Poster Container */}
      <div className="relative bg-[#07111E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0B1320]/85 backdrop-blur-md rounded-lg border border-slate-700/60 text-[10px] font-bold text-slate-200 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FAB005]" />
            <span>DIRECTION GÉNÉRALE</span>
          </div>
        </div>

        {/* Executive Portrait Frame */}
        <div className="relative aspect-[3/4] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
          {/* Subtle loading placeholder */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950 transition-opacity duration-500 ${
              imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
          <img
            src={dgPhotoUrl}
            alt="Guy Alain SEKOULA - Directeur Général ES-BTP"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-103 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-90 scale-98'
            }`}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Official Executive Signature Banner */}
        <div className="relative bg-[#06101E] border-t-2 border-[#FAB005] px-5 py-4">
          {/* Diagonal geometric gold accent */}
          <div className="absolute top-0 right-0 w-12 h-full overflow-hidden pointer-events-none opacity-20">
            <div className="w-24 h-24 bg-[#FAB005] transform rotate-45 translate-x-12 -translate-y-6" />
          </div>

          <div className="relative z-10">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-white text-lg font-bold tracking-tight">Guy Alain</span>
              <span className="text-[#FAB005] text-lg font-black tracking-wider uppercase">SEKOULA</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-slate-300 text-xs font-semibold uppercase tracking-widest">
                Directeur Général
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FAB005]" />
              <span className="text-slate-400 text-[11px] font-medium">ES-BTP Gabon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
