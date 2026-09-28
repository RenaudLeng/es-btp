import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/btpData';
import {
  CheckCircle2,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  Building2,
  Share2,
  ShieldCheck,
  User,
  Compass,
  FileText,
  Lock,
  ExternalLink,
  Check,
  PhoneCall,
} from 'lucide-react';
import pontBordMerImg from '../assets/images/gabon_pont_bord_mer_1790147890714.jpg';
import { EsBtpAccentBar } from '../components/EsBtpAccentBar';
import { ZoomReveal } from '../components/ZoomReveal';
import { SOCIAL_PLATFORMS, WhatsAppIcon } from '../components/SocialLinks';
import { NosLocauxSection } from '../components/NosLocauxSection';

const PROJECT_TYPES = [
  { id: 'batiment', label: 'Bâtiment & Résidentiel', desc: 'Logements, tertiaire, réhabilitation' },
  { id: 'routes', label: 'Travaux Routiers & Voiries', desc: 'Terrassement, bitume, voiries urbaines' },
  { id: 'ouvrages', label: 'Génie Civil & Assainissement', desc: 'Caniveaux, ponts, dalots, fondations' },
  { id: 'autre', label: 'Autre Demande Technique', desc: 'Location d’engins, études, sous-traitance' },
];

const PRESET_LOCATIONS = [
  'Libreville',
  'Owendo',
  'Port-Gentil',
  'Franceville',
  'Intérieur du pays',
];

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    telephone: '',
    email: '',
    typeProjet: '',
    localisation: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleSelectProjectType = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      typeProjet: prev.typeProjet === typeId ? '' : typeId,
    }));
  };

  const handleApplyLocation = (loc: string) => {
    setFormData((prev) => ({
      ...prev,
      localisation: loc,
    }));
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* ============================================================ */}
      {/* HERO HEADER INSTITUTIONNEL */}
      {/* ============================================================ */}
      <section className="relative bg-[#081320] text-white py-16 sm:py-24 border-b border-slate-800 overflow-hidden">
        {/* Image de fond avec voiles graphiques */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={pontBordMerImg}
            alt="Façade maritime et chantiers ES-BTP Gabon"
            className="w-full h-full object-cover object-center opacity-65 transform scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081320] via-[#081320]/85 via-40% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#081320] via-[#081320]/70 via-20% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081320] via-[#081320]/50 to-[#081320]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ZoomReveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0B1320]/90 border border-[#FAB005]/50 rounded-full mb-5 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#FAB005] animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-[#FAB005]">
                  Direction & Relations Partenaires
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-4 text-white drop-shadow-md">
                PARLONS DE VOTRE PROJET
              </h1>

              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed drop-shadow-sm max-w-2xl">
                Vous avez un projet de construction, de voiries ou d’ouvrages de génie civil ? Nos ingénieurs d’affaires et conducteurs de travaux vous accompagnent du chiffrage à la livraison.
              </p>

              <div className="mt-6">
                <EsBtpAccentBar />
              </div>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BANDEAU DE RÉASSURANCE PROFESSIONNELLE */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-[#FAB005] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-900 font-bold block">Réponse 24h à 48h</span>
                <span className="text-[11px] text-slate-500 font-normal">Délai ouvré garanti</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-900 font-bold block">Ingénieur dédié</span>
                <span className="text-[11px] text-slate-500 font-normal">Étude de faisabilité</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-900 font-bold block">Siège à Owendo</span>
                <span className="text-[11px] text-slate-500 font-normal">Face à la FOPI</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              </div>
              <div>
                <span className="text-slate-900 font-bold block">WhatsApp Chantiers</span>
                <span className="text-[11px] text-slate-500 font-normal">Échanges directs instantanés</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION PRINCIPALE : FORMULAIRE TECHNIQUE & COORDONNÉES */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ZoomReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* ====================================================== */}
              {/* COLONNE GAUCHE (7 COLS) : FORMULAIRE TECHNIQUE AVANCÉ */}
              {/* ====================================================== */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
                  {/* Bordure supérieure d'accentuation or ES-BTP */}
                  <div className="h-2 w-full bg-gradient-to-r from-[#FAB005] via-amber-400 to-[#0B1320]" />

                  <div className="p-6 sm:p-10">
                    {/* En-tête du formulaire */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 text-amber-800 text-[11px] font-bold rounded-md mb-2">
                          <Compass className="w-3.5 h-3.5 text-[#FAB005]" />
                          <span>Bureau d'Études & Devis</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#0B1320] tracking-tight">
                          Formulaire de contact technique
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FAB005]" />
                          <span>Réponse sous 24 à 48 heures ouvrées par un ingénieur d'affaires</span>
                        </p>
                      </div>

                      <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Statut</span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Disponible
                        </span>
                      </div>
                    </div>

                    {submitted ? (
                      <div className="py-12 px-6 sm:px-10 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-center">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                          <CheckCircle2 className="w-9 h-9" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full inline-block mb-3">
                          Confirmation d'envoi
                        </span>
                        <h3 className="text-2xl font-black font-heading text-emerald-950 mb-3">
                          Demande technique enregistrée
                        </h3>
                        <p className="text-sm text-emerald-800/90 leading-relaxed max-w-md mx-auto mb-8">
                          Merci pour votre confiance. Votre cahier des charges a été transmis au bureau d’études ES-BTP. Un ingénieur d’affaires vous contactera sous 24 à 48 heures.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                          <button
                            onClick={() => {
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
                            }}
                            className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-200/80 hover:bg-emerald-200 rounded-xl transition-colors cursor-pointer"
                          >
                            Nouvelle demande
                          </button>
                          <a
                            href="https://wa.me/24177088346?text=Bonjour%20ES-BTP%2C%20je%20viens%20de%20soumettre%20une%20demande%20via%20le%20site%20web."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                          >
                            <WhatsAppIcon className="w-4 h-4 text-white" />
                            <span>Suivre sur WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-7">
                        
                        {/* ---------------------------------------------------- */}
                        {/* BLOC 1 : IDENTITÉ & ORGANISME */}
                        {/* ---------------------------------------------------- */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-5 h-5 rounded-full bg-[#0B1320] text-[#FAB005] text-[11px] font-black flex items-center justify-center">
                              1
                            </span>
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                              Identité du demandeur ou de la structure
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Nom & Prénom <span className="text-amber-600">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <User className="w-4 h-4" />
                                </div>
                                <input
                                  type="text"
                                  required
                                  value={formData.nom}
                                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                  placeholder="M. / Mme ..."
                                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#FAB005] focus:bg-white focus:ring-3 focus:ring-amber-500/10 transition-all"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Structure ou Organisme
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <Building2 className="w-4 h-4" />
                                </div>
                                <input
                                  type="text"
                                  value={formData.entreprise}
                                  onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                                  placeholder="Entreprise, Ministère, Particulier..."
                                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#FAB005] focus:bg-white focus:ring-3 focus:ring-amber-500/10 transition-all"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------------------------- */}
                        {/* BLOC 2 : COORDONNÉES DE CONTACT */}
                        {/* ---------------------------------------------------- */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-5 h-5 rounded-full bg-[#0B1320] text-[#FAB005] text-[11px] font-black flex items-center justify-center">
                              2
                            </span>
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                              Coordonnées directes
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Téléphone joignable <span className="text-amber-600">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <Phone className="w-4 h-4" />
                                </div>
                                <input
                                  type="tel"
                                  required
                                  value={formData.telephone}
                                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                  placeholder="+241 ..."
                                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#FAB005] focus:bg-white focus:ring-3 focus:ring-amber-500/10 transition-all"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Adresse e-mail <span className="text-amber-600">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <Mail className="w-4 h-4" />
                                </div>
                                <input
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  placeholder="contact@exemple.com"
                                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#FAB005] focus:bg-white focus:ring-3 focus:ring-amber-500/10 transition-all"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------------------------- */}
                        {/* BLOC 3 : TYPOLOGIE D'OUVRAGE & LOCALISATION */}
                        {/* ---------------------------------------------------- */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-5 h-5 rounded-full bg-[#0B1320] text-[#FAB005] text-[11px] font-black flex items-center justify-center">
                              3
                            </span>
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                              Typologie d'ouvrage & localisation
                            </h3>
                          </div>

                          <div className="space-y-4">
                            {/* Choix visuel de typologie par cartes sélectionnables */}
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2">
                                Typologie d'ouvrage
                              </label>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {PROJECT_TYPES.map((t) => {
                                  const isSelected = formData.typeProjet === t.id;
                                  return (
                                    <button
                                      type="button"
                                      key={t.id}
                                      onClick={() => handleSelectProjectType(t.id)}
                                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                                        isSelected
                                          ? 'border-[#FAB005] bg-amber-500/10 ring-2 ring-[#FAB005]/20 shadow-xs'
                                          : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                                      }`}
                                    >
                                      <div
                                        className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 border ${
                                          isSelected
                                            ? 'border-[#FAB005] bg-[#FAB005] text-[#0B1320]'
                                            : 'border-slate-300 bg-white'
                                        }`}
                                      >
                                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                      </div>
                                      <div className="min-w-0">
                                        <span className={`text-xs font-bold block ${isSelected ? 'text-[#0B1320]' : 'text-slate-800'}`}>
                                          {t.label}
                                        </span>
                                        <span className="text-[11px] text-slate-500 block truncate">
                                          {t.desc}
                                        </span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Menu déroulant classique en soutien / accessibilité */}
                              <div className="mt-2.5">
                                <select
                                  value={formData.typeProjet}
                                  onChange={(e) => setFormData({ ...formData, typeProjet: e.target.value })}
                                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-[#FAB005] focus:bg-white transition-colors"
                                >
                                  <option value="">Sélectionner une catégorie...</option>
                                  <option value="batiment">Bâtiment résidentiel ou tertiaire</option>
                                  <option value="routes">Travaux routiers & terrassement</option>
                                  <option value="ouvrages">Ouvrages de génie civil & assainissement</option>
                                  <option value="autre">Autre demande technique</option>
                                </select>
                              </div>
                            </div>

                            {/* Localisation prévisionnelle */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold text-slate-700">
                                  Localisation prévisionnelle
                                </label>
                                <span className="text-[11px] text-slate-400">Province ou ville d'implantation</span>
                              </div>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <MapPin className="w-4 h-4" />
                                </div>
                                <input
                                  type="text"
                                  value={formData.localisation}
                                  onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                                  placeholder="Libreville, Port-Gentil, Intérieur..."
                                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#FAB005] focus:bg-white focus:ring-3 focus:ring-amber-500/10 transition-all"
                                />
                              </div>

                              {/* Suggestions rapides */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Suggestions :</span>
                                {PRESET_LOCATIONS.map((loc) => (
                                  <button
                                    type="button"
                                    key={loc}
                                    onClick={() => handleApplyLocation(loc)}
                                    className="px-2 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 border border-slate-200 rounded-md text-[11px] font-medium text-slate-600 transition-colors cursor-pointer"
                                  >
                                    {loc}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------------------------- */}
                        {/* BLOC 4 : BESOINS TECHNIQUES & CAHIER DES CHARGES */}
                        {/* ---------------------------------------------------- */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#0B1320] text-[#FAB005] text-[11px] font-black flex items-center justify-center">
                                4
                              </span>
                              <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                                Description de vos besoins techniques <span className="text-amber-600">*</span>
                              </label>
                            </div>
                            <span className="text-[11px] text-slate-400 hidden sm:inline">Délai, surface, contraintes</span>
                          </div>

                          <div className="relative">
                            <textarea
                              required
                              rows={4}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Décrivez les grandes lignes de votre projet, les délais prévus..."
                              className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#FAB005] focus:bg-white focus:ring-3 focus:ring-amber-500/10 transition-all leading-relaxed"
                            />
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1.5">
                            Indiquez les volumes prévus, les accès au chantier ou toute spécification utile à nos ingénieurs.
                          </p>
                        </div>

                        {/* ---------------------------------------------------- */}
                        {/* BOUTON D'ACTION & REASSURANCE */}
                        {/* ---------------------------------------------------- */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 px-6 text-sm font-black uppercase tracking-wider text-[#0B1320] bg-gradient-to-r from-[#FAB005] via-amber-400 to-[#FAB005] hover:brightness-105 active:scale-[0.99] rounded-2xl transition-all shadow-lg hover:shadow-xl shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-3 font-heading border-2 border-amber-300"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2.5">
                                <div className="w-4 h-4 border-2 border-[#0B1320] border-t-transparent rounded-full animate-spin" />
                                <span>Transmission en cours...</span>
                              </div>
                            ) : (
                              <>
                                <Send className="w-4 h-4 text-[#0B1320]" />
                                <span>Transmettre ma demande d'échange</span>
                                <ArrowRight className="w-4 h-4 text-[#0B1320]" />
                              </>
                            )}
                          </button>

                          <div className="flex items-center justify-center gap-2 mt-3.5 text-slate-400 text-xs text-center">
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Étude préliminaire confidentielle sans engagement · Réponse sous 24-48h</span>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* COLONNE DROITE (5 COLS) : COORDONNÉES, RÉSEAUX & RSE */}
              {/* ====================================================== */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* ---------------------------------------------------- */}
                {/* CARTE 1 : COORDONNÉES ADMINISTRATIVES SIÈGE ES-BTP */}
                {/* ---------------------------------------------------- */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 relative overflow-hidden">
                  <div className="flex items-start justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#0B1320] text-[#FAB005] flex items-center justify-center shadow-md">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black font-heading text-[#0B1320] tracking-tight">
                          Coordonnées Administratives
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Siège social ES-BTP
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-800 rounded-lg text-[10px] font-black uppercase">
                      Gabon
                    </span>
                  </div>

                  <div className="space-y-5 text-sm">
                    {/* Adresse & BP */}
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#FAB005] flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                            Siège Social & Boîte Postale :
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-[#FAB005]/20 text-amber-900 px-2 py-0.5 rounded-md border border-[#FAB005]/40">
                            GPS : 9FGF+HJ6
                          </span>
                        </div>
                        <p className="text-slate-800 font-semibold text-sm leading-tight">
                          Sogatole Face à la FOPI
                        </p>
                        <p className="font-mono text-slate-500 text-xs mt-0.5">
                          BP : 18394 Libreville, Gabon
                        </p>
                      </div>
                    </div>

                    {/* Téléphones */}
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-1">
                          Lignes téléphoniques :
                        </span>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <a
                            href="tel:+24177088346"
                            className="inline-flex items-center gap-1 font-mono font-bold text-slate-900 hover:text-amber-600 transition-colors bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs shadow-2xs"
                          >
                            <span>(+241) 77 088 346</span>
                          </a>
                          <span className="text-slate-300 font-bold">/</span>
                          <a
                            href="tel:+24166855037"
                            className="inline-flex items-center gap-1 font-mono font-bold text-slate-900 hover:text-amber-600 transition-colors bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs shadow-2xs"
                          >
                            <span>(+241) 66 855 037</span>
                          </a>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-1.5">
                          Appels directs & assistance technique
                        </span>
                      </div>
                    </div>

                    {/* Email officiel */}
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-1">
                          Courrier électronique officiel :
                        </span>
                        <a
                          href="mailto:esbtp2013@gmail.com"
                          className="font-mono font-bold text-emerald-800 hover:text-emerald-950 hover:underline transition-colors block text-xs sm:text-sm break-all"
                        >
                          esbtp2013@gmail.com
                        </a>
                        <span className="text-[11px] text-slate-500 block mt-1">
                          Pour devis, appels d'offres et partenariats
                        </span>
                      </div>
                    </div>

                    {/* Horaires */}
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-1">
                          Disponibilité des bureaux :
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-800 font-bold text-xs sm:text-sm">
                            Lun – Ven : 07h30 – 17h30
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Permanence active
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Accès rapide vers Nos Locaux */}
                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href="#nos-locaux"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById('nos-locaux');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-3.5 rounded-2xl bg-[#0B1320] text-white flex items-center justify-between gap-3 hover:bg-slate-800 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#FAB005]/20 text-[#FAB005] flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold text-white block">
                              Voir la carte d'accès & itinéraire
                            </span>
                            <span className="text-[10px] font-mono text-[#FAB005]">
                              GPS : 9FGF+HJ6 Libreville
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-[#FAB005] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                          Consulter ↓
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* CARTE 2 : RÉSEAUX SOCIAUX & ÉCHANGES DIRECTS */}
                {/* ---------------------------------------------------- */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-7 relative overflow-hidden">
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#FAB005] flex items-center justify-center">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black font-heading text-[#0B1320]">
                        Réseaux Sociaux & Échanges Directs
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Facebook · TikTok · WhatsApp · YouTube
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    Retrouvez nos équipes sur le terrain, nos engins en action, l'avancement des grands chantiers et contactez-nous instantanément.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SOCIAL_PLATFORMS.map((platform) => {
                      const IconComp = platform.icon;
                      const isWhatsApp = platform.id === 'whatsapp';
                      return (
                        <a
                          key={platform.id}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all group cursor-pointer ${
                            isWhatsApp
                              ? 'border-[#25D366]/40 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366] shadow-2xs'
                              : 'border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-slate-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              style={{ backgroundColor: platform.color }}
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-xs"
                            >
                              <IconComp className="w-4 h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-black text-slate-900 block truncate group-hover:text-amber-600 transition-colors">
                                {platform.name}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-500 block truncate">
                                {platform.handle}
                              </span>
                            </div>
                          </div>

                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0 ml-1" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* CARTE 3 : ENGAGEMENT DE CONFIDENTIALITÉ & ÉTUDE */}
                {/* ---------------------------------------------------- */}
                <div className="bg-[#0B1320] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
                  {/* Subtle geometric pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAB005]/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 text-[#FAB005]">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest text-[#FAB005]">
                        Engagement de confidentialité
                      </span>
                    </div>

                    <h4 className="text-lg font-black font-heading text-white mb-2">
                      Étude rigoureuse & Chiffrage maîtrisé
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Les informations partagées demeurent strictement confidentielles et font l’objet d'une analyse technique préalable par notre bureau d’études.
                    </p>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>ES-BTP Gabon · Rigueur & Déontologie</span>
                      <span className="text-[#FAB005] font-bold">100% Confidentiel</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION NOS LOCAUX : GOOGLE MAPS INTERACTIVE 9FGF+HJ6 OWENDO */}
      {/* ============================================================ */}
      <NosLocauxSection />
    </div>
  );
};
