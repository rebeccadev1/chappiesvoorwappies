// Category index for snack recipes
// This file automatically loads all snack recipes and renders them

window.snacksRecipes = [
  'snacks-hummus',
  'snacks-nachos',
  'snacks-snackbordje-doperwten',
  'snacks-chocolate-chip-cookies'
];

// Dynamically load all recipe scripts
window.snacksRecipes.forEach(recipeId => {
  const script = document.createElement('script');
  script.src = `recipes/snacks/${recipeId}.js`;
  document.head.appendChild(script);
});

// Wait for scripts to load, then render cards
function loadSnacksRecipes() {
  // Check if all recipes are loaded
  const allLoaded = window.snacksRecipes.every(id => window.recipes && window.recipes[id]);
  
  if (allLoaded) {
    renderCategoryRecipes(window.snacksRecipes);
  } else {
    // Retry after a short delay
    setTimeout(loadSnacksRecipes, 50);
  }
}

// Start loading after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadSnacksRecipes, 100);
  });
} else {
  setTimeout(loadSnacksRecipes, 100);
}

