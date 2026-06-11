# The Homemade Pantry — Change Log

> A plain-language record of what changed on the website and in the project, and why it matters.
> Newest entries at the top. Updated every time meaningful work ships.
> (The fully detailed technical record lives in the [commit history](https://github.com/micahkerber/homemade-pantry/commits/master).)

---

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
