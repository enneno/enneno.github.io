/* Progressive studio navigation. All factual panels remain readable without JS. */
let lumiStudio = null;

function fooldalStudioBekotese() {
    const tabs = Array.from(document.querySelectorAll('.studio-view-tabs a'));
    const heroImage = document.querySelector('#hero .hero-kep');
    const strip = document.querySelector('#galeria-atvezeto .galeria-atvezeto-kepek');
    if (lumiStudio || tabs.length !== 3 || !heroImage || !strip) return;
    const panels = tabs.map(tab => document.querySelector(tab.getAttribute('href')));
    if (panels.some(panel => !panel)) return;
    const thumbnails = Array.from(strip.querySelectorAll('img'));
    let selectedImage = -1;
    let imageRequest = 0;
    let swipeStart = null;
    let openingImage = { src: heroImage.src, alt: heroImage.alt };
    const status = document.querySelector('[data-studio-image-status]');

    function activate(index, updateUrl = true, animate = true) {
        tabs.forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(i === index));
            tab.tabIndex = i === index ? 0 : -1;
            panels[i].hidden = i !== index;
            panels[i].classList.remove('studio-panel-enter');
        });
        if (animate) panels[index].classList.add('studio-panel-enter');
        if (updateUrl) {
            const hash = index === 0 ? '' : tabs[index].getAttribute('href');
            window.history.replaceState(null, '', window.location.pathname + window.location.search + hash);
        }
    }

    tabs[0].parentElement.setAttribute('role', 'tablist');
    tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', panels[index].id);
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', tab.id);
        panels[index].tabIndex = 0;
        tab.addEventListener('click', event => {
            event.preventDefault();
            activate(index);
        });
        tab.addEventListener('keydown', event => {
            let next = index;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else if (event.key === ' ') { event.preventDefault(); activate(index); return; }
            else return;
            event.preventDefault();
            tabs[next].focus();
            activate(next);
        });
    });

    const thumbnailButtons = thumbnails.map((image, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'studio-thumbnail';
        button.setAttribute('aria-label', `${index + 1}. munka megjelenítése: ${image.alt}`);
        button.setAttribute('aria-pressed', 'false');
        image.before(button);
        button.appendChild(image);
        button.addEventListener('click', () => showImage(index));
        return button;
    });

    function markImage(index) {
        selectedImage = index;
        panels[0].classList.toggle('studio-gallery-image', index >= 0);
        thumbnailButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
        if (status) status.textContent = index < 0 ? 'Lumi Nails nyitókép' : `${index + 1}. munka, összesen ${thumbnails.length}`;
    }

    async function showImage(index) {
        const request = ++imageRequest;
        const image = index < 0 ? openingImage : {
            src: thumbnails[index].dataset.fullSrc || thumbnails[index].src,
            alt: thumbnails[index].alt
        };
        let timer;
        panels[0].setAttribute('aria-busy', 'true');
        try {
            const preload = new Image();
            preload.src = image.src;
            await Promise.race([
                preload.decode(),
                new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('image-timeout')), 8000); })
            ]);
            if (request !== imageRequest) return;
            heroImage.src = image.src;
            heroImage.alt = image.alt;
            markImage(index);
        } catch (_error) {
            if (request === imageRequest && status) status.textContent = 'A kép nem tölthető be. Próbáld újra, vagy nyisd meg a galériát.';
        } finally {
            clearTimeout(timer);
            if (request === imageRequest) panels[0].removeAttribute('aria-busy');
        }
    }

    function step(direction) {
        const next = ((selectedImage + 1 + direction + thumbnails.length + 1) % (thumbnails.length + 1)) - 1;
        showImage(next);
    }
    document.querySelectorAll('[data-studio-image-step]').forEach(button => {
        button.hidden = false;
        button.addEventListener('click', () => step(Number(button.dataset.studioImageStep)));
    });
    const visual = panels[0].querySelector('.hero-visual');
    visual.addEventListener('pointerdown', event => {
        if (event.isPrimary && event.button === 0) swipeStart = event.clientX;
    });
    visual.addEventListener('pointerup', event => {
        if (swipeStart === null) return;
        const distance = event.clientX - swipeStart;
        swipeStart = null;
        if (Math.abs(distance) > 42) step(distance > 0 ? -1 : 1);
    });
    visual.addEventListener('pointercancel', () => { swipeStart = null; });

    function route() {
        const index = tabs.findIndex(tab => tab.getAttribute('href') === window.location.hash);
        activate(Math.max(0, index), false, false);
    }
    window.addEventListener('hashchange', route);
    lumiStudio = {
        navigate(hash, focus = true) {
            const index = tabs.findIndex(tab => tab.getAttribute('href') === hash);
            if (index < 0) return false;
            activate(index, true, focus);
            if (focus || document.activeElement === panels[index]) tabs[index].focus({ preventScroll: true });
            window.scrollTo({ top: 0, behavior: 'instant' });
            return true;
        },
        refreshOpening() {
            openingImage = { src: heroImage.src, alt: heroImage.alt };
            if (selectedImage >= 0) showImage(selectedImage);
            thumbnailButtons.forEach((button, index) => button.setAttribute('aria-label', `${index + 1}. munka megjelenítése: ${thumbnails[index].alt}`));
        }
    };
    document.body.classList.add('studio-enhanced');
    route();
    if (window.location.hash === '#szolgaltatasok' || window.location.hash === '#bemutatkozas') {
        requestAnimationFrame(() => {
            const index = tabs.findIndex(tab => tab.getAttribute('href') === window.location.hash);
            if (document.activeElement === panels[index]) tabs[index].focus({ preventScroll: true });
            window.scrollTo({ top: 0, behavior: 'instant' });
        });
    }
}

function fooldalStudioTartalomFrissitese() {
    if (lumiStudio) lumiStudio.refreshOpening();
}
