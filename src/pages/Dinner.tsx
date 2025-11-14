import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, ChevronUp, Home, Minus, Plus, Printer, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";
import { useRecipes } from "@/hooks/use-recipes";

const recipes = [
  {
    id: "spaghetti-bolognese",
    title: "Spaghetti Bolognese",
    description: "Classic Italian pasta with rich meat sauce",
    image: "https://images.unsplash.com/photo-1627662235158-e9628c1ce5e3?w=800&q=80",
    prepTime: 45,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "spaghetti", amount: 400, unit: "g" },
      { name: "ground beef", amount: 500, unit: "g" },
      { name: "onion", amount: 1, unit: "" },
      { name: "garlic cloves", amount: 3, unit: "" },
      { name: "crushed tomatoes", amount: 800, unit: "g" },
      { name: "tomato paste", amount: 2, unit: "tbsp" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "parmesan cheese", amount: 50, unit: "g" }
    ],
    steps: [
      "Chop onion and garlic, sauté in olive oil",
      "Add ground beef and cook until browned",
      "Add tomato paste and crushed tomatoes",
      "Simmer for 30 minutes",
      "Cook spaghetti according to package instructions",
      "Serve with parmesan cheese"
    ]
  },
  {
    id: "roasted-chicken",
    title: "Roasted Chicken",
    description: "Herb-roasted whole chicken with vegetables",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
    prepTime: 90,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "whole chicken", amount: 1.5, unit: "kg" },
      { name: "potatoes", amount: 600, unit: "g" },
      { name: "carrots", amount: 400, unit: "g" },
      { name: "onion", amount: 2, unit: "" },
      { name: "garlic", amount: 1, unit: "head" },
      { name: "fresh herbs", amount: 30, unit: "g" },
      { name: "olive oil", amount: 4, unit: "tbsp" }
    ],
    steps: [
      "Preheat oven to 200°C",
      "Season chicken with herbs, salt, and pepper",
      "Chop vegetables into chunks",
      "Place chicken and vegetables in roasting pan",
      "Drizzle with olive oil",
      "Roast for 75-90 minutes until golden"
    ]
  },
  {
    id: "vegetable-curry",
    title: "Vegetable Curry",
    description: "Aromatic vegetable curry with coconut milk",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    prepTime: 40,
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "mixed vegetables", amount: 800, unit: "g" },
      { name: "coconut milk", amount: 400, unit: "ml" },
      { name: "curry paste", amount: 3, unit: "tbsp" },
      { name: "onion", amount: 1, unit: "" },
      { name: "garlic cloves", amount: 3, unit: "" },
      { name: "ginger", amount: 20, unit: "g" },
      { name: "rice", amount: 300, unit: "g" }
    ],
    steps: [
      "Cook rice according to package instructions",
      "Sauté onion, garlic, and ginger",
      "Add curry paste and cook for 1 minute",
      "Add vegetables and coconut milk",
      "Simmer for 20 minutes",
      "Serve over rice"
    ]
  }
];

const Dinner = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const [servings, setServings] = useState(4);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { getRecipesByCategory } = useRecipes();
  
  const userRecipes = getRecipesByCategory('dinner');
  const allRecipes = [...recipes, ...userRecipes];

  const handleCardClick = (recipe: typeof recipes[0]) => {
    setSelectedRecipe(recipe);
    setServings(recipe.baseServings);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFavoriteClick = (e: React.MouseEvent, recipe: typeof recipes[0]) => {
    e.stopPropagation();
    toggleFavorite({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      category: 'dinner'
    });
  };

  const scaleIngredient = (amount: number, baseServings: number) => {
    return (amount * servings) / baseServings;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl md:text-4xl font-aharoni font-bold cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#904E55' }}>
              Chappies voor Wappies
            </h1>
          </Link>
          <Link to="/">
            <Button variant="outline" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-aharoni font-bold mb-8" style={{ color: '#904E55' }}>
          Dinner Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {allRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCardClick(recipe)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="font-aharoni text-2xl" style={{ color: '#904E55' }}>
                      {recipe.title}
                    </CardTitle>
                    <CardDescription className="text-base flex items-center gap-2 mt-2">
                      <span>{recipe.prepTime}</span>
                      {recipe.isVegan && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Vegan</span>}
                      {recipe.isVegetarian && !recipe.isVegan && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Vegetarian</span>}
                    </CardDescription>
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
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="font-aharoni text-3xl" style={{ color: '#904E55' }}>
                {selectedRecipe?.title}
              </DialogTitle>
              <Button variant="outline" size="icon" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-muted-foreground">{selectedRecipe?.prepTime}</span>
              {selectedRecipe?.isVegan && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Vegan</span>}
              {selectedRecipe?.isVegetarian && !selectedRecipe?.isVegan && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Vegetarian</span>}
            </div>
          </DialogHeader>

          {selectedRecipe && (
            <div className="space-y-6">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">Servings:</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium w-12 text-center">{servings}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setServings(servings + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Ingredients:</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        <span>
                          {scaleIngredient(ingredient.amount, selectedRecipe.baseServings).toFixed(1)} {ingredient.unit} {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Steps:</h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index} className="text-foreground/90">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dinner;
