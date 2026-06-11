# Small Business Digital Launch — Playbook

> The repeatable process, extracted from launching The Homemade Pantry (April–June 2026,
> ~8 weeks from first commit to fully operational site). Written for Micah's next
> friend-business project. Copy this file into the new project folder and adapt.

---

## The big picture

Eight weeks, five phases. Each phase produces something real the owner can see.
The golden rule from round one: **don't over-engineer — simple and working beats clever
and complex.** A single HTML file on free hosting outperformed anything fancier we
could have built, because it shipped.

| Phase | Weeks | Output |
|---|---|---|
| 1. Foundation | 1–2 | Project brief, brand identity, offer & pricing, legal basics |
| 2. Website build | 2–3 | Live site on a real domain |
| 3. Make it functional | 3–5 | Working inquiry/order flow with email automation |
| 4. Real content | 4–7 | Real photos, real testimonials, owner-corrected copy |
| 5. Polish & measure | 7–8 | Fast load, analytics, share cards, changelog |

Phases overlap — content gathering (4) starts while functionality (3) is being built.

---

## Phase 1 — Foundation (weeks 1–2)

**Goal: agree on what the business *is* before building anything.**

- [ ] **Write the project brief (CLAUDE.md) first.** This was the single highest-leverage
  move of round one. One file, read at the start of every session, holding: who the owner
  is, what the business is, pricing, brand identity, voice rules, current status, and
  next steps. Keep it updated *every session* — a stale brief quietly poisons future work.
- [ ] **Sit with the owner and capture THEIR vocabulary.** Jaime says "Pillars," never
  "experiences." She says "gather," never "class" or "workshop." Build a words-we-use /
  words-we-avoid list into the brief. The site must sound like the owner, not like a template.
- [ ] **Define the offer and pricing.** What exactly does a customer get, at what price,
  with what rules (minimums, deposits, cancellation policy)? Write it as a table. Expect
  this to change once or twice — that's fine, it lives in one place.
- [ ] **Brand identity:** color palette (with hex codes), 2–3 Google Fonts (free), tagline,
  voice & tone bullets. Lock these into the brief and never deviate without asking.
- [ ] **Logo:** expect iteration. Round one took ~3 concept rounds → 2 finalists → owner's
  choice. Canva worked fine for the owner to participate. Final deliverable: an SVG
  (scales to any size, print-sharp for stickers/packaging).
- [ ] **Legal/admin (owner's track, runs in parallel):** LLC registration, operating
  agreement, business bank account, liability insurance if relevant.

**Decision point:** what *kind* of business is this digitally?
- **Booking/inquiry-based** (Homemade Pantry): the site's job is to get an inquiry form
  submitted. Follow this playbook as-is.
- **E-commerce** (selling products): the site needs a store — different path for Phase 3
  (Shopify/Stripe checkout instead of inquiry forms). Phases 1, 2, 4, 5 still apply.

---

## Phase 2 — Website build (weeks 2–3)

**Goal: a live site on a real domain, even if imperfect.**

- [ ] **One HTML file, no framework.** `website/index.html` with everything inline.
  At small-business scale this is a feature: nothing to break, nothing to update,
  any session can read the whole site.
- [ ] **Standard sections that worked:** Hero → The Experience/Story → What We Offer →
  About the Owner → Pricing → Testimonials → Inquiry Form → FAQ → Footer.
- [ ] **The stack (≈ $12/year total):**
  - GitHub — code lives here, every change recorded forever (free)
  - Netlify — hosting, auto-deploys on every `git push origin master` (free)
  - Namecheap — domain (~$12/yr); point DNS to Netlify so all DNS records live in one place
  - Work directly on `master`, no branches/PRs — right-sized for one builder
- [ ] **Start CHANGELOG.md on day one** (we added it late in round one). Plain-language,
  newest first, business impact before technical detail. The owner can read what's
  happening without asking.
- [ ] Placeholder photos/testimonials are fine at this stage — mark them clearly in the
  brief so they get replaced (round one tracked this as a checklist item).

---

## Phase 3 — Make it functional (weeks 3–5)

**Goal: when a customer acts, things happen automatically.**

- [ ] **Inquiry form → Netlify Forms.** Free, no backend. *Test that submissions actually
  arrive* — round one had a form that looked like it worked but sent nothing (the fix
  was making it POST properly).
- [ ] **Make form choices required** with "Choose…" placeholder options — otherwise
  customers submit default answers and the owner can't trust the data. (Learned in week 8;
  do it on day one this time.)
