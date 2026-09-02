# LumiNails design system

Ez a TEST projekt Figma-alapú vizuális szerződése. A referencia a `fNgCClNjs47gqVBvCZj8KG` Figma-fájl; a LIVE felület csak külön élesítési jóváhagyással veheti át.

## Források és felelősség

- A publikus tokenek, header, közös gomb- és mezőalapok tulajdonosa: `src/styles/00-base.css`.
- A kezdőlap, galéria/footer, árlista, fiók és foglalás saját elrendezése a megfelelő számozott feature-CSS-ben él.
- Az admin tokenek forrása: `src/admin-styles/00-foundation.css`; a workspace témája: `src/admin-styles/20-workspace.css`.
- A közös publikus footer markupja kizárólag a `src/public/20-shell-coupons.js` fájlban él.
- A `style.css` és `admin-v2.css` generált fájl; közvetlenül nem szerkeszthető.
- Tilos az `!important`, a duplikált override-réteg és egy komponens alapstílusának több tulajdonoshoz osztása.

## Színek

| Szerep | Token | Érték |
| --- | --- | --- |
| Rózsaszín brand / CTA | `--ui-primary` | `#dd8ea4` |
| Sötét tinta / footer | `--ui-off-black` | `#31383f` |
| Szöveg sötét felületen | `--ui-on-dark` | `#f2e9eb` |
| Oldalháttér | `--ui-bg` | `#e3dcd2` |
| Világos felület | `--ui-surface` | `#f2e9eb` |
| Terrakotta kiegészítő | `--ui-warm` | `#cc8b65` |
| Másodlagos szöveg | `--ui-muted` | `#62686d` |
| Finom elválasztó | `--ui-line` | `rgba(221, 142, 164, 0.19)` |
| Erős elválasztó | `--ui-line-strong` | `rgba(49, 56, 63, 0.28)` |

Komponensben szemantikus tokent kell használni. A publikus és admin light mód ugyanazt a palettát használja; az admin sötét mód saját, szemantikailag azonos állapottokeneket tart meg. Success, warning, danger és info állapotnál a szín mellé szöveg vagy ikon is szükséges.

## Tipográfia

- Display és nagy cím: `Playfair Display`, tartalék `Georgia, serif`.
- Törzsszöveg, gomb, mező és admin UI: `DM Sans`, tartalék `sans-serif`.
- Alapszerepek desktopon: micro 11 px, caption 13 px, label 14 px, body-small 16 px, body 18 px, lead 19 px, control 18 px.
- Mobilon a mezők számított mérete legalább 16 px legyen; a nagy címeknek 375 és 390 px szélességen is túlcsordulás nélkül kell törniük.

## Térköz és elrendezés

- Alaprács: 4 px. Gyakori értékek: 8, 12, 16, 20, 24, 32, 48, 64, 72, 96 és 112 px.
- Közös gutter: `--ui-gutter: clamp(20px, 4.3vw, 80px)`.
- Közös tartalomszélesség: `--lumi-content-width: 1200px`.
- Közös szekció-padding: `--lumi-section-padding-inline` és `--lumi-section-padding-block`.
- A kezdőlapi hero és bemutatkozás szándékosan teljes szélességű split szekció. A belső tartalom és a többi szekció a közös gutterhez igazodik.
- A dokumentum flex oszlopként legalább a viewport magasságát kitölti, ezért a footer után nem jelenhet meg üres oldalháttér.

## Lekerekítések és árnyékok

- Kártya: `--lumi-radius-card: 4px`.
- Mező és alap vezérlő: `--lumi-radius-control: 3px`.
- Pill kizárólag valódi chiphez vagy kör alakú vezérlőhöz: `--lumi-radius-pill: 999px`.
- Árnyék ritkán használható; alapérték: `--lumi-soft-shadow`. Felülethatárhoz elsőként finom border tartozik.
- Egymásba ágyazott kép és caption egyetlen közös külső formát alkot; belső, egymást metsző lekerekítés nem használható.

## Komponensek

- **Gomb:** a `.gomb` az alap; legalább 44 px magas, látható `focus-visible`, külön disabled/loading állapottal.
- **Mező:** látható label, mobilon legalább 16 px betűméret, hiba esetén `aria-invalid` és kapcsolt hibaüzenet.
- **Kártya:** világos surface vagy sötét showcase; a háttérkép felett olvashatóságot adó overlay kötelező.
- **Galériakártya:** minden képen ugyanaz a sötét, áttetsző szövegháttér jelenik meg; nem csak az elsőn.
- **Footer:** minden publikus oldal ugyanazt a dinamikusan betöltött, sötét homepage footert használja.

## Mobil és asztali szabályok

- Elsődleges breakpoint: 768 px. A 480/640/900/1100 px csak valódi komponensigényhez használható.
- Kötelező reprezentatív nézetek: 390 × 844 és 1440 × 1000.
- Mobilon egyoszlopos hero, galéria, árlista és foglalási utak; desktopon a Figma szerinti split vagy kétoszlopos elrendezés.
- Nincs vízszintes dokumentumgörgetés, levágott cím vagy 44 px-nél kisebb elsődleges érintési cél.
- A publikus nagyítás engedélyezett. Az admin standalone PWA nagyítási tilalma változatlan.
- `prefers-reduced-motion: reduce` esetén az érdemi animáció kikapcsol.

## Módosítás utáni minimum

1. Git diff és CSS-tulajdon ellenőrzése.
2. `npm run lint:css`, majd forrásból build.
3. Csak az érintett desktop és mobil nézetek célzott vizuális ellenőrzése.
4. Interakció vagy kontraszt változásakor célzott Playwright/accessibility ellenőrzés.
