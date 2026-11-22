# Tuli's Cake & Pastry: সেটআপ গাইড

## ১. Google Sheet
1. Google Drive-এ `Google_Sheet_Template.xlsx` আপলোড করে **Google Sheets দিয়ে খুলুন** (বা Sheets-এ File → Import)।
2. `Products` ট্যাবে `name`, `category`, `price` কলাম পূরণ করুন। `id` বদলাবেন না।
3. `availability`: `Available` বা `Not Available`। `status`: `TRUE` = দেখাবে, `FALSE` = লুকাবে।
4. `price` ফাঁকা থাকলে সাইটে "দাম জানতে মেসেজ করুন" দেখাবে।
5. ১৭টি ডুপ্লিকেট ছবি ও ১টি লোগো-ছবির `status` FALSE করা আছে।

## ২. Apps Script (ডেটা API)
1. Sheet-এ **Extensions → Apps Script** খুলুন, `Code.gs`-এর পুরো কোড পেস্ট করে সেভ করুন।
2. **Deploy → New deployment → Web app**: Execute as = **Me**, Who has access = **Anyone** → Deploy।
3. যে **Web app URL** পাবেন, সেটি `config.js`-এর `apiUrl`-এ বসান।
4. Script আলাদা প্রজেক্ট হলে `Code.gs`-এর `SPREADSHEET_ID`-তে Sheet-এর ID দিন।
5. Code.gs বদলালে **Manage deployments → Edit → New version** দিয়ে আবার Deploy করুন (URL একই থাকে)।

## ৩. `config.js` পূরণ
`whatsapp` (যেমন `8801XXXXXXXXX`), `phone`, `facebook`, `address` লিখুন। ফাঁকা থাকলে ওই অংশ সাইটে দেখাবে না। WhatsApp নম্বর না দেওয়া পর্যন্ত অর্ডার বাটন নম্বর ছাড়া খুলবে।

## ৪. GitHub Pages
1. GitHub-এ repository `tulis-cake-pastry` খুলুন (Public)।
2. এই ফোল্ডারের **ভেতরের সব ফাইল** (`index.html`, `assets/` ইত্যাদি) আপলোড করুন।
3. **Settings → Pages → Source: Deploy from a branch → main / (root)** → Save।
4. কয়েক মিনিট পর সাইট চালু হবে: `https://tiredmanmehhh-jpg.github.io/tulis-cake-pastry/`

## নতুন কেক যোগ
ছবি `assets/images/` ফোল্ডারে দিন (ফাইলনাম = Sheet-এর `id` + `.webp`/`.jpg`/`.png`), তারপর Sheet-এ নতুন সারি যোগ করুন। অন্য নামে ছবি রাখলে `image` কলামে ফাইলনাম লিখুন।
