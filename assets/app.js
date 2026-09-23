(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hasGSAP = typeof window.gsap !== "undefined";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const P = window.PROJECTS, byId = Object.fromEntries(P.map(p => [p.id, p]));
  const LANG_COLOR = Object.fromEntries(window.LANGS.map(([n, , c]) => [n, c]));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const fmtDate = d => { const [y, m, day] = d.split("-"); return `${+day} ${MONTHS[+m - 1]} ${y}`; };
  const icons = () => window.lucide && lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  if (hasGSAP && !reduced) document.documentElement.classList.add("js");

  /* ---------- Texturas pixel (bloque de hierba) ---------- */
  function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
  function texture(kind, seed = 7) {
    const c = document.createElement("canvas"); c.width = c.height = 16;
    const x = c.getContext("2d"), r = rng(seed);
    const grass = ["#5fae3a", "#6cc04a", "#4f9a2f", "#7ccf55", "#58a735"];
    const dirt = ["#8a5a33", "#7a4e2b", "#6b4424", "#976540", "#5e3b1f"];
    for (let i = 0; i < 16; i++) for (let j = 0; j < 16; j++) {
      let pal = dirt;
      if (kind === "top") pal = grass;
      if (kind === "side") { const edge = 3 + Math.floor(r() * 2.2); if (j < edge) pal = grass; }
      x.fillStyle = pal[Math.floor(r() * pal.length)]; x.fillRect(i, j, 1, 1);
    }
    return c.toDataURL();
  }
  const TEX = { top: texture("top", 11), side: texture("side", 23), bottom: texture("bottom", 5) };
  $$(".face").forEach(f => {
    const k = f.classList.contains("f-top") ? "top" : f.classList.contains("f-bottom") ? "bottom" : "side";
    f.style.backgroundImage = `url(${TEX[k]})`;
  });
  const cta = $("#ctaBlocks");
  if (cta) {
    const n = Math.ceil(1400 / 32);
    for (let i = 0; i < n; i++) {
      const b = document.createElement("i");
      const h = [32, 32, 64, 32, 32, 32, 64, 96, 32, 32][i % 10];
      b.style.height = h + "px";
      b.style.backgroundImage = `url(${texture("side", 30 + i)})`;
      b.style.backgroundSize = "32px 32px"; b.style.backgroundRepeat = "repeat-y";
      b.style.backgroundImage = `url(${texture("side", 30 + i)}), url(${texture("bottom", 60 + i)})`;
      b.style.backgroundPosition = "0 0, 0 32px"; b.style.backgroundRepeat = "no-repeat, repeat-y";
      cta.appendChild(b);
    }
  }

  /* ---------- Marquee ---------- */
  const TECH = ["C++17", "Qt6", "CMake", "Electron", "Chromium", "React 19", "Next.js 16", "Vite", "Tailwind CSS v4", "TypeScript", "Node.js", "Express", "Supabase", "PostgreSQL", "Row Level Security", "Edge Functions", "Discord.js", "PayPal API", "Pterodactyl", "Ollama", "GitHub Actions", "Vercel", "Modrinth API", "PWA"];
  $("#marquee").innerHTML = [...TECH, ...TECH].map(t => `<span>${t}</span>`).join("");

  /* ---------- Helpers de tarjetas ---------- */
  const privacyBadge = p => p.hidden
    ? `<span class="badge int"><i data-lucide="users"></i>Uso interno</span>`
    : p.private ? `<span class="badge priv"><i data-lucide="lock"></i>Privado</span>`
      : `<span class="badge pub"><i data-lucide="globe"></i>Público</span>`;
  function langBar(langs) {
    const tot = Object.values(langs).reduce((a, b) => a + b, 0);
    if (!tot) return `<div class="lbar"><i style="width:100%;background:#3f3f46"></i></div>`;
    return `<div class="lbar">${Object.entries(langs).map(([k, v]) =>
      `<i title="${k} ${(v / tot * 100).toFixed(1)}%" style="width:${v / tot * 100}%;background:${LANG_COLOR[k] || "#71717a"}"></i>`).join("")}</div>`;
  }
  const mainLang = p => Object.entries(p.langs).sort((a, b) => b[1] - a[1])[0]?.[0] || "Assets";
  function preview(p) {
    if (p.id === "voxelix") return `<div class="p-preview"><div class="mini-window"><div class="mini-bar"><i></i><i></i><i></i></div>
      <div class="mini-body"><div class="mini-cols"><div class="mini-side"><div class="mini-row acc"></div><div class="mini-row"></div><div class="mini-row"></div><div class="mini-row"></div></div>
      <div class="mini-tiles"><div class="mini-tile acc"></div><div class="mini-tile"></div><div class="mini-tile"></div><div class="mini-tile"></div><div class="mini-tile"></div><div class="mini-tile acc"></div><div class="mini-tile"></div><div class="mini-tile"></div></div></div></div></div></div>`;
    if (p.id === "umbrathel-web") return `<div class="p-preview"><div class="mini-window"><div class="mini-bar"><i></i><i></i><i></i></div>
      <div class="mini-body"><div class="mini-row" style="width:100%"></div><div class="mini-cols" style="grid-template-columns:1fr 60px"><div class="mini-tiles"><div class="mini-tile acc"></div><div class="mini-tile"></div><div class="mini-tile"></div><div class="mini-tile acc"></div></div>
      <div class="mini-side"><div class="mini-row acc"></div><div class="mini-row"></div><div class="mini-row"></div></div></div></div></div></div>`;
    return "";
  }

  /* ---------- Bento destacados ---------- */
  const FEATURED = [["voxelix", "xl"], ["umbrathel-web", "xl"], ["nethercore", "lg"], ["umbrathel-client", "md"], ["banco-umbrathel", "md"], ["horario", "md"], ["studiosmv", "md"]];
  $("#bento").innerHTML = FEATURED.map(([id, size]) => {
    const p = byId[id];
    return `<article class="card p-card size-${size} reveal" data-id="${p.id}" style="--accent:${p.accent}" tabindex="0" role="button" aria-label="Ver detalles de ${esc(p.title)}">
      <div class="p-top"><div class="p-icon"><i data-lucide="${p.icon}"></i></div>
        <div class="badges">${privacyBadge(p)}${p.version ? `<span class="badge"><i data-lucide="tag"></i>${p.version}</span>` : ""}</div></div>
      <h3>${esc(p.title)}</h3>
      <p class="p-tag">${esc(p.tagline)}</p>
      <p class="p-desc">${esc(p.desc)}</p>
      <div class="p-stack">${p.stack.slice(0, size === "md" ? 3 : size === "lg" ? 6 : 5).map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      <div class="p-foot">
        <div class="p-meta"><span><i data-lucide="git-commit-horizontal"></i>${p.commits} commits</span><span><i data-lucide="code-2"></i>${mainLang(p)}</span><span><i data-lucide="clock-3"></i>${fmtDate(p.updated)}</span></div>
        ${langBar(p.langs)}
        <span class="p-more">Ver detalles<i data-lucide="arrow-right"></i></span>
      </div>
      ${size === "xl" ? preview(p) : ""}
    </article>`;
  }).join("");

  /* ---------- Grid de todos + filtros ---------- */
  const FILTERS = [["all", "Todos"], ["escritorio", "Escritorio"], ["web", "Web"], ["backend", "Backend & BD"], ["minecraft", "Minecraft"], ["umbrathel", "Umbrathel"], ["private", "Privados"]];
  const match = (p, f) => f === "all" || (f === "private" ? p.private : p.cats.includes(f));
  const ORDER = [...P].sort((a, b) => b.updated.localeCompare(a.updated));
  const grid = $("#grid");
  grid.innerHTML = ORDER.map(p => `<article class="card r-card" data-id="${p.id}" style="--accent:${p.accent}" tabindex="0" role="button" aria-label="Ver detalles de ${esc(p.title)}">
      <div class="r-top"><div class="p-icon"><i data-lucide="${p.icon}"></i></div><div><h4>${esc(p.title)}</h4><small>${esc(p.repo)}</small></div><div class="badges">${privacyBadge(p)}</div></div>
      <p>${esc(p.tagline)}. ${esc(p.desc)}</p>
      <div class="p-meta"><span><i data-lucide="git-commit-horizontal"></i>${p.commits}</span><span><i data-lucide="code-2"></i>${mainLang(p)}</span><span><i data-lucide="clock-3"></i>${fmtDate(p.updated)}</span></div>
      ${langBar(p.langs)}
    </article>`).join("");
  const fbox = $("#filters");
  fbox.innerHTML = `<span class="pillbg" aria-hidden="true"></span>` + FILTERS.map(([k, l], i) =>
    `<button role="tab" data-f="${k}" class="${i ? "" : "on"}" aria-selected="${!i}"><span>${l}<em>${P.filter(p => match(p, k)).length}</em></span></button>`).join("");
  const pillbg = $(".pillbg", fbox);
  const movePill = () => { const b = $("button.on", fbox); if (!b) return; Object.assign(pillbg.style, { left: b.offsetLeft + "px", top: b.offsetTop + "px", width: b.offsetWidth + "px", height: b.offsetHeight + "px" }); };
  let curF = "all", curQ = "";
  function applyFilter() {
    const cards = $$(".r-card", grid);
    const state = hasGSAP && window.Flip && !reduced ? Flip.getState(cards) : null;
    let shown = 0;
    cards.forEach(c => {
      const p = byId[c.dataset.id];
      const hay = (p.title + " " + p.repo + " " + p.tagline + " " + p.stack.join(" ") + " " + Object.keys(p.langs).join(" ")).toLowerCase();
      const ok = match(p, curF) && (!curQ || hay.includes(curQ));
      c.style.display = ok ? "" : "none"; if (ok) shown++;
    });
    $("#empty").hidden = shown > 0;
    if (state) Flip.from(state, { duration: .55, ease: "power3.inOut", absolute: true, scale: true,
      onEnter: els => gsap.fromTo(els, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .45, delay: .1 }),
      onLeave: els => gsap.to(els, { opacity: 0, scale: .92, duration: .3 }) });
  }
  fbox.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("button", fbox).forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); });
    curF = b.dataset.f; movePill(); applyFilter();
  });
  let qT; $("#search").addEventListener("input", e => { clearTimeout(qT); qT = setTimeout(() => { curQ = e.target.value.trim().toLowerCase(); applyFilter(); }, 120); });
  addEventListener("resize", movePill);

  /* ---------- Spotlight + tilt ---------- */
  document.addEventListener("pointermove", e => {
    const c = e.target.closest?.(".card"); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px");
  });
  if (hasGSAP && !reduced && matchMedia("(hover: hover)").matches) {
    $$(".p-card").forEach(c => {
      c.addEventListener("pointermove", e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        gsap.to(c, { rotateY: x * 5, rotateX: -y * 5, transformPerspective: 1000, duration: .5, ease: "power2.out" });
      });
      c.addEventListener("pointerleave", () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: .7, ease: "elastic.out(1,.6)" }));
    });
  }

  /* ---------- Modal ---------- */
  const modal = $("#modal"), mInner = $("#modalInner");
  function openProject(id) {
    const p = byId[id]; if (!p) return;
    const tot = Object.values(p.langs).reduce((a, b) => a + b, 0);
    mInner.style.setProperty("--accent", p.accent);
    mInner.innerHTML = `
      <div class="m-hero">
        <button class="m-close" data-close aria-label="Cerrar"><i data-lucide="x"></i></button>
        <div class="p-top" style="justify-content:flex-start;gap:10px"><div class="p-icon"><i data-lucide="${p.icon}"></i></div>
          <div class="badges" style="justify-content:flex-start">${privacyBadge(p)}${p.version ? `<span class="badge"><i data-lucide="tag"></i>${p.version}</span>` : ""}<span class="badge"><i data-lucide="folder-git-2"></i>${esc(p.repo)}</span></div></div>
        <h2 id="mTitle">${esc(p.title)}</h2><p>${esc(p.tagline)}</p>
      </div>
      <div class="m-body">
        <p>${esc(p.desc)}</p>
        <div class="m-grid">
          <div class="m-stat"><small>Commits</small><b>${p.commits}</b></div>
          <div class="m-stat"><small>Lenguaje principal</small><b>${mainLang(p)}</b></div>
          <div class="m-stat"><small>Creado</small><b>${fmtDate(p.created)}</b></div>
          <div class="m-stat"><small>Último push</small><b>${fmtDate(p.updated)}</b></div>
        </div>
        <div><h4>Qué hace</h4><ul class="m-feats">${p.features.map(f => `<li><i data-lucide="check"></i><span>${esc(f)}</span></li>`).join("")}</ul></div>
        <div><h4>Stack</h4><div class="p-stack" style="margin:0">${p.stack.map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div></div>
        ${tot ? `<div class="m-langs"><h4 style="margin:0">Lenguajes</h4>${langBar(p.langs)}<ul>${Object.entries(p.langs).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<li><i style="background:${LANG_COLOR[k] || "#71717a"}"></i>${k} <span>${(v / tot * 100).toFixed(1)}%</span></li>`).join("")}</ul></div>` : ""}
        ${p.links.length ? `<div class="m-links">${p.links.map((l, i) => `<a class="btn ${i ? "btn-ghost" : "btn-primary"}" href="${l.url}" target="_blank" rel="noopener"><i data-lucide="${l.icon}"></i>${esc(l.label)}</a>`).join("")}</div>` : ""}
        ${p.hidden ? `<div class="m-note"><i data-lucide="shield"></i><span>Es una herramienta interna para mi clase, así que no enlazo ni el repositorio ni la web.</span></div>`
          : p.private ? `<div class="m-note"><i data-lucide="lock"></i><span>El código de este repositorio es privado${p.links.length ? ", pero la web está en vivo" : ""}.</span></div>` : ""}
      </div>`;
    icons();
    modal.showModal();
    if (hasGSAP && !reduced) {
      gsap.fromTo(mInner, { opacity: 0, y: 30, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: .45, ease: "power3.out" });
      gsap.fromTo($$(".m-body > *", mInner), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, stagger: .05, delay: .1 });
    }
  }
  function closeModal() {
    if (!modal.open) return;
    if (hasGSAP && !reduced) gsap.to(mInner, { opacity: 0, y: 20, scale: .98, duration: .22, onComplete: () => modal.close() });
    else modal.close();
  }
  modal.addEventListener("click", e => { if (e.target === modal || e.target.closest("[data-close]")) closeModal(); });
  modal.addEventListener("cancel", e => { e.preventDefault(); closeModal(); });
  document.addEventListener("click", e => {
    const c = e.target.closest(".p-card, .r-card, [data-open]"); if (!c) return;
    openProject(c.dataset.id || c.dataset.open);
  });
  document.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches?.(".p-card, .r-card")) { e.preventDefault(); openProject(e.target.dataset.id); }
  });

  /* ---------- Actividad ---------- */
  const C = window.CONTRIB;
  if (C) {
    const start = new Date(C.start + "T00:00:00"), pad = start.getDay();
    const lvl = n => n === 0 ? 0 : n <= 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4;
    const cells = Array(pad).fill(`<i style="visibility:hidden"></i>`);
    C.days.forEach((n, i) => {
      const d = new Date(start); d.setDate(d.getDate() + i);
      cells.push(`<i class="l${lvl(n)}" title="${n} contribuciones · ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}"></i>`);
    });
    $("#heat").innerHTML = cells.join("");
    const total = C.days.reduce((a, b) => a + b, 0);
    $("#heatTotal").textContent = `${total} contribuciones en el último año`;
    const wrap = $(".heat-wrap"); requestAnimationFrame(() => wrap.scrollLeft = wrap.scrollWidth);
  }
  const LT = window.LANGS.reduce((a, [, v]) => a + v, 0);
  $("#langBar").innerHTML = window.LANGS.map(([n, v, c]) => `<i title="${n}" style="width:${v / LT * 100}%;background:${c}"></i>`).join("");
  $("#langList").innerHTML = window.LANGS.slice(0, 8).map(([n, v, c]) => `<li><i style="background:${c}"></i>${n}<b>${(v / LT * 100).toFixed(1)}%</b></li>`).join("");
  const MON = [["ene", 4], ["feb", 6], ["mar", 43], ["abr", 9], ["may", 6], ["jun", 22], ["jul", 19], ["ago", 11], ["sep", 46]];
  const mMax = Math.max(...MON.map(m => m[1]));
  $("#months").innerHTML = MON.map(([m, v]) => `<div class="month"><div class="bar" style="height:${Math.max(2, v / mMax * 85)}%"><b>${v}</b></div><span>${m}</span></div>`).join("");

  /* ---------- Timeline ---------- */
  $("#timeline").innerHTML = window.TIMELINE.map(t => `<li class="tl-item"><span class="tl-node"></span>
    <div class="card tl-card reveal"><span class="tl-date">${t.date}</span><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p>
    <div class="tl-links">${t.ids.map(id => `<button data-open="${id}" style="--acc:${byId[id].accent}"><i></i>${esc(byId[id].title)}</button>`).join("")}</div></div></li>`).join("");

  /* ---------- Servicios ---------- */
  $("#services").innerHTML = window.SERVICES.map(s => `<article class="card svc reveal"><div class="p-icon"><i data-lucide="${s.icon}"></i></div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join("");

  icons();
  movePill();

  /* ---------- Terminal ---------- */
  const TERM = [
    ["p", "$ ", "gh repo list carontumrotumero"],
    ["o", "", "<span class='h'>17</span> repositorios · <span class='v'>5 privados</span>"],
    ["p", "$ ", "git log --oneline | wc -l"],
    ["o", "", "<span class='h'>157</span> commits"],
    ["p", "$ ", "./voxelix --launch 1.21.1-fabric"],
    ["o", "", "<span class='c'>▸ Login Microsoft ✓  ▸ Fabric ✓  ▸ Sodium + Iris ✓</span>"],
  ];
  const tb = $("#termBody");
  async function typeTerm() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let html = "";
    for (const [k, pre, txt] of TERM) {
      if (k === "o") { html += txt + "\n"; tb.innerHTML = html + "<span class='caret'></span>"; await sleep(380); continue; }
      let line = `<span class='p'>${pre}</span>`;
      for (let i = 1; i <= txt.length; i++) { tb.innerHTML = html + line + esc(txt.slice(0, i)) + "<span class='caret'></span>"; await sleep(reduced ? 0 : 28 + Math.random() * 40); }
      html += line + esc(txt) + "\n"; await sleep(260);
    }
    tb.innerHTML = html + "<span class='p'>$ </span><span class='caret'></span>";
  }
  typeTerm();

  /* ---------- Nav, progreso, sección activa ---------- */
  const nav = $("#nav"), prog = $("#progress");
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 20);
    const h = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const links = $$(".nav-links a");
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["destacados", "proyectos", "actividad", "trayectoria", "servicios"].forEach(id => io.observe(document.getElementById(id)));

  /* ---------- Partículas pixel ---------- */
  const cv = $("#particles"), ctx = cv.getContext("2d");
  let W, H, parts = [];
  const resize = () => { const d = Math.min(devicePixelRatio || 1, 2); W = cv.width = innerWidth * d; H = cv.height = innerHeight * d; };
  resize(); addEventListener("resize", resize);
  const COLS = ["74,222,128", "167,139,250", "250,204,21"];
  for (let i = 0; i < (innerWidth < 720 ? 18 : 36); i++) parts.push({ x: Math.random(), y: Math.random(), s: 2 + Math.random() * 3, v: .00008 + Math.random() * .00025, c: COLS[i % 3], a: .15 + Math.random() * .35 });
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const d = Math.min(devicePixelRatio || 1, 2);
    for (const p of parts) {
      if (!reduced) { p.y -= p.v; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); } }
      ctx.fillStyle = `rgba(${p.c},${p.a})`; ctx.fillRect(Math.round(p.x * W), Math.round(p.y * H), p.s * d, p.s * d);
    }
    if (!reduced) requestAnimationFrame(loop);
  })();

  /* ---------- Paleta de comandos ---------- */
  const pal = $("#palette"), pin = $("#paletteInput"), plist = $("#paletteList");
  const SECTIONS = [["Proyectos destacados", "#destacados", "layers"], ["Todos los repositorios", "#proyectos", "folder-git-2"], ["Actividad", "#actividad", "activity"], ["Trayectoria", "#trayectoria", "milestone"], ["Servicios", "#servicios", "briefcase"], ["Contacto", "#contacto", "mail"]];
  let items = [], sel = 0;
  function renderPalette() {
    const q = pin.value.trim().toLowerCase();
    const proj = P.filter(p => !q || (p.title + " " + p.repo + " " + p.stack.join(" ") + " " + p.tagline).toLowerCase().includes(q))
      .map(p => ({ label: p.title, sub: p.repo, icon: p.icon, run: () => openProject(p.id) }));
    const secs = SECTIONS.filter(s => !q || s[0].toLowerCase().includes(q)).map(([l, h, ic]) => ({ label: l, sub: "Sección", icon: ic, run: () => document.querySelector(h).scrollIntoView({ behavior: reduced ? "auto" : "smooth" }) }));
    const acts = [{ label: "Abrir GitHub", sub: "@carontumrotumero", icon: "github", run: () => open("https://github.com/carontumrotumero", "_blank", "noopener") },
      { label: "Copiar enlace del portafolio", sub: "Acción", icon: "link", run: () => { navigator.clipboard?.writeText(location.href.split("#")[0]).then(() => toast("Enlace copiado")); } }]
      .filter(a => !q || a.label.toLowerCase().includes(q));
    items = [...proj, ...secs, ...acts]; sel = Math.min(sel, Math.max(0, items.length - 1));
    let i = 0; const grp = (t, arr) => arr.length ? `<li class="grp">${t}</li>` + arr.map(it => `<li class="it${i === sel ? " sel" : ""}" data-i="${i++}" role="option"><i data-lucide="${it.icon}"></i>${esc(it.label)}<small>${esc(it.sub)}</small></li>`).join("") : "";
    plist.innerHTML = grp("Proyectos", proj) + grp("Secciones", secs) + grp("Acciones", acts) || `<li class="grp">Sin resultados</li>`;
    icons();
  }
  function openPalette() { if (modal.open) modal.close(); pin.value = ""; sel = 0; renderPalette(); pal.showModal(); pin.focus(); }
  function runSel(i) { const it = items[i]; if (!it) return; pal.close(); setTimeout(it.run, 50); }
  $("#openPalette").addEventListener("click", openPalette);
  pin.addEventListener("input", () => { sel = 0; renderPalette(); });
  pin.addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % items.length; renderPalette(); $(".it.sel", plist)?.scrollIntoView({ block: "nearest" }); }
    if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + items.length) % items.length; renderPalette(); $(".it.sel", plist)?.scrollIntoView({ block: "nearest" }); }
    if (e.key === "Enter") { e.preventDefault(); runSel(sel); }
  });
  plist.addEventListener("click", e => { const li = e.target.closest(".it"); if (li) runSel(+li.dataset.i); });
  pal.addEventListener("click", e => { if (e.target === pal) pal.close(); });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.open ? pal.close() : openPalette(); }
    else if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openPalette(); }
  });
  function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1800); }

  /* ---------- Contadores ---------- */
  function counters() {
    $$("[data-count]").forEach(el => {
      const to = +el.dataset.count;
      if (!hasGSAP || reduced) { el.textContent = to; return; }
      const o = { v: 0 }; gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", delay: .6, onUpdate: () => el.textContent = Math.round(o.v) });
    });
  }

  /* ---------- Animaciones GSAP ---------- */
  if (!hasGSAP || reduced) { counters(); $$(".heat i").forEach(i => i.style.transform = "none"); $("#tlFill").style.transform = "none"; $$(".tl-item").forEach(i => i.classList.add("on")); return; }
  gsap.registerPlugin(ScrollTrigger, window.Flip || {});

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.from(".nav", { y: -30, opacity: 0, duration: .8 })
    .from(".pill", { y: 16, opacity: 0, duration: .6 }, "-=.5")
    .from(".hero-title .line > span", { yPercent: 110, duration: 1.1, stagger: .12 }, "-=.4")
    .from(".hero-sub", { y: 20, opacity: 0, duration: .8 }, "-=.7")
    .from(".hero-ctas .btn", { y: 16, opacity: 0, duration: .6, stagger: .08 }, "-=.6")
    .from(".stats > div", { y: 16, opacity: 0, duration: .6, stagger: .07 }, "-=.5")
    .from(".cube", { scale: 0, rotateY: -180, duration: 1.4, ease: "elastic.out(1,.6)" }, .3)
    .from(".cube-shadow", { scale: 0, opacity: 0, duration: 1 }, .6)
    .from(".terminal", { y: 40, opacity: 0, duration: .9 }, .7)
    .from(".float-chip", { scale: .6, opacity: 0, duration: .7, stagger: .12, ease: "back.out(2)" }, .9);
  counters();

  // Cubo: rotación continua + seguir al ratón
  const cube = $("#cube"); const rot = { x: -24, y: 38 }, target = { x: 0, y: 0 };
  gsap.to(rot, { y: "+=360", duration: 24, repeat: -1, ease: "none" });
  gsap.to(".scene", { y: -14, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".cube-shadow", { scale: .85, opacity: .7, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
  addEventListener("pointermove", e => { target.x = (e.clientY / innerHeight - .5) * -20; target.y = (e.clientX / innerWidth - .5) * 40; });
  const cur = { x: 0, y: 0 };
  gsap.ticker.add(() => {
    cur.x += (target.x - cur.x) * .06; cur.y += (target.y - cur.y) * .06;
    cube.style.transform = `rotateX(${rot.x + cur.x}deg) rotateY(${rot.y + cur.y}deg)`;
  });
  gsap.to(".c1", { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".c2", { y: 12, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".c3", { y: -8, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".hero-art", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // Reveals
  $$(".section-head").forEach(h => gsap.from(h.children, { y: 26, opacity: 0, duration: .8, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 85%" } }));
  ScrollTrigger.batch(".reveal", { start: "top 90%", onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: .8, stagger: .08, ease: "power3.out", overwrite: true }) });
  gsap.from(".toolbar", { y: 20, opacity: 0, duration: .7, scrollTrigger: { trigger: ".toolbar", start: "top 90%" } });
  ScrollTrigger.batch(".r-card", { start: "top 92%", onEnter: b => gsap.from(b, { y: 30, opacity: 0, duration: .7, stagger: .06, ease: "power3.out" }), once: true });
  gsap.from(".activity .card", { y: 30, opacity: 0, duration: .8, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: ".activity", start: "top 85%" } });

  // Heatmap, lenguajes, meses
  ScrollTrigger.create({ trigger: "#heat", start: "top 88%", once: true, onEnter: () => {
    const cols = $$(".heat i");
    gsap.to(cols, { scale: 1, duration: .35, ease: "back.out(2)", stagger: { each: .0025, from: "start" } });
  }});
  gsap.from("#langBar i", { scaleX: 0, duration: 1, stagger: .05, ease: "power3.out", scrollTrigger: { trigger: "#langBar", start: "top 90%" } });
  gsap.from(".month .bar", { scaleY: 0, duration: 1, stagger: .06, ease: "power3.out", scrollTrigger: { trigger: "#months", start: "top 90%" } });

  // Timeline
  gsap.to("#tlFill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: .5 } });
  $$(".tl-item").forEach(it => ScrollTrigger.create({ trigger: it, start: "top 65%", onEnter: () => it.classList.add("on"), onLeaveBack: () => it.classList.remove("on") }));

  // CTA
  gsap.from(".cta-blocks i", { yPercent: 100, duration: .6, stagger: { each: .02, from: "center" }, ease: "back.out(1.6)", scrollTrigger: { trigger: ".cta", start: "top 80%" } });
  gsap.from(".cta-inner > :not(.cta-blocks)", { y: 24, opacity: 0, duration: .8, stagger: .08, scrollTrigger: { trigger: ".cta", start: "top 80%" } });

  // Botones magnéticos
  if (matchMedia("(hover: hover)").matches) $$(".btn").forEach(b => {
    b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .18, y: (e.clientY - r.top - r.height / 2) * .25, duration: .3 }); });
    b.addEventListener("pointerleave", () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.5)" }));
  });
  addEventListener("load", () => ScrollTrigger.refresh());
})();
