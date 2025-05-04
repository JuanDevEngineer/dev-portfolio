import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.scss'

// Extend the Window interface to include custom properties
declare global {
  interface Window {
    $primaryLanguage: string;
    $secondaryLanguage: string;
    $primaryLanguageIconId: string;
    $secondaryLanguageIconId: string;
  }
}

/* GLOBAL VARIABLES */
window.$primaryLanguage = 'en';
window.$secondaryLanguage = 'es';
window.$primaryLanguageIconId = 'primary-lang-icon';
window.$secondaryLanguageIconId = 'secondary-lang-icon';

createRoot(document.getElementById('root')!).render( 
  <StrictMode>
    <App />
  </StrictMode>,
)
