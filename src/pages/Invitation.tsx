
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Check, AlertTriangle, UserPlus, Eye, EyeOff } from 'lucide-react';

const Invitation = () => {
  const { code } = useParams<{ code: string }>();
  const { isAuthenticated, user } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inviterName, setInviterName] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const validateInvitationCode = async () => {
      if (!code) {
        setIsValidating(false);
        return;
      }

      try {
        console.log("Validating invitation code:", code);
        
        // Check if the invitation code exists and has not been used
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, invitation_used')
          .eq('invitation_code', code)
          .single();

        if (error) {
          console.error('Error validating invitation code:', error);
          throw error;
        }

        console.log("Invitation validation result:", data);

        if (data && !data.invitation_used) {
          setIsValid(true);
          setInviterName(data.name);
        } else {
          console.log("Invalid invitation: already used or not found");
        }
      } catch (error) {
        console.error('Error validating invitation code:', error);
      } finally {
        setIsValidating(false);
      }
    };

    validateInvitationCode();
  }, [code]);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || !formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);

      console.log("Creating account with invitation code:", code);
      
      // Create the user account with the provided password
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { 
            name: formData.name,
            invitation_code: code
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Mark the invitation as used
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ invitation_used: true })
          .eq('invitation_code', code);

        if (updateError) {
          console.error('Error updating invitation:', updateError);
        }

        toast({
          title: "Compte créé avec succès",
          description: "Votre compte a été créé et l'invitation acceptée.",
        });

        // Redirect to videos page
        navigate('/videos');
      }
    } catch (error: any) {
      console.error('Error creating account:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création du compte",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!code || !user) return;

    try {
      setIsProcessing(true);

      console.log("Accepting invitation with code:", code);
      
      // Mark the invitation as used
      const { error } = await supabase
        .from('profiles')
        .update({ invitation_used: true })
        .eq('invitation_code', code);

      if (error) {
        console.error('Error accepting invitation:', error);
        throw error;
      }

      toast({
        title: "Invitation acceptée",
        description: "Vous avez accepté l'invitation avec succès.",
      });

      navigate('/videos');
    } catch (error: any) {
      console.error('Error accepting invitation:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'acceptation de l'invitation",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isValidating) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-semibold">Validation de l'invitation...</h2>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
        <h2 className="text-3xl font-bold mb-4">Invitation invalide</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Ce lien d'invitation n'est pas valide ou a déjà été utilisé.
        </p>
        <Button onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
      <div className="bg-secondary/20 p-8 rounded-lg w-full shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold mb-2">Invitation valide</h2>
        
        {inviterName && (
          <p className="text-lg mb-6 text-muted-foreground">
            {inviterName} vous a invité à rejoindre la plateforme.
          </p>
        )}
        
        {isAuthenticated ? (
          <>
            <p className="text-muted-foreground mb-6">
              Vous êtes connecté et prêt à accepter cette invitation.
            </p>
            <Button 
              onClick={handleAcceptInvitation}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                'Accepter l\'invitation'
              )}
            </Button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              Créez votre compte pour rejoindre la plateforme.
            </p>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="text-left">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Votre nom"
                  required
                  className="mt-1"
                />
              </div>
              <div className="text-left">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="votre@email.com"
                  required
                  className="mt-1"
                />
              </div>
              <div className="text-left">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Votre mot de passe"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-left">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirmer votre mot de passe"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <Button 
                type="submit"
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Créer mon compte
                  </>
                )}
              </Button>
            </form>
            <div className="text-sm mt-4">
              <span className="text-muted-foreground">Vous avez déjà un compte?</span>{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/signin')}>
                Se connecter
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Invitation;
