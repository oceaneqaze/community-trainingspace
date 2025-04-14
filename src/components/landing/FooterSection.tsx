
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
          <p className="text-lg font-bold mb-4">
            P.S. : Quand le timer atteint zéro, cette page change. 
          </p>
          <p className="mb-4">
            Le prix passe à 30.000 FCFA, les bonus s'envolent, et toi, tu restes là, à te demander pourquoi t'as laissé passer ça.
          </p>
          <p className="font-bold">
            Tu veux vraiment être celui qui regrette, ou celui qui agit ?
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Vous souhaitez rejoindre la communauté?</h2>
        <p className="text-muted-foreground mb-8">
          Contactez-nous pour demander une invitation ou en savoir plus sur nos formations
        </p>
        
        <div className="inline-flex items-center justify-center rounded-md border border-input bg-background p-4">
          <span className="font-medium mr-2">Contact:</span>
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
            DOPE CONTENT par Emma-Alk DOHOU © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
