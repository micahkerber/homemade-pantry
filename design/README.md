# Design artifacts

Reference designs and prototypes — not live code, not deployed. Parked here for later.

## `homemade-pantry-host-dashboard-prototype.zip`

A **high-fidelity design-handoff prototype of a back-of-house Host Dashboard** — the private admin screen Jaime & Brittany would use (never customer-facing). Created June 2026 with Claude (browser). It's a working React-18-via-Babel-in-browser mockup with **mock data only** — no database, no login, no connection to real bookings.

**Status: parked. Revisit at a later date.** (Decided 2026-06-12.)

**12 screens included:** Overview, Bookings & Requests, Calendar, Evening detail drawer, Guests, Revenue, Prep & Take-home checklists, Menus, Messages, Reviews, Settings.

**To view it:** unzip, then open `design_handoff_host_dashboard/Homemade Pantry Dashboard.html` in a browser (it needs to be served from a local web server, or run with a `<base>` tag, because it loads sibling `.jsx`/`.js` files). The `README.md` inside the zip is an excellent, thorough spec of every view, the design tokens, the interactions, and the backend data shapes.

### When we come back to it — open questions to resolve first
1. **Price mismatch:** the prototype assumes **$145/seat**; the live site and CLAUDE.md say **$110/person**. Reconcile before building anything real.
2. **Build-vs-buy decision (not yet made).** Three paths were discussed:
   - **A — Blueprint only:** use it as the spec for configuring HoneyBook/Calendly, build nothing. Lowest effort.
   - **B — Slim real dashboard:** make ~4 views real (Overview, Calendar, Prep, Revenue) reading from one Google Sheet/Airtable the hosts control; bookings still flow through the existing Netlify form. Medium effort, high value. Doubles as a learn-to-build full-stack portfolio piece.
   - **C — Full custom app:** all 12 views + database + auth + payments, replacing bought tools. Startup-grade effort + permanent maintenance — likely over-engineered for a two-host business.
3. **Suggested additions** specific to this business (missing from the prototype): deposit/balance tracking (50% deposit model + refund-window status), an allergy/dietary safety panel per evening, an aggregated weekly shopping/ingredient list, gift-card tracking, booking-source tie-in to the new GA4 lead data, and travel logistics for guest-home evenings.
