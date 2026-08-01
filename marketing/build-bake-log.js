// Builds bake-log.xlsx — the Weekly Bread Drop order log for Jaime.
// Run: node marketing/build-bake-log.js   (after `npm install` in this folder)
//
// Three tabs:
//   Orders           — one row per order (columns mirror the order form)
//   Weekly Bake List — pick a Friday, see exactly what to bake + the money
//   How to Use       — plain-language instructions
//
// If the weekly menu changes, edit PRODUCTS below and re-run.

const ExcelJS = require('exceljs');
const path = require('path');

// ── Brand colors (ARGB) ──
const TEAL    = 'FF2C6E6A';
const TEALPALE= 'FFE4F4F3';
const CLAY    = 'FFB87050';
const CLAYPALE= 'FFF6E4D8';
const CREAM   = 'FFFAF6EF';
const CHARCOAL= 'FF2A2520';
const LINEN   = 'FFE9E0D2';
const GREENPALE='FFE6F0E6';
const GREEN   = 'FF4A7A4E';

// ── The 10 menu items (order + label). These become the product columns. ──
const PRODUCTS = [
  'Classic Loaf',
  'Jalapeño Cheddar',
  'Asiago Garlic',
  'Straw & Cream Muffins',
  'Cinnamon Muffins',
  'Lemon Cookies',
  'Oatmeal Cookies',
  'Strawberry Jam',
  'Peach Jalapeño Jam',
  'Pantry Box',
];

// Orders sheet columns before the products
const LEAD = ['Pickup Date', 'Order Received', 'First Name', 'Last Name', 'Phone', 'Email'];
// ...and after the products
const TAIL = ['Order Total', 'Pickup / Delivery', 'Delivery Address', 'Paid?', 'Notes'];
const HEADERS = [...LEAD, ...PRODUCTS, ...TAIL];

const DATA_START = 3;         // first data row (row 1 = title, row 2 = headers)
const DATA_END = 402;         // format 400 empty rows
const colLetter = (n) => {    // 1 -> A, 27 -> AA
  let s = '';
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = (n - m - 1) / 26; }
  return s;
};

// Product column letters (products start right after LEAD)
const firstProductColIdx = LEAD.length + 1;                 // 1-based
const productCol = (i) => colLetter(firstProductColIdx + i); // i = 0..9
const TOTAL_COL = colLetter(LEAD.length + PRODUCTS.length + 1);      // Order Total
const FULFIL_COL = colLetter(LEAD.length + PRODUCTS.length + 2);     // Pickup/Delivery
const PAID_COL = colLetter(LEAD.length + PRODUCTS.length + 4);       // Paid?
const DATE_COL = 'A';                                                // Pickup Date

const wb = new ExcelJS.Workbook();
wb.creator = 'The Homemade Pantry';
wb.created = new Date();

// ─────────────────────────────────────────────────────────
// TAB 1 — ORDERS
// ─────────────────────────────────────────────────────────
const ws = wb.addWorksheet('Orders', { views: [{ state: 'frozen', xSplit: 0, ySplit: 2 }] });

// Title row
ws.mergeCells(1, 1, 1, HEADERS.length);
const title = ws.getCell(1, 1);
title.value = 'The Homemade Pantry  ·  Weekly Bread Drop — Order Log';
title.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TEAL } };
title.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
ws.getRow(1).height = 30;

// Header row
const headerRow = ws.getRow(2);
HEADERS.forEach((h, i) => {
  const c = headerRow.getCell(i + 1);
  c.value = h;
  c.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
  c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TEAL } };
  c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  c.border = { bottom: { style: 'thin', color: { argb: TEAL } } };
});
headerRow.height = 34;

// Column widths
const widths = {
  'Pickup Date': 13, 'Order Received': 15, 'First Name': 12, 'Last Name': 12,
  'Phone': 14, 'Email': 24, 'Order Total': 12, 'Pickup / Delivery': 15,
  'Delivery Address': 26, 'Paid?': 8, 'Notes': 28,
};
HEADERS.forEach((h, i) => {
  ws.getColumn(i + 1).width = widths[h] || 9; // products default to 9
});

