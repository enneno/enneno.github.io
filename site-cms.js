(function () {
    const STORAGE_BUCKET = 'site-media';

    function cmsAlapAdatok() {
        const galeriaElemek = Array.from({ length: 9 }, (_, index) => ({
            kep: `/galeria/optimized/large/image${index}.jpg`,
            kepAlt: `HAIRPORT by Timi gal\u00e9ria ${index + 1}`,
            cim: `Inspir\u00e1ci\u00f3 ${String(index + 1).padStart(2, '0')}`,
            leiras: 'A képet, címet és leírást az adminfelületen cserélheted.'
        }));

        const kiegeszites = {
            seo: {
                fooldalCim: 'HAIRPORT by Timi - Fodrász szalon',
                fooldalLeiras: 'Letisztult fekete-arany fodrász szalon online időpontfoglalással.',
                megosztasiKep: '/kepek/social-preview.jpg'
            },
            marka: {
                nev: 'HAIRPORT by Timi',
                logo: '/kepek/hairport-logo-final-v2.svg',
                logoAlt: 'HAIRPORT by Timi',
                rovidLeiras: 'A hajad elso osztalyon.'
            },
            navigacio: {
                kezdolap: 'Kezdőlap',
                arlista: 'Árlista',
                galeria: 'Galéria',
                foglalas: 'Foglalás',
                fejlecGomb: 'Időpont'
            },
            kapcsolat: {
                cimke: 'Elerhetoseg',
                cim: 'Cim kesobb pontosítva',
                terkepUrl: 'https://www.google.com/maps/search/?api=1&query=fodrasz%20szalon',
                telefon: '+36 70 755 9025',
                telefonLink: '+36707559025',
                email: 'dankutimea6@gmail.com',
                instagram: 'https://www.instagram.com/hairport_by_timi/',
                instagramFelirat: 'Instagram'
            },
            fooldal: {
                hero: {
                    kicker: 'HAIR STUDIO / BY TIMI',
                    cim: 'HAIRPORT by Timi',
                    leiras: 'A hajad elso osztalyon. Szemelyre szabott hajvagas, szin es apolas letisztult kornyezetben.',
                    foglalasGomb: 'Időpontfoglalás',
                    arlistaGomb: 'Árlista',
                    kep: '/kepek/hairport-hero-premium.png',
                    kepAlt: 'HAIRPORT by Timi fodrasz szalon',
                    kepFelirat: 'HAIRPORT',
                    kepAlcim: 'A hajad elso osztalyon.'
                },
                szolgaltatasok: {
                    kicker: 'HAJ / SZ\u00cdN / \u00c1POL\u00c1S',
                    cim: 'Szolgáltatások',
                    kartyak: [
                        { ikon: 'cut', ikonKep: '/kepek/ikonok/hajvagas.svg', ikonAlt: '', cim: 'Hajvagas', leiras: 'Noi, ferfi es gyermek hajvagas konzultacioval.' },
                        { ikon: 'color', ikonKep: '/kepek/ikonok/hajfestes.svg', ikonAlt: '', cim: 'Hajfestes', leiras: 'Tofestes, teljes festes, arnyalas es termeszetes szinfrissites.' },
                        { ikon: 'wave', ikonKep: '/kepek/ikonok/styling.svg', ikonAlt: '', cim: 'Styling', leiras: 'Beszaritas, alkalmi hullamok es elegans finish.' },
                        { ikon: 'care', ikonKep: '/kepek/ikonok/hajapolas.svg', ikonAlt: '', cim: 'Hajapolas', leiras: 'Regeneralo kezelesek es szemelyre szabott apolasi javaslatok.' }
                    ]
                },
                bemutatkozas: {
                    kicker: 'A SZALONR\u00d3L',
                    cim: 'A hajad elso osztalyon',
                    bekezdesek: [
                        'A HAIRPORT by Timi szolgaltatasai a szemelyre szabott hajvagastol a modern szintechnikakon at a professzionalis hajkezelesekig terjednek.',
                        'A szalon pontos cime es bemutatkozasa kesobb kerul fel az oldalra.'
                    ],
                    kep: '/kepek/hairport-detail-premium.png',
                    kepAlt: 'Elegans fodrasz szalon reszlet'
                },
                foglalasAtvezeto: {
                    kicker: 'FOGLAL\u00c1S',
                    cim: 'Online idopontfoglalas',
                    leiras: 'Valassz szolgaltatast, datumot es szabad idopontot.',
                    gombSzoveg: 'Idopontot foglalok'
                }
            },
            arlista: {
                kicker: 'Szolgáltatások',
                cim: 'Árlista',
                leiras: 'A feltuntetett arak tajekoztato jelleguek, a haj hosszatol es mennyisegetol fuggoen valtozhatnak.'
            },
            galeria: {
                kicker: 'Hangulat',
                cim: 'Galéria',
                leiras: 'Szalonfotók, munkák és inspirációk.',
                elemek: galeriaElemek
            },
            foglalas: {
                kicker: 'Online foglal\u00e1s',
                cim: 'Időpontfoglalás',
                leiras: 'Valassz szolgaltatast, datumot es szabad idopontot.',
                nevPlaceholder: 'Teljes neved',
                telefonPlaceholder: 'Telefonszámod',
                emailPlaceholder: 'Email címed',
                megjegyzesPlaceholder: 'Megjegyzés, egyedi kérés (opcionális)',
                lemondasiFeltetel: 'Elfogadom, hogy amennyiben a lefoglalt id\u0151pontra nem tudok elmenni, azt legal\u00e1bb 24 \u00f3r\u00e1val kor\u00e1bban jelzem. 24 \u00f3r\u00e1n bel\u00fcli lemond\u00e1s vagy meg nem jelen\u00e9s eset\u00e9n a k\u00f6vetkez\u0151 alkalommal a kihagyott szolg\u00e1ltat\u00e1s \u00e1r\u00e1nak 100%-\u00e1t sz\u00e1m\u00edtjuk fel.',
                lemondasKapcsolatCimke: 'Lemondás:',
                kuldesGomb: 'Foglalás elküldése',
                lebegoGomb: 'Foglalás',
                popup: {
                    sikeresCim: 'Koszonjuk a foglalast!',
                    sikeresSzoveg: 'Megkaptuk az idopontkeresedet. A reszletekrol visszaigazolo email erkezik.',
                    tartalekCim: 'Foglalas rogzitve',
                    tartalekSzoveg: 'A foglalas bekerult a rendszerbe, az email ertesitest meg ellenorizzuk.',
                    naptarGomb: 'Naptárba mentés',
                    bezarasGomb: 'Bezárás'
                }
            }
        };

        const regiAlap = typeof window.lumiAlapOldalAdatok === 'function'
            ? window.lumiAlapOldalAdatok()
            : {};
        const eredmeny = deepMerge(kiegeszites, regiAlap);
        const regiKartyak = regiAlap.fooldal?.szolgaltatasok?.kartyak || [];
        eredmeny.fooldal.szolgaltatasok.kartyak = kiegeszites.fooldal.szolgaltatasok.kartyak.map((kartya, index) => ({
            ...kartya,
            ...(regiKartyak[index] || {})
        }));
        return eredmeny;
    }

    window.hairportCmsDefaults = cmsAlapAdatok;
    window.HAIRPORT_MEDIA_BUCKET = STORAGE_BUCKET;

    document.addEventListener('DOMContentLoaded', async () => {
        const adatok = await tartalomBetoltese();
        await alapOldalRenderelesereVar();
        window.lumiAdatok = adatok;
        tartalomAlkalmazasa(adatok);
    });

    function alapOldalRenderelesereVar() {
        if (!document.body.classList.contains('tartalom-toltes')) return Promise.resolve();
        return new Promise(resolve => {
            const kezdes = Date.now();
            const ellenorzes = setInterval(() => {
                if (!document.body.classList.contains('tartalom-toltes') || Date.now() - kezdes > 4000) {
                    clearInterval(ellenorzes);
                    resolve();
                }
            }, 40);
        });
    }

    async function tartalomBetoltese() {
        const alap = cmsAlapAdatok();
        const config = window.LUMI_SUPABASE;
        const supabaseLib = window.supabase;
        if (!config?.url || !config?.publishableKey || !supabaseLib?.createClient) return alap;

        try {
            const kliens = supabaseLib.createClient(config.url, config.publishableKey);
            const { data, error } = await kliens
                .from('site_settings')
                .select('value')
                .eq('key', 'site_content')
                .maybeSingle();
            if (error) throw error;
            return deepMerge(alap, data?.value || {});
        } catch (error) {
            console.warn('A weboldal tartalma nem toltheto a Supabase-bol:', error);
            return alap;
        }
    }

    function tartalomAlkalmazasa(adatok) {
        const nav = adatok.navigacio || {};
        textAll('.main-nav a[href="/"], .mobile-drawer a[href="/"]', nav.kezdolap);
        textAll('.main-nav a[href="/arlista/"], .mobile-drawer a[href="/arlista/"]', nav.arlista);
        textAll('.main-nav a[href="/galeria/"], .mobile-drawer a[href="/galeria/"]', nav.galeria);
        textAll('.main-nav a[href="/foglalas/"], .mobile-drawer a[href="/foglalas/"]', nav.foglalas);
        textAll('.header-book', nav.fejlecGomb);

        const marka = adatok.marka || {};
        const logo = document.querySelector('.brand-logo');
        if (logo && marka.logo) {
            logo.style.backgroundImage = '';
            logo.style.webkitMaskImage = cssUrl(marka.logo);
            logo.style.maskImage = cssUrl(marka.logo);
        }
        const brandLink = document.querySelector('.brand-mark');
        if (brandLink) brandLink.setAttribute('aria-label', marka.logoAlt || marka.nev || 'Kezdőlap');

        const hero = adatok.fooldal?.hero || {};
        textAll('.hero-kicker', hero.kicker);
        textAll('.hero-title', hero.cim);
        textAll('.hero-copy', hero.leiras);
        textAll('.hero-actions a[href="/foglalas/"]', hero.foglalasGomb);
        textAll('.hero-actions a[href="/arlista/"]', hero.arlistaGomb);
        textAll('.hero-stat strong', hero.kepFelirat);
        textAll('.hero-stat span', hero.kepAlcim);
        hatterKep('.hero-visual', hero.kep, hero.kepAlt);

        const szolgaltatasok = adatok.fooldal?.szolgaltatasok || {};
        textAll('[data-section="services"] .section-kicker', szolgaltatasok.kicker);
        textAll('[data-section="services"] h2', szolgaltatasok.cim);
        szolgaltatasKartyak(szolgaltatasok.kartyak || []);

        const bemutatkozas = adatok.fooldal?.bemutatkozas || {};
        textAll('[data-section="about"] .section-kicker', bemutatkozas.kicker);
        textAll('[data-section="about"] h2', bemutatkozas.cim);
        bekezdesek('[data-about-copy]', bemutatkozas.bekezdesek);
        hatterKep('.about-image', bemutatkozas.kep, bemutatkozas.kepAlt);

        const atvezeto = adatok.fooldal?.foglalasAtvezeto || {};
        textAll('[data-section="booking-cta"] .section-kicker', atvezeto.kicker);
        textAll('[data-section="booking-cta"] h2', atvezeto.cim);
        textAll('[data-booking-cta-copy]', atvezeto.leiras);
        textAll('[data-booking-cta-button]', atvezeto.gombSzoveg);

        oldalFejlec(adatok);
        galeriaRender(adatok.galeria || {});
        foglalasTartalom(adatok);
        kapcsolatTartalom(adatok);
        seoTartalom(adatok);
    }

    function oldalFejlec(adatok) {
        const oldal = document.body.dataset.page;
        const tartalom = oldal === 'arlista' ? adatok.arlista
            : oldal === 'galeria' ? adatok.galeria
                : oldal === 'foglalas' ? adatok.foglalas
                    : null;
        if (!tartalom) return;
        textAll('.page-kicker', tartalom.kicker);
        textAll('.page-title', tartalom.cim);
        textAll('.page-copy', tartalom.leiras);
    }

    function szolgaltatasKartyak(kartyak) {
        const holder = document.querySelector('[data-service-cards]');
        if (!holder || !Array.isArray(kartyak)) return;
        holder.innerHTML = '';
        kartyak.forEach(kartya => {
            const article = document.createElement('article');
            article.className = 'service-tile';
            const ikon = document.createElement(kartya.ikonKep ? 'img' : 'span');
            if (kartya.ikonKep) {
                ikon.className = 'tile-icon-image';
                ikon.src = kartya.ikonKep;
                ikon.alt = kartya.ikonAlt || '';
            } else {
                ikon.className = `tile-icon icon-${kartya.ikon || 'cut'}`;
                ikon.setAttribute('aria-hidden', 'true');
            }
            const cim = document.createElement('h3');
            cim.textContent = kartya.cim || '';
            const leiras = document.createElement('p');
            leiras.textContent = kartya.leiras || '';
            article.append(ikon, cim, leiras);
            holder.appendChild(article);
        });
    }

    function galeriaRender(galeria) {
        const holder = document.querySelector('[data-cms-gallery]');
        if (!holder) return;
        holder.innerHTML = '';
        (galeria.elemek || []).forEach((elem, index) => {
            if (!elem.kep) return;
            const article = document.createElement('article');
            article.className = 'gallery-card';
            const image = document.createElement('img');
            image.src = elem.kep;
            image.alt = elem.kepAlt || elem.cim || `Galeria kep ${index + 1}`;
            image.loading = 'lazy';
            const copy = document.createElement('div');
            const title = document.createElement('h3');
            title.textContent = elem.cim || '';
            const description = document.createElement('p');
            description.textContent = elem.leiras || '';
            copy.append(title, description);
            article.append(image, copy);
            holder.appendChild(article);
        });
    }

    function foglalasTartalom(adatok) {
        const foglalas = adatok.foglalas || {};
        placeholder('#foglalas-nev', foglalas.nevPlaceholder);
        placeholder('#foglalas-tel', foglalas.telefonPlaceholder);
        placeholder('#foglalas-email', foglalas.emailPlaceholder);
        placeholder('#foglalas-komment', foglalas.megjegyzesPlaceholder);
        textAll('#foglalas-kuldes', foglalas.kuldesGomb);
        textAll('#sikeres-popup-cim', foglalas.popup?.sikeresCim);
        textAll('#sikeres-popup .popup-szoveg', foglalas.popup?.sikeresSzoveg);
        textAll('#naptar-link', foglalas.popup?.naptarGomb);
        textAll('#sikeres-popup [data-popup-close]', foglalas.popup?.bezarasGomb);

        const span = document.querySelector('.booking-policy span');
        if (!span || !foglalas.lemondasiFeltetel) return;
        span.textContent = `${foglalas.lemondasiFeltetel} ${foglalas.lemondasKapcsolatCimke || 'Lemondás:'} `;
        const kapcsolat = adatok.kapcsolat || {};
        if (kapcsolat.email) {
            const email = document.createElement('a');
            email.href = `mailto:${kapcsolat.email}`;
            email.textContent = kapcsolat.email;
            span.append(email);
        }
        if (kapcsolat.telefon) {
            span.append(document.createTextNode(kapcsolat.email ? ' vagy ' : ''));
            const telefon = document.createElement('a');
            telefon.href = `tel:${kapcsolat.telefonLink || kapcsolat.telefon.replace(/\s/g, '')}`;
            telefon.textContent = kapcsolat.telefon;
            span.append(telefon);
        }
        span.append(document.createTextNode('.'));
    }

    function kapcsolatTartalom(adatok) {
        const kapcsolat = adatok.kapcsolat || {};
        textAll('.footer-brand', adatok.marka?.nev);
        textAll('.footer-instagram', kapcsolat.instagramFelirat);
        const instagram = document.querySelector('.footer-instagram');
        if (instagram && kapcsolat.instagram) instagram.href = kapcsolat.instagram;
    }

    function seoTartalom(adatok) {
        if (location.pathname !== '/' && location.pathname !== '/index.html') return;
        const seo = adatok.seo || {};
        if (seo.fooldalCim) document.title = seo.fooldalCim;
        meta('meta[name="description"]', seo.fooldalLeiras);
        meta('meta[property="og:title"]', seo.fooldalCim);
        meta('meta[property="og:description"]', seo.fooldalLeiras);
        meta('meta[property="og:image"]', seo.megosztasiKep);
    }

    function textAll(selector, value) {
        if (value === undefined || value === null) return;
        document.querySelectorAll(selector).forEach(element => { element.textContent = value; });
    }

    function placeholder(selector, value) {
        const element = document.querySelector(selector);
        if (element && value) element.placeholder = value;
    }

    function bekezdesek(selector, values) {
        const holder = document.querySelector(selector);
        if (!holder || !Array.isArray(values)) return;
        holder.innerHTML = '';
        values.filter(Boolean).forEach(value => {
            const paragraph = document.createElement('p');
            paragraph.textContent = value;
            holder.appendChild(paragraph);
        });
    }

    function hatterKep(selector, url, alt) {
        const element = document.querySelector(selector);
        if (!element || !url) return;
        element.style.backgroundImage = cssUrl(url);
        if (alt) element.setAttribute('aria-label', alt);
    }

    function cssUrl(value) {
        return `url("${String(value).replace(/["\\\n\r]/g, '')}")`;
    }

    function meta(selector, value) {
        const element = document.querySelector(selector);
        if (element && value) element.setAttribute('content', value);
    }

    function deepMerge(base, override) {
        if (Array.isArray(base)) return Array.isArray(override) ? override : base;
        if (!base || typeof base !== 'object') return override ?? base;
        const result = { ...base };
        Object.keys(override || {}).forEach(key => {
            result[key] = deepMerge(base[key], override[key]);
        });
        return result;
    }
})();
