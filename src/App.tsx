import React, { useState, useEffect } from 'react';
import { LogoProvider } from './context/LogoContext';
import { DgPhotoProvider } from './context/DgPhotoContext';
import { Header, PageId } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { HomeView } from './views/HomeView';
import { EntrepriseView } from './views/EntrepriseView';
import { ExpertisesView } from './views/ExpertisesView';
import { RealisationsView } from './views/RealisationsView';
import { EngagementsView } from './views/EngagementsView';
import { ActualitesView } from './views/ActualitesView';
import { ContactView } from './views/ContactView';
import { ProjectItem } from './data/btpData';
import { EnhancedFloatingContact } from './components/EnhancedFloatingContact';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <LogoProvider>
      <DgPhotoProvider>
        <MainApp />
      </DgPhotoProvider>
    </LogoProvider>
  );
}

function MainApp() {
  const [currentPage, setCurrentPage] = useState<PageId>('accueil');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactProjectContext, setContactProjectContext] = useState<string>('');

  // Handle URL hash navigation for deep linking or back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['accueil', 'entreprise', 'expertises', 'realisations', 'engagements', 'actualites', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    try {
      const currentViews = parseInt(sessionStorage.getItem('esbtp_session_pageviews') || '1', 10);
      sessionStorage.setItem('esbtp_session_pageviews', (currentViews + 1).toString());
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProjectContact = (projectTitle?: string) => {
    setContactProjectContext(projectTitle ? `Projet d'intérêt : ${projectTitle}` : '');
    setIsContactModalOpen(true);
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#FAB005] selection:text-[#0B1320]">
      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenProjectContact={() => handleOpenProjectContact()}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentPage === 'accueil' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenProjectContact={handleOpenProjectContact}
            onSelectProject={handleSelectProject}
          />
        )}

        {currentPage === 'entreprise' && (
          <EntrepriseView
            onOpenContact={() => handleOpenProjectContact('Information générale sur l’entreprise ES-BTP')}
          />
        )}

        {currentPage === 'expertises' && (
          <ExpertisesView
            onOpenContactForExpertise={(domain: string) => handleOpenProjectContact(`Pôle d'expertise : ${domain}`)}
          />
        )}

        {currentPage === 'realisations' && (
          <RealisationsView
            onSelectProject={handleSelectProject}
            onOpenContact={(projectTitle) => handleOpenProjectContact(projectTitle ? `Chantier d'intérêt : ${projectTitle}` : undefined)}
          />
        )}

        {currentPage === 'engagements' && (
          <EngagementsView
            onOpenContact={() => handleOpenProjectContact('Engagements QHSE & RSE ES-BTP')}
          />
        )}

        {currentPage === 'actualites' && (
          <ActualitesView />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Institutional Footer with RL-Services.Inc Copyright */}
      <Footer onNavigate={handleNavigate} />

      {/* Project Technical Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactAboutProject={(title) => handleOpenProjectContact(title)}
      />

      {/* Action / Contact Modal "Parler de votre projet" */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultProjectContext={contactProjectContext}
      />

      {/* Bouton discret flottant pour remonter en haut de la page */}
      <ScrollToTop />

      {/* Bouton d'accès direct WhatsApp & Assistance Chantiers amélioré */}
      <EnhancedFloatingContact />
    </div>
  );
}
