
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, BarChart3, MessageCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-full bg-gradient-to-b from-background to-background/80">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
              DOPE <span className="text-primary">CONTENT</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Plateforme exclusive de formation professionnelle - Accès sur invitation uniquement
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => navigate('/login')} className="shadow-md hover:shadow-lg transition-all" size="lg">
                Se connecter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/invitation')} size="lg">
                J'ai un code d'invitation
              </Button>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl mx-auto max-w-4xl">
            <div className="aspect-video w-full">
              <img 
                src="/lovable-uploads/eb0edc65-1186-41c7-b6f7-68352bf284ff.png" 
                alt="DOPE CONTENT Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Plateforme privée</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Une expérience d'apprentissage exclusive
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Accédez à des contenus premium et à une communauté sélectionnée de professionnels
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 left-10 -translate-y-1/2 rounded-full bg-primary/90 p-3 text-white shadow-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <dt className="mt-4 font-semibold text-foreground text-xl">Contenus exclusifs</dt>
                <dd className="mt-3 text-muted-foreground leading-relaxed">
                  Des formations vidéo professionnelles accessibles uniquement aux membres invités
                </dd>
              </div>
              
              {/* Feature 2 */}
              <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 left-10 -translate-y-1/2 rounded-full bg-primary/90 p-3 text-white shadow-lg">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <dt className="mt-4 font-semibold text-foreground text-xl">Communication directe</dt>
                <dd className="mt-3 text-muted-foreground leading-relaxed">
                  Échangez avec les formateurs et les autres apprenants dans un espace de discussion privé
                </dd>
              </div>
              
              {/* Feature 3 */}
              <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 left-10 -translate-y-1/2 rounded-full bg-primary/90 p-3 text-white shadow-lg">
                  <Users className="h-6 w-6" />
                </div>
                <dt className="mt-4 font-semibold text-foreground text-xl">Communauté sélectionnée</dt>
                <dd className="mt-3 text-muted-foreground leading-relaxed">
                  Un réseau professionnel de qualité pour des échanges enrichissants et constructifs
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      
      {/* Contact section */}
      <section className="py-16 bg-card/30 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center">
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
    </div>
  );
};

export default LandingPage;
