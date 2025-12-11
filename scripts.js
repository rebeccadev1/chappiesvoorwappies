/*********************************************************
 * Chappies voor Wappies — Core JS (no recipe data here)
 * Each recipe lives in its own file, e.g. recipes/dinner/dinner1.js
 * which does:  window.recipes["dinner1"] = { ... }
 **********************************************************/

/* Global registry that recipe files will add into */
window.recipes = window.recipes || {};

/* ========== INIT ========== */
document.addEventListener("DOMContentLoaded", () => {
  // Wire up search if present
  const search = document.getElementById("search-input");
  if (search) {
    // Check if we're on homepage (has hero-search-input class)
    if (search.classList.contains("hero-search-input")) {
      search.addEventListener("input", handleGlobalSearch);
    } else {
      search.addEventListener("input", filterRecipes);
    }
  }
});

/* ========== SEARCH (filters the cards on THIS page) ========== */
function filterRecipes() {
  const term = (document.getElementById("search-input")?.value || "").toLowerCase();
  const grid = document.querySelector(".card-grid");
  if (!grid) return;

  const cards = grid.querySelectorAll(".recipe-card");
  let visibleCount = 0;
  cards.forEach(card => {
    const titleText = card.querySelector("h3")?.textContent || "";
    const nameAttr = card.getAttribute("data-name") || "";
    const haystack = (titleText + " " + nameAttr).toLowerCase();
    const matches = haystack.includes(term);
    card.style.display = matches ? "block" : "none";
    if (matches) visibleCount++;
  });

  const msg = document.getElementById("no-results");
  if (msg) {
    msg.style.display = visibleCount === 0 && term ? "block" : "none";
  }
}

/* ========== MODAL RECIPE VIEW ========== */
function openRecipe(id) {
  const r = window.recipes[id];
  if (!r) return;

  const modal  = document.getElementById("recipe-modal");
  if (!modal) return;

  const detail = modal.querySelector("#recipe-detail");
  if (!detail) return;

  const personsDefault = r.defaultServings ?? 4;

  const ingList = (r.ingredients || [])
    .map(ing => {
      const base = Number(ing.amount) || 0;
      const unit = ing.unit ? ` ${ing.unit}` : "";
      return `<li><span class="qty" data-base="${base}" data-unit="${ing.unit || ""}">${formatQty(base)}${unit}</span> ${ing.name}</li>`;
    })
    .join("");

  const stepsList = (r.steps || [])
    .map(step => `<li>${step}</li>`)
    .join("");

  const metaChips = [];
  if (r.time) {
    metaChips.push(`<span class="badge badge-time">${r.time}</span>`);
  }
  if (r.difficulty) {
    metaChips.push(`<span class="badge badge-diff">${r.difficulty}</span>`);
  }
  if (Array.isArray(r.tags)) {
    r.tags.forEach(tag => {
      metaChips.push(`<span class="badge badge-tag">${tag}</span>`);
    });
  }

  detail.innerHTML = `
    <h2>${r.title}</h2>
    ${metaChips.length ? `<div class="recipe-meta">${metaChips.join("")}</div>` : ""}
    ${r.image ? `<img src="${r.image}" alt="${r.title}">` : ""}
    <label style="display:block; margin-top:10px;">
      Number of persons:
      <input type="number" id="person-count" value="${personsDefault}" min="1" />
    </label>

    <h3>Ingredients</h3>
    <ul class="ingredients">${ingList}</ul>

    <h3>Steps</h3>
    <ol class="steps">${stepsList}</ol>

    ${r.video ? `<h3>Video</h3><iframe width="100%" height="315" src="${r.video}" frameborder="0" allowfullscreen></iframe>` : ""}
  `;

  // Show modal & blur page
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  // Backdrop click closes
  const onBackdrop = (e) => { if (e.target === modal) closeRecipe(); };
  modal.addEventListener("click", onBackdrop, { once: true });

  // ESC key closes
  const onEsc = (e) => { if (e.key === "Escape") closeRecipe(); };
  document.addEventListener("keydown", onEsc, { once: true });

  // Hook up servings scaling
  const input = document.getElementById("person-count");
  if (input) {
    input.addEventListener("input", () => {
      const persons = Math.max(1, parseInt(input.value, 10) || personsDefault);
      scaleIngredients(personsDefault, persons);
    });
    // initial render
    scaleIngredients(personsDefault, personsDefault);
  }
}

