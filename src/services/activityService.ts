import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ActivityLogItem {
  id?: string;
  action: string;
  category: 'info' | 'home' | 'dg' | 'projets' | 'actualites' | 'engagements' | 'chiffres' | 'securite' | 'export';
  details: string;
  author: string;
  timestamp: string;
  createdAt?: any;
}

const COLLECTION_NAME = 'activity_logs';

/**
 * Enregistre une modification sur le site dans Firestore
 */
export async function logActivity(
  action: string,
  category: ActivityLogItem['category'],
  details: string,
  author: string = 'Direction Générale'
): Promise<void> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    await addDoc(colRef, {
      action,
      category,
      details,
      author,
      timestamp: new Date().toISOString(),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.warn('Erreur enregistrement log Firestore:', error);
    // Sauvegarde miroir locale en cas de coupure réseau
    try {
      const stored = localStorage.getItem('es_btp_offline_logs');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift({
        id: `offline-${Date.now()}`,
        action,
        category,
        details,
        author,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('es_btp_offline_logs', JSON.stringify(list.slice(0, 50)));
    } catch {
      // ignore
    }
  }
}

/**
 * Récupère les dernières activités depuis Firestore
 */
export async function fetchRecentActivities(limitCount: number = 30): Promise<ActivityLogItem[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    // Essai avec tri par horodatage
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // Récupérer les logs hors-ligne s'il y en a
      return getOfflineLogs();
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      let formattedTime = data.timestamp;
      if (data.createdAt instanceof Timestamp) {
        formattedTime = data.createdAt.toDate().toISOString();
      }
      return {
        id: docSnap.id,
        action: data.action || 'Modification',
        category: data.category || 'info',
        details: data.details || '',
        author: data.author || 'SuperAdmin',
        timestamp: formattedTime || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.warn('Erreur lecture Firestore activity_logs, fallback:', error);
    return getOfflineLogs();
  }
}

function getOfflineLogs(): ActivityLogItem[] {
  try {
    const stored = localStorage.getItem('es_btp_offline_logs');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return [
    {
      id: 'demo-1',
      action: 'Système initialisé',
      category: 'securite',
      details: 'Espace SuperAdmin et connexion Firestore connectés avec succès.',
      author: 'Direction ES-BTP',
      timestamp: new Date().toISOString(),
    }
  ];
}
