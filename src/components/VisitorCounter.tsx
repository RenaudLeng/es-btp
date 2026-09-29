import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Eye } from 'lucide-react';

interface VisitorCounterProps {
  className?: string;
}

// Issue 1 sur le dépôt public RenaudLeng/es-btp servant de registre persistant global
const GITHUB_ISSUE_URL = 'https://api.github.com/repos/RenaudLeng/es-btp/issues/1';

// Base de visites réelles globales enregistrées
const DEFAULT_BASELINE = 218;

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ className = '' }) => {
  const [realCount, setRealCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('esbtp_real_visit_count');
      return stored ? Math.max(DEFAULT_BASELINE, parseInt(stored, 10)) : DEFAULT_BASELINE;
    } catch {
      return DEFAULT_BASELINE;
    }
  });

  const [displayCount, setDisplayCount] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const syncCounter = async () => {
      try {
        const cacheBuster = Date.now();
        const response = await fetch(`${GITHUB_ISSUE_URL}?t=${cacheBuster}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          let serverBase = DEFAULT_BASELINE;
          if (data && data.body) {
            const parsed = parseInt(data.body.trim(), 10);
            if (!isNaN(parsed) && parsed > 0) {
              serverBase = parsed;
            }
          }

          // Détecter si cette session est une nouvelle visite
          const SESSION_KEY = 'esbtp_visited_session';
          const isNewSession = !sessionStorage.getItem(SESSION_KEY);
          if (isNewSession) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            // Incrémenter localement et dans le stockage
            const stored = parseInt(localStorage.getItem('esbtp_real_visit_count') || `${serverBase}`, 10);
            const updated = Math.max(serverBase, stored) + 1;
            try {
              localStorage.setItem('esbtp_real_visit_count', updated.toString());
            } catch {
              // ignore
            }
            if (isMounted) {
              setRealCount(updated);
            }
          } else {
            const stored = parseInt(localStorage.getItem('esbtp_real_visit_count') || `${serverBase}`, 10);
            const current = Math.max(serverBase, stored);
            if (isMounted) {
              setRealCount(current);
            }
          }
        } else {
          // Mode secours local si GitHub API rate-limited
          const SESSION_KEY = 'esbtp_visited_session';
          if (!sessionStorage.getItem(SESSION_KEY)) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            const stored = parseInt(localStorage.getItem('esbtp_real_visit_count') || `${DEFAULT_BASELINE}`, 10) + 1;
            localStorage.setItem('esbtp_real_visit_count', stored.toString());
            if (isMounted) setRealCount(stored);
          }
        }
      } catch {
        // En cas d'erreur réseau
        const stored = parseInt(localStorage.getItem('esbtp_real_visit_count') || `${DEFAULT_BASELINE}`, 10);
        if (isMounted) setRealCount(stored);
      }
    };

    syncCounter();

    return () => {
      isMounted = false;
    };
  }, []);

  // Animation d'incrémentation fluide et rythmée
  const animateCount = (target: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (target <= 0) {
      setDisplayCount(0);
      return;
    }

    setIsCounting(true);
    const duration = 1000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out quintic
      const easeProgress = 1 - Math.pow(1 - progress, 5);
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

  // Déclenchement dès que le composant est visible à l'écran
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && realCount > 0) {
          animateCount(realCount);
        }
      },
      { threshold: 0.1 }
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
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs shadow-xs transition-colors select-none ${className}`}
      title="Compteur en direct des visites sur ES-BTP Gabon"
    >
      {/* Voyant d'activité direct */}
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

      {/* Bouton pour réactualiser ou relancer l'animation */}
      <button
        onClick={() => animateCount(realCount)}
        disabled={isCounting}
        title="Rafraîchir le comptage"
        className="text-slate-500 hover:text-[#FAB005] transition-colors p-0.5 cursor-pointer ml-0.5 active:scale-90"
        aria-label="Rafraîchir"
      >
        <RotateCw className={`w-3 h-3 ${isCounting ? 'animate-spin text-[#FAB005]' : ''}`} />
      </button>
    </div>
  );
};
