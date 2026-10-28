import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:8118';
const evidence = path.resolve('.impeccable/review/sticky-colors-20261028');
await fs.mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.LUMI_BROWSER_EXECUTABLE, headless: true });
const report = { views: [], palettes: [] };
const luminance = rgb => {
  const channels = rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map(x => x / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};
const contrast = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width < 640 ? 844 : 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/?szin=malyva', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img[src]').forEach(image => { image.loading = 'eager'; });
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img[src]')].map(image => image.decode()));
    });
    const geometry = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, width: innerWidth, heroBottom: document.querySelector('.hero-opening').getBoundingClientRect().bottom, viewport: innerHeight, next: document.querySelector('.hero-opening').nextElementSibling.id }));
    assert.ok(geometry.scroll <= width, 'Palette controls overflow at ' + width);
    assert.ok(Math.abs(geometry.heroBottom - geometry.viewport) <= 2, 'Opening viewport no longer fits');
    assert.equal(geometry.next, 'szofi');
    for (const palette of ['malyva', 'terrakotta', 'zsalya']) {
      await page.locator('.palette-choice[data-palette="' + palette + '"]').click();
      assert.equal(await page.locator('html').getAttribute('data-palette'), palette);
      assert.equal(await page.locator('.palette-choice[aria-pressed="true"]').count(), 1);
      const colors = await page.evaluate(() => {
        const style = selector => getComputedStyle(document.querySelector(selector));
        return { canvas: style('html').backgroundColor, ink: style('body').color, action: style('.invitation .action').backgroundColor, actionText: style('.invitation .action').color, about: style('.about-band').backgroundColor, title: style('.about-copy h2').color, footer: style('.site-foot').backgroundColor, footerText: style('.site-foot').color };
      });
      const ratios = { body: contrast(colors.ink, colors.canvas), action: contrast(colors.actionText, colors.action), heading: contrast(colors.title, colors.about), footer: contrast(colors.footerText, colors.footer) };
      for (const [role, ratio] of Object.entries(ratios)) assert.ok(ratio >= 4.5, palette + ' ' + role + ' contrast ' + ratio);
      if (width === 1440) report.palettes.push({ palette, colors, contrast: ratios });
      if (width === 1440 || width === 390 && palette === 'malyva') {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(evidence, palette + '-' + width + '-first.png') });
      }
    }
    if (width === 390 || width === 1440) {
      await page.locator('.palette-choice[data-palette="malyva"]').click();
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: path.join(evidence, 'malyva-' + width + '.png'), fullPage: true });
    }
    await page.evaluate(() => scrollTo(0, 1200));
    const header = await page.locator('.site-head').evaluate(element => ({ top: element.getBoundingClientRect().top, bottom: element.getBoundingClientRect().bottom, position: getComputedStyle(element).position }));
    assert.ok(['sticky', 'fixed'].includes(header.position));
    assert.ok(Math.abs(header.top) <= 1, 'Header scrolled away at ' + width);
    if (width < 900) await page.getByLabel('Menü megnyitása').click();
    const nav = page.getByRole('navigation', { name: width < 900 ? 'Mobil navigáció' : 'Fő navigáció', exact: true });
    await nav.getByRole('link', { name: 'Szofi', exact: true }).click();
    const anchor = await page.evaluate(() => ({ header: document.querySelector('.site-head').getBoundingClientRect().bottom, target: document.querySelector('#szofi').getBoundingClientRect().top }));
    assert.ok(anchor.target >= anchor.header - 1, 'Header hides anchor destination at ' + width);
    if (width === 390 || width === 1440) await page.screenshot({ path: path.join(evidence, 'sticky-' + width + '.png') });
    await page.locator('.site-foot').scrollIntoViewIfNeeded();
    assert.ok(Math.abs(await page.locator('.site-head').evaluate(element => element.getBoundingClientRect().top)) <= 1);
    assert.deepEqual(errors, []);
    report.views.push({ width, overflow: false, stickyHeader: true, visibleAnchor: true, paletteControls: true });
    await context.close();
  }
  const page = await browser.newPage();
  await page.goto(base + '/?szin=zsalya', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Teljes árlista', exact: true }).click();
  assert.equal(await page.locator('html').getAttribute('data-palette'), 'zsalya');
  assert.ok(page.url().includes('szin=zsalya'));
  await page.close();
  await fs.writeFile(path.join(evidence, 'checks.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ passed: true, views: report.views, paletteContrast: report.palettes.map(p => ({ name: p.palette, contrast: p.contrast })) }));
} finally { await browser.close(); }
