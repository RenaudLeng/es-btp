import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // S'affiche discrètement une fois que l'utilisateur a défilé plus de 320px
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Remonter en haut de la page"
      title="Haut de page"
      className={`fixed z-30 bottom-5 left-5 sm:bottom-6 sm:left-6 w-10 h-10 rounded-full bg-[#0B1320]/80 hover:bg-[#0B1320] text-slate-300 hover:text-[#FAB005] border border-slate-700/60 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer select-none active:scale-95 group hover:border-[#FAB005]/50 hover:shadow-xl hover:shadow-amber-500/10 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronUp className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
};
