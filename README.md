# Chappies voor Wappies

A static recipe site by Rebecca Jekel.

## How it works

- **Pages**: `index.html` plus category pages (`breakfast.html`, `lunch.html`, etc.)
- **Recipes**: one file per recipe in `recipes/<category>/`
- **UI logic**: `scripts.js` (search, modals, serving scaling)
- **Styling**: `styles.css`
- **Images**: `images/`

## Adding a recipe

1. Create `recipes/<category>/<recipe-id>.js` using an existing recipe as a template.
2. Add `<recipe-id>` to the list in `recipes/<category>/index.js`.

## Run locally

Open `index.html` in your browser, or use a simple static server:

```sh
npx serve .
```

## Deploy

The site deploys to GitHub Pages on push to `main` via `.github/workflows/static.yml`.
