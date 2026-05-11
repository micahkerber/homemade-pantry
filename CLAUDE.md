# The Homemade Pantry — Project Brief for Claude Code

> Read this file fully before every session. This is the complete context for this project.

---

## 🎯 CURRENT PRIORITY — Brand Logo

**Jaime needs a general circular brand logo for sticker printing (bread bags, packaging, etc.)**

- Shape: Circle (sticker format, ~2–3 inch print target)
- Central image: General / experience-agnostic — NOT sourdough-specific. Must represent "made slowly. shared warmly" across all offerings
- Text: "THE HOMEMADE PANTRY" on top arc, "MADE SLOWLY · SHARED WARMLY" on bottom arc
- Colors: Use brand palette — teal-deep background, cream text, clay accents
- Format: SVG (scalable, print-sharp) + HTML preview
- File location: `brand/logo.svg` and `brand/logo-preview.html`
- Print constraints: Solid colors only — no gradients that won't survive thermal/inkjet printing
- When making ANY new page, component, or design asset — include or reference the logo

---

## 🍞 Pillars

Jaime uses the word **"Pillars"** for the distinct experience offerings. All Pillars share one identity:
**"Made slowly. Shared warmly."** — intimate, handcrafted, in-home gatherings for up to 6 guests.

### Pillar One — Sourdough & Preserves (flagship)
Led by Jaime Kerber. The original offering.
Guests make: sourdough loaf, hand-churned flavored butter, small-batch seasonal jam.
Take home: mini sourdough loaf, active starter, flavored butter, jam, recipe card.

### Pillar Two — Baking & Pastry
Led by Brittany Trevett (professionally trained chef and baker).
Guests make: seasonal artisan baking and pastry techniques, hands-on.
Take home: everything made that evening, recipes to recreate at home.

### Future Pillars (TBD)
Additional Pillars may be added. Each will follow the same format:
- Intimate group (up to 6)
- 3–3.5 hours, fully hands-on
- Guests make and take home everything
- Priced in line with existing packages

**Brand rule:** No single Pillar should dominate the brand identity. The logo, website, and all materials lead with the gathering/shared concept — not any specific food item.

---

## Team
- Jaime Kerber — Founder, sourdough and preserves
- Brittany Trevett — Professionally trained chef and baker, leads baking and pastry offerings
## 👤 Who I Am

I'm building the digital side of my wife's business. I have an MIS (Management Information Systems) degree but haven't actively used it in 29 years — I'm very rusty. I'm using this project as a hands-on way to relearn technology and digital business skills.

**How to work with me:**
- Explain the *why* behind what we're building, not just the *what*
- When something connects to a foundational concept (databases, system flows, client-server, etc.) — point it out. Those mental muscles are still there, just dusty
- Don't just execute tasks — teach as we go
- Flag when something is genuinely complex vs. just *looking* complex
- Plain language first, technical terms second (with a brief explanation)
- I'm not in a hurry. I'd rather understand it than rush it

---

## 🏠 The Business

**Name:** The Homemade Pantry
**Owner:** Jaime Kerber
**My role:** Digital infrastructure (essentially CTO for a small business)

**What it is:**
An intimate, in-home culinary gathering experience for small groups. Guests craft something by hand — from sourdough and preserves to baked pastries — in a warm, beautifully styled home setting. Think slow living meets artisan craft — not a cooking class, an *evening*. Multiple experiences available; all share the same spirit.

**Location:** 2415 Sweetwood Ct, Brookshire, TX 77423
**Website:** www.thehomemadepantryco.com
**Instagram:** @thehomemadepantry
**Email:** jaimekerber@gmail.com
**Phone:** 832-546-6446

**Key facts:**
- Up to 6 guests per event — intentionally intimate
- 3–3.5 hour experience
- Guests make everything hands-on (no demonstrations)
- Every guest takes home everything they made

**What guests take home:**
- Mini sourdough loaf (baked that evening)
- Active sourdough starter in mason jar
- Homemade flavored butter
- Small-batch seasonal jam
- Printed recipe & starter care guide

**Ideal for:** Date nights, girls nights, birthday celebrations, private buyouts, corporate gifting

---

## 💰 Pricing

| Package | Price | Details |
|---|---|---|
| Date Night | $240 / couple | Private table for two |
| Group / Girls Night | $120 / person | Up to 6 guests |
| Full Buyout | $600 / evening | Exclusive use, up to 6 included |
| Gift Cards | $120 / $240 / $480 | Available for all packages |

- 50% deposit required at booking
- Cancellations 7+ days out: full deposit refund
- Cancellations within 7 days: non-refundable, may reschedule

---

## 🎨 Brand Identity

