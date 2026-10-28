import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const target = 'http://127.0.0.1:8118';
const evidence = path.resolve('.impeccable/review/public-preview-20261028');
await fs.mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.LUMI_BROWSER_EXECUTABLE, headless: true });
const report = { viewports: [], interactions: [], screenshots: [] };
try {
  for (const width of process.argv.includes('--final-only') ? [] : [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width < 640 ? 844 : 900 }, reducedMotion: 'reduce' });
    const external = [];
    context.on('request', request => { if (!request.url().startsWith(target)) external.push(request.url()); });
    for (const variant of ['a', 'b', 'c']) {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${target}/${variant}/`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
        await document.fonts.ready;
        await Promise.all([...document.images].filter(image => image.getAttribute('src')).map(image => image.decode().catch(() => {})));
      });
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, width: document.documentElement.scrollWidth, broken: [...document.images].filter(x => x.getAttribute('src') && !x.naturalWidth).map(x => x.src) }));
      assert.ok(dimensions.width <= dimensions.viewport, `Overflow: ${variant} at ${width}, ${dimensions.width}`);
      assert.deepEqual(dimensions.broken, [], `Broken media: ${variant}`);
      assert.deepEqual(errors, [], `Script errors: ${variant}`);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex,nofollow');
      assert.ok(await page.getByRole('link', { name: 'Időpontot foglalok', exact: true }).count());
      report.viewports.push({ variant, width, overflow: false, brokenImages: 0, scriptErrors: 0 });
      if ([390, 1440].includes(width)) {
        const file = `${variant}-${width}.png`;
        await page.screenshot({ path: path.join(evidence, file), fullPage: true });
        await page.screenshot({ path: path.join(evidence, `${variant}-${width}-first.png`) });
        report.screenshots.push(file, `${variant}-${width}-first.png`);
      }
      if (width === 390) {
        await page.getByLabel('Menü megnyitása').click();
        assert.ok(await page.getByRole('navigation', { name: 'Mobil navigáció' }).isVisible());
        await page.getByRole('navigation', { name: 'Mobil navigáció' }).getByRole('link', { name: 'Szofi', exact: true }).click();
        assert.equal(await page.locator('.mobile-menu').getAttribute('open'), null);
        report.interactions.push(variant + ': mobile menu open, navigation and close');
        const photo = page.locator('[data-photo]').first();
        await photo.click();
        assert.ok(await page.getByRole('dialog').isVisible());
        await page.keyboard.press('Escape');
        assert.equal(await page.getByRole('dialog').isVisible(), false);
        assert.ok(await photo.evaluate(element => element === document.activeElement));
        report.interactions.push(variant + ': image enlargement, Escape, restored focus');
        if (variant === 'b') {
          await page.getByRole('button', { name: 'Következő munka', exact: true }).click();
          assert.ok(await page.locator('.film-rail').evaluate(element => element.scrollLeft > 0));
          await page.locator('.film-rail').focus();
          await page.keyboard.press('ArrowRight');
          report.interactions.push('b: gallery arrow button and keyboard');
        }
        if (variant === 'c') {
          await page.getByRole('button', { name: 'Gél Lakk', exact: true }).click();
          assert.ok(await page.locator('[data-service-panel="2"]').isVisible());
          assert.equal(await page.locator('.service-detail:visible').count(), 1);
          assert.match(await page.locator('[data-service-panel="2"]').innerText(), /5500 Ft/);
          assert.equal(await page.locator('[data-service="2"]').getAttribute('aria-pressed'), 'true');
          report.interactions.push('c: service selection, current prices, single active panel');
        }
      }
      await page.close();
    }
    assert.deepEqual(external, [], 'Preview fetched an external resource or API');
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(target + '/arlista/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.price-lines > div').count(), 19);
  const content = await fs.readFile('adatok.json', 'utf8');
  const rows = JSON.parse(content).services;
  const actual = (await page.locator('.price-lines').allTextContents()).join('\n');
  for (const row of rows) assert.ok(actual.includes(row.name) && actual.includes(row.price_text), 'Missing current price: ' + row.name);
  report.interactions.push('all 19 current service names and prices preserved');
  await page.goto(target, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.concept').count(), 3);
  await page.evaluate(async () => { await document.fonts.ready; });
  for (const frame of page.frames().filter(frame => frame !== page.mainFrame())) {
    await frame.waitForLoadState('load');
    await frame.evaluate(async () => { document.querySelectorAll('img[src]').forEach(image => { image.loading = 'eager'; }); await document.fonts.ready; await Promise.all([...document.querySelectorAll('img[src]')].map(image => image.decode())); });
  }
  await page.screenshot({ path: path.join(evidence, 'picker-desktop.png'), fullPage: true });
  report.screenshots.push('picker-desktop.png');
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  report.interactions.push('picker links and mobile overflow');
  const response = await page.request.get(target + '/supabase/migrations/20261028160120_static_publication.sql');
  assert.equal(response.status(), 404);
  await context.close();
  await fs.writeFile(path.join(evidence, 'checks.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ passed: true, responsiveViews: report.viewports.length, interactions: report.interactions, evidence }));
} finally { await browser.close(); }
