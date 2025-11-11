import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, ChevronUp, Home, Minus, Plus, Printer, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";

const recipes = [
  {
    id: "chocolate-cake",
    title: "Chocolate Cake",
    description: "Rich and moist chocolate layer cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    prepTime: "60 min",
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
    prepTime: "30 min + chill",
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
    prepTime: "75 min",
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
      category: 'dessert'
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
          Dessert Recipes
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

export default Dessert;
