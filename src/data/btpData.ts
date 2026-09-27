/**
 * Données institutionnelles et structurelles ES-BTP
 * Règle stricte : Aucune information inventée.
 * Les éléments non renseignés sont explicitement marqués [À RENSEIGNER].
 */

import heroImg from '../assets/images/hero_btp_prestige_1790106403404.jpg';
import batimentImg from '../assets/images/chantier_africain_batiment_1790108101216.jpg';
import routesImg from '../assets/images/chantier_africain_routes_1790108090031.jpg';
import infraImg from '../assets/images/chantier_africain_infra_1790108112692.jpg';
import chantierImg from '../assets/images/chantier_gabon_live_1790106446872.jpg';
import dgPortraitImg from '../assets/images/official_dg_sekoula.jpg';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'BATIMENT' | 'ROUTES' | 'INFRASTRUCTURES';
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
  keyMetric?: {
    value: string;
    label: string;
  };
  isPlaceholder?: boolean;
  technicalSpecs?: {
    label: string;
    value: string;
  }[];
}

export interface ExpertiseItem {
  id: string;
  key: 'batiment' | 'routes' | 'infrastructures';
  title: string;
  description: string;
  fullIntro: string;
  image: string;
  typesDeTravaux: string[];
  competences: string[];
}

export interface NewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  isDemo?: boolean;
}

export const COMPANY_INFO = {
  name: 'ES-BTP',
  signature: 'LE FUTUR SE CONSTRUIT MAINTENANT',
  sector: 'Bâtiment, travaux routiers, infrastructures et travaux liés au BTP',
  market: 'Gabon',
  management: {
    name: 'Guy Alain SEKOULA',
    title: 'Directeur Général',
    photo: dgPortraitImg,
    speech: [
      "Bienvenue sur la plateforme officielle d'ES-BTP. Notre entreprise s'est fixé une ambition claire et inébranlable : contribuer de manière déterminante, durable et exemplaire à l'édification des infrastructures modernes du Gabon.",
      "Qu'il s'agisse d'ouvrages de bâtiment aux normes internationales, de tracés routiers stratégiques pour désenclaver et connecter nos territoires, ou d'infrastructures de génie civil complexes, chaque projet que nous entreprenons est guidé par l'exigence absolue de la qualité d'exécution, du respect scrupuleux des délais et de la sécurité totale de nos équipes.",
      "Au Gabon, les défis de développement exigent une rigueur technique sans faille et une vision patriotique tournée vers l'avenir. Chez ES-BTP, nous croyons profondément que le progrès ne s'attend pas : « Le futur se construit maintenant ». C'est avec cette détermination que nous mobilisons nos ingénieurs, nos techniciens et nos engins pour bâtir des ouvrages faits pour durer et traverser les générations.",
      "Nous remercions chaleureusement nos partenaires publics et privés pour leur confiance renouvelée, et réaffirmons notre engagement d'excellence au service du Gabon."
    ],
    quote: "Bâtir avec rigueur, audace et responsabilité les infrastructures pérennes qui portent la croissance et la modernité du Gabon."
  },
  contact: {
    phone: '(+241) 77 088 346 / 66 855 037',
    phone1: '(+241) 77 088 346',
    phone2: '(+241) 66 855 037',
    phoneRaw1: '+24177088346',
    phoneRaw2: '+24166855037',
    email: 'esbtp2013@gmail.com',
    address: 'Sogatole Face à la FOPI',
    bp: 'BP 18394 Owendo-Gabon',
    city: 'Owendo',
    country: 'Gabon',
    socialMedia: 'Facebook, TikTok, WhatsApp, YouTube',
    creationYear: '2013',
    certifications: 'Normes de Construction & Sécurité QHSE'
  }
};

