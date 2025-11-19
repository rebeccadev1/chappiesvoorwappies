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
    id: "chocolate-cake",
    title: "Chocolate Cake",
    description: "Rich and moist chocolate layer cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    prepTime: 60,
    isVegan: false,
    isVegetarian: true,
    baseServings: 8,
    ingredients: [
      { name: "flour", amount: 250, unit: "g" },
      { name: "cocoa powder", amount: 75, unit: "g" },
      { name: "sugar", amount: 300, unit: "g" },
      { name: "eggs", amount: 3, unit: "" },
      { name: "butter", amount: 200, unit: "g" },
      { name: "milk", amount: 250, unit: "ml" },
      { name: "baking powder", amount: 2, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 180°C",
      "Mix dry ingredients in a bowl",
      "Beat eggs, butter, and milk in another bowl",
      "Combine wet and dry ingredients",
      "Pour into greased cake pan",
      "Bake for 35-40 minutes"
    ]
  },
  {
    id: "tiramisu",
    title: "Tiramisu",
    description: "Classic Italian coffee-flavored dessert",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    prepTime: 30,
    isVegan: false,
    isVegetarian: true,
    baseServings: 6,
    ingredients: [
      { name: "mascarpone", amount: 500, unit: "g" },
      { name: "eggs", amount: 4, unit: "" },
      { name: "sugar", amount: 100, unit: "g" },
      { name: "ladyfinger biscuits", amount: 300, unit: "g" },
      { name: "espresso", amount: 250, unit: "ml" },
      { name: "cocoa powder", amount: 30, unit: "g" }
    ],
    steps: [
      "Separate eggs and beat yolks with sugar",
      "Mix in mascarpone until smooth",
      "Beat egg whites until stiff, fold into mixture",
      "Dip ladyfingers in espresso",
      "Layer biscuits and cream in dish",
      "Dust with cocoa and refrigerate 4 hours"
    ]
  },
  {
    id: "apple-pie",
    title: "Apple Pie",
    description: "Traditional apple pie with cinnamon",
    image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",
    prepTime: 75,
    isVegan: false,
    isVegetarian: true,
    baseServings: 8,
    ingredients: [
      { name: "pie crust", amount: 2, unit: "" },
      { name: "apples", amount: 1000, unit: "g" },
      { name: "sugar", amount: 150, unit: "g" },
      { name: "cinnamon", amount: 2, unit: "tsp" },
      { name: "butter", amount: 50, unit: "g" },
      { name: "lemon juice", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Preheat oven to 200°C",
      "Peel and slice apples",
      "Mix apples with sugar, cinnamon, and lemon juice",
      "Line pie dish with one crust",
      "Fill with apple mixture and dot with butter",
      "Cover with second crust and bake 45 minutes"
    ]
  }
];

const Dessert = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const [servings, setServings] = useState(8);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { getRecipesByCategory } = useRecipes();
  
  const userRecipes = getRecipesByCategory('dessert');
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
      category: 'dessert'
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
          Dessert Recipes
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

export default Dessert;