// Format the empty data region: borders, zebra, number/date formats, validation
for (let r = DATA_START; r <= DATA_END; r++) {
  const row = ws.getRow(r);
  row.height = 18;
  for (let cI = 1; cI <= HEADERS.length; cI++) {
    const cell = row.getCell(cI);
    cell.border = { bottom: { style: 'hair', color: { argb: LINEN } } };
    cell.font = { size: 10, color: { argb: CHARCOAL } };
    cell.alignment = { vertical: 'middle' };
  }
  // Pickup Date + Order Received as dates
  row.getCell(1).numFmt = 'ddd, mmm d';
  row.getCell(2).numFmt = 'mmm d  h:mm AM/PM';
  // Product qty columns centered
  for (let i = 0; i < PRODUCTS.length; i++) {
    row.getCell(firstProductColIdx + i).alignment = { vertical: 'middle', horizontal: 'center' };
  }
  // Order Total currency
  ws.getCell(`${TOTAL_COL}${r}`).numFmt = '$#,##0';
  ws.getCell(`${TOTAL_COL}${r}`).alignment = { vertical: 'middle', horizontal: 'right' };
  // Center the two dropdown columns
  ws.getCell(`${FULFIL_COL}${r}`).alignment = { vertical: 'middle', horizontal: 'center' };
  ws.getCell(`${PAID_COL}${r}`).alignment = { vertical: 'middle', horizontal: 'center' };
  // Data validation dropdowns
  ws.getCell(`${FULFIL_COL}${r}`).dataValidation = {
    type: 'list', allowBlank: true, formulae: ['"Pickup,Delivery"'],
  };
  ws.getCell(`${PAID_COL}${r}`).dataValidation = {
    type: 'list', allowBlank: true, formulae: ['"Yes,No"'],
  };
}

// Conditional formatting on Paid? — red-ish for No, green-ish for Yes
ws.addConditionalFormatting({
  ref: `${PAID_COL}${DATA_START}:${PAID_COL}${DATA_END}`,
  rules: [
    { type: 'cellIs', operator: 'equal', priority: 1, formulae: ['"No"'],
      style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: CLAYPALE } }, font: { color: { argb: CLAY }, bold: true } } },
    { type: 'cellIs', operator: 'equal', priority: 2, formulae: ['"Yes"'],
      style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: GREENPALE } }, font: { color: { argb: GREEN }, bold: true } } },
  ],
});
// Highlight Delivery in the fulfillment column
ws.addConditionalFormatting({
  ref: `${FULFIL_COL}${DATA_START}:${FULFIL_COL}${DATA_END}`,
  rules: [
    { type: 'cellIs', operator: 'equal', priority: 3, formulae: ['"Delivery"'],
      style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: TEALPALE } }, font: { color: { argb: TEAL }, bold: true } } },
  ],
});

// ── Sample orders (delete these after you see how it works) ──
// Uses next Friday as the sample pickup date so the Bake List lights up.
const SAMPLE_DATE = new Date(2026, 7, 7); // 2026-08-07 (Fri)
const sample = [
  // [Classic,JalCh,Asiago,S&C muf,Cinn muf,Lemon,Oat,StrawJam,PeachJam,Box]
  { first: 'Sample', last: 'Rivera', phone: '832-555-0101', email: 'rivera@example.com',
    q: [1,1,0,0,0,0,0,1,0,0], total: 33, fulfil: 'Pickup', addr: '', paid: 'Yes', notes: 'Sample row — delete me' },
  { first: 'Sample', last: 'Nguyen', phone: '832-555-0102', email: 'nguyen@example.com',
    q: [0,0,1,1,0,0,1,0,1,0], total: 62, fulfil: 'Delivery', addr: '123 Oak St, Katy', paid: 'No', notes: 'Sample row — delete me' },
  { first: 'Sample', last: 'Brooks', phone: '832-555-0103', email: 'brooks@example.com',
    q: [0,0,0,0,0,0,0,0,0,2], total: 64, fulfil: 'Pickup', addr: '', paid: 'Yes', notes: 'Sample row — delete me' },
];
sample.forEach((o, idx) => {
  const r = DATA_START + idx;
  ws.getCell(`A${r}`).value = SAMPLE_DATE;
  ws.getCell(`B${r}`).value = new Date(2026, 7, 4, 9, 12); // order received
  ws.getCell(`C${r}`).value = o.first;
  ws.getCell(`D${r}`).value = o.last;
  ws.getCell(`E${r}`).value = o.phone;
  ws.getCell(`F${r}`).value = o.email;
  o.q.forEach((v, i) => { if (v) ws.getCell(`${productCol(i)}${r}`).value = v; });
  ws.getCell(`${TOTAL_COL}${r}`).value = o.total;
  ws.getCell(`${FULFIL_COL}${r}`).value = o.fulfil;
  ws.getCell(`${colLetter(LEAD.length + PRODUCTS.length + 3)}${r}`).value = o.addr; // Delivery Address
  ws.getCell(`${PAID_COL}${r}`).value = o.paid;
  ws.getCell(`${colLetter(HEADERS.length)}${r}`).value = o.notes; // Notes
  ws.getCell(`C${r}`).font = { size: 10, italic: true, color: { argb: 'FF8A847C' } };
});

