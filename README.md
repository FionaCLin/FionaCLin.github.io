# Fiona Lin — portfolio site

This repository contains a static portfolio published with GitHub Pages. The main pages are plain HTML and CSS; there is no build step or package manager.

## Structure

- Root HTML files contain the portfolio pages.
- `partials/` contains the shared navigation, header, and footer.
- `js/include.js` loads those partials and marks the current page in the navigation.
- `Angular/Quiz/` is a separate AngularJS quiz with its own local assets.
- `CNAME` configures the custom domain for GitHub Pages.

## Local preview

Serve the repository root over HTTP so the browser can fetch the shared partials:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. Opening the HTML files directly with `file://` will prevent the partial loader from working.

## Deployment

GitHub Pages can publish this repository directly from its configured branch. Keep `CNAME` in the published root while using the custom domain. No Jekyll build or dependency installation is required.
