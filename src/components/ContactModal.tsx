import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { EsBtpLogo } from './EsBtpLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectContext?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultProjectContext = '',
}) => {
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    telephone: '',
    email: '',
    typeProjet: defaultProjectContext ? 'batiment' : '',
    localisation: '',
    message: defaultProjectContext ? `Bonjour, nous souhaitons échanger au sujet d'un projet similaire à : ${defaultProjectContext}` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      nom: '',
      entreprise: '',
      telephone: '',
      email: '',
      typeProjet: '',
      localisation: '',
      message: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        // Clic dans le vide (sur le fond / backdrop) permet de sortir de la modale
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Dialog Card - max height with flex-col so the header is ALWAYS fully visible */}
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ============================================================ */}
        {/* MODAL HEADER - Fixe, visible en permanence, jamais tronqué */}
        {/* ============================================================ */}
        <div className="shrink-0 bg-[#0B1320] text-white px-5 sm:px-7 py-4 border-b-2 border-[#FAB005] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex items-center h-9 sm:h-10">
              <div className="absolute -inset-1 bg-radial from-[#FAB005]/20 to-transparent rounded-full blur-sm pointer-events-none" />
              <div className="relative z-10">
                <EsBtpLogo variant="light" mode="horizontal" showSignature={false} />
              </div>
            </div>
            <div className="border-l border-slate-700/80 pl-3 sm:pl-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAB005] block">
                Direction des Projets & Études
              </span>
              <h3 id="contact-modal-title" className="text-sm sm:text-base font-black font-heading text-white tracking-tight">
                Parler de votre projet
              </h3>
            </div>
          </div>

          {/* Bouton de fermeture visible et spacieux */}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Fermer la fenêtre de contact"
            title="Fermer (ou cliquer dans le vide)"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* ============================================================ */}
        {/* MODAL BODY (Scrollable si l'écran est petit, sans couper le header) */}
        {/* ============================================================ */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">
          {submitted ? (
            <div className="text-center py-8 sm:py-10 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full mb-2 border border-emerald-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-heading text-[#0B1320]">
                Demande transmise avec succès
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Votre sollicitation a bien été enregistrée par l’équipe technique d’ES-BTP. Un responsable prendra contact avec vous dans les meilleurs délais pour analyser les paramètres de votre projet.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-7 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0B1320] hover:bg-[#163A63] border-l-4 border-[#FAB005] transition-colors rounded-xs cursor-pointer shadow-xs"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Message d'introduction institutionnel */}
              <div className="p-3 bg-amber-50/60 border-l-4 border-[#FAB005] text-xs text-slate-700 leading-relaxed rounded-r-xs">
                Renseignez les éléments clés de votre besoin. Nos équipes vous répondront avec rigueur et précision technique.
              </div>

              {/* Ligne 1 : Nom complet & Entreprise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Nom complet <span className="text-[#FAB005]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0B1320] focus:ring-1 focus:ring-[#0B1320] bg-white text-slate-900 rounded-xs transition-colors shadow-2xs placeholder:text-slate-400"
                    placeholder="Ex. Deveh LENGORIA, Nissy LENGORIA ou Gaspard MABOUATA"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Entreprise / Organisation
                  </label>
                  <input
                    type="text"
                    value={formData.entreprise}
                    onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0B1320] focus:ring-1 focus:ring-[#0B1320] bg-white text-slate-900 rounded-xs transition-colors shadow-2xs placeholder:text-slate-400"
                    placeholder="Ex. Société ou institution"
                  />
                </div>
              </div>

              {/* Ligne 2 : Téléphone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Téléphone <span className="text-[#FAB005]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0B1320] focus:ring-1 focus:ring-[#0B1320] bg-white text-slate-900 rounded-xs transition-colors shadow-2xs placeholder:text-slate-400 font-mono"
                    placeholder="+241 ..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Email <span className="text-[#FAB005]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0B1320] focus:ring-1 focus:ring-[#0B1320] bg-white text-slate-900 rounded-xs transition-colors shadow-2xs placeholder:text-slate-400"
                    placeholder="contact@exemple.com"
                  />
                </div>
              </div>

              {/* Ligne 3 : Type de projet & Localisation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Type de projet <span className="text-[#FAB005]">*</span>
                  </label>
                  <select
                    required
                    value={formData.typeProjet}
                    onChange={(e) => setFormData({ ...formData, typeProjet: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0B1320] focus:ring-1 focus:ring-[#0B1320] bg-white text-slate-900 rounded-xs transition-colors shadow-2xs cursor-pointer"
                  >
                    <option value="">Sélectionner un domaine</option>
                    <option value="batiment">Bâtiment (Gros œuvre, tertiaire, institutionnel)</option>
                    <option value="routes">Travaux routiers (Voiries, plateformes, réfection)</option>
                    <option value="infrastructures">Infrastructures & Génie Civil (Ponts, hydraulique)</option>
                    <option value="autre">Autre ouvrage BTP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Localisation du projet au Gabon
                  </label>
                  <input
                    type="text"
                    value={formData.localisation}
                    onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0B1320] focus:ring-1 focus:ring-[#0B1320] bg-white text-slate-900 rounded-xs transition-colors shadow-2xs placeholder:text-slate-400"
                    placeholder="Ex. Libreville, Port-Gentil, Intérieur..."
                  />
                </div>
              </div>

              {/* Ligne 4 : Message / Descriptif du besoin */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Message / Descriptif du besoin <span className="text-[#FAB005]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0B1320] focus:ring-1 focus:ring-[#0B1320] bg-white text-slate-900 rounded-xs transition-colors shadow-2xs placeholder:text-slate-400 leading-relaxed"
                  placeholder="Décrivez brièvement les objectifs, les délais envisagés ou les contraintes techniques du chantier."
                />
              </div>

              {/* Footer de la modale */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500 text-center sm:text-left">
                  <span className="text-[#FAB005] font-bold">*</span> Champs requis pour l'évaluation technique.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0B1320] hover:bg-[#163A63] border-l-4 border-[#FAB005] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 rounded-xl shadow-xs"
                >
                  <span>{isSubmitting ? 'Transmission en cours...' : 'Envoyer la demande'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FAB005]" />
                </button>
              </div>

              {/* Raccourci vers coordonnées directes de la structure */}
              <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-xl text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Contact direct :</span>
                  <a href="tel:+24177088346" className="text-amber-700 font-mono hover:underline font-bold">
                    (+241) 77 088 346
                  </a>
                  <span>/</span>
                  <a href="tel:+24166855037" className="text-amber-700 font-mono hover:underline font-bold">
                    66 855 037
                  </a>
                </div>
                <div>
                  <a href="mailto:esbtp2013@gmail.com" className="text-slate-700 font-mono hover:text-amber-700 transition-colors">
                    esbtp2013@gmail.com
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
