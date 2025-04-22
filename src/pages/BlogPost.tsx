
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Article } from '@/hooks/useArticles';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Helmet } from 'react-helmet';

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
        
        <div className="mb-8 text-muted-foreground">
          Publié {formatDistance(new Date(article.created_at), new Date(), {
            addSuffix: true,
            locale: fr
          })}
        </div>

        {article.excerpt && (
          <p className="text-lg text-muted-foreground mb-8">
            {article.excerpt}
          </p>
        )}

        <div className="prose prose-lg max-w-none">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8">
          <a 
            href="/blog" 
            className="text-primary hover:underline"
          >
            ← Retour aux articles
          </a>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
