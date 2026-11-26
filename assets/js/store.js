/* Sir Betalot Official Store: shared header, footer, cart and page logic. No build step. */
(function () {
  "use strict";
  const S = window.SBA_STORE;
  const IMG = "assets/img/products/";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const money = (n) => new Intl.NumberFormat(S.locale, { style: "currency", currency: S.currency }).format(n);
  const byId = (id) => S.products.find((p) => p.id === id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const inStock = (p) => Object.values(p.sizes).some((n) => n > 0);

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
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2.3 1.8 3.8 4 4v3.1c-1.5 0-2.8-.4-4-1.2v6.6A5.5 5.5 0 1 1 11 10v3.2a2.4 2.4 0 1 0 2.3 2.3V3h3.2Z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.8.4-3.8s0-2.6-.4-3.8ZM10 15V9l5.2 3L10 15Z"/></svg>'
  };
  window.SBA_ICON = ICON;

  /* ---------------- Cart ---------------- */
  const KEY = "sba_cart_v1";
  const cart = {
    items: (() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } })(),
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
  window.SBA_CART = cart;

  /* ---------------- Layout ---------------- */
  const page = document.body.dataset.page;
  const navLinks = [
    ["shop.html", "Shop All", "all"],
    ["shop.html?c=tees", "Tees", "tees"],
    ["shop.html?c=hoodies", "Hoodies", "hoodies"],
    ["shop.html?c=headwear", "Headwear", "headwear"],
    ["index.html#knights-club", "Knights Club", "club"]
  ];
  const currentC = new URLSearchParams(location.search).get("c") || "all";

  function header() {
    const nav = navLinks.map(([href, label, key]) =>
      `<a href="${href}"${page === "shop" && key === currentC ? ' aria-current="page"' : ""}>${label}</a>`).join("");
    return `
    <a class="skip" href="#main">Skip to content</a>
    <div class="announce" role="region" aria-label="Announcement">
      <div class="wrap">
        <span>Free shipping on orders over ${money(S.freeShippingFrom)}</span>
        <span class="dot hide-sm" aria-hidden="true"></span>
        <span class="hide-sm">The Knights Club drop is live. <a href="shop.html">Shop now</a></span>
      </div>
    </div>
    <header class="site-header">
      <div class="wrap">
        <nav class="nav" aria-label="Main">${nav}</nav>
        <button class="icon-btn menu-btn" type="button" aria-label="Open menu" data-open-menu>${ICON.menu}</button>
        <a class="brand" href="index.html" aria-label="Sir Betalot Official Store home"><img src="assets/img/brand/logo-white.webp" alt="Sir Betalot" width="90" height="46"></a>
        <div class="header-tools">
          <button class="icon-btn" type="button" aria-label="Search" data-open-search>${ICON.search}</button>
          <a class="icon-btn" href="#" aria-label="Account" data-account>${ICON.user}</a>
          <button class="icon-btn" type="button" aria-label="Open cart" data-open-cart>${ICON.bag}<span class="cart-count" hidden>0</span></button>
        </div>
      </div>
    </header>
    <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
      <div class="scrim" data-close-menu></div>
      <div class="panel" role="dialog" aria-modal="true" aria-label="Menu">
        <button class="icon-btn" type="button" aria-label="Close menu" data-close-menu style="align-self:flex-end">${ICON.close}</button>
        ${navLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}
      </div>
    </div>`;
  }

  function footer() {
    return `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-top">
          <div>
            <img src="assets/img/brand/logo-white.webp" alt="Sir Betalot" width="106" height="54" loading="lazy">
            <p>The official Sir Betalot store. Heavyweight apparel and headwear in royal purple and gold, made for the Round Table.</p>
            <div class="socials">
              <a href="#" aria-label="Instagram">${ICON.ig}</a>
              <a href="#" aria-label="X">${ICON.x}</a>
              <a href="#" aria-label="TikTok">${ICON.tiktok}</a>
              <a href="#" aria-label="YouTube">${ICON.yt}</a>
            </div>
          </div>
          <div>
            <h3>Shop</h3>
            <ul>
              <li><a href="shop.html">Shop all</a></li>
              <li><a href="shop.html?c=tees">Tees</a></li>
              <li><a href="shop.html?c=hoodies">Hoodies</a></li>
              <li><a href="shop.html?c=headwear">Headwear</a></li>
            </ul>
          </div>
          <div>
            <h3>Help</h3>
            <ul>
              <li><a href="#" data-info="shipping">Shipping</a></li>
              <li><a href="#" data-info="returns">Returns and exchanges</a></li>
              <li><a href="#" data-sizeguide>Size guide</a></li>
              <li><a href="#" data-info="contact">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h3>About</h3>
            <ul>
              <li><a href="index.html#knights-club">Knights Club</a></li>
              <li><a href="#" data-info="care">Care guide</a></li>
              <li><a href="#" data-info="terms">Terms of sale</a></li>
              <li><a href="#" data-info="privacy">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} Sir Betalot. All rights reserved.</span>
          <div class="pay" aria-label="Accepted payment methods"><span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>APPLE PAY</span><span>GOOGLE PAY</span><span>PIX</span></div>
        </div>
      </div>
    </footer>
    <div class="drawer" id="cart" aria-hidden="true">
      <div class="scrim" data-close-cart></div>
      <aside class="panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div class="drawer-head"><h2 class="display" id="cart-title">Your bag</h2><button class="icon-btn" type="button" aria-label="Close cart" data-close-cart>${ICON.close}</button></div>
        <div class="ship-bar" aria-live="polite"></div>
        <div class="lines"></div>
        <div class="drawer-foot"></div>
      </aside>
    </div>
    <div class="search" id="search" aria-hidden="true">
      <div class="scrim" data-close-search></div>
      <div class="panel" role="dialog" aria-modal="true" aria-label="Search the store">
        <div class="wrap">
          <div class="bar">
            <label class="sr-only" for="q">Search products</label>
            <input class="input" id="q" type="search" placeholder="Search tees, hoodies, snapbacks" autocomplete="off">
            <button class="icon-btn" type="button" aria-label="Close search" data-close-search>${ICON.close}</button>
          </div>
          <div class="search-results" aria-live="polite"></div>
        </div>
      </div>
    </div>
    <dialog class="modal" id="sizeguide" aria-labelledby="sg-title">
      <div class="modal-head"><h2 class="display" id="sg-title">Size guide</h2><button class="icon-btn" type="button" aria-label="Close size guide" data-close-dialog>${ICON.close}</button></div>
      <div class="modal-body">
        <table class="sizes-t">
          <thead><tr><th scope="col">Size</th><th scope="col">Chest width</th><th scope="col">Body length</th><th scope="col">Fits chest</th></tr></thead>
          <tbody>
            <tr><td>S</td><td>53 cm</td><td>70 cm</td><td>88 to 96 cm</td></tr>
            <tr><td>M</td><td>56 cm</td><td>72 cm</td><td>96 to 104 cm</td></tr>
            <tr><td>L</td><td>59 cm</td><td>74 cm</td><td>104 to 112 cm</td></tr>
            <tr><td>XL</td><td>62 cm</td><td>76 cm</td><td>112 to 120 cm</td></tr>
            <tr><td>XXL</td><td>65 cm</td><td>78 cm</td><td>120 to 128 cm</td></tr>
          </tbody>
        </table>
        <p style="color:var(--muted);font-size:14px;margin:14px 0 0">Measured flat across the chest, 2 cm below the armhole. Oversized styles run about 4 cm wider than this chart.</p>
      </div>
    </dialog>
    <dialog class="modal" id="info" aria-labelledby="info-title">
      <div class="modal-head"><h2 class="display" id="info-title"></h2><button class="icon-btn" type="button" aria-label="Close" data-close-dialog>${ICON.close}</button></div>
      <div class="modal-body" id="info-body" style="color:var(--muted)"></div>
    </dialog>
    <div class="toast" role="status" aria-live="polite"></div>`;
  }

  const INFO = {
    shipping: ["Shipping", `<p>Orders ship within 2 business days. Standard shipping is free on orders over ${money(S.freeShippingFrom)}; below that it is a flat ${money(6)}. You get a tracking link by email as soon as your order leaves us.</p>`],
    returns: ["Returns", "<p>Unworn items with tags can be returned or exchanged within 30 days of delivery. Start a return from the link in your order email. Exchanges for a different size ship free.</p>"],
    contact: ["Contact us", '<p style="margin-top:0">Questions about an order, sizing or a return? Send us a message and the store team will reply within one business day.</p><form id="contact-form" novalidate style="display:grid;gap:10px"><label class="sr-only" for="c-name">Name</label><input class="input" id="c-name" placeholder="Name" autocomplete="name" required><label class="sr-only" for="c-email">Email</label><input class="input" id="c-email" type="email" placeholder="Email address" autocomplete="email" required><label class="sr-only" for="c-msg">Message</label><textarea class="input" id="c-msg" rows="4" placeholder="Your message (add your order number if you have one)" required style="padding:12px 16px;resize:vertical"></textarea><button class="btn btn-primary" type="submit">Send message</button><p class="form-note" id="c-note" aria-live="polite"></p></form>'],
    terms: ["Terms of sale", "<p>Prices include applicable taxes where shown. Orders are confirmed by email once payment is accepted. Limited pieces are sold while stock lasts and may not be restocked.</p>"],
    care: ["Care guide", "<p>Wash cold and inside out with similar colours. Do not bleach. Tumble dry low or hang dry. Never iron directly on prints, chenille or embroidery. Snapbacks: spot clean only and keep the brim's shape.</p>"],
    privacy: ["Privacy", "<p>We only use your details to process your order and, if you opt in, to send store news. You can unsubscribe at any time.</p>"]
  };

  document.body.insertAdjacentHTML("afterbegin", header());
  document.body.insertAdjacentHTML("beforeend", footer());

  /* ---------------- UI helpers ---------------- */
  let lastFocus = null;
  function openLayer(el, focusSel) { lastFocus = document.activeElement; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; setTimeout(() => (focusSel ? $(focusSel, el) : $("button, a, input", el))?.focus(), 50); }
  function closeLayer(el) { el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocus?.focus?.(); }
  const toastEl = $(".toast");
  let toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), 2600); }
  window.SBA_TOAST = toast;

  const cartEl = $("#cart"), searchEl = $("#search"), menuEl = $("#mobile-nav");
  window.SBA_OPEN_CART = () => openLayer(cartEl);
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open-cart],[data-close-cart],[data-open-search],[data-close-search],[data-open-menu],[data-close-menu],[data-sizeguide],[data-close-dialog],[data-info],[data-account],[data-checkout],[data-qty],[data-remove],[data-quick]");
    if (!t) return;
    if (t.matches("[data-open-cart]")) openLayer(cartEl);
    else if (t.matches("[data-close-cart]")) closeLayer(cartEl);
    else if (t.matches("[data-open-search]")) { openLayer(searchEl, "#q"); runSearch(""); }
    else if (t.matches("[data-close-search]")) closeLayer(searchEl);
    else if (t.matches("[data-open-menu]")) openLayer(menuEl);
    else if (t.matches("[data-close-menu]")) closeLayer(menuEl);
    else if (t.matches("[data-sizeguide]")) { e.preventDefault(); $("#sizeguide").showModal(); }
    else if (t.matches("[data-close-dialog]")) t.closest("dialog").close();
    else if (t.matches("[data-info]")) { e.preventDefault(); const [h, b] = INFO[t.dataset.info]; $("#info-title").textContent = h; $("#info-body").innerHTML = b; $("#info").showModal(); }
    else if (t.matches("[data-account]")) { e.preventDefault(); toast("Accounts open with the store launch."); }
    else if (t.matches("[data-checkout]")) { toast("Checkout connects at launch. Your bag is saved on this device."); }
    else if (t.matches("[data-qty]")) cart.set(+t.dataset.idx, cart.items[+t.dataset.idx].qty + (+t.dataset.qty));
    else if (t.matches("[data-remove]")) cart.set(+t.dataset.idx, 0);
    else if (t.matches("[data-quick]")) {
      e.preventDefault();
      const p = byId(t.dataset.quick);
      const sizes = Object.keys(p.sizes);
      if (sizes.length === 1) { cart.add(p.id, sizes[0]); toast(`${p.name} added to your bag`); openLayer(cartEl); }
      else location.href = `product.html?p=${p.id}`;
    }
  });
  document.addEventListener("submit", (e) => {
    if (e.target.id !== "contact-form") return;
    e.preventDefault();
    const note = $("#c-note"), email = $("#c-email").value.trim();
    if (!$("#c-name").value.trim() || !$("#c-msg").value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.className = "form-note"; note.textContent = "Please fill in your name, a valid email and your message."; return; }
    note.className = "form-note ok"; note.textContent = "Thanks, your message is in. We'll reply within one business day."; e.target.reset();
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
    $(".ship-bar", cartEl).innerHTML = (left > 0 ? `You're <b>${money(left)}</b> away from free shipping` : `<b style="color:var(--sba-green)">You've unlocked free shipping</b>`) +
      `<div class="track"><div class="fill" style="width:${Math.min(100, (sub / S.freeShippingFrom) * 100)}%"></div></div>`;
    const lines = $(".lines", cartEl), foot = $(".drawer-foot", cartEl);
    if (!cart.items.length) {
      lines.innerHTML = `<div class="empty"><img src="assets/img/brand/knight-head.webp" alt="" width="120" height="129"><p>Your bag is empty.<br>Even knights need armour.</p><a class="btn btn-primary" href="shop.html">Shop the drop</a></div>`;
      foot.hidden = true; return;
    }
    foot.hidden = false;
    lines.innerHTML = cart.items.map((i, idx) => {
      const p = byId(i.id);
      return `<div class="line">
        <a href="product.html?p=${p.id}"><img src="${IMG + p.images[0]}" alt="${esc(p.name)}" width="84" height="105"></a>
        <div><a class="line-title" href="product.html?p=${p.id}">${esc(p.name)}</a>
          <div class="line-meta">${esc(p.color)} / ${esc(i.size)}</div>
          <div class="mini-qty"><button type="button" data-qty="-1" data-idx="${idx}" aria-label="Decrease quantity">&minus;</button><span aria-label="Quantity">${i.qty}</span><button type="button" data-qty="1" data-idx="${idx}" aria-label="Increase quantity">+</button></div>
        </div>
        <div class="line-right"><b>${money(p.price * i.qty)}</b><button class="remove" type="button" data-remove data-idx="${idx}">Remove</button></div>
      </div>`;
    }).join("");
    foot.innerHTML = `<div class="subtotal"><span>Subtotal</span><span>${money(sub)}</span></div>
      <small>Taxes and shipping calculated at checkout.</small>
      <button class="btn btn-primary btn-block" type="button" data-checkout>Checkout</button>`;
  }
  renderCart();

  /* ---------------- Search ---------------- */
  function runSearch(q) {
    q = q.trim().toLowerCase();
    const hits = S.products.filter((p) => !q || [p.name, p.color, p.collection, p.short].join(" ").toLowerCase().includes(q));
    $(".search-results", searchEl).innerHTML = hits.length
      ? hits.map((p) => `<a href="product.html?p=${p.id}"><img src="${IMG + p.images[0]}" alt="" loading="lazy" width="150" height="188"><span>${esc(p.name)}</span><b>${money(p.price)}</b></a>`).join("")
      : `<p style="color:var(--muted)">No results for "${esc(q)}".</p>`;
  }
  $("#q").addEventListener("input", (e) => runSearch(e.target.value));

  /* ---------------- Product card ---------------- */
  function badgeFor(p) {
    if (!inStock(p)) return '<span class="badge">Sold out</span>';
    if (p.compareAt) return `<span class="badge sale">Save ${Math.round((1 - p.price / p.compareAt) * 100)}%</span>`;
    if (p.badge === "New") return '<span class="badge new">New</span>';
    if (p.badge === "Low Stock") return '<span class="badge low">Low stock</span>';
    if (p.badge) return `<span class="badge">${esc(p.badge)}</span>`;
    return "";
  }
  function priceHtml(p) {
    return p.compareAt ? `<span class="now-sale">${money(p.price)}</span><s>${money(p.compareAt)}</s><span class="sr-only">Sale price</span>` : `<span>${money(p.price)}</span>`;
  }
  function card(p, eager) {
    const one = Object.keys(p.sizes).length === 1;
    return `<article class="card">
      <a class="card-media" href="product.html?p=${p.id}" aria-label="${esc(p.name)}, ${esc(p.color)}">
        ${badgeFor(p)}
        <img class="main" src="${IMG + p.images[0]}" alt="${esc(p.name)} in ${esc(p.color)}" width="800" height="1000" ${eager ? "" : 'loading="lazy"'}>
        <img class="alt" src="${IMG + p.images[p.images.length - 1]}" alt="" width="800" height="1000" loading="lazy">
      </a>
      <button class="btn btn-primary quick-add" type="button" data-quick="${p.id}">${one ? "Add to bag" : "Choose size"}</button>
      <div class="card-body">
        <a class="card-title" href="product.html?p=${p.id}">${esc(p.name)}</a>
        <div class="card-meta"><span class="swatch" style="background:${p.swatch}" aria-hidden="true"></span>${esc(p.color)}</div>
        <div class="price">${priceHtml(p)}</div>
      </div>
    </article>`;
  }
  window.SBA_CARD = card;
  window.SBA_PRICE = priceHtml;
  window.SBA_BADGE = badgeFor;
  window.SBA_MONEY = money;
  window.SBA_BYID = byId;
  window.SBA_ESC = esc;

  /* ---------------- Page: home ---------------- */
  if (page === "home") {
    const best = ["royal-crest-hoodie", "crown-logo-tee", "midnight-knight-zip-hoodie", "knights-club-vintage-tee"].map(byId);
    $("#best").innerHTML = best.map((p, i) => card(p, i < 2)).join("");
    const nl = $("#newsletter");
    nl?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("#nl-email").value.trim();
      const note = $("#nl-note");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = "Please enter a valid email address."; note.className = "form-note"; $("#nl-email").focus(); return; }
      note.textContent = "You're on the list. Your 10% code arrives at launch."; note.className = "form-note ok"; nl.reset();
    });
  }

  /* ---------------- Page: shop ---------------- */
  if (page === "shop") {
    const col = S.collections.find((c) => c.id === currentC);
    $("#shop-title").textContent = col ? col.name : "Shop all";
    $("#shop-blurb").textContent = col ? col.blurb : "Every piece in the Sir Betalot collection.";
    $("#crumb-here").textContent = col ? col.name : "Shop all";
    document.title = `${col ? col.name : "Shop all"} | Sir Betalot Official Store`;
    const chips = [["all", "All"], ...S.collections.map((c) => [c.id, c.name])];
    let active = col ? currentC : "all";
    const chipBox = $("#chips");
    const draw = () => {
      chipBox.innerHTML = chips.map(([id, n]) => `<button class="chip" type="button" data-chip="${id}" aria-pressed="${id === active}">${n}</button>`).join("");
      let list = S.products.filter((p) => active === "all" || p.collection === active);
      const sort = $("#sort").value;
      if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
      if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
      if (sort === "new") list = [...list].sort((a, b) => (b.badge === "New") - (a.badge === "New"));
      $("#grid").innerHTML = list.map((p, i) => card(p, i < 3)).join("");
      $("#count").textContent = `${list.length} ${list.length === 1 ? "product" : "products"}`;
    };
    chipBox.addEventListener("click", (e) => {
      const b = e.target.closest("[data-chip]"); if (!b) return;
      active = b.dataset.chip;
      const c = S.collections.find((x) => x.id === active);
      $("#shop-title").textContent = c ? c.name : "Shop all";
      $("#shop-blurb").textContent = c ? c.blurb : "Every piece in the Sir Betalot collection.";
      $("#crumb-here").textContent = c ? c.name : "Shop all";
      history.replaceState(null, "", active === "all" ? "shop.html" : `shop.html?c=${active}`);
      $$(".nav a").forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === (active === "all" ? "shop.html" : `shop.html?c=${active}`)));
      draw();
    });
    $("#sort").addEventListener("change", draw);
    draw();
  }

  /* ---------------- Page: product ---------------- */
  if (page === "product") {
    const p = byId(new URLSearchParams(location.search).get("p")) || S.products[0];
    document.title = `${p.name} | Sir Betalot Official Store`;
    const sizes = Object.entries(p.sizes);
    const one = sizes.length === 1;
    let sel = one ? sizes[0][0] : null;
    let img = 0;
    const col = S.collections.find((c) => c.id === p.collection);
    $("#pdp").innerHTML = `
      <div class="gallery">
        <div class="thumbs" role="group" aria-label="Product images">
          ${p.images.map((f, i) => `<button type="button" data-img="${i}" aria-label="Show image ${i + 1}" aria-current="${i === 0}"><img src="${IMG + f}" alt="" width="84" height="105"></button>`).join("")}
        </div>
        <div class="stage">
          <img id="stage-img" src="${IMG + p.images[0]}" alt="${esc(p.name)} in ${esc(p.color)}, image 1 of ${p.images.length}" width="1200" height="1500">
          <div class="stage-nav"><button type="button" data-step="-1" aria-label="Previous image">${ICON.left}</button><button type="button" data-step="1" aria-label="Next image">${ICON.right}</button></div>
        </div>
      </div>
      <div class="buy">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="shop.html?c=${p.collection}">${col.name}</a></nav>
        ${p.badge || p.compareAt ? `<span class="eyebrow">${p.compareAt ? "On sale" : esc(p.badge)}</span>` : ""}
        <h1 class="display">${esc(p.name)}</h1>
        <div class="price">${priceHtml(p)}</div>
        <div class="tax">Tax included. <a class="link" href="#" data-info="shipping">Shipping</a> calculated at checkout.</div>
        <p class="lead">${esc(p.short)}</p>
        <div class="opt"><div class="opt-head"><span><b>Colour:</b> ${esc(p.color)}</span></div>
          <div class="sizes"><span class="swatch" style="width:32px;height:32px;background:${p.swatch};box-shadow:0 0 0 2px var(--sba-night),0 0 0 4px var(--sba-gold)" aria-hidden="true"></span></div></div>
        <div class="opt">
          <div class="opt-head"><span><b>Size:</b> <span id="size-label">${one ? sel : "Select a size"}</span></span>${one ? "" : '<a class="link" href="#" data-sizeguide>Size guide</a>'}</div>
          <div class="sizes" role="group" aria-label="Size">
            ${sizes.map(([s, n]) => `<button class="size" type="button" data-size="${s}" aria-pressed="${s === sel}" ${n ? "" : "disabled"} aria-label="${s}${n ? "" : ", sold out"}">${s}</button>`).join("")}
          </div>
          <div class="stock" id="stock" aria-live="polite"></div>
        </div>
        <div class="buy-row">
          <div class="qty"><button type="button" data-step-qty="-1" aria-label="Decrease quantity">&minus;</button><label class="sr-only" for="qty">Quantity</label><input id="qty" type="number" inputmode="numeric" min="1" value="1"><button type="button" data-step-qty="1" aria-label="Increase quantity">+</button></div>
          <button class="btn btn-primary" id="add" type="button">${one ? "Add to bag" : "Select a size"}</button>
        </div>
        <div class="assure">
          <div>${ICON.truck}Free shipping over ${money(S.freeShippingFrom)}. Ships in 2 business days.</div>
          <div>${ICON.returns}30-day returns and free size exchanges.</div>
          <div>${ICON.lock}Secure checkout.</div>
        </div>
        <details class="acc" open><summary>Details</summary><div class="acc-body"><ul>${p.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div></details>
        <details class="acc"><summary>Size and fit</summary><div class="acc-body"><p style="margin:0">${esc(p.fit)}</p></div></details>
        <details class="acc"><summary>Care</summary><div class="acc-body"><p style="margin:0">Machine wash cold, inside out, with similar colours. Do not bleach. Tumble dry low or hang dry. Do not iron the print or embroidery.</p></div></details>
        <details class="acc"><summary>Shipping and returns</summary><div class="acc-body"><p style="margin:0">Free standard shipping on orders over ${money(S.freeShippingFrom)}, otherwise ${money(6)}. Unworn items with tags can be returned within 30 days.</p></div></details>
      </div>`;

    const stage = $("#stage-img"), add = $("#add"), qty = $("#qty"), stock = $("#stock");
    const show = (i) => {
      img = (i + p.images.length) % p.images.length;
      stage.src = IMG + p.images[img];
      stage.alt = `${p.name} in ${p.color}, image ${img + 1} of ${p.images.length}`;
      $$(".thumbs button").forEach((b, k) => b.setAttribute("aria-current", k === img));
    };
    const update = () => {
      const n = sel ? p.sizes[sel] : 0;
      add.disabled = !sel;
      add.textContent = sel ? `Add to bag · ${money(p.price * Math.max(1, +qty.value || 1))}` : "Select a size";
      stock.className = "stock" + (sel && n <= 5 ? " low" : "");
      stock.textContent = !sel ? "" : n <= 5 ? `Only ${n} left in ${sel}` : "In stock, ready to ship";
      qty.max = n || 1;
      if (+qty.value > n && n) qty.value = n;
    };
    $("#pdp").addEventListener("click", (e) => {
      const t = e.target.closest("[data-img],[data-step],[data-size],[data-step-qty]"); if (!t) return;
      if (t.dataset.img) show(+t.dataset.img);
      else if (t.dataset.step) show(img + +t.dataset.step);
      else if (t.dataset.size) { sel = t.dataset.size; $$(".size").forEach((b) => b.setAttribute("aria-pressed", b === t)); $("#size-label").textContent = sel; update(); }
      else if (t.dataset.stepQty) { qty.value = Math.max(1, Math.min(+qty.max || 99, (+qty.value || 1) + +t.dataset.stepQty)); update(); }
    });
    qty.addEventListener("input", update);
    add.addEventListener("click", () => {
      if (!sel) return;
      cart.add(p.id, sel, Math.max(1, +qty.value || 1));
      toast(`${p.name} (${sel}) added to your bag`);
      window.SBA_OPEN_CART();
    });
    update();
    $("#related").innerHTML = S.products.filter((x) => x.id !== p.id).sort((a, b) => (a.collection !== p.collection) - (b.collection !== p.collection)).slice(0, 4).map((x) => card(x)).join("");
  }
})();
