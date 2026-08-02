# Marketing — The Weekly Bread Drop

Assets and tracker for Jaime's bread/sweets/jam ordering, which doubles as top-of-funnel
marketing for the Homemade Pantry experiences (every order carries the **FRESH10** code —
$10 off an experience).

## The model
Weekly "bread drop": customers **order by Tuesday**, Jaime bakes, everything is **fresh Friday**
(pickup in Brookshire or local delivery, $5 / $25 minimum). Payment is **prepay by Venmo
(@Jaime-Kerber-1) or Zelle (micahkerber@gmail.com)** — the order is confirmed once payment lands.

## How it works (same pipeline as the booking form)
Order page (`website/order.html`) → Netlify Forms → (1) emails the bake list to
thehomemadepantryco@gmail.com and (2) triggers `netlify/functions/submission-created.js`,
which emails the customer their total + payment instructions via Resend.

## Files in this folder
| File | What it is |
|---|---|
| `order-qr.png` | Scan-to-order QR → thehomemadepantryco.com/order.html (for print, market table, cards) |
| `launch-graphic.png` | 2160×2160 branded Instagram/Facebook launch graphic |
| `launch-graphic.html` | Editable source for the graphic |
| `render-graphic.js` | Renders the HTML to PNG (`node marketing/render-graphic.js` after `npm install`) |
| `bake-log.xlsx` | Weekly order/bake-log spreadsheet for Jaime — upload to Google Drive → opens as a Google Sheet |
| `build-bake-log.js` | Regenerates bake-log.xlsx (`node marketing/build-bake-log.js`); edit `PRODUCTS` if the menu changes |
| `print-flyer.pdf` / `.png` | Print-ready US Letter flyer — QR is the hero, for posting/handing out (source: `print-flyer.html`, renderer: `render-flyer.js`) |

## Status — what's done / what's left
**Done**
- [x] Order page with live-total flavored menu (order.html)
- [x] Order confirmation email (Venmo/Zelle prepay instructions)
- [x] Scan-to-order QR code
- [x] Branded launch graphic + Instagram caption & posting strategy
- [x] Deployed to production

**Left before physical sales**
- [ ] Cottage-food label — Texas law requires business name + address, ingredients (largest→smallest),
      allergens, and the "made in a home kitchen…" line on every item. *(Waiting on ingredient lists — needed by Friday.)*
- [ ] FRESH10 insert card (the "come make your own" funnel piece for each order)
- [x] Google Sheet order/bake log (`bake-log.xlsx` — upload to Drive)
- [ ] Instagram Stories (9:16) version of the launch graphic *(optional)*

**Jaime's to-do**
- [ ] Set the Instagram bio link to the order page (before posting the launch graphic)
- [ ] Confirm this week's flavors before each drop (editable in `order.html`)
- [ ] Place a test order once live to see the full flow

## This week's flavors (edit in order.html for each drop)
Loaves: Classic · Jalapeño Cheddar · Asiago Garlic · Muffins: Strawberries & Cream · Cinnamon Swirl ·
Cookies: Lemon Crinkle · Oatmeal Chocolate Chip · Jam: Classic Strawberry · Peach Jalapeño