### Color Palette
```
--teal-deep:    #2C6E6A   /* Primary brand color */
--teal-mid:     #3D8C87   /* Secondary */
--teal-light:   #A8D4D1   /* Accents, reversed text */
--teal-pale:    #E4F4F3   /* Backgrounds, badges */
--clay:         #B87050   /* Warm accent */
--clay-light:   #E8C4A8   /* Clay tints */
--cream:        #FAF6EF   /* Page background */
--warm-white:   #FDF9F4   /* Card backgrounds */
--charcoal:     #2A2520   /* Headings, dark sections */
--gray:         #8A847C   /* Body text, captions */
--linen:        #EDE5D8   /* Borders, dividers */
--sage:         #7A9E7E   /* Tertiary accent */
```

### Typography
```
Display / Headings:  Playfair Display (serif) — elegant, heritage, warm
Editorial / Quotes:  Cormorant Garamond (italic serif) — refined, emotional
Body / UI / Labels:  Jost (sans-serif) — clean, modern, readable
```
All fonts are available free on Google Fonts.

### Voice & Tone
- Warm and inviting — never stiff or corporate
- Unhurried and intentional — slow living, not slow service
- Story-driven — every recipe and jar has a reason
- Intimate — guests feel chosen, not just booked
- Texas-rooted — local, grounded, genuine

**Words we USE:** gather, craft, slow, artisan, intentional, curated, warm, seasonal, experience, evening, made by hand, from scratch

**Words we AVOID:** class, workshop, tutorial, beginner, basic, DIY, cheap, deal, sale, sign up, slot, available

### Tagline
**Primary:** "Made slowly. Shared warmly."
**Alternatives:**
- "The art of gathering from scratch."
- "Come for the bread. Stay for the moment."
- "Slow hands, warm table."

### Logo System
```
The (italic)
Homemade
Pantry
────────────────  (clay rule)
Artisan · Gathered · Intentional
```
Three versions: on light (teal text), on teal (white text), on dark (white text + clay rule)

### Brand Values
1. **Made by Hand** — Everything is handcrafted, never rushed or packaged
2. **Intentionally Slow** — A counter-cultural offering in a world of speed
3. **Gathered & Shared** — The table is the point; connection is the product
4. **Rooted & Real** — Texas-based, home-hosted, deeply personal

---

## 🌐 Website

### Current Status
A complete single-file HTML website has been built (`website/index.html`).

### Pages / Sections Built
- **Hero** — Full-screen with tagline, CTAs, floating detail cards
- **The Experience** — "This is not a baking class" story + 5-step timeline + take-home grid
- **What We Make** — Sourdough, butter, jam craft cards
- **About Jaime** — Her story, values, the "why"
- **Pricing** — All 3 packages with featured card
- **Testimonials** — 3 guest review cards (swap with real ones when available)
- **Book Your Evening** — Full inquiry form + contact info
- **FAQ** — 7 accordion questions
- **Footer** — Full nav, contact, social links

### Features
- Sticky nav on scroll
- Mobile hamburger menu
- Scroll-reveal animations
- Working FAQ accordion
- Form submission confirmation
- Smooth scroll between sections
- Fully mobile responsive

### Next Steps for Website
- [x] Register domain: thehomemadepantryco.com (Namecheap, connected to Netlify)
- [x] Replace placeholder testimonials with real guest quotes
- [ ] Embed Calendly booking widget
- [ ] Connect Google Analytics
- [x] Host on Netlify (auto-deploys from GitHub master branch)
- [x] Add real photos (40 photos from April 2026 preview party)
- [x] Booking form connected to Netlify Forms (emails thehomemadepantryco@gmail.com)

---

## 🤖 Automation Stack

### Core Tools (Planned)
| Tool | Purpose | Cost |
|---|---|---|
| HoneyBook | Bookings, contracts, invoices, client mgmt | ~$19/mo |
| Calendly | Online scheduling, connects to HoneyBook | Free–$10/mo |
| Stripe | Payment processing, deposits, receipts | 2.9% + 30¢ |
| QuickBooks Simple | Bookkeeping, expenses, profit/loss, taxes | ~$20/mo |
| Google Workspace | Gmail, Drive, Sheets — client data & templates | ~$6/mo |
| Later | Schedule Instagram posts, track engagement | Free–$18/mo |
| Zapier | Connect tools, auto-trigger tasks between apps | Free–$20/mo |
| Google Analytics | Website traffic and conversion tracking | Free |
| ManyChat | Instagram DM auto-replies, comment triggers | Free–$15/mo |

### Automation Flow (When a guest books)
1. Guest visits website → clicks booking link → goes to Calendly
2. Calendly shows dates → guest selects time + fills intake form
3. HoneyBook auto-sends booking contract for digital signature
4. Stripe charges 50% deposit on contract signing
5. HoneyBook sends confirmation email with event details
6. 2 days before event → HoneyBook auto-sends reminder
7. Day after event → HoneyBook auto-sends thank-you + review request
8. QuickBooks auto-logs payment and categorizes income
9. Zapier logs booking to Google Sheet dashboard

