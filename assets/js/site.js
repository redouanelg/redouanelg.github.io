// Site behaviour: satellite/Souls modes, research layers, popups. Data comes from window.SITE (set in the layout).
const { anomalies: ANOMALIES, feeds: FEEDS, ids: IDS } = window.SITE;
const SHADER_MODE = { eddies: 0, tuning: 1, downscaling: 2, bias: 3 };
const cur = () => IDS[layer];
const STILL = matchMedia('(prefers-reduced-motion: reduce)').matches;
const LAYER_SECONDS = 10;
const body = document.body;

// Warming stripes, coloured with the ColorBrewer RdBu ramp scaled to the data
const RDBU = ['#08306b', '#08519c', '#2171b5', '#4292c6', '#6baed6', '#9ecae1', '#c6dbef', '#deebf7',
              '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'];
const lo = Math.min(...ANOMALIES), hi = Math.max(...ANOMALIES);
const stripes = document.getElementById('stripes');
if (stripes) for (const a of ANOMALIES) {
  const s = document.createElement('span');
  s.style.background = RDBU[Math.min(15, Math.floor((a - lo) / (hi - lo) * 16))];
  stripes.appendChild(s);
}

const swaps = [...document.querySelectorAll('[data-souls]')];
swaps.forEach(el => el.dataset.climate = el.innerHTML);