function closeRecipe() {
  const modal  = document.getElementById("recipe-modal");
  const detail = modal ? modal.querySelector("#recipe-detail") : null;

  if (detail) detail.innerHTML = "";
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("modal-open");
}

/* ========== SERVINGS SCALING HELPERS ========== */
function scaleIngredients(defaultServings, persons) {
  const spans = document.querySelectorAll(".qty");
  spans.forEach(span => {
    const base = Number(span.getAttribute("data-base")) || 0;
    const unit = span.getAttribute("data-unit") || "";
    const scaled = base * (persons / defaultServings);
    span.textContent = `${formatQty(scaled)}${unit ? " " + unit : ""}`;
  });
}

function formatQty(val) {
  const rounded = Math.round(val * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/\.?0+$/,'');
}

/* ========== OPTIONAL NAV HELPERS ========== */
function goHome() { window.location.href = "index.html"; }

/* ========== GLOBAL SEARCH (Homepage) ========== */
function handleGlobalSearch() {
  const term = (document.getElementById("search-input")?.value || "").toLowerCase().trim();
  const searchResults = document.getElementById("search-results");
  const noResults = document.getElementById("no-results");
  const categoriesSection = document.getElementById("categories-section");
  const favoritesSection = document.getElementById("favorites-section");
  const clearBtn = document.getElementById("clear-search");

  // Show/hide clear button
  if (clearBtn) {
    clearBtn.style.display = term ? "block" : "none";
  }

  if (!term) {
    // No search term - show categories and favorites
    if (searchResults) searchResults.style.display = "none";
    if (noResults) noResults.style.display = "none";
    if (categoriesSection) categoriesSection.style.display = "block";
    if (favoritesSection) favoritesSection.style.display = "block";
    return;
  }

  // Hide categories and favorites when searching
  if (categoriesSection) categoriesSection.style.display = "none";
  if (favoritesSection) favoritesSection.style.display = "none";

  // Search through all recipes
  const matchingRecipes = [];
  for (const id in window.recipes) {
    const recipe = window.recipes[id];
    const title = (recipe.title || "").toLowerCase();
    const ingredients = (recipe.ingredients || [])
      .map(ing => ing.name.toLowerCase())
      .join(" ");
    const tags = (recipe.tags || []).join(" ").toLowerCase();
    
    if (title.includes(term) || ingredients.includes(term) || tags.includes(term)) {
      matchingRecipes.push({ id, ...recipe });
    }
  }

  // Display results
  if (searchResults) {
    if (matchingRecipes.length > 0) {
      searchResults.innerHTML = matchingRecipes.map(recipe => {
        const metaChips = [];
        if (recipe.time) {
          metaChips.push(`<span class="badge badge-time">${recipe.time}</span>`);
        }
        if (recipe.difficulty) {
          metaChips.push(`<span class="badge badge-diff">${recipe.difficulty}</span>`);
        }
        if (Array.isArray(recipe.tags)) {
          recipe.tags.forEach(tag => {
            metaChips.push(`<span class="badge badge-tag">${tag}</span>`);
          });
        }

        return `
          <div class="recipe-card" onclick="openRecipe('${recipe.id}')">
            <div class="recipe-image">
              <img src="${recipe.image || ''}" alt="${recipe.title}">
            </div>
            <div class="recipe-content">
              <h3>${recipe.title}</h3>
              ${metaChips.length ? `<div class="recipe-meta">${metaChips.join("")}</div>` : ""}
            </div>
          </div>
        `;
      }).join("");
      searchResults.style.display = "grid";
      if (noResults) noResults.style.display = "none";
    } else {
      searchResults.style.display = "none";
      if (noResults) noResults.style.display = "block";
    }
  }
}

