/* Cart: several cakes, quantity in lb, order sent on WhatsApp */
window.TCP_CART = (function () {
  const KEY = "tcp_cart", $ = id => document.getElementById(id);
  let items = [];
  try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const find = id => (window.TCP_ALL || []).find(p => p.id === id);
  const rows = () => items.map(i => ({ i, p: find(i.id) })).filter(r => r.p && r.p.available);
  const total = () => rows().reduce((s, r) => s + r.p.price * r.i.lb, 0);

  function open(v) {
    $("cart").classList.toggle("open", v);
    $("backdrop").classList.toggle("open", v);
    $("cart").setAttribute("aria-hidden", String(!v));
  }
  function render() {
    const r = rows();
    items = r.map(x => x.i);
    save();
    $("cartCount").textContent = items.length;
    $("cartList").innerHTML = r.length ? r.map(({ i, p }) =>
      '<li><img src="' + esc(p.image) + '" alt="" width="56" height="70"><div><b>' + esc(p.name) + "</b><span>" + TCP_MONEY(p.price) + " / lb</span>" +
      '<div class="qty"><button type="button" data-d="-0.5" data-id="' + esc(p.id) + '" aria-label="Less">−</button><output>' + i.lb + ' lb</output>' +
      '<button type="button" data-d="0.5" data-id="' + esc(p.id) + '" aria-label="More">+</button>' +
      '<button type="button" class="rm" data-rm="' + esc(p.id) + '">Remove</button></div></div></li>'
    ).join("") : '<li class="empty">Your cart is empty. Add a cake to start your order.</li>';
    $("cartTotal").textContent = TCP_MONEY(total());
    $("sendOrder").disabled = !r.length;
  }
  function add(id) {
    const it = items.find(i => i.id === id);
    if (it) it.lb += 1; else items.push({ id: id, lb: 1 });
    render();
  }

  $("cartBtn").onclick = () => open(true);
  $("cartClose").onclick = () => open(false);
  $("backdrop").onclick = () => open(false);
  document.addEventListener("keydown", e => { if (e.key === "Escape") open(false); });
  $("cartList").onclick = function (e) {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.rm) items = items.filter(i => i.id !== b.dataset.rm);
    if (b.dataset.d) {
      const it = items.find(i => i.id === b.dataset.id);
      if (it) it.lb = Math.max(1, it.lb + Number(b.dataset.d));
    }
    render();
  };
  $("cartForm").onsubmit = function (e) {
    e.preventDefault();
    const r = rows();
    if (!r.length) return;
    const L = ["Hello Tuli's Cake & Pastry! I'd like to place an order:", ""];
    r.forEach(({ i, p }, n) => L.push((n + 1) + ". " + p.name + " (" + p.id + ") — " + i.lb + " lb × " + TCP_MONEY(p.price) + " = " + TCP_MONEY(p.price * i.lb)));
    L.push("", "Estimated total: " + TCP_MONEY(total()) + " (final price to be confirmed)");
    L.push("Name: " + $("cName").value.trim(), "Delivery address (Dumuria): " + $("cAddr").value.trim());
    if ($("cDate").value) L.push("Date needed: " + $("cDate").value);
    if ($("cNote").value.trim()) L.push("Note: " + $("cNote").value.trim());
    window.open(TCP_WA(L.join("\n")), "_blank", "noopener");
  };
  $("cartCount").textContent = items.length;
  return { add, render, open };
})();
