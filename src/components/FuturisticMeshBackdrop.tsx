import React from 'react';

interface FuturisticMeshBackdropProps {
  className?: string;
  variant?: 'dark' | 'light' | 'gold-accent';
  showGrid?: boolean;
}

export const FuturisticMeshBackdrop: React.FC<FuturisticMeshBackdropProps> = ({
  className = '',
  variant = 'light',
  showGrid = true,
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      {/* Halo 1 : Or architectural doux */}
      <div
        className={`absolute -top-32 -right-24 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
          variant === 'dark' ? 'bg-[#FAB005]/20' : 'bg-[#FAB005]/25'
        } animate-pulse`}
        style={{ animationDuration: '8s' }}
      />

      {/* Halo 2 : Bleu profond / Océan */}
      <div
        className={`absolute -bottom-32 -left-24 w-[32rem] h-[32rem] rounded-full filter blur-3xl ${
          variant === 'dark' ? 'bg-[#163A63]/30 opacity-30' : 'bg-[#163A63]/10 opacity-40'
        }`}
      />

      {/* Halo 3 : Touche cyan futuriste légère */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full filter blur-3xl opacity-15 ${
          variant === 'dark' ? 'bg-cyan-500/15' : 'bg-amber-200/30'
        }`}
      />

      {/* Trame géométrique futuriste / Tech Blueprint Grid */}
      {showGrid && (
        <div
          className={`absolute inset-0 ${variant === 'dark' ? 'opacity-[0.04]' : 'opacity-[0.035]'}`}
          style={{
            backgroundImage: `linear-gradient(to right, ${
              variant === 'dark' ? '#FAB005' : '#0B1320'
            } 1px, transparent 1px), linear-gradient(to bottom, ${
              variant === 'dark' ? '#FAB005' : '#0B1320'
            } 1px, transparent 1px)`,
            backgroundSize: '3.5rem 3.5rem',
          }}
        />
      )}

      {/* Lignes d'ondes lumineuses subtiles diagonales */}
      <div
        className={`absolute inset-0 ${
          variant === 'dark' ? 'opacity-[0.06]' : 'opacity-[0.03]'
        }`}
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(250, 176, 5, 0.2) 35px, rgba(250, 176, 5, 0.2) 36px)',
        }}
      />
    </div>
  );
};
