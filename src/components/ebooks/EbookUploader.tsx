
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
import { motion } from 'framer-motion';

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  category: z.string().optional(),
  file: z.instanceof(File).refine((file) => {
    return file.type === 'application/pdf';
  }, "Seuls les fichiers PDF sont acceptés")
});

type FormValues = z.infer<typeof formSchema>;

const EbookUploader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { uploadEbook } = useEbooks();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Explicitly ensure file is defined (it will be because of zod validation)
      if (!values.file) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un fichier PDF.",
          variant: "destructive",
        });
        return;
      }
      
      await uploadEbook({
        title: values.title,
        description: values.description,
        category: values.category,
        file: values.file
      });
      
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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="rounded-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white hover:bg-zinc-800 dark:hover:bg-zinc-100">
            <Upload className="h-4 w-4 mr-2" />
            Ajouter un document
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-0 rounded-2xl shadow-xl">
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
                    <Input 
                      placeholder="Nom du document" 
                      className="rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm" 
                      {...field} 
                    />
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
                      className="rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm"
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
                      className="rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm"
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
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Fichier PDF</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      className="rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="rounded-full"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="rounded-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
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
