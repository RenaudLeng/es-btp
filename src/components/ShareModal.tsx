import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Copy,
  Share2,
  Mail,
  MessageCircle,
  Linkedin,
  Facebook,
  QrCode,
  Smartphone,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OFFICIAL_SHARE_URL = 'https://es-btp.vercel.app';

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
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

  const shareTitle = 'ES-BTP Gabon | Bâtiment, Travaux Routiers & Infrastructures';
  const shareDescription =
    'Découvrez le site officiel de l’entreprise ES-BTP au Gabon : Bâtiment, Travaux Routiers et Génie Civil.';
  const shareMessage = `Bonjour ! Je te recommande de découvrir le site officiel d'ES-BTP Gabon (Bâtiment, Travaux Routiers et Génie Civil) : ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback si clipboard API bloqué
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
        // Abandon utilisateur ou non supporté
      }
    }
  };

  // Liens de partage directs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareDescription)}&url=${encodeURIComponent(shareUrl)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage)}`;
  const smsUrl = `sms:?body=${encodeURIComponent(shareMessage)}`;

  // QR Code URL via QR server API avec redondance
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    shareUrl
  )}&bgcolor=ffffff&color=07111e&margin=2`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-[#07111E] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-7 text-white my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Liseré supérieur or & drapeau Gabon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#009e60] via-[#FAB005] to-[#1E3A5F]" />

        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Fermer la fenêtre de partage"
        >
          <X className="w-5 h-5" />
        </button>

        {/* En-tête */}
        <div className="flex items-center gap-3.5 mb-5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-[#FAB005]/15 border border-[#FAB005]/40 flex items-center justify-center text-[#FAB005] shrink-0 shadow-inner">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAB005] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Recommander le site
              </span>
            </div>
            <h3
              id="share-modal-title"
              className="text-lg sm:text-xl font-bold font-heading text-white tracking-tight"
            >
              Partager ES-BTP Gabon
            </h3>
            <p className="text-xs text-slate-400">
              Diffusez l'adresse officielle à un client, confrère ou partenaire.
            </p>
          </div>
        </div>

        {/* Carte d'aperçu du site (Rich Card Preview) */}
        <div className="p-3.5 mb-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0C1B2E] to-slate-900 border border-slate-700/70 shadow-inner">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#FAB005] text-[#07111E] font-black flex items-center justify-center text-sm shadow-md shrink-0">
                ES
              </div>
              <div className="overflow-hidden">
                <div className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-1.5">
                  ES-BTP Gabon
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" title="En ligne" />
                </div>
                <div className="text-[11px] text-slate-300 truncate">
                  Bâtiment · Travaux Routiers · Génie Civil
                </div>
              </div>
            </div>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#FAB005] hover:text-white bg-[#FAB005]/10 hover:bg-[#FAB005]/20 border border-[#FAB005]/30 rounded-lg transition-colors"
            >
              <span>Visiter</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <span className="truncate">{shareUrl}</span>
            <span className="text-[10px] text-slate-400 shrink-0 ml-2">Vercel Production</span>
          </div>
        </div>

        {/* Zone de copie du lien officiel */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Lien officiel à transmettre
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                value={shareUrl}
                aria-label="URL officielle de partage"
                className="w-full bg-slate-950/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-mono select-all focus:outline-hidden focus:border-[#FAB005] transition-colors"
              />
            </div>
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                  : 'bg-[#FAB005] hover:bg-[#e09e04] text-[#07111E] shadow-md shadow-amber-500/20 active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copier</span>
                </>
              )}
            </button>
          </div>
          {copied && (
            <p className="mt-1.5 text-[11px] font-semibold text-emerald-400 flex items-center gap-1 animate-in fade-in">
              <Check className="w-3.5 h-3.5" /> Lien officiel copié dans votre presse-papiers !
            </p>
          )}
        </div>

        {/* Options de partage réseaux sociaux / messageries */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
            Partage direct 1-clic
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-white transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-[#25D366] leading-tight">WhatsApp</div>
                <div className="text-[10px] text-slate-300 truncate">Recommandé</div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/40 text-white transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Linkedin className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-[#38bdf8] leading-tight">LinkedIn</div>
                <div className="text-[10px] text-slate-300 truncate">Réseau pro</div>
              </div>
            </a>

            {/* Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/40 text-white transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Facebook className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-[#60a5fa] leading-tight">Facebook</div>
                <div className="text-[10px] text-slate-300 truncate">Publication</div>
              </div>
            </a>

            {/* Twitter / X */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform font-bold text-xs">
                𝕏
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-white leading-tight">Twitter / X</div>
                <div className="text-[10px] text-slate-400 truncate">Partager</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={mailUrl}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAB005]/15 hover:bg-[#FAB005]/25 border border-[#FAB005]/40 text-white transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FAB005] text-[#07111E] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-[#FAB005] leading-tight">Email</div>
                <div className="text-[10px] text-slate-300 truncate">Par courriel</div>
              </div>
            </a>

            {/* SMS Mobile */}
            <a
              href={smsUrl}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-600/40 text-white transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-emerald-400 leading-tight">SMS</div>
                <div className="text-[10px] text-slate-300 truncate">Par message</div>
              </div>
            </a>
          </div>
        </div>

        {/* Section QR Code & Partage Système Mobile */}
        <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setShowQr(!showQr)}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#FAB005]" />
              <span>{showQr ? 'Masquer le QR Code' : 'Flasher avec QR Code'}</span>
            </button>

            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                onClick={handleNativeShare}
                className="flex-1 py-2.5 px-3 rounded-xl border border-[#FAB005]/50 hover:border-[#FAB005] bg-[#FAB005]/15 hover:bg-[#FAB005]/25 text-xs font-bold text-[#FAB005] hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Partage système</span>
              </button>
            )}
          </div>

          {/* Affichage du QR Code */}
          {showQr && (
            <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-[#07111E] animate-in zoom-in-95 duration-150">
              <img
                src={qrCodeImageUrl}
                alt="QR Code officiel ES-BTP"
                width={180}
                height={180}
                className="rounded-lg shadow-sm"
              />
              <p className="mt-2 text-xs font-bold text-slate-800 text-center">
                Scannez pour ouvrir le site sur smartphone
              </p>
              <span className="text-[10px] font-mono text-slate-500">{shareUrl}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
