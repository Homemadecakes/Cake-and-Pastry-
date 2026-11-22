// Google Apps Script: Google Sheet থেকে JSON (বা JSONP) তৈরি করে।
const CONFIG = {
  SPREADSHEET_ID: '',      // Sheet-এর ভেতর থেকে Script খুললে ফাঁকা রাখুন; নইলে এখানে Spreadsheet ID দিন
  SHEET_NAME: 'Products'
};
const REQUIRED = ['id', 'name', 'category', 'price', 'availability', 'status'];

function doGet(e) {
  let out;
  try { out = { ok: true, products: readProducts_() }; }
  catch (err) { out = { ok: false, error: String(err.message || err), products: [] }; }
  const body = JSON.stringify(out);
  const cb = e && e.parameter && e.parameter.callback;
  if (cb && /^[A-Za-z_$][\w$]*$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + body + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}

function readProducts_() {
  const ss = CONFIG.SPREADSHEET_ID ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Spreadsheet পাওয়া যায়নি');
  const sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) throw new Error('"' + CONFIG.SHEET_NAME + '" নামের Sheet নেই');
  const v = sh.getDataRange().getValues();
  if (!v.length) return [];
  const head = v[0].map(function (h) { return String(h).trim().toLowerCase(); });
  const miss = REQUIRED.filter(function (c) { return head.indexOf(c) < 0; });
  if (miss.length) throw new Error('Header নেই: ' + miss.join(', '));
  return v.slice(1).map(function (r) {
    const o = {};
    head.forEach(function (k, i) { if (k) o[k] = r[i] === null ? '' : r[i]; });
    return o;
  }).filter(function (o) {
    return String(o.id).trim() !== '' && String(o.status).trim().toUpperCase() === 'TRUE';
  }).map(function (o) { o.id = String(o.id).trim(); return o; });
}
