import React, { useState } from 'react';
import { WhatsAppIcon } from './SocialLinks';
import { useSiteData } from '../context/SiteDataContext';
import { Phone, X, MessageSquare, Clock, ArrowRight, Lock } from 'lucide-react';

interface EnhancedFloatingContactProps {
  onOpenSuperAdmin?: () => void;
}

export const EnhancedFloatingContact: React.FC<EnhancedFloatingContactProps> = ({ onOpenSuperAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { companyInfo } = useSiteData();

  return (
    <aside aria-label="Assistance & Contact Rapide ES-BTP" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Popover rapide */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-[#0B1320] text-white border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="p-4 bg-gradient-to-r from-[#0B1320] to-[#163A63] border-b border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B1320]" />
              </div>
              <div>
                <h4 className="text-xs font-black font-heading text-white tracking-wide">
                  ES-BTP Contact Direct
                </h4>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span>En ligne</span> · <span>Libreville & Owendo</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Fermer le menu de contact"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-xs">
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Besoin d'un renseignement rapide, d'une offre de prix ou de joindre la direction technique ?
            </p>

            <a
              href="https://wa.me/24177088346?text=Bonjour%20ES-BTP%2C%20je%20souhaite%20des%20renseignements%20sur%20vos%20travaux%20et%20chantiers."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-all shadow-md group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Ouvrir WhatsApp (+241 77)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <a
                href={`tel:${companyInfo.phone1.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 text-slate-300 hover:text-[#FAB005] transition-colors font-mono font-semibold"
              >
                <Phone className="w-3 h-3 text-[#FAB005]" />
                <span>{companyInfo.phone1}</span>
              </a>
              {companyInfo.phone2 && (
                <a
                  href={`tel:${companyInfo.phone2.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-[#FAB005] transition-colors font-mono font-semibold"
                >
                  <Phone className="w-3 h-3 text-[#FAB005]" />
                  <span>{companyInfo.phone2}</span>
                </a>
              )}
            </div>

            {/* Accès discret SuperAdmin dans la bulle */}
            {onOpenSuperAdmin && (
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenSuperAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-white/5 hover:bg-[#FAB005]/20 text-[#FAB005] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#FAB005]/30"
                >
                  <Lock className="w-3 h-3 text-[#FAB005]" />
                  <span>Espace SuperAdmin Direction</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bouton principal déclencheur avec badge pulse */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0B1320]/90 backdrop-blur-md text-white border border-slate-700/80 text-xs font-bold shadow-lg hover:border-[#FAB005]/60 hover:text-[#FAB005] transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Besoin d'un devis ?</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contacter ES-BTP sur WhatsApp"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/40 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <WhatsAppIcon className="w-7 h-7 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FAB005] text-[#0B1320] text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
