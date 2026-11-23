/* Category chips and search */
window.TCP_FILTERS = (function () {
  let cat = "All", query = "";
  function chips(products, box, onChange) {
    const have = new Set(products.map(p => p.category));
    const known = TCP_CONFIG.categories;
    const order = known.filter(c => have.has(c)).concat([...have].filter(c => !known.includes(c)));
    box.innerHTML = ["All"].concat(order).map(c =>
      '<button type="button" class="chip' + (c === cat ? " on" : "") + '" data-c="' + c.replace(/"/g, "&quot;") + '">' + (c === "All" ? "All cakes" : c) + "</button>"
    ).join("");
    box.onclick = function (e) {
      const b = e.target.closest("[data-c]");
      if (!b) return;
      cat = b.dataset.c;
      chips(products, box, onChange);
      onChange();
    };
  }
  function apply(products) {
    const q = query.trim().toLowerCase();
    return products.filter(p =>
      (cat === "All" || p.category === cat) &&
      (!q || (p.name + " " + p.category + " " + p.id).toLowerCase().includes(q)));
  }
  return { chips, apply, setQuery: v => { query = v; } };
})();
