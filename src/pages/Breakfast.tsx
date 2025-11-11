import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  steps: string[];
}

const breakfastRecipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Pancakes",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
    description: "Fluffy homemade pancakes perfect for a weekend morning",
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
    id: 2,
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
    description: "Simple yet delicious avocado toast with a twist",
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
    id: 3,
    title: "Berry Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    description: "Refreshing and nutritious smoothie bowl",
    steps: [
      "Blend frozen berries, banana, and yogurt until smooth",
      "Pour into a bowl",
      "Top with granola, fresh berries, and coconut flakes",
      "Add chia seeds and honey",
      "Enjoy immediately while cold"
    ]
  }
];

const Breakfast = () => {
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const toggleRecipe = (id: number) => {
    setExpandedRecipe(expandedRecipe === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-aharoni font-bold text-primary">
              Chappies voor Wappies
            </h1>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-aharoni font-bold text-foreground mb-8 text-center">
          Breakfast Recipes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {breakfastRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => toggleRecipe(recipe.id)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-aharoni text-xl flex items-center justify-between">
                  {recipe.title}
                  {expandedRecipe === recipe.id ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              
              {expandedRecipe === recipe.id && (
                <CardContent className="pt-0">
                  <div className="border-t border-border pt-4">
                    <h4 className="font-aharoni font-semibold text-foreground mb-3">
                      Steps:
                    </h4>
                    <ol className="space-y-2">
                      {recipe.steps.map((step, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          <span className="font-semibold text-primary">{index + 1}.</span> {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Breakfast;
