
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, BarChart3, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 47
  });
  
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
            
            {/* BLOC 1: URGENCE & COMPTE À REBOURS */}
            <Card className="mb-10 border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">🕒 URGENCE & COMPTE À REBOURS</h2>
                
                <div className="mb-4 text-lg sm:text-xl font-bold">
                  ⏱️ Offre spéciale DOPE CONTENT expire dans: 
                  <div className="flex justify-center gap-2 mt-2">
                    <span className="bg-primary/90 text-white px-3 py-1 rounded-md">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-xl">:</span>
                    <span className="bg-primary/90 text-white px-3 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-xl">:</span>
                    <span className="bg-primary/90 text-white px-3 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>
                
                <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4">
                  <p className="mb-2"><span className="text-primary font-bold">💥</span> <strong>Prix actuel : 15.000 FCFA – paiement unique</strong></p>
                  <p className="mb-2"><span className="text-primary font-bold">🔒</span> <strong>Accès sécurisé via code admin UNIQUE (1 seul accès par personne)</strong></p>
                  <p className="mb-2"><span className="text-primary font-bold">🎁</span> <strong>Bonus offerts aux 100 premiers uniquement</strong></p>
                  <p><span className="text-primary font-bold">🚫</span> Après ? Le prix monte et les bonus disparaissent.</p>
                </blockquote>
                
                <p className="mb-2">Dès que tu payes, tu reçois un <strong>code confidentiel d'accès</strong>.</p>
                <p className="mb-2">Ce code est <strong>unique, valable une seule fois</strong>.</p>
                <p className="mb-2">C'est lui qui débloque <strong>l'inscription à la plateforme</strong>.</p>
                <p className="mb-4"><strong>Pas de double usage. Pas de partage. Pas de triche.</strong></p>
                
                <p className="font-bold">Tu veux cette clé ? Bouge avant que le timer ne tombe.</p>
              </CardContent>
            </Card>
            
            {/* HEADLINE */}
            <Card className="mb-10 border-primary/30 bg-card/80 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">💥 HEADLINE</h2>
                <p className="text-lg sm:text-xl font-bold mb-2">
                  <strong>Clone-toi avec l'IA. Crée du contenu non-stop. Deviens inarrêtable.</strong>
                </p>
                <p className="text-lg">
                  Et accède à la plateforme <strong>grâce à un seul code unique réservé aux membres.</strong>
                </p>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
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
                src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png" 
                alt="DOPE CONTENT Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* IDENTIFICATION section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">🧠 IDENTIFICATION</h2>
              
              <p className="text-lg mb-4">
                Tu veux publier tous les jours, être visible, dominer ta niche…<br/>
                Mais t'as :
              </p>
              <ul className="list-none space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="mr-2 text-red-500">•</span>
                  <span>Pas d'idées</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-red-500">•</span>
                  <span>Pas de temps</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-red-500">•</span>
                  <span>Pas de méthode</span>
                </li>
              </ul>
              
              <p className="font-bold text-lg mb-4">
                <strong>Et surtout : aucune solution simple pour créer sans y passer ta vie.</strong>
              </p>
              
              <p className="mb-4">
                DOPE CONTENT te donne cette solution.<br/>
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
      
      {/* ACCÈS UNIQUEMENT PAR CODE section */}
      <section className="py-12 sm:py-16 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">🔑 ACCÈS UNIQUEMENT PAR CODE</h2>
              
              <ul className="list-none space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="mr-2 text-red-500 mt-1">🛑</span>
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
                  <span className="text-red-500 font-bold">🚫</span> Partager ton code = blocage définitif.
                </p>
                <p>
                  <span className="text-primary font-bold">💎</span> Chaque membre est <strong>vérifié</strong>.
                </p>
              </blockquote>
              
              <p className="text-lg">
                C'est pas juste une formation. C'est une <strong>salle secrète réservée aux créateurs sérieux</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CE QUE TU VAS RECEVOIR section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">📹 CE QUE TU VAS RECEVOIR (et personne d'autre)</h2>
              
              <ul className="list-none space-y-3 mb-6">
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
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* PRIX section */}
      <section className="py-12 sm:py-16 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">💸 PRIX</h2>
              
              <h3 className="text-xl font-bold mb-4">🔐 Paiement unique : <span className="text-primary text-2xl">15.000 FCFA</span></h3>
              
              <ul className="list-none space-y-2 mb-6">
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
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* BONUS section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                🎁 BONUS SI TU AGIS AVANT <span className="bg-primary/90 text-white px-3 py-1 rounded-md">
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </h2>
              
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
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* ATTENTION section */}
      <section className="py-12 sm:py-16 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Card className="border-primary/30 bg-card/80 shadow-lg border-red-400/50">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-6">🚨 ATTENTION</h2>
              
              <blockquote className="border-l-4 border-red-500 pl-4 py-2 mb-6">
                <p className="mb-2">
                  <span className="text-red-500 font-bold">❌</span> Si tu perds ton code → tu perds l'accès
                </p>
                <p className="mb-2">
                  <span className="text-red-500 font-bold">❌</span> Si quelqu'un d'autre l'utilise avant toi → il sera désactivé
                </p>
                <p>
                  <span className="text-green-500 font-bold">✅</span> Dès ton paiement, tu es prioritaire → ton code est réservé immédiatement
                </p>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* EN RÉSUMÉ section */}
      <section className="py-12 sm:py-16">
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
      
      {/* CTA FINAL section */}
      <section className="py-12 sm:py-16 bg-primary/10">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Card className="border-primary shadow-lg bg-card">
            <CardContent className="p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">🚀 CTA FINAL</h2>
              
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
      
      {/* FAQ section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-8 text-center">🧩 FAQ – Version actualisée</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="font-bold mb-2">Q : Est-ce que je peux m'inscrire sans code ?</p>
                  <p className="ml-6"><span className="text-primary">➡️</span> Non. L'accès est 100 % sécurisé. Il faut ton code admin privé.</p>
                </div>
                
                <div>
                  <p className="font-bold mb-2">Q : Quand est-ce que je reçois mon code ?</p>
                  <p className="ml-6"><span className="text-primary">➡️</span> Immédiatement après paiement (sur ta boîte mail ou WhatsApp).</p>
                </div>
                
                <div>
                  <p className="font-bold mb-2">Q : Puis-je partager mon code avec un ami ?</p>
                  <p className="ml-6"><span className="text-primary">➡️</span> Non. Le code est à usage unique. Partage = suppression d'accès.</p>
                </div>
                
                <div>
                  <p className="font-bold mb-2">Q : Et si j'oublie ou je perds mon code ?</p>
                  <p className="ml-6"><span className="text-primary">➡️</span> Contacte-moi rapidement. Tant que personne ne l'a utilisé, je peux te le réinitialiser.</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