function clearSearch() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = "";
    handleGlobalSearch();
    searchInput.focus();
  }
}

/* ========== DYNAMIC CARD RENDERING ========== */
function renderRecipeCard(recipeId, recipe) {
  if (!recipe) return '';

  const metaChips = [];
  if (recipe.time) {
    metaChips.push(`<span class="badge badge-time">${recipe.time}</span>`);
  }
  if (recipe.difficulty) {
    metaChips.push(`<span class="badge badge-diff">${recipe.difficulty}</span>`);
  }
  if (Array.isArray(recipe.tags)) {
    recipe.tags.forEach(tag => {
      // Check if tag should be soft (like "Veggie", "Vegan")
      const isSoftTag = ['Veggie', 'Vegan'].includes(tag);
      const badgeClass = isSoftTag ? 'badge-soft badge badge-tag' : 'badge badge-tag';
      metaChips.push(`<span class="${badgeClass}">${tag}</span>`);
    });
  }

  return `
    <div class="recipe-card" data-name="${recipe.title}" onclick="openRecipe('${recipeId}')">
      ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}">` : ''}
      <h3>${recipe.title}</h3>
      ${metaChips.length ? `<div class="recipe-meta">${metaChips.join("")}</div>` : ''}
    </div>
  `;
}

function renderCategoryRecipes(recipeIds) {
  const grid = document.querySelector(".card-grid");
  if (!grid) return;

  // Clear existing cards (but keep structure)
  grid.innerHTML = '';

  // Render cards for each recipe
  recipeIds.forEach(recipeId => {
    const recipe = window.recipes[recipeId];
    if (recipe) {
      const cardHtml = renderRecipeCard(recipeId, recipe);
      grid.insertAdjacentHTML('beforeend', cardHtml);
    }
  });
}

function renderFavoritesCard(recipeId, recipe) {
  if (!recipe) return '';

  const metaChips = [];
  if (recipe.time) {
    metaChips.push(`<span class="badge badge-time">${recipe.time}</span>`);
  }
  if (recipe.difficulty) {
    metaChips.push(`<span class="badge badge-diff">${recipe.difficulty}</span>`);
  }
  if (Array.isArray(recipe.tags)) {
    recipe.tags.forEach(tag => {
      // Check if tag should be soft (like "Veggie", "Vegan")
      const isSoftTag = ['Veggie', 'Vegan'].includes(tag);
      const badgeClass = isSoftTag ? 'badge-soft badge badge-tag' : 'badge badge-tag';
      metaChips.push(`<span class="${badgeClass}">${tag}</span>`);
    });
  }

  return `
    <div class="recipe-card" onclick="openRecipe('${recipeId}')">
      <div class="recipe-image">
        ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}">` : ''}
      </div>
      <div class="recipe-content">
        <h3>${recipe.title}</h3>
        ${metaChips.length ? `<div class="recipe-meta">${metaChips.join("")}</div>` : ''}
      </div>
    </div>
  `;
}

function renderFavorites(recipeIds) {
  const favoritesGrid = document.querySelector('.favorites-grid');
  if (!favoritesGrid) return;
  
  favoritesGrid.innerHTML = '';
  
  (recipeIds || window.favoriteRecipeIds || []).forEach(recipeId => {
    const recipe = window.recipes[recipeId];
    if (recipe) {
      const cardHtml = renderFavoritesCard(recipeId, recipe);
      favoritesGrid.insertAdjacentHTML('beforeend', cardHtml);
    }
  });
}

/* ========== EXPOSE FOR INLINE HTML ========== */
window.openRecipe = openRecipe;
window.closeRecipe = closeRecipe;
window.goHome     = goHome;
window.filterRecipes = filterRecipes;
window.handleGlobalSearch = handleGlobalSearch;
window.clearSearch = clearSearch;
window.renderCategoryRecipes = renderCategoryRecipes;
window.renderRecipeCard = renderRecipeCard;
window.renderFavorites = renderFavorites;
window.renderFavoritesCard = renderFavoritesCard;
