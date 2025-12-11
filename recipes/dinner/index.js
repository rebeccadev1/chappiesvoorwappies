// Category index for dinner recipes
// This file automatically loads all dinner recipes and renders them

window.dinnerRecipes = [
  'bao-buns',
  'tortillas',
  'gyoza-soep-met-prei',
  'rode-curry-gyoza-soep',
  'pokebowl',
  'gnocci-pompoen-spinazi-burrata',
  'pan-pizzas',
  'ravioli-rode-bieten-gorgonzola',
  'prei-pasta-broodkruimels',
  'pasta-witte-druif-camembert',
  'gevulde-zoete-aardappel',
  'pasta-gekarameliseerde-ui',
  'orzo-gochujang-aubergine',
  'pistache-pasta',
  'koreaanse-soep',
  'tacos-pulled-paddos',
  'rijst-broccoli-sticky-chicken',
  'tomatenorzo-pancetta-burrata',
  'shakshuka',
  'watermeloen-steak-thee-rijst-bimi',
  'spitskool-misoboter-bieten-hummus',
  'gnocci-spinazi-carbonara'
];

// Dynamically load all recipe scripts
window.dinnerRecipes.forEach(recipeId => {
  const script = document.createElement('script');
  script.src = `recipes/dinner/${recipeId}.js`;
  document.head.appendChild(script);
});

// Wait for scripts to load, then render cards
function loadDinnerRecipes() {
  // Check if all recipes are loaded
  const allLoaded = window.dinnerRecipes.every(id => window.recipes && window.recipes[id]);
  
  if (allLoaded) {
    renderCategoryRecipes(window.dinnerRecipes);
  } else {
    // Retry after a short delay
    setTimeout(loadDinnerRecipes, 50);
  }
}

// Start loading after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadDinnerRecipes, 100);
  });
} else {
  setTimeout(loadDinnerRecipes, 100);
}

