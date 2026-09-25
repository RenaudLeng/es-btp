import React, { useState, useEffect, useRef } from 'react';
import { RotateCw } from 'lucide-react';

interface VisitorCounterProps {
  className?: string;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ className = '' }) => {
  const [realCount, setRealCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('esbtp_actual_hits');
      return stored ? Math.max(1, parseInt(stored, 10)) : 1;
    } catch {
      return 1;
    }
  });

  const [displayCount, setDisplayCount] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // 1. Récupération et incrémentation RÉELLE du compteur global pour es-btp.vercel.app
  useEffect(() => {
    let isMounted = true;

    const fetchRealHits = async () => {
      try {
        // Service de comptage public réel pour es-btp.vercel.app
        const response = await fetch('https://hits.sh/es-btp.vercel.app.svg', {
          cache: 'no-cache',
        });

        if (response.ok) {
          const svgText = await response.text();
          // Extraction du nombre réel de hits dans l'attribut aria-label ou balise text
          const match = svgText.match(/hits:\s*(\d+)/i) || svgText.match(/>(\d+)<\/text>/i);
          if (match && match[1]) {
            const count = parseInt(match[1], 10);
            if (isMounted && count > 0) {
              setRealCount(count);
              try {
                localStorage.setItem('esbtp_actual_hits', count.toString());
              } catch {
                // ignore
              }
            }
          }
        }
      } catch {
        // En cas d'absence de réseau, incrémentation locale réelle par session
        try {
          const SESSION_KEY = 'esbtp_session_hit_registered';
          if (!sessionStorage.getItem(SESSION_KEY)) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            const stored = parseInt(localStorage.getItem('esbtp_actual_hits') || '1', 10) + 1;
            localStorage.setItem('esbtp_actual_hits', stored.toString());
            if (isMounted) setRealCount(stored);
          }
        } catch {
          // ignore
        }
      }
    };

    fetchRealHits();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Animation d'incrémentation fluide (0 -> realCount)
  const animateCount = (target: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (target <= 0) {
      setDisplayCount(0);
      return;
    }

    setIsCounting(true);
    // Vitesse adaptée selon le volume pour un effet immédiat et élégant
    const duration = Math.min(1400, Math.max(600, target * 50));
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Décélération exponentielle pour atterrissage précis
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.floor(easeProgress * target);
      setDisplayCount(val);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayCount(target);
        setIsCounting(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  // 3. Déclenchement à chaque arrivée dans le viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && realCount > 0) {
          animateCount(realCount);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [realCount]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-850 border border-slate-800 text-xs shadow-xs transition-colors select-none ${className}`}
      title="Compteur réel d'accès au site ES-BTP Gabon"
    >
      {/* Indicateur de session en direct */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <span className="text-[11px] font-mono text-slate-400 font-medium">
        Visites réelles :
      </span>

      <span className="font-mono font-bold text-[#FAB005] tracking-wider tabular-nums text-xs">
        {displayCount.toLocaleString('fr-FR')}
      </span>

      {/* Relance manuelle discrète */}
      <button
        onClick={() => animateCount(realCount)}
        disabled={isCounting}
        title="Rejouer le comptage"
        className="text-slate-500 hover:text-[#FAB005] transition-colors p-0.5 cursor-pointer ml-0.5 active:scale-90"
      >
        <RotateCw className={`w-3 h-3 ${isCounting ? 'animate-spin text-[#FAB005]' : ''}`} />
      </button>
    </div>
  );
};
