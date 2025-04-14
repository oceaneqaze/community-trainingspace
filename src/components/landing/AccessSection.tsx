
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Key, XCircle, CheckCircle, Lock, Target, Shield, Gift } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AccessSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg tech-border">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 flex items-center">
              <Key className="h-4 w-4 md:h-5 md:w-5 mr-2" /> ACCÈS UNIQUEMENT PAR CODE
            </h2>
            
            <ul className="list-none space-y-2 md:space-y-3 mb-4 md:mb-6">
              <li className="flex items-start">
                <span className="mr-2 text-destructive mt-1"><XCircle className="h-4 w-4 md:h-5 md:w-5" /></span>
                <span className={isMobile ? "text-sm" : ""}>La plateforme n'est <strong>pas ouverte au public</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500 mt-1"><CheckCircle className="h-4 w-4 md:h-5 md:w-5" /></span>
                <span className={isMobile ? "text-sm" : ""}>Tu ne peux pas t'y inscrire sans ce code</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1"><Lock className="h-4 w-4 md:h-5 md:w-5" /></span>
                <span className={isMobile ? "text-sm" : ""}>Un seul code = une seule personne</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1"><Target className="h-4 w-4 md:h-5 md:w-5" /></span>
                <span className={isMobile ? "text-sm" : ""}>Ce code t'est envoyé <strong>juste après paiement</strong></span>
              </li>
            </ul>
            
            <blockquote className="border-l-4 border-primary pl-3 md:pl-4 py-1 md:py-2 mb-4 md:mb-6">
              <p className="mb-1 md:mb-2 text-sm md:text-base">
                <span className="text-primary font-bold"><Gift className="h-3 w-3 md:h-4 md:w-4 inline mr-1" /></span> Tu rejoins une base <strong>fermée et premium</strong>.
              </p>
              <p className="mb-1 md:mb-2 text-sm md:text-base">
                <span className="text-destructive font-bold"><XCircle className="h-3 w-3 md:h-4 md:w-4 inline mr-1" /></span> Partager ton code = blocage définitif.
              </p>
              <p className="text-sm md:text-base">
                <span className="text-primary font-bold"><Shield className="h-3 w-3 md:h-4 md:w-4 inline mr-1" /></span> Chaque membre est <strong>vérifié</strong>.
              </p>
            </blockquote>
            
            <p className="text-base md:text-lg font-bold text-center">
              C'est pas juste une formation. C'est une <strong>salle secrète réservée aux créateurs sérieux</strong>.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AccessSection;
