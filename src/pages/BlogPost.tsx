
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Article } from '@/hooks/useArticles';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Helmet } from 'react-helmet';
import { useArticleView } from '@/hooks/useArticleView';
import { useArticleLike } from '@/hooks/useArticleLike';
import { Heart, Eye, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArticleComments from '@/components/blog/ArticleComments';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (error) {
        navigate('/blog');
        return null;
      }
      return data as Article;
    }
  });

  const { viewCount } = useArticleView(article?.id || '');
  const { likesCount, isLiked, toggleLike, isAuthenticated } = useArticleLike(article?.id || '');

  if (isLoading) {
    return <div className="container mx-auto py-8">Chargement de l'article...</div>;
  }

  if (!article) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{article.seo_title || article.title}</title>
        <meta name="description" content={article.seo_description || article.excerpt || ''} />
        {article.seo_keywords && <meta name="keywords" content={article.seo_keywords} />}
      </Helmet>

      <article className="container mx-auto py-8 max-w-4xl">
        {article.featured_image && (
          <div className="aspect-video mb-8 overflow-hidden rounded-lg">
            <img 
              src={article.featured_image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            Publié {formatDistance(new Date(article.created_at), new Date(), {
              addSuffix: true,
              locale: fr
            })}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-1">
              <Eye size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{viewCount}</span>
            </div>
            
            <Button
              variant={isLiked ? "secondary" : "ghost"}
              size="sm"
              className="flex items-center gap-1"
              onClick={toggleLike}
              disabled={!isAuthenticated}
            >
              <Heart size={18} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
              <span>{likesCount}</span>
            </Button>
          </div>
        </div>

        {article.excerpt && (
          <p className="text-lg text-muted-foreground mb-8">
            {article.excerpt}
          </p>
        )}

        <div className="prose prose-lg max-w-none mb-12">
          {/* Rendu du contenu HTML */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="border-t py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Retour aux articles
          </Button>
        </div>
        
        {/* Section des commentaires */}
        <ArticleComments articleId={article.id} />
      </article>
    </>
  );
};

export default BlogPost;
