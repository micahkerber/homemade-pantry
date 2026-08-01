# The Homemade Pantry — Change Log

> A plain-language record of what changed on the website and in the project, and why it matters.
> Newest entries at the top. Updated every time meaningful work ships.
> (The fully detailed technical record lives in the [commit history](https://github.com/micahkerber/homemade-pantry/commits/master).)

---

## August 1, 2026 — The Weekly Bread Drop launches (online ordering)

- **Jaime can now sell bread, sweets & jam online.** A new order page (`thehomemadepantryco.com/order.html`) lets people order from a weekly menu — sourdough (classic, jalapeño cheddar, asiago garlic), sourdough muffins, cookies, and jam — with a live running total. Orders open through Tuesday; everything is baked fresh Saturday for pickup in Brookshire or local delivery.
- **It runs on the same machine as the booking form** — no new services or costs. The order page is a second Netlify form on the existing pipeline: every order emails the bake list to thehomemadepantryco@gmail.com and sends the customer an automatic confirmation with their total and Venmo/Zelle instructions (prepay confirms the order).
- **The bread feeds the experiences.** Every order and its confirmation email carry a **FRESH10** code — $10 off a sourdough evening — turning bread buyers into experience guests.
- **Marketing kit created** (`marketing/`): a scan-to-order QR code, a branded Instagram/Facebook launch graphic, and the launch caption + posting strategy.
- **"Order Bread" link added to the main site** — in the top navigation, the mobile menu, and the footer — so visitors browsing the experiences can find the order page (kept as a plain link, not a second button, so the experiences stay the site's primary call to action).
- Prices: loaves $12 (specialty $15), muffins $15/half-dozen, cookies $18/dozen, jam $9, Pantry Box bundle $32.
- **Still to come before physical sales:** a cottage-food label (Texas law requires ingredients + allergens on every item) and a printed insert card.

## June 12, 2026 — Reusable launch playbook + Host Dashboard prototype filed

- **Reusable launch playbook added** (`docs/small-business-launch-playbook.md`) — the repeatable 5-phase, ~8-week process distilled from launching this business, ready to copy into the next friend-business project.
- **Host Dashboard design prototype received and filed** for later. It's a high-fidelity mockup of a private back-of-house admin screen (12 views — bookings, calendar, revenue, prep checklists, and more) with sample data only — no real backend yet. Parked in `design/` with notes on the build-vs-buy decision; we'll revisit when ready.

## June 10, 2026 — Faster site, smarter form, real analytics

- **Booking form now requires real choices.** The Experience, Number of Guests, and Location dropdowns start on a "Choose…" prompt and must be answered before the request can send — no more accidental default answers in booking requests.
- **Google Analytics is live** (Measurement ID G-47GHNC2VME). Every visitor is counted with their traffic source (Instagram, Google, direct), and every booking-form submission is logged as a lead with the Pillar and group size chosen. Reports at analytics.google.com (~24 hr lag; Realtime is instant).
- **All photos compressed for the web.** Total image weight dropped from 76 MB to 11 MB (85% lighter) — the site now loads fast on phones. Hidden photo metadata, including the GPS coordinates of the house, was stripped for privacy. Full-resolution originals remain recoverable from git history.
- **Favicon added.** The wheat-stalk badge now appears in browser tabs, bookmarks, and phone home screens.
- **Social share preview cards added.** When the website link is texted or shared, it now unfurls with the tulip-table photo, the business name, and the tagline (the preview-party page gets its own card with the group photo). Previously shared links showed nothing.

## June 6, 2026

- **Instagram handle corrected** to @thehomemadepantryco2026 everywhere on the site.

## May 26–27, 2026 — Confirmation emails + photo carousel overhaul

- **Guests now get an automatic branded confirmation email** when they submit the booking form, sent from hello@thehomemadepantryco.com (via a Netlify Function + Resend). Replies land in the business Gmail.
- **Photo carousel restructured** into three grouped sections with auto-reset on scroll; Kayla's birthday photos upgraded to HD, low-quality slides removed.
- **All photos renamed** to descriptive, web-friendly names and organized into per-event folders.
- **Booking page updated** with the at-our-place / at-your-place location choice and duration messaging.

## May 18–19, 2026 — Jaime's copy edits

- **Jaime's website updates applied** across the landing, experience, hosts, and pricing sections.
- **Copy corrected for accuracy:** guests take home a *dried* starter packet (not a live jar) and taste their bread fresh before taking it home.
- **Brittany's title set to Executive Baker** site-wide.
- Hero card overlays made more readable.

## May 10, 2026 — Site goes functional

- **Booking form connected to Netlify Forms** — submissions now actually arrive (notification email to the business Gmail). Includes a fix for a bug where the form looked like it worked but sent nothing.
- **Domain switched to thehomemadepantryco.com** across the site.
- **Pricing restructured** and the booking form updated to match.
- **Jaime's and Brittany's full bios added.**

## May 1, 2026

- Laney's birthday photos (Pillar Two) and the LLC operating agreement added.

## April 28, 2026

- **Real guest reviews replaced the placeholder testimonials.**
- Photo slider added for the evening section.

## April 18–24, 2026 — Brand and logo

- **Circular wheat-stalk logo designed, refined, and finalized** (Curved version chosen from Canva finalists) and added to the site's nav and footer.
- **Offerings restructured as two named Pillars** — Sourdough & Preserves (Jaime) and Baking & Pastry (Brittany) — on the website and in the project brief.
- **Instagram setup guide** (9 launch posts, bio copy, hashtag bank) and **Google Business Profile guide** (with address-hiding instructions) written.

## April 18, 2026 — Project begins

- Initial snapshot committed: full single-page website, brand concept, launch plan, LLC formation plan, and 30-day Instagram content calendar.
