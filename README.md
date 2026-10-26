# Personal website of Redouane Lguensat

Live at [redouanelg.github.io](https://redouanelg.github.io). Built with Jekyll on GitHub Pages, deployed from `main`.

- Content: `index.html` (home), `aboutMe.md`, `publications/`, `outreach/`, `news/`, and the data files in `_data/`
  (`research.yml` for the research themes, `publications.yml` for the most cited papers, `warming.csv` for the warming stripes).
- Design: `_layouts/`, `_includes/`, `assets/css/site.css` and `assets/js/site.js`.
- Groupe Sud IPSL page: `groupesudIPSL/` is a standalone page (its own HTML, CSS and JS, with D3 and the world map vendored in `lib/`).
  Its data, `groupesudIPSL/data/groupe_sud.json`, is rebuilt with `python3 scripts/build_groupe_sud.py` (the script isn't published on the site).
- Preview locally with `bundle exec jekyll serve` (Ruby 3.3).
