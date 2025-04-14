
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SummarySection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-card/30">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">📦 EN RÉSUMÉ :</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-border bg-muted p-2 text-left">✅ Ce que tu achètes</th>
                    <th className="border border-border bg-muted p-2 text-left">🧠 Ce que tu reçois</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2">Une formation IA pour créer du contenu non-stop</td>
                    <td className="border border-border p-2">20 vidéos + outils IA + prompts exclusifs</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Un seul paiement de 15.000 FCFA</td>
                    <td className="border border-border p-2">Accès à vie, une fois pour toutes</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Un code unique, sécurisé</td>
                    <td className="border border-border p-2">Permet l'unique inscription à la plateforme</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Offre limitée à 100 personnes</td>
                    <td className="border border-border p-2">Ensuite ? Prix double + plus de bonus</td>
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
