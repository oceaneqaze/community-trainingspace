
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import BlogEditor from './BlogEditor';
import { useFileUpload } from '@/hooks/useFileUpload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Article } from '@/hooks/useArticles';

interface ArticleFormProps {
  onSubmit: (data: Partial<Article>) => void;
  initialData?: Partial<Article>;
  isLoading?: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const form = useForm<Partial<Article>>({
    defaultValues: initialData || {
      title: '',
      content: '',
      excerpt: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      published: false,
      featured_image: ''
    }
  });

  const { uploadFile, status } = useFileUpload();

  const handleSubmit = async (data: Partial<Article>) => {
    const slug = data.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    onSubmit({ ...data, slug });
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadFile(file, 'blog-images', 'articles/');
      if (imageUrl) {
        form.setValue('featured_image', imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Titre de l'article" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <BlogEditor 
                  content={field.value || ''} 
                  onContentChange={(content) => field.onChange(content)}
                  onImageUpload={(file, previewUrl) => handleImageUpload(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extrait</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Bref résumé de l'article" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
          <h3 className="font-semibold">SEO</h3>
          
          <FormField
            control={form.control}
            name="seo_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre SEO</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Titre optimisé pour les moteurs de recherche" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seo_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description SEO</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description pour les moteurs de recherche" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seo_keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mots-clés SEO</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Mots-clés séparés par des virgules" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <input 
                  type="checkbox" 
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Publier l'article</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading || status.isLoading}>
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </form>
    </Form>
  );
};

export default ArticleForm;
