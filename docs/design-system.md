# LumiNails design system

A jelenlegi **helyi** felület a felhasználó által választott első/A stúdiótervet és Ivory & Taupe palettát követi, saját CMS-nyitóképpel és öt meglévő galériaképpel. A kezdőlap három választható nézetből áll. Nincs push vagy LIVE-változás.

Részletes vizuális szabályok/tokenek: `DESIGN.md`; megjeleníthető komponensek: `.impeccable/design.json`. A futó megjelenés forrása a CSS. A korábbi paletták/elrendezések történeti referenciák.

## Színek és tipográfia

| Árnyalat | Szerep |
| --- | --- |
| Ivory `#F6F3EE` | Publikus háttér/felület; sötét admin fő szöveg |
| Bézs `#E2D9D0` | Műveleti/kiegészítő felület; sötét admin kiegészítő szöveg |
| Taupe `#B8A89B` | Keret és dekoratív hangsúly |
| Clay `#A08075` | Dekoráció, nem halvány kis szöveg |
| Charcoal `#3E3935` | Világos felület szövege, aktív jelölés, sötét admin háttér |

A szemantikus `--ui-*` és `--admin-v2-*` változókat kell használni. A régi színnevek kompatibilitási aliasok, nem külön paletta. A foglalási/siker/figyelmeztetés/hiba állapotszínek önállók. A sötét admin kártyái charcoal–ivory keverékek, nem azonosak a háttérrel.

DM Sans: törzsszöveg, általános címek és működési vezérlők. Reddit Sans Condensed 300: kizárólag a kezdőlapi három nézetválasztó. Playfair Display: meglévő Lumi szólogó. Kis szöveg kontrasztja legalább 4,5:1; nagy szöveg/lényeges nem-szöveges állapot legalább 3:1. A clay nem megfelelő kis charcoal felirathoz.

## Térközök, alakok és állapotok

- Általános tartalom max1200px; közös gutter `clamp(20px, 4.8vw, 80px)`. A nagy stúdiófotó szándékosan teljes szélességű.
- Kezdőlapi szolgáltatás/bemutatkozás nézet: mobilon 24px felül, 40px alul és a közös 20px-es oldalpadding; asztalon 20px felül, 48px alul és közös gutter. Más oldalak a saját közös szekciótokenjeiket használják.
- Közös vezérlősugár8px, kártya16px, kör/chip999px. Megőrzött helyi kivételek: foglalási mező14px, admin vezérlő11px, belépés12px, fiókgomb10px. Ezek nem új globális sugárlépcsők.
- Gomb: bézs/charcoal; sötét hover/ivory; látható fókusz. Aktív nézet és bélyegkép: kontrasztos aláhúzás/keret, nem csak halvány színeltérés.
- Mező: ivory felület, keret, olvasható placeholder és kapcsolt hiba. A14px-es sugár nem betűméret.
- Szolgáltatás: képes, elválasztott sor. Admin: megszokott feladat-/foglaláskonténer, külön állapotjelzés.
- Fotón és bélyegképen nincs árnyék vagy szöveges overlay. Publikus soft/button és világos workspace árnyék `none`; megőrzött helyi overlay/fókusz/állapot és sötét admin árnyék külön kivétel.

## Mobil és asztali szabályok

- Mobil hero pontosan16:9, `contain`, nincs vágás/nagyító transzformáció. Asztali nyitókép széles tervkerethez igazított kivágás; választott galériafotók mindig `contain`.
- Kezdőlapi fő töréspont768px. Footer900px-től háromoszlopos; alatta tördelődik, mind a tíz oldalhivatkozással. Admin900px alatt mobilmenü.
- Publikus mobil mezőszöveg ≥16px,100%-os skálázás és `font-size-adjust: none`; publikus nagyítás szabad. Admin standalone PWA meglévő zoomszabálya változatlan.
- Mobil publikus célterület ≥44px; admin kompakt gombjain kiterjesztett érintési terület. Asztali sűrű footer-link ≥24px.
- Nézetek: közvetlen URL-horgony, billentyűzetes váltás, látható fókusz. JavaScript nélkül minden tartalom és oldalhivatkozás megmarad.
- Lapozás: elődekódolás, utolsó kérés nyer, hiba esetén korábbi sikeres kép és szöveges visszajelzés.
- Rövid állapotátmenetek; reduced-motion esetén nincs stúdiónézet-animáció. Induló tartalom nem vár animációra.

## Források és felelősség

- Tokenek/fejléc/közös gomb és mező: `src/styles/00-base.css`.
- Kezdőlapi nézetek/szolgáltatássor/bemutatkozás: `15-home-sections.css`; bélyegképsor: `16-home-gallery.css`; választó/fotó/vezérlők: `18-hero-inner-pages.css`.
- Footer/mobilmenü/galériaoldal: `13-gallery-footer-navigation.css`; szolgáltatásoldal: `19-service-detail.css`; fiók: `25-customer-account.css`; foglalás: `30-booking.css`.
- Kezdőlapi viselkedés: `src/public/45-home-gallery-carousel.js`; CMS és közös horgonykezelés: `30-content-rendering.js`.
- Közös HTML: `src/html/site-header.html`, `site-footer.html`; prerender írja a shellt és a nyilvános CMS-tartalmat a valódi HTML-be.
- Admin tokenek: `src/admin-styles/00-foundation.css`; vezérlőgeometria: `10-components.css`; light/dark workspace: `20-workspace.css`.
- `style.css`, `admin-v2.css`, `script.js` generált: csak forrásból build. Egy alapkomponensnek egy tulajdonosa legyen; tilos az `!important` és a duplikált override-réteg.

## Módosítás utáni minimum

1. Diff és érintett CSS-tulajdon ellenőrzése.
2. Forrásváltozáskor build/asset-verziózás és célzott statikus/lint ellenőrzés.
3. Érintett asztali/mobil nézet kötegelt képi ellenőrzése; szöveg/mező javításnál lelógó betű, vágás és overflow is.
4. Csak a közvetlenül érintett helyi teszt; kis vizuális változás miatt nem teljes tesztkészlet.

Tényleges ellenőrzések, korlátok/fájllista: `docs/studio-preview.md`. Nem teljes akadálymentességi tanúsítás vagy fizikai Safari-teszt. LIVE-kiadás külön, kifejezett jóváhagyást igényel.
