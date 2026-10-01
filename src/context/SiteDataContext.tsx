import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO, PROJECTS, ProjectItem } from '../data/btpData';

export interface EditableCompanyInfo {
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  bp: string;
  city: string;
  country: string;
  dgName: string;
  dgTitle: string;
  dgQuote: string;
  dgSpeechParagraph1: string;
  dgSpeechParagraph2: string;
  heroTagline: string;
  heroDescription: string;
}

interface SiteDataContextType {
  companyInfo: EditableCompanyInfo;
  projects: ProjectItem[];
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateCompanyInfo: (newInfo: Partial<EditableCompanyInfo>) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  addProject: (newProject: Omit<ProjectItem, 'id'>) => void;
  deleteProject: (id: string) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const STORAGE_KEY_INFO = 'es_btp_custom_info_v1';
const STORAGE_KEY_PROJECTS = 'es_btp_custom_projects_v1';
const STORAGE_KEY_ADMIN_AUTH = 'es_btp_admin_session_auth';

// Mot de passe maître du SuperAdmin (simple et personnalisable)
// Par défaut: "ESBTP2026@" ou "admin2026"
const ADMIN_PASSWORD_HASH = 'ESBTP2026@';

const defaultInfo: EditableCompanyInfo = {
  phone1: COMPANY_INFO.contact.phone1,
  phone2: COMPANY_INFO.contact.phone2,
  email: COMPANY_INFO.contact.email,
  address: COMPANY_INFO.contact.address,
  bp: COMPANY_INFO.contact.bp,
  city: COMPANY_INFO.contact.city,
  country: COMPANY_INFO.contact.country,
  dgName: COMPANY_INFO.management.name,
  dgTitle: COMPANY_INFO.management.title,
  dgQuote: COMPANY_INFO.management.quote,
  dgSpeechParagraph1: COMPANY_INFO.management.speech[0] || '',
  dgSpeechParagraph2: COMPANY_INFO.management.speech[1] || '',
  heroTagline: 'LE FUTUR SE CONSTRUIT MAINTENANT.',
  heroDescription: 'Entreprise gabonaise de construction et de travaux publics, ES-BTP intervient avec rigueur technique et proximité humaine pour réaliser vos chantiers de bâtiment, voiries et aménagements au Gabon.',
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
      console.warn('Erreur lecture localStorage info', e);
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
      console.warn('Erreur lecture localStorage projects', e);
    }
    return PROJECTS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sauvegarde automatique
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INFO, JSON.stringify(companyInfo));
    } catch (e) {
      console.warn('Erreur sauvegarde info', e);
    }
  }, [companyInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Erreur sauvegarde projects', e);
    }
  }, [projects]);

  const loginAdmin = (password: string): boolean => {
    const cleanPass = password.trim();
    // Accepte le code principal ou un mot de passe simple de secours
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

  const resetToDefaults = () => {
    setCompanyInfo(defaultInfo);
    setProjects(PROJECTS);
    try {
      localStorage.removeItem(STORAGE_KEY_INFO);
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
    } catch {
      // ignore
    }
  };

  const exportDataJson = (): string => {
    return JSON.stringify({
      companyInfo,
      projects,
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
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateCompanyInfo,
        updateProject,
        addProject,
        deleteProject,
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
