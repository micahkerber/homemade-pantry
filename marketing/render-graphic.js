// Renders launch-graphic.html to a 1080x1080 PNG using headless Chromium.
// Run: node marketing/render-graphic.js
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const htmlPath = 'file://' + path.resolve(__dirname, 'launch-graphic.html').replace(/\\/g, '/');
  const outPath = path.resolve(__dirname, 'launch-graphic.png');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);       // wait for web fonts
  await new Promise(r => setTimeout(r, 400));             // small settle
  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
  await browser.close();
  console.log('Rendered', outPath);
})();
