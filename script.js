function lumiAlapOldalAdatok() {
    return {
        marka: {
            nev: 'HAIRPORT by Timi',
            rovidLeiras: 'A hajad első osztályon. Hajvágás, festés, szőkítés és professzionális hajkezelések.'
        },
        kapcsolat: {
            cimke: 'Elérhetőség',
            cim: 'Cím később pontosítva',
            terkepUrl: 'https://www.google.com/maps/search/?api=1&query=fodrasz%20szalon',
            telefon: '+36 70 755 9025',
            telefonLink: '+36707559025',
            email: 'dankutimea6@gmail.com',
            instagram: 'https://www.instagram.com/hairport_by_timi/',
            instagramUzenet: 'https://ig.me/m/hairport_by_timi'
        },
        fooldal: {
            hero: {
                kicker: 'HAIR STUDIO / BY TIMI',
                cim: 'HAIRPORT by Timi',
                leiras: 'A hajad első osztályon. Személyre szabott hajvágás, szín és ápolás letisztult környezetben.'
            },
            szolgaltatasok: {
                cim: 'Szolgáltatások',
                kartyak: [
                    { ikon: 'cut', cim: 'Hajvágás', leiras: 'Női, férfi és gyermek hajvágás konzultációval.' },
                    { ikon: 'color', cim: 'Hajfestés', leiras: 'Tőfestés, teljes festés, árnyalás és természetes színfrissítés.' },
                    { ikon: 'wave', cim: 'Styling', leiras: 'Beszárítás, alkalmi hullámok és elegáns finish.' },
                    { ikon: 'care', cim: 'Hajápolás', leiras: 'Regeneráló kezelések és személyre szabott ápolási javaslatok.' }
                ]
            },
            bemutatkozas: {
                cim: 'A hajad első osztályon',
                bekezdesek: [
                    'A HAIRPORT by Timi szolgáltatásai a személyre szabott hajvágástól a modern színtechnikákon át a professzionális hajkezelésekig terjednek.',
                    'A szalon pontos címe és bemutatkozása később kerül fel az oldalra. Időpontot addig is online vagy a megadott elérhetőségeken kérhetsz.'
                ]
            },
            foglalasAtvezeto: {
                cim: 'Online időpontfoglalás',
                leiras: 'A foglalási logika készen áll. Az új Supabase projekt beállítása után élesíthető.',
                gombSzoveg: 'Időpontot foglalok'
            }
        },
        arlista: {
            cim: 'Árlista',
            leiras: 'A feltüntetett árak tájékoztató jellegűek, a haj hosszától és mennyiségétől függően változhatnak.'
        },
        foglalas: {
            cim: 'Időpontfoglalás',
            leiras: 'Válassz szolgáltatást, dátumot és szabad időpontot.',
            kuldesGomb: 'Foglalás elküldése',
            lebegoGomb: 'Foglalás',
            popup: {
                sikeresCim: 'Köszönjük a foglalást!',
                sikeresSzoveg: 'Megkaptuk az időpontkérésedet. A részletekről visszaigazoló email érkezik.',
                tartalekCim: 'Foglalás rögzítve',
                tartalekSzoveg: 'A foglalás bekerült a rendszerbe, az email értesítést még ellenőrizzük.',
                bezarasGomb: 'Bezárás'
            }
        }
    };
}
window.lumiAlapOldalAdatok = lumiAlapOldalAdatok;

