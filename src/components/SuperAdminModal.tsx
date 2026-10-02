import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useDgPhoto } from '../context/DgPhotoContext';
import chantierHeroBg from '../assets/images/chantier_gabon_live_1790106446872.jpg';
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
  FileText,
  BarChart3,
  Newspaper,
  ShieldCheck,
  Globe,
  Eye,
  EyeOff,
  KeyRound,
  HelpCircle,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Shield
} from 'lucide-react';

interface SuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuperAdminModal: React.FC<SuperAdminModalProps> = ({ isOpen, onClose }) => {
  const { 
    companyInfo, 
    projects, 
    news,
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin, 
    updateCompanyInfo,
    updateProject,
    addProject,
    deleteProject,
    updateNewsItem,
    addNewsItem,
    deleteNewsItem,
    resetToDefaults,
    exportDataJson,
  } = useSiteData();

  const { uploadDgPhoto, resetDgPhoto, isCustomPhoto } = useDgPhoto();

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showForgotHelp, setShowForgotHelp] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'home' | 'dg' | 'projets' | 'actualites' | 'engagements' | 'chiffres' | 'export'>('info');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Formulaire Projet
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    category: 'BATIMENT' as 'BATIMENT' | 'ROUTES' | 'INFRASTRUCTURES',
    categoryLabel: 'Bâtiment',
    location: '',
    description: '',
    image: '',
  });

  // Formulaire Actualité
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    category: 'Vie de l’entreprise',
    date: '2026',
    excerpt: '',
    content: '',
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
    showNotification('Modifications enregistrées immédiatement sur l’ensemble du site !');
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

  const handleNewsImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) {
          setNewsFormData((prev) => ({ ...prev, image: result }));
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

  const handleOpenAddNews = () => {
    setEditingNewsId('NEW');
    setNewsFormData({
      title: '',
      category: 'Vie de l’entreprise',
      date: '2026',
      excerpt: '',
      content: '',
      image: '/projects/chantier_default.jpg',
    });
  };

  const handleOpenEditNews = (item: any) => {
    setEditingNewsId(item.id);
    setNewsFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      excerpt: item.excerpt,
      content: item.content || item.excerpt,
      image: item.image,
    });
  };

  const handleSaveNewsForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsFormData.title.trim()) {
      alert('Veuillez saisir le titre de l’actualité');
      return;
    }

    if (editingNewsId === 'NEW') {
      addNewsItem({
        title: newsFormData.title,
        category: newsFormData.category,
        date: newsFormData.date,
        excerpt: newsFormData.excerpt,
        content: newsFormData.content,
        image: newsFormData.image || '/projects/chantier_default.jpg',
      });
      showNotification('Nouvelle publication ajoutée aux actualités !');
    } else if (editingNewsId) {
      updateNewsItem(editingNewsId, {
        title: newsFormData.title,
        category: newsFormData.category,
        date: newsFormData.date,
        excerpt: newsFormData.excerpt,
        content: newsFormData.content,
        image: newsFormData.image,
      });
      showNotification('Publication mise à jour !');
    }
    setEditingNewsId(null);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-[#07111E]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className={`w-full ${isAdminAuthenticated ? 'max-w-5xl max-h-[92vh]' : 'max-w-md max-h-[96vh]'} flex flex-col bg-[#0B1320] text-white rounded-2xl border border-slate-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête de la modale */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0B1320] via-[#122238] to-[#0B1320] border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAB005]/20 border border-[#FAB005]/40 flex items-center justify-center text-[#FAB005] shrink-0">
              {isAdminAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black font-heading tracking-wide text-white flex items-center gap-2">
                <span>Espace SuperAdmin ES-BTP</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#FAB005]/15 text-[#FAB005] border border-[#FAB005]/30">
                  {isAdminAuthenticated ? 'En ligne' : 'Verrouillé'}
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-400/40 transition-colors"
                title="Quitter la session d'administration"
              >
                Déconnexion
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification de confirmation */}
        {saveSuccessMessage && (
          <div className="px-6 py-2.5 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        {/* Écran d'authentification avec arrière-plan de chantier & design immersif */}
        {!isAdminAuthenticated ? (
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Arrière-plan de chantier haute qualité avec filtres et dégradés */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <img
                src={chantierHeroBg}
                alt="Chantier de construction ES-BTP Gabon"
                className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-110 saturate-125"
              />
              {/* Superposition sombre & dégradés de protection de contraste */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#07111E]/95 via-[#07111E]/90 to-[#0B1320]/98 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FAB005]/20 via-transparent to-transparent" />
              {/* Trame de grille technique subtile */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Carte centrale d'authentification optimisée pour tenir à l'écran sans coupure */}
            <div className="relative z-10 w-full bg-[#0B1320]/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10 my-auto">
              
              {/* Badge supérieur & icône */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative mb-2.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FAB005] to-[#c98e03] p-0.5 shadow-lg shadow-[#FAB005]/20 flex items-center justify-center">
                    <div className="w-full h-full bg-[#0B1320] rounded-[9px] flex items-center justify-center">
                      <Lock className="w-5 h-5 text-[#FAB005]" />
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#FAB005] text-[#08121E] text-[9px] font-black uppercase tracking-wider shadow-sm">
                    Sécurisé
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAB005] font-bold mb-0.5">
                  Espace Direction & Édition
                </span>
                <h4 className="text-base sm:text-lg font-black font-heading text-white tracking-tight">
                  Accès SuperAdmin Direction Générale
                </h4>
              </div>

              {/* Formulaire de connexion */}
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-200 text-left">
                    Mot de passe administrateur
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4 text-[#FAB005]" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      placeholder="Entrez le mot de passe secret..."
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 focus:border-[#FAB005] focus:bg-slate-900 focus:outline-hidden text-sm text-white placeholder-slate-500 font-mono tracking-wider shadow-inner transition-colors"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      aria-label="Afficher ou masquer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {authError && (
                    <div className="mt-1.5 p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium animate-in fade-in duration-200">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{authError}</span>
                    </div>
                  )}
                </div>

                {/* BOUTON DE VALIDATION HAUTE VISIBILITÉ */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] active:bg-[#c98e03] text-[#08121E] font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#FAB005]/25 hover:shadow-[#FAB005]/40 hover:-translate-y-0.5 active:translate-y-0 font-heading cursor-pointer flex items-center justify-center gap-2 border-2 border-[#ffc229]"
                >
                  <Unlock className="w-4 h-4 text-[#08121E] stroke-[2.5]" />
                  <span>Valider et ouvrir le panneau d'administration</span>
                  <ArrowRight className="w-4 h-4 text-[#08121E] stroke-[2.5]" />
                </button>

                {/* Bloc d'aide & mot de passe perdu */}
                <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setShowForgotHelp(!showForgotHelp)}
                      className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#FAB005] transition-colors cursor-pointer font-medium"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#FAB005]" />
                      <span>Mot de passe oublié ?</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('ESBTP2026@');
                        setCopiedCode(true);
                        setPasswordInput('ESBTP2026@');
                        setTimeout(() => setCopiedCode(false), 2500);
                      }}
                      className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-slate-700"
                      title="Insérer directement le code secret officiel"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Rempli !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#FAB005]" />
                          <span className="font-semibold">Code par défaut</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Panneau déroulant : Logique de mot de passe perdu & assistance */}
                  {showForgotHelp && (
                    <div className="p-3 rounded-xl bg-slate-900/95 border border-slate-700 text-left text-xs space-y-2 text-slate-300 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center gap-2 text-[#FAB005] font-bold text-xs">
                        <Shield className="w-4 h-4" />
                        <span>Procédure de récupération & codes valides</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Le code maître officiel est :
                      </p>
                      
                      <div className="flex items-center justify-between p-2 rounded-lg bg-black/50 border border-slate-700 font-mono text-xs">
                        <span className="text-[#FAB005] font-bold tracking-wider text-sm">ESBTP2026@</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('ESBTP2026@');
                            setPasswordInput('ESBTP2026@');
                            setCopiedCode(true);
                            setTimeout(() => setCopiedCode(false), 2500);
                          }}
                          className="px-2.5 py-1 rounded-md bg-[#FAB005] text-[#08121E] hover:bg-[#e09e04] font-black text-[11px] transition-colors cursor-pointer"
                        >
                          Insérer automatiquement
                        </button>
                      </div>

                      <div className="pt-1.5 border-t border-slate-800 text-[11px] space-y-0.5 text-slate-400">
                        <p className="font-semibold text-slate-300">Codes de secours acceptés :</p>
                        <p className="font-mono text-slate-400">· <code className="text-slate-300 bg-white/5 px-1 py-0.5 rounded">admin2026</code> ou <code className="text-slate-300 bg-white/5 px-1 py-0.5 rounded">DG@ESBTP</code></p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-[11px]">
                        <span className="text-slate-400">Assistance Webmaster :</span>
                        <a
                          href="mailto:arleys4u@gmail.com?subject=Demande%20assistance%20SuperAdmin%20ES-BTP"
                          className="inline-flex items-center gap-1.5 text-[#FAB005] hover:underline font-semibold"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>arleys4u@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </form>

              {/* Mention de sécurité */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Session chiffrée SSL · ES-BTP Gabon</span>
              </div>
            </div>
          </div>
        ) : (
          /* PANNEAU COMPLET D'ADMINISTRATION */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Barre d'onglets ergonomique */}
            <div className="flex items-center gap-1 px-4 pt-2 border-b border-slate-800 bg-[#09111c] overflow-x-auto shrink-0">
              <button
                onClick={() => { setActiveTab('info'); setEditingProjectId(null); setEditingNewsId(null); }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'info' ? 'border-[#FAB005] text-[#FAB005]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>1. Coordonnées & Siège</span>
              </button>

              <button
                onClick={() => { setActiveTab('home'); setEditingProjectId(null); setEditingNewsId(null); }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'home' ? 'border-[#FAB005] text-[#FAB005]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>2. Accueil & Entreprise</span>
              </button>

              <button
                onClick={() => { setActiveTab('dg'); setEditingProjectId(null); setEditingNewsId(null); }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'dg' ? 'border-[#FAB005] text-[#FAB005]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>3. Mot du DG & Photo</span>
              </button>

              <button
                onClick={() => { setActiveTab('projets'); setEditingNewsId(null); }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'projets' ? 'border-[#FAB005] text-[#FAB005]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>4. Chantiers ({projects.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('actualites'); setEditingProjectId(null); }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'actualites' ? 'border-[#FAB005] text-[#FAB005]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>5. Actualités ({news.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('engagements'); setEditingProjectId(null); setEditingNewsId(null); }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'engagements' ? 'border-[#FAB005] text-[#FAB005]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>6. Engagements QHSE</span>
              </button>

              <button
                onClick={() => { setActiveTab('chiffres'); setEditingProjectId(null); setEditingNewsId(null); }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'chiffres' ? 'border-[#FAB005] text-[#FAB005]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>7. Chiffres Clés</span>
              </button>

              <button
                onClick={() => { setActiveTab('export'); setEditingProjectId(null); setEditingNewsId(null); }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'export' ? 'border-[#FAB005] text-[#FAB005]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>8. Sauvegarde</span>
              </button>
            </div>

            {/* Corps défilable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* ONGLET 1 : COORDONNÉES & SIÈGE */}
              {activeTab === 'info' && (
                <form onSubmit={handleSaveInfo} className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Numéros de téléphone officiels (Appels & WhatsApp)</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Téléphone Principal (Airtel / WhatsApp direct)</label>
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
                      <label className="block text-xs text-slate-400 mb-1">Email Officiel ES-BTP (Devis & Chantiers)</label>
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
                      <span>Adresse Physique & Boîte Postale</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Localisation du Siège</label>
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

              {/* ONGLET 2 : ACCUEIL & PRÉSENTATION ENTREPRISE */}
              {activeTab === 'home' && (
                <form onSubmit={handleSaveInfo} className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Haut de la Page d'Accueil (Bannière Hero)</span>
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
                      <label className="block text-xs text-slate-400 mb-1">Texte d'introduction de la bannière</label>
                      <textarea
                        rows={3}
                        value={companyInfo.heroDescription}
                        onChange={(e) => updateCompanyInfo({ heroDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Textes d'introduction des sections Expertises & Réalisations</span>
                    </h5>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Sous-titre Section Expertises</label>
                      <input
                        type="text"
                        value={companyInfo.expertisesIntro}
                        onChange={(e) => updateCompanyInfo({ expertisesIntro: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Sous-titre Section Chantiers & Ouvrages</label>
                      <input
                        type="text"
                        value={companyInfo.realisationsIntro}
                        onChange={(e) => updateCompanyInfo({ realisationsIntro: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>Page Entreprise : Présentation institutionnelle</span>
                    </h5>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Paragraphe 1 : Origine et mission</label>
                      <textarea
                        rows={3}
                        value={companyInfo.entreprisePresentationP1}
                        onChange={(e) => updateCompanyInfo({ entreprisePresentationP1: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Paragraphe 2 : Moyens et engagements</label>
                      <textarea
                        rows={3}
                        value={companyInfo.entreprisePresentationP2}
                        onChange={(e) => updateCompanyInfo({ entreprisePresentationP2: e.target.value })}
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
                      <span>Enregistrer les textes</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ONGLET 3 : DIRECTION GÉNÉRALE & PHOTO */}
              {activeTab === 'dg' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  {/* Photo officielle */}
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Portrait Officiel du Directeur Général</span>
                    </h5>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Remplacez instantanément la photo officielle du Directeur Général affichée sur l'accueil, la page Entreprise et dans la signature officielle.
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

                  {/* Textes DG */}
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
                        <label className="block text-xs text-slate-400 mb-1">Fonction</label>
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
                      <label className="block text-xs text-slate-400 mb-1">Discours du DG - Paragraphe 1</label>
                      <textarea
                        rows={3}
                        value={companyInfo.dgSpeechParagraph1}
                        onChange={(e) => updateCompanyInfo({ dgSpeechParagraph1: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Discours du DG - Paragraphe 2</label>
                      <textarea
                        rows={3}
                        value={companyInfo.dgSpeechParagraph2}
                        onChange={(e) => updateCompanyInfo({ dgSpeechParagraph2: e.target.value })}
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

              {/* ONGLET 4 : CHANTIERS & OUVRAGES */}
              {activeTab === 'projets' && (
                <div className="space-y-6">
                  {editingProjectId !== null ? (
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
                        <label className="block text-xs text-slate-400 mb-1">Photo d'illustration</label>
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
                            <span>Sélectionner une photo</span>
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

              {/* ONGLET 5 : ACTUALITÉS & PUBLICATIONS */}
              {activeTab === 'actualites' && (
                <div className="space-y-6">
                  {editingNewsId !== null ? (
                    <form onSubmit={handleSaveNewsForm} className="bg-white/5 border border-slate-800 rounded-xl p-6 space-y-4 max-w-2xl mx-auto">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005]">
                          {editingNewsId === 'NEW' ? 'Rédiger une actualité' : 'Modifier l’actualité'}
                        </h5>
                        <button
                          type="button"
                          onClick={() => setEditingNewsId(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Annuler
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Titre de l'article / communiqué</label>
                        <input
                          type="text"
                          required
                          value={newsFormData.title}
                          onChange={(e) => setNewsFormData((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Ex: Réception de nouveaux engins de terrassement..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Catégorie</label>
                          <input
                            type="text"
                            value={newsFormData.category}
                            onChange={(e) => setNewsFormData((prev) => ({ ...prev, category: e.target.value }))}
                            placeholder="Vie de l'entreprise, Chantier, QHSE..."
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Date affichée</label>
                          <input
                            type="text"
                            value={newsFormData.date}
                            onChange={(e) => setNewsFormData((prev) => ({ ...prev, date: e.target.value }))}
                            placeholder="Ex: Mars 2026"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Résumé court</label>
                        <textarea
                          rows={2}
                          value={newsFormData.excerpt}
                          onChange={(e) => setNewsFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                          placeholder="Bref résumé affiché sur la carte..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Contenu complet de l'article</label>
                        <textarea
                          rows={4}
                          value={newsFormData.content}
                          onChange={(e) => setNewsFormData((prev) => ({ ...prev, content: e.target.value }))}
                          placeholder="Développez l'article ou le communiqué complet..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Image de l'article</label>
                        <div className="flex items-center gap-4">
                          {newsFormData.image && (
                            <img
                              src={newsFormData.image}
                              alt="Aperçu"
                              className="w-16 h-16 rounded-lg object-cover border border-slate-700"
                            />
                          )}
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer border border-slate-700">
                            <Upload className="w-3.5 h-3.5 text-[#FAB005]" />
                            <span>Charger une image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleNewsImageUpload}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => setEditingNewsId(null)}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] text-xs font-bold uppercase tracking-wider font-heading cursor-pointer"
                        >
                          Enregistrer l'article
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">
                          {news.length} article(s) publié(s) sur le site.
                        </p>
                        <button
                          type="button"
                          onClick={handleOpenAddNews}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] text-xs font-bold uppercase tracking-wider font-heading cursor-pointer shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Publier une actualité</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {news.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 bg-white/5 border border-slate-800 rounded-xl flex items-start gap-4 hover:border-slate-700 transition-colors"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-700"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FAB005] block">
                                {item.category} · {item.date}
                              </span>
                              <h6 className="text-sm font-bold text-white truncate mt-0.5">
                                {item.title}
                              </h6>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                                {item.excerpt}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleOpenEditNews(item)}
                                className="p-2 rounded-lg text-slate-400 hover:text-[#FAB005] hover:bg-white/5 transition-colors"
                                title="Modifier cette publication"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Confirmez-vous la suppression de l'actualité "${item.title}" ?`)) {
                                    deleteNewsItem(item.id);
                                    showNotification('Actualité supprimée.');
                                  }
                                }}
                                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                                title="Supprimer cette publication"
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

              {/* ONGLET 6 : ENGAGEMENTS QHSE & RSE */}
              {activeTab === 'engagements' && (
                <form onSubmit={handleSaveInfo} className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Textes des 4 Piliers QHSE & RSE</span>
                    </h5>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">1. Qualité d'exécution</label>
                      <textarea
                        rows={2}
                        value={companyInfo.qualiteCommitmentText}
                        onChange={(e) => updateCompanyInfo({ qualiteCommitmentText: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">2. Rigueur opérationnelle & Respect des délais</label>
                      <textarea
                        rows={2}
                        value={companyInfo.rigueurCommitmentText}
                        onChange={(e) => updateCompanyInfo({ rigueurCommitmentText: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">3. Sécurité des compagnons (Zéro accident)</label>
                      <textarea
                        rows={2}
                        value={companyInfo.securiteCommitmentText}
                        onChange={(e) => updateCompanyInfo({ securiteCommitmentText: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">4. Durabilité & Protection de l'environnement</label>
                      <textarea
                        rows={2}
                        value={companyInfo.durabiliteCommitmentText}
                        onChange={(e) => updateCompanyInfo({ durabiliteCommitmentText: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] font-bold text-xs uppercase tracking-wider transition-all shadow-md font-heading cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Enregistrer les engagements</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ONGLET 7 : CHIFFRES CLÉS DU COMPTEUR */}
              {activeTab === 'chiffres' && (
                <form onSubmit={handleSaveInfo} className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Chiffres Réalistes de la Section Compteur</span>
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ces valeurs animent dynamiquement les compteurs visibles au milieu de la page d'accueil.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Surfaces Bâtiments Réalisées (m²)</label>
                        <input
                          type="number"
                          value={companyInfo.metricBatimentM2}
                          onChange={(e) => updateCompanyInfo({ metricBatimentM2: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Voiries & Voies Bitumées (km)</label>
                        <input
                          type="number"
                          value={companyInfo.metricRoutesKm}
                          onChange={(e) => updateCompanyInfo({ metricRoutesKm: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Provinces du Gabon Couvertes</label>
                        <input
                          type="number"
                          value={companyInfo.metricProvinces}
                          onChange={(e) => updateCompanyInfo({ metricProvinces: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Taux de Conformité QHSE (%)</label>
                        <input
                          type="number"
                          value={companyInfo.metricSecuriteQhse}
                          onChange={(e) => updateCompanyInfo({ metricSecuriteQhse: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-[#FAB005] focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAB005] hover:bg-[#e09e04] text-[#0B1320] font-bold text-xs uppercase tracking-wider transition-all shadow-md font-heading cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Valider les chiffres</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ONGLET 8 : SAUVEGARDE & RESTAURATION */}
              {activeTab === 'export' && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#FAB005] flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Télécharger une sauvegarde complète</span>
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Téléchargez une copie intégrale de l'ensemble des textes, chantiers et actualités personnalisés.
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors border border-slate-700 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#FAB005]" />
                      <span>Exporter le fichier JSON</span>
                    </button>
                  </div>

                  <div className="bg-white/5 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Rétablir le contenu d'origine</span>
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Si vous souhaitez tout réinitialiser et revenir à la version officielle initiale.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Êtes-vous sûr de vouloir réinitialiser tout le site aux paramètres d’usine par défaut ?')) {
                          resetToDefaults();
                          showNotification('Contenu réinitialisé avec succès !');
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold transition-colors border border-rose-800/40 cursor-pointer"
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
