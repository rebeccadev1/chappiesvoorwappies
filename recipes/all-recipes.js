// Load all recipes from all categories for global search and favorites
// This file automatically loads all category index files

window.allRecipeIds = [];

// Define favorites recipe IDs (these will be rendered in the favorites section)
window.favoriteRecipeIds = [
  'turkish-eggs',
  'rode-curry-gyoza-soep',
  'bao-buns',
  'pistache-beschuittaart'
];

// Track loaded categories
let loadedCategories = 0;
const totalCategories = 5;

// Function to check if we should render favorites
function checkAndRenderFavorites() {
  loadedCategories++;
  if (loadedCategories === totalCategories) {
    // All category index files loaded, wait a bit for recipes to register
    setTimeout(() => {
      if (window.renderFavorites) {
        window.renderFavorites(window.favoriteRecipeIds);
      }
    }, 300);
  }
}

// Load all category index files
const categories = ['breakfast', 'lunch', 'dinner', 'dessert', 'snacks'];

categories.forEach(category => {
  const script = document.createElement('script');
  script.src = `recipes/${category}/index.js`;
  script.onload = () => {
    // Collect recipe IDs from each category
    const categoryRecipes = window[`${category}Recipes`] || [];
    window.allRecipeIds = [...window.allRecipeIds, ...categoryRecipes];
    checkAndRenderFavorites();
  };
  script.onerror = () => {
    // Even if a category fails to load, count it
    checkAndRenderFavorites();
  };
  document.head.appendChild(script);
});

