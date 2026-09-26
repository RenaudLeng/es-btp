import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Signature Concepteur & Architecte Web
if (typeof window !== 'undefined') {
  console.log(
    '%c🏗️ ES-BTP Gabon %c| Conçu & Développé par Renaud LENG (Renaud LENGOUORI) — RL-Services.Inc %c| Contact: arleys4u@gmail.com',
    'background: #07111E; color: #FAB005; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #112238; color: #FFFFFF; padding: 4px 8px;',
    'background: #FAB005; color: #07111E; font-weight: bold; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
