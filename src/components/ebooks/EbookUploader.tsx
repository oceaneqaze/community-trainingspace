
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEbooks } from '@/hooks/useEbooks';
import { toast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  category: z.string().optional(),
  file: z.instanceof(File).refine((file) => {
    return file.type === 'application/pdf';
  }, "Seuls les fichiers PDF sont acceptés")
});

const EbookUploader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { uploadEbook } = useEbooks();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await uploadEbook(values);
      setIsOpen(false);
      form.reset();
      toast({
        title: "Document ajouté",
        description: "Le document a été ajouté avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du document.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Ajouter un document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un document</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du document" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description du document (optionnel)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Catégorie (optionnel)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Fichier PDF</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Ajouter
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EbookUploader;
