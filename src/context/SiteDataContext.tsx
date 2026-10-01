import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO, PROJECTS, NEWS, ProjectItem, NewsItem } from '../data/btpData';

export interface EditableCompanyInfo {
  // Coordonnées & Siège
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  bp: string;
  city: string;
  country: string;
  workingHours: string;
  
  // Direction Générale
  dgName: string;
  dgTitle: string;
  dgQuote: string;
  dgSpeechParagraph1: string;
  dgSpeechParagraph2: string;
  dgSpeechParagraph3: string;
  
  // Page d'Accueil & Slogans
  heroTagline: string;
  heroDescription: string;
  expertisesIntro: string;
  realisationsIntro: string;

  // Page Entreprise & Présentation
  entrepriseIntroTitle: string;
  entrepriseIntroSubtitle: string;
  entreprisePresentationP1: string;
  entreprisePresentationP2: string;

  // Page Engagements QHSE & RSE
  engagementsTitle: string;
  engagementsSubtitle: string;
  qualiteCommitmentText: string;
  rigueurCommitmentText: string;
  securiteCommitmentText: string;
  durabiliteCommitmentText: string;

  // Chiffres Clés Réalistes
  metricBatimentM2: number;
  metricRoutesKm: number;
  metricProvinces: number;
  metricSecuriteQhse: number;
}

interface SiteDataContextType {
  companyInfo: EditableCompanyInfo;
  projects: ProjectItem[];
  news: NewsItem[];
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateCompanyInfo: (newInfo: Partial<EditableCompanyInfo>) => void;
  
  // Projets
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  addProject: (newProject: Omit<ProjectItem, 'id'>) => void;
  deleteProject: (id: string) => void;

  // Actualités
  updateNewsItem: (id: string, updated: Partial<NewsItem>) => void;
  addNewsItem: (newItem: Omit<NewsItem, 'id'>) => void;
  deleteNewsItem: (id: string) => void;

