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
    id: "club-sandwich",
    title: "Club Sandwich",
    description: "Triple-decker sandwich with turkey, bacon, and fresh vegetables",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    prepTime: 15,
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
    prepTime: 10,
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
    prepTime: 30,
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
  },
  {
    id: "caramelized-onion-hazelnut-soup",
    title: "Soep van Gekarameliseerde Ui en Hazelnoot",
    description: "Rich caramelized onion soup with toasted hazelnuts",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80",
    prepTime: 45,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "onions", amount: 6, unit: "" },
      { name: "butter", amount: 50, unit: "g" },
      { name: "vegetable broth", amount: 1000, unit: "ml" },
      { name: "hazelnuts, toasted", amount: 100, unit: "g" },
      { name: "cream", amount: 150, unit: "ml" },
      { name: "thyme", amount: 2, unit: "tsp" },
      { name: "sugar", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Slice onions thinly",
      "Melt butter in a large pot and add onions with sugar",
      "Caramelize onions slowly over medium-low heat for 30 minutes, stirring occasionally",
      "Add vegetable broth and thyme, simmer for 15 minutes",
      "Blend until smooth, add cream",
      "Chop hazelnuts roughly and toast until fragrant",
      "Serve soup garnished with toasted hazelnuts"
    ]
  },
  {
    id: "baguette-plain",
    title: "Baguette",
    description: "Classic French baguette with butter",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80",
    prepTime: 5,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "baguette", amount: 1, unit: "" },
      { name: "butter", amount: 30, unit: "g" }
    ],
    steps: [
      "Slice baguette",
      "Spread with butter",
      "Serve fresh"
    ]
  },
  {
    id: "pita-crispy-chicken",
    title: "Pita met Krokante Kip",
    description: "Pita with crispy chicken, cucumber, tomatoes, apple, and yogurt sauce",
    image: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=800&q=80",
    prepTime: 20,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "pita bread", amount: 2, unit: "" },
      { name: "crispy chicken strips", amount: 300, unit: "g" },
      { name: "cucumber", amount: 1, unit: "" },
      { name: "cherry tomatoes", amount: 150, unit: "g" },
      { name: "apple", amount: 1, unit: "" },
      { name: "lamb's lettuce", amount: 50, unit: "g" },
      { name: "Greek yogurt", amount: 100, unit: "ml" },
      { name: "mayonnaise", amount: 50, unit: "ml" },
      { name: "spring onion", amount: 1, unit: "" },
      { name: "sriracha", amount: 1, unit: "tsp" },
      { name: "salt and pepper", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Warm pita bread",
      "Cook or heat crispy chicken until golden",
      "Dice cucumber, tomatoes, and apple",
      "Chop spring onion finely",
      "Mix yogurt, mayo, spring onion, sriracha, salt, and pepper",
      "Fill pita with chicken, vegetables, apple, and lamb's lettuce",
      "Drizzle with sauce and serve"
    ]
  },
  {
    id: "smoked-chicken-mango-curry",
    title: "Broodje Gerookte Kip, Mango en Kerriemayo",
    description: "Smoked chicken sandwich with mango, curry mayo, and arugula",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "smoked chicken breast", amount: 200, unit: "g" },
      { name: "mango", amount: 1, unit: "" },
      { name: "mayonnaise", amount: 60, unit: "ml" },
      { name: "curry powder", amount: 1, unit: "tsp" },
      { name: "arugula", amount: 50, unit: "g" }
    ],
    steps: [
      "Slice bread rolls",
      "Mix mayonnaise with curry powder",
      "Slice smoked chicken and mango",
      "Spread curry mayo on bread",
      "Layer chicken, mango slices, and arugula",
      "Close sandwich and serve"
    ]
  },
  {
    id: "smoked-chicken-avocado-truffle",
    title: "Broodje Gerookte Kip, Avocado en Truffelmayo",
    description: "Smoked chicken with avocado, tomato, and truffle mayo",
    image: "https://images.unsplash.com/photo-1619740455993-9e0c49ee7c88?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "smoked chicken breast", amount: 200, unit: "g" },
      { name: "avocado", amount: 1, unit: "" },
      { name: "tomato", amount: 1, unit: "" },
      { name: "truffle mayonnaise", amount: 60, unit: "ml" }
    ],
    steps: [
      "Slice bread rolls",
      "Slice smoked chicken, avocado, and tomato",
      "Spread truffle mayo on bread",
      "Layer chicken, avocado, and tomato",
      "Close sandwich and serve"
    ]
  },
  {
    id: "spicy-chicken-boost",
    title: "Broodje Spicy Chicken (Boost)",
    description: "Spicy chicken with cherry tomatoes, mayo, spinach, and aioli",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "spicy chicken breast", amount: 250, unit: "g" },
      { name: "cherry tomatoes", amount: 100, unit: "g" },
      { name: "mayonnaise", amount: 40, unit: "ml" },
      { name: "baby spinach", amount: 50, unit: "g" },
      { name: "aioli dressing", amount: 40, unit: "ml" }
    ],
    steps: [
      "Cook spicy chicken until done",
      "Slice bread rolls and cherry tomatoes",
      "Spread mayo on bread",
      "Layer chicken, tomatoes, and spinach",
      "Drizzle with aioli dressing and serve"
    ]
  },
  {
    id: "chicken-melt",
    title: "Broodje Chicken Melt",
    description: "Smoked chicken with melted cheddar, hummus, and pickle",
    image: "https://images.unsplash.com/photo-1621852004615-e2c0c8e5c3e8?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "smoked chicken breast", amount: 200, unit: "g" },
      { name: "cheddar cheese", amount: 100, unit: "g" },
      { name: "hummus", amount: 80, unit: "g" },
      { name: "pickles, diced", amount: 50, unit: "g" }
    ],
    steps: [
      "Slice bread rolls",
      "Spread hummus on bread",
      "Layer chicken and cheddar",
      "Toast in oven or panini press until cheese melts",
      "Top with diced pickles and serve"
    ]
  },
  {
    id: "roast-beef-truffle",
    title: "Broodje Rosbief en Truffelmayo",
    description: "Roast beef with truffle mayo, arugula, and parmesan",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "roast beef", amount: 200, unit: "g" },
      { name: "truffle mayonnaise", amount: 60, unit: "ml" },
      { name: "arugula", amount: 50, unit: "g" },
      { name: "parmesan cheese", amount: 30, unit: "g" }
    ],
    steps: [
      "Slice bread rolls",
      "Spread truffle mayo on bread",
      "Layer roast beef and arugula",
      "Shave parmesan on top",
      "Close sandwich and serve"
    ]
  },
  {
    id: "carpaccio-truffle",
    title: "Broodje Carpaccio",
    description: "Beef carpaccio with truffle mayo, parmesan, pine nuts, and arugula",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "beef carpaccio", amount: 150, unit: "g" },
      { name: "truffle mayonnaise", amount: 60, unit: "ml" },
      { name: "parmesan cheese", amount: 40, unit: "g" },
      { name: "pine nuts, toasted", amount: 30, unit: "g" },
      { name: "arugula", amount: 50, unit: "g" }
    ],
    steps: [
      "Slice bread rolls",
      "Spread truffle mayo on bread",
      "Layer carpaccio and arugula",
      "Shave parmesan on top",
      "Sprinkle with toasted pine nuts and serve"
    ]
  },
  {
    id: "pastrami-horseradish",
    title: "Broodje Pastrami",
    description: "Pastrami on thick bread with horseradish cream cheese, watercress, and pickled onions",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "thick bread slices", amount: 4, unit: "" },
      { name: "pastrami", amount: 200, unit: "g" },
      { name: "cream cheese", amount: 80, unit: "g" },
      { name: "horseradish", amount: 1, unit: "tbsp" },
      { name: "watercress", amount: 40, unit: "g" },
      { name: "pickled onions (Amsterdam style)", amount: 50, unit: "g" }
    ],
    steps: [
      "Mix cream cheese with horseradish",
      "Spread on thick bread slices",
      "Layer pastrami and watercress",
      "Top with pickled onions",
      "Close sandwich and serve"
    ]
  },
  {
    id: "blt-boosty",
    title: "Broodje BLT (Boosty)",
    description: "Loaded BLT with aged cheese, egg, bacon, tomatoes, arugula, and avocado aioli",
    image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800&q=80",
    prepTime: 20,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "aged cheese", amount: 80, unit: "g" },
      { name: "eggs", amount: 2, unit: "" },
      { name: "bacon strips", amount: 6, unit: "" },
      { name: "roma tomatoes", amount: 2, unit: "" },
      { name: "arugula", amount: 50, unit: "g" },
      { name: "avocado aioli dressing", amount: 60, unit: "ml" }
    ],
    steps: [
      "Cook bacon until crispy",
      "Fry or scramble eggs",
      "Slice bread rolls and tomatoes",
      "Spread avocado aioli on bread",
      "Layer cheese, eggs, bacon, tomatoes, and arugula",
      "Close sandwich and serve"
    ]
  },
  {
    id: "prosciutto-mozzarella-basil",
    title: "Broodje Excellent Pistolet",
    description: "Prosciutto with mozzarella, eggplant, and basil truffle tapenade",
    image: "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "pistolet rolls", amount: 2, unit: "" },
      { name: "prosciutto", amount: 150, unit: "g" },
      { name: "mozzarella", amount: 150, unit: "g" },
      { name: "grilled eggplant", amount: 100, unit: "g" },
      { name: "basil truffle tapenade", amount: 60, unit: "g" }
    ],
    steps: [
      "Slice pistolet rolls",
      "Spread basil truffle tapenade on bread",
      "Layer prosciutto, mozzarella, and grilled eggplant",
      "Close sandwich and serve, optionally toast briefly"
    ]
  },
  {
    id: "ricotta-pesto-vegetables",
    title: "Broodje Ricotta en Rode Pesto",
    description: "Ricotta with red pesto, pine nuts, eggplant, and bell pepper",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "ricotta cheese", amount: 150, unit: "g" },
      { name: "red pesto", amount: 60, unit: "g" },
      { name: "pine nuts, toasted", amount: 30, unit: "g" },
      { name: "grilled eggplant", amount: 100, unit: "g" },
      { name: "roasted bell pepper", amount: 1, unit: "" }
    ],
    steps: [
      "Slice bread rolls",
      "Spread ricotta on bread",
      "Add red pesto",
      "Layer grilled eggplant and roasted bell pepper",
      "Sprinkle with toasted pine nuts and serve"
    ]
  },
  {
    id: "grilled-pear-goat-cheese",
    title: "Broodje Gegrilde Peer en Geitenkaas",
    description: "Grilled pear with goat cheese, walnuts, and honey",
    image: "https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "pears", amount: 2, unit: "" },
      { name: "goat cheese", amount: 150, unit: "g" },
      { name: "walnuts", amount: 50, unit: "g" },
      { name: "honey", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Slice pears and grill until caramelized",
      "Slice bread rolls",
      "Spread goat cheese on bread",
      "Layer grilled pear slices",
      "Top with walnuts and drizzle with honey",
      "Close sandwich and serve"
    ]
  },
  {
    id: "goat-cheese-mango-chutney",
    title: "Broodje Geitenkaas en Mangochutney",
    description: "Goat cheese with mango chutney, naan bread, and arugula",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "naan bread", amount: 2, unit: "" },
      { name: "goat cheese", amount: 150, unit: "g" },
      { name: "mango chutney", amount: 80, unit: "g" },
      { name: "arugula", amount: 50, unit: "g" }
    ],
    steps: [
      "Warm naan bread",
      "Spread goat cheese on naan",
      "Add mango chutney",
      "Top with arugula and serve"
    ]
  },
  {
    id: "pita-falafel",
    title: "Pita Falafel",
    description: "Falafel pita with hummus, tzatziki, and tomatoes",
    image: "https://images.unsplash.com/photo-1600564193743-b5746079e58a?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "pita bread", amount: 2, unit: "" },
      { name: "falafel", amount: 8, unit: "" },
      { name: "hummus", amount: 100, unit: "g" },
      { name: "tzatziki", amount: 100, unit: "g" },
      { name: "cherry tomatoes", amount: 150, unit: "g" }
    ],
    steps: [
      "Warm pita bread",
      "Heat or fry falafel until crispy",
      "Spread hummus inside pita",
      "Add falafel and sliced tomatoes",
      "Drizzle with tzatziki and serve"
    ]
  },
  {
    id: "aged-cheese-cress-mustard",
    title: "Broodje Oude Kaas",
    description: "Aged cheese with garden cress and coarse mustard",
    image: "https://images.unsplash.com/photo-1603893815951-8e92c30a6e78?w=800&q=80",
    prepTime: 5,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "aged cheese", amount: 150, unit: "g" },
      { name: "garden cress", amount: 20, unit: "g" },
      { name: "coarse mustard", amount: 30, unit: "g" }
    ],
    steps: [
      "Slice bread rolls",
      "Slice aged cheese",
      "Spread coarse mustard on bread",
      "Layer cheese and garden cress",
      "Close sandwich and serve"
    ]
  },
  {
    id: "burrata-tomato-pesto",
    title: "Broodje Burrata",
    description: "Burrata with tomato, fresh pesto, and basil",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "burrata cheese", amount: 200, unit: "g" },
      { name: "tomatoes", amount: 2, unit: "" },
      { name: "fresh pesto", amount: 60, unit: "g" },
      { name: "fresh basil", amount: 10, unit: "g" }
    ],
    steps: [
      "Slice bread rolls and tomatoes",
      "Spread pesto on bread",
      "Layer tomato slices and burrata",
      "Top with fresh basil leaves and serve"
    ]
  },
  {
    id: "melted-brie-prosciutto",
    title: "Broodje Gesmolten Brie en Parmaham",
    description: "Melted brie with prosciutto, pesto, and arugula",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "brie cheese", amount: 150, unit: "g" },
      { name: "prosciutto", amount: 100, unit: "g" },
      { name: "pesto", amount: 40, unit: "g" },
      { name: "arugula", amount: 40, unit: "g" }
    ],
    steps: [
      "Slice bread rolls",
      "Layer brie and prosciutto on bread",
      "Toast until brie melts",
      "Spread pesto and add arugula",
      "Close sandwich and serve"
    ]
  },
  {
    id: "melted-brie-apple-honey",
    title: "Broodje Gesmolten Brie en Appel",
    description: "Melted brie with apple, honey, and walnuts",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "brie cheese", amount: 150, unit: "g" },
      { name: "apple", amount: 1, unit: "" },
      { name: "honey", amount: 2, unit: "tbsp" },
      { name: "walnuts", amount: 50, unit: "g" }
    ],
    steps: [
      "Slice bread rolls and apple thinly",
      "Layer brie on bread",
      "Toast until brie melts",
      "Add apple slices and walnuts",
      "Drizzle with honey and serve"
    ]
  },
  {
    id: "goat-cheese-fig-apple",
    title: "Broodje Geitenkaas en Vijg",
    description: "Goat cheese with fig, lamb's lettuce, and apple",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "bread rolls", amount: 2, unit: "" },
      { name: "goat cheese", amount: 150, unit: "g" },
      { name: "fresh figs", amount: 4, unit: "" },
      { name: "lamb's lettuce", amount: 40, unit: "g" },
      { name: "apple", amount: 1, unit: "" }
    ],
    steps: [
      "Slice bread rolls",
      "Spread goat cheese on bread",
      "Slice figs and apple thinly",
      "Layer figs, apple, and lamb's lettuce",
      "Close sandwich and serve"
    ]
  },
  {
    id: "tosti-camembert-blueberry",
    title: "Tosti Camembert en Blauwe Bessen",
    description: "Grilled cheese with camembert, blueberries, and basil",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 2,
    ingredients: [
      { name: "bread slices", amount: 4, unit: "" },
      { name: "camembert cheese", amount: 150, unit: "g" },
      { name: "blueberries", amount: 100, unit: "g" },
      { name: "fresh basil", amount: 10, unit: "g" },
      { name: "butter", amount: 30, unit: "g" }
    ],
    steps: [
      "Butter bread slices on one side",
      "Layer camembert, blueberries, and basil between bread",
      "Grill in panini press or pan until golden and cheese melts",
      "Slice diagonally and serve hot"
    ]
  }
];

const Lunch = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const [servings, setServings] = useState(4);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { getRecipesByCategory } = useRecipes();
  
  const userRecipes = getRecipesByCategory('lunch');
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

export default Lunch;
