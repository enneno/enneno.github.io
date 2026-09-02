# LumiNails design system

Ez a dokumentum a TEST felületen 2026-09-01-én kiválasztott „quiet luxury” vizuális irány és a 2026-09-02-én jóváhagyott ötszínű paletta projekt-specifikus szerződése. Az új komponenseknek és a további oldalfrissítéseknek ehhez kell igazodniuk; a LIVE felület csak külön élesítési jóváhagyással veheti át.

## Források és CSS-felelősség

- A publikus globális tokenek, reset, header, közös mező- és gombalapok forrása: `src/styles/00-base.css`.
- A publikus feature-rétegek egyetlen saját területet birtokolnak: például kezdőlap `15-home-sections.css`, foglalás `30-booking.css`, galéria és footer `13-gallery-footer-navigation.css`.
- Az admin alap-tokenek és brand primitive-ek forrása: `src/admin-styles/00-foundation.css`.
- Az admin közös mező-, gomb-, választó- és állapotkomponenseinek tulajdonosa: `src/admin-styles/10-components.css`.
- Az admin munkaterület, világos/sötét szemantikus paletta és shell forrása: `src/admin-styles/20-workspace.css`; a feature-fájlok csak saját elrendezésüket birtokolják.
- A `style.css` és `admin-v2.css` generált fájl. Közvetlenül nem szerkeszthető; forrásmódosítás után `npm run build`, CSS-változás után pedig `npm run lint:css` szükséges.
- Új késői override-réteg, másolt komponensstílus, növelt specificitás vagy `!important` nem megengedett. A `99-unified-design.css` nyugdíjazott, selector nélküli fájl marad.

## Színek

A publikus és admin felület kizárólag a felhasználó által megadott öt alapszínt, valamint ezek áttetsző változatait használja. Komponensben elsőként a szemantikus `--ui-*` vagy `--admin-v2-*` tokeneket kell használni; a régi magyar nevű változók kompatibilitási tokenek.

| Palettaszín | Token | Érték | Elsődleges szerep |
| --- | --- | --- | --- |
| Elefántcsont | `--lumi-palette-ivory` | `#f1edea` | canvas, kártya, sötét felületi szöveg |
| Púder | `--lumi-palette-blush` | `#e3d0ca` | lágy panel, finom elválasztó |
| Agyag | `--lumi-palette-clay` | `#d0b4a8` | dekoratív kiemelés |
| Karamell | `--lumi-palette-caramel` | `#b39178` | hangsúlyosabb keret, másodlagos kiemelés |
| Kakaó | `--lumi-palette-cacao` | `#806353` | fő szöveg, CTA, sötét felület |

| Szerep | Token | Érték | Használat |
| --- | --- | --- | --- |
| Elsődleges brand | `--ui-primary` | `#806353` | CTA, brand felület, kiválasztott állapot |
| Elsődleges felületi szöveg | `--ui-on-primary` | `#f1edea` | primary háttéren |
| Accent | `--ui-accent` | `#806353` | interaktív kiemelés megfelelő kontraszttal |
| Accent szöveg | `--ui-on-accent` | `#f1edea` | accent háttéren |
| Oldalháttér | `--ui-bg` | `#f1edea` | publikus canvas |
| Kártyafelület | `--ui-surface` | `#f1edea` | mező, kártya, panel |
| Lágy felület | `--ui-soft` | `#e3d0ca` | másodlagos elkülönítés |
| Erős szöveg | `--ui-off-black` | `#806353` | címek, szolgáltatásblokk, footer |
| Halk szöveg | `--ui-muted` | `#806353` | másodlagos szöveg világos felületen |
| Elválasztó | `--ui-line` | `rgba(128, 99, 83, 0.14)` | finom border |
| Erős elválasztó | `--ui-line-strong` | `rgba(128, 99, 83, 0.28)` | aktív vagy hangsúlyos border |

Az admin v2 külön szemantikus tokeneket használ (`--admin-v2-bg`, `surface`, `ink`, `muted`, `brand`, `border`). Állapotokhoz továbbra is a `success`, `warning`, `danger` és `info`, illetve a hozzájuk tartozó `*-soft` párok használhatók, de ezek értékei is az öt jóváhagyott alapszínből származnak. A státuszok megkülönböztetését ezért a felirat és az ikon is hordozza. A sötét mód értékei ugyanabban a `20-workspace.css` fájlban, `html[data-admin-theme="dark"]` alatt élnek.

Színnel önmagában nem jelölünk állapotot. Normál szövegnél alapértelmezett páros a kakaó `#806353` és az elefántcsont `#f1edea` (4.71:1); a köztes három árnyalat elsősorban nem szöveges felület, border vagy dekoráció. Minden normál szöveg célértéke legalább 4.5:1, nagy szövegé és nem szöveges vezérlőé legalább 3:1.

## Tipográfia

- Display és nagy cím: `Cormorant Garamond`, tartalék `Georgia, serif`.
- Törzsszöveg és admin UI: `Manrope, sans-serif`.
- Gombszerep: `--lumi-button-font`, jelenleg `Outfit` → `Montserrat` → sans-serif; admin v2-ben a közös komponensszabály dönthet Manrope mellett.
- `Montserrat` és `Outfit` csak meglévő komponensszerep vagy kompatibilitási fallback miatt használható; új, ötödik betűcsalád nem vezethető be.

