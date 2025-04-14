
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FooterSectionProps {
  formattedTimer: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ formattedTimer }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-destructive/10 to-background">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center">
        <div className="bg-card/80 border border-primary/20 rounded-lg p-6 mb-8 shadow-lg">
          <p className="text-xl font-bold mb-4">
            P.S. : Cette décision définira ton futur digital.
          </p>
          <p className="text-lg mb-4">
            Quand le compteur atteindra zéro, tout change. Le prix double, les bonus exclusifs s'évaporent, et tu resteras là à te demander pourquoi tu n'as pas saisi cette opportunité quand elle était à portée de main.
          </p>
          <p className="font-bold text-lg text-primary">
            Seras-tu celui qui agit et transforme son contenu pour toujours, ou celui qui continuera à lutter chaque jour avec la page blanche?
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Prêt à rejoindre l'élite du contenu digital?</h2>
        <p className="text-muted-foreground mb-8">
          Contactez-nous dès maintenant pour obtenir votre code d'accès ou en savoir plus sur notre méthode révolutionnaire
        </p>
        
        <div className="inline-flex items-center justify-center rounded-md border border-input bg-background p-4">
          <span className="font-medium mr-2">Contact direct:</span>
          <a 
            href="https://wa.me/22954155702" 
            className="text-primary hover:text-accent flex items-center"
            target="_blank" 
            rel="noopener noreferrer"
          >
            wa.me/22954155702
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-muted-foreground">
            DOPE CONTENT par Emma-Alk DOHOU © {new Date().getFullYear()} — Tous droits réservés
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
