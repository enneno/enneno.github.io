const { test, expect } = require('playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.beforeEach(async ({ page }) => {
  await page.route('https://*.supabase.co/rest/**', route => route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('compact shared footer keeps all ten destinations and usable phone targets', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  for (const [width, maxHeight] of [[320, 415], [390, 295], [1440, 160]]) {
    await page.setViewportSize({ width, height: 844 });
    const footer = page.locator('.site-footer');
    await expect(footer.locator('.footer-navigacio a')).toHaveCount(10);
    const metrics = await footer.evaluate(el => ({
      height: el.getBoundingClientRect().height,
      overflow: document.documentElement.scrollWidth - innerWidth,
      targets: [...el.querySelectorAll('.footer-navigacio a, .social-gomb, .footer-kapcsolat a:not([hidden])')].map(a => a.getBoundingClientRect().height)
    }));
    expect(metrics.height, `${width}px`).toBeLessThanOrEqual(maxHeight);
    expect(metrics.overflow).toBeLessThanOrEqual(1);
    expect(Math.min(...metrics.targets)).toBeGreaterThanOrEqual(width < 900 ? 44 : 30);
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await page.screenshot({ path: `output/playwright/footer-compact-${width}.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const report = await new AxeBuilder({ page }).include('.site-footer').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(report.violations).toEqual([]);
  // Same owning footer on a representative inner page, no booking submission.
  await page.goto('/arlista/');
  await expect(page.locator('.footer-navigacio a')).toHaveCount(10);
  expect((await page.locator('.site-footer').boundingBox()).height).toBeLessThanOrEqual(295);
});

test('homepage services use four inline icons with and without JavaScript', async ({ page, browser }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.szolgaltatas-kartya-ikon')).toHaveCount(4);
  await page.locator('#studio-tab-services').click();
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const rows = await page.locator('.szolgaltatas-kartya').evaluateAll(elements => elements.map(el => ({
      image: getComputedStyle(el, '::before').backgroundImage,
      inlinePhoto: el.style.getPropertyValue('--service-image'),
      iconHidden: el.querySelector('svg').getAttribute('aria-hidden'),
      left: el.getBoundingClientRect().left,
      right: el.getBoundingClientRect().right,
      width: innerWidth
    })));
    for (const row of rows) {
      expect(row.image).toBe('none');
      expect(row.inlinePhoto).toBe('');
      expect(row.iconHidden).toBe('true');
      expect(row.left).toBeGreaterThanOrEqual(0);
      expect(row.right).toBeLessThanOrEqual(row.width);
    }
    await page.screenshot({ path: `output/playwright/services-icons-${width}.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const report = await new AxeBuilder({ page }).include('#szolgaltatasok').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(report.violations).toEqual([]);
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await context.newPage();
  await staticPage.goto('http://127.0.0.1:8101/');
  await expect(staticPage.locator('.szolgaltatas-kartya-ikon')).toHaveCount(4);
  await expect(staticPage.locator('.footer-navigacio a')).toHaveCount(10);
  await context.close();
});