Megosztott szerepek asztalon: micro 11 px, caption 13 px, label 14 px, body-small 16 px, body 18 px, lead 19 px, control 18 px. A 768 px alatti publikus skála rendre 10, 12, 13, 14, 16, 17 és 16 px. Interaktív mobil mező számított mérete legalább 16 px legyen az iOS automatikus nagyítás elkerüléséhez.

A nagy editorial címek `clamp()`-et használhatnak, de hosszú magyar szó esetén 320–390 px között is törniük kell. Új címstílus előtt ellenőrizendő a 375 px-es és 390 px-es szélesség.

## Térköz és elrendezés

A preferált alaprács 4 px; komponenseken belül 4/8/12/16/24/32, szekciók között 48/64/72/96/112 px használható. Meglévő közös tokenek:

- `--ui-gutter: clamp(20px, 5vw, 76px)`;
- `--lumi-container-width: min(1400px, calc(100% - 40px))`;
- `--lumi-section-gap: clamp(72px, 8vw, 112px)`;
- mobil szekcióköz 64 px, kis szekcióköz 52 px;
- cím–leírás távolság 28 px.

Új nyers spacingérték csak valódi feature-eltéréshez kerülhet a feature-fájlba. Ismétlődő értéknél előbb közös tokent kell választani vagy létrehozni a megfelelő foundation rétegben.

## Lekerekítések és árnyékok

- Pill: `--lumi-radius-pill: 999px`.
- Publikus kártya: `--lumi-radius-card: 24px`.
- Mező és alap vezérlő: `--lumi-radius-control: 14px`.
- Admin kompakt vezérlő: `--admin-ui-control-radius: 11px`; auth felületen 12 px.
- Lágy általános árnyék: `--lumi-soft-shadow: 0 16px 38px rgba(128, 99, 83, 0.10)`.
- Publikus gombárnyék: `--lumi-button-shadow: 0 14px 30px rgba(128, 99, 83, 0.18)`.
- Admin munkaterület árnyék: `--admin-v2-shadow`, témafüggő értékkel.

Egy felületi szinten egy radius- és egy árnyékhierarchia használható. A shadow nem helyettesíti a bordert, ha az állapot vagy a felülethatár kontrasztja szükséges.

## Komponensek és állapotok

### Gombok

- A közös `.gomb` az alap; feature csak elrendezést vagy szemantikus variánst módosíthat.
- Mobil érintési cél legalább 44 × 44 px, admin tokenje `--admin-ui-touch-target: 44px`.
- Minden gombnak legyen alap, hover (csak finom pointeren), `focus-visible`, disabled és szükség esetén loading állapota.
- Ikon-only gombhoz kötelező az elérhető név; dekoratív ikon `aria-hidden="true"`.

### Mezők

- A közös `.urlap-mezo` birtokolja a mező alapmegjelenését; az admin komponensréteg a kompakt admin variánst.
- Látható `<label>` szükséges. A hiba a mező mellett jelenjen meg, és kapcsolódjon `aria-describedby`/`aria-invalid` attribútummal.
- Focus állapothoz a `--lumi-control-border-strong` és `--lumi-control-focus` rendszer használható; fókuszgyűrűt eltávolítani tilos.
- Disabled állapot szemantikailag is disabled legyen; placeholder nem lehet az egyetlen címke.

### Kártyák

- Publikus tartalomkártya: meleg surface, 24 px-es alapradius; kompakt választók 12–14 px-es radiust használhatnak.
- Foglalási választók alapfelelőse a `30-booking.css`.
- Admin kártya és panel alapja a `10-components.css`; foglalás-, kupon-, elérhetőség- vagy CMS-fájl csak saját belső layoutját adhatja hozzá.

### Állapotok

- Success, warning, danger és info admin tokenpárral készül.
- A státusz szöveges címkét vagy ikont is kapjon; szín önmagában nem elég.
- Beküldéskor loading, majd egyértelmű siker- vagy hibajelzés szükséges. A hibaüzenet ne törölje a kitöltött adatot.

## Mobil és asztali szabályok

- Elsődleges publikus váltópont: 768 px. Feature-specifikus 480/640/700/900/1100 px csak meglévő komponensigényhez használható; új breakpoint előtt keresni kell meglévő megfelelőt.
- Kötelező ellenőrzési szélességek: 375 és 390 px mobil, 1280 vagy 1440 px asztal. Reszponzív változásnál portré és szükség esetén 844 × 390 landscape is ellenőrizendő.
- Mobilon nincs vízszintes dokumentumgörgetés; hosszú cím, azonosító és magyar összetett szó törését külön mérni kell.
- Publikus oldalon a nagyítás engedélyezett. Az admin standalone PWA nagyítási tilalma szándékos és csak külön utasításra változhat.
- Hover nem lehet az egyetlen visszajelzés. `prefers-reduced-motion: reduce` esetén az érdemi animáció leáll vagy azonnal befejeződik.
- Fix/sticky fejléc vagy alsó sáv nem takarhat fókuszt, tartalmat vagy mobil safe-area területet.

## Változtatás előtti gyors döntési sorrend

1. Keresd meg az elem egyetlen jelenlegi CSS-tulajdonosát.
2. Használd a meglévő szemantikus tokent és komponenst.
3. Új variánst csak szemantikus eltéréshez adj hozzá.
4. Válaszd a változás kockázatához illő legszűkebb ellenőrzést.
5. A kritikus nézet érintésekor futtasd a `test:visual`; interakció vagy hozzáférhetőség érintésekor a `test:a11y` célzott parancsot is.
