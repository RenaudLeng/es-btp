/**
 * Gestionnaire dynamique des Métadonnées SEO et Balises Réseaux Sociaux (Open Graph / Twitter)
 * Permet à chaque vue (Accueil, Entreprise, Expertises, Réalisations, etc.) de mettre à jour
 * dynamiquement le <title>, les balises <meta name="description">, <meta property="og:*">,
 * et d'injecter des données structurées JSON-LD spécifiques (Service, ItemList, GeneralContractor).
 */

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = 'https://es-btp.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/official_logo_esbtp.png`;

export function updatePageSeo(config: SeoConfig) {
  if (typeof document === 'undefined') return;

  // 1. Titre de la page
  document.title = config.title;

  // 2. Mise à jour ou création des balises Meta standards
  setMetaTag('name', 'description', config.description);
  if (config.keywords) {
    setMetaTag('name', 'keywords', config.keywords);
  }

  // 3. Open Graph
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  const canonicalUrl = `${BASE_URL}${config.canonicalPath || ''}`;
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:image', DEFAULT_IMAGE);

  // 4. Twitter Card
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);
  setMetaTag('name', 'twitter:image', DEFAULT_IMAGE);

  // 5. Canonical link
  let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.rel = 'canonical';
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.href = canonicalUrl;

  // 6. JSON-LD dynamique supplémentaire
  const existingDynamicLd = document.getElementById('esbtp-dynamic-jsonld');
  if (existingDynamicLd) {
    existingDynamicLd.remove();
  }

  if (config.jsonLd) {
    const script = document.createElement('script');
    script.id = 'esbtp-dynamic-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(config.jsonLd);
    document.head.appendChild(script);
  }

  // 7. Envoi d'événement de changement de page réel à Google Analytics 4 (GA4)
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    try {
      (window as unknown as { gtag: Function }).gtag('event', 'page_view', {
        page_title: config.title,
        page_location: canonicalUrl,
        page_path: config.canonicalPath || '/',
      });
    } catch {
      // Ignorer si bloqueur de pub actif
    }
  }
}

function setMetaTag(attributeName: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attributeName}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}
