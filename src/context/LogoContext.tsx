import React, { createContext, useContext, useState, useEffect } from 'react';

export type LogoArchetype = 'monogram' | 'shield' | 'horizon' | 'classic';

interface LogoContextType {
  customLogoUrl: string | null;
  setCustomLogoUrl: (url: string | null) => void;
  archetype: LogoArchetype;
  setArchetype: (archetype: LogoArchetype) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY_CUSTOM_LOGO = 'es_btp_custom_logo_data';
const STORAGE_KEY_ARCHETYPE = 'es_btp_logo_archetype';

export const DEFAULT_OFFICIAL_LOGO = '/official_logo_esbtp.png';

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customLogoUrl, setCustomLogoUrlState] = useState<string | null>(DEFAULT_OFFICIAL_LOGO);
  const [archetype, setArchetypeState] = useState<LogoArchetype>('monogram');

  useEffect(() => {
    try {
      const storedLogo = localStorage.getItem(STORAGE_KEY_CUSTOM_LOGO);
      if (storedLogo) {
        setCustomLogoUrlState(storedLogo);
      } else {
        setCustomLogoUrlState(DEFAULT_OFFICIAL_LOGO);
      }
      const storedArchetype = localStorage.getItem(STORAGE_KEY_ARCHETYPE) as LogoArchetype;
      if (storedArchetype && ['monogram', 'shield', 'horizon', 'classic'].includes(storedArchetype)) {
        setArchetypeState(storedArchetype);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setCustomLogoUrl = (url: string | null) => {
    setCustomLogoUrlState(url);
    try {
      if (url) {
        localStorage.setItem(STORAGE_KEY_CUSTOM_LOGO, url);
      } else {
        localStorage.removeItem(STORAGE_KEY_CUSTOM_LOGO);
      }
    } catch {
      // Storage quota or disabled
    }
  };

  const setArchetype = (newArchetype: LogoArchetype) => {
    setArchetypeState(newArchetype);
    try {
      localStorage.setItem(STORAGE_KEY_ARCHETYPE, newArchetype);
    } catch {
      // Ignore
    }
  };

  const resetToDefault = () => {
    setCustomLogoUrl(DEFAULT_OFFICIAL_LOGO);
    setArchetype('monogram');
  };

  return (
    <LogoContext.Provider
      value={{
        customLogoUrl,
        setCustomLogoUrl,
        archetype,
        setArchetype,
        resetToDefault,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = (): LogoContextType => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};
