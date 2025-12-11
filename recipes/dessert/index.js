// Category index for dessert recipes
// This file automatically loads all dessert recipes and renders them

window.dessertRecipes = [
  'banana-bread',
  'pistache-beschuittaart',
  'appel-peer-plaattaart',
  'gestoofde-peertjes',
  'lemon-posset',
  'spiced-chai-worteltaart'
];

// Dynamically load all recipe scripts
window.dessertRecipes.forEach(recipeId => {
  const script = document.createElement('script');
  script.src = `recipes/dessert/${recipeId}.js`;
  document.head.appendChild(script);
});

// Wait for scripts to load, then render cards
function loadDessertRecipes() {
  // Check if all recipes are loaded
  const allLoaded = window.dessertRecipes.every(id => window.recipes && window.recipes[id]);
  
  if (allLoaded) {
    renderCategoryRecipes(window.dessertRecipes);
  } else {
    // Retry after a short delay
    setTimeout(loadDessertRecipes, 50);
  }
}

// Start loading after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadDessertRecipes, 100);
  });
} else {
  setTimeout(loadDessertRecipes, 100);
}

