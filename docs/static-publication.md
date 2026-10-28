# LumiNails: statikus Cloudflare-kiadás és élő Supabase

Ez az új TEST-kiadási mód irányadó leírása. Az éles Cloudflare Pages projekt átállítása és a Supabase-migráció telepítése még külön aktiválási lépés; a helyi kódváltoztatás önmagában nem végzi el ezeket.

## A folyamat

1. Fejlesztés és helyi ellenőrzés a TEST-ben.
2. Az ellenőrzött commit a TEST GitHub-repositoryba kerül.
3. Cloudflare Workers Builds: `npm run build:site`, majd `npm run deploy:test`.
4. Az `assets` konfiguráció a `dist` fájljait szolgálja ki, saját Worker-script, SSR és KV nélkül.
5. Az admin nyilvános tartalommentése Supabase-ben történik. A szerveroldali Edge Function ellenőrzi a felhasználót és az aktuális `is_lumi_admin` jogot, összeveti a tartalmi ujjlenyomatot a tényleges publikus kiadással, és csak szükség esetén hívja a titkos Cloudflare Deploy Hookot.
6. Az admin külön jelzi a mentést és a megjelenést. A megjelenés bizonyítéka a tényleges webhely `/deployment.json` fájljának egyező környezete, eredete és tartalmi hash-e, nem a buildindítás elfogadása.

A régi TEST GitHub Pages workflow megszűnik: nem indít párhuzamos, másik hosztingra irányuló kiadást. GitHubon nem fut teszt vagy audit. Az éles repository meglévő workflow-jait ez a TEST-változtatás nem módosítja.

## Mi kerül a kiadásba?

A `scripts/public-files.js` az egyetlen publikus fájllista. A `dist` csak az engedélyezett HTML-t, böngészős CSS/JS-t, képeket, manifestet, robots.txt-t, sitemapet, `adatok.json`-t, `deployment.json`-t és Cloudflare `_headers` fájlt tartalmazza. SQL, szerveroldali kód, `src`, teszt, npm-fájl, dokumentáció és helyi mentés nem kerül bele.

A HTML és a JSON ugyanabból a nyilvános pillanatképből készül. Az e-mail-sablonok, vendégadatok és foglalások nem részei a JSON-nak. A fő CSS/JS fájlok tartalmi hash-t kapnak a fájlnévben és hosszú immutable cache-t; a változó HTML/JSON és a service worker frissességét ellenőrizni kell. A service worker működése és az admin PWA nagyítási tilalma változatlan.

A foglalható dátumok/időpontok, kuponérvényesítés, belépés, profilok, foglalások és e-mailküldés továbbra is élő Supabase-műveletek. Az időérzékeny főoldali kuponajánlatok is élő lekérést használnak. A ritkán változó oldal- és árlistatartalom a statikus JSON-ból érkezik; nincs Supabase-fallback, amely publikálatlan tartalmat tenne láthatóvá egy sikertelen build után.

## Cloudflare TEST beállítása

- Worker neve: a `wrangler.jsonc` szerinti `luminails-test`.
- Git-forrás: a saját TEST repository `main` ága.
- Build command: `npm run build:site`.
- Deploy command: `npm run deploy:test`.
- A runtime nem igényel bindingot vagy titkot.
- Build változók: `LUMI_DEPLOY_ENV=test`, `LUMI_SITE_ORIGIN` = a tényleges TEST HTTPS-eredet, záró perjel és útvonal nélkül.
- Hozz létre az adott TEST ághoz kötött Cloudflare Build Deploy Hookot. Az URL titok, csak Supabase Secretként tárolható.

Helyi kiadási előnézet PowerShellben:

```powershell
$env:LUMI_DEPLOY_ENV='test'
$env:LUMI_SITE_ORIGIN='http://127.0.0.1:8102'
npm run build:site
npm run test:architecture
npm run serve:dist
```

A `build:site` nyilvános Supabase-adatokat olvas, adatbázist nem módosít. Helyi és TEST build nem célozhatja az éles domaint. A helyi előnézet kiadási manifestjének localhost eredetét éles buildben nem szabad használni.

## Supabase aktiválás

Az új végpontok neve szándékosan különbözik a korábbi `request-site-rebuild` és `request-live-site-rebuild` nevektől. Így egy új kliens állapotlekérdezése nem indíthat buildet a régi, `status` műveletet még nem ismerő szerveren. A régi végpontok forrása változatlan; kivezetésük az éles átállás része.

Előbb azonosítani kell a megfelelő adatbázis-környezetet. Jelenleg a TEST és LIVE ugyanazt a projektet használja; ez nem adatizoláció. A közös adatbázis migrációja az éles rendszert is érinti, ezért külön jóváhagyás és működő hozzáférés szükséges. Más projekt adatait, titkait és környezeti azonosítóit nem szabad átmásolni.

