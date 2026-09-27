import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, ShieldCheck, Building2, HardHat, FileSpreadsheet, Lock } from 'lucide-react';
import { COMPANY_INFO } from '../data/btpData';

export const CorporateBrochureModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [downloadRequested, setDownloadRequested] = useState(false);

  if (!isOpen) return null;

  const handleSimulateDownload = () => {
    setDownloadRequested(true);
    // Création d'une fiche institutionnelle de synthèse téléchargeable
    const content = `ES-BTP GABON - FICHE CORPORATE & AGRÉMENTS TECHNIQUES 2026
============================================================
Société : ES-BTP Gabon
Slogan : « LE FUTUR SE CONSTRUIT MAINTENANT »
Date de création : 2013
Directeur Général : Guy Alain SEKOULA

DOMAINES D'EXPERTISE :
1. Bâtiment & Gros Œuvre (Normes ISO / Béton armé)
2. Travaux Routiers & VRD (Terrassements & Enrobés bitumineux lourds)
3. Infrastructures & Génie Civil (Ponts, dalots, fondations spéciales)
4. Hygiène, Sécurité & Environnement (Charte Zéro Accident QHSE)

LOCALISATION & CONTACTS OFFICIELS :
- Siège social : Sogatole Face à la FOPI, Owendo
- Boîte Postale : BP 18394 Owendo-Gabon
- Téléphones : (+241) 77 088 346 / (+241) 66 855 037
- Email officiel : esbtp2013@gmail.com
- Site officiel : https://es-btp.vercel.app

PARTENAIRES & RÉFÉRENCES :
Ministère des Travaux Publics, ANGTI, Sobraga, BGFI Bank, GSEZ, Mika Services.
============================================================
Document certifié conforme pour consultations et appels d'offres publics/privés.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ES-BTP_Plaquette_Synthese_Officielle_Gabon.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 bg-[#0B1320] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAB005]/20 text-[#FAB005] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-heading text-white">
                Dossier de Présentation Officiel
              </h3>
              <p className="text-[11px] text-slate-300">
                Plaquette Institutionnelle & Agrément ES-BTP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Contenu de la plaquette d'entreprise (Édition 2026) :</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
              <li>Présentation générale et vision de la Direction Générale</li>
              <li>Grille des compétences en Bâtiment, Travaux Routiers et Ouvrages d'Art</li>
              <li>Charte de conformité Sécurité QHSE et Zéro Accident</li>
              <li>Parc matériel, engins de chantiers et projection territoriale</li>
            </ul>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-[#FAB005]/30 text-amber-950 text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#FAB005]" />
              <span>Disponible pour commission d'appel d'offres</span>
            </div>
            <span className="font-mono font-bold text-[10px] bg-white px-2 py-0.5 rounded-md border border-amber-300">
              PDF / SYNTHÈSE
            </span>
          </div>

          {downloadRequested && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Téléchargement initié avec succès !</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
            >
              Fermer
            </button>
            <button
              onClick={handleSimulateDownload}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B1320] bg-[#FAB005] hover:bg-[#e09e04] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer font-heading"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger la synthèse</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
