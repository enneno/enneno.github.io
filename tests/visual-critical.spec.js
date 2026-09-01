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
