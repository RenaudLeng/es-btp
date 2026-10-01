import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useDgPhoto } from '../context/DgPhotoContext';
import { 
  Lock, 
  Unlock, 
  X, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Upload,
  User,
  Phone,
  Building,
  FileText
} from 'lucide-react';

interface SuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuperAdminModal: React.FC<SuperAdminModalProps> = ({ isOpen, onClose }) => {
  const { 
    companyInfo, 
    projects, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin, 
    updateCompanyInfo,
    updateProject,
    addProject,
    deleteProject,
    resetToDefaults,
    exportDataJson,
    importDataJson
  } = useSiteData();

  const { uploadDgPhoto, resetDgPhoto, isCustomPhoto } = useDgPhoto();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'dg' | 'projets' | 'export'>('info');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Formulaire Projet (Édition / Ajout)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    category: 'BATIMENT' as 'BATIMENT' | 'ROUTES' | 'INFRASTRUCTURES',
    categoryLabel: 'Bâtiment',
    location: '',
    description: '',
    image: '',
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(passwordInput);
    if (!success) {
      setAuthError('Code d’accès incorrect. Veuillez réessayer.');
    } else {
      setPasswordInput('');
    }
  };

  const showNotification = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(''), 4000);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Modifications enregistrées avec succès sur le site !');
  };

  const handleDgPhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadDgPhoto(file);
        showNotification('Portrait officiel du Directeur Général mis à jour !');
      } catch (err: any) {
        alert(err?.message || 'Erreur lors du chargement de la photo');
      }
    }
  };

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) {
          setProjectFormData((prev) => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAddProject = () => {
    setEditingProjectId('NEW');
    setProjectFormData({
      title: '',
      category: 'BATIMENT',
      categoryLabel: 'Bâtiment',
      location: 'Libreville · Gabon',
      description: '',
      image: '/projects/chantier_default.jpg',
    });
  };

  const handleOpenEditProject = (proj: any) => {
    setEditingProjectId(proj.id);
    setProjectFormData({
      title: proj.title,
      category: proj.category,
      categoryLabel: proj.categoryLabel,
      location: proj.location,
      description: proj.description,
      image: proj.image,
    });
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormData.title.trim()) {
      alert('Veuillez renseigner le titre du chantier');
      return;
    }

    if (editingProjectId === 'NEW') {
      addProject({
        title: projectFormData.title,
        category: projectFormData.category,
        categoryLabel: projectFormData.category === 'BATIMENT' ? 'Bâtiment' : projectFormData.category === 'ROUTES' ? 'Travaux routiers' : 'Infrastructures',
        location: projectFormData.location,
        description: projectFormData.description,
        image: projectFormData.image || '/projects/chantier_default.jpg',
      });
      showNotification('Nouveau chantier ajouté au catalogue !');
    } else if (editingProjectId) {
      updateProject(editingProjectId, {
        title: projectFormData.title,
        category: projectFormData.category,
        categoryLabel: projectFormData.category === 'BATIMENT' ? 'Bâtiment' : projectFormData.category === 'ROUTES' ? 'Travaux routiers' : 'Infrastructures',
        location: projectFormData.location,
        description: projectFormData.description,
        image: projectFormData.image,
      });
      showNotification('Chantier mis à jour avec succès !');
    }
    setEditingProjectId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#07111E]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0B1320] text-white rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête de la modale */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#0B1320] via-[#122238] to-[#0B1320] border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAB005]/20 border border-[#FAB005]/40 flex items-center justify-center text-[#FAB005]">
              {isAdminAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-black font-heading tracking-wide text-white flex items-center gap-2">
                <span>Espace SuperAdmin ES-BTP</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#FAB005]/15 text-[#FAB005] border border-[#FAB005]/30">
                  {isAdminAuthenticated ? 'Connecté' : 'Sécurisé'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Gestion simplifiée des coordonnées, textes officiels et chantiers sans coder.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-400/40 transition-colors"
                title="Se déconnecter de la session admin"
              >
                Déconnexion
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message de succès temporaire */}
        {saveSuccessMessage && (
          <div className="px-6 py-2.5 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        {/* Contenu : Si NON authentifié, écran de verrouillage */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-slate-700 flex items-center justify-center text-[#FAB005] mb-5 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold font-heading text-white mb-2">
              Accès Réservé à la Direction
            </h4>
            <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
              Veuillez saisir votre code d'accès superadmin pour ouvrir le panneau de gestion de contenu du site ES-BTP.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Code d'accès secret..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#FAB005] focus:outline-hidden text-sm text-white placeholder-slate-500 text-center tracking-widest font-mono shadow-inner"
                  autoFocus
                />
                {authError && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center justify-center gap-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] active:bg-[#c98e03] text-[#0B1320] font-bold text-xs uppercase tracking-wider transition-all shadow-md font-heading cursor-pointer"
              >
                Déverrouiller l'espace
              </button>

              <div className="pt-2 text-[11px] text-slate-500">
                Code par défaut fourni à la livraison : <span className="font-mono text-slate-400 font-bold">ESBTP2026@</span>
              </div>
            </form>
          </div>
        ) : (
          /* Contenu : Si AUTHENTIFIÉ, onglets de gestion */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Onglets de navigation */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-[#09111c] overflow-x-auto shrink-0">
              <button
                onClick={() => { setActiveTab('info'); setEditingProjectId(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'info'
                    ? 'border-[#FAB005] text-[#FAB005]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Coordonnées & Textes Accueil</span>
              </button>

              <button
                onClick={() => { setActiveTab('dg'); setEditingProjectId(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'dg'
                    ? 'border-[#FAB005] text-[#FAB005]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Direction Générale & Photo</span>
              </button>

              <button
                onClick={() => { setActiveTab('projets'); }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'projets'
                    ? 'border-[#FAB005] text-[#FAB005]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Chantiers & Ouvrages ({projects.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('export'); setEditingProjectId(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'export'
                    ? 'border-[#FAB005] text-[#FAB005]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Sauvegarde & Export</span>
              </button>
            </div>

            {/* Corps défilable de l'onglet actif */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* ONGLET 1 : COORDONNÉES ET ACCUEIL */}
              {activeTab === 'info' && (
                <form onSubmit={handleSaveInfo} className="space-y-6 max-w-2xl mx-auto">
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Numéros de téléphone & Email</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Téléphone Principal (Airtel / WhatsApp)</label>
                        <input
                          type="text"
                          value={companyInfo.phone1}
                          onChange={(e) => updateCompanyInfo({ phone1: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Téléphone Secondaire (Moov)</label>
                        <input
                          type="text"
                          value={companyInfo.phone2}
                          onChange={(e) => updateCompanyInfo({ phone2: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Adresse Email Officielle</label>
                      <input
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => updateCompanyInfo({ email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-mono"
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>Adresse physique & Boîte Postale</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Emplacement Siège</label>
                        <input
                          type="text"
                          value={companyInfo.address}
                          onChange={(e) => updateCompanyInfo({ address: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Boîte Postale</label>
                        <input
                          type="text"
                          value={companyInfo.bp}
                          onChange={(e) => updateCompanyInfo({ bp: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Message d'introduction en page d'accueil</span>
                    </h5>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Titre principal (H1)</label>
                      <input
                        type="text"
                        value={companyInfo.heroTagline}
                        onChange={(e) => updateCompanyInfo({ heroTagline: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-heading font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Texte d'introduction concis</label>
                      <textarea
                        rows={3}
                        value={companyInfo.heroDescription}
                        onChange={(e) => updateCompanyInfo({ heroDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] font-bold text-xs uppercase tracking-wider transition-all shadow-md font-heading cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Enregistrer les coordonnées</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ONGLET 2 : DIRECTION GÉNÉRALE & PHOTO */}
              {activeTab === 'dg' && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  {/* Photo officielle du DG */}
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Portrait Officiel du Directeur Général</span>
                    </h5>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Remplacez instantanément la photo officielle du Directeur Général affichée sur la page d'accueil et la page Entreprise.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Téléverser une nouvelle photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleDgPhotoFileChange}
                        />
                      </label>

                      {isCustomPhoto && (
                        <button
                          type="button"
                          onClick={() => {
                            resetDgPhoto();
                            showNotification('Photo réinitialisée au portrait d’origine.');
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Rétablir la photo initiale</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Nom, Titre et Citations du DG */}
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Identité & Titre</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Nom Complet</label>
                        <input
                          type="text"
                          value={companyInfo.dgName}
                          onChange={(e) => updateCompanyInfo({ dgName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Fonction Officielle</label>
                        <input
                          type="text"
                          value={companyInfo.dgTitle}
                          onChange={(e) => updateCompanyInfo({ dgTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Citation Clé mise en avant</label>
                      <input
                        type="text"
                        value={companyInfo.dgQuote}
                        onChange={(e) => updateCompanyInfo({ dgQuote: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden italic"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Extrait du Discours du DG (Page d'accueil)</label>
                      <textarea
                        rows={4}
                        value={companyInfo.dgSpeechParagraph1}
                        onChange={(e) => updateCompanyInfo({ dgSpeechParagraph1: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => showNotification('Informations de Direction enregistrées !')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] font-bold text-xs uppercase tracking-wider transition-all shadow-md font-heading cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Valider les modifications DG</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ONGLET 3 : GESTION DES CHANTIERS & PROJETS */}
              {activeTab === 'projets' && (
                <div className="space-y-6">
                  {editingProjectId !== null ? (
                    /* Formulaire d'édition / d'ajout */
                    <form onSubmit={handleSaveProjectForm} className="bg-white/5 border border-slate-800 rounded-xl p-6 space-y-4 max-w-2xl mx-auto">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005]">
                          {editingProjectId === 'NEW' ? 'Ajouter un nouveau chantier' : 'Modifier le chantier'}
                        </h5>
                        <button
                          type="button"
                          onClick={() => setEditingProjectId(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Annuler
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Intitulé du projet</label>
                        <input
                          type="text"
                          required
                          value={projectFormData.title}
                          onChange={(e) => setProjectFormData((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Ex: Réhabilitation Voirie Libreville Sud..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Secteur / Domaine</label>
                          <select
                            value={projectFormData.category}
                            onChange={(e) => setProjectFormData((prev) => ({ ...prev, category: e.target.value as any }))}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden"
                          >
                            <option value="BATIMENT">Bâtiment & Gros Œuvre</option>
                            <option value="ROUTES">Travaux Routiers & VRD</option>
                            <option value="INFRASTRUCTURES">Infrastructures & Génie Civil</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Localisation au Gabon</label>
                          <input
                            type="text"
                            value={projectFormData.location}
                            onChange={(e) => setProjectFormData((prev) => ({ ...prev, location: e.target.value }))}
                            placeholder="Ex: Libreville, Estuaire"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Description concise des travaux</label>
                        <textarea
                          rows={3}
                          value={projectFormData.description}
                          onChange={(e) => setProjectFormData((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Décrivez brièvement les travaux menés..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Photo d'illustration du chantier</label>
                        <div className="flex items-center gap-4">
                          {projectFormData.image && (
                            <img
                              src={projectFormData.image}
                              alt="Aperçu"
                              className="w-16 h-16 rounded-lg object-cover border border-slate-700"
                            />
                          )}
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer border border-slate-700">
                            <Upload className="w-3.5 h-3.5 text-[#FAB005]" />
                            <span>Choisir une image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleProjectImageUpload}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => setEditingProjectId(null)}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] text-xs font-bold uppercase tracking-wider font-heading cursor-pointer"
                        >
                          Enregistrer le chantier
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Liste des projets existants */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">
                          {projects.length} ouvrage(s) configuré(s) sur le site.
                        </p>
                        <button
                          type="button"
                          onClick={handleOpenAddProject}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] text-xs font-bold uppercase tracking-wider font-heading cursor-pointer shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ajouter un chantier</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((proj) => (
                          <div
                            key={proj.id}
                            className="p-4 bg-white/5 border border-slate-800 rounded-xl flex items-start gap-4 hover:border-slate-700 transition-colors"
                          >
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-700"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FAB005] block">
                                {proj.categoryLabel} · {proj.location}
                              </span>
                              <h6 className="text-sm font-bold text-white truncate mt-0.5">
                                {proj.title}
                              </h6>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                                {proj.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleOpenEditProject(proj)}
                                className="p-2 rounded-lg text-slate-400 hover:text-[#FAB005] hover:bg-white/5 transition-colors"
                                title="Modifier ce chantier"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Confirmez-vous la suppression du projet "${proj.title}" ?`)) {
                                    deleteProject(proj.id);
                                    showNotification('Chantier supprimé.');
                                  }
                                }}
                                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                                title="Supprimer ce chantier"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ONGLET 4 : SAUVEGARDE & EXPORT */}
              {activeTab === 'export' && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Télécharger une sauvegarde (Fichier JSON)</span>
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Téléchargez une copie complète de tous vos textes, numéros et projets modifiés. Vous pourrez restaurer ce fichier à tout moment sur n'importe quel ordinateur ou téléphone.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const jsonStr = exportDataJson();
                        const blob = new Blob([jsonStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `es-btp-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        showNotification('Fichier de sauvegarde téléchargé !');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors border border-slate-700"
                    >
                      <Download className="w-4 h-4 text-[#FAB005]" />
                      <span>Exporter la sauvegarde du site (.json)</span>
                    </button>
                  </div>

                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Rétablir le contenu d'origine</span>
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Si vous souhaitez effacer toutes les modifications personnalisées et revenir au contenu officiel initial livré par le développeur.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Êtes-vous sûr de vouloir réinitialiser tout le site aux paramètres d’usine par défaut ?')) {
                          resetToDefaults();
                          showNotification('Contenu réinitialisé avec succès !');
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold transition-colors border border-rose-800/40"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Réinitialiser aux valeurs d'origine</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