1. Alkalmazandó migráció: `supabase/migrations/20261028132648_static_publication.sql`.
2. TEST Edge Function: `publish-site-content`; a `_shared` fájlokkal együtt telepítendő.
3. Szerveroldali Secret: `LUMI_TEST_SITE_URL` = a buildben használt HTTPS-eredet; `CLOUDFLARE_TEST_DEPLOY_HOOK` = az adott TEST build hookja.
4. A Supabase biztosítja a `SUPABASE_URL`, `SUPABASE_ANON_KEY` és `SUPABASE_SERVICE_ROLE_KEY` környezeti változókat. A service-role kulcs csak az Edge Functionben használható.
5. Opcionális `LUMI_PUBLICATION_ALLOWED_ORIGINS`: további, kifejezetten engedélyezett admin-eredetek vesszővel elválasztva. Az átállás alatt a korábbi TEST admin eredete is engedélyezhető. A domainválasztás nem helyettesíti a szerveroldali jogosultságellenőrzést.
6. Az első sikeres Cloudflare build után ellenőrizni kell a tényleges `deployment.json`-t, majd egy visszaolvasott adminmentést és annak nyilvános megjelenését.

A CMS két beállításrekordja egy tranzakcióban mentődik; a régi szerkesztőváltozat mentése `40001` ütközést ad. Az árlista teljes mentése szintén tranzakciós, a sorok `editor_version` értékével védett. A migráció nélküli új mentés hibával leáll, nem esik vissza részleges írásokra.

A privát közzétételi tábla környezetenként külön indítási zárolást használ. Azonos tartalomhoz 15 percig nem indít újra buildet. Elutasított hooknál a zár felszabadul. A külső HTTP-hívás pontosan egyszeri végrehajtása hálózati megszakadásnál nem garantálható; a zár és az ujjlenyomat az ismétlődéseket korlátozza.

## Éles átállás, külön jóváhagyás után

Az éles helyi példány útvonalát ismét read-only módon kell azonosítani; a LIVE repository és Cloudflare-beállítások most változatlanok. Az éles átálláshoz az ellenőrzött TEST commit, külön LIVE build/deploy cél, `LUMI_DEPLOY_ENV=live`, `LUMI_SITE_ORIGIN=https://luminails.hu`, `LUMI_LIVE_SITE_URL` és `CLOUDFLARE_LIVE_DEPLOY_HOOK` szükséges. A `publish-live-site-content` előkészített forrás, telepítése nem része automatikusan a TEST munkának.

Át kell irányítani a tényleges domaint az új, ellenőrzött statikus kiadásra, és ki kell kapcsolni a régi, GitHub Pagesre irányuló LIVE kiadási útvonalat. A korábbi működő kiadást meg kell őrizni visszaállításhoz. A build hiba esetén nem publikálhat részleges csomagot.

## Naplózás és ellenőrzési korlátok

Az alkalmazáskódból kikerültek a sikeres foglalások részletes konzolnaplói. A hibajelzés és az üzleti `booking_events` audit megmarad. A Supabase Postgres/Realtimelog-beállításai és megőrzési szabályai külön platformbeállítások; ezeket nem szabad látatlanban kikapcsolni. A napló keletkezése, lekérdezése és az alkalmazás adatforgalma külön mérendő.

A helyi PostgreSQL teszt a migráció jogosultságait, tranzakcióit és stale-editor védelmét ellenőrzi; nem bizonyítja a távoli Supabase telepítését vagy a több adatbázis-kapcsolat közti éles ütközéskezelést. A helyi Edge Function tesztek kontrollált HTTP-válaszokkal futnak, valódi buildet és foglalást nem indítanak.

## Helyi ellenőrzés – 2026. október 28.

Állapot: a TEST-kód és a helyi kiadási csomag elkészült. Nem történt commit, push, Cloudflare-telepítés, Supabase-migráció vagy Edge Function-telepítés. A közös Supabase csak nyilvános, anonim REST-lekérésekkel volt olvasva; tartalom és foglalás nem változott. Az éles helyi projekt, a LIVE GitHub-repository és az éles webhely változatlan.

- `npm run build:site`: 12 kész HTML-oldal, 19 aktív árlistatétel, 132 kiadási fájl.
- Wrangler `deploy --dry-run`: sikeres, nincs runtime binding; nem történt feltöltés.
- `npm run test:architecture`: 8/8 sikeres, valódi helyi PGlite PostgreSQL-motorral és kontrollált Edge HTTP-válaszokkal.
- `npm run check`: sikeres statikus ellenőrzés, generált bundle-ellenőrzés, publikus/admin CSS-felelősség és Stylelint. Forrás-CSS nem változott.
- Kész `dist` böngészős ellenőrzése: 2/2 sikeres; egy közös statikus JSON-kérés, hash-elt dinamikus CSS, nincs `services`/`site_settings` böngészős tartalomolvasás, kieső JSON mellett megmaradó HTML, nem publikus SQL/forráskód.
- Közzétételi kliens: 12/12 sikeres; környezetválasztás, bejelentkezés hiánya, hálózati hiba, valódi manifest-egyezés, külön mentések soros kezelése és azonos státuszlekérések összevonása.
- Admin: 6/6 célzott eset sikeres, a mobilos teszt látható kezelőszervekre javítása után. Lusta betöltés, szerkesztések megőrzése, ütközés, mentés/visszaolvasás, külön publikációs állapot, dashboard, kézi időpont, árkalkulátor és mobilos szerkesztő. A képernyőkép 390 px szélességen vizuálisan is ellenőrizve.
- Vendégfiók: regisztráció/megerősítés, jelszó-visszaállítás, saját profil/előzmények, lemondás, foglalási előkitöltés és mobilos nézet célzott tesztjei sikeresek. A tesztek helyi mockokat írnak, nem a közös adatbázist.
- Navigáció és JavaScript nélküli publikus tartalom: a kapcsolódó célzott ellenőrzések sikeresek.
- `git diff --check`: sikeres. A meglévő HTML-sablonok látható szövege változatlan; csak eszközverziók frissültek. A `dist` a Supabase-ben már mentett nyilvános tartalmat rendereli.

