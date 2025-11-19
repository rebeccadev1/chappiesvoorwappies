import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Home, Minus, Plus, Clock, Leaf, Printer, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";
import { useRecipes } from "@/hooks/use-recipes";

const recipes = [
  {
    id: "hummus",
    title: "Hummus",
    description: "Creamy chickpea dip with tahini",
    image: "https://images.unsplash.com/photo-1571312289170-0d157c1b5b0e?w=800&q=80",
    prepTime: 10,
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "chickpeas", amount: 400, unit: "g" },
      { name: "tahini", amount: 60, unit: "g" },
      { name: "garlic cloves", amount: 2, unit: "" },
      { name: "lemon juice", amount: 3, unit: "tbsp" },
      { name: "olive oil", amount: 3, unit: "tbsp" },
      { name: "cumin", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Drain and rinse chickpeas",
      "Blend chickpeas, tahini, garlic, and lemon juice",
      "Add olive oil gradually while blending",
      "Season with cumin, salt, and pepper",
      "Serve with olive oil drizzle"
    ]
  },
  {
    id: "nachos",
    title: "Loaded Nachos",
    description: "Crispy tortilla chips with cheese and toppings",
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=800&q=80",
    prepTime: 20,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "tortilla chips", amount: 300, unit: "g" },
      { name: "cheddar cheese", amount: 200, unit: "g" },
      { name: "sour cream", amount: 150, unit: "ml" },
      { name: "salsa", amount: 150, unit: "ml" },
      { name: "jalapeños", amount: 50, unit: "g" },
      { name: "guacamole", amount: 150, unit: "g" }
    ],
    steps: [
      "Preheat oven to 180°C",
      "Spread chips on baking sheet",
      "Sprinkle grated cheese over chips",
      "Bake for 5-7 minutes until cheese melts",
      "Top with sour cream, salsa, jalapeños, and guacamole"
    ]
  },
  {
    id: "energy-balls",
    title: "Energy Balls",
    description: "Healthy no-bake snack balls",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=80",
    prepTime: 15,
    isVegan: true,
    isVegetarian: true,
    baseServings: 12,
    ingredients: [
      { name: "dates", amount: 200, unit: "g" },
      { name: "oats", amount: 100, unit: "g" },
      { name: "almond butter", amount: 100, unit: "g" },
      { name: "cocoa powder", amount: 30, unit: "g" },
      { name: "chia seeds", amount: 2, unit: "tbsp" },
      { name: "maple syrup", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Blend dates until smooth",
      "Add oats, almond butter, cocoa, and chia seeds",
      "Mix in maple syrup",
      "Roll mixture into balls",
      "Refrigerate for 30 minutes"
    ]
  }
];

const Snacks = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const [servings, setServings] = useState(4);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { getRecipesByCategory } = useRecipes();
  
  const userRecipes = getRecipesByCategory('snacks');
  const allRecipes = [...recipes, ...userRecipes];

  const handleOpenRecipe = (recipe: typeof recipes[0]) => {
    setSelectedRecipe(recipe);
    setServings(recipe.baseServings);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
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
      category: 'snacks'
    });
  };

  const adjustServings = (delta: number) => {
    setServings(Math.max(1, servings + delta));
  };

  const getScaledAmount = (ingredient: { amount: number; unit: string; name: string }) => {
    if (!selectedRecipe) return ingredient.amount;
    const scale = servings / selectedRecipe.baseServings;
    const scaled = ingredient.amount * scale;
    return Math.round(scaled * 100) / 100;
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
          Snack Recipes
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

export default Snacks;
