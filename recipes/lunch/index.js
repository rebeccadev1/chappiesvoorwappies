// Category index for lunch recipes
// This file automatically loads all lunch recipes and renders them

window.lunchRecipes = [
  'simple-baguette',
  'caramelized-onion-hazelnut-soup',
  'pita-crispy-chicken',
  'smoked-chicken-mango-curry',
  'smoked-chicken-avocado-truffle',
  'spicy-chicken-boost',
  'chicken-melt',
  'roast-beef-truffle',
  'carpaccio-truffle',
  'pastrami-horseradish',
  'blt-boosty',
  'parma-ham-mozzarella-tapenade',
  'ricotta-pesto-vegetables',
  'grilled-pear-goat-cheese',
  'goat-cheese-mango-chutney',
  'pita-falafel',
  'aged-cheese-cress-mustard',
  'burrata-tomato-pesto',
  'melted-brie-parma-ham',
  'melted-brie-apple-honey',
  'goat-cheese-fig-apple',
  'tosti-camembert-blueberry'
];

// Dynamically load all recipe scripts
window.lunchRecipes.forEach(recipeId => {
  const script = document.createElement('script');
  script.src = `recipes/lunch/${recipeId}.js`;
  document.head.appendChild(script);
});

// Wait for scripts to load, then render cards
function loadLunchRecipes() {
  // Check if all recipes are loaded
  const allLoaded = window.lunchRecipes.every(id => window.recipes && window.recipes[id]);
  
  if (allLoaded) {
    renderCategoryRecipes(window.lunchRecipes);
  } else {
    // Retry after a short delay
    setTimeout(loadLunchRecipes, 50);
  }
}

// Start loading after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadLunchRecipes, 100);
  });
} else {
  setTimeout(loadLunchRecipes, 100);
}

