import React, { useState, useEffect } from 'react';
import { EsBtpLogo } from './EsBtpLogo';
import { SocialLinks } from './SocialLinks';
import { ShareModal } from './ShareModal';
import {
  Menu,
  X,
  Share2,
  Phone,
  Mail,
  Home,
  Building2,
  Wrench,
  Trophy,
  ShieldCheck,
  Newspaper,
  Send,
  MessageCircle,
} from 'lucide-react';

export type PageId =
  | 'accueil'
  | 'entreprise'
  | 'expertises'
  | 'realisations'
  | 'engagements'
  | 'actualites'
  | 'contact';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenProjectContact?: () => void;
}

const NAV_ITEMS: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'accueil', label: 'Accueil', icon: Home },
  { id: 'entreprise', label: "L'entreprise", icon: Building2 },
  { id: 'expertises', label: 'Expertises', icon: Wrench },
  { id: 'realisations', label: 'Réalisations', icon: Trophy },
  { id: 'engagements', label: 'Engagements', icon: ShieldCheck },
  { id: 'actualites', label: 'Actualités', icon: Newspaper },
  { id: 'contact', label: 'Contact', icon: Send },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenProjectContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white ${
          scrolled
            ? 'border-b border-slate-200/90 shadow-sm backdrop-blur-md bg-white/95 py-1'
            : 'border-b border-slate-200/70 py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* ============================================================ */}
            {/* 1. LOGO OFFICIEL */}
            {/* ============================================================ */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('accueil')}
                className="relative flex items-center focus:outline-hidden group cursor-pointer"
                aria-label="ES-BTP Accueil"
              >
                <div className="absolute -inset-2 bg-radial from-[#FAB005]/20 via-sky-400/5 to-transparent rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10 flex items-center h-12 sm:h-14 md:h-15">
                  <EsBtpLogo variant="dark" mode="horizontal" showSignature={false} />
                </div>
              </button>
            </div>

            {/* ============================================================ */}
            {/* 2. NAVIGATION CENTRALE EN LIGNE ÉPURÉE & MODERNE */}
            {/* ============================================================ */}
            <nav
              className="hidden md:flex items-center gap-0.5 lg:gap-1 p-1 bg-slate-100/90 rounded-full border border-slate-200/90 shadow-xs backdrop-blur-sm"
              aria-label="Navigation principale"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-2.5 lg:px-3.5 py-1.5 text-[11px] lg:text-xs uppercase tracking-wider transition-all duration-200 rounded-full cursor-pointer select-none font-bold whitespace-nowrap ${
                      isActive
                        ? 'bg-[#FAB005] text-[#08121E] shadow-sm ring-1 ring-[#e09e04]/60 font-black'
                        : 'text-slate-600 hover:text-[#08121E] hover:bg-white/80'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* ============================================================ */}
            {/* 3. ACTIONS DE DROITE : PARTAGE & CONTACT */}
            {/* ============================================================ */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Bouton Partager le site (Desktop & Mobile) */}
              <button
                onClick={() => setShareModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#08121E] bg-slate-100/80 hover:bg-[#FAB005]/15 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs group"
                title="Partager le site officiel ES-BTP (es-btp.vercel.app)"
                aria-label="Partager le site internet"
              >
                <Share2 className="w-4 h-4 text-[#FAB005] group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Partager</span>
              </button>

              {/* Bouton Contact Direct (Desktop) */}
              <button
                onClick={() => {
                  if (onOpenProjectContact) {
                    onOpenProjectContact();
                  } else {
                    handleNavClick('contact');
                  }
                }}
                className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#07111E] hover:bg-[#1E3A5F] border border-slate-700 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <Send className="w-3.5 h-3.5 text-[#FAB005]" />
                <span>Nous contacter</span>
              </button>

              {/* Bouton Menu Mobile (Hamburger pour options avancées) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-800 hover:text-slate-950 focus:outline-hidden cursor-pointer rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Ouvrir le menu de navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BARRE DE NAVIGATION EN LIGNE SUR MOBILE (Toujours visible en haut) */}
        {/* ============================================================ */}
        <div
          className="md:hidden border-t border-slate-200/80 bg-slate-50/95 backdrop-blur-md px-3 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 shadow-2xs"
          aria-label="Navigation mobile en ligne"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FAB005] text-[#08121E] font-black shadow-xs ring-1 ring-[#e09e04]/60'
                    : 'text-slate-700 hover:text-slate-950 bg-white/90 border border-slate-200/70 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* TIROIR MOBILE MODERNE & OPTIMISÉ */}
        {/* ============================================================ */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl animate-in fade-in duration-200">
            {/* Bannière Partage Rapide en haut du menu mobile */}
            <div className="mb-3 p-3 bg-gradient-to-r from-amber-500/10 via-[#FAB005]/20 to-amber-500/10 border border-[#FAB005]/40 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAB005] text-[#07111E] flex items-center justify-center font-bold shadow-xs">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Recommander ce site</span>
                  <span className="text-[10px] text-slate-600 block">Envoyer par WhatsApp ou lien direct</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShareModalOpen(true);
                }}
                className="px-3 py-1.5 bg-[#07111E] text-white text-[11px] font-bold rounded-xl cursor-pointer hover:bg-slate-800 transition-colors shadow-xs"
              >
                Partager
              </button>
            </div>

            {/* Liste des liens de navigation */}
            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item, index) => {
                const isActive = currentPage === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-left transition-all rounded-xl cursor-pointer ${
                      isActive
                        ? 'bg-[#FAB005] text-[#08121E] font-black shadow-sm ring-1 ring-[#e09e04]/60'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#08121E]' : 'text-slate-400'}`} />
                      <span className="font-heading">{item.label}</span>
                    </div>
                    <span
                      className={`font-mono text-[10px] ${
                        isActive ? 'text-[#08121E]/80 font-bold' : 'text-slate-400'
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Raccourcis contacts d'urgence */}
            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href="tel:+24177088346"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 text-slate-800 text-[11px] font-bold hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FAB005]" />
                <span>Appeler la direction</span>
              </a>
              <a
                href="https://wa.me/24177088346?text=Bonjour%20ES-BTP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp chantiers</span>
              </a>
            </div>

            {/* Réseaux sociaux */}
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Suivez ES-BTP sur les réseaux
              </span>
              <SocialLinks variant="color" size="sm" />
            </div>
          </div>
        )}
      </header>

      {/* Modal de partage global */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </>
  );
};
