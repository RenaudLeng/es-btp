import React, { useEffect } from 'react';
import { CheckCircle2, X, Clock, ShieldCheck, Mail, Building2, MapPin } from 'lucide-react';
import { EsBtpLogo } from './EsBtpLogo';

interface FormNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  senderName: string;
  senderEmail: string;
  recipientEmail?: string;
  projectType?: string;
}

export const FormNotification: React.FC<FormNotificationProps> = ({
  isOpen,
  onClose,
  senderName,
  senderEmail,
  recipientEmail = 'esbtp2013@gmail.com',
  projectType,
}) => {
  // Auto-dismiss après 12 secondes
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 12000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <aside
      role="alert"
      aria-live="assertive"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-lg w-[calc(100vw-2rem)] bg-[#07111E] text-white rounded-2xl border-2 border-[#FAB005]/80 shadow-2xl shadow-black/70 overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-300"
    >
      {/* Liseré tricolore Gabon officiel ES-BTP en haut */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#009e60] via-[#FAB005] to-[#163A63]" />

      <div className="p-4 sm:p-5">
        {/* Entête avec Logo officiel ES-BTP et bouton fermer */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="bg-white/95 px-2.5 py-1 rounded-lg shadow-xs flex items-center">
              <EsBtpLogo variant="dark" mode="horizontal" height={22} withGlow={false} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FAB005] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Accusé d'Envoi Officiel
              </span>
              <span className="text-[9px] text-slate-400">Direction Générale · Libreville Gabon</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fermer la notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corps de la notification */}
        <div className="mt-3.5 flex items-start gap-3">
          <div className="relative shrink-0 mt-0.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#07111E] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#07111E]" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white font-heading">
              Transmission confirmée pour {senderName || 'votre dossier'}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Votre dossier technique {projectType ? <span className="text-[#FAB005] font-medium font-mono text-[11px]">[{projectType}] </span> : ''}
              a bien été enregistré et télétransmis à la messagerie technique d'ES-BTP.
            </p>
          </div>
        </div>

        {/* Fiche récapitulative aux couleurs de la marque ES-BTP */}
        <div className="mt-3 bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-[11px] space-y-1.5 font-sans">
          <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-[#FAB005]" />
              <strong className="text-slate-200">Destinataire :</strong> {recipientEmail}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-semibold border border-emerald-500/30">
              ✓ ENREGISTRÉ
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400 pt-0.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#FAB005]" />
              Délai d'étude : <strong className="text-white">24h à 48h ouvrées</strong>
            </span>
            {senderEmail && (
              <span className="text-slate-400 truncate max-w-[140px] font-mono text-[10px]" title={senderEmail}>
                Copie: {senderEmail}
              </span>
            )}
          </div>
        </div>

        {/* Bas de notification avec slogan officiel */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
          <span className="italic text-[#FAB005] font-medium">« Le futur se construit maintenant »</span>
          <span className="font-mono text-slate-400">ES-BTP GABON</span>
        </div>
      </div>
    </aside>
  );
};
