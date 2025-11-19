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
  },
  {
    id: "bao-buns",
    title: "Bao buns",
    description: "Zachte gestoomde broodjes met hartige vulling",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
    prepTime: 90,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "bakmeel", amount: 500, unit: "g" },
      { name: "gist", amount: 7, unit: "g" },
      { name: "suiker", amount: 50, unit: "g" },
      { name: "melk", amount: 250, unit: "ml" },
      { name: "varkensvlees", amount: 400, unit: "g" },
      { name: "hoisin saus", amount: 3, unit: "tbsp" },
      { name: "lente-ui", amount: 2, unit: "" },
      { name: "komkommer", amount: 1, unit: "" }
    ],
    steps: [
      "Maak deeg van meel, gist, suiker en melk",
      "Laat 1 uur rijzen",
      "Vorm 8 ronde broodjes en stoom 15 minuten",
      "Marineer vlees met hoisin saus en bak",
      "Snijd groenten fijn",
      "Vul bao buns met vlees en groenten"
    ]
  },
  {
    id: "tortillas",
    title: "Tortilla's",
    description: "Mexicaanse wraps met diverse vullingen",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    prepTime: 30,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "tortilla wraps", amount: 8, unit: "" },
      { name: "kipfilet", amount: 400, unit: "g" },
      { name: "paprika", amount: 2, unit: "" },
      { name: "ui", amount: 1, unit: "" },
      { name: "taco kruiden", amount: 2, unit: "tbsp" },
      { name: "kaas", amount: 150, unit: "g" },
      { name: "sla", amount: 100, unit: "g" },
      { name: "sour cream", amount: 150, unit: "ml" }
    ],
    steps: [
      "Snijd kip, paprika en ui in reepjes",
      "Bak kip met taco kruiden",
      "Voeg paprika en ui toe, bak mee",
      "Verwarm tortilla's",
      "Beleg met kip, groenten, kaas en sla",
      "Serveer met sour cream"
    ]
  },
  {
    id: "gyoza-soep-met-prei",
    title: "Gyoza soep met prei",
    description: "Aziatische soep met dumplings en prei",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80",
    prepTime: 35,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "gyoza", amount: 20, unit: "" },
      { name: "prei", amount: 2, unit: "" },
      { name: "kippenbouillon", amount: 1.5, unit: "l" },
      { name: "sojasaus", amount: 3, unit: "tbsp" },
      { name: "gember", amount: 20, unit: "g" },
      { name: "knoflook", amount: 3, unit: "teen" },
      { name: "sesamolie", amount: 1, unit: "tbsp" },
      { name: "lente-ui", amount: 2, unit: "" }
    ],
    steps: [
      "Snijd prei in ringen en bak aan in sesamolie",
      "Voeg knoflook en gember toe",
      "Giet bouillon erbij en breng aan de kook",
      "Voeg sojasaus toe",
      "Voeg gyoza toe en kook 8 minuten",
      "Garneer met lente-ui"
    ]
  },
  {
    id: "rode-curry-gyoza-soep",
    title: "Rode curry gyoza soep",
    description: "Pittige Thaise soep met gyoza",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    prepTime: 30,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "gyoza", amount: 20, unit: "" },
      { name: "rode currypasta", amount: 3, unit: "tbsp" },
      { name: "kokosmelk", amount: 400, unit: "ml" },
      { name: "groentebouillon", amount: 500, unit: "ml" },
      { name: "paprika", amount: 1, unit: "" },
      { name: "champignons", amount: 200, unit: "g" },
      { name: "vissaus", amount: 2, unit: "tbsp" },
      { name: "limoen", amount: 1, unit: "" }
    ],
    steps: [
      "Bak currypasta in olie",
      "Voeg kokosmelk en bouillon toe",
      "Snijd groenten en voeg toe",
      "Voeg vissaus toe en breng op smaak",
      "Voeg gyoza toe en kook 8 minuten",
      "Serveer met limoensap"
    ]
  },
  {
    id: "pokebowl",
    title: "Pokebowl",
    description: "Hawaiiaanse bowl met rauwe vis en groenten",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    prepTime: 25,
    isVegan: false,
    isVegetarian: false,
    baseServings: 2,
    ingredients: [
      { name: "sushi rijst", amount: 250, unit: "g" },
      { name: "verse zalm", amount: 300, unit: "g" },
      { name: "avocado", amount: 1, unit: "" },
      { name: "edamame", amount: 150, unit: "g" },
      { name: "komkommer", amount: 1, unit: "" },
      { name: "sojasaus", amount: 3, unit: "tbsp" },
      { name: "sesamzaad", amount: 2, unit: "tbsp" },
      { name: "zeewier", amount: 10, unit: "g" }
    ],
    steps: [
      "Kook de sushi rijst",
      "Snijd zalm in blokjes, marineer in sojasaus",
      "Snijd avocado, komkommer in plakjes",
      "Kook edamame",
      "Verdeel rijst over kommen",
      "Schik alle ingrediënten en garneer met sesamzaad"
    ]
  },
  {
    id: "gnocci-pompoen-spinazi-burrata",
    title: "Gnocci met pompoen, spinazi, pesto en burrata",
    description: "Romige gnocci met herfstgroenten en zachte kaas",
    image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&q=80",
    prepTime: 35,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "gnocchi", amount: 800, unit: "g" },
      { name: "pompoen", amount: 400, unit: "g" },
      { name: "spinazie", amount: 200, unit: "g" },
      { name: "pesto", amount: 4, unit: "tbsp" },
      { name: "burrata", amount: 250, unit: "g" },
      { name: "knoflook", amount: 2, unit: "teen" },
      { name: "room", amount: 200, unit: "ml" },
      { name: "pijnboompitten", amount: 30, unit: "g" }
    ],
    steps: [
      "Snijd pompoen in blokjes en rooster in oven",
      "Kook gnocchi volgens verpakking",
      "Bak knoflook, voeg spinazie toe",
      "Voeg room en pesto toe",
      "Meng gnocchi en pompoen erdoor",
      "Serveer met burrata en pijnboompitten"
    ]
  },
  {
    id: "pan-pizzas",
    title: "Pan pizza's",
    description: "Krokante pizza's gebakken in de pan",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    prepTime: 40,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "pizzadeeg", amount: 500, unit: "g" },
      { name: "tomatensaus", amount: 200, unit: "ml" },
      { name: "mozzarella", amount: 300, unit: "g" },
      { name: "champignons", amount: 150, unit: "g" },
      { name: "paprika", amount: 1, unit: "" },
      { name: "oregano", amount: 2, unit: "tsp" },
      { name: "olijfolie", amount: 3, unit: "tbsp" }
    ],
    steps: [
      "Verdeel deeg in 4 delen en rol uit",
      "Verhit olie in pan op middelhoog vuur",
      "Leg deeg in pan, bak 2 minuten",
      "Keer om, beleg met saus en toppings",
      "Dek af en bak 5 minuten tot kaas gesmolten is",
      "Herhaal voor andere pizza's"
    ]
  },
  {
    id: "ravioli-rode-bieten-gorgonzola",
    title: "Ravioli van rode bieten met gorgonzola",
    description: "Zelfgemaakte ravioli met aardse vulling",
    image: "https://images.unsplash.com/photo-1587740908075-9e5b2e00e2d8?w=800&q=80",
    prepTime: 75,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "pastadeeg", amount: 400, unit: "g" },
      { name: "gekookte rode bieten", amount: 300, unit: "g" },
      { name: "ricotta", amount: 200, unit: "g" },
      { name: "gorgonzola", amount: 100, unit: "g" },
      { name: "boter", amount: 80, unit: "g" },
      { name: "salie", amount: 10, unit: "g" },
      { name: "parmezaanse kaas", amount: 50, unit: "g" },
      { name: "walnoten", amount: 50, unit: "g" }
    ],
    steps: [
      "Pureer bieten met ricotta en gorgonzola",
      "Rol pastadeeg dun uit",
      "Verdeel vulling en maak ravioli",
      "Kook ravioli 3-4 minuten",
      "Smelt boter met salie",
      "Serveer ravioli met botersaus, parmezaan en walnoten"
    ]
  },
  {
    id: "prei-pasta-broodkruimels",
    title: "Prei pasta met geroosterde broodkruimels",
    description: "Simpele pasta met zachte prei en krokante topping",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    prepTime: 30,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "pasta", amount: 400, unit: "g" },
      { name: "prei", amount: 3, unit: "" },
      { name: "broodkruimels", amount: 100, unit: "g" },
      { name: "knoflook", amount: 3, unit: "teen" },
      { name: "boter", amount: 60, unit: "g" },
      { name: "room", amount: 200, unit: "ml" },
      { name: "parmezaanse kaas", amount: 80, unit: "g" },
      { name: "peterselie", amount: 20, unit: "g" }
    ],
    steps: [
      "Kook pasta volgens verpakking",
      "Snijd prei in ringen, bak zacht in boter",
      "Bak broodkruimels krokant in boter",
      "Voeg room en knoflook toe aan prei",
      "Meng pasta door preimengsel",
      "Serveer met broodkruimels en parmezaan"
    ]
  },
  {
    id: "pasta-witte-druif-camembert",
    title: "Pasta met witte druif en camembert",
    description: "Verfijnde pasta met zoete en romige smaken",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    prepTime: 25,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "pasta", amount: 400, unit: "g" },
      { name: "witte druiven", amount: 300, unit: "g" },
      { name: "camembert", amount: 250, unit: "g" },
      { name: "spinazie", amount: 150, unit: "g" },
      { name: "room", amount: 150, unit: "ml" },
      { name: "walnoten", amount: 60, unit: "g" },
      { name: "tijm", amount: 2, unit: "tsp" },
      { name: "honing", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Kook pasta volgens verpakking",
      "Halveer druiven",
      "Bak druiven met honing en tijm",
      "Voeg room en camembert toe, laat smelten",
      "Meng spinazie en pasta erdoor",
      "Garneer met geroosterde walnoten"
    ]
  },
  {
    id: "gevulde-zoete-aardappel",
    title: "Gevulde zoete aardappel",
    description: "Geroosterde zoete aardappel met hartige vulling",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80",
    prepTime: 50,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "zoete aardappelen", amount: 4, unit: "" },
      { name: "kikkererwten", amount: 400, unit: "g" },
      { name: "feta", amount: 150, unit: "g" },
      { name: "spinazie", amount: 200, unit: "g" },
      { name: "rode ui", amount: 1, unit: "" },
      { name: "knoflook", amount: 2, unit: "teen" },
      { name: "paprikapoeder", amount: 2, unit: "tsp" },
      { name: "yoghurt", amount: 150, unit: "ml" }
    ],
    steps: [
      "Prik zoete aardappelen in en bak 45 min op 200°C",
      "Spoel kikkererwten en kruid met paprikapoeder",
      "Rooster kikkererwten in oven",
      "Bak ui, knoflook en spinazie",
      "Snijd aardappelen open, vul met groenten en kikkererwten",
      "Top met feta en yoghurt"
    ]
  },
  {
    id: "pasta-gekarameliseerde-ui",
    title: "Pasta met gekarameliseerde ui",
    description: "Romige pasta met zoete, langzaam gebakken ui",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    prepTime: 45,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "pasta", amount: 400, unit: "g" },
      { name: "uien", amount: 5, unit: "" },
      { name: "boter", amount: 60, unit: "g" },
      { name: "room", amount: 200, unit: "ml" },
      { name: "balsamico azijn", amount: 2, unit: "tbsp" },
      { name: "suiker", amount: 1, unit: "tbsp" },
      { name: "tijm", amount: 2, unit: "tsp" },
      { name: "parmezaanse kaas", amount: 80, unit: "g" }
    ],
    steps: [
      "Snijd uien in ringen",
      "Bak uien 30 minuten op laag vuur met boter en suiker",
      "Voeg balsamico en tijm toe",
      "Kook pasta volgens verpakking",
      "Voeg room toe aan uien",
      "Meng pasta erdoor, serveer met parmezaan"
    ]
  },
  {
    id: "orzo-gochujang-aubergine",
    title: "Orzo met gochujang aubergine",
    description: "Pittige Koreaanse orzo met geroosterde aubergine",
    image: "https://images.unsplash.com/photo-1633436375436-5bb330c5b95a?w=800&q=80",
    prepTime: 40,
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "orzo", amount: 300, unit: "g" },
      { name: "aubergine", amount: 2, unit: "" },
      { name: "gochujang", amount: 3, unit: "tbsp" },
      { name: "sojasaus", amount: 2, unit: "tbsp" },
      { name: "sesamolie", amount: 2, unit: "tbsp" },
      { name: "honing", amount: 2, unit: "tbsp" },
      { name: "lente-ui", amount: 3, unit: "" },
      { name: "sesamzaad", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Snijd aubergine in blokjes",
      "Meng gochujang, sojasaus, honing en sesamolie",
      "Marineer aubergine en rooster 25 min op 200°C",
      "Kook orzo volgens verpakking",
      "Meng orzo en aubergine",
      "Garneer met lente-ui en sesamzaad"
    ]
  },
  {
    id: "pistache-pasta",
    title: "Pistache pasta",
    description: "Romige pasta met pistachenoten en kruiden",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    prepTime: 25,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "pasta", amount: 400, unit: "g" },
      { name: "pistachenoten", amount: 150, unit: "g" },
      { name: "basilicum", amount: 30, unit: "g" },
      { name: "knoflook", amount: 2, unit: "teen" },
      { name: "parmezaanse kaas", amount: 80, unit: "g" },
      { name: "room", amount: 150, unit: "ml" },
      { name: "citroen", amount: 1, unit: "" },
      { name: "olijfolie", amount: 4, unit: "tbsp" }
    ],
    steps: [
      "Kook pasta volgens verpakking",
      "Hak pistache grof, bewaar wat voor garnering",
      "Mix pistache, basilicum, knoflook en olie tot pesto",
      "Meng pasta met pesto en room",
      "Voeg citroen en parmezaan toe",
      "Garneer met hele pistachenoten"
    ]
  },
  {
    id: "koreaanse-soep",
    title: "Koreaanse soep",
    description: "Pittige Koreaanse soep met groenten",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    prepTime: 35,
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "groentebouillon", amount: 1.5, unit: "l" },
      { name: "gochugaru", amount: 2, unit: "tbsp" },
      { name: "gochujang", amount: 2, unit: "tbsp" },
      { name: "tofu", amount: 300, unit: "g" },
      { name: "champignons", amount: 200, unit: "g" },
      { name: "paksoi", amount: 300, unit: "g" },
      { name: "lente-ui", amount: 3, unit: "" },
      { name: "knoflook", amount: 4, unit: "teen" }
    ],
    steps: [
      "Breng bouillon aan de kook",
      "Voeg gochugaru en gochujang toe",
      "Snijd tofu in blokjes en voeg toe",
      "Voeg champignons en knoflook toe",
      "Voeg paksoi toe en kook 5 minuten",
      "Garneer met lente-ui"
    ]
  },
  {
    id: "tacos-pulled-paddos",
    title: "Taco's met pulled paddo's",
    description: "Vegetarische taco's met getrokken paddenstoelen",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    prepTime: 35,
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "oesterzwammen", amount: 400, unit: "g" },
      { name: "taco schelpen", amount: 12, unit: "" },
      { name: "taco kruiden", amount: 3, unit: "tbsp" },
      { name: "bbq saus", amount: 4, unit: "tbsp" },
      { name: "rode kool", amount: 200, unit: "g" },
      { name: "avocado", amount: 2, unit: "" },
      { name: "limoen", amount: 2, unit: "" },
      { name: "koriander", amount: 20, unit: "g" }
    ],
    steps: [
      "Scheur paddenstoelen in repen met vork",
      "Bak paddenstoelen met taco kruiden",
      "Voeg bbq saus toe en bak tot krokant",
      "Maak coleslaw van rode kool en limoen",
      "Verwarm taco schelpen",
      "Vul met paddenstoelen, coleslaw en avocado"
    ]
  },
  {
    id: "rijst-broccoli-sticky-chicken",
    title: "Rijst met broccoli en sticky chicken/tofu",
    description: "Aziatische rijst bowl met sticky proteïne",
    image: "https://images.unsplash.com/photo-1603073203011-2481d1bb2a8a?w=800&q=80",
    prepTime: 35,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "rijst", amount: 300, unit: "g" },
      { name: "kipfilet of tofu", amount: 500, unit: "g" },
      { name: "broccoli", amount: 400, unit: "g" },
      { name: "sojasaus", amount: 4, unit: "tbsp" },
      { name: "honing", amount: 3, unit: "tbsp" },
      { name: "knoflook", amount: 3, unit: "teen" },
      { name: "gember", amount: 20, unit: "g" },
      { name: "sesamzaad", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Kook rijst volgens verpakking",
      "Snijd kip/tofu in stukken",
      "Meng sojasaus, honing, knoflook en gember",
      "Bak kip/tofu, voeg saus toe en karamelliseer",
      "Stoom broccoli",
      "Serveer alles samen met sesamzaad"
    ]
  },
  {
    id: "tomatenorzo-pancetta-burrata",
    title: "Tomatenorzo met pancetta, courgette, burrata",
    description: "Romige tomatenorzo met Italiaanse toppings",
    image: "https://images.unsplash.com/photo-1633436375436-5bb330c5b95a?w=800&q=80",
    prepTime: 30,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "orzo", amount: 300, unit: "g" },
      { name: "pancetta", amount: 150, unit: "g" },
      { name: "courgette", amount: 2, unit: "" },
      { name: "burrata", amount: 250, unit: "g" },
      { name: "cherry tomaten", amount: 300, unit: "g" },
      { name: "tomatenpuree", amount: 3, unit: "tbsp" },
      { name: "knoflook", amount: 3, unit: "teen" },
      { name: "basilicum", amount: 20, unit: "g" }
    ],
    steps: [
      "Bak pancetta krokant",
      "Snijd courgette en bak mee",
      "Voeg knoflook en tomatenpuree toe",
      "Voeg orzo en bouillon toe, kook 10 minuten",
      "Halveer tomaten en voeg toe",
      "Serveer met burrata en basilicum"
    ]
  },
  {
    id: "shakshuka",
    title: "Shakshuka",
    description: "Noord-Afrikaans gerecht met eieren in tomatensaus",
    image: "https://images.unsplash.com/photo-1595908129746-8d0f0f6e7f02?w=800&q=80",
    prepTime: 35,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "eieren", amount: 6, unit: "" },
      { name: "tomatenblokjes", amount: 800, unit: "g" },
      { name: "paprika", amount: 2, unit: "" },
      { name: "ui", amount: 1, unit: "" },
      { name: "knoflook", amount: 4, unit: "teen" },
      { name: "komijn", amount: 2, unit: "tsp" },
      { name: "paprikapoeder", amount: 2, unit: "tsp" },
      { name: "feta", amount: 100, unit: "g" }
    ],
    steps: [
      "Snijd paprika en ui, bak in olijfolie",
      "Voeg knoflook en kruiden toe",
      "Voeg tomatenblokjes toe, laat 15 min sudderen",
      "Maak kuiltjes in de saus",
      "Breek eieren in de kuiltjes",
      "Dek af en laat 8 min stoven, serveer met feta"
    ]
  },
  {
    id: "watermeloen-steak-thee-rijst-bimi",
    title: "Watermeloen steak met thee-rijst en bimi",
    description: "Verrassend vegetarisch gerecht met gemarineerde watermeloen",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    prepTime: 45,
    isVegan: true,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "watermeloen", amount: 800, unit: "g" },
      { name: "rijst", amount: 300, unit: "g" },
      { name: "groene thee", amount: 2, unit: "zakje" },
      { name: "bimi", amount: 400, unit: "g" },
      { name: "sojasaus", amount: 4, unit: "tbsp" },
      { name: "sesamolie", amount: 2, unit: "tbsp" },
      { name: "knoflook", amount: 2, unit: "teen" },
      { name: "gember", amount: 20, unit: "g" }
    ],
    steps: [
      "Snijd watermeloen in dikke plakken",
      "Marineer in sojasaus, sesamolie, knoflook en gember",
      "Kook rijst in thee-water",
      "Grill watermeloen 4 min per kant",
      "Stoom of grill bimi",
      "Serveer samen met sesamzaad"
    ]
  },
  {
    id: "spitskool-misoboter-bieten-hummus",
    title: "Geroosterde spitskool met misoboter op rode bieten hummus",
    description: "Verfijnd vegetarisch gerecht met umami smaken",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    prepTime: 40,
    isVegan: false,
    isVegetarian: true,
    baseServings: 4,
    ingredients: [
      { name: "spitskool", amount: 2, unit: "" },
      { name: "boter", amount: 80, unit: "g" },
      { name: "miso pasta", amount: 3, unit: "tbsp" },
      { name: "gekookte rode bieten", amount: 300, unit: "g" },
      { name: "kikkererwten", amount: 400, unit: "g" },
      { name: "tahini", amount: 3, unit: "tbsp" },
      { name: "knoflook", amount: 2, unit: "teen" },
      { name: "citroen", amount: 1, unit: "" }
    ],
    steps: [
      "Halveer spitskolen, borstel met olie",
      "Rooster 25 min op 200°C",
      "Mix boter met miso tot misoboter",
      "Mix bieten, kikkererwten, tahini, knoflook en citroen tot hummus",
      "Smeer hummus op bord",
      "Leg spitskool erop en verdeel misoboter"
    ]
  },
  {
    id: "gnocci-spinazi-carbonara",
    title: "Gnocci met spinazi carbonara saus",
    description: "Romige gnocchi met klassieke carbonara en spinazie",
    image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&q=80",
    prepTime: 25,
    isVegan: false,
    isVegetarian: false,
    baseServings: 4,
    ingredients: [
      { name: "gnocchi", amount: 800, unit: "g" },
      { name: "pancetta", amount: 150, unit: "g" },
      { name: "spinazie", amount: 200, unit: "g" },
      { name: "eieren", amount: 3, unit: "" },
      { name: "eidooiers", amount: 2, unit: "" },
      { name: "parmezaanse kaas", amount: 100, unit: "g" },
      { name: "knoflook", amount: 2, unit: "teen" },
      { name: "zwarte peper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Bak pancetta krokant",
      "Kook gnocchi volgens verpakking",
      "Klop eieren, dooiers en parmezaan",
      "Voeg spinazie toe aan pancetta",
      "Meng warme gnocchi met eimengsel (van vuur)",
      "Voeg pancetta en spinazie toe, serveer met peper"
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
      category: 'dinner'
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
          Dinner Recipes
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

export default Dinner;
