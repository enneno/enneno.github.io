# Hero és bemutatkozás: ellenőrzés

A felhasználó kifejezetten ezt kérte: külön fejléc → nagy hero → közvetlenül Szofi bemutatkozása. A helyi gyökér ezt az egy új előnézetet mutatja. Utána szolgáltatások, galéria, foglalási meghívó és lábléc következik. Az előző három változat nincs a kimenetben.

- node design-preview/build.mjs: sikeres.
- npm run lint:css és a külön preview.css lintje: sikeres.
- 320/390/768/1440 px: nincs oldalszintű vízszintes túlcsordulás, hibás kép, külső kérés vagy JavaScript-hiba.
- A hero közvetlen következő szakasza minden méreten a bemutatkozás. A legújabb, overlayes változatnál 320/390/768/1440px-en mértük: a kép kitölti a hero teljes területét, a hero alja a fejléc/értesítő alatti nyitó viewport aljához igazodik, van sötét overlay és világos szöveg.
- Mobilmenü, képnagyítás, Escape és fókusz-visszaadás: sikeres.
- Mind a 19 jelenlegi szolgáltatásnév és ár változatlan.
- Belső SQL-útvonal és a korábbi /a/ előnézet 404-et ad.
- Impeccable-detektor egyszer futott az új oldalon: a rögzített márkapalettát és a padding-block rövidítéssel írt, kézzel megfelelőnek ellenőrzött térközöket jelölte.
- A friss, független finish reviewer eredménye: ship for preview; nincs érdemi hiba a kért előnézet körében. A legutolsó overlayes hero külön, szűkített review-ja is ship for preview eredménnyel zárult.
- Képernyőképek és gépi jegyzőkönyv: .impeccable/review/hero-about-20261028 és .impeccable/review/fullscreen-hero-20261028, gitignore alatt.

Csak helyi Chromium-szélességemuláció történt, fizikai készülékes vagy teljes hozzáférhetőségi tanúsítás nélkül. Nem futott teljes tesztcsomag, éles foglalás vagy Supabase-írás. A foglalási és fiókműveletek a jelenlegi éles oldalra mutatnak. A main ág, az admin, az éles oldal és az adatbázis változatlan maradt. GitHubon nem fut teszt vagy audit.

## Fájlok

Módosított meglévő fájl: package.json, csak ezen a külön preview ágon a build célja változik. A feladathoz létrehozott, végleges előnézeti fájlok:

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
- design-preview/media/hero.jpg
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

## Új ellenőrzés: mindig látható fejléc és színek

- Célzott check-colors.mjs: 320/390/768/1440px-en nincs túlcsordulás vagy JavaScript-hiba. A fejléc a lap aljáig látható, a menü horgonyai a fejléc alatt maradnak, a nyitó hero továbbra is kitölti a fennmaradó képernyőt.
- Mindhárom paletta működik; az árlistára lépés megtartja a választást. Látható pipa és aria-pressed állapot jelöli a kijelölt gombot.
- Tényleges számított kontraszt: szöveg ≥11,37:1; elsődleges gomb/lábléc ≥6,28:1; színes cím a tónusos bemutatkozás hátterén ≥5,12:1. Ezek a vizsgált színpárok, nem teljes WCAG-tanúsítás.
- A jelölő pipa frissítése után csak a 320/390/1440 tördelést és az érintett képernyőképeket ellenőriztük újra.
- CSS-lint és a külön előnézeti CSS lintje sikeres. Új egyszeri detektor: padding-block jelzések kézi ellenőrzéssel megfelelőek; a színeltérési jelzések a gyökér kanonikus DESIGN.md és az engedélyezett, kizárólag preview színkísérlet különbségét jelölik. A gyökérdokumentumot nem módosítottuk és a jelzéseket nem tiltottuk le.
- Képek és gépi jegyzőkönyv: .impeccable/review/sticky-colors-20261028. Új forrásfájl: design-preview/check-colors.mjs.
- Módosított források ebben a körben: design-preview/build.mjs, preview.css, preview.js, README.md, DESIGN.md, design.json, verification.md. A korábbi független review a hero előző állapotára vonatkozik; a mostani szűkített szín- és sticky ellenőrzés a fenti helyi bizonyíték.
