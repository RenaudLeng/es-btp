import React, { useEffect } from 'react';
import { CheckCircle2, X, Mail, Clock, ArrowRight } from 'lucide-react';

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
  // Auto-dismiss optionnel après 10 secondes si l'utilisateur ne clique pas
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 12000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 max-w-md w-[calc(100vw-2.5rem)] bg-[#0B1320] text-white rounded-2xl border-2 border-emerald-500/80 shadow-2xl shadow-emerald-950/40 p-4 sm:p-5 animate-in slide-in-from-bottom-6 fade-in duration-300"
    >
      <div className="flex items-start gap-3.5">
        {/* Icône avec badge animé */}
        <div className="relative shrink-0 mt-0.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0B1320] animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0B1320]" />
        </div>

        {/* Contenu textuel rassurant */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Message Transmis avec Succès
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="text-sm font-bold text-white mt-1.5 font-heading">
            Merci {senderName ? senderName : 'pour votre demande'} !
          </h4>

          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Votre demande {projectType ? `(${projectType}) ` : ''}a bien été envoyée à notre direction technique à{' '}
            <strong className="text-[#FAB005] font-semibold">{recipientEmail}</strong>.
          </p>

          {/* Accusé de réception */}
          <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#FAB005]" />
              <span>Réponse garantie sous 24h à 48h</span>
            </div>
            {senderEmail && (
              <span className="text-slate-400 truncate max-w-[130px] font-mono text-[10px]" title={senderEmail}>
                Copie: {senderEmail}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
