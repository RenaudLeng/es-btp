/**
 * Service d'envoi de formulaire de contact et devis (Serverless)
 *
 * Utilise Formspree en priorité (endpoint configurable via VITE_FORMSPREE_ENDPOINT).
 * Si aucun ID Formspree n'est configuré ou si le service est hors ligne, un fallback
 * automatique génère un lien mailto propre vers l'email officiel (esbtp2013@gmail.com)
 * et permet également la notification instantanée sur WhatsApp.
 */

import { COMPANY_INFO } from '../data/btpData';

export interface ContactFormData {
  nom: string;
  entreprise?: string;
  telephone: string;
  email: string;
  typeProjet?: string;
  localisation?: string;
  message: string;
}

export interface SendResult {
  success: boolean;
  message: string;
  method: 'formspree' | 'mailto_fallback';
  mailtoUrl?: string;
}

// Endpoint Formspree officiel ES-BTP.
// Configuré avec l'ID Formspree fourni par l'administrateur
export const DEFAULT_FORMSPREE_ENDPOINT =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT as string) || 'https://formspree.io/f/mdekbpgg';

export async function sendContactMessage(data: ContactFormData): Promise<SendResult> {
  const formspreeUrl = DEFAULT_FORMSPREE_ENDPOINT;

  // Préparation des données lisibles (avec standard Formspree _replyto et email en minuscules requis pour l'Autoresponder)
  const payload = {
    name: data.nom,
    email: data.email,
    _replyto: data.email,
    Nom: data.nom,
    Entreprise: data.entreprise || 'Non renseigné (Particulier/Autre)',
    Telephone: data.telephone,
    Email: data.email,
    'Type de projet': data.typeProjet || 'Général',
    Localisation: data.localisation || 'Non spécifiée',
    Message: data.message,
    _subject: `[ES-BTP Contact Web] Demande de ${data.nom} (${data.typeProjet || 'Projet'})`,
  };

  // 1. Si Formspree est configuré avec une URL valide, on effectue l'envoi AJAX direct
  if (formspreeUrl && formspreeUrl.startsWith('https://formspree.io/f/')) {
    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Votre message a été transmis avec succès à notre équipe technique.',
          method: 'formspree',
        };
      }
    } catch {
      // Échec réseau, on bascule silencieusement sur le fallback
    }
  }

  // 2. Fallback élégant : Mailto pré-rempli sans perte de données
  const subject = encodeURIComponent(`[ES-BTP Web] Demande de devis / contact - ${data.nom}`);
  const body = encodeURIComponent(
    `DEMANDE DE CONTACT / DEVIS ES-BTP GABON\n` +
      `-----------------------------------------\n` +
      `Nom : ${data.nom}\n` +
      `Entreprise / Organisme : ${data.entreprise || 'Non spécifié'}\n` +
      `Téléphone : ${data.telephone}\n` +
      `E-mail : ${data.email}\n` +
      `Typologie de travaux : ${data.typeProjet || 'Non renseigné'}\n` +
      `Localisation prévisionnelle : ${data.localisation || 'Libreville / Gabon'}\n\n` +
      `Description du besoin :\n${data.message}\n` +
      `-----------------------------------------\n` +
      `Envoyé depuis le site officiel https://es-btp.vercel.app`
  );

  const mailtoUrl = `mailto:${COMPANY_INFO.contact.email}?subject=${subject}&body=${body}`;

  return {
    success: true,
    message: 'Votre demande est prête à être transmise directement à la direction.',
    method: 'mailto_fallback',
    mailtoUrl,
  };
}
