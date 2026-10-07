(() => {
  "use strict";

  /* ================= utilidades ================= */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const rand = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[rand(arr.length)];
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s).toLowerCase()
    .replace(/α/g, "alfa").replace(/β/g, "beta")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();
  const lev = (a, b) => {
    if (Math.abs(a.length - b.length) > 2) return 9;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  };
  const store = {
    get(k, def) { try { const v = localStorage.getItem("farma:" + k); return v == null ? def : JSON.parse(v); } catch { return def; } },
    set(k, v) { try { localStorage.setItem("farma:" + k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } }
  };

  const famById = Object.fromEntries(FAMILIAS.map((f) => [f.id, f]));
  const drugsOf = (famId) => FARMACOS.filter((d) => d.fam === famId);
  const enfTag = (e) => `<span class="tag ${e}">${e === "mix" ? "HTA + DM2 + Depresión" : ENF[e]}</span>`;
  const byEnf = (list, enf, getter) => enf === "all" ? list : list.filter((x) => getter(x) === enf);

  /* ================= tabs ================= */
  function showTab(id) {
    $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === id));
    $$(".panel").forEach((p) => p.classList.toggle("active", p.id === id));
    store.set("tab", id);
  }
  $$(".tab").forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab)));

  function segmented(el, onChange) {
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      el.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      onChange(b.dataset.v);
    });
  }

  /* ================= FLASHCARDS ================= */
  const F = { mode: "familia", enf: "all", deck: [], i: 0, know: new Set(), review: new Set() };

  function buildDeck() {
    let items;
    if (F.mode === "farmaco") items = byEnf(FARMACOS, F.enf, (d) => famById[d.fam].enf).map((d) => ({ type: "farmaco", d, key: "d:" + d.n }));
    else if (F.mode === "familia") items = byEnf(FAMILIAS, F.enf, (f) => f.enf).map((f) => ({ type: "familia", f, key: "f:" + f.id }));
    else items = byEnf(FAMILIAS, F.enf, (f) => f.enf).map((f) => ({ type: "mecanismo", f, key: "m:" + f.id }));
    return items;
  }
  function resetFlash(shuffleIt = true) {
    const d = buildDeck();
    F.deck = shuffleIt ? shuffle(d) : d;
    F.i = 0; F.know.clear(); F.review.clear();
    renderCard();
  }

  function drugChips(famId) {
    return `<div class="chips">${drugsOf(famId).map((d) => `<span class="chip">${esc(d.n)}</span>`).join("")}</div>`;
  }

  function renderCard() {
    const card = $("#flashcard");
    card.classList.remove("flipped");
    const total = F.deck.length;
    if (!total) { $("#cardFront").innerHTML = "<p>No hay tarjetas.</p>"; $("#cardBack").innerHTML = ""; return; }
    const it = F.deck[F.i];
    let front = "", back = "";
    if (it.type === "familia") {
      const f = it.f;
      front = `${enfTag(f.enf)}<div class="q">Familia</div><div class="big">${esc(f.nombre)}</div><div class="sub">${esc(f.completo)}</div><div class="sub">¿Mecanismo? ¿Fármacos? ¿Efectos adversos?</div>`;
      back = `<div class="answer">${esc(f.nombre)}</div><dl>
        <div><dt>Mecanismo</dt><dd>${esc(f.mecanismo)}</dd></div>
        <div><dt>Fármacos</dt><dd>${drugChips(f.id)}</dd></div>
        <div><dt>Pista de nombre</dt><dd>${esc(f.sufijo)}</dd></div>
        <div><dt>Efectos adversos</dt><dd>${esc(f.adversos)}</dd></div>
        ${f.ventajas ? `<div><dt>Ventajas</dt><dd>${esc(f.ventajas)}</dd></div>` : ""}
        <div><dt>Contraindicaciones / cuidado</dt><dd>${esc(f.contra)}</dd></div></dl>`;
    } else if (it.type === "farmaco") {
      const d = it.d, f = famById[d.fam];
      front = `${enfTag(f.enf)}<div class="q">Fármaco</div><div class="big">${esc(d.n)}</div><div class="sub">¿Familia? ¿Mecanismo? ¿Dosis?</div>`;
      back = `<div class="answer">${esc(f.nombre)}</div><dl>
        <div><dt>Mecanismo</dt><dd>${esc(f.mecCorto)}</dd></div>
        <div><dt>Dosis inicial → máxima</dt><dd>${esc(d.ini)} → <b>${esc(d.max)}</b></dd></div>
        <div><dt>Dato clave</dt><dd>${esc(d.nota)}</dd></div>
        <div><dt>Efectos adversos de la familia</dt><dd>${esc(f.adversos)}</dd></div></dl>`;
    } else {
      const f = it.f;
      front = `${enfTag(f.enf)}<div class="q">Mecanismo de acción</div><div class="mid">${esc(f.mecCorto)}</div><div class="sub">¿Qué familia? ¿Qué fármacos?</div>`;
      back = `<div class="answer">${esc(f.nombre)}</div><dl>
        <div><dt>Mecanismo completo</dt><dd>${esc(f.mecanismo)}</dd></div>
        <div><dt>Fármacos</dt><dd>${drugChips(f.id)}</dd></div>
        <div><dt>Consecuencia (efectos adversos)</dt><dd>${esc(f.adversos)}</dd></div></dl>`;
    }
    $("#cardFront").innerHTML = front;
    $("#cardBack").innerHTML = back;
    $("#cardBack").scrollTop = 0;
    $("#flashCount").textContent = `${F.i + 1} / ${total}`;
    $("#flashBar").style.width = `${((F.i + 1) / total) * 100}%`;
    $("#flashStats").textContent = `✓ ${F.know.size} · ↻ ${F.review.size}`;
  }
  const flip = () => $("#flashcard").classList.toggle("flipped");
  const move = (n) => { if (!F.deck.length) return; F.i = (F.i + n + F.deck.length) % F.deck.length; renderCard(); };
  function mark(set, other) {
    if (!F.deck.length) return;
    const k = F.deck[F.i].key; set.add(k); other.delete(k);
    if (F.i === F.deck.length - 1) {
      renderCard();
      $("#flashStats").textContent = `¡Terminaste! ✓ ${F.know.size} · ↻ ${F.review.size}`;
    } else move(1);
  }

  $("#flashcard").addEventListener("click", flip);
  $("#prevCard").addEventListener("click", () => move(-1));
  $("#nextCard").addEventListener("click", () => move(1));
  $("#knowCard").addEventListener("click", () => mark(F.know, F.review));
  $("#reviewCard").addEventListener("click", () => mark(F.review, F.know));
  $("#shuffleCards").addEventListener("click", () => { F.deck = shuffle(F.deck); F.i = 0; renderCard(); });
  $("#resetFlash").addEventListener("click", () => resetFlash());
  $("#onlyReview").addEventListener("click", () => {
    const rev = F.deck.filter((x) => F.review.has(x.key));
    if (!rev.length) { $("#flashStats").textContent = "No hay tarjetas marcadas para repasar"; return; }
    F.deck = shuffle(rev); F.i = 0; F.know.clear(); F.review.clear(); renderCard();
  });
  segmented($("#flashMode"), (v) => { F.mode = v; resetFlash(); });
  segmented($("#flashEnf"), (v) => { F.enf = v; resetFlash(); });
  document.addEventListener("keydown", (e) => {
    if (!$("#flash").classList.contains("active")) return;
    if (["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(e.target.tagName)) return;
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
    else if (e.key === "ArrowRight") move(1);
    else if (e.key === "ArrowLeft") move(-1);
  });

  /* ================= CORRELACIÓN ================= */
  const C = { rows: [], checked: false };

  // respuestas aceptadas para una familia
  const famAnswers = (f) => [f.nombre, f.nombre.replace(/\s*\(.*\)\s*/, ""), f.completo, ...f.alias].map(norm);
  // respuestas aceptadas para un fármaco
  const drugAnswers = (d) => {
    const n = norm(d.n), out = [n];
    if (n.startsWith("insulina ")) out.push(n.slice(9));
    if (d.n.includes("/")) out.push(norm(d.n.replace("/", " ")), "sacubitrilo");
    return out;
  };
  function matches(input, accepted) {
    const v = norm(input);
    if (!v) return { ok: false };
    if (accepted.includes(v)) return { ok: true };
    if (v.length >= 6 && accepted.some((a) => a.length >= 6 && lev(v, a) <= (a.length > 10 ? 2 : 1))) return { ok: true, typo: true };
    return { ok: false };
  }

  const MODES = {
    f2fam: { left: "Fármaco", right: "Familia", instr: "Escribe la familia de cada fármaco (p. ej., IECA, ARA II, iSGLT2, ISRS…). Mayúsculas y acentos no importan.", list: "dlFamilias" },
    fam2f: { left: "Familia", right: "Un fármaco de esa familia", instr: "Escribe cualquier fármaco que pertenezca a la familia.", list: "dlFarmacos" },
    f2f: { left: "Fármaco", right: "Otro fármaco de la misma familia", instr: "Escribe OTRO fármaco distinto que sea de la misma familia.", list: "dlFarmacos" },
    mec2fam: { left: "Mecanismo", right: "Familia", instr: "Lee el mecanismo y escribe la familia a la que corresponde.", list: "dlFamilias" },
    letras: { left: "Fármaco", right: "Letra", instr: "Como en las tablas del docente: escribe la letra de la familia que corresponde a cada fármaco.", list: null }
  };

  function buildCorr() {
    const mode = $("#corrMode").value, enf = $("#corrEnf").value, n = +$("#corrN").value;
    const conf = MODES[mode];
    C.checked = false; C.mode = mode;
    $("#corrLeftHead").textContent = conf.left;
    $("#corrRightHead").textContent = conf.right;
    $("#corrInstr").textContent = conf.instr;
    $("#corrScore").hidden = true;
    $("#corrLetters").hidden = mode !== "letras";

    const drugs = byEnf(FARMACOS, enf, (d) => famById[d.fam].enf);
    const fams = byEnf(FAMILIAS, enf, (f) => f.enf);
    let rows = [];

    if (mode === "f2fam") {
      rows = shuffle(drugs).slice(0, n).map((d) => {
        const f = famById[d.fam];
        return { left: d.n, accepted: famAnswers(f), answer: f.nombre };
      });
    } else if (mode === "fam2f" || mode === "mec2fam") {
      const pool = shuffle(fams.filter((f) => drugsOf(f.id).length >= (mode === "fam2f" ? 1 : 0)));
      rows = pool.slice(0, n).map((f) => {
        if (mode === "fam2f") {
          const ds = drugsOf(f.id);
          return { left: f.nombre, accepted: ds.flatMap(drugAnswers), answer: ds.map((d) => d.n).join(", ") };
        }
        return { left: f.mecCorto, accepted: famAnswers(f), answer: f.nombre };
      });
    } else if (mode === "f2f") {
      const ok = drugs.filter((d) => drugsOf(d.fam).length >= 2);
      // como mucho dos fármacos por familia para variar
      const seen = {};
      rows = shuffle(ok).filter((d) => (seen[d.fam] = (seen[d.fam] || 0) + 1) <= 2).slice(0, n).map((d) => {
        const others = drugsOf(d.fam).filter((x) => x !== d);
        return { left: d.n, accepted: others.flatMap(drugAnswers), answer: others.map((x) => x.n).join(", "), extra: famById[d.fam].nombre };
      });
    } else {
      // letras: una familia por fármaco, familias distintas
      const famPool = shuffle(fams.filter((f) => drugsOf(f.id).length)).slice(0, Math.min(n, 12));
      const lettersFams = shuffle(famPool);
      const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      $("#corrLetters").innerHTML = lettersFams.map((f, i) => `<div><b>${L[i]}.</b>${esc(f.nombre)}</div>`).join("");
      rows = shuffle(famPool).map((f) => {
        const d = pick(drugsOf(f.id));
        const letter = L[lettersFams.indexOf(f)];
        return { left: d.n, accepted: [letter.toLowerCase()], answer: `${letter} (${f.nombre})`, exact: true };
      });
    }
    C.rows = rows;

    const listId = conf.list && $("#corrHelp").checked ? conf.list : "";
    $("#corrBody").innerHTML = rows.map((r, i) => `
      <tr data-i="${i}">
        <td>${i + 1}</td>
        <td class="left">${esc(r.left)}</td>
        <td><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" ${listId ? `list="${listId}"` : ""} ${mode === "letras" ? 'maxlength="1" style="max-width:70px;text-transform:uppercase"' : ""} aria-label="Respuesta ${i + 1}"><div class="fix"></div></td>
      </tr>`).join("");
  }

  function checkCorr(reveal = false) {
    let good = 0;
    $$("#corrBody tr").forEach((tr) => {
      const r = C.rows[+tr.dataset.i];
      const input = tr.querySelector("input");
      const res = r.exact ? { ok: norm(input.value) === r.accepted[0] } : matches(input.value, r.accepted);
      if (C.mode === "f2f" && norm(input.value) === norm(r.left)) res.ok = false;
      tr.classList.toggle("ok", res.ok);
      tr.classList.toggle("ko", !res.ok);
      const fix = tr.querySelector(".fix");
      if (res.ok) {
        good++;
        fix.textContent = res.typo ? `✓ Correcto (ojo con la ortografía: ${r.answer.split(",")[0]})` : (C.mode === "fam2f" || C.mode === "f2f") ? `✓ También: ${r.answer}` : "✓ Correcto";
      } else {
        fix.textContent = `${input.value.trim() ? "✗" : "—"} Respuesta correcta: ${r.answer}${r.extra ? ` (familia: ${r.extra})` : ""}`;
      }
    });
    C.checked = true;
    const n = C.rows.length;
    const pct = n ? Math.round((good / n) * 100) : 0;
    const s = $("#corrScore");
    s.hidden = false;
    s.textContent = reveal ? "Respuestas mostradas" : `${good} / ${n} correctas (${pct} %)${pct === 100 ? " 🎉" : ""}`;
  }

  // datalists
  $("#dlFamilias").innerHTML = FAMILIAS.map((f) => `<option value="${esc(f.nombre)}">`).join("");
  $("#dlFarmacos").innerHTML = FARMACOS.map((d) => `<option value="${esc(d.n)}">`).join("");

  $("#corrCheck").addEventListener("click", () => checkCorr());
  $("#corrShow").addEventListener("click", () => checkCorr(true));
  $("#corrReset").addEventListener("click", buildCorr);
  ["#corrMode", "#corrEnf", "#corrN", "#corrHelp"].forEach((s) => $(s).addEventListener("change", buildCorr));
  $("#corrBody").addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || e.target.tagName !== "INPUT") return;
    e.preventDefault();
    const inputs = $$("#corrBody input");
    const i = inputs.indexOf(e.target);
    if (i < inputs.length - 1) inputs[i + 1].focus(); else checkCorr();
  });

  /* ================= CASOS CLÍNICOS ================= */
  const K = { ok: 0, total: 0, recent: [], current: null };

  const contexto = { hta: "HTA", dm2: "DM2", dep: "depresión moderada" };
  function paciente(cond = "") {
    const c = norm(cond);
    let sx = Math.random() < 0.5 ? "F" : "M";
    let edad = 40 + rand(31);
    if (/embarazo|lactancia|vulvovaginal|anorexia|bulimia/.test(c)) { sx = "F"; edad = 24 + rand(14); }
    if (/prostatica|ginecomastia/.test(c)) sx = "M";
    if (/anciano/.test(c)) edad = 75 + rand(11);
    if (/17 anos/.test(c)) edad = 17;
    const nombre = sx === "F" ? "Mujer" : "Hombre";
    return { sx, edad, txt: `${nombre} de ${edad} años` };
  }

  function genElegir(enf) {
    const pool = byEnf(ELEGIR, enf === "mix" ? "all" : enf, (r) => r.enf);
    if (!pool.length) return null;
    const r = pick(pool);
    const p = paciente(r.cond);
    const cond = r.cond.replace(/\s*\(anciano\)|^edad de 17 años$/, "");
    const nc = norm(cond);
    const skipCtx = (r.enf === "dep" && nc.includes("depresion")) || (r.enf === "hta" && /\bhta\b/.test(nc));
    const condTxt = !cond ? `con ${contexto[r.enf]}` : skipCtx ? `con ${cond}` : `con ${contexto[r.enf]} y ${cond}`;
    const ask = r.evitar && Math.random() < 0.4 ? "evitar" : "mejor";
    const correct = ask === "evitar" ? r.evitar : r.mejor;
    const wrong = shuffle(ask === "evitar" ? r.noEvitar : r.noMejor).slice(0, 3);
    const ops = shuffle([correct, ...wrong]);
    return {
      tipo: "Elegir según el paciente", enf: r.enf,
      t: `${p.txt} ${condTxt}. ${ask === "evitar" ? "¿Qué debes <b>evitar</b>?" : "¿Cuál es la mejor opción?"}`,
      ops, ok: ops.indexOf(correct),
      exp: `<b>${esc(correct)}.</b> ${esc(r.por)}${ask === "evitar" ? ` Mejor dar: ${esc(r.mejor)}.` : r.evitar ? ` Evitar: ${esc(r.evitar)}.` : ""}`
    };
  }

  function genAdverso(enf) {
    let pool = ADVERSOS.map((a) => ({ a, drugs: ADVERSO_FARMACO[a.ae].map((n) => FARMACOS.find((d) => d.n === n)) }));
    if (enf !== "all" && enf !== "mix") pool = pool.filter((x) => x.drugs.some((d) => famById[d.fam].enf === enf));
    if (!pool.length) return null;
    const { a, drugs } = pick(pool);
    const cands = enf !== "all" && enf !== "mix" ? drugs.filter((d) => famById[d.fam].enf === enf) : drugs;
    const culpable = pick(cands);
    const banned = new Set([...a.fams, "potenciador"]);
    const others = shuffle(FAMILIAS.filter((f) => !banned.has(f.id) && drugsOf(f.id).length)).slice(0, 3).map((f) => pick(drugsOf(f.id)));
    const ops = shuffle([culpable, ...others]).map((d) => d.n);
    const p = paciente(a.ae.includes("vulvovaginal") ? "vulvovaginal" : a.ae.includes("ginecomastia") || a.ae.includes("priapismo") ? "prostatica" : a.ae.includes("anciano") ? "anciano" : "");
    const f = famById[culpable.fam];
    return {
      tipo: "Efecto adverso → fármaco", enf: "mix",
      t: `${p.txt} con HTA, DM2 y depresión. Hace unas semanas se le agregó un fármaco nuevo y ahora presenta <b>${esc(a.ae)}</b>. ¿Cuál de estos fármacos es el responsable más probable?`,
      ops, ok: ops.indexOf(culpable.n),
      exp: `<b>${esc(culpable.n)}</b> (${esc(f.nombre)}). ${esc(a.exp)}`
    };
  }

  function genFijo(enf) {
    const pool = enf === "all" ? CASOS_FIJOS : CASOS_FIJOS.filter((c) => c.enf === enf);
    if (!pool.length) return null;
    const c = pick(pool);
    const order = shuffle(c.ops.map((_, i) => i));
    return { tipo: "Minicaso del documento", enf: c.enf, t: esc(c.t), ops: order.map((i) => c.ops[i]), ok: order.indexOf(c.ok), exp: esc(c.exp), id: c.t };
  }

  const PA_CATS = ["Óptima", "Normal", "Normal alta", "HTA grado 1", "HTA grado 2", "HTA grado 3", "HTA sistólica aislada"];
  function clasificaPA(s, d) {
    if (s >= 140 && d < 90) return 6;
    const gs = s < 120 ? 0 : s < 130 ? 1 : s < 140 ? 2 : s < 160 ? 3 : s < 180 ? 4 : 5;
    const gd = d < 80 ? 0 : d < 85 ? 1 : d < 90 ? 2 : d < 100 ? 3 : d < 110 ? 4 : 5;
    return Math.max(gs, gd);
  }
  function genClasif(enf) {
    if (enf !== "all" && enf !== "hta") return null;
    // valores «trampa»: categorías distintas para sistólica y diastólica
    const s = 110 + rand(85), d = 70 + rand(50);
    const cat = clasificaPA(s, d);
    const gSis = s < 120 ? 0 : s < 130 ? 1 : s < 140 ? 2 : s < 160 ? 3 : s < 180 ? 4 : 5;
    const wrongs = shuffle(PA_CATS.map((_, i) => i).filter((i) => i !== cat && !(cat === 6 && i === gSis))).sort((a, b) => Math.abs(a - cat) - Math.abs(b - cat)).slice(0, 3);
    const opsIdx = shuffle([cat, ...wrongs]);
    const p = paciente();
    let trat = "";
    if (cat >= 3) trat = s >= 160 || d >= 100 ? " Con PA ≥160/100 se inicia fármaco de inmediato; la GPC propone terapia doble (IECA/ARA II + calcioantagonista)." : " Grado 1: fármaco inmediato sólo si hay riesgo CV alto o daño a órgano blanco; meta <140/90 (<130/80 si se tolera).";
    const expl = cat === 6
      ? `Sistólica ≥140 con diastólica <90 → HTA sistólica aislada.`
      : `Se clasifica por la cifra más alta: sistólica ${s} → ${PA_CATS[s < 120 ? 0 : s < 130 ? 1 : s < 140 ? 2 : s < 160 ? 3 : s < 180 ? 4 : 5]}; diastólica ${d} → ${PA_CATS[d < 80 ? 0 : d < 85 ? 1 : d < 90 ? 2 : d < 100 ? 3 : d < 110 ? 4 : 5]}.`;
    return {
      tipo: "Clasificación de la PA (GPC IMSS)", enf: "hta",
      t: `${p.txt} acude a consulta. Su PA confirmada en varias visitas es <b>${s}/${d} mmHg</b>. Según la GPC mexicana, ¿cómo se clasifica?`,
      ops: opsIdx.map((i) => PA_CATS[i]), ok: opsIdx.indexOf(cat),
      exp: `<b>${PA_CATS[cat]}.</b> ${expl}${trat}`
    };
  }

  const IMC_CATS = ["Bajo peso", "Peso normal", "Sobrepeso", "Obesidad"];
  function genIMC(enf) {
    if (enf !== "all" && enf !== "dm2") return null;
    const sx = Math.random() < 0.5 ? "F" : "M";
    const tipo = rand(3); // 0 adulto, 1 talla baja, 2 ≥60 años
    const edad = tipo === 2 ? 60 + rand(20) : 22 + rand(36);
    let talla;
    if (tipo === 1) talla = sx === "F" ? 1.40 + rand(10) / 100 : 1.48 + rand(12) / 100;
    else talla = sx === "F" ? 1.52 + rand(16) / 100 : 1.62 + rand(20) / 100;
    const imcObj = 17 + Math.random() * 20;
    const peso = Math.round(imcObj * talla * talla);
    const imc = peso / (talla * talla);
    const imcR = Math.round(imc * 10) / 10;
    let sob = 25, obe = 30, regla = "adulto de 20 a 59 años (sobrepeso 25–29.9, obesidad ≥30)";
    if (tipo === 1) { sob = 23; obe = 25; regla = `talla baja (${sx === "F" ? "mujer <1.50 m" : "hombre <1.60 m"}): sobrepeso 23–24.9, obesidad ≥25`; }
    if (tipo === 2) { sob = 28; obe = 32; regla = "adulto de 60 años o más: sobrepeso 28–31.9, obesidad ≥32"; }
    const cat = imcR < 18.5 ? 0 : imcR < sob ? 1 : imcR < obe ? 2 : 3;
    const oms = imcR < 18.5 ? 0 : imcR < 25 ? 1 : imcR < 30 ? 2 : 3;
    const nombre = sx === "F" ? "Mujer" : "Hombre";
    return {
      tipo: "IMC (NOM-008-SSA3-2017)", enf: "dm2",
      t: `${nombre} de ${edad} años con DM2. Pesa <b>${peso} kg</b> y mide <b>${talla.toFixed(2)} m</b>. Según la NOM-008-SSA3-2017, ¿cómo clasificas su peso?`,
      ops: IMC_CATS.slice(), ok: cat,
      exp: `IMC = ${peso} ÷ (${talla.toFixed(2)} × ${talla.toFixed(2)}) = <b>${imcR.toFixed(1)} kg/m²</b>. Corte para ${regla} → <b>${IMC_CATS[cat]}</b>.${oms !== cat ? ` Ojo: con la tabla de la OMS saldría «${IMC_CATS[oms]}» (error típico).` : ""}`
    };
  }

  const GENS = { elegir: genElegir, adverso: genAdverso, fijo: genFijo, clasif: genClasif, imc: genIMC };
  const PESOS = { elegir: 4, adverso: 3, fijo: 3, clasif: 1, imc: 1 };

  function nuevoCaso() {
    const enf = $("#casoEnf").value, tipo = $("#casoTipo").value;
    let caso = null;
    for (let tries = 0; tries < 30 && !caso; tries++) {
      let g = tipo;
      if (tipo === "all") {
        const bag = Object.entries(PESOS).flatMap(([k, w]) => Array(w).fill(k));
        g = enf === "mix" ? pick(["adverso", "fijo", "fijo"]) : pick(bag);
      }
      if (enf === "mix" && g !== "adverso" && g !== "fijo") g = pick(["adverso", "fijo"]);
      const c = GENS[g](enf);
      if (!c) continue;
      if (K.recent.includes(c.t) && tries < 25) continue;
      caso = c;
    }
    if (!caso) {
      $("#casoTag").innerHTML = "";
      $("#casoText").textContent = "No hay casos de ese tipo para este tema. Cambia el filtro.";
      $("#casoOpts").innerHTML = ""; $("#casoExp").hidden = true; return;
    }
    K.recent.push(caso.t); if (K.recent.length > 15) K.recent.shift();
    K.current = caso; K.answered = false;
    $("#casoTag").innerHTML = `${enfTag(caso.enf)}<span class="tag" style="background:var(--muted)">${esc(caso.tipo)}</span>`;
    $("#casoText").innerHTML = caso.t;
    $("#casoOpts").innerHTML = caso.ops.map((o, i) => `<button class="opt" data-i="${i}"><span class="l">${"ABCD"[i]}</span><span>${esc(o)}</span></button>`).join("");
    $("#casoExp").hidden = true;
  }

  $("#casoOpts").addEventListener("click", (e) => {
    const b = e.target.closest(".opt");
    if (!b || K.answered) return;
    K.answered = true;
    const i = +b.dataset.i, c = K.current, right = i === c.ok;
    K.total++; if (right) K.ok++;
    $$("#casoOpts .opt").forEach((o, j) => {
      o.disabled = true;
      if (j === c.ok) o.classList.add("right");
      else if (j === i) o.classList.add("wrong");
    });
    const ex = $("#casoExp");
    ex.hidden = false;
    ex.innerHTML = `<div class="verdict ${right ? "good" : "bad"}">${right ? "✓ ¡Correcto!" : `✗ Incorrecto — la respuesta es ${"ABCD"[c.ok]}`}</div>${c.exp}`;
    $("#casoScore").textContent = `${K.ok} / ${K.total}`;
  });
  $("#casoNext").addEventListener("click", nuevoCaso);
  $("#casoResetScore").addEventListener("click", () => { K.ok = 0; K.total = 0; $("#casoScore").textContent = "0 / 0"; nuevoCaso(); });
  ["#casoEnf", "#casoTipo"].forEach((s) => $(s).addEventListener("change", nuevoCaso));

  /* ================= TABLAS PARA LLENAR ================= */
  const TB = { id: TABLAS[0].id, nivel: "facil", celdas: [] };

  // forma canónica de un valor numérico: «≥ 126 mg/dL» → «≥126», «25,0 a 29,9» → «25-29.9»
  function canonNum(s) {
    let v = String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    v = v.replace(/mg\s*\/?\s*dl|mmhg|kg\s*\/?\s*m\s*(2|²)?|%|anos|cm|\bm\b/g, " ");
    v = v.replace(/mayor(es)?\s+o\s+igual(es)?(\s+(a|que))?|>=|=>|≥/g, "≥");
    v = v.replace(/menor(es)?(\s+(a|que|de))?|<|＜/g, "<");
    v = v.replace(/(\d),(\d)/g, "$1.$2").replace(/[–—−‒]/g, "-");
    v = v.replace(/(\d)\s*(a|al|hasta)\s*(\d)/g, "$1-$3");
    v = v.replace(/\s+/g, "");
    v = v.replace(/\d+(\.\d+)?/g, (m) => String(parseFloat(m)));
    return v;
  }
  const canonCon = (s) => norm(s).replace(/\s+/g, "") === "yo" ? "y/o" : norm(s).replace(/\s+/g, "") === "y" ? "y" : String(s).replace(/\s+/g, "").toLowerCase();
  function celdaOk(c, val) {
    if (!val.trim()) return false;
    if (c.tipo === "num") return canonNum(val) === canonNum(c.v);
    if (c.tipo === "con") return canonCon(val) === c.v;
    const v = norm(val);
    return [c.v, c.v.replace(/\s*\(.*\)\s*/, ""), ...(c.alt || [])].map(norm).includes(v);
  }

  function renderSelTablas() {
    $("#tablaSel").innerHTML = TABLAS.map((t) => `<button data-v="${t.id}" class="${t.id === TB.id ? "on" : ""}">${esc(t.nombre)}</button>`).join("");
  }

  function buildTabla() {
    const t = TABLAS.find((x) => x.id === TB.id);
    $("#tablaTitulo").textContent = t.titulo;
    $("#tablaNota").textContent = t.nota;
    $("#tablaNota").hidden = true;
    $("#tablaScore").hidden = true;
    $("#tablaKeys").querySelector('[data-k="y/o"]').hidden = t.id !== "hta";

    // decidir qué celdas se piden
    const candidatas = [];
    t.filas.forEach((fila, r) => fila.forEach((c, k) => {
      if (c.fijo) return;
      if (k === 0 && TB.nivel !== "dificil") return; // las etiquetas sólo se piden en «Todo en blanco»
      candidatas.push(`${r}:${k}`);
    }));
    let pedir;
    if (TB.nivel === "facil") {
      const n = Math.max(3, Math.round(candidatas.length * 0.45));
      pedir = new Set(shuffle(candidatas).slice(0, n));
    } else pedir = new Set(candidatas);

    TB.celdas = [];
    const head = `<thead><tr>${t.cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>`;
    const body = t.filas.map((fila, r) => `<tr>${fila.map((c, k) => {
      const cls = k === 0 ? "lab" : c.tipo === "con" ? "con" : "";
      if (!pedir.has(`${r}:${k}`)) return `<td class="${cls} given">${esc(c.v)}</td>`;
      const i = TB.celdas.push(c) - 1;
      const w = "";
      return `<td class="${cls}"><input type="text" data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" ${w} aria-label="${esc(t.cols[k] || "Conector")} de ${esc(fila[0].v)}"><div class="fix"></div></td>`;
    }).join("")}</tr>`).join("");
    $("#tablaFill").innerHTML = head + `<tbody>${body}</tbody>`;
  }

  function checkTabla(reveal = false) {
    let good = 0;
    $$("#tablaFill input").forEach((inp) => {
      const c = TB.celdas[+inp.dataset.i];
      const td = inp.parentElement;
      const ok = celdaOk(c, inp.value);
      if (ok) good++;
      td.classList.toggle("ok", ok);
      td.classList.toggle("ko", !ok);
      td.querySelector(".fix").textContent = ok ? "✓" : `${inp.value.trim() ? "✗" : "—"} ${c.v}`;
    });
    const n = TB.celdas.length, pct = n ? Math.round((good / n) * 100) : 0;
    const s = $("#tablaScore");
    s.hidden = false;
    s.textContent = reveal ? "Respuestas mostradas" : `${good} / ${n} correctas (${pct} %)${pct === 100 ? " 🎉" : ""}`;
    $("#tablaNota").hidden = false;
  }

  // teclado de símbolos: inserta en el último campo enfocado
  let lastInput = null;
  $("#tablaFill").addEventListener("focusin", (e) => { if (e.target.tagName === "INPUT") lastInput = e.target; });
  $("#tablaKeys").addEventListener("mousedown", (e) => e.preventDefault()); // no robar el foco
  $("#tablaKeys").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const inp = lastInput && document.body.contains(lastInput) ? lastInput : $("#tablaFill input");
    if (!inp) return;
    const k = b.dataset.k, st = inp.selectionStart ?? inp.value.length, en = inp.selectionEnd ?? inp.value.length;
    inp.value = inp.value.slice(0, st) + k + inp.value.slice(en);
    inp.focus();
    inp.setSelectionRange(st + k.length, st + k.length);
  });
  $("#tablaFill").addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || e.target.tagName !== "INPUT") return;
    e.preventDefault();
    const inputs = $$("#tablaFill input");
    const i = inputs.indexOf(e.target);
    if (i < inputs.length - 1) inputs[i + 1].focus(); else checkTabla();
  });
  segmented($("#tablaSel"), (v) => { TB.id = v; buildTabla(); });
  segmented($("#tablaNivel"), (v) => { TB.nivel = v; buildTabla(); });
  $("#tablaCheck").addEventListener("click", () => checkTabla());
  $("#tablaShow").addEventListener("click", () => checkTabla(true));
  $("#tablaReset").addEventListener("click", buildTabla);

  /* ================= inicio ================= */
  resetFlash();
  buildCorr();
  renderSelTablas();
  buildTabla();
  nuevoCaso();
  showTab(store.get("tab", "flash"));
})();
