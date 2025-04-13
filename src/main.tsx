
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log pour faciliter le debugging
console.log('Application initialisée - Version 1.0');

// Créer et monter l'application React
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<App />);

// Log pour confirmer que le rendu initial est terminé
console.log('Rendu initial terminé');
