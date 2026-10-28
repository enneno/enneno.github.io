# Ellenőrzés és fájllista

Három helyi, működő publikus látványváltozat. Az éles weboldal, az admin, a Supabase-adatbázis és a TEST main változatlan. Külön ág: codex/public-redesign-preview. A Cloudflare preview build csak a helyileg már ellenőrzött csomagot készíti el; GitHubon nem fut teszt vagy audit.

## Ellenőrzések

- Helyi build és a JavaScript-források szintaktikai ellenőrzése sikeres.
- npm run lint:css és a külön preview.css Stylelint-ellenőrzése sikeres; git diff --check sikeres.
- A/B/C 320, 390, 768 és 1440 px-en: nincs oldalszintű vízszintes túlcsordulás, hibás betöltött kép, külső API-kérés vagy JavaScript-hiba.
- Mobilmenü nyitás/navigáció/zárás; képnagyítás/Escape/fókusz-visszaadás; B lapozógomb és billentyűzet; C szolgáltatásválasztás és árváltás ellenőrizve.
- Mind a 19 eredeti szolgáltatásnév és ár egyezik. Az árlista aggregáló tesztszelektorának javítása után csak a záró rész ismétlődött; a többi sikeres tesztet nem futtattuk újra.
- A választó iframe-jei eager betöltést kaptak. A frissített képernyőkép mindhárom gyermekdokumentum, font és kép betöltése után készült.
- A C saját portfóliófotóinak javítása után kizárólag a C képei és 390/1440 képernyőképei frissültek.
- Az egyszeri Impeccable-detektor a szándékos márkapalettát, a padding-block szabályokat és az üres zárt nagyítóképet jelezte. A nagyító valós kezdőképet kapott; a sorok tényleges térköze megfelelő. Részletek az ignored review-mappa detector-notes.md fájljában.
- A független finish reviewer végső eredménye: ship, kizárólag a három terv összehasonlítható előnézeti bemutatásának körében.
- Képek eredete beágyazva; 8 raszter, 0 hiányzó eredet. A betűk két OFL-licence a kiadás része.
- A nem publikus SQL-útvonal 404-et ad; a csomag noindex/nofollow és robots Disallow védelemmel készül.

Ez Chromium-szélességemuláció; fizikai mobilkészülék, teljes hozzáférhetőségi tanúsítás és valódi éles foglalási teszt nem történt. A foglalási, fiók- és szolgáltatásrészlet-linkek a meglévő éles oldalra vezetnek. Nincs kiválasztott végleges terv vagy élesítési jóváhagyás.

## Módosított fájl

- package.json: kizárólag ezen a külön ágon az előnézet buildje.

## Létrehozott fájlok

- design-preview/DESIGN.md
- design-preview/README.md
- design-preview/build.mjs
- design-preview/check.mjs
- design-preview/design.json
- design-preview/media/OFL-DM-Sans.txt
- design-preview/media/OFL-Playfair-Display.txt
- design-preview/media/font-363014d7c907.woff2
- design-preview/media/font-3bfe4586eb9a.woff2
- design-preview/media/font-3cb6b7b1979e.woff2
- design-preview/media/font-713ca32c3c8b.woff2
- design-preview/media/fonts.css
- design-preview/media/provenance.json
- design-preview/media/szofi.jpg
- design-preview/media/work-1.jpg
- design-preview/media/work-2.jpg
- design-preview/media/work-3.jpg
- design-preview/media/work-4.jpg
- design-preview/media/work-5.jpg
- design-preview/media/work-6.jpg
- design-preview/media/work-7.jpg
- design-preview/prepare-assets.mjs
- design-preview/preview.css
- design-preview/preview.js
- design-preview/serve.mjs
- design-preview/verification.md

A generált dist és a .impeccable/review/public-preview-20261028 képernyőképei/jegyzetei gitignore alatt maradnak. A korábban meglévő .impeccable/mocks tervfájlok nem módosultak.
