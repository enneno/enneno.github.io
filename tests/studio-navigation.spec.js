const { test, expect } = require('playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

// Public read-only navigation: no authentication or booking/database mutation.
test.beforeEach(async ({ page }) => {
  await page.route('https://*.supabase.co/rest/**', route => route.abort());
});

test('studio tabs support keyboard, deep links, mobile menu and readable alternate views', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#bemutatkozas');
  await expect(page.getByRole('tab', { name: 'Szofi', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#bemutatkozas')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Lumi Nails');
  await page.getByRole('tab', { name: 'Szofi', exact: true }).focus();
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Munkák', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#szolgaltatasok')).toBeVisible();
  await expect(page.locator('#hero')).toBeHidden();
  await page.getByRole('button', { name: 'Menü megnyitása' }).click();
  await page.locator('#mobil-nav a[href="/#szolgaltatasok"]').click();
  await expect(page.locator('#mobil-nav')).not.toHaveClass(/open/);
  await expect(page.locator('#szolgaltatasok')).toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await documentFonts(page);
  for (const name of ['Szolgáltatások', 'Szofi', 'Munkák']) {
    await page.getByRole('tab', { name, exact: true }).click();
    const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(report.violations, `accessibility: ${name}`).toEqual([]);
  }
});

async function documentFonts(page) {
  await page.evaluate(() => document.fonts.ready);
}

test('genuine images switch safely and a failed image retains the last good photo', async ({ page }) => {
  await page.goto('/');
  const image = page.locator('#hero .hero-kep');
  const original = await image.getAttribute('src');
  const buttons = page.locator('.studio-thumbnail');
  await expect(buttons).toHaveCount(5);
  await buttons.first().click();
  await expect(buttons.first()).toHaveAttribute('aria-pressed', 'true');
  await expect(image).not.toHaveAttribute('src', original);
  const previous = await image.getAttribute('src');
  await page.evaluate(() => document.querySelectorAll('.studio-thumbnail img')[1].dataset.fullSrc = '/not-a-real-image.jpg');
  await buttons.nth(1).click();
  await expect(page.locator('[data-studio-image-status]')).toContainText('nem tölthető be');
  await expect(image).toHaveAttribute('src', previous);
  await expect(page.locator('#hero')).not.toHaveAttribute('aria-busy', 'true');
  // Rapid selection must finish on the latest requested image, not an older decode.
  await buttons.nth(2).click();
  await buttons.nth(4).click();
  await expect(buttons.nth(4)).toHaveAttribute('aria-pressed', 'true');
  await expect(image).toHaveAttribute('alt', await buttons.nth(4).locator('img').getAttribute('alt'));
});

test('studio has no viewport overflow and the phone opening photograph is uncut 16:9', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 375, 390, 414, 768, 1024, 1280, 1440, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of ['Munkák', 'Szolgáltatások', 'Szofi']) {
      await page.getByRole('tab', { name, exact: true }).click();
      const metrics = await page.evaluate(() => {
        const tabs = document.querySelector('.studio-view-tabs').getBoundingClientRect();
        const visual = document.querySelector('.hero-visual').getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          tabsInside: tabs.left >= 0 && tabs.right <= innerWidth + 1,
          ratio: visual.width / visual.height,
          fit: getComputedStyle(document.querySelector('.hero-kep')).objectFit
        };
      });
      expect(metrics.overflow, `${name}, ${width}`).toBeLessThanOrEqual(1);
      expect(metrics.tabsInside, `${name}, ${width}`).toBe(true);
      if (width <= 768 && name === 'Munkák') {
        expect(metrics.ratio).toBeCloseTo(16 / 9, 2);
        expect(metrics.fit).toBe('contain');
      }
    }
  }
});

test('without JavaScript factual panels, photos and every public footer destination remain available', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:8101/');
  for (const selector of ['#hero', '#szolgaltatasok', '#bemutatkozas']) await expect(page.locator(selector)).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Lumi Nails');
  await expect(page.locator('.galeria-atvezeto-kepek > img')).toHaveCount(5);
  expect((await page.locator('#galeria-atvezeto').boundingBox()).width).toBeGreaterThan(300);
  for (const route of ['/arlista/', '/galeria/', '/foglalas/', '/fiokom/', '/adatkezeles/', '/mukorom-epites-toltes/', '/gel-lakk-tatabanya/', '/korom-diszites-nail-art-tatabanya/', '/manikur-tatabanya/']) {
    await expect(page.locator(`.footer-navigacio a[href="${route}"]`)).toBeVisible();
  }
  await context.close();
});
