import { useState, useEffect } from 'react';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  prepTime: number;
  isVegan: boolean;
  isVegetarian: boolean;
  baseServings: number;
  ingredients: Ingredient[];
  steps: string[];
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snacks';
}

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('userRecipes');
    if (stored) {
      setRecipes(JSON.parse(stored));
    }
  }, []);

  const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
    };
    const updated = [...recipes, newRecipe];
    setRecipes(updated);
    localStorage.setItem('userRecipes', JSON.stringify(updated));
  };

  const deleteRecipe = (id: string) => {
    const updated = recipes.filter(r => r.id !== id);
    setRecipes(updated);
    localStorage.setItem('userRecipes', JSON.stringify(updated));
  };

  const getRecipesByCategory = (category: string) => {
    return recipes.filter(r => r.category === category);
  };

  return { recipes, addRecipe, deleteRecipe, getRecipesByCategory };
};
