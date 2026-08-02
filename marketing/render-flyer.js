// Renders print-flyer.html to a print-ready Letter PDF + a high-res PNG preview.
// Run: node marketing/render-flyer.js   (after `npm install` in this folder)
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const html = 'file://' + path.resolve(__dirname, 'print-flyer.html').replace(/\\/g, '/');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 400));

  // Print-ready PDF — exact US Letter size, backgrounds on, no printer margins
  await page.pdf({
    path: path.resolve(__dirname, 'print-flyer.pdf'),
    format: 'Letter',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  // High-res PNG preview (8.5x11 at ~288 DPI) for sharing / on-screen viewing
  await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 3 });
  await page.goto(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({
    path: path.resolve(__dirname, 'print-flyer.png'),
    clip: { x: 0, y: 0, width: 816, height: 1056 },
  });

  await browser.close();
  console.log('Wrote print-flyer.pdf and print-flyer.png');
})();
