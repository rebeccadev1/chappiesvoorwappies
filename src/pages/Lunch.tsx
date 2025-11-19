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
    title: "Soep van gekarameliseerde ui en hazelnoot",
    description: "Caramelized onion soup with toasted hazelnuts",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80",
    prepTime: 45,
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "uien", amount: 6, unit: "" },
      { name: "hazelnoten", amount: 100, unit: "g" },
      { name: "groentebouillon", amount: 1000, unit: "ml" },
      { name: "olijfolie", amount: 3, unit: "el" },
      { name: "boter", amount: 30, unit: "g" },
      { name: "tijm", amount: 2, unit: "takjes" },
      { name: "zout en peper", amount: 1, unit: "naar smaak" }
    ],
    steps: [
      "Snipper de uien en fruit ze langzaam in olijfolie en boter tot ze gekarameliseerd zijn (30 min)",
      "Rooster de hazelnoten in een droge pan",
      "Voeg de bouillon toe aan de uien en laat 15 minuten sudderen",
      "Mix de soep glad en voeg gehakte hazelnoten toe",
      "Breng op smaak met tijm, zout en peper"
    ]
  },
  {
    id: "pita-crispy-chicken",
    title: "Pita kip krokant",
    description: "Pita with crispy chicken, cucumber, tomatoes, apple, and yogurt dressing",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    prepTime: 20,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "pita brood", amount: 1, unit: "" },
      { name: "krokante kip", amount: 150, unit: "g" },
      { name: "komkommer", amount: 0.5, unit: "" },
      { name: "tomaatjes", amount: 5, unit: "" },
      { name: "appel", amount: 0.5, unit: "" },
      { name: "veldsla", amount: 30, unit: "g" },
      { name: "yoghurt", amount: 2, unit: "el" },
      { name: "mayonaise", amount: 1, unit: "el" },
      { name: "bosui", amount: 1, unit: "el" },
      { name: "sriracha", amount: 1, unit: "tl" },
      { name: "zout en peper", amount: 1, unit: "naar smaak" }
    ],
    steps: [
      "Warm de pita op",
      "Mix yoghurt, mayo, bosui, sriracha, zout en peper voor de dressing",
      "Snijd komkommer, tomaatjes en appel",
      "Vul de pita met veldsla, krokante kip, groenten en appel",
      "Voeg de dressing toe en serveer"
    ]
  },
  {
    id: "smoked-chicken-mango-curry",
    title: "Broodje gerookte kip, mango, kerriemayo",
    description: "Smoked chicken sandwich with mango, curry mayo, and arugula",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "gerookte kip", amount: 100, unit: "g" },
      { name: "mango", amount: 0.5, unit: "" },
      { name: "rucola", amount: 20, unit: "g" },
      { name: "mayonaise", amount: 2, unit: "el" },
      { name: "kerrie", amount: 1, unit: "tl" }
    ],
    steps: [
      "Snijd het broodje open",
      "Mix mayo met kerrie",
      "Snijd de mango in plakjes",
      "Beleg met rucola, gerookte kip en mango",
      "Smeer kerriemayo erover en serveer"
    ]
  },
  {
    id: "smoked-chicken-avocado-truffle",
    title: "Broodje gerookte kip, avocado, tomaat",
    description: "Smoked chicken sandwich with avocado, tomato, and truffle mayo",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "gerookte kip", amount: 100, unit: "g" },
      { name: "avocado", amount: 0.5, unit: "" },
      { name: "tomaat", amount: 1, unit: "" },
      { name: "truffelmayo", amount: 2, unit: "el" }
    ],
    steps: [
      "Snijd het broodje open",
      "Snijd avocado en tomaat in plakjes",
      "Beleg met gerookte kip, avocado en tomaat",
      "Smeer truffelmayo erover",
      "Serveer direct"
    ]
  },
  {
    id: "spicy-chicken-boost",
    title: "Broodje spicy chicken (boost)",
    description: "Spicy chicken sandwich with tomatoes, mayo, baby spinach, and aioli",
    image: "https://images.unsplash.com/photo-1619740455993-8e7f88d8a23c?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "pikante kip", amount: 120, unit: "g" },
      { name: "tomaatjes", amount: 5, unit: "" },
      { name: "mayonaise", amount: 1, unit: "el" },
      { name: "baby spinazie", amount: 30, unit: "g" },
      { name: "aioli dressing", amount: 2, unit: "el" }
    ],
    steps: [
      "Snijd het broodje open",
      "Bak de pikante kip tot gaar",
      "Beleg met baby spinazie en tomaatjes",
      "Voeg de kip toe",
      "Smeer mayo en aioli dressing erover"
    ]
  },
  {
    id: "chicken-melt",
    title: "Broodje chicken melt",
    description: "Grilled chicken sandwich with melted cheddar, hummus, and pickle",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "gerookte kip", amount: 100, unit: "g" },
      { name: "cheddar", amount: 50, unit: "g" },
      { name: "hummus", amount: 2, unit: "el" },
      { name: "augurk", amount: 2, unit: "" }
    ],
    steps: [
      "Snijd het broodje open en smeer hummus erop",
      "Beleg met gerookte kip en cheddar",
      "Grill tot de kaas gesmolten is",
      "Snijd augurk in kleine stukjes",
      "Voeg augurk toe en serveer"
    ]
  },
  {
    id: "roast-beef-truffle",
    title: "Broodje rosbief, truffelmayo, rucola",
    description: "Roast beef sandwich with truffle mayo, arugula, and parmesan",
    image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "rosbief", amount: 100, unit: "g" },
      { name: "truffelmayo", amount: 2, unit: "el" },
      { name: "rucola", amount: 20, unit: "g" },
      { name: "parmezaan", amount: 20, unit: "g" }
    ],
    steps: [
      "Snijd het broodje open",
      "Smeer truffelmayo op het broodje",
      "Beleg met rucola en rosbief",
      "Schaaf parmezaan erover",
      "Serveer direct"
    ]
  },
  {
    id: "carpaccio-truffle",
    title: "Broodje carpaccio, truffelmayo, parmezaan",
    description: "Beef carpaccio sandwich with truffle mayo, parmesan, pine nuts, and arugula",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "carpaccio", amount: 80, unit: "g" },
      { name: "truffelmayo", amount: 2, unit: "el" },
      { name: "parmezaan", amount: 20, unit: "g" },
      { name: "pijnboompitjes", amount: 10, unit: "g" },
      { name: "rucola", amount: 20, unit: "g" }
    ],
    steps: [
      "Snijd het broodje open",
      "Smeer truffelmayo op het broodje",
      "Beleg met rucola en carpaccio",
      "Schaaf parmezaan erover",
      "Strooi pijnboompitjes erover en serveer"
    ]
  },
  {
    id: "pastrami-horseradish",
    title: "Broodje pastrami",
    description: "Pastrami on thick bread with horseradish cream cheese, watercress, and pickled onions",
    image: "https://images.unsplash.com/photo-1585238341710-489d287582c8?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "dik brood", amount: 2, unit: "sneden" },
      { name: "pastrami", amount: 100, unit: "g" },
      { name: "roomkaas", amount: 40, unit: "g" },
      { name: "mierikswortel", amount: 1, unit: "tl" },
      { name: "waterkers", amount: 20, unit: "g" },
      { name: "amsterdamse uitjes", amount: 2, unit: "el" }
    ],
    steps: [
      "Mix roomkaas met mierikswortel",
      "Smeer de mix op het brood",
      "Beleg met pastrami en waterkers",
      "Voeg amsterdamse uitjes toe",
      "Leg de tweede snee erop en serveer"
    ]
  },
  {
    id: "blt-boosty",
    title: "Broodje BLT (boosty)",
    description: "Premium BLT with aged cheese, egg, bacon, tomatoes, arugula, and avocado aioli",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "oude kaas", amount: 50, unit: "g" },
      { name: "ei", amount: 1, unit: "" },
      { name: "bacon", amount: 3, unit: "plakjes" },
      { name: "romantomaten", amount: 3, unit: "" },
      { name: "rucola", amount: 20, unit: "g" },
      { name: "avocado aioli", amount: 2, unit: "el" }
    ],
    steps: [
      "Bak de bacon krokant",
      "Bak het ei",
      "Snijd het broodje open en smeer avocado aioli erop",
      "Beleg met rucola, oude kaas, bacon, ei en tomaten",
      "Serveer warm"
    ]
  },
  {
    id: "parma-ham-mozzarella-tapenade",
    title: "Broodje excellent pistolet",
    description: "Premium sandwich with Parma ham, mozzarella, aubergine, and basil truffle tapenade",
    image: "https://images.unsplash.com/photo-1603046891726-36bde98c786a?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "pistolet", amount: 1, unit: "" },
      { name: "paraham", amount: 80, unit: "g" },
      { name: "mozzarella", amount: 80, unit: "g" },
      { name: "aubergine", amount: 0.5, unit: "" },
      { name: "basilicum truffel tapenade", amount: 2, unit: "el" }
    ],
    steps: [
      "Grill de aubergine in plakjes",
      "Snijd het pistolet open",
      "Smeer tapenade op het brood",
      "Beleg met paraham, mozzarella en aubergine",
      "Serveer direct of warm even op"
    ]
  },
  {
    id: "ricotta-pesto-vegetables",
    title: "Broodje ricotta rode pesto",
    description: "Sandwich with ricotta, red pesto, pine nuts, aubergine, and bell pepper",
    image: "https://images.unsplash.com/photo-1592415499556-3cde6d9479e7?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "ricotta", amount: 60, unit: "g" },
      { name: "rode pesto", amount: 2, unit: "el" },
      { name: "pijnboompitjes", amount: 10, unit: "g" },
      { name: "aubergine", amount: 0.5, unit: "" },
      { name: "paprika", amount: 0.5, unit: "" }
    ],
    steps: [
      "Grill aubergine en paprika",
      "Snijd het broodje open",
      "Smeer ricotta en rode pesto op het brood",
      "Beleg met gegrilde groenten",
      "Strooi pijnboompitjes erover en serveer"
    ]
  },
  {
    id: "grilled-pear-goat-cheese",
    title: "Broodje gegrilde peer geitenkaas",
    description: "Grilled pear and goat cheese sandwich with walnuts and honey",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "peer", amount: 1, unit: "" },
      { name: "geitenkaas", amount: 60, unit: "g" },
      { name: "walnoten", amount: 20, unit: "g" },
      { name: "honing", amount: 1, unit: "el" }
    ],
    steps: [
      "Snijd de peer in plakjes en grill kort",
      "Snijd het broodje open",
      "Beleg met geitenkaas en gegrilde peer",
      "Voeg gehakte walnoten toe",
      "Druppel honing erover en serveer"
    ]
  },
  {
    id: "goat-cheese-mango-chutney",
    title: "Broodje geitenkaas mangochutney",
    description: "Goat cheese sandwich with mango chutney, red onion, and arugula",
    image: "https://images.unsplash.com/photo-1621852004158-f3bc6b8e5e17?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "geitenkaas", amount: 60, unit: "g" },
      { name: "mangochutney", amount: 2, unit: "el" },
      { name: "rode ui", amount: 0.25, unit: "" },
      { name: "rucola", amount: 20, unit: "g" }
    ],
    steps: [
      "Snijd het broodje open",
      "Smeer mangochutney op het brood",
      "Beleg met geitenkaas en dunne plakjes rode ui",
      "Voeg rucola toe",
      "Serveer direct"
    ]
  },
  {
    id: "pita-falafel",
    title: "Pita falafel",
    description: "Pita with crispy falafel, hummus, tzatziki, and tomatoes",
    image: "https://images.unsplash.com/photo-1593000434042-e45a6bef4993?w=800&q=80",
    prepTime: 15,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "pita brood", amount: 1, unit: "" },
      { name: "falafel", amount: 4, unit: "" },
      { name: "hummus", amount: 3, unit: "el" },
      { name: "tzatziki", amount: 2, unit: "el" },
      { name: "tomaatjes", amount: 5, unit: "" }
    ],
    steps: [
      "Bak of verwarm de falafel",
      "Warm de pita op",
      "Smeer hummus in de pita",
      "Vul met falafel en tomaatjes",
      "Voeg tzatziki toe en serveer"
    ]
  },
  {
    id: "aged-cheese-cress-mustard",
    title: "Broodje oude kaas, tuinkers",
    description: "Aged cheese sandwich with garden cress and coarse mustard",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    prepTime: 5,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "oude kaas", amount: 60, unit: "g" },
      { name: "tuinkers", amount: 10, unit: "g" },
      { name: "grove mosterd", amount: 1, unit: "el" }
    ],
    steps: [
      "Snijd het broodje open",
      "Smeer grove mosterd op het brood",
      "Beleg met plakjes oude kaas",
      "Strooi tuinkers erover",
      "Serveer direct"
    ]
  },
  {
    id: "burrata-tomato-pesto",
    title: "Broodje burrata, tomaat, verse pesto",
    description: "Fresh burrata sandwich with tomato, homemade pesto, and basil",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "burrata", amount: 100, unit: "g" },
      { name: "tomaat", amount: 1, unit: "" },
      { name: "verse pesto", amount: 2, unit: "el" },
      { name: "basilicum", amount: 5, unit: "blaadjes" }
    ],
    steps: [
      "Snijd het broodje open",
      "Smeer pesto op het brood",
      "Snijd de tomaat in plakjes",
      "Beleg met tomaat en burrata",
      "Garneer met verse basilicum en serveer"
    ]
  },
  {
    id: "melted-brie-parma-ham",
    title: "Broodje gesmolten brie, paraham",
    description: "Melted brie sandwich with Parma ham, pesto, and arugula",
    image: "https://images.unsplash.com/photo-1621852004158-f3bc6b8e5e17?w=800&q=80",
    prepTime: 12,
    isVegan: false,
    isVegetarian: false,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "brie", amount: 80, unit: "g" },
      { name: "paraham", amount: 60, unit: "g" },
      { name: "pesto", amount: 1, unit: "el" },
      { name: "rucola", amount: 20, unit: "g" }
    ],
    steps: [
      "Snijd het broodje open",
      "Beleg met brie en paraham",
      "Warm op tot de brie gesmolten is",
      "Voeg pesto en rucola toe",
      "Serveer warm"
    ]
  },
  {
    id: "melted-brie-apple-honey",
    title: "Broodje gesmolten brie, appel, honing",
    description: "Melted brie sandwich with apple, honey, and walnuts",
    image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800&q=80",
    prepTime: 12,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "brie", amount: 80, unit: "g" },
      { name: "appel", amount: 0.5, unit: "" },
      { name: "honing", amount: 1, unit: "el" },
      { name: "walnoten", amount: 20, unit: "g" }
    ],
    steps: [
      "Snijd het broodje open",
      "Snijd de appel in dunne plakjes",
      "Beleg met brie en appel",
      "Warm op tot de brie gesmolten is",
      "Druppel honing erover, voeg walnoten toe en serveer"
    ]
  },
  {
    id: "goat-cheese-fig-apple",
    title: "Broodje geitenkaas, vijg, veldsla",
    description: "Goat cheese sandwich with fig, lamb's lettuce, and apple",
    image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "broodje", amount: 1, unit: "" },
      { name: "geitenkaas", amount: 60, unit: "g" },
      { name: "vijg", amount: 2, unit: "" },
      { name: "veldsla", amount: 20, unit: "g" },
      { name: "appel", amount: 0.5, unit: "" }
    ],
    steps: [
      "Snijd het broodje open",
      "Beleg met veldsla en geitenkaas",
      "Snijd vijgen en appel in plakjes",
      "Voeg vijgen en appel toe",
      "Serveer direct"
    ]
  },
  {
    id: "tosti-camembert-blueberry",
    title: "Tosti camembert, blauwe bessen",
    description: "Grilled cheese with camembert, blueberries, basil, and butter",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80",
    prepTime: 10,
    isVegan: false,
    isVegetarian: true,
    baseServings: 1,
    ingredients: [
      { name: "brood", amount: 2, unit: "sneden" },
      { name: "camembert", amount: 80, unit: "g" },
      { name: "blauwe bessen", amount: 40, unit: "g" },
      { name: "basilicum", amount: 5, unit: "blaadjes" },
      { name: "boter", amount: 15, unit: "g" }
    ],
    steps: [
      "Smeer boter aan de buitenkant van het brood",
      "Beleg met camembert en blauwe bessen",
      "Voeg basilicum toe",
      "Grill tot het brood krokant is en de kaas gesmolten",
      "Serveer warm"
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
