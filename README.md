# Tuli's Cake & Pastry — ওয়েবসাইট

## GitHub Pages-এ চালু করার নিয়ম
1. GitHub repo খুলুন (Homemadecakes/Cake-and-Pastry-)। **Add file → Upload files** চাপুন।
2. এই ফোল্ডারের ভেতরের সব কিছু (index.html, css, js, assets, README.md) টেনে এনে ছাড়ুন। `index.html` যেন repo-র একদম ওপরে থাকে।
3. **Commit changes** চাপুন।
4. **Settings → Pages → Branch: main, Folder: / (root) → Save**।
5. ১–২ মিনিট পর Pages-এর লিংকে সাইট খুলবে।

## কোন ফাইলে কী বদলাবেন
- `js/products.js`: কেকের নাম, ক্যাটাগরি, দাম, availability, badge। দামগুলো এখন আনুমানিক (৩০০/৩৫০ প্রতি পাউন্ড), আপনার দাম দিয়ে বদলে নিন।
- `js/config.js`: WhatsApp নম্বর, Facebook লিংক, ক্যাটাগরির তালিকা।
- `assets/cakes/`: কেকের ছবি (নাম TC-02.jpg, TC-03.jpg ইত্যাদি, প্রোডাক্ট ID-র সাথে মেলানো)।
- Badge লিখলে (যেমন "Best Seller", "Offer") কেকটি "Best sellers & offers" অংশে আলাদা করে দেখাবে। কোনো কেকে badge না থাকলে ওই অংশ লুকানো থাকে।
- Wedding, Chocolate আর Cupcakes ক্যাটাগরিতে কেক যোগ করলেই ফিল্টারে বাটন দেখা যাবে। কেক না থাকলে বাটন দেখায় না।

## Google Sheets (পরের ধাপ)
- Sheet-এর কলাম: `id, name, category, price, availability, status, badge, image`। `image` ফাঁকা রাখলে `assets/cakes/<id>.jpg` ধরা হবে।
- `availability`: Available হলে দাম ও Add to cart দেখায়, Not Available হলে শুধু "Not Available" লেখা।
- `status`: TRUE হলে কেক দেখায়, FALSE হলে লুকায়।
- Apps Script API পরীক্ষা হয়ে গেলে `js/config.js`-এ `sheets.enabled` কে `true` করুন। Sheet না পেলে সাইট নিজে থেকেই `products.js`-এর ডেটা দেখাবে।

## ছবি
- ৪৩টা কেকের ছবি আছে। Bouquet-এর ছবিগুলো বাদ দেওয়া হয়েছে।
- হিরো ছবি ৪টা: `assets/hero/hero-1.jpg` থেকে `hero-4.jpg`।
