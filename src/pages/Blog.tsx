
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Article } from '@/hooks/useArticles';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Eye, Heart, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleWithCounts extends Article {
  view_count: number;
  like_count: number;
  comment_count: number;
}

// Fonction pour nettoyer le HTML et extraire le texte brut
const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const Blog = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['published-articles-with-counts'],
    queryFn: async () => {
      // Récupérer les articles publiés avec leurs compteurs
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          view_count:article_views(count),
          like_count:article_likes(count),
          comment_count:article_comments(count)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Transformer les données pour extraire les compteurs
      return data.map(article => ({
        ...article,
        view_count: article.view_count?.length ? article.view_count[0].count : 0,
        like_count: article.like_count?.length ? article.like_count[0].count : 0,
        comment_count: article.comment_count?.length ? article.comment_count[0].count : 0,
      })) as ArticleWithCounts[];
    }
  });

  // Préparer l'extrait du contenu en supprimant le HTML
  const prepareExcerpt = (article: ArticleWithCounts): string => {
    if (article.excerpt) {
      return stripHtml(article.excerpt);
    } else {
      const cleanContent = stripHtml(article.content);
      return cleanContent.length > 150 ? cleanContent.substring(0, 150) + '...' : cleanContent;
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8">Chargement des articles...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <Card key={article.id} className="overflow-hidden flex flex-col">
            {article.featured_image && (
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.featured_image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {formatDistance(new Date(article.created_at), new Date(), {
                  addSuffix: true,
                  locale: fr
                })}
              </p>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {prepareExcerpt(article)}
              </p>
              
              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span className="text-sm">{article.view_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    <span className="text-sm">{article.like_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={16} />
                    <span className="text-sm">{article.comment_count}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/blog/${article.slug}`}
                  className="text-primary hover:underline"
                >
                  Lire la suite →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
