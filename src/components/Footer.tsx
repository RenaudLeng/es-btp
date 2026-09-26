import React, { useState } from 'react';
import { EsBtpLogo } from './EsBtpLogo';
import { PageId } from './Header';
import { SocialLinks } from './SocialLinks';
import { ShareModal } from './ShareModal';
import { VisitorCounter } from './VisitorCounter';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07111E] text-white border-t border-slate-800 relative overflow-hidden">
      {/* Liseré supérieur or & gabon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#009e60] via-[#FAB005] to-[#163A63]" />

      {/* Trame subtile de fond */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '2rem 2rem',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ============================================================ */}
          {/* COLONNE 1 : IDENTITÉ ÉPURÉE & SLOGAN COMPACT */}
          {/* ============================================================ */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo avec halo diffus fluide à 360° pour adhérer au fond bleu nuit */}
              <div className="relative inline-block">
                <div className="absolute -inset-3 bg-radial from-[#FAB005]/20 via-[#0B1320]/60 to-transparent rounded-full blur-xl pointer-events-none" />
                <div className="relative z-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                  <EsBtpLogo variant="light" mode="horizontal" showSignature={false} />
                </div>
              </div>

              {/* Slogan réduit et stylisé (compact) */}
              <div className="mt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAB005]/10 border border-[#FAB005]/30 rounded-full text-[#FAB005] text-[11px] font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FAB005]" />
                  <span>« LE FUTUR SE CONSTRUIT MAINTENANT »</span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                  Entreprise de référence spécialisée dans le bâtiment, les travaux routiers, le génie civil et les aménagements d'infrastructures durables.
                </p>
              </div>

              {/* Réseaux Sociaux : Facebook, TikTok, WhatsApp, YouTube */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAB005] block mb-2.5">
                  Rejoignez-nous · Réseaux Sociaux
                </span>
                <SocialLinks variant="gold" size="md" />

                {/* Bouton de recommandation / partage */}
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 hover:border-[#FAB005]/50 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-xs group"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#FAB005] group-hover:scale-110 transition-transform" />
                  <span>Partager ce site à un ami ou confrère</span>
                </button>
              </div>
            </div>

            {/* Label qualité & localisation compact */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#FAB005]" />
                <span>Owendo · Libreville, Gabon</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                BP 18394 Owendo
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* COLONNE 2 : NAVIGATION INSTITUTIONNELLE */}
          {/* ============================================================ */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FAB005] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'accueil' as PageId, label: 'Accueil' },
                { id: 'entreprise' as PageId, label: "L'entreprise" },
                { id: 'expertises' as PageId, label: 'Nos expertises' },
                { id: 'realisations' as PageId, label: 'Nos réalisations' },
                { id: 'engagements' as PageId, label: 'Nos engagements' },
                { id: 'actualites' as PageId, label: 'Actualités' },
                { id: 'contact' as PageId, label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="text-slate-300 hover:text-[#FAB005] hover:translate-x-1 transition-all text-left cursor-pointer inline-flex items-center gap-1.5 py-0.5"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================================ */}
          {/* COLONNE 3 : DOMAINES D'EXPERTISE */}
          {/* ============================================================ */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FAB005] mb-4">
              Pôles Techniques
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAB005] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Bâtiment & Gros Œuvre</span>
                  <span className="text-[11px] text-slate-400">Édifices administratifs & tertiaires</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAB005] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Travaux Routiers & VRD</span>
                  <span className="text-[11px] text-slate-400">Bitumage, terrassements & canalisations</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAB005] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Infrastructures & Génie Civil</span>
                  <span className="text-[11px] text-slate-400">Ouvrages d'art & plateformes techniques</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAB005] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Qualité & Sécurité QHSE</span>
                  <span className="text-[11px] text-slate-400">Zéro accident & respect environnemental</span>
                </div>
              </li>
            </ul>
          </div>

          {/* ============================================================ */}
          {/* COLONNE 4 : CONTACT DIRECTION PROPRE & STRUCTURÉ */}
          {/* ============================================================ */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FAB005] mb-4">
              Direction & Échanges
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FAB005] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Siège & Boîte Postale</span>
                  <span className="font-semibold text-white block">Sogatole Face à la FOPI</span>
                  <span className="font-mono text-slate-300 text-[11px]">BP 18394 Owendo-Gabon</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#FAB005] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Téléphones Directs</span>
                  <div className="flex flex-col gap-0.5 font-mono text-slate-200">
                    <a href="tel:+24177088346" className="hover:text-[#FAB005] transition-colors">
                      (+241) 77 088 346
                    </a>
                    <a href="tel:+24166855037" className="hover:text-[#FAB005] transition-colors">
                      (+241) 66 855 037
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#FAB005] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Courrier Électronique</span>
                  <a href="mailto:esbtp2013@gmail.com" className="font-mono text-slate-200 hover:text-[#FAB005] transition-colors break-all">
                    esbtp2013@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FAB005] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Chantiers & Bureaux</span>
                  <span className="text-slate-300">Lun – Ven : 07h30 – 17h30</span>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => handleNav('contact')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#07111E] bg-[#FAB005] hover:bg-[#e09e04] rounded-xl transition-all cursor-pointer shadow-md font-heading"
              >
                <span>Échanger sur votre projet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BARRE INFÉRIEURE : COPYRIGHT OFFICIEL & COMPTEUR MINIMALISTE */}
      {/* ============================================================ */}
      <div className="border-t border-slate-800/90 bg-[#050c17] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          {/* Signature & Copyright Professionnel RL-Services.Inc */}
          <div className="inline-flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-slate-300">
            <div className="w-6 h-6 rounded-md bg-white p-0.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/partners/rl_services.jpg"
                alt="RL Services.Inc"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-bold text-sm">©</span>
            <strong className="text-white font-bold tracking-wide">RL-Services.Inc</strong>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Conception & Réalisation :</span>
            <span className="text-white font-semibold">Renaud LENG</span>
            <span className="text-slate-400 text-[11px]">(Renaud LENGOUORI)</span>
            <span className="text-slate-600">·</span>
            <a
              href="mailto:arleys4u@gmail.com"
              className="text-[#FAB005] hover:text-amber-300 hover:underline transition-colors px-1"
              title="Contacter le concepteur web"
            >
              arleys4u@gmail.com
            </a>
          </div>

          {/* Compteur Réel & Minimaliste (Zero encombrement) */}
          <div className="flex items-center justify-center">
            <VisitorCounter />
          </div>

          {/* Liens institutionnels discrets */}
          <div className="flex items-center justify-center md:justify-end gap-4 text-xs">
            <button
              onClick={() => handleNav('entreprise')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Mentions Légales
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => handleNav('contact')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Modal de partage */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </footer>
  );
};
