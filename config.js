/* Tuli's Cake & Pastry — site settings. Edit here, not in the other files. */
window.TCP_CONFIG = {
  brand: "Tuli's Cake & Pastry",
  tagline: "Sweet Moments, Beautiful Memories.",
  whatsapp: "8801982561926",
  facebook: "https://www.facebook.com/share/1FAnDNrKje/",
  address: "ডুমুরিয়া, খুলনা",
  categories: ["Birthday Cake", "Customized Cake", "Wedding Cake", "Anniversary Cake", "Chocolate Cake", "Bento Cake", "Theme Cake", "Cupcakes"],
  /* Google Sheets: set enabled to true after the Apps Script API is tested */
  sheets: {
    enabled: false,
    url: "https://script.google.com/macros/s/AKfycbzEz7RReKz2sNJoybR01iKQGDrE6Nv2NjtI8i5BO8yfbtlHkEpzMr6W5Rs4NHZO7cD1xQ/exec"
  }
};
window.TCP_WA = function (text) {
  return "https://wa.me/" + TCP_CONFIG.whatsapp + "?text=" + encodeURIComponent(text);
};
window.TCP_MONEY = function (n) { return "৳" + Number(n).toLocaleString("en-US"); };
