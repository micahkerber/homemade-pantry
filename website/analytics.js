// Google Analytics 4 — site-wide traffic tracking.
//
// ACTIVATION (one-time, ~5 minutes):
//   1. Go to analytics.google.com → Admin → Create Property ("The Homemade Pantry")
//   2. Add a Web data stream for https://www.thehomemadepantryco.com
//   3. Copy the Measurement ID it gives you (looks like "G-AB12CD34EF")
//   4. Paste it below in place of G-XXXXXXXXXX, commit, and push
//
// Until a real ID is pasted in, this file does nothing — safe to deploy as-is.
(function () {
  var GA_ID = 'G-XXXXXXXXXX'; // ← paste your real Measurement ID here

  if (GA_ID === 'G-XXXXXXXXXX') return; // placeholder still in place — skip tracking

  // Load Google's gtag.js library
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  // Standard GA4 bootstrap — records a page_view automatically
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);
})();
