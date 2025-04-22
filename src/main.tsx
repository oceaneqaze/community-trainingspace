
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log pour faciliter le debugging
console.log('Application initialisée - Version 1.1');

// Créer et monter l'application React
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Élément racine 'root' introuvable dans le DOM");
  throw new Error("Failed to find the root element");
}

console.log('Élément racine trouvé, montage de l\'application...');

try {
  createRoot(rootElement).render(<App />);
  console.log('Rendu initial terminé');
} catch (error) {
  console.error('Erreur lors du rendu de l\'application:', error);
}
