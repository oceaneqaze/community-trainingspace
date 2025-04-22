
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Article, useArticles } from '@/hooks/useArticles';
import ArticleForm from '@/components/blog/ArticleForm';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BlogManager: React.FC = () => {
  const { isAuthenticated, isAdmin, profile } = useAuth();
  const navigate = useNavigate();
  const { createArticle, isLoading } = useArticles();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin()) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleCreateArticle = async (articleData: Partial<Article>) => {
    if (!profile?.id) return;
    
    try {
      await createArticle({
        ...articleData,
        author_id: profile.id,
        title: articleData.title!,
        content: articleData.content!,
        slug: articleData.slug!,
        published: articleData.published || false,
        featured_image: articleData.featured_image
      });
      
      toast({
        title: "Article créé avec succès",
        description: "Votre article a été enregistré"
      });
      
      navigate('/blog');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'article",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouvel article</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleForm 
            onSubmit={handleCreateArticle}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManager;