// --- Satellite mode: one WebGL field, four research layers ---
// 0 eddies (SST + SWOT swath), 1 model tuning (worlds morph with a parameter),
// 2 downscaling (coarse grid refined behind a sweep), 3 bias correction (biased colours corrected behind a sweep)
const sst = document.getElementById('sst');
const gl = sst.getContext('webgl');
let prog, U = {}, tStart = performance.now(), sstRunning = false;
let layer = 0, layerStart = performance.now(), pinnedUntil = 0;
if (gl) {
  const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs = `precision mediump float;uniform vec2 r;uniform float t;uniform float sw;uniform float mode;uniform float k;
    float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
      return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
    float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
    vec3 cmap(float x){x=clamp(x,0.,1.);
      vec3 c0=vec3(.02,.03,.14),c1=vec3(.04,.2,.48),c2=vec3(0.,.52,.6),c3=vec3(.5,.78,.38),c4=vec3(.98,.74,.2),c5=vec3(.86,.2,.12);
      if(x<.2)return mix(c0,c1,x/.2);if(x<.4)return mix(c1,c2,(x-.2)/.2);if(x<.6)return mix(c2,c3,(x-.4)/.2);
      if(x<.8)return mix(c3,c4,(x-.6)/.2);return mix(c4,c5,(x-.8)/.2);}
    float field(vec2 uv,float warp){vec2 p=uv*vec2(r.x/r.y,1.)*2.6;float tt=t*.025;
      vec2 q=vec2(fbm(p+tt),fbm(p+vec2(5.2,1.3)-tt));
      vec2 w=vec2(fbm(p+warp*q+vec2(1.7,9.2)+tt*1.4),fbm(p+warp*q+vec2(8.3,2.8)-tt));
      return fbm(p+warp*w);}
    float temp(vec2 uv,float f){return f*1.05+(.5-uv.y)*.55;}
    void main(){vec2 uv=gl_FragCoord.xy/r;vec3 col;
      if(mode<.5){
        float f=field(uv,4.);col=cmap(temp(uv,f));
        float d=abs(uv.x*.78+uv.y*.62-(sw*1.8-.2));float inb=smoothstep(.1,.085,d);
        float iso=smoothstep(.07,0.,abs(fract(f*16.)-.5));
        col=mix(col,col*.45+vec3(.85,.95,1.)*iso*.55,inb*.8);
        col+=vec3(.55,.9,1.)*smoothstep(.003,0.,abs(d-.092))*.7;
      }else if(mode<1.5){
        float f=field(uv,k);col=cmap(temp(uv,f));
        col=mix(col,vec3(dot(col,vec3(.3,.5,.2))),.25);
        col*=.93+.07*step(.5,fract(gl_FragCoord.y/6.));
      }else if(mode<2.5){
        float cs=44.;bool coarse=uv.x>sw;
        vec2 g=(floor(gl_FragCoord.xy/cs)+.5)*cs/r;vec2 s=coarse?g:uv;
        col=cmap(temp(s,field(s,4.)));
        if(coarse){vec2 e=fract(gl_FragCoord.xy/cs);col*=.82+.18*step(.035,min(e.x,e.y));}
        col+=vec3(.6,.9,1.)*smoothstep(2.5/r.x,0.,abs(uv.x-sw))*.9;
      }else{
        float v=temp(uv,field(uv,4.));bool raw=uv.x>sw;
        if(raw)v=v*.75+.24;
        col=cmap(v);
        col+=vec3(1.,.8,.5)*smoothstep(2.5/r.x,0.,abs(uv.x-sw))*.9;
      }
      col*=.55+.45*smoothstep(1.25,.15,length(uv-vec2(.5,.55)));
      gl_FragColor=vec4(col*.9,1.);}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog); gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  for (const name of ['r', 't', 'sw', 'mode', 'k']) U[name] = gl.getUniformLocation(prog, name);
}
function sizeCanvas(c, scale) { c.width = Math.round(innerWidth * scale); c.height = Math.round(innerHeight * scale); }
function layerProgress(now) { return Math.min(1, (now - layerStart) / (LAYER_SECONDS * 1000)); }

const layerBtns = [...document.querySelectorAll('[data-layer]')];
const progBars = [...document.querySelectorAll('.layers .prog')];
function setLayer(i, pinned) {
  layer = i; layerStart = performance.now();
  if (pinned) pinnedUntil = performance.now() + 30000;
  layerBtns.forEach(b => b.classList.toggle('on', +b.dataset.layer === i));
  document.querySelectorAll('.popup').forEach(p => p.remove());
  wave = 0; tick();
}
layerBtns.forEach(b => b.addEventListener('click', () => { if (!body.classList.contains('souls')) setLayer(+b.dataset.layer, true); }));

function drawSST() {
  const now = performance.now();
  if (!STILL && now - layerStart > LAYER_SECONDS * 1000 && now > pinnedUntil) setLayer((layer + 1) % FEEDS.length);
  const p = layerProgress(now), t = (now - tStart) / 1000;
  progBars.forEach((b, i) => b.style.width = (i === layer ? p * 100 : 0) + '%');
  if (gl) {
    gl.viewport(0, 0, sst.width, sst.height);
    gl.uniform2f(U.r, sst.width, sst.height);
    gl.uniform1f(U.t, t);
    gl.uniform1f(U.mode, SHADER_MODE[cur()]);
    gl.uniform1f(U.sw, cur() === 'eddies' ? (t * .035) % 1 : Math.min(1, p * 1.15));
    gl.uniform1f(U.k, 4 + 2.2 * Math.sin(t * .9));
  }
  if (gl) gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  drawScope(p, t);
  if (sstRunning && !STILL) requestAnimationFrame(drawSST);
}

// Small instrument panel that explains the current layer
const scope = document.getElementById('scopecv'), sctx = scope.getContext('2d');
// The caption shows under the layer tabs everywhere; the small canvas only on large screens
const capA = document.getElementById('scopetxt'), capB = document.getElementById('layercap');
const scopeTxt = { set textContent(s) { if (capA.textContent !== s) { capA.textContent = s; capB.textContent = s; } } };
let wave = 0, cloud = [];
function drawScope(p, t) {
  const W = scope.width, H = scope.height;
  sctx.clearRect(0, 0, W, H);
  sctx.lineWidth = 3;
  if (cur() === 'eddies') {
    sctx.strokeStyle = 'rgba(79,209,255,.9)';
    for (let i = 0; i < 4; i++) { sctx.beginPath(); sctx.arc(60 + i * 75, 96 + 30 * Math.sin(t + i), 18 + 8 * Math.sin(t * 1.3 + i), 0, 6.28); sctx.stroke(); }
    scopeTxt.textContent = 'eddies tracked · cyclonic vs anticyclonic';
  } else if (cur() === 'tuning') {
    const w = Math.min(3, Math.floor(p * 4));
    if (w !== wave || !cloud.length) { wave = w; cloud = Array.from({ length: 140 }, () => [Math.random(), Math.random()]); }
    const rad = .42 - wave * .11;
    for (const [x, y] of cloud) {
      const ok = Math.hypot((x - .58) / 1.3, y - .45) < rad;
      sctx.fillStyle = ok ? 'rgba(124,255,178,.95)' : 'rgba(255,107,107,.45)';
      sctx.fillRect(x * W, y * H, 6, 6);
    }
    const nroy = Math.round(cloud.filter(([x, y]) => Math.hypot((x - .58) / 1.3, y - .45) < rad).length / cloud.length * 100);
    scopeTxt.textContent = `history matching · wave ${wave + 1} · NROY ${nroy}%`;
  } else if (cur() === 'downscaling') {
    const n = Math.max(1, Math.round(1 + p * 11));
    sctx.strokeStyle = 'rgba(79,209,255,.8)'; sctx.lineWidth = 2;
    for (let i = 1; i < n; i++) { sctx.beginPath(); sctx.moveTo(i * W / n, 0); sctx.lineTo(i * W / n, H); sctx.moveTo(0, i * H / n); sctx.lineTo(W, i * H / n); sctx.stroke(); }
    sctx.strokeRect(1, 1, W - 2, H - 2);
    scopeTxt.textContent = `downscaling · ${Math.round(100 / n)} km grid`;
  } else {
    const curve = (mu, sd, color) => {
      sctx.strokeStyle = color; sctx.beginPath();
      for (let x = 0; x <= W; x += 4) { const z = (x / W - mu) / sd, y = H - 10 - (H - 20) * Math.exp(-z * z / 2); x ? sctx.lineTo(x, y) : sctx.moveTo(x, y); }
      sctx.stroke();
    };
    curve(.42, .12, 'rgba(234,244,255,.9)');
    curve(.42 + .2 * (1 - p), .12 * (1 - .35 * (1 - p)), 'rgba(255,181,71,.95)');
    scopeTxt.textContent = `quantile mapping · bias ${(1.8 * (1 - p)).toFixed(1)} °C`;
  }
}

// Popups that match the current layer
let popTimer;
const DOWN_TAGS = ['GCM cell 100 km → 1 km', 'precipitation · 100 km → 1 km', 'Tmax · 100 km → 1 km', 'CMIP6 → local scale'];
const BIAS_TAGS = ['T2m bias +1.8 °C → +0.1 °C', 'precip bias +32% → +2%', 'Tmax bias −2.3 °C → −0.2 °C', 'wet days +40% → +3%'];
function spawnPopup() {
  if (document.querySelectorAll('.popup').length < 3) {
    // Top or bottom band only, so popups never sit on the hero text
    const x = 4 + Math.random() * 66, y = Math.random() < .55 ? 12 + Math.random() * 12 : 80 + Math.random() * 7;
    const e = document.createElement('div');
    e.className = 'popup' + (x > 45 ? ' flip' : '');
    let shape, tag, color, d;
    if (cur() === 'eddies') {
      const cyc = Math.random() < .5; d = 50 + Math.random() * 70; color = cyc ? '#4fd1ff' : '#ffb547';
      shape = '<div class="ring"></div>'; tag = `${cyc ? 'cyclonic' : 'anticyclonic'} eddy · p=${(.81 + Math.random() * .18).toFixed(2)}`;
    } else if (cur() === 'tuning') {
      const ok = Math.random() < .3; d = 26; color = ok ? '#7cffb2' : '#ff6b6b';
      shape = `<div class="dot">${ok ? '✓' : '✕'}</div>`; tag = `run ${100 + Math.floor(Math.random() * 900)} · ${ok ? 'plausible' : 'ruled out'}`;
    } else if (cur() === 'downscaling') {
      d = 64; color = '#4fd1ff'; shape = '<div class="cell"></div>'; tag = DOWN_TAGS[Math.floor(Math.random() * DOWN_TAGS.length)];
    } else {
      d = 18; color = '#ffb547'; shape = '<div class="dot">≈</div>'; tag = BIAS_TAGS[Math.floor(Math.random() * BIAS_TAGS.length)];
    }
    e.style.cssText = `left:${x}vw;top:${y}vh;--d:${d}px;--c:${color}`;
    e.innerHTML = `${shape}<div class="tag">${tag}</div>`;
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 4200);
  }
  popTimer = setTimeout(spawnPopup, 1300 + Math.random() * 1500);
}

// HUD clock (with the current data feed) and cursor coordinates
const clock = document.getElementById('clock'), coords = document.getElementById('coords');
function tick() { clock.textContent = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC · ' + FEEDS[layer]; }
setInterval(tick, 10000);
addEventListener('pointermove', e => {
  const lat = 55 - e.clientY / innerHeight * 40, lon = 70 - e.clientX / innerWidth * 60;
  coords.textContent = `${lat.toFixed(2)}°N ${lon.toFixed(2)}°W`;
});

// --- Souls mode: embers rising from below ---
const em = document.getElementById('embers'), ectx = em.getContext('2d');
let embers = [], emRunning = false;
function drawEmbers() {
  const w = em.width, h = em.height;
  ectx.clearRect(0, 0, w, h);
  if (embers.length < 90) embers.push({ x: Math.random() * w, y: h + 10, v: .4 + Math.random() * 1.2, r: .6 + Math.random() * 1.8, s: Math.random() * 6.28, life: 0 });
  for (const p of embers) {
    p.y -= p.v; p.s += .03; p.x += Math.sin(p.s) * .5; p.life++;
    ectx.fillStyle = `rgba(255,${120 + Math.round(80 * Math.random())},40,${Math.max(0, 1 - p.life / 520)})`;
    ectx.beginPath(); ectx.arc(p.x, p.y, p.r, 0, 6.28); ectx.fill();
  }
  embers = embers.filter(p => p.y > -10 && p.life < 520);
  if (emRunning && !STILL) requestAnimationFrame(drawEmbers);
}

// Item acquired toasts as papers scroll into view
const seen = new Set();
const io = new IntersectionObserver(entries => {
  if (!body.classList.contains('souls')) return;
  for (const en of entries) {
    if (en.isIntersecting && !seen.has(en.target)) {
      seen.add(en.target);
      const t = document.createElement('div');
      t.className = 'toast';
      t.innerHTML = `<small>Item acquired</small><b>${en.target.dataset.item}</b>`;
      setTimeout(() => { document.body.appendChild(t); setTimeout(() => t.remove(), 3300); }, seen.size * 350);
    }
  }
}, { threshold: .6 });
document.querySelectorAll('.paper').forEach(p => io.observe(p));

// Soapstone messages
document.querySelectorAll('.soapstone').forEach(s => s.addEventListener('click', ev => {
  closeNotes();
  const n = document.createElement('div'), r = s.getBoundingClientRect();
  n.className = 'note-pop';
  n.style.left = Math.max(8, Math.min(r.left - 110, innerWidth - 258)) + 'px';
  n.style.top = Math.min(r.bottom + 8, innerHeight - 220) + 'px';
  n.innerHTML = `<small>A message from another world</small>${s.dataset.msg}<div class="rate"><button>Good</button><button>Poor</button></div>`;
  n.addEventListener('click', e => e.stopPropagation());
  n.querySelectorAll('button').forEach(b => b.onclick = () => { n.innerHTML = '<small>Appraised</small>Your rating restores HP to its author.'; setTimeout(() => n.remove(), 1800); });
  document.body.appendChild(n);
  ev.stopPropagation();
}));
function closeNotes() { document.querySelectorAll('.note-pop').forEach(n => n.remove()); }
addEventListener('click', closeNotes);
addEventListener('scroll', closeNotes, { passive: true });

// Mode switching
const sw = document.getElementById('switch');
function banner(kind, text) {
  if (STILL) return;
  const b = document.createElement('div');
  b.className = 'banner ' + kind;
  b.innerHTML = `<div>${text}</div>`;
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 2700);
}
function setMode(mode, announce) {
  const souls = mode === 'souls';
  body.classList.toggle('souls', souls);
  swaps.forEach(el => el.innerHTML = souls ? el.dataset.souls : el.dataset.climate);
  sw.textContent = souls ? '◑ Surface (climate mode)' : '◐ Bonfire (game mode)';
  try { localStorage.setItem('mode', mode); } catch (e) {}
  sstRunning = !souls; emRunning = souls;
  clearTimeout(popTimer);
  if (souls) {
    sizeCanvas(em, 1); drawEmbers();
    const fill = document.getElementById('bossfill');
    fill.style.width = '0';
    setTimeout(() => fill.style.width = Math.min(100, ANOMALIES[ANOMALIES.length - 1] / 1.5 * 100) + '%', 300);
    if (announce) banner('souls', 'BONFIRE LIT');
  } else {
    sizeCanvas(sst, .5); setLayer(layer); drawSST();
    if (!STILL) spawnPopup();
    if (announce) banner('climate', 'SATELLITE DOWNLINK');
  }
}
sw.addEventListener('click', () => setMode(body.classList.contains('souls') ? 'climate' : 'souls', true));
addEventListener('resize', () => { sizeCanvas(sst, .5); sizeCanvas(em, 1); if (STILL) drawSST(); });
let start = 'climate';
try { start = localStorage.getItem('mode') || 'climate'; } catch (e) {}
setMode(start, false);