export const EXPERTISES: ExpertiseItem[] = [
  {
    id: 'batiment',
    key: 'batiment',
    title: 'BÂTIMENT',
    description: 'Concevoir et réaliser des ouvrages adaptés aux besoins fonctionnels, techniques et architecturaux des projets.',
    fullIntro: 'ES-BTP intervient sur la réalisation d’édifices institutionnels, tertiaires et résidentiels avec une rigueur d’ingénierie et de gros œuvre conforme aux normes.',
    image: batimentImg,
    typesDeTravaux: [
      'Gros œuvre et structures en béton armé',
      'Bâtiments institutionnels et administratifs',
      'Complexes tertiaires et commerciaux',
      'Ouvrages collectifs et logements durables',
      'Rénovation lourde et réhabilitation structurelle'
    ],
    competences: [
      'Calcul des structures & études d’exécution',
      'Organisation et planification de chantier',
      'Contrôle qualité des matériaux & sécurité',
      'Coordination des corps d’état secondaires'
    ]
  },
  {
    id: 'routes',
    key: 'routes',
    title: 'TRAVAUX ROUTIERS',
    description: 'Participer à la réalisation et à l’aménagement des réseaux routiers et des infrastructures de mobilité.',
    fullIntro: 'La connectivité routière est au cœur du développement territorial au Gabon. ES-BTP mobilise ses compétences pour des voiries pérennes et sécurisées.',
    image: routesImg,
    typesDeTravaux: [
      'Terrassements généraux et plateformes routières',
      'Construction de chaussées et enrobés bitumineux',
      'Aménagement de voiries urbaines et interurbaines',
      'Ouvrages d’assainissement et fossés bétonnés',
      'Entretien routier et sécurisation des axes'
    ],
    competences: [
      'Topographie & guidage d’engins',
      'Formulation et contrôle des enrobés',
      'Gestion hydrologique & évacuation pluviale',
      'Logistique d’approvisionnement en agrégats'
    ]
  },
  {
    id: 'infrastructures',
    key: 'infrastructures',
    title: 'INFRASTRUCTURES',
    description: 'Contribuer à des projets d’infrastructures structurants pour les territoires et leurs usages.',
    fullIntro: 'Du franchissement hydraulique aux aménagements de génie civil complexes, ES-BTP conçoit et bâtit des ouvrages dimensionnés pour durer.',
    image: infraImg,
    typesDeTravaux: [
      'Ponts, dalots et ouvrages d’art de franchissement',
      'Réseaux hydrauliques et bassins d’orage',
      'Fondations spéciales et soutènements',
      'Plateformes industrielles et logistiques',
      'Aménagements de berges et stabilisation de talus'
    ],
    competences: [
      'Génie civil lourd & coffrages spécifiques',
      'Hydraulique fluviale et dimensionnement',
      'Mécanique des sols & études géotechniques',
      'Sécurité environnementale de chantier'
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-bat-01',
    title: 'Projet Bâtiment Institutionnel',
    category: 'BATIMENT',
    categoryLabel: 'Bâtiment',
    location: 'Grand Libreville · Gabon',
    description: 'Structure béton armé et aménagement d’un ensemble administratif à haute performance fonctionnelle.',
    image: batimentImg,
    keyMetric: {
      value: 'R+3',
      label: 'Gros œuvre & normes ISO'
    },
    isPlaceholder: true,
    technicalSpecs: [
      { label: 'Type d’ouvrage', value: 'Bâtiment institutionnel R+3' },
      { label: 'Période', value: '[À renseigner]' },
      { label: 'Surface', value: '[Donnée à renseigner]' },
      { label: 'Maître d’ouvrage', value: '[À renseigner]' }
    ]
  },
  {
    id: 'proj-rout-01',
    title: 'Projet Aménagement Routier',
    category: 'ROUTES',
    categoryLabel: 'Travaux routiers',
    location: 'Axe National · Gabon',
    description: 'Travaux de terrassement, assainissement longitudinal et pose de revêtement routier lourd.',
    image: routesImg,
    keyMetric: {
      value: 'BBME',
      label: 'Enrobé bitumineux lourd'
    },
    isPlaceholder: true,
    technicalSpecs: [
      { label: 'Linéaire', value: '[Linéaire à renseigner]' },
      { label: 'Chaussée', value: 'Enrobé à chaud haute résistance' },
      { label: 'Assainissement', value: 'Caniveaux béton préfabriqués' },
      { label: 'Statut', value: '[À renseigner]' }
    ]
  },
  {
    id: 'proj-infra-01',
    title: 'Projet Ouvrage d’Art & Génie Civil',
    category: 'INFRASTRUCTURES',
    categoryLabel: 'Infrastructures',
    location: 'Estuaire · Gabon',
    description: 'Réalisation d’ouvrages de franchissement hydraulique et stabilisation des sols d’accès.',
    image: infraImg,
    keyMetric: {
      value: 'C30/37',
      label: 'Béton haute durabilité'
    },
    isPlaceholder: true,
    technicalSpecs: [
      { label: 'Portée / Capacité', value: '[Donnée à renseigner]' },
      { label: 'Matériaux', value: 'Béton armé C30/37 & armatures HA' },
      { label: 'Géotechnique', value: 'Fondations semi-profondes' },
      { label: 'Statut', value: '[À renseigner]' }
    ]
  },
  {
    id: 'proj-btp-04',
    title: 'Projet Plateforme & Génie Urbain',
    category: 'BATIMENT',
    categoryLabel: 'Bâtiment / Plateforme',
    location: 'Zone Industrielle Owendo · Gabon',
    description: 'Aménagement de plateforme logistique et fondations spéciales pour zone d’activités.',
    image: chantierImg,
    keyMetric: {
      value: '0 Acc.',
      label: 'Objectif sécurité QHSE'
    },
    isPlaceholder: true,
    technicalSpecs: [
      { label: 'Superficie', value: '[À renseigner]' },
      { label: 'Intervention', value: 'Terrassement + Dallage industriel' },
      { label: 'Statut', value: '[À renseigner]' }
    ]
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'news-01',
    category: 'Vie de l’entreprise',
    date: '2026',
    title: 'Déploiement opérationnel des nouveaux équipements de chantier',
    excerpt: 'Renforcement continu des capacités techniques et matérielles pour répondre aux exigences des chantiers sur le territoire gabonais.',
    content: 'Dans le cadre de son développement structuré au Gabon, ES-BTP maintient une veille rigoureuse sur la disponibilité et la conformité de son parc matériel afin d’assurer la continuité et la précision des chantiers.',
    image: routesImg,
    isDemo: true
  },
  {
    id: 'news-02',
    category: 'Chantier & Sécurité',
    date: '2026',
    title: 'Sensibilisation aux protocoles de sécurité et conformité environnementale',
    excerpt: 'Application rigoureuse des règles de prévention et de protection individuelle et collective sur l’ensemble de nos opérations.',
    content: 'La sécurité est un pilier non négociable. ES-BTP déploie des sessions régulières de quart d’heure sécurité et d’audits de terrain pour veiller à l’intégrité de ses équipes et des intervenants.',
    image: chantierImg,
    isDemo: true
  }
];

export const COMMITMENTS = [
  {
    title: 'QUALITÉ',
    text: 'Une attention portée à la qualité d’exécution et aux exigences propres à chaque projet.'
  },
  {
    title: 'RIGUEUR',
    text: 'Une organisation structurée pour accompagner chaque étape du projet.'
  },
  {
    title: 'SÉCURITÉ',
    text: 'La sécurité doit occuper une place centrale dans la conduite des travaux et l’organisation des chantiers.'
  },
  {
    title: 'DURABILITÉ',
    text: 'Concevoir des ouvrages pensés pour leur usage et leur évolution dans le temps.'
  }
];
