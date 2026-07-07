(function () {
    const MAX_FILE_SIZE = 12 * 1024 * 1024;
    const BUCKET = window.HAIRPORT_MEDIA_BUCKET || 'site-media';
    const config = window.LUMI_SUPABASE;
    const supabaseLib = window.supabase;
    const state = { client: null, content: null, session: null, dirty: false };

    const GROUPS = [
        {
            title: 'Márka és fejléc',
            fields: [
                field('marka.nev', 'Márkanév'),
                image('marka.logo', 'Fejléc logó'),
                field('marka.logoAlt', 'Logó leírása'),
                field('navigacio.kezdolap', 'Kezdőlap menüpont'),
                field('navigacio.arlista', 'Árlista menüpont'),
                field('navigacio.galeria', 'Galéria menüpont'),
                field('navigacio.foglalas', 'Foglalás menüpont'),
                field('navigacio.fejlecGomb', 'Asztali fejléc gomb')
            ]
        },
        {
            title: 'Főoldal nyitó rész',
            fields: [
                field('fooldal.hero.kicker', 'Kis felső felirat'),
                field('fooldal.hero.cim', 'Főcím'),
                field('fooldal.hero.leiras', 'Leírás', 'textarea'),
                field('fooldal.hero.foglalasGomb', 'Foglalás gomb'),
                field('fooldal.hero.arlistaGomb', 'Árlista gomb'),
                image('fooldal.hero.kep', 'Nyitókép'),
                field('fooldal.hero.kepAlt', 'Nyitókép leírása'),
                field('fooldal.hero.kepFelirat', 'Képen lévő cím'),
                field('fooldal.hero.kepAlcim', 'Képen lévő alcím')
            ]
        },
        {
            title: 'Főoldali szolgáltatások',
            fields: [
                field('fooldal.szolgaltatasok.kicker', 'Kis felső felirat'),
                field('fooldal.szolgaltatasok.cim', 'Szakasz címe'),
                ...serviceFields(0, 'Hajvágás'),
                ...serviceFields(1, 'Hajfestés'),
                ...serviceFields(2, 'Styling'),
                ...serviceFields(3, 'Hajápolás')
            ]
        },
        {
            title: 'Bemutatkozás',
            fields: [
                field('fooldal.bemutatkozas.kicker', 'Kis felső felirat'),
                field('fooldal.bemutatkozas.cim', 'Cím'),
                field('fooldal.bemutatkozas.bekezdesek.0', 'Első bekezdés', 'textarea'),
                field('fooldal.bemutatkozas.bekezdesek.1', 'Második bekezdés', 'textarea'),
                image('fooldal.bemutatkozas.kep', 'Bemutatkozó kép'),
                field('fooldal.bemutatkozas.kepAlt', 'Kép leírása')
            ]
        },
        {
            title: 'Főoldali foglalási blokk',
            fields: [
                field('fooldal.foglalasAtvezeto.kicker', 'Kis felső felirat'),
                field('fooldal.foglalasAtvezeto.cim', 'Cím'),
                field('fooldal.foglalasAtvezeto.leiras', 'Leírás', 'textarea'),
                field('fooldal.foglalasAtvezeto.gombSzoveg', 'Gomb szövege')
            ]
        },
        {
            title: 'Árlista oldal',
            fields: [
                field('arlista.kicker', 'Kis felső felirat'),
                field('arlista.cim', 'Oldal címe'),
                field('arlista.leiras', 'Bevezető szöveg', 'textarea')
            ]
        },
        {
            title: 'Galéria oldal',
            fields: [
                field('galeria.kicker', 'Kis felső felirat'),
                field('galeria.cim', 'Oldal címe'),
                field('galeria.leiras', 'Bevezető szöveg', 'textarea')
            ],
            gallery: true
        },
        {
            title: 'Foglalási oldal',
            fields: [
                field('foglalas.kicker', 'Kis felső felirat'),
                field('foglalas.cim', 'Oldal címe'),
                field('foglalas.leiras', 'Bevezető szöveg', 'textarea'),
                field('foglalas.nevPlaceholder', 'Név mező felirata'),
                field('foglalas.telefonPlaceholder', 'Telefon mező felirata'),
                field('foglalas.emailPlaceholder', 'Email mező felirata'),
                field('foglalas.megjegyzesPlaceholder', 'Megjegyzés mező felirata'),
                field('foglalas.lemondasiFeltetel', 'Lemondási feltétel', 'textarea'),
                field('foglalas.lemondasKapcsolatCimke', 'Lemondási elérhetőség felirata'),
                field('foglalas.kuldesGomb', 'Küldés gomb'),
                field('foglalas.popup.sikeresCim', 'Sikeres ablak címe'),
                field('foglalas.popup.sikeresSzoveg', 'Sikeres ablak szövege', 'textarea'),
                field('foglalas.popup.tartalekCim', 'Emailhiba ablak címe'),
                field('foglalas.popup.tartalekSzoveg', 'Emailhiba ablak szövege', 'textarea'),
                field('foglalas.popup.naptarGomb', 'Naptár gomb'),
                field('foglalas.popup.bezarasGomb', 'Bezárás gomb')
            ]
        },
        {
            title: 'Elérhetőségek és lábléc',
            fields: [
                field('marka.rovidLeiras', 'Rövid márkaleírás', 'textarea'),
                field('kapcsolat.cim', 'Cím'),
                field('kapcsolat.terkepUrl', 'Térkép link', 'url'),
                field('kapcsolat.telefon', 'Telefonszám'),
                field('kapcsolat.telefonLink', 'Telefon hívási formátumban'),
                field('kapcsolat.email', 'Email'),
                field('kapcsolat.instagram', 'Instagram link', 'url'),
                field('kapcsolat.instagramFelirat', 'Instagram felirat')
            ]
        },
        {
            title: 'Kereső és megosztás',
            fields: [
                field('seo.fooldalCim', 'Böngésző címsorának szövege'),
                field('seo.fooldalLeiras', 'Keresőben megjelenő leírás', 'textarea'),
                image('seo.megosztasiKep', 'Megosztási kép')
            ]
        }
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('admin-cms-root');
        if (!root || !config?.url || !config?.publishableKey || !supabaseLib?.createClient) return;

        state.client = supabaseLib.createClient(config.url, config.publishableKey);
        root.addEventListener('input', () => { state.dirty = true; updateSaveLabel(); });
        root.addEventListener('change', cmsChange);
        root.addEventListener('click', cmsClick);
        document.getElementById('admin-cms-save')?.addEventListener('click', saveContent);
        document.getElementById('admin-cms-reload')?.addEventListener('click', loadContent);
        document.getElementById('admin-lebego-mentes')?.addEventListener('click', () => {
            if (document.getElementById('admin-panel-szovegek')?.classList.contains('aktiv')) saveContent();
        });

        state.client.auth.onAuthStateChange((_event, session) => {
            state.session = session;
            if (session) loadContent();
        });
        state.client.auth.getSession().then(({ data }) => {
            state.session = data.session;
            if (state.session) loadContent();
        });
    });

    function field(path, label, type = 'text') {
        return { path, label, type };
    }

    function image(path, label) {
        return { path, label, type: 'image' };
    }

    function serviceFields(index, fallbackName) {
        return [
            image(`fooldal.szolgaltatasok.kartyak.${index}.ikonKep`, `${index + 1}. ikon - ${fallbackName}`),
            field(`fooldal.szolgaltatasok.kartyak.${index}.cim`, `${index + 1}. szolgáltatás címe`),
            field(`fooldal.szolgaltatasok.kartyak.${index}.leiras`, `${index + 1}. szolgáltatás leírása`, 'textarea')
        ];
    }

    async function loadContent() {
        if (!state.client || !state.session) return;
        status('Tartalom betöltése...');
        const defaults = window.hairportCmsDefaults?.() || {};
        const { data, error } = await state.client
            .from('site_settings')
            .select('value')
            .eq('key', 'site_content')
            .maybeSingle();

        if (error) {
            state.content = clone(defaults);
            render();
            status('Az online tartalom még nem érhető el. Az alapadatokat mutatom; futtasd a friss Supabase SQL-t.', true);
            return;
        }

        state.content = deepMerge(defaults, data?.value || {});
        state.dirty = false;
        render();
        status('A weboldal tartalma betöltve.');
        updateSaveLabel();
    }

    function render() {
        const root = document.getElementById('admin-cms-root');
        if (!root || !state.content) return;
        root.innerHTML = '';

        GROUPS.forEach((group, groupIndex) => {
            const section = document.createElement('section');
            section.className = 'cms-section';
            const header = document.createElement('button');
            header.type = 'button';
            header.className = 'cms-section-toggle';
            header.dataset.cmsToggle = String(groupIndex);
            header.setAttribute('aria-expanded', groupIndex === 0 ? 'true' : 'false');
            header.innerHTML = `<span>${escapeHtml(group.title)}</span><span aria-hidden="true">+</span>`;
            const body = document.createElement('div');
            body.className = 'cms-section-body';
            body.hidden = groupIndex !== 0;

            const grid = document.createElement('div');
            grid.className = 'admin-grid cms-field-grid';
            group.fields.forEach(definition => grid.appendChild(renderField(definition)));
            body.appendChild(grid);
            if (group.gallery) body.appendChild(renderGallery());
            section.append(header, body);
            root.appendChild(section);
        });
    }

    function renderField(definition) {
        if (definition.type === 'image') return renderImageField(definition.path, definition.label);
        const label = document.createElement('label');
        label.className = `admin-mezo${definition.type === 'textarea' ? ' admin-mezo-szeles' : ''}`;
        label.textContent = definition.label;
        const input = document.createElement(definition.type === 'textarea' ? 'textarea' : 'input');
        input.dataset.cmsPath = definition.path;
        input.value = getPath(state.content, definition.path) ?? '';
        if (definition.type === 'textarea') input.rows = 4;
        if (definition.type === 'url') input.type = 'url';
        label.appendChild(input);
        return label;
    }

    function renderImageField(path, labelText) {
        const holder = document.createElement('div');
        holder.className = 'cms-image-field admin-mezo admin-mezo-szeles';
        const label = document.createElement('span');
        label.className = 'cms-field-label';
        label.textContent = labelText;
        const current = getPath(state.content, path) || '';
        const preview = document.createElement('div');
        preview.className = 'cms-image-preview';
        preview.dataset.cmsPreview = path;
        preview.innerHTML = current
            ? `<img src="${escapeAttribute(current)}" alt=""><span>Kép előnézet</span>`
            : '<span>Nincs kiválasztott kép</span>';
        const controls = document.createElement('div');
        controls.className = 'cms-image-controls';
        const uploadLabel = document.createElement('label');
        uploadLabel.className = 'admin-hozzaadas cms-upload-button';
        uploadLabel.textContent = 'Kép feltöltése';
        const file = document.createElement('input');
        file.type = 'file';
        file.accept = 'image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml';
        file.dataset.cmsUpload = path;
        uploadLabel.appendChild(file);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'admin-kis-gomb';
        remove.dataset.cmsRemoveImage = path;
        remove.textContent = 'Kép eltávolítása';
        controls.append(uploadLabel, remove);
        const url = document.createElement('input');
        url.type = 'text';
        url.className = 'cms-image-url';
        url.dataset.cmsPath = path;
        url.value = current;
        url.placeholder = 'Kép URL vagy /kepek/fajl.jpg';
        holder.append(label, preview, controls, url);
        return holder;
    }

    function renderGallery() {
        const wrapper = document.createElement('div');
        wrapper.className = 'cms-gallery-editor';
        const header = document.createElement('div');
        header.className = 'cms-gallery-header';
        header.innerHTML = '<h3>Galéria képei</h3>';
        const add = document.createElement('button');
        add.type = 'button';
        add.className = 'admin-hozzaadas';
        add.dataset.cmsGalleryAdd = 'true';
        add.textContent = 'Új galériakép';
        header.appendChild(add);
        wrapper.appendChild(header);

        const list = document.createElement('div');
        list.className = 'cms-gallery-list';
        const items = state.content.galeria?.elemek || [];
        items.forEach((item, index) => {
            const card = document.createElement('article');
            card.className = 'cms-gallery-item';
            card.dataset.galleryIndex = String(index);
            const title = document.createElement('h4');
            title.textContent = `${index + 1}. kép`;
            card.appendChild(title);
            card.appendChild(renderImageField(`galeria.elemek.${index}.kep`, 'Fotó'));
            card.appendChild(renderField(field(`galeria.elemek.${index}.kepAlt`, 'Kép leírása')));
            card.appendChild(renderField(field(`galeria.elemek.${index}.cim`, 'Cím')));
            card.appendChild(renderField(field(`galeria.elemek.${index}.leiras`, 'Leírás', 'textarea')));
            const actions = document.createElement('div');
            actions.className = 'cms-gallery-actions';
            actions.innerHTML = `
                <button type="button" class="admin-kis-gomb" data-cms-gallery-move="up" data-index="${index}" aria-label="Feljebb">↑</button>
                <button type="button" class="admin-kis-gomb" data-cms-gallery-move="down" data-index="${index}" aria-label="Lejjebb">↓</button>
                <button type="button" class="admin-kis-gomb admin-veszely-gomb" data-cms-gallery-delete="${index}">Törlés</button>`;
            card.appendChild(actions);
            list.appendChild(card);
        });
        wrapper.appendChild(list);
        return wrapper;
    }

    async function cmsChange(event) {
        const input = event.target.closest('[data-cms-upload]');
        if (!input || !input.files?.[0]) return;
        await uploadImage(input.dataset.cmsUpload, input.files[0], input);
    }

    async function cmsClick(event) {
        const toggle = event.target.closest('[data-cms-toggle]');
        if (toggle) {
            const body = toggle.nextElementSibling;
            const open = toggle.getAttribute('aria-expanded') !== 'true';
            toggle.setAttribute('aria-expanded', String(open));
            toggle.lastElementChild.textContent = open ? '−' : '+';
            body.hidden = !open;
            return;
        }

        const remove = event.target.closest('[data-cms-remove-image]');
        if (remove) {
            setImageValue(remove.dataset.cmsRemoveImage, '');
            return;
        }

        if (event.target.closest('[data-cms-gallery-add]')) {
            readForm();
            state.content.galeria ||= {};
            state.content.galeria.elemek ||= [];
            state.content.galeria.elemek.push({ kep: '', kepAlt: '', cim: '', leiras: '' });
            state.dirty = true;
            render();
            openGallerySection();
            updateSaveLabel();
            return;
        }

        const move = event.target.closest('[data-cms-gallery-move]');
        if (move) {
            readForm();
            const from = Number(move.dataset.index);
            const to = move.dataset.cmsGalleryMove === 'up' ? from - 1 : from + 1;
            const items = state.content.galeria.elemek;
            if (to >= 0 && to < items.length) [items[from], items[to]] = [items[to], items[from]];
            state.dirty = true;
            render();
            openGallerySection();
            updateSaveLabel();
            return;
        }

        const deletion = event.target.closest('[data-cms-gallery-delete]');
        if (deletion) {
            if (!window.confirm('Biztosan törlöd ezt a galériaelemet?')) return;
            readForm();
            state.content.galeria.elemek.splice(Number(deletion.dataset.cmsGalleryDelete), 1);
            state.dirty = true;
            render();
            openGallerySection();
            updateSaveLabel();
        }
    }

    async function uploadImage(path, file, input) {
        if (!state.client || !state.session) return;
        if (!file.type.startsWith('image/')) {
            status('Csak képfájl tölthető fel.', true);
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            status('A kép legfeljebb 12 MB lehet.', true);
            return;
        }

        input.disabled = true;
        status(`Kép feltöltése: ${file.name}...`);
        const extension = safeExtension(file);
        const objectPath = `uploads/${new Date().toISOString().slice(0, 10)}/${Date.now()}-${randomId()}.${extension}`;
        const { error } = await state.client.storage
            .from(BUCKET)
            .upload(objectPath, file, { cacheControl: '31536000', contentType: file.type, upsert: false });
        input.disabled = false;
        input.value = '';

        if (error) {
            console.error('Képfeltöltési hiba:', error);
            status('A kép feltöltése nem sikerült. Ellenőrizd, hogy lefuttattad-e a Storage SQL részt.', true);
            return;
        }

        const { data } = state.client.storage.from(BUCKET).getPublicUrl(objectPath);
        setImageValue(path, data.publicUrl);
        status('A kép feltöltve. A véglegesítéshez nyomd meg a Tartalom mentése gombot.');
    }

    function setImageValue(path, value) {
        setPath(state.content, path, value);
        const input = document.querySelector(`[data-cms-path="${cssEscape(path)}"]`);
        if (input) input.value = value;
        const preview = document.querySelector(`[data-cms-preview="${cssEscape(path)}"]`);
        if (preview) preview.innerHTML = value
            ? `<img src="${escapeAttribute(value)}" alt=""><span>Kép előnézet</span>`
            : '<span>Nincs kiválasztott kép</span>';
        state.dirty = true;
        updateSaveLabel();
    }

    function readForm() {
        document.querySelectorAll('#admin-cms-root [data-cms-path]').forEach(input => {
            setPath(state.content, input.dataset.cmsPath, input.value.trim());
        });
    }

    async function saveContent() {
        if (!state.client || !state.session || !state.content) return;
        readForm();
        setSaving(true);
        status('Tartalom mentése...');
        const { error } = await state.client.from('site_settings').upsert({
            key: 'site_content',
            value: state.content,
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });
        setSaving(false);

        if (error) {
            console.error('Tartalom mentési hiba:', error);
            status('A mentés nem sikerült. Ellenőrizd a Supabase SQL beállítását.', true);
            return;
        }

        state.dirty = false;
        updateSaveLabel();
        status('Minden tartalom elmentve. A publikus oldalon frissítés után látható.');
    }

    function setSaving(saving) {
        const save = document.getElementById('admin-cms-save');
        if (save) {
            save.disabled = saving;
            save.textContent = saving ? 'Mentés...' : 'Tartalom mentése';
        }
    }

    function updateSaveLabel() {
        const save = document.getElementById('admin-cms-save');
        if (save && !save.disabled) save.textContent = state.dirty ? 'Tartalom mentése *' : 'Tartalom mentése';
    }

    function openGallerySection() {
        const buttons = Array.from(document.querySelectorAll('[data-cms-toggle]'));
        const button = buttons.find(item => item.textContent.includes('Galéria oldal'));
        if (!button) return;
        button.setAttribute('aria-expanded', 'true');
        button.lastElementChild.textContent = '−';
        button.nextElementSibling.hidden = false;
    }

    function status(message, error = false) {
        const element = document.getElementById('admin-cms-status');
        if (!element) return;
        element.textContent = message;
        element.classList.toggle('hiba', Boolean(error));
    }

    function getPath(object, path) {
        return path.split('.').reduce((current, key) => current?.[numberKey(key)], object);
    }

    function setPath(object, path, value) {
        const keys = path.split('.');
        let current = object;
        keys.forEach((key, index) => {
            const actualKey = numberKey(key);
            if (index === keys.length - 1) {
                current[actualKey] = value;
                return;
            }
            const nextIsNumber = /^\d+$/.test(keys[index + 1]);
            current[actualKey] ||= nextIsNumber ? [] : {};
            current = current[actualKey];
        });
    }

    function numberKey(value) {
        return /^\d+$/.test(value) ? Number(value) : value;
    }

    function deepMerge(base, override) {
        if (Array.isArray(base)) return Array.isArray(override) ? override : base;
        if (!base || typeof base !== 'object') return override ?? base;
        const result = { ...base };
        Object.keys(override || {}).forEach(key => { result[key] = deepMerge(base[key], override[key]); });
        return result;
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function safeExtension(file) {
        const byType = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif', 'image/svg+xml': 'svg' };
        return byType[file.type] || 'jpg';
    }

    function randomId() {
        return globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
    }

    function cssEscape(value) {
        return globalThis.CSS?.escape ? CSS.escape(value) : value.replace(/([."'\\[\]])/g, '\\$1');
    }

    function escapeHtml(value) {
        return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/'/g, '&#039;');
    }
})();
