import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, ChevronUp, Home, Minus, Plus, Printer, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";

const recipes = [
  {
    id: "club-sandwich",
    title: "Club Sandwich",
    description: "Triple-decker sandwich with turkey, bacon, and fresh vegetables",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    prepTime: "15 min",
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread slices", amount: 6, unit: "" },
      { name: "turkey breast", amount: 200, unit: "g" },
      { name: "bacon strips", amount: 6, unit: "" },
      { name: "lettuce leaves", amount: 4, unit: "" },
      { name: "tomato", amount: 1, unit: "" },
      { name: "mayonnaise", amount: 3, unit: "tbsp" }
    ],
    steps: [
      "Toast the bread slices until golden brown",
      "Cook bacon until crispy",
      "Layer turkey, bacon, lettuce, and tomato between bread slices",
      "Spread mayonnaise on each layer",
      "Secure with toothpicks and cut diagonally"
    ]
  },
  {
    id: "caesar-salad",
    title: "Caesar Salad",
    description: "Classic Caesar salad with crispy croutons and parmesan",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80",
    prepTime: "10 min",
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "romaine lettuce", amount: 2, unit: "heads" },
      { name: "parmesan cheese", amount: 100, unit: "g" },
      { name: "croutons", amount: 150, unit: "g" },
      { name: "Caesar dressing", amount: 120, unit: "ml" },
      { name: "lemon", amount: 1, unit: "" }
    ],
    steps: [
      "Wash and chop romaine lettuce",
      "Add croutons and shaved parmesan",
      "Drizzle with Caesar dressing",
      "Toss well and add lemon juice",
      "Serve immediately"
    ]
  },
  {
    id: "tomato-soup",
    title: "Tomato Soup",
    description: "Creamy tomato soup with fresh basil",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    prepTime: "30 min",
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "tomatoes", amount: 1000, unit: "g" },
      { name: "onion", amount: 1, unit: "" },
      { name: "garlic cloves", amount: 3, unit: "" },
      { name: "vegetable broth", amount: 500, unit: "ml" },
      { name: "fresh basil", amount: 20, unit: "g" },
      { name: "olive oil", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Chop onion and garlic, sauté in olive oil",
      "Add chopped tomatoes and cook for 10 minutes",
      "Add vegetable broth and simmer for 15 minutes",
      "Blend until smooth",
      "Add fresh basil and season to taste"
    ]
  }
];

const Lunch = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const [servings, setServings] = useState(4);
  const { toggleFavorite, isFavorite } = useFavorites();

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
      category: 'lunch'
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
          Lunch Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recipes.map((recipe) => (
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

export default Lunch;
