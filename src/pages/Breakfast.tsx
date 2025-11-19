import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Home, Minus, Plus, Clock, Leaf, Printer, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";
import { useRecipes, Ingredient, Recipe } from "@/hooks/use-recipes";

const breakfastRecipes: Recipe[] = [
  {
    id: "1",
    title: "x Classic Pancakes",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
    description: "Fluffy homemade pancakes perfect for a weekend morning",
    prepTime: 20,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    category: 'breakfast',
    ingredients: [
      { name: "All-purpose flour", amount: 2, unit: "cups" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Baking powder", amount: 2, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Eggs", amount: 2, unit: "pcs" },
      { name: "Milk", amount: 1.5, unit: "cups" },
      { name: "Melted butter", amount: 3, unit: "tbsp" }
    ],
    steps: [
      "Mix flour, sugar, baking powder, and salt in a bowl",
      "In another bowl, whisk eggs, milk, and melted butter",
      "Combine wet and dry ingredients until just mixed",
      "Heat a griddle and pour 1/4 cup batter for each pancake",
      "Cook until bubbles form, then flip and cook until golden",
      "Serve warm with maple syrup and fresh berries"
    ]
  },
  {
    id: "2",
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
    description: "Simple yet delicious avocado toast with a twist",
    prepTime: 10,
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    category: 'breakfast',
    ingredients: [
      { name: "Bread slices", amount: 4, unit: "slices" },
      { name: "Ripe avocados", amount: 2, unit: "pcs" },
      { name: "Lemon juice", amount: 2, unit: "tbsp" },
      { name: "Cherry tomatoes", amount: 8, unit: "pcs" },
      { name: "Olive oil", amount: 2, unit: "tbsp" },
      { name: "Red pepper flakes", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Toast your favorite bread until golden and crispy",
      "Mash ripe avocado with lemon juice, salt, and pepper",
      "Spread avocado generously on toast",
      "Top with cherry tomatoes, red pepper flakes",
      "Drizzle with olive oil",
      "Optional: add a poached egg on top"
    ]
  },
  {
    id: "3",
    title: "Berry Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    description: "Refreshing and nutritious smoothie bowl",
    prepTime: 5,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    category: 'breakfast',
    ingredients: [
      { name: "Frozen mixed berries", amount: 4, unit: "cups" },
      { name: "Banana", amount: 2, unit: "pcs" },
      { name: "Greek yogurt", amount: 2, unit: "cups" },
      { name: "Granola", amount: 1, unit: "cup" },
      { name: "Fresh berries", amount: 1, unit: "cup" },
      { name: "Coconut flakes", amount: 0.5, unit: "cup" },
      { name: "Chia seeds", amount: 4, unit: "tbsp" },
      { name: "Honey", amount: 4, unit: "tbsp" }
    ],
    steps: [
      "Blend frozen berries, banana, and yogurt until smooth",
      "Pour into a bowl",
      "Top with granola, fresh berries, and coconut flakes",
      "Add chia seeds and honey",
      "Enjoy immediately while cold"
    ]
  },
  {
    id: "4",
    title: "American Pancakes",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80",
    description: "Thick and fluffy American-style pancakes",
    prepTime: 25,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    category: 'breakfast',
    ingredients: [
      { name: "All-purpose flour", amount: 2, unit: "cups" },
      { name: "White sugar", amount: 3, unit: "tbsp" },
      { name: "Baking powder", amount: 3, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Baking soda", amount: 0.5, unit: "tsp" },
      { name: "Buttermilk", amount: 1.75, unit: "cups" },
      { name: "Eggs", amount: 2, unit: "pcs" },
      { name: "Melted butter", amount: 4, unit: "tbsp" },
      { name: "Vanilla extract", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Whisk together flour, sugar, baking powder, salt, and baking soda",
      "In a separate bowl, beat eggs and mix with buttermilk, melted butter, and vanilla",
      "Pour wet ingredients into dry ingredients and mix until just combined (lumps are okay)",
      "Let batter rest for 5 minutes",
      "Heat a griddle or pan over medium heat and grease lightly",
      "Pour 1/4 cup batter for each pancake",
      "Cook until bubbles appear on surface and edges look set, about 2-3 minutes",
      "Flip and cook until golden brown, about 2 minutes more",
      "Serve hot with butter, maple syrup, and fresh berries"
    ]
  },
  {
    id: "5",
    title: "Turkish Eggs (Çılbır)",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
    description: "Poached eggs on garlicky yogurt with spiced butter",
    prepTime: 15,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    category: 'breakfast',
    ingredients: [
      { name: "Greek yogurt", amount: 2, unit: "cups" },
      { name: "Garlic cloves, minced", amount: 2, unit: "pcs" },
      { name: "Fresh eggs", amount: 8, unit: "pcs" },
      { name: "White vinegar", amount: 2, unit: "tbsp" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Paprika", amount: 2, unit: "tsp" },
      { name: "Aleppo pepper or red pepper flakes", amount: 1, unit: "tsp" },
      { name: "Fresh dill", amount: 4, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Mix Greek yogurt with minced garlic and salt, let sit at room temperature",
      "Bring a pot of water to a gentle simmer and add vinegar",
      "Crack eggs one at a time into a small cup",
      "Create a gentle whirlpool in the water and slide eggs in carefully",
      "Poach eggs for 3-4 minutes until whites are set but yolks are runny",
      "Meanwhile, melt butter in a small pan and add paprika and Aleppo pepper",
      "Spread garlicky yogurt on serving plates",
      "Remove poached eggs with a slotted spoon and place on yogurt",
      "Drizzle spiced butter over eggs",
      "Garnish with fresh dill and serve immediately with crusty bread"
    ]
  }
];

const Breakfast = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { getRecipesByCategory } = useRecipes();
  
  const userRecipes = getRecipesByCategory('breakfast');
  const allRecipes = [...breakfastRecipes, ...userRecipes];

  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setServings(recipe.baseServings);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  const adjustServings = (delta: number) => {
    setServings(Math.max(1, servings + delta));
  };

  const getScaledAmount = (ingredient: Ingredient) => {
    if (!selectedRecipe) return ingredient.amount;
    const scale = servings / selectedRecipe.baseServings;
    const scaled = ingredient.amount * scale;
    return Math.round(scaled * 100) / 100;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFavoriteClick = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    toggleFavorite({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      category: 'breakfast'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <h1 className="text-4xl md:text-5xl font-aharoni font-bold cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#904E55' }}>
                Chappies voor Wappies
              </h1>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-aharoni font-bold mb-8 text-center" style={{ color: '#904E55' }}>
          Breakfast Recipes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {allRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleOpenRecipe(recipe)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="font-aharoni text-xl" style={{ color: '#904E55' }}>
                      {recipe.title}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleFavoriteClick(e, recipe)}
                    className="shrink-0"
                  >
                    <Heart
                      className={`h-5 w-5 ${isFavorite(recipe.id) ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </Button>
                </div>
                <CardDescription>{recipe.description}</CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.prepTime} min
                  </span>
                  {recipe.isVegan && (
                    <span className="flex items-center gap-1 text-primary">
                      <Leaf className="h-4 w-4" />
                      Vegan
                    </span>
                  )}
                  {!recipe.isVegan && recipe.isVegetarian && (
                    <span className="flex items-center gap-1 text-primary">
                      <Leaf className="h-4 w-4" />
                      Vegetarian
                    </span>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={!!selectedRecipe} onOpenChange={handleCloseRecipe}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <DialogTitle className="font-aharoni text-3xl" style={{ color: '#904E55' }}>
                    {selectedRecipe.title}
                  </DialogTitle>
                  <Button variant="outline" size="icon" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {selectedRecipe.prepTime} min
                    </span>
                    {selectedRecipe.isVegan && (
                      <span className="flex items-center gap-1 text-primary">
                        <Leaf className="h-4 w-4" />
                        Vegan
                      </span>
                    )}
                    {!selectedRecipe.isVegan && selectedRecipe.isVegetarian && (
                      <span className="flex items-center gap-1 text-primary">
                        <Leaf className="h-4 w-4" />
                        Vegetarian
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Servings:</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => adjustServings(-1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-8 text-center">{servings}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => adjustServings(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-aharoni font-bold text-xl mb-3" style={{ color: '#904E55' }}>
                    Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-foreground">
                        <span className="font-medium">{getScaledAmount(ingredient)}</span>{" "}
                        <span className="text-muted-foreground">{ingredient.unit}</span>{" "}
                        {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-aharoni font-bold text-xl mb-3" style={{ color: '#904E55' }}>
                    Steps
                  </h3>
                  <ol className="space-y-3">
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index} className="text-foreground">
                        <span className="font-semibold text-primary">{index + 1}.</span> {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Breakfast;
