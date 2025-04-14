
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, CheckCheck } from 'lucide-react';

const SummarySection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-card/30">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 flex items-center">
              <Package className="h-5 w-5 mr-2" /> L'OPPORTUNITÉ EN UN COUP D'ŒIL :
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-border bg-muted p-2 text-left flex items-center">
                      <CheckCheck className="h-4 w-4 mr-2" /> Ce que tu obtiens aujourd'hui
                    </th>
                    <th className="border border-border bg-muted p-2 text-left flex items-center">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 18a5 5 0 0 0-10 0" />
                        <line x1="12" y1="2" x2="12" y2="9" />
                        <circle cx="12" cy="13" r="2" />
                      </svg> 
                      Transformation garantie
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2">Formation IA avancée pour créateurs de contenu</td>
                    <td className="border border-border p-2">20 vidéos stratégiques + outils IA exclusifs + prompts testés</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Investissement unique de 15.000 FCFA</td>
                    <td className="border border-border p-2">Accès illimité à vie, sans frais récurrents</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Code d'accès privilégié hautement sécurisé</td>
                    <td className="border border-border p-2">Entrée exclusive dans l'écosystème fermé</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Offre limitée aux 100 visionnaires</td>
                    <td className="border border-border p-2">Après? Prix doublé et bonus définitivement perdus</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SummarySection;
