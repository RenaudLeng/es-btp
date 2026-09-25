import React from 'react';

interface EsBtpAccentBarProps {
  className?: string;
  variant?: 'gold-navy' | 'navy-gold' | 'compact';
}

export const EsBtpAccentBar: React.FC<EsBtpAccentBarProps> = ({
  className = '',
  variant = 'gold-navy',
}) => {
  if (variant === 'compact') {
    return (
      <div className={`relative h-2 w-28 overflow-hidden flex ${className}`}>
        <div className="w-16 bg-[#0B1320] h-full" />
        <div className="w-4 bg-[#FAB005] h-full -skew-x-25 -ml-1" />
        <div className="w-8 bg-[#FAB005] h-full ml-1" />
      </div>
    );
  }

  return (
    <div className={`relative h-2.5 w-full max-w-xs overflow-hidden flex items-center ${className}`}>
      {/* Barre navy principale */}
      <div className="h-full flex-1 bg-[#0B1320]" />
      
      {/* Double biseau diagonal or caractéristique du badge du Directeur Général */}
      <div className="h-full w-4 bg-[#0B1320] relative">
        <div className="absolute inset-0 bg-[#FAB005] skew-x-[-30deg] origin-bottom-right" />
      </div>
      <div className="h-full w-2 bg-transparent" />
      <div className="h-full w-10 bg-[#FAB005] skew-x-[-30deg]" />
      <div className="h-full w-2 bg-transparent" />
      <div className="h-full w-5 bg-[#FAB005] skew-x-[-30deg]" />
    </div>
  );
};
