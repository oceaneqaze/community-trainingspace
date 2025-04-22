
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Article } from '@/hooks/useArticles';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

const Blog = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['published-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Article[];
    }
  });

  if (isLoading) {
    return <div className="container mx-auto py-8">Chargement des articles...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <Card key={article.id} className="overflow-hidden">
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
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {article.excerpt || article.content.substring(0, 150) + '...'}
              </p>
              <a 
                href={`/blog/${article.slug}`} 
                className="inline-block mt-4 text-primary hover:underline"
              >
                Lire la suite →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