(function () {
    const FALLBACK_SERVICES = [
        { category: 'Hajvágás', name: 'Női hajvágás · rövid haj', price_text: '5 500 Ft', duration_minutes: 60, sort_order: 10 },
        { category: 'Hajvágás', name: 'Női hajvágás · félhosszú haj', price_text: '6 500 Ft', duration_minutes: 60, sort_order: 20 },
        { category: 'Hajvágás', name: 'Női hajvágás · hosszú haj', price_text: '7 500 Ft', duration_minutes: 75, sort_order: 30 },
        { category: 'Hajvágás', name: 'Hajmosás + szárítás · rövid haj', price_text: '4 000 Ft', duration_minutes: 45, sort_order: 40 },
        { category: 'Hajvágás', name: 'Hajmosás + szárítás · félhosszú haj', price_text: '5 000 Ft', duration_minutes: 50, sort_order: 50 },
        { category: 'Hajvágás', name: 'Hajmosás + szárítás · hosszú haj', price_text: '6 000 Ft', duration_minutes: 60, sort_order: 60 },
        { category: 'Hajvágás', name: 'Férfi hajvágás', price_text: '4 500 Ft', duration_minutes: 45, sort_order: 70 },
        { category: 'Hajvágás', name: 'Gyermek hajvágás', price_text: '3 500 Ft', duration_minutes: 40, sort_order: 80 },
        { category: 'Festés', name: 'Tőfestés', price_text: '8 500 Ft-tól', duration_minutes: 120, sort_order: 90 },
        { category: 'Festés', name: 'Teljes festés', price_text: '11 000 Ft-tól', duration_minutes: 150, sort_order: 100 },
        { category: 'Festés', name: 'Festés + vágás', price_text: '14 000 Ft-tól', duration_minutes: 180, sort_order: 110 },
        { category: 'Szőkítés / melír', name: 'Tőszőkítés', price_text: '12 000 Ft-tól', duration_minutes: 150, sort_order: 120 },
        { category: 'Szőkítés / melír', name: 'Melír', price_text: '15 000 Ft-tól', duration_minutes: 180, sort_order: 130 },
        { category: 'Szőkítés / melír', name: 'Balayage', price_text: '22 000 Ft-tól', duration_minutes: 240, sort_order: 140 },
        { category: 'Szőkítés / melír', name: 'Airtouch / Babylights', price_text: '22 000 Ft-tól', duration_minutes: 240, sort_order: 150 },
        { category: 'Kezelések', name: 'Olaplex kezelés', price_text: '7 000 Ft', duration_minutes: 60, sort_order: 160 },
        { category: 'Kezelések', name: 'Hajbotox kezelés', price_text: '8 500 Ft', duration_minutes: 90, sort_order: 170 },
        { category: 'Kezelések', name: 'Keratinos hajegyenesítés', price_text: '13 500 Ft-tól', duration_minutes: 180, sort_order: 180 },
        { category: 'Kezelések', name: 'Hidratáló kezelés', price_text: '5 000 Ft-tól', duration_minutes: 60, sort_order: 190 },
        { category: 'Frizurák', name: 'Egyszerű fonás', price_text: '2 500 Ft', duration_minutes: 30, sort_order: 200 },
        { category: 'Frizurák', name: 'Dupla fonás', price_text: '4 000 Ft', duration_minutes: 45, sort_order: 210 },
        { category: 'Frizurák', name: 'Alkalmi frizura', price_text: '9 000 Ft-tól', duration_minutes: 90, sort_order: 220 },
        { category: 'Frizurák', name: 'Hullámosítás / hajvasalás', price_text: '3 000 Ft', duration_minutes: 40, sort_order: 230 }
    ];

    document.addEventListener('DOMContentLoaded', async () => {
        renderChrome();
        const adatok = await siteData();
        window.lumiAdatok = adatok;
        applyContent(adatok);
        await renderPriceList();
        setupPopup();
        document.body.classList.remove('tartalom-toltes');
    });

    async function siteData() {
        const alap = lumiAlapOldalAdatok();
        const config = window.LUMI_SUPABASE;
        const supabaseLib = window.supabase;

        if (!config?.url || !config?.publishableKey || !supabaseLib?.createClient) {
            return alap;
        }

        try {
            const client = supabaseLib.createClient(config.url, config.publishableKey);
            const { data } = await client.from('site_settings').select('key,value').in('key', ['site_content', 'telefon_lathato']);
            const content = data?.find(item => item.key === 'site_content')?.value || {};
            const phone = data?.find(item => item.key === 'telefon_lathato')?.value;
            const merged = deepMerge(alap, content);
            if (phone && merged.kapcsolat) {
                merged.kapcsolat.telefonLathato = phone.visible !== false;
            }
            return merged;
        } catch (error) {
            console.warn('HAIRPORT tartalom betöltési hiba:', error);
            return alap;
        }
    }

    function renderChrome() {
        const header = document.getElementById('fejlec-helye');
        if (header) {
            header.innerHTML = `
                <header class="site-header">
                    <a class="brand-mark" href="/" aria-label="HAIRPORT by Timi kezdőlap">
                        <span class="brand-logo" aria-hidden="true"></span>
                    </a>
                    <nav class="main-nav" aria-label="Fő navigáció">
                        <a href="/">Kezdőlap</a>
                        <a href="/arlista/">Árlista</a>
                        <a href="/galeria/">Galéria</a>
                        <a href="/foglalas/">Foglalás</a>
                    </nav>
                    <a class="header-book" href="/foglalas/" aria-label="Időpontfoglalás">Időpont</a>
                    <button class="menu-toggle" type="button" aria-label="Menü megnyitása" aria-expanded="false" aria-controls="mobile-drawer">
                        <span class="menu-lines" aria-hidden="true"><span></span><span></span><span></span></span>
                    </button>
                </header>
                <button class="menu-backdrop" type="button" aria-label="Menü bezárása" tabindex="-1"></button>
                <nav class="mobile-drawer" id="mobile-drawer" aria-label="Mobil navigáció" aria-hidden="true">
                    <a href="/">Kezdőlap</a>
                    <a href="/arlista/">Árlista</a>
                    <a href="/galeria/">Galéria</a>
                    <a href="/foglalas/">Foglalás</a>
                </nav>`;
            const current = normalizePath(location.pathname);
            header.querySelectorAll('.main-nav a, .mobile-drawer a').forEach(link => {
                link.classList.toggle('active', normalizePath(link.getAttribute('href')) === current);
            });
            setupMobileMenu(header);
        }

        const footer = document.getElementById('lablec-helye');
        if (footer) {
            footer.innerHTML = `
                <footer class="site-footer" id="kapcsolat">
                    <a class="footer-brand" href="/">HAIRPORT by Timi</a>
                    <address class="footer-contact">
                        <a data-footer-address href="#">Cím később pontosítva</a>
                        <a data-footer-phone href="#" hidden></a>
                        <a data-footer-email href="#" hidden></a>
                    </address>
                    <a class="footer-instagram" href="https://www.instagram.com/hairport_by_timi/" data-social-instagram target="_blank" rel="noopener" aria-label="HAIRPORT by Timi Instagram">Instagram</a>
                </footer>`;
        }
    }

    function setupMobileMenu(root) {
        const toggle = root.querySelector('.menu-toggle');
        const drawer = root.querySelector('.mobile-drawer');
        const backdrop = root.querySelector('.menu-backdrop');
        if (!toggle || !drawer || !backdrop) return;

        const close = () => {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Menü megnyitása');
            drawer.setAttribute('aria-hidden', 'true');
            drawer.classList.remove('open');
            backdrop.classList.remove('open');
            document.body.classList.remove('menu-open');
        };
        const open = () => {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Menü bezárása');
            drawer.setAttribute('aria-hidden', 'false');
            drawer.classList.add('open');
            backdrop.classList.add('open');
            document.body.classList.add('menu-open');
        };

        toggle.addEventListener('click', () => toggle.getAttribute('aria-expanded') === 'true' ? close() : open());
        backdrop.addEventListener('click', close);
        drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
        document.addEventListener('click', event => {
            if (toggle.getAttribute('aria-expanded') === 'true' && !root.contains(event.target)) close();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') close();
        });
    }
    function applyContent(adatok) {
        text('.hero-kicker', adatok.fooldal?.hero?.kicker);
        text('.hero-title', adatok.fooldal?.hero?.cim);
        text('.hero-copy', adatok.fooldal?.hero?.leiras);
        text('[data-section="services"] h2', adatok.fooldal?.szolgaltatasok?.cim);
        text('[data-section="about"] h2', adatok.fooldal?.bemutatkozas?.cim);
        paragraphs('[data-about-copy]', adatok.fooldal?.bemutatkozas?.bekezdesek);
        text('[data-section="booking-cta"] h2', adatok.fooldal?.foglalasAtvezeto?.cim);
        text('[data-booking-cta-copy]', adatok.fooldal?.foglalasAtvezeto?.leiras);
        text('[data-booking-cta-button]', adatok.fooldal?.foglalasAtvezeto?.gombSzoveg);
        text('.page-title', pageTitle(adatok));
        text('.page-copy', pageCopy(adatok));
        text('#foglalas-kuldes', adatok.foglalas?.kuldesGomb);
        text('[data-footer-text]', adatok.marka?.rovidLeiras);
        text('.footer-brand', adatok.marka?.nev);
        applyContact(adatok.kapcsolat || {});
        renderServiceCards(adatok.fooldal?.szolgaltatasok?.kartyak || []);
    }

    function pageTitle(adatok) {
        if (document.body.dataset.page === 'arlista') return adatok.arlista?.cim;
        if (document.body.dataset.page === 'foglalas') return adatok.foglalas?.cim;
        if (document.body.dataset.page === 'galeria') return 'Galéria';
        if (document.body.dataset.page === 'adatkezeles') return 'Adatkezelés';
        return '';
    }

    function pageCopy(adatok) {
        if (document.body.dataset.page === 'arlista') return adatok.arlista?.leiras;
        if (document.body.dataset.page === 'foglalas') return adatok.foglalas?.leiras;
        if (document.body.dataset.page === 'galeria') return 'Ide kerülnek majd a valódi szalonfotók, munkák és inspirációk.';
        return '';
    }

    function renderServiceCards(cards) {
        const holder = document.querySelector('[data-service-cards]');
        if (!holder || !cards.length) return;
        holder.innerHTML = cards.map(card => `
            <article class="service-tile">
                <span class="tile-icon icon-${html(card.ikon || 'cut')}" aria-hidden="true"></span>
                <h3>${html(card.cim)}</h3>
                <p>${html(card.leiras)}</p>
            </article>`).join('');
    }

    async function renderPriceList() {
        const holder = document.querySelector('[data-price-list]');
        if (!holder) return;
        const services = await servicesData();
        const groups = services.reduce((all, service) => {
            const category = service.category || 'Szolgáltatások';
            (all[category] ||= []).push(service);
            return all;
        }, {});
        holder.innerHTML = Object.entries(groups).map(([category, items]) => `
            <section class="price-group">
                <h2>${html(category)}</h2>
                ${items.map(service => `
                    <article class="price-row">
                        <h3>${html(service.description || service.name)}</h3>
                        <strong>${html(service.price_text || 'Ár egyeztetés alapján')}</strong>
                    </article>`).join('')}
            </section>`).join('');
    }

    async function servicesData() {
        const config = window.LUMI_SUPABASE;
        const supabaseLib = window.supabase;
        if (!config?.url || !config?.publishableKey || !supabaseLib?.createClient) return FALLBACK_SERVICES;
        try {
            const client = supabaseLib.createClient(config.url, config.publishableKey);
            const { data, error } = await client.from('services').select('name,description,category,price_text,duration_minutes,booking_enabled,active,sort_order').eq('active', true).order('sort_order', { ascending: true });
            if (error || !data?.length) return FALLBACK_SERVICES;
            return data;
        } catch {
            return FALLBACK_SERVICES;
        }
    }

    function applyContact(contact) {
        const address = document.querySelector('[data-footer-address]');
        if (address) {
            address.textContent = contact.cim || 'Cím később pontosítva';
            address.href = contact.terkepUrl || '#';
        }
        const phone = document.querySelector('[data-footer-phone]');
        if (phone && contact.telefon) {
            phone.textContent = contact.telefon;
            phone.href = 'tel:' + (contact.telefonLink || contact.telefon.replace(/\s/g, ''));
            phone.hidden = contact.telefonLathato === false;
        }
        const email = document.querySelector('[data-footer-email]');
        if (email && contact.email) {
            email.textContent = contact.email;
            email.href = 'mailto:' + contact.email;
            email.hidden = false;
        }
        const instagram = document.querySelector('[data-social-instagram]');
        if (instagram && contact.instagram) instagram.href = contact.instagram;
    }

    function setupPopup() {
        document.querySelectorAll('[data-popup-close]').forEach(button => {
            button.addEventListener('click', () => {
                const popup = button.closest('.popup-hatter');
                if (popup) popup.style.display = 'none';
            });
        });
    }

    function text(selector, value) {
        if (value === undefined || value === null || value === '') return;
        document.querySelectorAll(selector).forEach(node => { node.textContent = value; });
    }

    function paragraphs(selector, values) {
        const holder = document.querySelector(selector);
        if (!holder || !Array.isArray(values)) return;
        holder.innerHTML = values.map(value => `<p>${html(value)}</p>`).join('');
    }

    function duration(minutes) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return [h ? h + ' óra' : '', m ? m + ' perc' : ''].filter(Boolean).join(' ') || '0 perc';
    }

    function normalizePath(value) {
        const path = value || '/';
        if (path === '/') return '/';
        return path.endsWith('/') ? path : path + '/';
    }

    function deepMerge(base, override) {
        if (Array.isArray(base)) return Array.isArray(override) ? override : base;
        if (!base || typeof base !== 'object') return override ?? base;
        const out = { ...base };
        Object.keys(override || {}).forEach(key => { out[key] = deepMerge(base[key], override[key]); });
        return out;
    }

    function html(value) {
        return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }
})();
