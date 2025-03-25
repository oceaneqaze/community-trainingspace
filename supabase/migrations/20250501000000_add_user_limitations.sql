
-- Ajout des colonnes pour la gestion des bannissements et limitations
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS banned boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS limited boolean DEFAULT false;

-- Mettre à jour la documentation
COMMENT ON COLUMN public.profiles.banned IS 'Indique si l''utilisateur est banni de la plateforme';
COMMENT ON COLUMN public.profiles.limited IS 'Indique si l''utilisateur a des restrictions d''accès';