// ─────────────────────────────────────────────────────────
// TAB 2 — WEEKLY BAKE LIST
// ─────────────────────────────────────────────────────────
const bl = wb.addWorksheet('Weekly Bake List');
bl.getColumn(1).width = 26;
bl.getColumn(2).width = 16;

bl.mergeCells('A1:B1');
const bTitle = bl.getCell('A1');
bTitle.value = 'Weekly Bake List';
bTitle.font = { size: 15, bold: true, color: { argb: 'FFFFFFFF' } };
bTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TEAL } };
bTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
bl.getRow(1).height = 30;

// Date selector
bl.getCell('A3').value = 'Bake for pickup date →';
bl.getCell('A3').font = { bold: true, size: 11, color: { argb: CHARCOAL } };
const dateInput = bl.getCell('B3');
dateInput.value = SAMPLE_DATE;
dateInput.numFmt = 'ddd, mmm d, yyyy';
dateInput.font = { bold: true, size: 11, color: { argb: TEAL } };
dateInput.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: CREAM } };
dateInput.border = { top:{style:'thin',color:{argb:CLAY}}, left:{style:'thin',color:{argb:CLAY}}, bottom:{style:'thin',color:{argb:CLAY}}, right:{style:'thin',color:{argb:CLAY}} };
dateInput.alignment = { horizontal: 'center' };
bl.getCell('A4').value = '(type any Friday here — the numbers below update)';
bl.getCell('A4').font = { italic: true, size: 9, color: { argb: 'FF8A847C' } };

// Bake table header
bl.getCell('A6').value = 'PRODUCT';
bl.getCell('B6').value = 'QTY TO BAKE';
['A6','B6'].forEach(a => {
  const c = bl.getCell(a);
  c.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
  c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: CLAY } };
  c.alignment = { horizontal: a === 'A6' ? 'left' : 'center', vertical: 'middle', indent: a === 'A6' ? 1 : 0 };
});
bl.getRow(6).height = 20;

