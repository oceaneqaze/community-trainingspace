
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Copy, Check, Loader2 } from 'lucide-react';

type InvitationSystemProps = {
  member: {
    id: string;
    name: string;
    email?: string;
  };
  onInvitationSent: () => void;
};

const InvitationSystem: React.FC<InvitationSystemProps> = ({ member, onInvitationSent }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invitationLink, setInvitationLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const generateInvitationLink = async () => {
    try {
      setIsGenerating(true);
      
      // Call the Supabase function to generate a new invitation code
      const { data, error } = await supabase
        .rpc('generate_invitation_code', { user_id: member.id });
      
      if (error) throw error;
      
      // Create the full invitation link
      const baseUrl = window.location.origin;
      const inviteLink = `${baseUrl}/invitation/${data}`;
      
      setInvitationLink(inviteLink);
      onInvitationSent();
      
      toast({
        title: "Lien d'invitation généré",
        description: "Le lien d'invitation a été généré avec succès.",
      });
    } catch (error: any) {
      console.error('Error generating invitation link:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de générer le lien d'invitation",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink);
    setIsCopied(true);
    
    toast({
      title: "Lien copié",
      description: "Le lien d'invitation a été copié dans le presse-papier.",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendEmail = () => {
    // In a real application, this would call an API endpoint to send the email
    // For now, we'll just open the user's email client
    const subject = encodeURIComponent("Votre invitation à Dope Content");
    const body = encodeURIComponent(
      `${customMessage || "Vous avez été invité à rejoindre notre plateforme."}\n\nVoici votre lien d'invitation: ${invitationLink}`
    );
    
    window.open(`mailto:${member.email}?subject=${subject}&body=${body}`);
    
    toast({
      title: "Email préparé",
      description: "L'email avec le lien d'invitation a été préparé.",
    });
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center"
        onClick={() => setIsDialogOpen(true)}
      >
        <Mail className="mr-1 h-4 w-4" />
        Inviter
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Inviter {member.name}</DialogTitle>
            <DialogDescription>
              Générez un lien d'invitation unique pour cet utilisateur
            </DialogDescription>
          </DialogHeader>
          
          {!invitationLink ? (
            <div className="space-y-4 py-4">
              <p>
                Cliquez sur le bouton ci-dessous pour générer un lien d'invitation unique pour {member.name}.
              </p>
              <Textarea
                placeholder="Message personnalisé (optionnel)"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="min-h-[100px]"
              />
              <Button 
                onClick={generateInvitationLink} 
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération...
                  </>
                ) : (
                  'Générer un lien d\'invitation'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Input
                  value={invitationLink}
                  readOnly
                  className="flex-1"
                />
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {member.email && (
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={handleSendEmail}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer par email
                </Button>
              )}
            </div>
          )}
          
          <DialogFooter className="sm:justify-end">
            <Button 
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvitationSystem;
