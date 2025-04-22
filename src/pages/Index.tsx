
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, BarChart3 } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-background">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-8 lg:pr-8">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                Plateforme privée
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png"
                  alt="DOPE CONTENT" 
                  className="h-12 w-auto"
                />
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  DOPE <span className="text-primary">CONTENT</span>
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Accédez à des contenus exclusifs et de haute qualité pour développer vos compétences 
                dans un environnement collaboratif et professionnel.
              </p>
              
              <div className="flex items-center gap-4 flex-wrap">
                <Button 
                  onClick={() => navigate(isAuthenticated ? '/videos' : '/login')} 
                  className="tech-button shadow-lg hover:shadow-xl transition-all" 
                  size="lg"
                >
                  {isAuthenticated ? 'Voir les formations' : 'Se connecter'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                {!isAuthenticated && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/signup')} 
                    className="tech-button-outline" 
                    size="lg"
                  >
                    Inscription
                  </Button>
                )}
              </div>
            </div>
            
            <div className="relative lg:block hidden">
              <div className="tech-border rounded-2xl p-4 shadow-xl bg-card/50 backdrop-blur-sm">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img 
                    alt="Learning platform" 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    src="/lovable-uploads/eb0edc65-1186-41c7-b6f7-68352bf284ff.png" 
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-primary/10 backdrop-blur-sm p-4 shadow-lg border border-primary/20 animate-fade-in">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Accès illimité aux cours</span>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 rounded-xl bg-primary/10 backdrop-blur-sm p-4 shadow-lg border border-primary/20 animate-fade-in">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Contenu mis à jour régulièrement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Formation efficace</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tout ce dont vous avez besoin pour progresser
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Notre plateforme réunit le meilleur du digital learning et de l'apprentissage collaboratif.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
                <div className="absolute top-0 left-10 -translate-y-1/2 rounded-full bg-primary/90 p-3 text-white shadow-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <dt className="mt-4 font-semibold text-foreground text-xl">Contenus vidéo exclusifs</dt>
                <dd className="mt-3 text-muted-foreground leading-relaxed">
                  Accédez à des formations vidéo de haute qualité, organisées par catégories et constamment mises à jour.
                </dd>
              </div>
              
              {/* Feature 2 */}
              <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
                <div className="absolute top-0 left-10 -translate-y-1/2 rounded-full bg-primary/90 p-3 text-white shadow-lg">
                  <Users className="h-6 w-6" />
                </div>
                <dt className="mt-4 font-semibold text-foreground text-xl">Espace communautaire</dt>
                <dd className="mt-3 text-muted-foreground leading-relaxed">
                  Rejoignez une communauté d'apprenants et d'experts pour échanger, poser vos questions et partager vos connaissances.
                </dd>
              </div>
              
              {/* Feature 3 */}
              <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
                <div className="absolute top-0 left-10 -translate-y-1/2 rounded-full bg-primary/90 p-3 text-white shadow-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <dt className="mt-4 font-semibold text-foreground text-xl">Suivi personnalisé</dt>
                <dd className="mt-3 text-muted-foreground leading-relaxed">
                  Suivez votre progression, recevez des recommandations adaptées à votre niveau et à vos objectifs.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

