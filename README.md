# Tiles Up — site

Website for Tiles Up, a family-run kitchen and bath showroom at
620 Walt Whitman Rd, Melville, NY 11747.

Plain static site: no build step, no framework. Open `index.html` in a
browser, or serve the folder with anything (`python3 -m http.server`).

Live at https://tilesup.higgsfield.app — deployed from a copy of these
files (Higgsfield website hosting serves them from its static asset
layer). To update the live site, push changes here first, then copy
`index.html`, `css/`, `js/` and `img/` into the hosting project's
`app/public/` and redeploy.

## Layout

- `index.html` — the whole site (single page)
- `css/style.css` — styles
- `js/main.js` — mobile nav, scroll reveal, footer year
- `img/` — photography (JPEG) plus the favicon

## Images

The photography in `img/` is committed by the "Fetch site images"
workflow (`.github/workflows/fetch-images.yml`), which downloads the
source files, resizes them for the web, and pushes the JPEGs. Re-run it
from the Actions tab if the source list changes. To swap in real store
and project photos later, just replace the files in `img/` and keep the
same names.

## Updating business info

Phone, address and hours appear in three places: the top bar, the visit
section, and the footer. The structured data block (`application/ld+json`
in the `<head>`) should be kept in sync — search engines read it.
