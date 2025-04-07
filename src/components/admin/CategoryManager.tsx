
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface CategoryManagerProps {
  onCategoryChange: () => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Charger les catégories existantes
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('category')
          .not('category', 'is', null);
          
        if (error) throw error;
        
        // Extraire les catégories uniques
        const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
        setCategories(uniqueCategories.filter(Boolean) as string[]);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  // Ajouter une nouvelle catégorie
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    if (categories.includes(newCategory.trim())) {
      toast({
        title: "Erreur",
        description: "Cette catégorie existe déjà",
        variant: "destructive",
      });
      return;
    }
    
    setCategories([...categories, newCategory.trim()]);
    setNewCategory('');
    onCategoryChange();
  };

  // Supprimer une catégorie
  const handleRemoveCategory = async (categoryToRemove: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryToRemove}" ? 
    Les vidéos associées seront classées dans "Sans catégorie".`)) return;
    
    setIsLoading(true);
    try {
      // Mettre à jour toutes les vidéos qui ont cette catégorie
      const { error } = await supabase
        .from('videos')
        .update({ category: 'Sans catégorie' })
        .eq('category', categoryToRemove);
        
      if (error) throw error;
      
      setCategories(categories.filter(cat => cat !== categoryToRemove));
      toast({
        title: "Catégorie supprimée",
        description: `La catégorie "${categoryToRemove}" a été supprimée avec succès.`,
      });
      onCategoryChange();
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Gestion des catégories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nouvelle catégorie..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button 
              onClick={handleAddCategory} 
              disabled={!newCategory.trim() || isLoading}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            {categories.length > 0 ? (
              <table className="min-w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="py-2 px-4 text-left">Catégorie</th>
                    <th className="py-2 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index} className={index % 2 ? 'bg-muted/50' : ''}>
                      <td className="py-2 px-4">{category}</td>
                      <td className="py-2 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveCategory(category)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-gray-500">
                {isLoading ? 'Chargement des catégories...' : 'Aucune catégorie disponible'}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManager;
