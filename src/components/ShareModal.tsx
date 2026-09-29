import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Copy,
  Mail,
  MessageCircle,
  Linkedin,
  Share2,
  ExternalLink,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OFFICIAL_SHARE_URL = 'https://es-btp.vercel.app';

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = OFFICIAL_SHARE_URL;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shareTitle = 'ES-BTP Gabon | Bâtiment, Travaux Routiers & Génie Civil';
  const shareDescription =
    'ES-BTP Gabon : Entreprise de référence en Bâtiment, Travaux Routiers et Génie Civil.';
  const shareMessage = `ES-BTP Gabon | Bâtiment, Travaux Routiers & Génie Civil : ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        });
      } catch {
        // Abandon utilisateur
      }
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 p-6 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête sobre */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3
              id="share-modal-title"
              className="text-base font-bold font-heading text-slate-900 tracking-tight"
            >
              Partager ES-BTP Gabon
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Transmettre le lien officiel du site
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Copie directe du lien officiel */}
        <div className="mt-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Lien officiel
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 select-all truncate">
              {shareUrl}
            </div>
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0B1320] hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copié</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#FAB005]" />
                  <span>Copier</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Boutons d'envoi essentiels & professionnels */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Envoi direct
          </label>

          <div className="grid grid-cols-3 gap-2">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors text-slate-700 hover:text-emerald-700 group cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-xs font-bold">WhatsApp</span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors text-slate-700 hover:text-blue-700 group cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2] mb-1" />
              <span className="text-xs font-bold">LinkedIn</span>
            </a>

            {/* Email */}
            <a
              href={mailUrl}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-colors text-slate-700 hover:text-amber-800 group cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#FAB005] mb-1" />
              <span className="text-xs font-bold">Email</span>
            </a>
          </div>
        </div>

        {/* Bouton Partage Système natif (Mobile) si supporté */}
        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <div className="mt-3">
            <button
              onClick={handleNativeShare}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Plus d'options de partage</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
