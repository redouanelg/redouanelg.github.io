// Groupe Sud IPSL: draggable globe of IPSL collaborations with "pays du Sud".
// Data: data/groupe_sud.json (built by scripts/build_groupe_sud.py from OpenAlex).
(() => {
  'use strict';

  const I18N = {
    fr: {
      brand: 'Groupe Sud IPSL',
      title: 'Groupe Sud IPSL',
      lead: d => `Le groupe de travail de l'Institut Pierre-Simon Laplace consacré aux pays du Sud. Depuis ${d.since}, <strong>${d.people} chercheurs et chercheuses de l'IPSL</strong> ont cosigné <strong>${d.papers} publications</strong> avec des partenaires de <strong>${d.countries} pays</strong> de la zone intertropicale et méditerranéenne.`,
      hint: 'Faites tourner le globe et cliquez sur un pays, ou cherchez-le par son nom. Ctrl + molette pour zoomer.',
      hintTouch: 'Faites tourner le globe et touchez un pays, ou cherchez-le par son nom.',
      searchLabel: 'Rechercher un pays', searchPlaceholder: 'Rechercher un pays',
      regionsLabel: 'Aller à une région', labsLabel: 'Laboratoires', allLabs: 'Tous',
      globeLabel: 'Globe des pays du Sud partenaires des laboratoires IPSL',
      zoomIn: 'Zoomer', zoomOut: 'Dézoomer', reset: 'Recentrer le globe',
      legendRamp: 'Chercheurs IPSL par pays', legendNone: 'Pays du Sud sans lien recensé',
      rankingTitle: 'Les pays les plus connectés', rankingNote: 'Nombre de chercheurs et chercheuses IPSL par pays.',
      back: 'Voir tous les pays',
      figures: (p, n) => `<b>${p}</b> chercheur${p > 1 ? 's' : ''} IPSL${n === null ? '' : `, <b>${n}</b> publication${n > 1 ? 's' : ''} commune${n > 1 ? 's' : ''}`}`,
      peopleTitle: 'Chercheurs et chercheuses IPSL',
      paperCount: n => `${n} publication${n > 1 ? 's' : ''}`,
      examples: 'Publications', filterNames: 'Filtrer par nom',
      none: 'Aucun lien ne répond aux critères pour ce pays : il faut au moins deux publications communes.',
      noneLab: 'Aucun lien recensé pour ce laboratoire dans ce pays.',
      income: { LIC: 'pays à faible revenu', LMC: 'revenu intermédiaire inférieur', UMC: 'revenu intermédiaire supérieur' },
      regions: { africa: 'Afrique subsaharienne', americas: 'Amérique latine et Caraïbes', mena: 'Afrique du Nord et Moyen-Orient', south_asia: 'Asie du Sud', asia_pacific: 'Asie du Sud-Est et Pacifique' },
      methodTitle: 'Comment ce globe est construit',
      method: d => `
        <p>Les liens sont établis automatiquement à partir des publications indexées dans <a href="https://openalex.org" target="_blank" rel="noopener">OpenAlex</a>. Cette liste est indicative : elle dépend de la qualité des affiliations, peut oublier des personnes ou confondre des homonymes, et ne constitue pas un annuaire officiel de l'IPSL. Dernière mise à jour le ${d.generated}.</p>
        <dl>
          <dt>Publications</dt><dd>Articles, revues, prépublications, chapitres, ouvrages, actes de conférence et data papers publiés depuis le ${d.since}, avec au moins un auteur ou une autrice des laboratoires ${d.labs}.</dd>
          <dt>Pays du Sud</dt><dd>Comme pour l'IRD, les pays de la zone intertropicale et méditerranéenne : pays à faible revenu et à revenu intermédiaire (Banque mondiale) d'Afrique, d'Amérique latine et des Caraïbes, d'Asie du Sud et du Sud-Est, du Pacifique, d'Afrique du Nord et du Moyen-Orient.</dd>
          <dt>Lien avec un pays</dt><dd>Au moins ${d.min} publications cosignées avec une personne affiliée à une institution du pays. Les publications de plus de ${d.max} auteurs (grands consortiums) ne comptent pas.</dd>
        </dl>`,
      footerTag: "Groupe de travail Sud de l'Institut Pierre-Simon Laplace", footerData: 'données', footerShapes: 'frontières',
    },
    en: {
      brand: 'Groupe Sud IPSL',
      title: 'Global South Working Group of IPSL',
      lead: d => `The working group of the Institut Pierre-Simon Laplace dedicated to Global South countries. Since ${d.since}, <strong>${d.people} IPSL researchers</strong> have co-authored <strong>${d.papers} publications</strong> with partners in <strong>${d.countries} countries</strong> of the intertropical and Mediterranean zone.`,
      hint: 'Turn the globe and click a country, or search for it by name. Ctrl + scroll to zoom.',
      hintTouch: 'Turn the globe and tap a country, or search for it by name.',
      searchLabel: 'Search for a country', searchPlaceholder: 'Search for a country',
      regionsLabel: 'Go to a region', labsLabel: 'Laboratories', allLabs: 'All',
      globeLabel: 'Globe of Global South countries partnering with IPSL laboratories',
      zoomIn: 'Zoom in', zoomOut: 'Zoom out', reset: 'Reset the globe',
      legendRamp: 'IPSL researchers per country', legendNone: 'Global South country, no recorded link',
      rankingTitle: 'Most connected countries', rankingNote: 'Number of IPSL researchers per country.',
      back: 'See all countries',
      figures: (p, n) => `<b>${p}</b> IPSL researcher${p > 1 ? 's' : ''}${n === null ? '' : `, <b>${n}</b> joint publication${n > 1 ? 's' : ''}`}`,
      peopleTitle: 'IPSL researchers',
      paperCount: n => `${n} publication${n > 1 ? 's' : ''}`,
      examples: 'Publications', filterNames: 'Filter by name',
      none: 'No link meets the criteria for this country: at least two joint publications are needed.',
      noneLab: 'No recorded link for this laboratory in this country.',
      income: { LIC: 'low income', LMC: 'lower-middle income', UMC: 'upper-middle income' },
      regions: { africa: 'Sub-Saharan Africa', americas: 'Latin America and the Caribbean', mena: 'Middle East and North Africa', south_asia: 'South Asia', asia_pacific: 'Southeast Asia and the Pacific' },
      methodTitle: 'How this globe is built',
      method: d => `
        <p>Links are derived automatically from publications indexed in <a href="https://openalex.org" target="_blank" rel="noopener">OpenAlex</a>. The list is indicative: it depends on the quality of affiliations, may miss people or merge namesakes, and is not an official IPSL directory. Last updated ${d.generated}.</p>
        <dl>
          <dt>Publications</dt><dd>Articles, reviews, preprints, book chapters, books, conference papers and data papers published since ${d.since}, with at least one author from the ${d.labs} laboratories.</dd>
          <dt>Global South</dt><dd>Following IRD, countries of the intertropical and Mediterranean zone: low and middle-income countries (World Bank) in Africa, Latin America and the Caribbean, South and Southeast Asia, the Pacific, North Africa and the Middle East.</dd>
          <dt>Link with a country</dt><dd>At least ${d.min} publications co-authored with someone affiliated with an institution in the country. Publications with more than ${d.max} authors (large consortia) don't count.</dd>
        </dl>`,
      footerTag: 'Global South Working Group of the Institut Pierre-Simon Laplace', footerData: 'data', footerShapes: 'borders',
    },
  };

  // Researchers per country, from the light teal to the dominant blue of the ipsl.fr palette
  const BINS = [1, 3, 6, 11, 26];
  const COLORS = ['#b6ece9', '#6fd6d1', '#0db9b5', '#1c9390', '#0a465e'];
  const NO_LINK = '#cdd6da', OTHER = '#eceff1', BORDER = '#ffffff';
  const LAB_COLORS = { LSCE: '#d1495b', LOCEAN: '#1f7d87', LMD: '#3d6fb6', LATMOS: '#7a5aa6', LISA: '#e07a3f', GEOPS: '#b08d1a', METIS: '#4d8a3a', CEREA: '#c2458f', IPSL: '#6d8590' };
  const REGION_VIEWS = { africa: [[-18, 2], 1.5], americas: [[65, 12], 1.35], mena: [[-22, -28], 1.7], south_asia: [[-78, -22], 1.9], asia_pacific: [[-125, 2], 1.4] };
  const START_ROTATION = [-12, -6, 0];
  // Start zoomed out with space around the globe, so it reads as an object you can turn and zoom into
  const START_ZOOM = .62, MIN_ZOOM = .55, MAX_ZOOM = 8;
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lang = 'fr';
  try { lang = localStorage.getItem('gs-lang') || ((navigator.language || 'fr').startsWith('fr') ? 'fr' : 'en'); } catch (e) {}
  let data, countries, features, borders, featureByIso = new Map(), isoByFeature = new Map();
  let lab = 'all', selected = null, hovered = null;
  let rotation = START_ROTATION.slice(), zoom = START_ZOOM;

  const $ = s => document.querySelector(s);
  const canvas = $('#globe'), ctx = canvas.getContext('2d'), tooltip = $('#tooltip'), panel = $('#panel');
  const projection = d3.geoOrthographic().clipAngle(90);
  const path = d3.geoPath(projection, ctx);
  const graticule = d3.geoGraticule10();
  let width = 0;

  const t = () => I18N[lang];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const locale = () => (lang === 'fr' ? 'fr-FR' : 'en-GB');
  const fmt = n => n.toLocaleString(locale());
  const dateText = (s, opts = { day: 'numeric', month: 'long', year: 'numeric' }) => new Date(s).toLocaleDateString(locale(), opts);
  let regionNames;
  const countryName = iso => {
    try { return regionNames.of(iso) || countries[iso].name; } catch (e) { return countries[iso].name; }
  };
  const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const swatch = c => `<i class="swatch" style="background:${c}"></i>`;

  const peopleIn = iso => (countries[iso]?.researchers || []).filter(r => lab === 'all' || r.lab === lab);
  const binColor = n => { let i = 0; while (i < BINS.length - 1 && n >= BINS[i + 1]) i++; return COLORS[i]; };
  const colorFor = iso => {
    if (!iso || !countries[iso]) return OTHER;
    const n = peopleIn(iso).length;
    return n ? binColor(n) : NO_LINK;
  };

  // ---------- Globe drawing ----------
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = canvas.clientWidth;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(width * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }

  function render() {
    if (!features || !width) return;
    const c = width / 2;
    projection.translate([c, c]).scale(c * .94 * zoom).rotate(rotation);
    const r = projection.scale();
    ctx.clearRect(0, 0, width, width);

    const ocean = ctx.createRadialGradient(c - r * .3, c - r * .35, r * .1, c, c, r);
    ocean.addColorStop(0, '#ffffff');
    ocean.addColorStop(1, '#e1edf1');
    ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = ocean; ctx.fill();
    ctx.beginPath(); path(graticule); ctx.strokeStyle = 'rgba(10, 70, 94, .07)'; ctx.lineWidth = .6; ctx.stroke();

    for (const f of features) {
      ctx.beginPath(); path(f);
      ctx.fillStyle = colorFor(isoByFeature.get(f));
      ctx.fill();
    }
    ctx.beginPath(); path(borders); ctx.strokeStyle = BORDER; ctx.lineWidth = .7; ctx.stroke();

    if (hovered && hovered !== selected) {
      ctx.beginPath(); path(hovered); ctx.strokeStyle = '#0a465e'; ctx.lineWidth = 1.2; ctx.stroke();
    }
    if (selected) {
      ctx.beginPath(); path(selected); ctx.strokeStyle = '#0a465e'; ctx.lineWidth = 2.4; ctx.stroke();
    }
    ctx.beginPath(); path({ type: 'Sphere' }); ctx.strokeStyle = 'rgba(10, 70, 94, .3)'; ctx.lineWidth = 1; ctx.stroke();
  }

  let frame = 0;
  const requestRender = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; render(); }); };

  function featureAt(point) {
    const ll = projection.invert(point);
    if (!ll || d3.geoDistance(ll, [-rotation[0], -rotation[1]]) > Math.PI / 2) return null;
    return features.find(f => d3.geoContains(f, ll)) || null;
  }

  // ---------- Interaction ----------
  let moved = false, startPoint = null, dragging = false;
  d3.select(canvas).call(d3.drag()
    .on('start', ev => {
      d3.select(document.documentElement).interrupt();
      dragging = true; moved = false;
      startPoint = d3.pointer(ev.sourceEvent, canvas);
      canvas.classList.add('dragging');
      tooltip.hidden = true;
    })
    .on('drag', ev => {
      const p = d3.pointer(ev.sourceEvent, canvas);
      if (Math.hypot(p[0] - startPoint[0], p[1] - startPoint[1]) > 4) moved = true;
      const k = 180 / (Math.PI * projection.scale());
      rotation[0] += ev.dx * k;
      rotation[1] = Math.max(-80, Math.min(80, rotation[1] - ev.dy * k));
      requestRender();
    })
    .on('end', ev => {
      dragging = false;
      canvas.classList.remove('dragging');
      if (!moved) {
        const f = featureAt(d3.pointer(ev.sourceEvent, canvas));
        const iso = f && isoByFeature.get(f);
        if (iso && countries[iso]) select(iso);
      }
    }));

  canvas.addEventListener('pointermove', ev => {
    if (dragging) return;
    const p = d3.pointer(ev, canvas);
    const f = featureAt(p);
    const iso = f && isoByFeature.get(f);
    const known = iso && countries[iso];
    canvas.classList.toggle('over-country', !!known);
    if (known) {
      tooltip.innerHTML = `${esc(countryName(iso))} <span>${fmt(peopleIn(iso).length)}</span>`;
      tooltip.style.left = `${p[0]}px`;
      tooltip.style.top = `${p[1]}px`;
      tooltip.hidden = false;
    } else {
      tooltip.hidden = true;
    }
    const next = known ? f : null;
    if (next !== hovered) { hovered = next; requestRender(); }
  });
  canvas.addEventListener('pointerleave', () => { tooltip.hidden = true; hovered = null; requestRender(); });
  canvas.addEventListener('wheel', ev => {
    // Plain scrolling keeps scrolling the page; Ctrl/⌘ + wheel (or a trackpad pinch) zooms
    if (!ev.ctrlKey && !ev.metaKey) return;
    ev.preventDefault();
    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * Math.exp(-ev.deltaY * .0015)));
    requestRender();
  }, { passive: false });

  $('#zoom-in').addEventListener('click', () => zoomTo(Math.min(MAX_ZOOM, zoom * 1.4)));
  $('#zoom-out').addEventListener('click', () => zoomTo(Math.max(MIN_ZOOM, zoom / 1.4)));
  $('#reset').addEventListener('click', () => flyTo(START_ROTATION, START_ZOOM));

  function zoomTo(z) {
    const z0 = zoom;
    d3.transition().duration(300).tween('zoom', () => s => { zoom = z0 + (z - z0) * s; render(); });
  }

  function flyTo(target, targetZoom, duration = 1000) {
    const r0 = rotation.slice(), z0 = zoom;
    let dl = target[0] - r0[0];
    dl = ((dl % 360) + 540) % 360 - 180;                 // shortest way round
    d3.transition().duration(REDUCED ? 0 : duration).ease(d3.easeCubicInOut).tween('rotate', () => s => {
      rotation = [r0[0] + dl * s, r0[1] + (target[1] - r0[1]) * s, 0];
      zoom = z0 + (targetZoom - z0) * s;
      render();
    });
  }

  // ---------- Reading column ----------
  function select(iso, quiet) {
    selected = featureByIso.get(iso) || null;
    if (selected) {
      const c = d3.geoCentroid(selected);
      const z = Math.max(1, Math.min(5, .12 / Math.sqrt(d3.geoArea(selected))));
      flyTo([-c[0], -c[1]], z);
    }
    try { history.replaceState(null, '', `#${iso}`); } catch (e) {}
    renderCountry(iso);
    if (!quiet && window.innerWidth <= 980) panel.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  }

  function deselect() {
    selected = null;
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
    renderOverview();
    requestRender();
  }

  function rankedCountries() {
    return Object.keys(countries)
      .map(iso => [iso, peopleIn(iso).length])
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1] || countryName(a[0]).localeCompare(countryName(b[0]), lang));
  }

  function renderOverview() {
    const ranked = rankedCountries();
    const max = ranked.length ? ranked[0][1] : 1;
    panel.innerHTML = `
      <h2>${esc(t().rankingTitle)}</h2>
      <p class="context">${esc(t().rankingNote)}</p>
      <ol class="ranking">${ranked.slice(0, 15).map(([iso, n]) => `
        <li><button type="button" data-iso="${iso}">
          <span class="name">${esc(countryName(iso))}</span>
          <span class="bar"><i style="width:${Math.max(3, n / max * 100)}%;background:${binColor(n)}"></i></span>
          <span class="num">${fmt(n)}</span>
        </button></li>`).join('')}
      </ol>`;
    panel.querySelectorAll('[data-iso]').forEach(b => b.addEventListener('click', () => select(b.dataset.iso)));
  }

  function renderCountry(iso) {
    const c = countries[iso];
    const people = peopleIn(iso);
    panel.innerHTML = `
      <button type="button" class="back">${esc(t().back)}</button>
      <h2>${esc(countryName(iso))}</h2>
      <p class="context">${esc(t().regions[c.region] || '')}, ${esc(t().income[c.income] || '')}</p>
      <p class="figures">${t().figures(fmt(people.length), lab === 'all' ? fmt(c.papers) : null)}</p>
      ${people.length ? `
        <h3>${esc(t().peopleTitle)}</h3>
        ${people.length > 10 ? `<input class="filter" type="search" placeholder="${esc(t().filterNames)}" aria-label="${esc(t().filterNames)}">` : ''}
        <ol class="people">${people.map(personItem).join('')}</ol>`
      : `<p class="note">${esc(lab === 'all' ? t().none : t().noneLab)}</p>`}`;
    panel.querySelector('.back').addEventListener('click', deselect);
    const filter = panel.querySelector('.filter');
    if (filter) filter.addEventListener('input', () => {
      const q = fold(filter.value);
      panel.querySelectorAll('.people > li').forEach(li => { li.hidden = q && !fold(li.dataset.name).includes(q); });
    });
  }

  function personItem(r) {
    const link = r.orcid || `https://openalex.org/${r.openalex}`;
    return `<li data-name="${esc(r.name)}">
      <div class="person">
        <a href="${esc(link)}" target="_blank" rel="noopener">${esc(r.name)}</a>
        <span class="count">${esc(t().paperCount(r.n))}</span>
        <span class="lab">${swatch(LAB_COLORS[r.lab] || '#6d8590')}${esc(r.lab)}</span>
      </div>
      <details><summary>${esc(t().examples)}</summary><ol>${r.papers.map(p => `
        <li><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a> <span class="year">(${esc(p.year)})</span></li>`).join('')}
      </ol></details>
    </li>`;
  }

  // ---------- Filters, legend, lead, method, language ----------
  function renderRegions() {
    const box = $('#regions');
    box.innerHTML = Object.keys(REGION_VIEWS).map(k => `<button type="button" data-region="${k}">${esc(t().regions[k])}</button>`).join('');
    box.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const [rot, z] = REGION_VIEWS[b.dataset.region];
      flyTo(rot, z);
    }));
  }

  function renderLabs() {
    const labs = ['all', ...data.criteria.labs.filter(l => l !== 'IPSL'), 'IPSL'];
    const box = $('#labs');
    box.innerHTML = labs.map(l => `<button type="button" data-lab="${l}" aria-pressed="${l === lab}">${l === 'all' ? '' : swatch(LAB_COLORS[l])}${esc(l === 'all' ? t().allLabs : l)}</button>`).join('');
    box.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      lab = b.dataset.lab;
      renderLabs(); renderLead(); render();
      const iso = (selected && isoByFeature.get(selected)) || location.hash.slice(1);
      if (iso && countries[iso]) renderCountry(iso); else renderOverview();
    }));
  }

  function renderLegend() {
    const ranges = BINS.map((b, i) => (i < BINS.length - 1 ? (BINS[i + 1] - 1 === b ? `${b}` : `${b}–${BINS[i + 1] - 1}`) : `${b}+`));
    $('#legend').innerHTML = `
      <span>${esc(t().legendRamp)} ${ranges[0]}
        ${COLORS.map((c, i) => `<i style="background:${c}" title="${ranges[i]}"></i>`).join('')} ${ranges[ranges.length - 1]}</span>
      <span><i style="background:${NO_LINK}"></i>${esc(t().legendNone)}</span>`;
  }

  function renderLead() {
    const ranked = rankedCountries();
    const people = new Set(ranked.flatMap(([iso]) => peopleIn(iso).map(r => r.openalex)));
    $('#lead').innerHTML = t().lead({
      since: dateText(data.since, { month: 'long', year: 'numeric' }),
      people: fmt(people.size), papers: fmt(data.total_papers), countries: fmt(ranked.length),
    });
  }

  function renderMethod() {
    $('#method-body').innerHTML = t().method({
      since: dateText(data.since), generated: dateText(data.generated),
      min: data.criteria.min_papers, max: data.criteria.max_authors, labs: data.criteria.labs.join(', '),
    });
  }

  function renderSearchList() {
    $('#country-list').innerHTML = Object.keys(countries)
      .map(iso => countryName(iso))
      .sort((a, b) => a.localeCompare(b, lang))
      .map(n => `<option value="${esc(n)}"></option>`).join('');
  }

  $('#search').addEventListener('change', ev => {
    const q = fold(ev.target.value);
    const iso = Object.keys(countries).find(k => fold(countryName(k)) === q)
      || Object.keys(countries).find(k => fold(countryName(k)).startsWith(q));
    if (q && iso) { select(iso, true); ev.target.value = ''; ev.target.blur(); }
  });

  function setLang(next) {
    lang = next;
    try { localStorage.setItem('gs-lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
    regionNames = new Intl.DisplayNames([lang], { type: 'region' });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = t()[el.dataset.i18n]; if (typeof v === 'string') el.textContent = v; });
    $('.hint').textContent = matchMedia('(pointer: coarse)').matches ? t().hintTouch : t().hint;
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t()[el.dataset.i18nPlaceholder]; });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t()[el.dataset.i18nAria]); el.title = t()[el.dataset.i18nAria]; });
    document.title = `${t().title} · ${lang === 'fr' ? 'Global South Working Group of IPSL' : 'Groupe Sud IPSL'}`;
    renderRegions();
    if (!data) return;
    renderLead(); renderMethod(); renderLabs(); renderLegend(); renderSearchList();
    const iso = location.hash.slice(1);
    if (iso && countries[iso]) renderCountry(iso); else renderOverview();
    render();
  }
  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  // ---------- Load ----------
  setLang(lang);
  Promise.all([
    fetch('lib/countries-50m.json').then(r => r.json()),
    fetch('data/groupe_sud.json').then(r => r.json()),
  ]).then(([world, d]) => {
    data = d;
    countries = d.countries;
    // Morocco is drawn with Western Sahara, as France recognises it (2024): merge the two
    // Natural Earth shapes and leave out the line between them
    const geoms = world.objects.countries.geometries;
    const isMorocco = g => g.id === '504' || g.id === '732';
    const others = { type: 'GeometryCollection', geometries: geoms.filter(g => !isMorocco(g)) };
    const morocco = { type: 'Feature', id: '504', properties: { name: 'Morocco' }, geometry: topojson.merge(world, geoms.filter(isMorocco)) };
    features = [...topojson.feature(world, others).features, morocco];
    borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b && !(isMorocco(a) && isMorocco(b)));
    const isoByNumeric = new Map(Object.entries(countries).filter(([, c]) => c.numeric).map(([iso, c]) => [c.numeric, iso]));
    for (const f of features) {
      // Kosovo has no ISO numeric code in the map data
      const iso = f.id ? isoByNumeric.get(f.id) : (f.properties.name === 'Kosovo' && countries.XK ? 'XK' : null);
      if (iso) { isoByFeature.set(f, iso); featureByIso.set(iso, f); }
    }
    setLang(lang);
    resize();
    const iso = location.hash.slice(1);
    if (iso && countries[iso]) {
      select(iso, true);
    } else if (!REDUCED) {
      // One arrival moment: the globe swings round from Asia to settle on Africa and the Atlantic
      rotation = [-110, -4, 0];
      flyTo(START_ROTATION, START_ZOOM, 2600);
    }
  });
  new ResizeObserver(resize).observe(canvas);
})();
