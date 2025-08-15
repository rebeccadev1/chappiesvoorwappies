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
  if (search) search.addEventListener("input", filterRecipes);
});

/* ========== SEARCH (filters the cards on THIS page) ========== */
function filterRecipes() {
  const term = (document.getElementById("search-input")?.value || "").toLowerCase();
  const grid = document.querySelector(".card-grid");
  if (!grid) return;

  const cards = grid.querySelectorAll(".recipe-card");
  cards.forEach(card => {
    const titleText = card.querySelector("h3")?.textContent || "";
    const nameAttr = card.getAttribute("data-name") || "";
    const haystack = (titleText + " " + nameAttr).toLowerCase();
    card.style.display = haystack.includes(term) ? "block" : "none";
  });
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

  detail.innerHTML = `
    <h2>${r.title}</h2>
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

/* ========== EXPOSE FOR INLINE HTML ========== */
window.openRecipe = openRecipe;
window.closeRecipe = closeRecipe;
window.goHome     = goHome;
window.filterRecipes = filterRecipes;