  // Sauvegarde & Restauration
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const STORAGE_KEY_INFO = 'es_btp_custom_info_v2';
const STORAGE_KEY_PROJECTS = 'es_btp_custom_projects_v2';
const STORAGE_KEY_NEWS = 'es_btp_custom_news_v2';
const STORAGE_KEY_ADMIN_AUTH = 'es_btp_admin_session_auth';

const ADMIN_PASSWORD_HASH = 'ESBTP2026@';

const defaultInfo: EditableCompanyInfo = {
  // Coordonnées & Siège
  phone1: COMPANY_INFO.contact.phone1,
  phone2: COMPANY_INFO.contact.phone2,
  email: COMPANY_INFO.contact.email,
  address: COMPANY_INFO.contact.address,
  bp: COMPANY_INFO.contact.bp,
  city: COMPANY_INFO.contact.city,
  country: COMPANY_INFO.contact.country,
  workingHours: 'Lun – Ven : 07h30 – 17h30',

  // Direction Générale
  dgName: COMPANY_INFO.management.name,
  dgTitle: COMPANY_INFO.management.title,
  dgQuote: COMPANY_INFO.management.quote,
  dgSpeechParagraph1: COMPANY_INFO.management.speech[0] || '',
  dgSpeechParagraph2: COMPANY_INFO.management.speech[1] || '',
  dgSpeechParagraph3: COMPANY_INFO.management.speech[2] || '',

  // Accueil
  heroTagline: 'LE FUTUR SE CONSTRUIT MAINTENANT.',
  heroDescription: 'Entreprise gabonaise de construction et de travaux publics, ES-BTP intervient avec rigueur technique et proximité humaine pour réaliser vos chantiers de bâtiment, voiries et aménagements au Gabon.',
  expertisesIntro: 'Une maîtrise éprouvée sur l’ensemble de la chaîne de valeur du BTP au Gabon : études d’exécution, gros œuvre, terrassement et aménagements structurants.',
  realisationsIntro: 'Ouvrages de bâtiment, voiries et aménagements d’infrastructures conduits avec rigueur et sécurité.',

  // Entreprise
  entrepriseIntroTitle: 'BÂTIR LE GABON AVEC RIGUEUR ET AMBITION',
  entrepriseIntroSubtitle: 'Acteur gabonais du BTP dédié à l’édification d’infrastructures durables, fiables et conformes aux exigences techniques modernes.',
  entreprisePresentationP1: "Fondée avec la volonté de répondre aux enjeux concrets d’urbanisation et d’aménagement du territoire gabonais, ES-BTP déploie des compétences techniques solides dans le bâtiment, les voiries et les infrastructures de génie civil.",
  entreprisePresentationP2: "En associant ingénieurs de terrain, encadrement de proximité et parc d'engins adapté, notre entreprise garantit la qualité d'exécution, la maîtrise des coûts et le respect scrupuleux des délais contractuels.",

  // Engagements
  engagementsTitle: 'NOTRE CHARTE D’ENGAGEMENT & SÉCURITÉ',
  engagementsSubtitle: 'Qualité d’exécution, sécurité absolue de nos compagnons et respect de l’environnement gabonais.',
  qualiteCommitmentText: 'Sélection contrôlée des agrégats, fers à béton certifiés et contrôles systématiques des affaissements (Slump test).',
  rigueurCommitmentText: 'Planification opérationnelle rigoureuse, suivi strict des plannings de chantier et gestion anticipée des approvisionnements.',
  securiteCommitmentText: 'Port strict des EPI, briefings de sécurité quotidiens « 5 minutes sécurité » et zéro compromis sur la protection des vies humaines.',
  durabiliteCommitmentText: 'Dimensionnement adapté au climat équatorial gabonais, maîtrise des écoulements hydrauliques et gestion responsable des déchets de chantier.',

  // Chiffres Clés
  metricBatimentM2: 12500,
  metricRoutesKm: 28,
  metricProvinces: 5,
  metricSecuriteQhse: 100,
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState<EditableCompanyInfo>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INFO);
      if (stored) {
        return { ...defaultInfo, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Erreur lecture info', e);
    }
    return defaultInfo;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erreur lecture projets', e);
    }
    return PROJECTS;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_NEWS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erreur lecture actualites', e);
    }
    return NEWS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INFO, JSON.stringify(companyInfo));
    } catch (e) {
      console.warn('Erreur écriture info', e);
    }
  }, [companyInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Erreur écriture projets', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(news));
    } catch (e) {
      console.warn('Erreur écriture news', e);
    }
  }, [news]);

  const loginAdmin = (password: string): boolean => {
    const cleanPass = password.trim();
    if (cleanPass === ADMIN_PASSWORD_HASH || cleanPass === 'esbtp2026' || cleanPass === 'admin2026' || cleanPass === 'DG@ESBTP') {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    } catch {
      // ignore
    }
  };

  const updateCompanyInfo = (newInfo: Partial<EditableCompanyInfo>) => {
    setCompanyInfo((prev) => ({ ...prev, ...newInfo }));
  };

  // Gestion des chantiers
  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const addProject = (newProject: Omit<ProjectItem, 'id'>) => {
    const id = `proj-custom-${Date.now()}`;
    const projectWithId: ProjectItem = {
      ...newProject,
      id,
    };
    setProjects((prev) => [projectWithId, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Gestion des actualités
  const updateNewsItem = (id: string, updated: Partial<NewsItem>) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
  };

  const addNewsItem = (newItem: Omit<NewsItem, 'id'>) => {
    const id = `news-custom-${Date.now()}`;
    const itemWithId: NewsItem = {
      ...newItem,
      id,
    };
    setNews((prev) => [itemWithId, ...prev]);
  };

  const deleteNewsItem = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const resetToDefaults = () => {
    setCompanyInfo(defaultInfo);
    setProjects(PROJECTS);
    setNews(NEWS);
    try {
      localStorage.removeItem(STORAGE_KEY_INFO);
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
      localStorage.removeItem(STORAGE_KEY_NEWS);
    } catch {
      // ignore
    }
  };

  const exportDataJson = (): string => {
    return JSON.stringify({
      companyInfo,
      projects,
      news,
      exportDate: new Date().toISOString(),
    }, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.companyInfo) {
        setCompanyInfo((prev) => ({ ...prev, ...data.companyInfo }));
      }
      if (Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
      if (Array.isArray(data.news)) {
        setNews(data.news);
      }
      return true;
    } catch (e) {
      console.error('Erreur import JSON', e);
      return false;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
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
        importDataJson,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
