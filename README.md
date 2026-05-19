# FionaCLin.github.io — Static site

This repository contains a small static personal site. Recent changes refactor repeated header/nav/footer into partials and add a tiny JS include loader.

## What changed
- Extracted `partials/header.html`, `partials/nav.html`, `partials/footer.html`.
- Added `js/include.js` to inject partials into pages at runtime.
- Updated `index.html`, `archive.html`, `study.html`, `projects.html`, `layout.html` to use includes.

## Local testing
Serve the site from the repo root and open your browser at the port used:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment (GitHub Pages)
This repository is named `FionaCLin.github.io` so GitHub Pages will publish the `main` branch (or `master`) to `https://FionaCLin.github.io/` after you push. There is a `CNAME` file in the repo — keep it if you want a custom domain.

Steps to deploy:
```bash
git add -A
git commit -m "Deploy: update site"
git push origin main
```

If your repository publishes from a specific branch or directory adjust GitHub Pages settings accordingly.

## Notes
- The include loader (`js/include.js`) uses `fetch()` to load `partials/*.html`; this requires serving over HTTP (file:// won't work in many browsers).
- To further centralize, consider extracting the common `<head>` into a partial.
## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/Fiona-Lin/Fiona-Lin.github.io/edit/master/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/Fiona-Lin/Fiona-Lin.github.io/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
