(function () {
    const config = window.LUMI_SUPABASE;
    const supabaseLib = window.supabase;

    if (!document.body || document.body.dataset.bookingMode !== 'supabase') {
        return;
    }

    const allapot = {
        kliens: null,
        szolgaltatasok: [],
        datumok: [],
        idopontok: [],
        naptarHonap: '',
        aktualisLepes: 1
    };

    const LEPES_CIMEK = [
        'Szolgáltatás kiválasztása',
        'Dátum kiválasztása',
        'Időpont kiválasztása',
        'Kapcsolati adatok',
        'Foglalás ellenőrzése'
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const elemek = urlapElemek();

        if (!elemek.urlap) {
            return;
        }

        foglalasiFeluletInicializalasa(elemek);

        if (!config?.url || !config?.publishableKey || !supabaseLib?.createClient) {
            statuszKiirasa(elemek.statusz, 'A foglalási rendszer még nincs összekötve a Supabase projekttel.', true);
            mezokTiltasa(elemek, true);
            uresOpcio(elemek.szolgaltatasOpcio, 'A foglalás a Supabase beállítása után válik elérhetővé.');
            return;
        }

        allapot.kliens = supabaseLib.createClient(config.url, config.publishableKey);

        elemek.urlap.addEventListener('submit', event => {
            event.preventDefault();
            foglalasKuldes(elemek);
        });

        elemek.szolgaltatas.addEventListener('change', async () => {
            await szabadDatumokBetoltese(elemek);
            frissitOsszegzes(elemek);
            frissitNavigacio(elemek);
        });
        elemek.datum.addEventListener('change', async () => {
            await idopontokBetoltese(elemek);
            frissitOsszegzes(elemek);
            frissitNavigacio(elemek);
        });
        elemek.ido.addEventListener('change', () => {
            frissitOsszegzes(elemek);
            frissitNavigacio(elemek);
        });

        szolgaltatasokBetoltese(elemek);
    });

    function urlapElemek() {
        return {
            urlap: document.getElementById('foglalas-urlap'),
            nev: document.getElementById('foglalas-nev'),
            telefon: document.getElementById('foglalas-tel'),
            email: document.getElementById('foglalas-email'),
            szolgaltatas: document.getElementById('foglalas-szolgatatas'),
            datum: document.getElementById('foglalas-datum'),
            ido: document.getElementById('foglalas-ido'),
            komment: document.getElementById('foglalas-komment'),
            lemondas: document.getElementById('foglalas-lemondas'),
            kuldes: document.getElementById('foglalas-kuldes'),
            statusz: document.getElementById('foglalas-status'),
            szolgaltatasOpcio: document.getElementById('booking-service-options'),
            datumOpcio: document.getElementById('booking-date-options'),
            idoOpcio: document.getElementById('booking-time-options'),
            elozo: document.getElementById('booking-prev'),
            kovetkezo: document.getElementById('booking-next'),
            aktualisLepes: document.getElementById('booking-current-step'),
            naptarCim: document.getElementById('booking-calendar-label'),
            naptarElozo: document.getElementById('booking-calendar-prev'),
            naptarKovetkezo: document.getElementById('booking-calendar-next')
        };
    }

    async function szolgaltatasokBetoltese(elemek) {
        selectAllapot(elemek.szolgaltatas, 'Szolgáltatások betöltése...');
        selectAllapot(elemek.datum, 'Előbb válassz szolgáltatást...');
        selectAllapot(elemek.ido, 'Előbb válassz szolgáltatást és dátumot...');
        statuszKiirasa(elemek.statusz, '');

        const { data, error } = await allapot.kliens
            .from('services')
            .select('id,name,description,category,price_text,duration_minutes')
            .eq('active', true)
            .eq('booking_enabled', true)
            .order('sort_order', { ascending: true });

        if (error) {
            statuszKiirasa(elemek.statusz, 'A szolgáltatások még nem tölthetők be. Futtasd a Supabase SQL fájlt, majd próbáld újra.', true);
            selectAllapot(elemek.szolgaltatas, 'A szolgáltatások nem érhetők el');
            uresOpcio(elemek.szolgaltatasOpcio, 'A szolgáltatások jelenleg nem érhetők el.');
            return;
        }

        allapot.szolgaltatasok = Array.isArray(data) ? data : [];
        elemek.szolgaltatas.innerHTML = '<option value="" disabled selected>Válassz szolgáltatást...</option>';

        allapot.szolgaltatasok.forEach(szolgaltatas => {
            const option = document.createElement('option');
            option.value = szolgaltatas.id;
            option.textContent = szolgaltatasFelirat(szolgaltatas);
            elemek.szolgaltatas.appendChild(option);
        });

        szolgaltatasOpcioRenderelese(elemek);

        if (allapot.szolgaltatasok.length === 0) {
            selectAllapot(elemek.szolgaltatas, 'Nincs aktív foglalható szolgáltatás');
            uresOpcio(elemek.szolgaltatasOpcio, 'Jelenleg nincs online foglalható szolgáltatás.');
        }
        frissitNavigacio(elemek);
    }

    async function szabadDatumokBetoltese(elemek) {
        const szolgaltatasId = elemek.szolgaltatas.value;
        allapot.datumok = [];
        allapot.idopontok = [];
        allapot.naptarHonap = '';
        selectAllapot(elemek.ido, 'Előbb válassz dátumot...');
        uresOpcio(elemek.datumOpcio, 'Szabad dátumok betöltése...');
        uresOpcio(elemek.idoOpcio, 'Előbb válassz egy napot.');

        if (!szolgaltatasId) {
            selectAllapot(elemek.datum, 'Előbb válassz szolgáltatást...');
            return;
        }

        selectAllapot(elemek.datum, 'Szabad dátumok betöltése...');
        statuszKiirasa(elemek.statusz, '');

        const { data, error } = await allapot.kliens.rpc('get_available_dates', {
            p_service_id: szolgaltatasId,
            p_start_date: maiDatum(),
            p_days: 90
        });

        if (error) {
            statuszKiirasa(elemek.statusz, 'Most nem sikerült lekérni a szabad dátumokat. Futtasd a legfrissebb Supabase SQL-t, majd próbáld újra.', true);
            selectAllapot(elemek.datum, 'A szabad dátumok nem érhetők el');
            uresOpcio(elemek.datumOpcio, 'A szabad dátumok jelenleg nem érhetők el.');
            return;
        }

        const datumok = Array.isArray(data) ? data : [];
        allapot.datumok = datumok;
        allapot.naptarHonap = datumok[0]?.work_date?.slice(0, 7) || maiDatum().slice(0, 7);
        elemek.datum.innerHTML = '<option value="" disabled selected>Válassz szabad dátumot...</option>';

        datumok.forEach(datum => {
            const option = document.createElement('option');
            option.value = datum.work_date;
            option.textContent = datumFelirat(datum.work_date);
            elemek.datum.appendChild(option);
        });

        naptarRenderelese(elemek);

        if (datumok.length === 0) {
            selectAllapot(elemek.datum, 'Nincs szabad dátum ehhez a szolgáltatáshoz');
            uresOpcio(elemek.datumOpcio, 'Ehhez a szolgáltatáshoz jelenleg nincs szabad dátum.');
        }
    }

    async function idopontokBetoltese(elemek) {
        const szolgaltatasId = elemek.szolgaltatas.value;
        const datum = elemek.datum.value;
        allapot.idopontok = [];
        uresOpcio(elemek.idoOpcio, 'Szabad időpontok betöltése...');

        if (!szolgaltatasId || !datum) {
            selectAllapot(elemek.ido, 'Előbb válassz szolgáltatást és dátumot...');
            return;
        }

        if (datum < maiDatum()) {
            selectAllapot(elemek.ido, 'Múltbeli dátum nem választható');
            return;
        }

        selectAllapot(elemek.ido, 'Szabad időpontok betöltése...');
        statuszKiirasa(elemek.statusz, '');

        const { data, error } = await allapot.kliens.rpc('get_available_slots', {
            p_service_id: szolgaltatasId,
            p_date: datum
        });

        if (error) {
            statuszKiirasa(elemek.statusz, 'Most nem sikerült lekérni a szabad időpontokat. Kérlek próbáld újra kicsit később.', true);
            selectAllapot(elemek.ido, 'Nem sikerült betölteni');
            uresOpcio(elemek.idoOpcio, 'A szabad időpontok jelenleg nem érhetők el.');
            return;
        }

        const idopontok = Array.isArray(data) ? data : [];
        allapot.idopontok = idopontok;
        elemek.ido.innerHTML = '<option value="" disabled selected>Válassz időpontot...</option>';

        idopontok.forEach(idopont => {
            const option = document.createElement('option');
            option.value = idopont.starts_at;
            option.textContent = idopont.label;
            elemek.ido.appendChild(option);
        });

        idopontOpcioRenderelese(elemek);

        if (idopontok.length === 0) {
            selectAllapot(elemek.ido, 'Erre a napra nincs szabad időpont');
            uresOpcio(elemek.idoOpcio, 'Erre a napra már nincs szabad időpont.');
        }
        frissitNavigacio(elemek);
    }

    function foglalasiFeluletInicializalasa(elemek) {
        elemek.elozo?.addEventListener('click', () => lepesMegjelenitese(elemek, allapot.aktualisLepes - 1));
        elemek.kovetkezo?.addEventListener('click', () => kovetkezoLepes(elemek));

        elemek.szolgaltatasOpcio?.addEventListener('click', event => {
            const gomb = event.target.closest('[data-service-id]');
            if (!gomb || gomb.disabled) return;
            elemek.szolgaltatas.value = gomb.dataset.serviceId;
            szolgaltatasKijelolesFrissitese(elemek);
            elemek.szolgaltatas.dispatchEvent(new Event('change'));
        });

        elemek.datumOpcio?.addEventListener('click', event => {
            const gomb = event.target.closest('[data-booking-date]');
            if (!gomb || gomb.disabled) return;
            elemek.datum.value = gomb.dataset.bookingDate;
            naptarRenderelese(elemek);
            elemek.datum.dispatchEvent(new Event('change'));
        });

        elemek.idoOpcio?.addEventListener('click', event => {
            const gomb = event.target.closest('[data-booking-time]');
            if (!gomb || gomb.disabled) return;
            elemek.ido.value = gomb.dataset.bookingTime;
            idopontOpcioRenderelese(elemek);
            elemek.ido.dispatchEvent(new Event('change'));
        });

        elemek.naptarElozo?.addEventListener('click', () => naptarHonapLepes(elemek, -1));
        elemek.naptarKovetkezo?.addEventListener('click', () => naptarHonapLepes(elemek, 1));

        [elemek.nev, elemek.telefon, elemek.email, elemek.komment].filter(Boolean).forEach(mezo => {
            mezo.addEventListener('input', () => {
                frissitOsszegzes(elemek);
                frissitNavigacio(elemek);
            });
        });
        elemek.lemondas?.addEventListener('change', () => frissitNavigacio(elemek));

        lepesMegjelenitese(elemek, 1, false);
        uresOpcio(elemek.szolgaltatasOpcio, 'Szolgáltatások betöltése...');
        uresOpcio(elemek.datumOpcio, 'Előbb válassz szolgáltatást.');
        uresOpcio(elemek.idoOpcio, 'Előbb válassz egy napot.');
    }

    function kovetkezoLepes(elemek) {
        const hiba = lepesHiba(allapot.aktualisLepes, elemek);
        if (hiba) {
            statuszKiirasa(elemek.statusz, hiba, true);
            return;
        }
        lepesMegjelenitese(elemek, allapot.aktualisLepes + 1);
    }

    function lepesMegjelenitese(elemek, lepes, gorgetes = true) {
        const ujLepes = Math.max(1, Math.min(5, lepes));
        allapot.aktualisLepes = ujLepes;
        document.querySelectorAll('[data-booking-step]').forEach(szekcio => {
            const aktiv = Number(szekcio.dataset.bookingStep) === ujLepes;
            szekcio.hidden = !aktiv;
            szekcio.classList.toggle('active', aktiv);
        });
        document.querySelectorAll('.booking-progress-track span').forEach((vonal, index) => {
            vonal.classList.toggle('active', index < ujLepes);
        });
        if (elemek.aktualisLepes) elemek.aktualisLepes.textContent = LEPES_CIMEK[ujLepes - 1];
        statuszKiirasa(elemek.statusz, '');
        frissitOsszegzes(elemek);
        frissitNavigacio(elemek);
        if (gorgetes && window.innerWidth <= 900) {
            document.querySelector('.booking-progress')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function lepesHiba(lepes, elemek) {
        if (lepes === 1 && !elemek.szolgaltatas.value) return 'Válassz egy szolgáltatást a folytatáshoz.';
        if (lepes === 2 && !elemek.datum.value) return 'Válassz egy szabad napot a folytatáshoz.';
        if (lepes === 3 && !elemek.ido.value) return 'Válassz egy időpontot a folytatáshoz.';
        if (lepes === 4) {
            if (!elemek.nev.value.trim() || !elemek.telefon.value.trim() || !elemek.email.value.trim()) return 'Töltsd ki a nevet, telefonszámot és email-címet.';
            if (elemzesTelefon(elemek.telefon.value).length !== 9) return 'A telefonszám 9 számjegyből álljon, országkód nélkül.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elemek.email.value.trim())) return 'Kérlek valós email-címet adj meg.';
        }
        return '';
    }

    function frissitNavigacio(elemek) {
        if (!elemek.elozo || !elemek.kovetkezo) return;
        elemek.elozo.disabled = allapot.aktualisLepes === 1 || !allapot.kliens;
        elemek.kovetkezo.hidden = allapot.aktualisLepes === 5;
        elemek.kovetkezo.disabled = !allapot.kliens || !lepesKesz(allapot.aktualisLepes, elemek);
        if (elemek.kuldes) {
            elemek.kuldes.hidden = allapot.aktualisLepes !== 5;
            elemek.kuldes.disabled = !allapot.kliens || !elemek.lemondas?.checked;
        }
    }

    function lepesKesz(lepes, elemek) {
        if (lepes === 1) return Boolean(elemek.szolgaltatas.value);
        if (lepes === 2) return Boolean(elemek.datum.value);
        if (lepes === 3) return Boolean(elemek.ido.value);
        if (lepes === 4) return !lepesHiba(4, elemek);
        return true;
    }

    function szolgaltatasOpcioRenderelese(elemek) {
        if (!elemek.szolgaltatasOpcio) return;
        elemek.szolgaltatasOpcio.innerHTML = '';
        const csoportok = allapot.szolgaltatasok.reduce((eredmeny, szolgaltatas) => {
            const kategoria = szolgaltatas.category || 'Szolgáltatások';
            (eredmeny[kategoria] ||= []).push(szolgaltatas);
            return eredmeny;
        }, {});

        Object.entries(csoportok).forEach(([kategoria, szolgaltatasok]) => {
            const csoport = document.createElement('section');
            csoport.className = 'booking-service-group';
            const cim = document.createElement('h3');
            cim.textContent = kategoria;
            csoport.appendChild(cim);
            szolgaltatasok.forEach(szolgaltatas => {
                const gomb = document.createElement('button');
                gomb.type = 'button';
                gomb.className = 'booking-service-option';
                gomb.dataset.serviceId = szolgaltatas.id;
                gomb.setAttribute('aria-pressed', String(elemek.szolgaltatas.value === szolgaltatas.id));
                const szoveg = document.createElement('span');
                const nev = document.createElement('strong');
                nev.textContent = szolgaltatas.name;
                szoveg.appendChild(nev);
                if (szolgaltatas.description?.trim() && szolgaltatas.description.trim() !== szolgaltatas.name) {
                    const leiras = document.createElement('small');
                    leiras.textContent = szolgaltatas.description.trim();
                    szoveg.appendChild(leiras);
                }
                const meta = document.createElement('span');
                meta.className = 'booking-service-meta';
                if (szolgaltatas.price_text) {
                    const ar = document.createElement('span');
                    ar.textContent = szolgaltatas.price_text;
                    meta.appendChild(ar);
                }
                if (szolgaltatas.duration_minutes > 0) {
                    const ido = document.createElement('span');
                    ido.textContent = idoFelirat(szolgaltatas.duration_minutes);
                    meta.appendChild(ido);
                }
                gomb.append(szoveg, meta);
                csoport.appendChild(gomb);
            });
            elemek.szolgaltatasOpcio.appendChild(csoport);
        });
        szolgaltatasKijelolesFrissitese(elemek);
    }

    function szolgaltatasKijelolesFrissitese(elemek) {
        elemek.szolgaltatasOpcio?.querySelectorAll('[data-service-id]').forEach(gomb => {
            const aktiv = gomb.dataset.serviceId === elemek.szolgaltatas.value;
            gomb.classList.toggle('selected', aktiv);
            gomb.setAttribute('aria-pressed', String(aktiv));
        });
        frissitOsszegzes(elemek);
        frissitNavigacio(elemek);
    }

    function naptarRenderelese(elemek) {
        if (!elemek.datumOpcio || !allapot.datumok.length) return;
        const elerheto = new Set(allapot.datumok.map(datum => datum.work_date));
        const [ev, honap] = allapot.naptarHonap.split('-').map(Number);
        const elsoNap = new Date(ev, honap - 1, 1, 12, 0, 0);
        const napokSzama = new Date(ev, honap, 0, 12, 0, 0).getDate();
        const kezdoHely = (elsoNap.getDay() + 6) % 7;
        elemek.datumOpcio.innerHTML = '';
        if (elemek.naptarCim) {
            elemek.naptarCim.textContent = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long' }).format(elsoNap);
        }
        for (let index = 0; index < kezdoHely; index += 1) {
            const ures = document.createElement('span');
            ures.className = 'booking-calendar-day';
            elemek.datumOpcio.appendChild(ures);
        }
        for (let nap = 1; nap <= napokSzama; nap += 1) {
            const datum = `${ev}-${String(honap).padStart(2, '0')}-${String(nap).padStart(2, '0')}`;
            const elerhetoNap = elerheto.has(datum);
            const elem = document.createElement(elerhetoNap ? 'button' : 'span');
            if (elerhetoNap) {
                elem.type = 'button';
                elem.dataset.bookingDate = datum;
                elem.setAttribute('aria-label', datumFelirat(datum));
            }
            elem.className = 'booking-calendar-day';
            elem.textContent = String(nap);
            elem.classList.toggle('selected', datum === elemek.datum.value);
            elem.classList.toggle('today', datum === maiDatum());
            elemek.datumOpcio.appendChild(elem);
        }
        naptarNavigacioFrissitese(elemek);
    }

    function naptarHonapLepes(elemek, irany) {
        if (!allapot.naptarHonap) return;
        const [ev, honap] = allapot.naptarHonap.split('-').map(Number);
        const datum = new Date(ev, honap - 1 + irany, 1, 12, 0, 0);
        allapot.naptarHonap = `${datum.getFullYear()}-${String(datum.getMonth() + 1).padStart(2, '0')}`;
        naptarRenderelese(elemek);
    }

    function naptarNavigacioFrissitese(elemek) {
        const honapok = allapot.datumok.map(datum => datum.work_date.slice(0, 7)).sort();
        const minimum = honapok[0] || allapot.naptarHonap;
        const maximum = honapok[honapok.length - 1] || allapot.naptarHonap;
        if (elemek.naptarElozo) elemek.naptarElozo.disabled = allapot.naptarHonap <= minimum;
        if (elemek.naptarKovetkezo) elemek.naptarKovetkezo.disabled = allapot.naptarHonap >= maximum;
    }

    function idopontOpcioRenderelese(elemek) {
        if (!elemek.idoOpcio) return;
        elemek.idoOpcio.innerHTML = '';
        allapot.idopontok.forEach(idopont => {
            const gomb = document.createElement('button');
            gomb.type = 'button';
            gomb.className = 'booking-time-option';
            gomb.dataset.bookingTime = idopont.starts_at;
            gomb.textContent = idopont.label;
            gomb.classList.toggle('selected', idopont.starts_at === elemek.ido.value);
            gomb.setAttribute('aria-pressed', String(idopont.starts_at === elemek.ido.value));
            elemek.idoOpcio.appendChild(gomb);
        });
    }

    function frissitOsszegzes(elemek) {
        const szolgaltatas = allapot.szolgaltatasok.find(elem => elem.id === elemek.szolgaltatas.value);
        const szolgaltatasSzoveg = szolgaltatas
            ? [szolgaltatas.name, szolgaltatas.price_text].filter(Boolean).join(' · ')
            : 'Még nincs kiválasztva';
        const datumSzoveg = elemek.datum.value ? datumFelirat(elemek.datum.value) : 'Még nincs kiválasztva';
        const idoSzoveg = elemek.ido.value ? (elemek.ido.selectedOptions?.[0]?.textContent || 'Még nincs kiválasztva') : 'Még nincs kiválasztva';
        const vendegSzoveg = elemek.nev.value.trim() || 'Még nincs megadva';
        osszegzesSzoveg('service', szolgaltatasSzoveg);
        osszegzesSzoveg('date', datumSzoveg);
        osszegzesSzoveg('time', idoSzoveg);
        osszegzesSzoveg('guest', vendegSzoveg);
    }

    function osszegzesSzoveg(kulcs, ertek) {
        document.querySelectorAll(`[data-booking-summary="${kulcs}"]`).forEach(elem => {
            elem.textContent = ertek;
        });
    }

    function uresOpcio(tarto, szoveg) {
        if (!tarto) return;
        tarto.innerHTML = '';
        const ures = document.createElement('p');
        ures.className = 'booking-options-empty';
        ures.textContent = szoveg;
        tarto.appendChild(ures);
    }

    function foglalasiFolyamatReset(elemek) {
        allapot.datumok = [];
        allapot.idopontok = [];
        allapot.naptarHonap = '';
        szolgaltatasOpcioRenderelese(elemek);
        uresOpcio(elemek.datumOpcio, 'Előbb válassz szolgáltatást.');
        uresOpcio(elemek.idoOpcio, 'Előbb válassz egy napot.');
        lepesMegjelenitese(elemek, 1, false);
    }
    async function foglalasKuldes(elemek) {
        const adatok = foglalasAdatok(elemek);
        const hiba = foglalasHiba(adatok, elemek);

        if (hiba) {
            statuszKiirasa(elemek.statusz, hiba, true);
            return;
        }

        gombAllapot(elemek.kuldes, true, 'Foglalás és visszaigazolás küldése...');
        statuszKiirasa(elemek.statusz, '');

        const eredmeny = await foglalasMenteseEmaillel(adatok);

        if (!eredmeny.ok) {
            statuszKiirasa(elemek.statusz, supabaseHiba(eredmeny.error), true);
            gombAllapot(elemek.kuldes, false, 'Foglalás elküldése');
            idopontokBetoltese(elemek);
            return;
        }

        const emailEredmeny = eredmeny.email || { ok: false, error: 'missing_email_result' };
        naptarLinkFrissitese(adatok);
        sikeresPopupNyitasa(emailEredmeny);
        elemek.urlap.reset();
        selectAllapot(elemek.datum, 'Előbb válassz szolgáltatást...');
        selectAllapot(elemek.ido, 'Előbb válassz szolgáltatást és dátumot...');
        foglalasiFolyamatReset(elemek);
        statuszKiirasa(elemek.statusz, emailEredmeny.ok
            ? 'A foglalás elküldve. A visszaigazoló emailt is elküldtük. Kérlek ellenőrizd a spam vagy promóciók mappát is.'
            : 'A foglalás elküldve. Az email értesítés most nem biztos, hogy elment, de a foglalás bekerült.');
        gombAllapot(elemek.kuldes, false, 'Foglalás elküldése');
    }

    async function foglalasMenteseEmaillel(adatok) {
        if (allapot.kliens.functions?.invoke) {
            try {
                const { data, error } = await allapot.kliens.functions.invoke('create-booking-with-email', {
                    body: {
                        service_id: adatok.szolgaltatasId,
                        customer_name: adatok.nev,
                        customer_phone: adatok.telefon,
                        customer_email: adatok.email,
                        note: adatok.megjegyzes,
                        starts_at: adatok.startsAt
                    }
                });

                if (!error && data?.ok && data?.booking_id) {
                    console.info('HAIRPORT by Timi booking function result:', data);
                    return data;
                }

                console.warn('HAIRPORT by Timi foglalás function nem futott végig, tartalék mentés indul:', error || data);
            } catch (error) {
                console.warn('HAIRPORT by Timi foglalás function hiba, tartalék mentés indul:', error);
            }
        }

        return foglalasMenteseKozvetlenul(adatok);
    }

    async function foglalasMenteseKozvetlenul(adatok) {
        const { data, error } = await allapot.kliens.rpc('create_booking', {
            p_service_id: adatok.szolgaltatasId,
            p_customer_name: adatok.nev,
            p_customer_phone: adatok.telefon,
            p_customer_email: adatok.email,
            p_note: adatok.megjegyzes,
            p_starts_at: adatok.startsAt
        });

        if (error) {
            return { ok: false, error };
        }

        console.info('HAIRPORT by Timi booking saved with fallback RPC:', data);

        return {
            ok: true,
            booking_id: data,
            fallback: true,
            email: {
                ok: false,
                skipped: true,
                fallback: true,
                reason: 'A foglalás tartalék módban került mentésre, ezért az automatikus email nem indult el.'
            }
        };
    }

    function foglalasAdatok(elemek) {
        return {
            nev: elemek.nev.value.trim(),
            telefon: `+36 ${elemzesTelefon(elemek.telefon.value)}`,
            telefonSzamok: elemzesTelefon(elemek.telefon.value),
            email: elemek.email.value.trim().toLowerCase(),
            szolgaltatasId: elemek.szolgaltatas.value,
            szolgaltatas: allapot.szolgaltatasok.find(szolgaltatas => szolgaltatas.id === elemek.szolgaltatas.value),
            datum: elemek.datum.value,
            startsAt: elemek.ido.value,
            megjegyzes: elemek.komment.value.trim()
        };
    }

    function foglalasHiba(adatok, elemek) {
        if (!elemek.lemondas?.checked) {
            return 'A foglaláshoz el kell fogadnod a lemondási feltételeket.';
        }
        if (!adatok.nev || !adatok.telefonSzamok || !adatok.email || !adatok.szolgaltatasId || !adatok.datum || !adatok.startsAt) {
            return 'Kérlek tölts ki minden kötelező mezőt.';
        }

        if (adatok.telefonSzamok.length !== 9) {
            return 'Kérlek 9 számjegyű magyar mobilszámot adj meg, országkód nélkül. Példa: 301234567';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adatok.email)) {
            return 'Kérlek valós email címet adj meg.';
        }

        if (adatok.datum < maiDatum()) {
            return 'Múltbeli dátumra nem lehet időpontot foglalni.';
        }

        return '';
    }

    function szolgaltatasFelirat(szolgaltatas) {
        const reszek = [szolgaltatas.description?.trim() || szolgaltatas.name];

        if (szolgaltatas.price_text) {
            reszek.push(szolgaltatas.price_text);
        }

        if (szolgaltatas.duration_minutes > 0) {
            reszek.push(idoFelirat(szolgaltatas.duration_minutes));
        }

        return reszek.join(' - ');
    }

    function idoFelirat(percOsszesen) {
        const ora = Math.floor(percOsszesen / 60);
        const perc = percOsszesen % 60;
        const reszek = [];

        if (ora > 0) {
            reszek.push(`${ora} óra`);
        }

        if (perc > 0) {
            reszek.push(`${perc} perc`);
        }

        return reszek.join(' ') || '0 perc';
    }

    function elemzesTelefon(ertek) {
        let szamok = String(ertek || '').replace(/\D/g, '');

        if (szamok.startsWith('36')) {
            szamok = szamok.substring(2);
        } else if (szamok.startsWith('06')) {
            szamok = szamok.substring(2);
        }

        while (szamok.startsWith('0')) {
            szamok = szamok.substring(1);
        }

        return szamok.substring(0, 9);
    }

    function selectAllapot(select, szoveg) {
        select.innerHTML = '';
        const option = document.createElement('option');
        option.value = '';
        option.disabled = true;
        option.selected = true;
        option.textContent = szoveg;
        select.appendChild(option);
    }

    function datumFelirat(datumSzoveg) {
        const [ev, honap, nap] = datumSzoveg.split('-').map(Number);
        return new Intl.DateTimeFormat('hu-HU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'long'
        }).format(new Date(ev, honap - 1, nap, 12, 0, 0));
    }

    function statuszKiirasa(elem, szoveg, hiba = false) {
        if (!elem) {
            return;
        }

        elem.textContent = szoveg;
        elem.classList.toggle('hiba', Boolean(hiba));
    }

    function mezokTiltasa(elemek, tiltva) {
        [elemek.nev, elemek.telefon, elemek.email, elemek.szolgaltatas, elemek.datum, elemek.ido, elemek.komment, elemek.lemondas, elemek.kuldes, elemek.elozo, elemek.kovetkezo]
            .filter(Boolean)
            .forEach(elem => {
                elem.disabled = tiltva;
            });
    }

    function gombAllapot(gomb, tiltva, szoveg) {
        gomb.disabled = tiltva;
        gomb.textContent = szoveg;
    }

    function sikeresPopupNyitasa(emailEredmeny = { ok: false }) {
        const popup = document.getElementById('sikeres-popup');
        const popupCim = popup?.querySelector('h2');
        const popupSzoveg = popup?.querySelector('.popup-szoveg');
        const tartalom = window.lumiAdatok?.foglalas?.popup || {};

        if (popupCim) {
            popupCim.textContent = emailEredmeny.ok
                ? (tartalom.sikeresCim || 'Köszönjük a foglalást!')
                : (tartalom.tartalekCim || 'Foglalás rögzítve');
        }

        if (popupSzoveg) {
            popupSzoveg.textContent = emailEredmeny.ok
                ? (tartalom.sikeresSzoveg || 'Megkaptuk a foglalásodat. A részletekről visszaigazoló emailt is küldtünk.')
                : (tartalom.tartalekSzoveg || 'A foglalás bekerült a rendszerbe, de az email értesítést még ellenőrizni kell.');
        }

        if (popup) {
            popup.style.display = 'flex';
        }
    }

    function naptarLinkFrissitese(adatok) {
        const link = document.getElementById('naptar-link');

        if (!link || !adatok.startsAt || !adatok.szolgaltatas) {
            return;
        }

        const kezdes = new Date(adatok.startsAt);
        const idotartamPerc = adatok.szolgaltatas.duration_minutes > 0 ? adatok.szolgaltatas.duration_minutes : 30;
        const vege = new Date(kezdes.getTime() + idotartamPerc * 60000);
        const cim = `HAIRPORT by Timi - ${adatok.szolgaltatas.name}`;
        const leiras = `Foglalás: ${adatok.szolgaltatas.name}
Név: ${adatok.nev}
Telefon: ${adatok.telefon}`;
        const helyszin = 'Cím később pontosítva';
        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//HAIRPORT by Timi//Booking//HU',
            'BEGIN:VEVENT',
            `UID:${Date.now()}@szalon.hu`,
            `DTSTAMP:${icsDatum(new Date())}`,
            `DTSTART:${icsDatum(kezdes)}`,
            `DTEND:${icsDatum(vege)}`,
            `SUMMARY:${icsSzoveg(cim)}`,
            `DESCRIPTION:${icsSzoveg(leiras)}`,
            `LOCATION:${icsSzoveg(helyszin)}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });

        if (link.dataset.url) {
            URL.revokeObjectURL(link.dataset.url);
        }

        const url = URL.createObjectURL(blob);
        link.href = url;
        link.dataset.url = url;
        link.download = 'arany-szalon-foglalas.ics';
        link.hidden = false;
    }

    function icsDatum(datum) {
        return datum.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    }

    function icsSzoveg(szoveg) {
        return String(szoveg || '')
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n')
            .replace(/,/g, '\\,')
            .replace(/;/g, '\\;');
    }

    function supabaseHiba(error) {
        if (typeof error === 'string' && error.trim()) {
            return error.trim();
        }

        const uzenet = error?.message || '';

        if (uzenet) {
            return uzenet;
        }

        if (typeof error?.error === 'string' && error.error.trim()) {
            return error.error.trim();
        }

        return 'Most nem sikerült elküldeni a foglalást. Kérlek próbáld újra.';
    }

    function maiDatum() {
        const ma = new Date();
        const ev = ma.getFullYear();
        const honap = String(ma.getMonth() + 1).padStart(2, '0');
        const nap = String(ma.getDate()).padStart(2, '0');

        return `${ev}-${honap}-${nap}`;
    }
})();
