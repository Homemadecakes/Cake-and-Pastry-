/* Page logic: load products (local or Google Sheets), render gallery, hero, forms */
(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const normalize = p => ({
    id: String(p.id), name: p.name, category: p.category,
    price: Number(p.price) || 0,
    available: String(p.availability).trim().toLowerCase() === "available",
    visible: String(p.status).trim().toLowerCase() === "true",
    badge: p.badge || "",
    image: p.image || "assets/cakes/" + p.id + ".jpg"
  });

  async function load() {
    let list = window.TCP_PRODUCTS;
    const s = TCP_CONFIG.sheets;
    if (s && s.enabled && s.url) {
      try {
        const res = await fetch(s.url);
        const data = await res.json();
        if (data.products && data.products.length) list = data.products;
      } catch (e) { console.warn("Google Sheet not reachable, using local products."); }
    }
    return list.map(normalize).filter(p => p.visible);
  }

  function card(p) {
    return '<article class="card"><div class="ph">' + (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") +
      '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + ", " + esc(p.category) + ' by Tuli\'s Cake &amp; Pastry" loading="lazy" width="450" height="560"></div>' +
      '<div class="info"><h3>' + esc(p.name) + '</h3><p class="cat">' + esc(p.category) + "</p>" +
      (p.available
        ? '<p class="price">' + TCP_MONEY(p.price) + ' <small>/ lb</small></p><button type="button" class="add" data-add="' + esc(p.id) + '">Add to cart</button>'
        : '<p class="na">Not Available</p>') + "</div></article>";
  }

  async function init() {
    const products = await load();
    window.TCP_ALL = products;
    const draw = () => {
      const shown = TCP_FILTERS.apply(products);
      $("grid").innerHTML = shown.map(card).join("");
      $("empty").hidden = shown.length > 0;
    };
    TCP_FILTERS.chips(products, $("chips"), draw);
    $("search").addEventListener("input", e => { TCP_FILTERS.setQuery(e.target.value); draw(); });
    draw();

    const featured = products.filter(p => p.badge);
    $("offers").hidden = !featured.length;
    $("offerGrid").innerHTML = featured.map(card).join("");

    TCP_CART.render();
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-add]");
    if (!b) return;
    TCP_CART.add(b.dataset.add);
    b.textContent = "Added ✓";
    setTimeout(() => { b.textContent = "Add to cart"; }, 1200);
  });

  $("customForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const L = ["Hello Tuli's Cake & Pastry! I'd like a customized cake:", "",
      "Name: " + f.get("name"), "Occasion: " + f.get("occasion"),
      "Weight: " + f.get("weight") + " lb", "Date needed: " + f.get("date"),
      "Design idea: " + f.get("design")];
    if (f.get("text")) L.push("Text on cake: " + f.get("text"));
    L.push("", "I will send reference photos here if I have any.");
    window.open(TCP_WA(L.join("\n")), "_blank", "noopener");
  });

  const today = new Date().toISOString().slice(0, 10);
  document.querySelectorAll('input[type="date"]').forEach(i => { i.min = today; });
  $("year").textContent = new Date().getFullYear();
  $("waFloat").href = TCP_WA("Hello Tuli's Cake & Pastry!");

  const imgs = [...document.querySelectorAll("#heroImg img")];
  let h = 0;
  if (imgs.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => { imgs[h].classList.remove("on"); h = (h + 1) % imgs.length; imgs[h].classList.add("on"); }, 5000);
  }
  init();
})();
