/* Local product data (used now, and as fallback when Google Sheets is off or unreachable).
   Fields match the Sheet columns: id, name, category, price (per lb), availability, status, badge, image.
   Prices are placeholders (300/350 per lb) — edit them here. */
(function () {
  const P = (n, name, category, price) => ({
    id: "TC-" + n, name, category, price,
    availability: "Available", status: true, badge: "",
    image: "assets/cakes/TC-" + n + ".jpg"
  });
  window.TCP_PRODUCTS = [
    P("01", "Car & Road Theme Cake", "Theme Cake", 350),
    P("02", "Red Heart Birthday Cake", "Birthday Cake", 300),
    P("03", "Heart Pattern Candle Cake", "Birthday Cake", 300),
    P("04", "Football Theme Cake", "Theme Cake", 350),
    P("05", "Gift Tray Design Cake", "Customized Cake", 350),
    P("06", "Fairy Wings First Birthday Cake", "Theme Cake", 350),
    P("07", "Yellow Floral Birthday Cake", "Birthday Cake", 300),
    P("08", "Red Message Cake", "Customized Cake", 350),
    P("09", "Mini Message Cake Trio", "Bento Cake", 300),
    P("10", "Red Bow Message Cake", "Customized Cake", 350),
    P("11", "Baby Photo Print Cake", "Customized Cake", 350),
    P("12", "Heart Shape Pink Cake", "Birthday Cake", 300),
    P("13", "Purple Rose Birthday Cake", "Birthday Cake", 300),
    P("14", "Lavender Flower Cake", "Birthday Cake", 300),
    P("16", "Husband Crossword Cake (Gold Edge)", "Customized Cake", 350),
    P("18", "White Flower Candle Cake", "Birthday Cake", 300),
    P("20", "Blue Rose Birthday Cake", "Birthday Cake", 300),
    P("21", "Heart Outline Cake", "Customized Cake", 350),
    P("22", "Cartoon Girl Floral Cake", "Customized Cake", 350),
    P("23", "Butterfly Two-Tier Cake", "Theme Cake", 350),
    P("24", "Star Shape Navy Cake", "Customized Cake", 350),
    P("29", "Pink Rose Birthday Cake", "Birthday Cake", 300),
    P("30", "Rose Wreath Cake", "Birthday Cake", 300),
    P("31", "Green Leaf Birthday Cake", "Birthday Cake", 300),
    P("32", "Doctor Heartbeat Cake", "Customized Cake", 350),
    P("33", "Ballerina Butterfly Cake", "Theme Cake", 350),
    P("34", "Lilac Daisy Birthday Cake", "Birthday Cake", 300),
    P("35", "Orange Slice Cake", "Customized Cake", 350),
    P("36", "Blue Swirl Birthday Cake", "Birthday Cake", 300),
    P("37", "Pink Rosette Cake", "Birthday Cake", 300),
    P("38", "Yellow Butterfly Birthday Cake", "Birthday Cake", 300),
    P("39", "Mini Cake Trio", "Bento Cake", 300),
    P("40", "Gift Box Cake", "Bento Cake", 300),
    P("41", "Butterfly Girl Theme Cake", "Theme Cake", 350),
    P("42", "10 Year Anniversary Cake", "Anniversary Cake", 350),
    P("43", "Red Heart Anniversary Cake", "Anniversary Cake", 350),
    P("44", "Red Flower Birthday Cake", "Birthday Cake", 300),
    P("45", "Husband Crossword Cake (Red Hearts)", "Customized Cake", 350),
    P("46", "Teddy Bear Two-Tier Cake", "Theme Cake", 350),
    P("47", "Purple Butterfly Cake", "Theme Cake", 350),
    P("48", "Smiley Face Bento Cake", "Bento Cake", 300),
    P("49", "Purple Crown Cake", "Customized Cake", 350),
    P("50", "Gold Edge Birthday Cake", "Birthday Cake", 300)
  ];
})();
