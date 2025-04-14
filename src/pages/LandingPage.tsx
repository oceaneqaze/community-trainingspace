
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  BarChart3, 
  MessageCircle, 
  Clock,
  ShieldCheck,
  Zap,
  Gift,
  Award
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LandingPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 47
  });
  
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Handle FAQ toggle
  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showExitIntent]);

  const formattedTimer = `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
  
  return (
    <div className="min-h-full bg-gradient-to-b from-background to-background/80">
      {/* Floating countdown timer - always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary/30 py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-destructive mr-2 animate-pulse" />
            <span className="text-sm sm:text-base font-bold">Offre spéciale expire dans:</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-destructive text-white px-2 py-1 rounded-md text-sm sm:text-base font-mono animate-pulse">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-destructive text-white px-2 py-1 rounded-md text-sm sm:text-base font-mono animate-pulse">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-destructive text-white px-2 py-1 rounded-md text-sm sm:text-base font-mono animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <Button 
            onClick={() => window.open('https://wa.me/22954155702', '_blank')} 
            size="sm" 
            variant="destructive" 
            className="animate-pulse transition-all hover:scale-105"
          >
            Rejoindre maintenant
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Main content - with padding top for the fixed timer */}
      <div className="pt-16">
        {/* SECTION 1: Hero section with headline & subheadline */}
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              {/* Main headline - massive typography */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold tracking-tight text-foreground mb-6 leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CLONE-TOI AVEC L'IA.<br/>
                <span className="text-white">CRÉE DU CONTENU NON-STOP.</span><br/>
                <span className="text-primary animate-pulse">DEVIENS INARRÊTABLE.</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl lg:text-[40px] text-muted-foreground font-light leading-tight mb-8 mt-4">
                Pas d'idées, pas le temps, pas de stratégie ?<br/>
                <span className="font-semibold text-white">Transforme-toi en machine à contenu en 30 jours.</span>
              </p>
              
              {/* BLOC 1: URGENCE & COMPTE À REBOURS */}
              <Card className="mb-10 border-destructive/50 bg-card/90 shadow-lg tech-border">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-4">🕒 URGENCE & COMPTE À REBOURS</h2>
                  
                  <div className="mb-4 text-lg sm:text-xl font-bold">
                    ⏱️ Offre spéciale DOPE CONTENT expire dans: 
                    <div className="flex justify-center gap-2 mt-2">
                      <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-xl">:</span>
                      <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-xl">:</span>
                      <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    </div>
                  </div>
                  
                  <blockquote className="border-l-4 border-destructive pl-4 py-2 mb-4">
                    <p className="mb-2"><span className="text-destructive font-bold">💥</span> <strong>Prix actuel : 15.000 FCFA – paiement unique</strong></p>
                    <p className="mb-2"><span className="text-destructive font-bold">🔒</span> <strong>Accès sécurisé via code admin UNIQUE (1 seul accès par personne)</strong></p>
                    <p className="mb-2"><span className="text-destructive font-bold">🎁</span> <strong>Bonus offerts aux 100 premiers uniquement</strong></p>
                    <p><span className="text-destructive font-bold">🚫</span> Après ? Le prix monte et les bonus disparaissent.</p>
                  </blockquote>
                  
                  <p className="text-sm md:text-base mb-4">
                    Imagine un instant : tu as une chance unique de transformer ta manière de créer du contenu, de devenir une machine à attirer des clients, mais cette opportunité a une limite. Ce compte à rebours, là, juste au-dessus, c'est le temps qu'il te reste pour saisir cette formation à un prix ridicule de 15.000 FCFA.
                  </p>
                  
                  <p className="mb-2">Dès que tu payes, tu reçois un <strong>code confidentiel d'accès</strong>.</p>
                  <p className="mb-2">Ce code est <strong>unique, valable une seule fois</strong>.</p>
                  <p className="mb-2">C'est lui qui débloque <strong>l'inscription à la plateforme</strong>.</p>
                  <p className="mb-4"><strong>Pas de double usage. Pas de partage. Pas de triche.</strong></p>
                  
                  <p className="font-bold">Tu veux cette clé ? Bouge avant que le timer ne tombe.</p>
                </CardContent>
              </Card>
              
              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button 
                  onClick={() => window.open('https://wa.me/22954155702', '_blank')} 
                  className="tech-button text-lg shadow-md hover:shadow-lg transition-all" 
                  size="lg"
                >
                  Obtenir mon code d'accès
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/invitation')} 
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary/20"
                >
                  J'ai déjà un code
                </Button>
              </div>
            </div>
            
            {/* Video/Image preview */}
            <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl mx-auto max-w-4xl">
              <div className="aspect-video w-full">
                <img 
                  src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png" 
                  alt="DOPE CONTENT Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="text-center p-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Salut, moi c'est Emma-Alk</h3>
                    <p className="text-white text-lg mb-4">
                      Il y a encore 2 ans, j'étais comme toi : zéro idée, zéro temps, et mes contenus ne décollaient pas.
                      Aujourd'hui, je crée des posts qui buzzent, des vidéos qui captivent, et des clients qui affluent.
                    </p>
                    <p className="text-primary text-xl font-bold">
                      Comment ? L'IA. J'ai appris à me cloner avec elle, et en 20 vidéos, je te montre tout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SECTION 2: IDENTIFICATION (The Problem) */}
        <section className="py-12 sm:py-20 bg-black/40">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">🧠 IDENTIFICATION</h2>
                
                <p className="text-lg mb-6">
                  Tu veux publier tous les jours, être visible, dominer ta niche…<br/>
                  Mais t'as :
                </p>
                <ul className="list-none space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-destructive text-xl">•</span>
                    <span className="text-lg">Pas d'idées</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-destructive text-xl">•</span>
                    <span className="text-lg">Pas de temps</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-destructive text-xl">•</span>
                    <span className="text-lg">Pas de méthode</span>
                  </li>
                </ul>
                
                <p className="font-bold text-lg mb-6">
                  <strong>Et surtout : aucune solution simple pour créer sans y passer ta vie.</strong>
                </p>
                
                <p className="text-lg mb-6">
                  Tu sais ce que ça fait, hein ? Tu te lèves, motivé, prêt à créer un truc qui déchire pour ta boîte, ton business, ta marque. 
                  Et puis, rien. Ton cerveau est vide, comme une page blanche qui te nargue.
                </p>
                
                <p className="text-lg mb-6">
                  Tu passes une heure à écrire trois lignes pourries, et au final, tu postes un truc moyen qui fait 2 likes – dont un de ta mère.
                </p>
                
                <p className="text-lg mb-6">
                  Pendant ce temps, tes concurrents, eux, balancent du contenu à tour de bras : des posts qui accrochent, des vidéos qui tournent, et des clients qui affluent.
                </p>
                
                <div className="p-4 bg-background/40 border border-destructive/30 rounded-lg mb-6">
                  <h3 className="font-bold text-lg text-destructive mb-2">Cette frustration te bouffe, avoue-le.</h3>
                  <p className="text-lg">
                    Ce sentiment d'être à la traîne, de voir les autres briller pendant que toi, t'es invisible.
                  </p>
                </div>
                
                <p className="mb-4">
                  DOPE CONTENT te donne la solution.<br/>
                  Et <strong>l'accès est ultra-sécurisé</strong> :
                </p>
                
                <ul className="list-none space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✅</span>
                    <span>Tu paies une fois</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✅</span>
                    <span>Tu reçois ton code admin unique</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✅</span>
                    <span>Tu actives ton compte pour toujours</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 3: The Solution (The Shift) */}
        <section className="py-12 sm:py-20 bg-gradient-to-b from-accent/10 to-background">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-3xl font-bold text-primary mb-4">💡 LA SOLUTION</h2>
                
                <div className="mb-8 text-center">
                  <p className="text-2xl font-bold mb-2">Et si je te disais que tu peux arrêter de galérer dès aujourd'hui ?</p>
                  <p className="text-xl">
                    Que tu peux transformer cette frustration en une machine à contenu qui travaille pour toi, presque toute seule ?
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-card p-5 rounded-lg border border-primary/30">
                    <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                      <Zap className="h-5 w-5 text-primary" />
                      20 vidéos pratiques
                    </h3>
                    <p>
                      Courtes, simples et directement applicables pour utiliser l'IA comme un pro.
                    </p>
                  </div>
                  <div className="bg-card p-5 rounded-lg border border-primary/30">
                    <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                      <Users className="h-5 w-5 text-primary" />
                      Clonage IA de ton style
                    </h3>
                    <p>
                      Ton écriture, tes images, ta voix – l'IA apprend à être toi et crée à ta place.
                    </p>
                  </div>
                  <div className="bg-card p-5 rounded-lg border border-primary/30">
                    <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Résultats en quelques jours
                    </h3>
                    <p>
                      Pas dans un mois ou un an. Tu commences à voir la différence immédiatement.
                    </p>
                  </div>
                  <div className="bg-card p-5 rounded-lg border border-primary/30">
                    <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      Méthode testée sur le terrain
                    </h3>
                    <p>
                      Pas de théorie inutile, uniquement ce qui fonctionne vraiment pour ton business.
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg mb-6">
                    Avec ma formation "DOPE CONTENT", je te donne mes raccourcis exacts, ceux que j'ai testés dans mon propre business, pour créer des posts, des vidéos, des visuels qui claquent – sans page blanche, sans stress.
                  </p>
                  
                  <Button 
                    onClick={() => window.open('https://wa.me/22954155702', '_blank')} 
                    className="tech-button text-lg font-bold animate-pulse"
                    size="lg"
                  >
                    Découvre comment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    Cette offre, ce tarif et ces bonus s'envolent quand le timer atteint zéro.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 4: Social Proof */}
        <section className="py-12 sm:py-16 bg-card/30">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <h2 className="text-xl sm:text-3xl font-bold text-center mb-8">👥 CE QU'ILS EN DISENT</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/30 bg-card/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold">Julien K.</h3>
                    <p className="text-sm text-muted-foreground">Freelance Marketing</p>
                  </div>
                  <p className="text-center italic">
                    "J'étais nul en écriture, je passais des heures pour un post minable. Avec cette formation, en 2 semaines, j'ai triplé mes vues et décroché 3 clients. L'IA, c'est ma nouvelle arme."
                  </p>
                  <div className="flex justify-center mt-4">
                    <span className="text-primary font-bold">+300%</span>
                    <span className="mx-2 text-muted-foreground">de visibilité</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/30 bg-card/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold">Sarah M.</h3>
                    <p className="text-sm text-muted-foreground">Entrepreneuse E-commerce</p>
                  </div>
                  <p className="text-center italic">
                    "Je n'avais jamais le temps pour du contenu. Maintenant, je poste tous les jours, et ma communauté adore. Les ventes ont augmenté de 27% en un mois!"
                  </p>
                  <div className="flex justify-center mt-4">
                    <span className="text-primary font-bold">Posts quotidiens</span>
                    <span className="mx-2 text-muted-foreground">sans effort</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/30 bg-card/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold">Marc T.</h3>
                    <p className="text-sm text-muted-foreground">Coach Business</p>
                  </div>
                  <p className="text-center italic">
                    "Les prompts IA sont géniaux! En une semaine j'ai créé autant de contenu qu'en un mois avant. Mes clients me demandent comment je fais!"
                  </p>
                  <div className="flex justify-center mt-4">
                    <span className="text-primary font-bold">400%</span>
                    <span className="mx-2 text-muted-foreground">de productivité</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg font-bold text-primary">93% des participants créent leur premier contenu IA en moins de 7 jours.</p>
              <p className="text-muted-foreground">Et toi, tu seras le prochain.</p>
            </div>
          </div>
        </section>
        
        {/* SECTION 5: ACCÈS UNIQUEMENT PAR CODE (Exclusivity) */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg tech-border">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">🔑 ACCÈS UNIQUEMENT PAR CODE</h2>
                
                <ul className="list-none space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2 text-destructive mt-1">🛑</span>
                    <span>La plateforme n'est <strong>pas ouverte au public</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500 mt-1">✅</span>
                    <span>Tu ne peux pas t'y inscrire sans ce code</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">🔐</span>
                    <span>Un seul code = une seule personne</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">🎯</span>
                    <span>Ce code t'est envoyé <strong>juste après paiement</strong></span>
                  </li>
                </ul>
                
                <blockquote className="border-l-4 border-primary pl-4 py-2 mb-6">
                  <p className="mb-2">
                    <span className="text-primary font-bold">🎁</span> Tu rejoins une base <strong>fermée et premium</strong>.
                  </p>
                  <p className="mb-2">
                    <span className="text-destructive font-bold">🚫</span> Partager ton code = blocage définitif.
                  </p>
                  <p>
                    <span className="text-primary font-bold">💎</span> Chaque membre est <strong>vérifié</strong>.
                  </p>
                </blockquote>
                
                <p className="text-lg font-bold text-center">
                  C'est pas juste une formation. C'est une <strong>salle secrète réservée aux créateurs sérieux</strong>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 6: Benefits */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-background/80 to-background">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">📹 CE QUE TU VAS RECEVOIR</h2>
                
                <ul className="list-none space-y-4 mb-8">
                  <li className="flex items-start bg-card/50 p-4 rounded-lg border border-primary/20 shadow-sm">
                    <span className="mr-3 text-primary mt-1 text-xl">•</span>
                    <div>
                      <h3 className="font-bold mb-1">Crée des posts et vidéos non-stop sans jamais bloquer</h3>
                      <p className="text-sm text-muted-foreground">
                        Tu te réveilles, tu lances l'IA avec mes prompts, et en 20 minutes, t'as un contenu qui accroche – fini les heures perdues.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start bg-card/50 p-4 rounded-lg border border-primary/20 shadow-sm">
                    <span className="mr-3 text-primary mt-1 text-xl">•</span>
                    <div>
                      <h3 className="font-bold mb-1">Attire des clients avec un contenu qui claque</h3>
                      <p className="text-sm text-muted-foreground">
                        Tes posts deviennent magnétiques, tes vidéos captivent, et tes prospects te contactent direct.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start bg-card/50 p-4 rounded-lg border border-primary/20 shadow-sm">
                    <span className="mr-3 text-primary mt-1 text-xl">•</span>
                    <div>
                      <h3 className="font-bold mb-1">Booste ta notoriété dans ta niche dès le 1er mois</h3>
                      <p className="text-sm text-muted-foreground">
                        Plus tu produis, plus on te voit – et en 30 jours, tu deviens LA référence qu'on suit.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start bg-card/50 p-4 rounded-lg border border-primary/20 shadow-sm">
                    <span className="mr-3 text-primary mt-1 text-xl">•</span>
                    <div>
                      <h3 className="font-bold mb-1">Dis adieu à la page blanche pour toujours</h3>
                      <p className="text-sm text-muted-foreground">
                        Avec l'IA qui te clone, les idées coulent à flots, et t'es jamais à court.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <ul className="list-none space-y-3 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">-</span>
                    <span>20 vidéos détaillées</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">-</span>
                    <span>Des systèmes de clonage IA de ton style</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">-</span>
                    <span>Des prompts prêts à l'emploi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">-</span>
                    <span>Des générateurs d'images réalistes IA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">-</span>
                    <span>Des stratégies de contenu prêtes à publier</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">-</span>
                    <span>Et surtout : <strong>l'accès à vie</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">+</span>
                    <span><strong>Mises à jour gratuites pour toujours</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary mt-1">+</span>
                    <span><strong>Ton code d'accès sécurisé</strong></span>
                  </li>
                </ul>
                
                <div className="text-center mt-6">
                  <p className="text-lg mb-4">
                    Profite de cette méthode avant qu'elle ne soit hors de prix. À 15.000 FCFA, c'est un cadeau!
                  </p>
                  <Button 
                    onClick={() => window.open('https://wa.me/22954155702', '_blank')}
                    className="tech-button text-lg shadow-lg"
                    size="lg"
                  >
                    Je veux ces avantages
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 7: The Offer & Price */}
        <section className="py-12 sm:py-16 bg-card/30">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">💸 PRIX</h2>
                
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/30 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">🔐 Paiement unique :</h3>
                      <p className="text-sm text-muted-foreground">Valeur réelle : 65.000 FCFA</p>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-primary animate-pulse">
                      15.000 FCFA
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <span className="text-sm text-muted-foreground">Offre expire dans :</span>
                    <div className="flex items-center gap-1">
                      <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span>:</span>
                      <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span>:</span>
                      <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm mb-6">
                    Je limite ça à 100 places. Pourquoi ? Parce que je veux bosser avec des gens sérieux, pas une foule.
                  </p>
                  
                  <ul className="list-none space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">➡️</span>
                      <span>Reçois <strong>ton code privé</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">➡️</span>
                      <span>Inscris-toi <strong>une seule fois</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">➡️</span>
                      <span>Accès à vie</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary mt-1">➡️</span>
                      <span>Aucun abonnement, <strong>rien d'autre à payer</strong></span>
                    </li>
                  </ul>
                  
                  <div className="text-center">
                    <Button 
                      onClick={() => window.open('https://wa.me/22954155702', '_blank')}
                      className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      Sécuriser ma place maintenant
                    </Button>
                  </div>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  Une fois ces 100 places prises – ou quand ce timer s'arrête – le prix passe à 30.000 FCFA, et les bonus s'envolent.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 8: Bonuses */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  🎁 BONUS SI TU AGIS AVANT <span className="bg-primary/90 text-white px-3 py-1 rounded-md">
                    {formattedTimer}
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="border border-primary/30 rounded-lg p-5 bg-card/50 hover:bg-card/80 transition-all group cursor-pointer">
                    <div className="flex justify-between mb-3">
                      <h3 className="font-bold">Bonus 1</h3>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Valeur : 7.000 FCFA</span>
                    </div>
                    <h4 className="text-lg font-bold mb-3">Accès à vie aux mises à jour</h4>
                    <p className="text-sm text-muted-foreground">
                      L'IA évolue, ma formation aussi. Tu reçois chaque nouvelle vidéo, chaque astuce, sans payer un centime de plus – à vie.
                    </p>
                    <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 transition-all">
                      <Gift className="h-10 w-10 text-primary animate-pulse mx-auto" />
                    </div>
                  </div>
                  
                  <div className="border border-primary/30 rounded-lg p-5 bg-card/50 hover:bg-card/80 transition-all group cursor-pointer">
                    <div className="flex justify-between mb-3">
                      <h3 className="font-bold">Bonus 2</h3>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Valeur : 5.000 FCFA</span>
                    </div>
                    <h4 className="text-lg font-bold mb-3">Communauté privée IA</h4>
                    <p className="text-sm text-muted-foreground">
                      T'es pas seul – tu rejoins un groupe de gens comme toi, qui partagent leurs idées, leurs prompts, leurs succès.
                    </p>
                    <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 transition-all">
                      <Users className="h-10 w-10 text-primary animate-pulse mx-auto" />
                    </div>
                  </div>
                  
                  <div className="border border-primary/30 rounded-lg p-5 bg-card/50 hover:bg-card/80 transition-all group cursor-pointer">
                    <div className="flex justify-between mb-3">
                      <h3 className="font-bold">Bonus 3</h3>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Valeur : 3.000 FCFA</span>
                    </div>
                    <h4 className="text-lg font-bold mb-3">Prompts premium + ChatGPT 4</h4>
                    <p className="text-sm text-muted-foreground">
                      Mes prompts secrets pour des images réalistes et du contenu d'élite, plus l'accès à ChatGPT 4 sans abonnement.
                    </p>
                    <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 transition-all">
                      <Award className="h-10 w-10 text-primary animate-pulse mx-auto" />
                    </div>
                  </div>
                </div>
                
                <ul className="list-none space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✅</span>
                    <span>Accès à vie aux mises à jour</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✅</span>
                    <span>Accès à la communauté IA privée</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✅</span>
                    <span>Prompts premium + accès ChatGPT 4 gratuit</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✅</span>
                    <span>Et bien sûr : ton <strong>code d'accès réservé</strong>, non partageable</span>
                  </li>
                </ul>
                
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/30 text-center">
                  <p className="font-bold mb-2">Ces bonus valent plus de 15.000 FCFA à eux seuls!</p>
                  <p className="text-sm">
                    Mais ils disparaissent quand le timer atteint zéro. Après, tu devras te débrouiller sans.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 9: Guarantee */}
        <section className="py-12 sm:py-16 bg-card/30">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="h-20 w-20 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">Garantie 30 jours satisfait ou remboursé</h2>
                    <p className="mb-4">
                      Je sais ce que tu te dis peut-être : "Et si ça marche pas pour moi ?" Pas de panique. Avec "DOPE CONTENT", t'as une garantie 100 % satisfait ou remboursé sous 30 jours.
                    </p>
                    <p className="mb-4">
                      Tu testes tout : les vidéos, les prompts, l'IA. Tu appliques ma méthode, tu vois les résultats. Si, pour une raison folle, tu trouves que ça vaut pas le coup, tu m'écris, et je te rends chaque centime – sans questions, sans chichi.
                    </p>
                    <p className="font-bold">
                      T'as zéro risque, parce que je crois à fond en ce que je te donne.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 10: ATTENTION / Risk */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg border-destructive/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-6">🚨 ATTENTION</h2>
                
                <blockquote className="border-l-4 border-destructive pl-4 py-2 mb-6">
                  <p className="mb-2">
                    <span className="text-destructive font-bold">❌</span> Si tu perds ton code → tu perds l'accès
                  </p>
                  <p className="mb-2">
                    <span className="text-destructive font-bold">❌</span> Si quelqu'un d'autre l'utilise avant toi → il sera désactivé
                  </p>
                  <p>
                    <span className="text-green-500 font-bold">✅</span> Dès ton paiement, tu es prioritaire → ton code est réservé immédiatement
                  </p>
                </blockquote>
                
                <p>
                  Quand ce timer atteint zéro, cette page change. Le prix passe à 30.000 FCFA, les bonus s'envolent, et toi, tu restes là, à te demander pourquoi t'as laissé passer ça.
                </p>
                <p className="font-bold mt-4">
                  Chaque jour sans cette méthode, c'est un jour où tes concurrents te doublent.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 11: Summary */}
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
        
        {/* SECTION 12: CTA FINAL */}
        <section className="py-12 sm:py-16 bg-primary/10">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary shadow-lg bg-card">
              <CardContent className="p-6 sm:p-8 text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">🚀 DÉCIDE MAINTENANT</h2>
                
                <p className="text-lg font-bold mb-2">
                  <strong>Tu veux accéder à la plateforme privée de DOPE CONTENT ?</strong>
                </p>
                <p className="text-lg font-bold mb-6">
                  <strong>Tu veux recevoir ton code personnel maintenant ?</strong>
                </p>
                
                <blockquote className="border-l-4 border-primary pl-4 py-2 mb-8 inline-block text-left">
                  <p className="mb-2">
                    <span className="text-primary font-bold">💰</span> <strong>Paiement unique : 15.000 FCFA</strong>
                  </p>
                  <p>
                    <span className="text-primary font-bold">🔐</span> <strong>Un seul code, un seul accès, aucune seconde chance</strong>
                  </p>
                </blockquote>
                
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-sm text-muted-foreground">Offre expire dans :</span>
                  <div className="flex items-center gap-1">
                    <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span>:</span>
                    <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span>:</span>
                    <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => window.open('https://wa.me/22954155702', '_blank')}
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all animate-pulse"
                  size="lg"
                >
                  👉 Je paye et je reçois mon code d'accès maintenant
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 13: FAQ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <Card className="border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-8 text-center">🧩 FAQ – Version actualisée</h2>
                
                <div className="space-y-4">
                  <div 
                    className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq1' ? 'bg-card' : 'bg-card/50'}`}
                    onClick={() => toggleFaq('faq1')}
                  >
                    <div className="p-4 cursor-pointer flex justify-between items-center">
                      <p className="font-bold">Est-ce que je peux m'inscrire sans code ?</p>
                      <span>{expandedFaq === 'faq1' ? '−' : '+'}</span>
                    </div>
                    {expandedFaq === 'faq1' && (
                      <div className="p-4 pt-0 border-t border-primary/20">
                        <p className="ml-6"><span className="text-primary">➡️</span> Non. L'accès est 100 % sécurisé. Il faut ton code admin privé.</p>
                        <p className="text-xs text-muted-foreground mt-2 ml-6">Cette offre s'arrête à {formattedTimer}</p>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq2' ? 'bg-card' : 'bg-card/50'}`}
                    onClick={() => toggleFaq('faq2')}
                  >
                    <div className="p-4 cursor-pointer flex justify-between items-center">
                      <p className="font-bold">Quand est-ce que je reçois mon code ?</p>
                      <span>{expandedFaq === 'faq2' ? '−' : '+'}</span>
                    </div>
                    {expandedFaq === 'faq2' && (
                      <div className="p-4 pt-0 border-t border-primary/20">
                        <p className="ml-6"><span className="text-primary">➡️</span> Immédiatement après paiement (sur ta boîte mail ou WhatsApp).</p>
                        <p className="text-xs text-muted-foreground mt-2 ml-6">Cette offre s'arrête à {formattedTimer}</p>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq3' ? 'bg-card' : 'bg-card/50'}`}
                    onClick={() => toggleFaq('faq3')}
                  >
                    <div className="p-4 cursor-pointer flex justify-between items-center">
                      <p className="font-bold">Puis-je partager mon code avec un ami ?</p>
                      <span>{expandedFaq === 'faq3' ? '−' : '+'}</span>
                    </div>
                    {expandedFaq === 'faq3' && (
                      <div className="p-4 pt-0 border-t border-primary/20">
                        <p className="ml-6"><span className="text-primary">➡️</span> Non. Le code est à usage unique. Partage = suppression d'accès.</p>
                        <p className="text-xs text-muted-foreground mt-2 ml-6">Cette offre s'arrête à {formattedTimer}</p>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq4' ? 'bg-card' : 'bg-card/50'}`}
                    onClick={() => toggleFaq('faq4')}
                  >
                    <div className="p-4 cursor-pointer flex justify-between items-center">
                      <p className="font-bold">Et si j'oublie ou je perds mon code ?</p>
                      <span>{expandedFaq === 'faq4' ? '−' : '+'}</span>
                    </div>
                    {expandedFaq === 'faq4' && (
                      <div className="p-4 pt-0 border-t border-primary/20">
                        <p className="ml-6"><span className="text-primary">➡️</span> Contacte-moi rapidement. Tant que personne ne l'a utilisé, je peux te le réinitialiser.</p>
                        <p className="text-xs text-muted-foreground mt-2 ml-6">Cette offre s'arrête à {formattedTimer}</p>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border border-primary/20 rounded-lg overflow-hidden transition-all ${expandedFaq === 'faq5' ? 'bg-card' : 'bg-card/50'}`}
                    onClick={() => toggleFaq('faq5')}
                  >
                    <div className="p-4 cursor-pointer flex justify-between items-center">
                      <p className="font-bold">L'IA, c'est compliqué ?</p>
                      <span>{expandedFaq === 'faq5' ? '−' : '+'}</span>
                    </div>
                    {expandedFaq === 'faq5' && (
                      <div className="p-4 pt-0 border-t border-primary/20">
                        <p className="ml-6"><span className="text-primary">➡️</span> Pas avec ces vidéos. Je te montre tout, étape par étape, comme si t'étais débutant. Pas besoin d'être un geek – juste de suivre les vidéos.</p>
                        <p className="text-xs text-muted-foreground mt-2 ml-6">Cette offre s'arrête à {formattedTimer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* SECTION 14: PS & Contact */}
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
      </div>
      
      {/* Exit Intent Popup */}
      <Dialog open={showExitIntent} onOpenChange={setShowExitIntent}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">🚨 Attends une seconde !</DialogTitle>
            <DialogDescription className="text-center">
              Tu es sur le point de manquer l'opportunité de transformer ton contenu pour toujours
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <p className="text-center font-bold">L'offre expire dans:</p>
            <div className="flex justify-center gap-2">
              <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xl">:</span>
              <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xl">:</span>
              <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
            <Button
              onClick={() => {
                window.open('https://wa.me/22954155702', '_blank');
                setShowExitIntent(false);
              }}
              className="tech-button"
            >
              Je ne veux pas rater cette chance
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowExitIntent(false)}
              className="border-none"
            >
              Non merci, je préfère continuer à galérer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