// One row per product with a SUMIFS over the Orders sheet
PRODUCTS.forEach((name, i) => {
  const r = 7 + i;
  bl.getCell(`A${r}`).value = name;
  bl.getCell(`A${r}`).font = { size: 11, color: { argb: CHARCOAL } };
  bl.getCell(`A${r}`).alignment = { indent: 1 };
  const col = productCol(i);
  bl.getCell(`B${r}`).value = { formula: `SUMIFS('Orders'!${col}:${col},'Orders'!$${DATE_COL}:$${DATE_COL},$B$3)` };
  bl.getCell(`B${r}`).font = { size: 12, bold: true, color: { argb: TEAL } };
  bl.getCell(`B${r}`).alignment = { horizontal: 'center' };
  const fill = i % 2 ? CREAM : 'FFFFFFFF';
  bl.getCell(`A${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
  bl.getCell(`B${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
});

// Summary block
const sumStart = 7 + PRODUCTS.length + 1; // one blank row gap
bl.getCell(`A${sumStart}`).value = 'THIS DROP';
bl.getCell(`A${sumStart}`).font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
bl.mergeCells(`A${sumStart}:B${sumStart}`);
bl.getCell(`A${sumStart}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TEAL } };
bl.getCell(`A${sumStart}`).alignment = { indent: 1 };

const D = `'Orders'!$${DATE_COL}:$${DATE_COL}`;
const summary = [
  ['Orders',        `COUNTIFS(${D},$B$3)`, '0'],
  ['Revenue',       `SUMIFS('Orders'!$${TOTAL_COL}:$${TOTAL_COL},${D},$B$3)`, '$#,##0'],
  ['Pickups',       `COUNTIFS(${D},$B$3,'Orders'!$${FULFIL_COL}:$${FULFIL_COL},"Pickup")`, '0'],
  ['Deliveries',    `COUNTIFS(${D},$B$3,'Orders'!$${FULFIL_COL}:$${FULFIL_COL},"Delivery")`, '0'],
  ['Unpaid orders', `COUNTIFS(${D},$B$3,'Orders'!$${PAID_COL}:$${PAID_COL},"No")`, '0'],
  ['Unpaid $',      `SUMIFS('Orders'!$${TOTAL_COL}:$${TOTAL_COL},${D},$B$3,'Orders'!$${PAID_COL}:$${PAID_COL},"No")`, '$#,##0'],
];
summary.forEach((s, i) => {
  const r = sumStart + 1 + i;
  bl.getCell(`A${r}`).value = s[0];
  bl.getCell(`A${r}`).font = { size: 11, color: { argb: CHARCOAL } };
  bl.getCell(`A${r}`).alignment = { indent: 1 };
  bl.getCell(`B${r}`).value = { formula: s[1] };
  bl.getCell(`B${r}`).numFmt = s[2];
  bl.getCell(`B${r}`).font = { size: 11, bold: true, color: { argb: CHARCOAL } };
  bl.getCell(`B${r}`).alignment = { horizontal: 'center' };
});

// ─────────────────────────────────────────────────────────
// TAB 3 — HOW TO USE
// ─────────────────────────────────────────────────────────
const how = wb.addWorksheet('How to Use');
how.getColumn(1).width = 100;
const lines = [
  ['The Homemade Pantry — Weekly Bread Drop Order Log', 'title'],
  ['', 'gap'],
  ['What this is', 'h'],
  ['A running log of every bread-drop order, plus an automatic "what to bake" list for each Friday.', 'p'],
  ['', 'gap'],
  ['Each week', 'h'],
  ['1. As orders arrive, add a row on the ORDERS tab. Each order emails you the details — copy them in.', 'p'],
  ['2. Put the Friday pickup date in the "Pickup Date" column for every order in that drop.', 'p'],
  ['3. When a Venmo/Zelle payment lands, set that order’s "Paid?" to Yes (unpaid rows glow clay-orange).', 'p'],
  ['4. On the WEEKLY BAKE LIST tab, type that Friday’s date in the highlighted box.', 'p'],
  ['   The tab instantly shows how many of each item to bake, revenue, pickups vs. deliveries, and who still owes.', 'p'],
  ['', 'gap'],
  ['Faster data entry (optional)', 'h'],
  ['Instead of typing each order, you can export all orders as a CSV from the Netlify dashboard', 'p'],
  ['(Forms → order → Download CSV) and paste them in — the columns are laid out to match.', 'p'],
  ['Later, we can automate this so orders drop into the sheet by themselves (Zapier/Make).', 'p'],
  ['', 'gap'],
  ['The sample rows', 'h'],
  ['The three "Sample" rows on the ORDERS tab are just to show it working. Delete them before you start.', 'p'],
  ['', 'gap'],
  ['If the menu changes', 'h'],
  ['The product columns match the current weekly menu. If flavors change long-term, just rename the', 'p'],
  ['column headers — the Bake List follows the columns automatically.', 'p'],
];
lines.forEach((l, i) => {
  const r = i + 1;
  const c = how.getCell(`A${r}`);
  c.value = l[0];
  if (l[1] === 'title') { c.font = { size: 14, bold: true, color: { argb: TEAL } }; }
  else if (l[1] === 'h') { c.font = { size: 11, bold: true, color: { argb: CLAY } }; how.getRow(r).height = 20; }
  else { c.font = { size: 11, color: { argb: CHARCOAL } }; }
});

// Save
const out = path.resolve(__dirname, 'bake-log.xlsx');
wb.xlsx.writeFile(out).then(() => console.log('Wrote', out));
