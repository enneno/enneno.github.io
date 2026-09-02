# LumiNails vizuális audit

Audit dátuma: 2026-09-01. Vizsgált TEST nézetek: kezdőlap 1440 × 1000 és 390 × 844, foglalás 390 × 844, admin belépés 1440 × 1000 és 390 × 844.

## Palettafrissítés — 2026-09-02

- A felhasználó által küldött referencia alapján a teljes publikus és admin UI öt alapszínre állt át: `#f1edea`, `#e3d0ca`, `#d0b4a8`, `#b39178`, `#806353`.
- A változtatás kizárólag színeket és a hozzájuk tartozó szemantikus tokeneket érinti; tipográfia, méret, térköz, lekerekítés, elrendezés és működés nem változott.
- A normál szövegek fő párosa a kakaó és az elefántcsont, mert a két végpont 4.71:1 kontrasztot ad. A köztes árnyalatok főleg felületi, border- és dekorációs szerepet kapnak.
- A forrás-CSS-hez paletta-regressziós ellenőrzés készült, hogy későbbi módosításkor ne kerülhessen vissza idegen alapszín a publikus vagy admin bundle-be.
- A sötét admin naptár apró eseményszövege elefántcsont színt használ a kakaó háttéren; ezzel megmarad az olvashatóság az ötszínű korláton belül.

## Áttervezési frissítés — 2026-09-01

- A felhasználó külön engedélyével a kritikus TEST-nézetek megkapták az új „quiet luxury” vizuális irányt; a LIVE nem változott.
- A mobil „Bemutatkozás” és „Online időpontfoglalás” címek új, tartományra korlátozott méretezést, kiegyensúlyozott törést és szükség esetén biztonságos `overflow-wrap` viselkedést kaptak. A 390 px-es ellenőrzésben nincs dokumentumszintű vízszintes görgetés.
- A primary, surface, muted és elválasztó tokenek kontrasztosabb, meleg neutrális palettára változtak. Az admin belépési gomb mély brand hátteret kapott.
- A footer szöveges linkjeinek kattintható magassága legalább 44 px lett.
- Az accessibility ratchet a kezdőlap, foglalás és admin mobil nézetén sikeres. A korábbi nyers axe-darabszámok történeti alapértékek; az új felület aktuális hibaszámaként nem értelmezhetők.

Módszer: forrás- és CSS-felelősség-ellenőrzés, teljes oldalas Playwright-képernyőkép, DOM overflow-mérés, axe WCAG 2 A/AA–2.2 AA audit, `ui-ux-pro-max` célzott UX/typography/color keresés, valamint a 21st determinisztikus review. A 21st 33 fájlban 0 error, 0 warning és 563 információs `design-hardcoded-color` javaslatot adott; ezek nem automatikusan hibák, mert token-definíciókat és témaértékeket is számol.

Az audit során egy determinisztikus HTML-hiba célzottan javítva lett: a rejtett „Naptárba mentés” elem placeholder `href="#"` attribútuma megszűnt. A foglalási JavaScript továbbra is csak a valódi `.ics` objektum-URL létrehozása után állítja be a `href`-et és teszi láthatóvá az elemet.

## Tényleges hibák

### Megoldva — mobil címszövegek túlnyúlása

- A kezdőlapi „Bemutatkozás” `h2` 390 px-es viewporton 350 px széles dobozban 387 px tartalomszélességet igényel. A forrás: `src/styles/15-home-sections.css` mobil címszabálya 580. sor körül.
- A foglalási „Online időpontfoglalás” `h2` 358 px széles dobozban 482 px tartalomszélességet igényel. A forrás: `src/styles/30-booking.css` mobil címszabálya 1133. sor körül.
- A javítás az irányadó feature-fájlokban történt; a tipográfiai karakter megmaradt, de a címek 390 px-en már nem növelik a dokumentum szélességét.

### Kezelve — bizonyított szövegkontraszt-eltérések

- Kezdőlap mobil: axe szerint 30 `color-contrast` elem. A legnagyobb csoport a hero, a szolgáltatásblokk és a footer világos szövege a `#91766e` brand háttéren; mért arányok több helyen 2.46–4.11:1.
- Foglalás mobil: 22 `color-contrast` elem. Érintett a kicker, a választók címe/leírása/gombszövege, a kezelőcímkék és a közös footer.
- Admin mobil: a belépés gomb fehér szövege `#b9858f` háttéren 2.96:1.
- A javítás szemantikus tokenek és az admin közös gombtulajdonosának módosításával történt, komponensenkénti felülíró réteg nélkül. A célzott accessibility ratchet sikeres.

### Megoldva — két footer link mobil érintési célja

- Az e-mail link és az adatkezelési link magassága körülbelül 18–20 px, a környező szabad terület sem éri el az axe 24 px-es minimumát.
- Forrás: `src/styles/13-gallery-footer-navigation.css`, a mobil footer és `.footer-jogi-link` szabályai.
- A vizuális szöveg mérete megmaradt, a kattintható magasság 44 px-re nőtt.

## Következetlenségek és fenntartási kockázatok

- A publikus és admin bundle külön alapfájlban ismétli a brand tokenek egy részét. Ez a bundle-szétválasztás miatt jelenleg indokolt, de változtatáskor mindkét forrást össze kell vetni, különben drift keletkezik.
- A szemantikus tokenek mellett sok feature-szintű közvetlen szín maradt. A 21st review legnagyobb gócpontjai: admin workspace (86), admin foundation (63), vendégfiók (62), publikus base (60), admin foglalás (55), publikus foglalás (48). Tömeges csere tilos; csak érintett komponensenként, vizuális ellenőrzéssel szabad konszolidálni.
- A spacing részben tokenizált, részben nyers érték. Új komponensben a dokumentált 4 px-es ritmust kell követni; meglévő értékeket csak célzott refaktorban érdemes összevonni.
- A publikus editorial kártyák, a közös 28 px-es kártyaradius és az admin 11–20 px-es radiusok több vizuális nyelvet alkotnak. Ez részben szándékos környezetkülönbség; új komponens ne vezessen be további radius-szintet.
- Sok reszponzív váltópont létezik. A 768 px marad az elsődleges rendszerhatár, a többi kizárólag feature-korrekció.

## Opcionális fejlesztési ötletek

- Külön feladatban készüljön kontraszt-token mátrix a publikus brand felületekre, majd a hero → foglalás → footer sorrendben történjen a javítás.
- A két hosszú mobil címet tartalmi szóhatár, `overflow-wrap` vagy kisebb, komponensspecifikus `clamp()` segítségével lehet javítani; előtte 320/375/390 px vizuális összehasonlítás szükséges.
- A brand tokenek forrásduplikációja később build-time közös tokenfragmentből generálható, ha ez nem olvasztja össze a publikus és admin felelősségi rétegeket.
- A közvetlen színek konszolidációja csak feature-nként történjen, új vizuális változás nélkül; a 21st találatszám önmagában nem indok automatikus átírásra.

## Megőrzendő erősségek

- Jól elkülönített publikus és admin CSS-bundle, feature-tulajdonos fájlokkal.
- Látható `focus-visible` alap, szemantikus form label-ek és 16 px-es mobil mezőméret.
- Következetes Cormorant Garamond + Manrope editorial/UI párosítás; a `ui-ux-pro-max` elegáns serif + olvasható sans ajánlásával összhangban.
- Admin világos/sötét szemantikus állapottokenek, külön success/warning/danger/info párokkal.
- Reduced-motion szabályok és meglévő, kockázatalapúan futtatható célzott Playwright-tesztek.
