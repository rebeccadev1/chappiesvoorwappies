import { useState, useEffect } from 'react';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  category: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recipe-favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === recipe.id);
      const newFavorites = isFavorite
        ? prev.filter(fav => fav.id !== recipe.id)
        : [...prev, recipe];
      
      localStorage.setItem('recipe-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  return { favorites, toggleFavorite, isFavorite };
};
