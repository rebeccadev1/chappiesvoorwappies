import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Search, X, Clock, Leaf, Printer, Heart, Minus, Plus } from "lucide-react";
import { RecipeUpload } from "@/components/RecipeUpload";
import { useRecipes, Recipe, Ingredient } from "@/hooks/use-recipes";
import { useFavorites } from "@/hooks/use-favorites";

const categories = [
  {
    title: "Breakfast",
    description: "Start your day with delicious morning recipes",
    path: "/breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80"
  },
  {
    title: "Lunch",
    description: "Perfect midday meals to keep you energized",
    path: "/lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
  },
  {
    title: "Dinner",
    description: "Hearty evening dishes for the whole family",
    path: "/dinner",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80"
  },
  {
    title: "Dessert",
    description: "Sweet treats to satisfy your cravings",
    path: "/dessert",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80"
  },
  {
    title: "Snacks",
    description: "Quick bites for any time of day",
    path: "/snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&q=80"
  }
];

// Featured recipes for Rebecca's Favorites section
const featuredRecipes: Recipe[] = [
  {
    id: "featured-1",
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
      { name: "Buttermilk", amount: 1.75, unit: "cups" },
      { name: "Eggs", amount: 2, unit: "pcs" }
    ],
    steps: [
      "Whisk together dry ingredients",
      "Mix wet ingredients separately",
      "Combine until just mixed",
      "Cook on griddle until golden"
    ]
  },
  {
    id: "featured-2",
    title: "Bao buns",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
    description: "Zachte gestoomde broodjes met hartige vulling",
    prepTime: 90,
    isVegan: false,
    isVegetarian: false,
    baseServings: 8,
    category: 'dinner',
    ingredients: [
      { name: "Flour", amount: 400, unit: "g" },
      { name: "Yeast", amount: 5, unit: "g" },
      { name: "Sugar", amount: 20, unit: "g" }
    ],
    steps: [
      "Make dough and let rise",
      "Shape into buns",
      "Steam until fluffy",
      "Fill with your favorite ingredients"
    ]
  },
  {
    id: "featured-3",
    title: "Banana bread",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    description: "Moist and sweet banana bread",
    prepTime: 70,
    isVegan: false,
    isVegetarian: true,
    baseServings: 10,
    category: 'dessert',
    ingredients: [
      { name: "Ripe bananas", amount: 4, unit: "" },
      { name: "Flour", amount: 200, unit: "g" },
      { name: "Sugar", amount: 150, unit: "g" }
    ],
    steps: [
      "Mash bananas",
      "Mix with dry ingredients",
      "Bake until golden",
      "Cool before slicing"
    ]
  },
  {
    id: "featured-4",
    title: "Tosti camembert, blauwe bessen",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80",
    description: "Grilled cheese with camembert, blueberries, basil, and butter",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    category: 'lunch',
    ingredients: [
      { name: "Brood", amount: 2, unit: "sneden" },
      { name: "Camembert", amount: 80, unit: "g" },
      { name: "Blauwe bessen", amount: 40, unit: "g" }
    ],
    steps: [
      "Smeer boter op brood",
      "Beleg met camembert en bessen",
      "Grill tot krokant",
      "Serveer warm"
    ]
  }
];

const Index = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
  const { recipes: userRecipes } = useRecipes();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Combine all recipes for search
  const allRecipes = useMemo(() => {
    return [...userRecipes, ...featuredRecipes];
  }, [userRecipes]);

  // Filter recipes based on search query
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return allRecipes.filter(recipe => {
      const titleMatch = recipe.title.toLowerCase().includes(query);
      const descriptionMatch = recipe.description.toLowerCase().includes(query);
      const ingredientMatch = recipe.ingredients.some(ing => 
        ing.name.toLowerCase().includes(query)
      );
      return titleMatch || descriptionMatch || ingredientMatch;
    });
  }, [searchQuery, allRecipes]);

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
      category: recipe.category
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-aharoni font-bold" style={{ color: '#904E55' }}>
              Chappies voor Wappies
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground hidden sm:block">
                by Rebecca Jekel
              </p>
              <Button
                onClick={() => setUploadOpen(true)}
                size="icon"
                variant="ghost"
                title="Upload Recipe"
              >
                <Upload className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <RecipeUpload open={uploadOpen} onOpenChange={setUploadOpen} />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-aharoni font-bold mb-8 text-foreground">
              Find your next meal here
            </h2>
            
            {/* Search Bar */}
            <div className="relative max-w-[600px] mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search an ingredient, recipe or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-base rounded-xl border-gray-300 focus:border-[#904E55] focus:ring-[#904E55]"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="mt-8">
                {filteredRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {filteredRecipes.map((recipe) => (
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
                              <span className="flex items-center gap-1" style={{ color: '#904E55' }}>
                                <Leaf className="h-4 w-4" />
                                Vegan
                              </span>
                            )}
                            {!recipe.isVegan && recipe.isVegetarian && (
                              <span className="flex items-center gap-1" style={{ color: '#904E55' }}>
                                <Leaf className="h-4 w-4" />
                                Vegetarian
                              </span>
                            )}
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-lg py-8">
                    Geen recepten gevonden. Probeer een andere zoekterm.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      {!searchQuery && (
        <>
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                {categories.map((category) => (
                  <Link
                    key={category.title}
                    to={category.path}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border-gray-200">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="font-aharoni text-xl text-foreground group-hover:text-[#904E55] transition-colors">
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Rebecca's Favorites Section */}
          <section className="py-12 bg-[#FAF7F2]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-aharoni font-bold text-center mb-8" style={{ color: '#904E55' }}>
                Rebecca's Favorites
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {featuredRecipes.map((recipe) => (
                  <Card
                    key={recipe.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border-gray-200"
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
                          <span className="flex items-center gap-1" style={{ color: '#904E55' }}>
                            <Leaf className="h-4 w-4" />
                            Vegan
                          </span>
                        )}
                        {!recipe.isVegan && recipe.isVegetarian && (
                          <span className="flex items-center gap-1" style={{ color: '#904E55' }}>
                            <Leaf className="h-4 w-4" />
                            Vegetarian
                          </span>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Recipe Dialog */}
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
                      <span className="flex items-center gap-1" style={{ color: '#904E55' }}>
                        <Leaf className="h-4 w-4" />
                        Vegan
                      </span>
                    )}
                    {!selectedRecipe.isVegan && selectedRecipe.isVegetarian && (
                      <span className="flex items-center gap-1" style={{ color: '#904E55' }}>
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
                        <span className="font-semibold" style={{ color: '#904E55' }}>{index + 1}.</span> {step}
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

export default Index;