### Google Sheets Dashboard (Track these columns)
```
Date | Guest Name | Group Size | Package | Revenue | Deposit | Balance | Notes
```
Monthly totals: Bookings, Revenue, Avg Group Size, Top Package, Expenses, Net Profit

---

## 📱 Instagram Strategy

**Handle:** @thehomemadepantry

**Bio:**
```
Intimate culinary evenings for small groups 🫙
Sourdough · Butter · Seasonal Jam
Made slowly. Shared warmly.
📍 Brookshire, TX · Up to 6 guests
✨ Book your evening ↓
```

**Content Types (color-coded in calendar):**
- 🟦 Process — Behind the scenes, making things
- 🟩 Educate — Tips, how-tos, ingredient facts
- 🟧 Experience — What guests see and feel
- 🟪 Community — Polls, Q&As, testimonials
- 🟨 Booking — CTAs, open dates, gift cards
- 🔴 Personal — Jaime's story, her "why"

**Posting Rules:**
1. Post 4–5x per week max — consistency beats volume
2. Reels first — Instagram pushes Reels to non-followers
3. Reply to every comment within 30 minutes of posting
4. Post Stories every day even on non-post days
5. Captions tell a story — emotion drives saves, saves drive reach
6. Mix broad hashtags (#sourdough) with local (#HoustonFoodie #BrookshireTexas)

**A 30-day content calendar has been built** (`content/instagram-calendar.html`)

---

## 🗂️ Project Files Built So Far

| File | Description |
|---|---|
| `website/index.html` | Complete website — all pages, mobile responsive |
| `website/preview-party.html` | Scrolling story memory page from the April 2026 preview party |
| `website/images/` | 40 photos from the preview party (copied here for Netlify deployment) |
| `docs/brand-concept.html` | Full brand identity mockup |
| `content/instagram-calendar.html` | 30-day content calendar with captions |
| `docs/launch-plan.docx` | 8-step launch plan + automation stack + 30-day checklist |
| `images/` | Original 40 photos from the April 2026 preview party |
| `CLAUDE.md` | This file |

---

## 🚀 Launch Plan Summary

### 8 Steps to First Paying Guests

| Step | Action | Timeline |
|---|---|---|
| 1 | Register LLC (Texas SOS) + business bank account + liability insurance | Days 1–5 |
| 2 | Define offer & pricing (done ✓) | Days 3–6 |
| 3 | Set up HoneyBook + Calendly + Stripe booking system | Days 5–10 |
| 4 | Launch website + Instagram + Google Business Profile | Days 7–14 |
| 5 | Prep space & supplies, do practice run with friends | Days 10–18 |
| 6 | Soft launch — 1–2 free/discounted events, capture photos + testimonials | Days 15–22 |
| 7 | Marketing push — Instagram, Facebook groups, Airbnb Experiences | Days 20–30 |
| 8 | Review, optimize, scale | Month 2+ |

### Immediate Next Actions
- [x] Host website on Netlify (auto-deploys from GitHub)
- [x] Register thehomemadepantryco.com domain (Namecheap)
- [x] Register LLC with Texas Secretary of State
- [ ] Open business bank account
- [ ] Set up Stripe for deposit payments
- [ ] Set up Instagram account with 9 posts before going public
- [ ] Create Google Business Profile

---

## 🧠 Technical Notes for Claude Code Sessions

### How to approach tasks with me
- Start with a plain-language explanation of what we're about to do and why
- Break multi-step tasks into clearly labeled stages
- After completing something, briefly explain what was built and how it fits the bigger picture
- When writing code, add comments explaining what each section does
- If something could be done multiple ways, briefly explain the tradeoff before choosing

### Preferred working style
- Build real files in the project folder — not sandbox outputs
- Use the brand colors and fonts defined above — never deviate without asking
- Keep the website's existing structure and expand it rather than rebuilding from scratch
- When connecting to external services (HoneyBook, Stripe, etc.) explain what the connection does before building it

### Project folder structure (current)
```
homemade-pantry/
├── CLAUDE.md              ← This file (always read first)
├── website/
│   ├── index.html
│   ├── preview-party.html ← Scrolling memory page from April 2026 preview party
│   └── images/            ← Copy of all photos (here for Netlify — deploy this folder)
├── content/
│   └── instagram-calendar.html
├── docs/
│   ├── brand-concept.html
│   └── launch-plan.docx
└── images/                ← Original photos (40 from April 2026 preview party)
```

---

*Last updated: April 2026 | Built in collaboration with Claude Code*
*Next session: Start by reading this file, then ask what we're working on today.*