A korábbi, tágabb böngészős körben két meglévő teszt elavult elvárás miatt hibázott: `customer-account.spec.js:128` a kiinduló HTML-ben sem létező `.hero-primary` elemet keresi; `studio-navigation.spec.js:127` a kiinduló HTML sorrendjétől eltérő szolgáltatások/bemutatkozás sorrendet vár. A baseline Git-tartalma igazolja mindkettőt; ehhez a munkához nem módosult a megjelenésük vagy a forrás-CSS. Ezeket nem számoljuk sikeres tesztnek.

A távoli Supabase RLS- és naplóbeállítások, a tényleges Cloudflare Build/Deploy Hook és a teljes mentés → nyilvános megjelenés folyamat felhős ellenőrzése hátravan. Nincs külön Supabase TEST projekt, és a felhasználó csak olvasást engedélyezett a közös adatbázison. A migráció nélkül az új CMS/árlista-mentés leáll; ezért a jelenlegi csomag még nem kiadható teljesen működő átállásként. Deno/platformszintű Edge Function-telepítési ellenőrzés sem történt.

A korábbi fejlesztői függőségek npm-audit jelzései változatlan verziókon maradtak; a módosítás nem frissítette őket és nem vezette be ezeket a jelzéseket. A csomagolt webhely nem tartalmaz npm-eszközöket vagy `node_modules`-t.

## Pontos helyi fájlkör

Az alábbi lista a munkafában látható, ehhez a megvalósításhoz tartozó fájlokat tartalmazza. A `.gitignore` és `DEVELOPMENT.md` korábbi helyi változtatásai megmaradtak; az `AGENTS.md` korábbi útvonaljavítását és a már meglévő `.impeccable/mocks` tervfájlokat ez a feladat nem módosította. A `.github/workflows/pages.yml` törölt fájl, a bundle-ök és a HTML eszközverziói generált frissítések.

- `.github/workflows/pages.yml`
- `.gitignore`
- `404.html`
- `DEVELOPMENT.md`
- `account.js`
- `adatkezeles/index.html`
- `adatok.json`
- `admin-content.js`
- `admin-supabase.js`
- `admin/index.html`
- `arlista/index.html`
- `booking.js`
- `deployment.json`
- `docs/static-publication.md`
- `fiokom/index.html`
- `foglalas/index.html`
- `galeria/index.html`
- `gel-lakk-tatabanya/index.html`
- `index.html`
- `korom-diszites-nail-art-tatabanya/index.html`
- `manikur-tatabanya/index.html`
- `mukorom-epites-toltes/index.html`
- `package-lock.json`
- `package.json`
- `playwright.config.js`
- `script.js`
- `scripts/build-site.js`
- `scripts/check-site.js`
- `scripts/prerender-public.js`
- `scripts/public-files.js`
- `scripts/static-server.js`
- `src/account/00-customer-account.js`
- `src/admin/00-bootstrap-auth-calendar.js`
- `src/admin/02-request-cache.js`
- `src/admin/05-admin-workspace-v2.js`
- `src/admin/10-bookings-events.js`
- `src/admin/12-customer-profiles.js`
- `src/admin/18-public-html-refresh.js`
- `src/admin/20-services.js`
- `src/admin/30-coupons.js`
- `src/admin/40-availability-settings.js`
- `src/booking/02-request-safety.js`
- `src/booking/10-form-services.js`
- `src/public/00-bootstrap.js`
- `src/public/15-public-snapshot.js`
- `src/public/30-content-rendering.js`
- `src/public/40-footer-forms.js`
- `supabase-config.js`
- `supabase/functions/_shared/public-snapshot.mjs`
- `supabase/functions/_shared/publication-handler.mjs`
- `supabase/functions/create-booking-with-email/index.ts`
- `supabase/functions/publish-live-site-content/index.ts`
- `supabase/functions/publish-site-content/index.ts`
- `supabase/functions/send-booking-email/index.ts`
- `supabase/migrations/20261028132648_static_publication.sql`
- `tests/admin-production-redesign.spec.js`
- `tests/admin-public-html-refresh.spec.js`
- `tests/static-publication.spec.js`
- `tests/unit/publication-sql.test.mjs`
- `tests/unit/publication.test.mjs`
- `tests/unit/site-build.test.mjs`
- `wrangler.jsonc`
