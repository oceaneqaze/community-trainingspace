
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Key, XCircle, CheckCircle, Lock, Target, Shield, Gift } from 'lucide-react';

const AccessSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg tech-border">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 flex items-center">
              <Key className="h-5 w-5 mr-2" /> ACCÈS UNIQUEMENT PAR CODE
            </h2>
            
            <ul className="list-none space-y-3 mb-6">
              <li className="flex items-start">
                <span className="mr-2 text-destructive mt-1"><XCircle className="h-5 w-5" /></span>
                <span>La plateforme n'est <strong>pas ouverte au public</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500 mt-1"><CheckCircle className="h-5 w-5" /></span>
                <span>Tu ne peux pas t'y inscrire sans ce code</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1"><Lock className="h-5 w-5" /></span>
                <span>Un seul code = une seule personne</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1"><Target className="h-5 w-5" /></span>
                <span>Ce code t'est envoyé <strong>juste après paiement</strong></span>
              </li>
            </ul>
            
            <blockquote className="border-l-4 border-primary pl-4 py-2 mb-6">
              <p className="mb-2">
                <span className="text-primary font-bold"><Gift className="h-4 w-4 inline mr-1" /></span> Tu rejoins une base <strong>fermée et premium</strong>.
              </p>
              <p className="mb-2">
                <span className="text-destructive font-bold"><XCircle className="h-4 w-4 inline mr-1" /></span> Partager ton code = blocage définitif.
              </p>
              <p>
                <span className="text-primary font-bold"><Shield className="h-4 w-4 inline mr-1" /></span> Chaque membre est <strong>vérifié</strong>.
              </p>
            </blockquote>
            
            <p className="text-lg font-bold text-center">
              C'est pas juste une formation. C'est une <strong>salle secrète réservée aux créateurs sérieux</strong>.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AccessSection;
