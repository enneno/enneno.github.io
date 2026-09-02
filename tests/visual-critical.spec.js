const { test, expect } = require('playwright/test');

const criticalViews = [
    {
        name: 'home-desktop',
        path: '/',
        viewport: { width: 1440, height: 1000 },
        ready: '#hero'
    },
    {
        name: 'home-mobile',
        path: '/',
        viewport: { width: 390, height: 844 },
        ready: '#hero'
    },
    {
        name: 'booking-mobile',
        path: '/foglalas/',
        viewport: { width: 390, height: 844 },
        ready: '#foglalas-urlap'
    },
    {
        name: 'admin-desktop',
        path: '/admin/',
        viewport: { width: 1440, height: 1000 },
        ready: '#admin-bejelentkezes-panel'
    },
    {
        name: 'admin-mobile',
        path: '/admin/',
        viewport: { width: 390, height: 844 },
        ready: '#admin-bejelentkezes-panel'
    }
];

async function waitForImages(page) {
    await page.evaluate(async () => {
        const images = Array.from(document.images);
        images.forEach(image => { image.loading = 'eager'; });
        await Promise.all(images.map(image => new Promise(resolve => {
            if (image.complete) {
                image.decode?.().catch(() => {}).finally(resolve);
                return;
            }
            const finish = () => resolve();
            image.addEventListener('load', finish, { once: true });
            image.addEventListener('error', finish, { once: true });
            window.setTimeout(finish, 3000);
        })));
    });
}

test.describe('kritikus vizuális nézetek', () => {
    test('home-mobile hero image and gallery label form one card without duplicate account promotion', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('body')).not.toHaveClass(/tartalom-toltes/);

        const metrics = await page.evaluate(() => {
            const card = document.querySelector('.hero-visual');
            const image = card.querySelector('.hero-kep');
            const label = card.querySelector('.hero-visual-cimke');
            const cardRect = card.getBoundingClientRect();
            const imageRect = image.getBoundingClientRect();
            const labelRect = label.getBoundingClientRect();
            const cardStyle = getComputedStyle(card);
            const labelStyle = getComputedStyle(label);
            return {
                cardRadius: Number.parseFloat(cardStyle.borderTopLeftRadius),
                cardBorderWidth: Number.parseFloat(cardStyle.borderTopWidth),
                labelTopRadius: Number.parseFloat(labelStyle.borderTopLeftRadius),
                labelBottomRadius: Number.parseFloat(labelStyle.borderBottomLeftRadius),
                labelTopBorderWidth: Number.parseFloat(labelStyle.borderTopWidth),
                imageAlignedToCard: Math.abs(imageRect.left - cardRect.left) <= 1,
                labelAlignedToCard: Math.abs(labelRect.left - cardRect.left) <= 1
                    && Math.abs(labelRect.right - cardRect.right) <= 1,
                labelClosesCard: Math.abs(labelRect.bottom - cardRect.bottom) <= 1,
                accountRecommendationAbsent: !document.querySelector('#fiok-ajanlo'),
                overflow: document.documentElement.scrollWidth - window.innerWidth
            };
        });

        expect(metrics.cardRadius).toBe(22);
        expect(metrics.cardBorderWidth).toBe(1);
        expect(metrics.labelTopRadius).toBe(0);
        expect(metrics.labelBottomRadius).toBe(0);
        expect(metrics.labelTopBorderWidth).toBe(1);
        expect(metrics.imageAlignedToCard).toBe(true);
        expect(metrics.labelAlignedToCard).toBe(true);
        expect(metrics.labelClosesCard).toBe(true);
        expect(metrics.accountRecommendationAbsent).toBe(true);
        expect(metrics.overflow).toBeLessThanOrEqual(1);
    });

    for (const view of criticalViews) {
        test(view.name, async ({ page }, testInfo) => {
            const pageErrors = [];
            page.on('pageerror', error => pageErrors.push(error.message));

            await page.setViewportSize(view.viewport);
            await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });

            const response = await page.goto(view.path, { waitUntil: 'domcontentloaded' });
            expect(response, `${view.path} nem adott választ`).not.toBeNull();
            expect(response.status()).toBeLessThan(400);
            await expect(page.locator(view.ready)).toBeVisible();
            await expect(page.locator('body')).not.toHaveClass(/tartalom-toltes/);
            await page.evaluate(() => document.fonts.ready);
            await waitForImages(page);

            const screenshotPath = testInfo.outputPath(`${view.name}.png`);
            await page.screenshot({
                path: screenshotPath,
                fullPage: true,
                caret: 'hide'
            });
            await testInfo.attach(`${view.name} screenshot`, {
                path: screenshotPath,
                contentType: 'image/png'
            });

            expect(pageErrors).toEqual([]);
        });
    }
});
