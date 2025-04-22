
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, MessageSquare, Share, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CommunitySection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4 flex items-center">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> LA COMMUNAUTÉ DOPE CONTENT
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
              <div className="border border-primary/30 rounded-lg p-3 sm:p-5 bg-card/50 hover:bg-card/80 transition-all group">
                <div className="flex items-center mb-2 sm:mb-3">
                  <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
                  <h3 className="text-sm sm:text-lg font-bold">Échanges Illimités</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Un espace privé où les créateurs partagent leurs stratégies, leurs défis et leurs succès en toute confidentialité.
                </p>
              </div>
              
              <div className="border border-primary/30 rounded-lg p-3 sm:p-5 bg-card/50 hover:bg-card/80 transition-all group">
                <div className="flex items-center mb-2 sm:mb-3">
                  <Share className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
                  <h3 className="text-sm sm:text-lg font-bold">Partage de Ressources</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Prompts IA, templates de contenu, outils de productivité — tout est partagé en exclusivité avec la communauté.
                </p>
              </div>
              
              <div className="border border-primary/30 rounded-lg p-3 sm:p-5 bg-card/50 hover:bg-card/80 transition-all group">
                <div className="flex items-center mb-2 sm:mb-3">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
                  <h3 className="text-sm sm:text-lg font-bold">Mentorat Actif</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Des sessions live, des critiques constructives et un accompagnement permanent pour booster ton contenu.
                </p>
              </div>
            </div>
            
            <div className="text-center bg-primary/10 p-3 sm:p-4 rounded-lg border border-primary/30">
              <p className="font-bold text-xs sm:text-base mb-2">
                Une communauté de créateurs qui se soutiennent mutuellement
              </p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">
                Pas juste un groupe, mais un véritable écosystème de création de contenu digital.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CommunitySection;
