
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FAQSectionProps {
  expandedFaq: string | null;
  toggleFaq: (id: string) => void;
  formattedTimer: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ expandedFaq, toggleFaq, formattedTimer }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-primary mb-4 sm:mb-8 text-center flex items-center justify-center">
              <HelpCircle className="h-4 w-4 sm:h-6 sm:w-6 mr-2" /> FAQ – Version actualisée
            </h2>
            
            <div className="space-y-2 sm:space-y-4">
              <div 
                className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq1' ? 'bg-card' : 'bg-card/50'}`}
                onClick={() => toggleFaq('faq1')}
              >
                <div className="p-3 sm:p-4 cursor-pointer flex justify-between items-center">
                  <p className="font-bold text-xs sm:text-base">Est-ce que je peux m'inscrire sans code ?</p>
                  <span>{expandedFaq === 'faq1' ? '−' : '+'}</span>
                </div>
                {expandedFaq === 'faq1' && (
                  <div className="p-3 sm:p-4 pt-0 border-t border-primary/20">
                    <p className="ml-4 sm:ml-6 flex items-start text-xs sm:text-sm"><ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary mt-0.5" /> Non. L'accès est 100 % sécurisé. Il faut ton code admin privé.</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 ml-4 sm:ml-6">Cette offre s'arrête à {formattedTimer}</p>
                  </div>
                )}
              </div>
              
              <div 
                className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq2' ? 'bg-card' : 'bg-card/50'}`}
                onClick={() => toggleFaq('faq2')}
              >
                <div className="p-3 sm:p-4 cursor-pointer flex justify-between items-center">
                  <p className="font-bold text-xs sm:text-base">Quand est-ce que je reçois mon code ?</p>
                  <span>{expandedFaq === 'faq2' ? '−' : '+'}</span>
                </div>
                {expandedFaq === 'faq2' && (
                  <div className="p-3 sm:p-4 pt-0 border-t border-primary/20">
                    <p className="ml-4 sm:ml-6 flex items-start text-xs sm:text-sm"><ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary mt-0.5" /> Immédiatement après paiement (sur ta boîte mail ou WhatsApp).</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 ml-4 sm:ml-6">Cette offre s'arrête à {formattedTimer}</p>
                  </div>
                )}
              </div>
              
              <div 
                className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq3' ? 'bg-card' : 'bg-card/50'}`}
                onClick={() => toggleFaq('faq3')}
              >
                <div className="p-3 sm:p-4 cursor-pointer flex justify-between items-center">
                  <p className="font-bold text-xs sm:text-base">Puis-je partager mon code avec un ami ?</p>
                  <span>{expandedFaq === 'faq3' ? '−' : '+'}</span>
                </div>
                {expandedFaq === 'faq3' && (
                  <div className="p-3 sm:p-4 pt-0 border-t border-primary/20">
                    <p className="ml-4 sm:ml-6 flex items-start text-xs sm:text-sm"><ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary mt-0.5" /> Non. Le code est à usage unique. Partage = suppression d'accès.</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 ml-4 sm:ml-6">Cette offre s'arrête à {formattedTimer}</p>
                  </div>
                )}
              </div>
              
              <div 
                className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq4' ? 'bg-card' : 'bg-card/50'}`}
                onClick={() => toggleFaq('faq4')}
              >
                <div className="p-3 sm:p-4 cursor-pointer flex justify-between items-center">
                  <p className="font-bold text-xs sm:text-base">Et si j'oublie ou je perds mon code ?</p>
                  <span>{expandedFaq === 'faq4' ? '−' : '+'}</span>
                </div>
                {expandedFaq === 'faq4' && (
                  <div className="p-3 sm:p-4 pt-0 border-t border-primary/20">
                    <p className="ml-4 sm:ml-6 flex items-start text-xs sm:text-sm"><ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary mt-0.5" /> Contacte-moi rapidement. Tant que personne ne l'a utilisé, je peux te le réinitialiser.</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 ml-4 sm:ml-6">Cette offre s'arrête à {formattedTimer}</p>
                  </div>
                )}
              </div>
              
              <div 
                className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq5' ? 'bg-card' : 'bg-card/50'}`}
                onClick={() => toggleFaq('faq5')}
              >
                <div className="p-3 sm:p-4 cursor-pointer flex justify-between items-center">
                  <p className="font-bold text-xs sm:text-base">L'IA, c'est compliqué ?</p>
                  <span>{expandedFaq === 'faq5' ? '−' : '+'}</span>
                </div>
                {expandedFaq === 'faq5' && (
                  <div className="p-3 sm:p-4 pt-0 border-t border-primary/20">
                    <p className="ml-4 sm:ml-6 flex items-start text-xs sm:text-sm"><ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary mt-0.5" /> Pas avec ces vidéos. Je te montre tout, étape par étape, comme si t'étais débutant. Pas besoin d'être un geek – juste de suivre les vidéos.</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 ml-4 sm:ml-6">Cette offre s'arrête à {formattedTimer}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQSection;
