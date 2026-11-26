/* Sir Betalot Official Store: shared header, footer, cart and page logic. No build step.
   Needs i18n.js and products.js loaded first. */
(function () {
  "use strict";
  const S = window.SBA_STORE;
  const { lang, t, P, setLang, apply } = window.SBA_I18N;
  const IMG = "assets/img/products/";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const money = (n) => new Intl.NumberFormat(t("meta.locale"), { style: "currency", currency: S.currency }).format(n);
  const byId = (id) => S.products.find((p) => p.id === id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const inStock = (p) => Object.values(p.sizes).some((n) => n > 0);
  const colName = (c) => (c ? P(c, "name") : t("shop.all"));
  const colBlurb = (c) => (c ? P(c, "blurb") : t("shop.allBlurb"));
  /* Brazilian size letters in Portuguese; the cart keeps the international key. */
  const SIZE_PT = { S: "P", M: "M", L: "G", XL: "GG", XXL: "XGG", "One Size": "Único" };
  const sizeLabel = (s) => (lang === "pt" ? SIZE_PT[s] || s : s);

  const ICON = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    returns: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2.3 1.8 3.8 4 4v3.1c-1.5 0-2.8-.4-4-1.2v6.6A5.5 5.5 0 1 1 11 10v3.2a2.4 2.4 0 1 0 2.3 2.3V3h3.2Z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.8.4-3.8s0-2.6-.4-3.8ZM10 15V9l5.2 3L10 15Z"/></svg>'
  };
  window.SBA_ICON = ICON;

  /* ---------------- Cart ---------------- */
  const KEY = "sba_cart_v1";
  const cart = {
    items: (() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } })().filter((i) => byId(i.id)),
    save() { localStorage.setItem(KEY, JSON.stringify(this.items)); renderCart(); },
    count() { return this.items.reduce((a, i) => a + i.qty, 0); },
    subtotal() { return this.items.reduce((a, i) => a + i.qty * (byId(i.id)?.price || 0), 0); },
    add(id, size, qty = 1) {
      const p = byId(id); if (!p) return;
      const max = p.sizes[size] || 0;
      const line = this.items.find((i) => i.id === id && i.size === size);
      if (line) line.qty = Math.min(max, line.qty + qty); else this.items.push({ id, size, qty: Math.min(max, qty) });
      this.save();
    },
    set(idx, qty) {
      const line = this.items[idx]; if (!line) return;
      const max = byId(line.id)?.sizes[line.size] || 1;
      if (qty <= 0) this.items.splice(idx, 1); else line.qty = Math.min(max, qty);
      this.save();
    }
  };

  /* ---------------- Layout ---------------- */
  const page = document.body.dataset.page;
  const navLinks = [
    ["shop.html", t("nav.all"), "all"],
    ["shop.html?c=tees", t("nav.tees"), "tees"],
    ["shop.html?c=hoodies", t("nav.hoodies"), "hoodies"],
    ["shop.html?c=headwear", t("nav.headwear"), "headwear"],
    ["index.html#knights-club", t("nav.club"), "club"]
  ];
  const currentC = new URLSearchParams(location.search).get("c") || "all";

  const langToggle = (extra = "") => `
    <div class="lang${extra}" role="group" aria-label="${t("lang.label")}">
      <button type="button" data-lang="pt" aria-pressed="${lang === "pt"}" lang="pt-BR"${lang === "pt" ? "" : ' aria-label="Mudar para português"'}>PT</button>
      <button type="button" data-lang="en" aria-pressed="${lang === "en"}" lang="en"${lang === "en" ? "" : ' aria-label="Switch to English"'}>EN</button>
    </div>`;

  function header() {
    const nav = navLinks.map(([href, label, key]) =>
      `<a href="${href}"${page === "shop" && key === currentC ? ' aria-current="page"' : ""}>${label}</a>`).join("");
    return `
    <a class="skip" href="#main">${t("skip")}</a>
    <div class="announce" role="region" aria-label="${lang === "pt" ? "Aviso" : "Announcement"}">
      <div class="wrap">
        <span>${t("announce.ship", { amt: money(S.freeShippingFrom) })}</span>
        <span class="dot hide-sm" aria-hidden="true"></span>
        <span class="hide-sm">${t("announce.drop")} <a href="shop.html">${t("announce.cta")}</a></span>
      </div>
    </div>
    <header class="site-header">
      <div class="wrap">
        <nav class="nav" aria-label="${t("nav.main")}">${nav}</nav>
        <div class="mobile-left">
          <button class="icon-btn" type="button" aria-label="${t("aria.menuOpen")}" data-open-menu>${ICON.menu}</button>
          <button class="lang-mini" type="button" data-lang="${lang === "pt" ? "en" : "pt"}" aria-label="${t("lang.switch")}" lang="${lang === "pt" ? "en" : "pt-BR"}">${lang === "pt" ? "EN" : "PT"}</button>
        </div>
        <a class="brand" href="index.html" aria-label="${t("aria.home")}"><img src="assets/img/brand/logo-white.webp" alt="Sir Betalot" width="90" height="46"></a>
        <div class="header-tools">
          ${langToggle(" lang-header")}
          <button class="icon-btn" type="button" aria-label="${t("aria.search")}" data-open-search>${ICON.search}</button>
          <a class="icon-btn" href="#" aria-label="${t("aria.account")}" data-account>${ICON.user}</a>
          <button class="icon-btn" type="button" aria-label="${t("aria.cartOpen")}" data-open-cart>${ICON.bag}<span class="cart-count" hidden>0</span></button>
        </div>
      </div>
    </header>
    <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
      <div class="scrim" data-close-menu></div>
      <div class="panel" role="dialog" aria-modal="true" aria-label="${t("aria.menu")}">
        <button class="icon-btn" type="button" aria-label="${t("aria.menuClose")}" data-close-menu style="align-self:flex-end">${ICON.close}</button>
        ${navLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}
        <div class="mobile-lang"><span>${t("lang.label")}</span>${langToggle()}</div>
      </div>
    </div>`;
  }

  const sizeRows = [["S", 53, 70, 88, 96], ["M", 56, 72, 96, 104], ["L", 59, 74, 104, 112], ["XL", 62, 76, 112, 120], ["XXL", 65, 78, 120, 128]];

  function footer() {
    return `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-top">
          <div>
            <img src="assets/img/brand/logo-white.webp" alt="Sir Betalot" width="106" height="54" loading="lazy">
            <p>${t("footer.blurb")}</p>
            <div class="socials">
              <a href="#" aria-label="Instagram">${ICON.ig}</a>
              <a href="#" aria-label="X">${ICON.x}</a>
              <a href="#" aria-label="TikTok">${ICON.tiktok}</a>
              <a href="#" aria-label="YouTube">${ICON.yt}</a>
            </div>
          </div>
          <div>
            <h3>${t("footer.shop")}</h3>
            <ul>
              <li><a href="shop.html">${t("nav.all")}</a></li>
              <li><a href="shop.html?c=tees">${t("nav.tees")}</a></li>
              <li><a href="shop.html?c=hoodies">${t("nav.hoodies")}</a></li>
              <li><a href="shop.html?c=headwear">${t("nav.headwear")}</a></li>
            </ul>
          </div>
          <div>
            <h3>${t("footer.help")}</h3>
            <ul>
              <li><a href="#" data-info="shipping">${t("footer.shipping")}</a></li>
              <li><a href="#" data-info="returns">${t("footer.returns")}</a></li>
              <li><a href="#" data-sizeguide>${t("footer.sizeguide")}</a></li>
              <li><a href="#" data-info="contact">${t("footer.contact")}</a></li>
            </ul>
          </div>
          <div>
            <h3>${t("footer.about")}</h3>
            <ul>
              <li><a href="index.html#knights-club">Knights Club</a></li>
              <li><a href="#" data-info="care">${t("footer.care")}</a></li>
              <li><a href="#" data-info="terms">${t("footer.terms")}</a></li>
              <li><a href="#" data-info="privacy">${t("footer.privacy")}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} Sir Betalot. ${t("footer.rights")}</span>
          <div class="pay" aria-label="${t("footer.pay")}"><span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>APPLE PAY</span><span>GOOGLE PAY</span><span>PIX</span></div>
        </div>
      </div>
    </footer>
    <div class="drawer" id="cart" aria-hidden="true">
      <div class="scrim" data-close-cart></div>
      <aside class="panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div class="drawer-head"><h2 class="display" id="cart-title">${t("cart.title")}</h2><button class="icon-btn" type="button" aria-label="${t("aria.cartClose")}" data-close-cart>${ICON.close}</button></div>
        <div class="ship-bar" aria-live="polite"></div>
        <div class="lines"></div>
        <div class="drawer-foot"></div>
      </aside>
    </div>
    <div class="search" id="search" aria-hidden="true">
      <div class="scrim" data-close-search></div>
      <div class="panel" role="dialog" aria-modal="true" aria-label="${t("search.dialog")}">
        <div class="wrap">
          <div class="bar">
            <label class="sr-only" for="q">${t("search.label")}</label>
            <input class="input" id="q" type="search" placeholder="${t("search.placeholder")}" autocomplete="off">
            <button class="icon-btn" type="button" aria-label="${t("search.close")}" data-close-search>${ICON.close}</button>
          </div>
          <div class="search-results" aria-live="polite"></div>
        </div>
      </div>
    </div>
    <dialog class="modal" id="sizeguide" aria-labelledby="sg-title">
      <div class="modal-head"><h2 class="display" id="sg-title">${t("sg.title")}</h2><button class="icon-btn" type="button" aria-label="${t("sg.close")}" data-close-dialog>${ICON.close}</button></div>
      <div class="modal-body">
        <table class="sizes-t">
          <thead><tr><th scope="col">${t("sg.size")}</th><th scope="col">${t("sg.chest")}</th><th scope="col">${t("sg.length")}</th><th scope="col">${t("sg.fits")}</th></tr></thead>
          <tbody>${sizeRows.map(([s, c, l, a, b]) => `<tr><td>${sizeLabel(s)}</td><td>${c} cm</td><td>${l} cm</td><td>${t("sg.range", { a, b })}</td></tr>`).join("")}</tbody>
        </table>
        <p style="color:var(--muted);font-size:14px;margin:14px 0 0">${t("sg.note")}</p>
      </div>
    </dialog>
    <dialog class="modal" id="info" aria-labelledby="info-title">
      <div class="modal-head"><h2 class="display" id="info-title"></h2><button class="icon-btn" type="button" aria-label="${t("aria.close")}" data-close-dialog>${ICON.close}</button></div>
      <div class="modal-body" id="info-body" style="color:var(--muted)"></div>
    </dialog>
    <div class="toast" role="status" aria-live="polite"></div>`;
  }

  const contactForm = () => `<p style="margin-top:0">${t("info.contact.b")}</p>
    <form id="contact-form" novalidate style="display:grid;gap:10px">
      <label class="sr-only" for="c-name">${t("contact.name")}</label><input class="input" id="c-name" placeholder="${t("contact.name")}" autocomplete="name" required>
      <label class="sr-only" for="c-email">${t("contact.email")}</label><input class="input" id="c-email" type="email" placeholder="${t("contact.email")}" autocomplete="email" required>
      <label class="sr-only" for="c-msg">${t("contact.msg")}</label><textarea class="input" id="c-msg" rows="4" placeholder="${t("contact.msg")}" required style="padding:12px 16px;resize:vertical"></textarea>
      <button class="btn btn-primary" type="submit">${t("contact.send")}</button>
      <p class="form-note" id="c-note" aria-live="polite"></p>
    </form>`;
  const infoBody = (key) => key === "contact" ? contactForm() : t(`info.${key}.b`, { free: money(S.freeShippingFrom), flat: money(S.flatShipping) });

  document.body.insertAdjacentHTML("afterbegin", header());
  document.body.insertAdjacentHTML("beforeend", footer());
  apply(document, money);

  /* ---------------- UI helpers ---------------- */
  let lastFocus = null;
  function openLayer(el, focusSel) { lastFocus = document.activeElement; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; setTimeout(() => (focusSel ? $(focusSel, el) : $("button, a, input", el))?.focus(), 50); }
  function closeLayer(el) { el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocus?.focus?.(); }
  const toastEl = $(".toast");
  let toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), 2600); }

  const cartEl = $("#cart"), searchEl = $("#search"), menuEl = $("#mobile-nav");
  const openCart = () => openLayer(cartEl);
  document.addEventListener("click", (e) => {
    const tg = e.target.closest("[data-lang],[data-open-cart],[data-close-cart],[data-open-search],[data-close-search],[data-open-menu],[data-close-menu],[data-sizeguide],[data-close-dialog],[data-info],[data-account],[data-checkout],[data-qty],[data-remove],[data-quick]");
    if (!tg) return;
    if (tg.matches("[data-lang]")) setLang(tg.dataset.lang);
    else if (tg.matches("[data-open-cart]")) openCart();
    else if (tg.matches("[data-close-cart]")) closeLayer(cartEl);
    else if (tg.matches("[data-open-search]")) { openLayer(searchEl, "#q"); runSearch(""); }
    else if (tg.matches("[data-close-search]")) closeLayer(searchEl);
    else if (tg.matches("[data-open-menu]")) openLayer(menuEl);
    else if (tg.matches("[data-close-menu]")) closeLayer(menuEl);
    else if (tg.matches("[data-sizeguide]")) { e.preventDefault(); $("#sizeguide").showModal(); }
    else if (tg.matches("[data-close-dialog]")) tg.closest("dialog").close();
    else if (tg.matches("[data-info]")) {
      e.preventDefault();
      const key = tg.dataset.info;
      $("#info-title").textContent = t(`info.${key}.t`);
      $("#info-body").innerHTML = infoBody(key);
      if (!$("#info").open) $("#info").showModal();
    }
    else if (tg.matches("[data-account]")) { e.preventDefault(); toast(t("toast.account")); }
    else if (tg.matches("[data-checkout]")) toast(t("toast.checkout"));
    else if (tg.matches("[data-qty]")) cart.set(+tg.dataset.idx, cart.items[+tg.dataset.idx].qty + (+tg.dataset.qty));
    else if (tg.matches("[data-remove]")) cart.set(+tg.dataset.idx, 0);
    else if (tg.matches("[data-quick]")) {
      e.preventDefault();
      const p = byId(tg.dataset.quick);
      const sizes = Object.keys(p.sizes);
      if (sizes.length === 1) { cart.add(p.id, sizes[0]); toast(t("toast.added", { name: P(p, "name") })); openCart(); }
      else location.href = `product.html?p=${p.id}`;
    }
  });
  document.addEventListener("submit", (e) => {
    if (e.target.id !== "contact-form") return;
    e.preventDefault();
    const note = $("#c-note"), email = $("#c-email").value.trim();
    if (!$("#c-name").value.trim() || !$("#c-msg").value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.className = "form-note"; note.textContent = t("contact.err"); return; }
    note.className = "form-note ok"; note.textContent = t("contact.ok"); e.target.reset();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    [cartEl, searchEl, menuEl].forEach((el) => el.classList.contains("open") && closeLayer(el));
  });

  /* ---------------- Cart render ---------------- */
  function renderCart() {
    const n = cart.count();
    $$(".cart-count").forEach((b) => { b.textContent = n; b.hidden = n === 0; });
    const sub = cart.subtotal();
    const left = Math.max(0, S.freeShippingFrom - sub);
    $(".ship-bar", cartEl).innerHTML = (left > 0 ? t("cart.away", { amt: money(left) }) : `<b style="color:var(--sba-green)">${t("cart.free")}</b>`) +
      `<div class="track"><div class="fill" style="width:${Math.min(100, (sub / S.freeShippingFrom) * 100)}%"></div></div>`;
    const lines = $(".lines", cartEl), foot = $(".drawer-foot", cartEl);
    if (!cart.items.length) {
      lines.innerHTML = `<div class="empty"><img src="assets/img/brand/knight-head.webp" alt="" width="120" height="129"><p>${t("cart.empty")}</p><a class="btn btn-primary" href="shop.html">${t("cart.shop")}</a></div>`;
      foot.hidden = true; return;
    }
    foot.hidden = false;
    lines.innerHTML = cart.items.map((i, idx) => {
      const p = byId(i.id), name = esc(P(p, "name"));
      return `<div class="line">
        <a href="product.html?p=${p.id}"><img src="${IMG + p.images[0]}" alt="${name}" width="84" height="105"></a>
        <div><a class="line-title" href="product.html?p=${p.id}">${name}</a>
          <div class="line-meta">${esc(P(p, "color"))} / ${esc(sizeLabel(i.size))}</div>
          <div class="mini-qty"><button type="button" data-qty="-1" data-idx="${idx}" aria-label="${t("cart.dec")}">&minus;</button><span aria-label="${t("cart.qty")}">${i.qty}</span><button type="button" data-qty="1" data-idx="${idx}" aria-label="${t("cart.inc")}">+</button></div>
        </div>
        <div class="line-right"><b>${money(p.price * i.qty)}</b><button class="remove" type="button" data-remove data-idx="${idx}">${t("cart.remove")}</button></div>
      </div>`;
    }).join("");
    foot.innerHTML = `<div class="subtotal"><span>${t("cart.subtotal")}</span><span>${money(sub)}</span></div>
      <small>${t("cart.taxes")}</small>
      <button class="btn btn-primary btn-block" type="button" data-checkout>${t("cart.checkout")}</button>`;
  }
  renderCart();

  /* ---------------- Search ---------------- */
  function runSearch(q) {
    q = q.trim().toLowerCase();
    const hits = S.products.filter((p) => !q || [p.name, p.color, p.collection, p.short, p.pt?.name, p.pt?.color, p.pt?.short].join(" ").toLowerCase().includes(q));
    $(".search-results", searchEl).innerHTML = hits.length
      ? hits.map((p) => `<a href="product.html?p=${p.id}"><img src="${IMG + p.images[0]}" alt="" loading="lazy" width="150" height="188"><span>${esc(P(p, "name"))}</span><b>${money(p.price)}</b></a>`).join("")
      : `<p style="color:var(--muted)">${esc(t("search.none", { q }))}</p>`;
  }
  $("#q").addEventListener("input", (e) => runSearch(e.target.value));

  /* ---------------- Product card ---------------- */
  function badgeFor(p) {
    if (!inStock(p)) return `<span class="badge">${t("badge.sold")}</span>`;
    if (p.compareAt) return `<span class="badge sale">${t("badge.save", { n: Math.round((1 - p.price / p.compareAt) * 100) })}</span>`;
    if (p.badge === "New") return `<span class="badge new">${t("badge.new")}</span>`;
    if (p.badge === "Low Stock") return `<span class="badge low">${t("badge.low")}</span>`;
    if (p.badge === "Best Seller") return `<span class="badge">${t("badge.best")}</span>`;
    return "";
  }
  function priceHtml(p) {
    return p.compareAt ? `<span class="now-sale">${money(p.price)}</span><s>${money(p.compareAt)}</s><span class="sr-only">${t("price.sale")}</span>` : `<span>${money(p.price)}</span>`;
  }
  function card(p, eager) {
    const one = Object.keys(p.sizes).length === 1;
    const name = esc(P(p, "name")), color = esc(P(p, "color"));
    return `<article class="card">
      <a class="card-media" href="product.html?p=${p.id}" aria-label="${name}, ${color}">
        ${badgeFor(p)}
        <img class="main" src="${IMG + p.images[0]}" alt="${t("card.in", { name, color })}" width="800" height="1000" ${eager ? "" : 'loading="lazy"'}>
        <img class="alt" src="${IMG + p.images[p.images.length - 1]}" alt="" width="800" height="1000" loading="lazy">
      </a>
      <button class="btn btn-primary quick-add" type="button" data-quick="${p.id}">${one ? t("card.add") : t("card.choose")}</button>
      <div class="card-body">
        <a class="card-title" href="product.html?p=${p.id}">${name}</a>
        <div class="card-meta"><span class="swatch" style="background:${p.swatch}" aria-hidden="true"></span>${color}</div>
        <div class="price">${priceHtml(p)}</div>
      </div>
    </article>`;
  }

  /* ---------------- Page: home ---------------- */
  if (page === "home") {
    document.title = t("meta.home");
    $('meta[name="description"]')?.setAttribute("content", t("meta.desc"));
    const best = ["royal-crest-hoodie", "crown-logo-tee", "midnight-knight-zip-hoodie", "knights-club-vintage-tee"].map(byId);
    $("#best").innerHTML = best.map((p, i) => card(p, i < 2)).join("");
    $$("[data-product-name]").forEach((el) => { el.textContent = P(byId(el.dataset.productName), "name"); });
    const nl = $("#newsletter");
    nl?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("#nl-email").value.trim();
      const note = $("#nl-note");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = t("home.nlErr"); note.className = "form-note"; $("#nl-email").focus(); return; }
      note.textContent = t("home.nlOk"); note.className = "form-note ok"; nl.reset();
    });
  }

  /* ---------------- Page: shop ---------------- */
  if (page === "shop") {
    const chips = [["all", t("shop.chipAll")], ...S.collections.map((c) => [c.id, P(c, "name")])];
    let active = S.collections.some((c) => c.id === currentC) ? currentC : "all";
    const heading = () => {
      const c = S.collections.find((x) => x.id === active);
      $("#shop-title").textContent = colName(c);
      $("#shop-blurb").textContent = colBlurb(c);
      $("#crumb-here").textContent = colName(c);
      document.title = `${colName(c)} | ${t("meta.suffix")}`;
    };
    const chipBox = $("#chips");
    const draw = () => {
      chipBox.innerHTML = chips.map(([id, n]) => `<button class="chip" type="button" data-chip="${id}" aria-pressed="${id === active}">${n}</button>`).join("");
      let list = S.products.filter((p) => active === "all" || p.collection === active);
      const sort = $("#sort").value;
      if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
      if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
      if (sort === "new") list = [...list].sort((a, b) => (b.badge === "New") - (a.badge === "New"));
      $("#grid").innerHTML = list.map((p, i) => card(p, i < 3)).join("");
      $("#count").textContent = list.length === 1 ? t("shop.count1") : t("shop.countN", { n: list.length });
    };
    chipBox.addEventListener("click", (e) => {
      const b = e.target.closest("[data-chip]"); if (!b) return;
      active = b.dataset.chip;
      const href = active === "all" ? "shop.html" : `shop.html?c=${active}`;
      history.replaceState(null, "", href);
      $$(".nav a").forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === href));
      heading(); draw();
    });
    $("#sort").addEventListener("change", draw);
    heading(); draw();
  }

  /* ---------------- Page: product ---------------- */
  if (page === "product") {
    const p = byId(new URLSearchParams(location.search).get("p")) || S.products[0];
    const name = P(p, "name"), color = P(p, "color");
    document.title = `${name} | ${t("meta.suffix")}`;
    const sizes = Object.entries(p.sizes);
    const one = sizes.length === 1;
    let sel = one ? sizes[0][0] : null;
    let img = 0;
    const col = S.collections.find((c) => c.id === p.collection);
    const eyebrow = p.compareAt ? t("pdp.sale") : p.badge === "New" ? t("badge.new") : p.badge === "Low Stock" ? t("badge.low") : p.badge === "Best Seller" ? t("badge.best") : "";
    $("#pdp").innerHTML = `
      <div class="gallery">
        <div class="thumbs" role="group" aria-label="${t("pdp.images")}">
          ${p.images.map((f, i) => `<button type="button" data-img="${i}" aria-label="${t("pdp.show", { n: i + 1 })}" aria-current="${i === 0}"><img src="${IMG + f}" alt="" width="84" height="105"></button>`).join("")}
        </div>
        <div class="stage">
          <img id="stage-img" src="${IMG + p.images[0]}" alt="${esc(t("pdp.imgAlt", { name, color, i: 1, n: p.images.length }))}" width="1200" height="1500">
          <div class="stage-nav"><button type="button" data-step="-1" aria-label="${t("pdp.prev")}">${ICON.left}</button><button type="button" data-step="1" aria-label="${t("pdp.next")}">${ICON.right}</button></div>
        </div>
      </div>
      <div class="buy">
        <nav class="crumbs" aria-label="${t("crumb.label")}"><a href="index.html">${t("crumb.home")}</a><span aria-hidden="true">/</span><a href="shop.html?c=${p.collection}">${esc(colName(col))}</a></nav>
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}
        <h1 class="display">${esc(name)}</h1>
        <div class="price">${priceHtml(p)}</div>
        <div class="tax">${t("pdp.tax")}</div>
        <p class="lead">${esc(P(p, "short"))}</p>
        <div class="opt"><div class="opt-head"><span><b>${t("pdp.colour")}</b> ${esc(color)}</span></div>
          <div class="sizes"><span class="swatch" style="width:32px;height:32px;background:${p.swatch};box-shadow:0 0 0 2px var(--sba-night),0 0 0 4px var(--sba-gold)" aria-hidden="true"></span></div></div>
        <div class="opt">
          <div class="opt-head"><span><b>${t("pdp.size")}</b> <span id="size-label">${one ? sizeLabel(sel) : t("pdp.select")}</span></span>${one ? "" : `<a class="link" href="#" data-sizeguide>${t("footer.sizeguide")}</a>`}</div>
          <div class="sizes" role="group" aria-label="${t("pdp.sizeGroup")}">
            ${sizes.map(([s, n]) => `<button class="size" type="button" data-size="${s}" aria-pressed="${s === sel}" ${n ? "" : "disabled"} aria-label="${sizeLabel(s)}${n ? "" : ", " + t("pdp.soldout")}">${sizeLabel(s)}</button>`).join("")}
          </div>
          <div class="stock" id="stock" aria-live="polite"></div>
        </div>
        <div class="buy-row">
          <div class="qty"><button type="button" data-step-qty="-1" aria-label="${t("cart.dec")}">&minus;</button><label class="sr-only" for="qty">${t("cart.qty")}</label><input id="qty" type="number" inputmode="numeric" min="1" value="1"><button type="button" data-step-qty="1" aria-label="${t("cart.inc")}">+</button></div>
          <button class="btn btn-primary" id="add" type="button"></button>
        </div>
        <div class="assure">
          <div>${ICON.truck}${t("pdp.assure1", { amt: money(S.freeShippingFrom) })}</div>
          <div>${ICON.returns}${t("pdp.assure2")}</div>
          <div>${ICON.lock}${t("pdp.assure3")}</div>
        </div>
        <details class="acc" open><summary>${t("pdp.details")}</summary><div class="acc-body"><ul>${P(p, "details").map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div></details>
        <details class="acc"><summary>${t("pdp.fit")}</summary><div class="acc-body"><p style="margin:0">${esc(P(p, "fit"))}</p></div></details>
        <details class="acc"><summary>${t("pdp.care")}</summary><div class="acc-body"><p style="margin:0">${t("pdp.careBody")}</p></div></details>
        <details class="acc"><summary>${t("pdp.shipping")}</summary><div class="acc-body"><p style="margin:0">${t("pdp.shippingBody", { free: money(S.freeShippingFrom), flat: money(S.flatShipping) })}</p></div></details>
      </div>`;

    const stage = $("#stage-img"), add = $("#add"), qty = $("#qty"), stock = $("#stock");
    const show = (i) => {
      img = (i + p.images.length) % p.images.length;
      stage.src = IMG + p.images[img];
      stage.alt = t("pdp.imgAlt", { name, color, i: img + 1, n: p.images.length });
      $$(".thumbs button").forEach((b, k) => b.setAttribute("aria-current", k === img));
    };
    const update = () => {
      const n = sel ? p.sizes[sel] : 0;
      add.disabled = !sel;
      add.textContent = sel ? t("pdp.add", { amt: money(p.price * Math.max(1, +qty.value || 1)) }) : t("pdp.select");
      stock.className = "stock" + (sel && n <= 5 ? " low" : "");
      stock.textContent = !sel ? "" : n <= 5 ? t("pdp.only", { n, size: sizeLabel(sel) }) : t("pdp.instock");
      qty.max = n || 1;
      if (+qty.value > n && n) qty.value = n;
    };
    $("#pdp").addEventListener("click", (e) => {
      const tg = e.target.closest("[data-img],[data-step],[data-size],[data-step-qty]"); if (!tg) return;
      if (tg.dataset.img) show(+tg.dataset.img);
      else if (tg.dataset.step) show(img + +tg.dataset.step);
      else if (tg.dataset.size) { sel = tg.dataset.size; $$(".size").forEach((b) => b.setAttribute("aria-pressed", b === tg)); $("#size-label").textContent = sizeLabel(sel); update(); }
      else if (tg.dataset.stepQty) { qty.value = Math.max(1, Math.min(+qty.max || 99, (+qty.value || 1) + +tg.dataset.stepQty)); update(); }
    });
    qty.addEventListener("input", update);
    add.addEventListener("click", () => {
      if (!sel) return;
      cart.add(p.id, sel, Math.max(1, +qty.value || 1));
      toast(t("toast.added", { name: `${name} (${sizeLabel(sel)})` }));
      openCart();
    });
    update();
    $("#related").innerHTML = S.products.filter((x) => x.id !== p.id).sort((a, b) => (a.collection !== p.collection) - (b.collection !== p.collection)).slice(0, 4).map((x) => card(x)).join("");
  }
})();
