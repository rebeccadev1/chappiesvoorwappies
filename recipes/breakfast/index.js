// Category index for breakfast recipes
// This file automatically loads all breakfast recipes and renders them

window.breakfastRecipes = [
  'american-pancakes',
  'turkish-eggs'
];

// Dynamically load all recipe scripts
window.breakfastRecipes.forEach(recipeId => {
  const script = document.createElement('script');
  script.src = `recipes/breakfast/${recipeId}.js`;
  document.head.appendChild(script);
});

// Wait for scripts to load, then render cards
function loadBreakfastRecipes() {
  // Check if all recipes are loaded
  const allLoaded = window.breakfastRecipes.every(id => window.recipes && window.recipes[id]);
  
  if (allLoaded) {
    renderCategoryRecipes(window.breakfastRecipes);
  } else {
    // Retry after a short delay
    setTimeout(loadBreakfastRecipes, 50);
  }
}

// Start loading after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadBreakfastRecipes, 100);
  });
} else {
  setTimeout(loadBreakfastRecipes, 100);
}

