import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('qa-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function autoScrollAndLoad(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });

    // Ensure all images are decoded
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => {
          img.onload = res;
          img.onerror = res;
        });
      })
    );
  });
  await new Promise(r => setTimeout(r, 800));
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set Desktop 1440x900
  console.log('Navigating to http://localhost:5173 (Desktop 1440)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 25000 });
  await autoScrollAndLoad(page);

  console.log('Capturing desktop full page...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-full.png'), fullPage: true });

  const chapters = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'site-header', 'site-footer'];
  
  // Hide sticky header during chapter section captures so it doesn't obstruct headers
  await page.evaluate(() => {
    const h = document.getElementById('site-header');
    if (h) h.style.display = 'none';
  });

  for (const id of chapters) {
    if (id === 'site-header') continue;
    const el = await page.$(`#${id}`);
    if (el) {
      await el.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${id}.png`) });
      console.log(`Captured clean desktop #${id}`);
    }
  }

  // Restore header and capture header
  await page.evaluate(() => {
    const h = document.getElementById('site-header');
    if (h) h.style.display = '';
  });
  const headerEl = await page.$('#site-header');
  if (headerEl) {
    await headerEl.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-site-header.png') });
    console.log('Captured desktop #site-header');
  }

  // Mobile 390x844
  console.log('Navigating for Mobile 390x844...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 25000 });
  await autoScrollAndLoad(page);

  console.log('Capturing mobile full page...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-full.png'), fullPage: true });

  await page.evaluate(() => {
    const h = document.getElementById('site-header');
    if (h) h.style.display = 'none';
  });

  for (const id of chapters) {
    if (id === 'site-header') continue;
    const el = await page.$(`#${id}`);
    if (el) {
      await el.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${id}.png`) });
      console.log(`Captured clean mobile #${id}`);
    }
  }

  await browser.close();
  console.log('All QA screenshots re-captured with zero obstruction!');
}

capture().catch(err => {
  console.error('QA capture error:', err);
  process.exit(1);
});
