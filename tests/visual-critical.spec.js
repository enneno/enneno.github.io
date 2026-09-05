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
        name: 'booking-desktop',
        path: '/foglalas/',
        viewport: { width: 1440, height: 1000 },
        ready: '#foglalas-azonosito'
    },
    {
        name: 'account-desktop',
        path: '/fiokom/',
        viewport: { width: 1440, height: 1000 },
        ready: '#fiok-auth-panel'
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

        expect(metrics.cardRadius).toBe(4);
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

    test('homepage layout uses one gutter system and keeps the hero inside its section', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('body')).not.toHaveClass(/tartalom-toltes/);

        const desktop = await page.evaluate(() => {
            const hero = document.querySelector('#hero');
            const visual = hero.querySelector('.hero-visual');
            const intro = document.querySelector('.bemutatkozas-belso');
            const introText = intro.querySelector('.bemutatkozas-szoveg');
            const introParagraph = introText.querySelector('p');
            const services = document.querySelector('.szolgaltatasok-belso');
            const gallery = document.querySelector('.galeria-showcase-fej');
            const heroRect = hero.getBoundingClientRect();
            const visualRect = visual.getBoundingClientRect();
            const introRect = intro.getBoundingClientRect();
            const introTextRect = introText.getBoundingClientRect();
            const paragraphRect = introParagraph.getBoundingClientRect();
            const introImage = intro.querySelector('.bemutatkozas-kep img');

            return {
                heroWidth: Math.round(heroRect.width),
                heroRadius: Number.parseFloat(getComputedStyle(hero).borderRadius),
                visualInsideHero: visualRect.top >= heroRect.top - 1
                    && visualRect.bottom <= heroRect.bottom + 1,
                introIsFullWidth: Math.round(introRect.width) === window.innerWidth,
                introMatchesTextHeight: Math.abs(introRect.height - introTextRect.height) <= 1,
                introImageShowsFullFrame: getComputedStyle(introImage).objectFit === 'contain',
                introTextHasBreathingRoom: introTextRect.left > introRect.left + 40,
                sharedContentLeftEdges: Math.abs(
                    services.getBoundingClientRect().left - gallery.getBoundingClientRect().left
                ) <= 1,
                introParagraphIsReadable: paragraphRect.width <= 760,
                documentWidth: document.documentElement.scrollWidth
            };
        });

        expect(desktop.heroWidth).toBe(1440);
        expect(desktop.heroRadius).toBe(0);
        expect(desktop.visualInsideHero).toBe(true);
        expect(desktop.introIsFullWidth).toBe(true);
        expect(desktop.introMatchesTextHeight).toBe(true);
        expect(desktop.introImageShowsFullFrame).toBe(true);
        expect(desktop.introTextHasBreathingRoom).toBe(true);
        expect(desktop.sharedContentLeftEdges).toBe(true);
        expect(desktop.introParagraphIsReadable).toBe(true);
        expect(desktop.documentWidth).toBe(1440);

        await page.setViewportSize({ width: 390, height: 844 });
        const mobile = await page.evaluate(() => {
            const hero = document.querySelector('#hero');
            const hamburger = document.querySelector('.hamburger');
            const lines = Array.from(hamburger.querySelectorAll('span'));
            const introImage = document.querySelector('#bemutatkozas .bemutatkozas-kep img');
            return {
                heroBackground: getComputedStyle(hero).backgroundColor,
                surfaceToken: getComputedStyle(document.documentElement).getPropertyValue('--ui-surface').trim(),
                hamburgerColor: getComputedStyle(hamburger).color,
                inkToken: getComputedStyle(document.documentElement).getPropertyValue('--ui-off-black').trim(),
                introImageShowsFullFrame: getComputedStyle(introImage).objectFit === 'contain',
                linesVisible: lines.every((line) => {
                    const rect = line.getBoundingClientRect();
                    return rect.width >= 18 && rect.height >= 1;
                }),
                documentWidth: document.documentElement.scrollWidth
            };
        });

        expect(mobile.heroBackground).toBe('rgb(242, 233, 235)');
        expect(mobile.surfaceToken).toBe('#f2e9eb');
        expect(mobile.hamburgerColor).toBe('rgb(49, 56, 63)');
        expect(mobile.inkToken).toBe('#31383f');
        expect(mobile.introImageShowsFullFrame).toBe(true);
        expect(mobile.linesVisible).toBe(true);
        expect(mobile.documentWidth).toBe(390);
    });

    test('mobile service pages keep their content inside the viewport', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/korom-diszites-nail-art-tatabanya/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('body')).not.toHaveClass(/tartalom-toltes/);

        const metrics = await page.evaluate(() => {
            const main = document.querySelector('.seo-szolgaltatas-oldal');
            const hero = document.querySelector('.seo-szolgaltatas-hero');
            const mainRect = main.getBoundingClientRect();
            const heroRect = hero.getBoundingClientRect();
            const contentFits = Array.from(main.querySelectorAll('h1, h2, h3, p, a'))
                .every(element => {
                    const rect = element.getBoundingClientRect();
                    return rect.left >= -1 && rect.right <= window.innerWidth + 1;
                });
            return {
                documentWidth: document.documentElement.scrollWidth,
                mainLeft: Math.round(mainRect.left),
                mainRight: Math.round(mainRect.right),
                heroLeft: Math.round(heroRect.left),
                heroRight: Math.round(heroRect.right),
                contentFits
            };
        });

        expect(metrics.documentWidth).toBe(390);
        expect(metrics.mainLeft).toBe(16);
        expect(metrics.mainRight).toBe(374);
        expect(metrics.heroLeft).toBe(0);
        expect(metrics.heroRight).toBe(390);
        expect(metrics.contentFits).toBe(true);
    });

    test('mobile homepage CTA stays readable and footer stays compact', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('body')).not.toHaveClass(/tartalom-toltes/);

        const metrics = await page.evaluate(() => {
            const cta = document.querySelector('.szolgaltatas-zaras .gomb');
            const bookingSection = document.querySelector('#kapcsolat');
            const footer = document.querySelector('.site-footer');
            const footerLogo = document.querySelector('.footer-logo');
            const footerContact = document.querySelector('.footer-kapcsolat a');
            const styles = getComputedStyle(cta);
            return {
                ctaText: cta.textContent.trim(),
                ctaColor: styles.color,
                ctaBackground: styles.backgroundColor,
                bookingSectionBackground: getComputedStyle(bookingSection).backgroundColor,
                footerHeight: footer.getBoundingClientRect().height,
                footerLogoWhiteSpace: getComputedStyle(footerLogo).whiteSpace,
                footerContactColor: getComputedStyle(footerContact).color
            };
        });

        expect(metrics.ctaText).not.toBe('');
        expect(metrics.ctaBackground).toBe('rgb(255, 209, 220)');
        expect(metrics.bookingSectionBackground).toBe('rgb(255, 209, 220)');
        expect(metrics.ctaColor).not.toBe(metrics.ctaBackground);
        expect(metrics.footerHeight).toBeLessThan(280);
        expect(metrics.footerLogoWhiteSpace).toBe('nowrap');
        expect(metrics.footerContactColor).toBe('rgb(242, 233, 235)');
    });

    test('desktop account and booking verification retain desktop proportions', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.goto('/fiokom/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#fiok-auth-panel')).toBeVisible();

        const account = await page.locator('#fiok-auth-panel').evaluate((panel) => ({
            columns: getComputedStyle(panel).gridTemplateColumns.split(' ').filter(Boolean).length,
            width: Math.round(panel.getBoundingClientRect().width),
            documentWidth: document.documentElement.scrollWidth
        }));
        expect(account.columns).toBe(2);
        expect(account.width).toBeGreaterThanOrEqual(1100);
        expect(account.documentWidth).toBe(1440);

        await page.goto('/foglalas/', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#foglalas-elerhetoseg');
        const booking = await page.evaluate(() => {
            const section = document.querySelector('#foglalas-ellenorzes');
            const input = document.querySelector('#foglalas-elerhetoseg');
            const card = input.closest('.foglalas-kezelo-kartya');
            const inputStyle = getComputedStyle(input);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = inputStyle.font;
            const placeholderWidth = context.measureText(input.placeholder).width;
            return {
                sectionBackground: getComputedStyle(section).backgroundColor,
                cardBackground: getComputedStyle(card).backgroundColor,
                surfacesAreDistinct: getComputedStyle(section).backgroundColor
                    !== getComputedStyle(card).backgroundColor,
                inputWidth: input.clientWidth,
                placeholderFits: placeholderWidth + 32 <= input.clientWidth,
                documentWidth: document.documentElement.scrollWidth
            };
        });
        expect(booking.cardBackground).not.toBe('rgb(242, 233, 235)');
        expect(booking.surfacesAreDistinct).toBe(true);
        expect(booking.inputWidth).toBeGreaterThanOrEqual(280);
        expect(booking.placeholderFits).toBe(true);
        expect(booking.documentWidth).toBe(1440);
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