- [ ] **Two emails per submission:**
  1. Notification to the owner — Netlify dashboard setting, no code.
  2. Branded confirmation to the customer — Netlify Function + Resend (free tier:
     3,000 emails/month). Requires verifying the domain with Resend (DKIM/SPF/DMARC
     DNS records — they live in Netlify DNS).
- [ ] **Send from a real domain address** (hello@thedomain.com) with reply-to pointing at
  the owner's Gmail — professional outbound, replies land where the owner already lives.
- [ ] **API keys go in Netlify environment variables, never in code.** Write the
  troubleshooting playbook into the brief while it's fresh (where to check logs, how to
  rotate keys).

---

## Phase 4 — Real content (weeks 4–7)

**Goal: replace every placeholder with the real thing.**

- [ ] **Host a soft-launch event.** The single best move of round one. One preview party
  produced: all the site's photos, real testimonials, a practice run for the owner, and
  word-of-mouth — in one evening. Budget for 1–2 of these (free/discounted for friends).
- [ ] **Photograph everything** at the event: the space before guests, hands working,
  finished products, the group, the take-home goods.
- [ ] **Rename photos descriptively on import** (`preview-hands-shaping-dough.jpeg`, not
  `IMG_1691.jpeg`) and organize into per-event folders. Round one had to re-do this; doing
  it on import is free.
- [ ] **Real testimonials replace placeholders** — short quotes, first names.
- [ ] **Walk the owner through the live site and apply their corrections.** Round one
  surfaced real factual fixes this way (dried starter vs. live starter, titles, location
  options). The owner reading their own site is QA you can't replicate.

---

## Phase 5 — Polish & measure (weeks 7–8)

**Goal: fast, findable, shareable, measurable. Do these *before* the marketing push.**

- [ ] **Compress all photos** — max 1600px, JPEG quality 80. Round one: 76 MB → 11 MB (85%).
  Strip EXIF metadata too — phone photos embed the GPS coordinates of wherever they were
  taken (often the owner's home). Compress on import this time, not at the end.
- [ ] **Google Analytics 4:** owner creates the property in *the business Google account*
  (record which account in the brief!), paste the G- Measurement ID into a small loader
  script. Fire a `generate_lead` event on form submission so marketing can be measured
  against actual inquiries, not just visits.
- [ ] **Favicon** (render from the logo SVG: 64px transparent for tabs + 180px on a brand
  background for iPhone home screens).
- [ ] **Social share preview (Open Graph) tags** — title, description, and a 1200×630
  photo card. These businesses spread by Instagram and group texts; the preview card is
  the first impression of every shared link. Test at opengraph.xyz.
- [ ] **Verify everything in a browser before pushing** — forms block when they should,
  analytics actually sends, images display right-side up.

---

## Ongoing / beyond week 8 (owner-led, builder-supported)

- [ ] Google Business Profile (hide home address — service area only, if home-based)
- [ ] Instagram: set up with ~9 posts ready before going public; content calendar;
  posting rules (4–5×/week, Reels first, reply to comments fast)
- [ ] Scheduling/payments automation (Calendly + Stripe + HoneyBook or similar) — only
  once inquiry volume justifies it; manual handling is fine early
- [ ] Marketing push only after Phase 5 — measurement must exist before spending effort

---

## Working principles (learned, not theoretical)

1. **The project brief is the product.** Everything else can be rebuilt from a good brief.
   Update it every session.
2. **Real beats perfect.** Real photos from one soft-launch event outperformed any stock
   or staged alternative.
3. **The owner's voice is the brand.** Capture their words; never ship copy they wouldn't say.
4. **Free tiers are enough:** Netlify, Resend, GA4, Google Fonts — total cash cost of
   round one was roughly the domain (~$12/yr).
5. **Git is the safety net.** Work directly on master, push to deploy, and never fear
   destructive changes — every version is recoverable.
6. **Plain-language changelog from day one** — the owner deserves to read what's changing
   without translation.
7. **Measure before marketing.** Analytics installed before the push, or the push can't
   be evaluated.
8. **Privacy check on everything:** EXIF/GPS in photos, home address on business profiles,
   API keys in environment variables.

---

*Extracted June 10, 2026 from The Homemade Pantry project (thehomemadepantryco.com).*
*When the next project starts: copy this file into its folder, then write its CLAUDE.md as Phase 1, step 1.*
