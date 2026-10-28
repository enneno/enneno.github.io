---
name: Lumi Nails — publikus előnézetek
description: Három összehasonlítható felépítés a meglévő Ivory & Taupe márkában.
colors:
  ivory: "#f6f3ee"
  soft-taupe: "#e2d9d0"
  taupe: "#b8a89b"
  clay: "#a08075"
  ink: "#3e3935"
  line: "rgb(62 57 53 / 20%)"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(46px, 7vw, 88px)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(30px, 4vw, 48px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  wordmark:
    fontFamily: "Playfair Display, serif"
    fontSize: "30px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.025em"
rounded:
  control: "8px"
  round: "50%"
spacing:
  gutter: "clamp(20px, 4.8vw, 80px)"
  section-gap: "clamp(56px, 7vw, 104px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-primary-hover:
    backgroundColor: "{colors.soft-taupe}"
    textColor: "{colors.ink}"
  service-selected:
    backgroundColor: "{colors.soft-taupe}"
    textColor: "{colors.ink}"
---

# Design System: Lumi Nails — publikus előnézetek

## Overview

**Creative North Star: "Ivory & Taupe, saját munkákkal"**

Ez a dokumentum kizárólag a `design-preview` elkészült, különálló csomagját írja le. A meglévő márkát, valódi fényképeket és tartalmat három eltérő felépítésben mutatja be. Nem új arculati döntés: nincs kiválasztott végleges kompozíció vagy jóváhagyott képi comp, és nem helyettesíti a projekt gyökérszintű designrendszerét.

**Key Characteristics:**

- Világos, meleg felületek, sötét szöveg, visszafogott keretek.
- Saját munkafotók és Szofi portréja; nincs generált helyettesítő kép.
- Sík elrendezés, nagy képek, folyékony tipográfia és térköz.

## Colors

Az elefántcsont a lap alapja, a sötét ink a szöveg és az elsődleges gomb színe. A soft-taupe az információs sávot, láblécet, aktív szolgáltatást és hover állapotot jelöli. A taupe a fotószalag görgetősávjában jelenik meg. A clay deklarált palettatag, de jelenleg nincs alkalmazva a komponensekre. A line áttetsző elválasztókat ad.

**The Brand Continuity Rule.** A három felépítés ugyanazt a rögzített palettát használja; a halvány árnyalatok nem helyettesítik a sötét szöveget.

## Typography

A DM Sans viszi a címsorokat, szöveget és vezérlőket. A Playfair Display csak a szóvédjegyet formázza. A két család négy helyi WOFF2 fájlból töltődik, két OFL licenccel, külső font-CDN nélkül.

A frontmatter az alap hierarchiát rögzíti. A törzsszöveg legfeljebb 65ch széles; a kisebb kísérőszövegek és címkék 11–15px közöttiek. A C részletcíme 28px, desktopon 24px; az árlista szakaszcíme 30px. Az áraknál tabuláris számjegyek, törésmentes árérték és külön sorba kerülő időtartam segíti az olvasást.

## Layout

A tartalmi szélesség legfeljebb 1200px, kétoldali folyékony margóval. Az alapnézet egyoszlopos, legalább 320px szélességre készül. 640px-től a galéria kettőről három oszlopra vált, több közös szakasz kétoszlopossá válik. 900px-től jelenik meg az asztali navigáció és a háromoszlopos tervválasztó.

| Útvonal | Megvalósult kompozíció | Mobilviselkedés és kompromisszum |
| --- | --- | --- |
| `/a/` — Portfólió | Rövid szöveg és aszimmetrikus háromképes nyitófal; utána munkák, szolgáltatások, Szofi és foglalási átvezető. Desktopon a nyitófelület kétoszlopos. | A nyitószöveg a képfal elé kerül; a munkák kétoszloposak. Az árakhoz hosszabb görgetés vezet. |
| `/b/` — Fotószalag | A nyitógaléria hét portréképet mutat natív, vízszintes scroll-snappel; alatta szolgáltatások, Szofi és foglalási átvezető. | A képkocka a szalag 76%-a, 640px-től 45%, desktopon 320–460px. Húzás és külön nyilak segítik a böngészést. |
| `/c/` — Válassz szolgáltatást | Négy szolgáltatásgomb és az aktív szolgáltatás fotója, leírása, árai; utána munkák, Szofi és foglalási átvezető. Desktopon a választó mellett a kép és szöveg is oszlopokra válik. | A gombok, kép és részletek egymás alatt jelennek meg. A hosszabb árlisták több görgetést kérnek. |

A `/` választó három, kattintható miniatűrt és megnyitó linket tartalmaz. A miniatűrök nem interaktív, lekicsinyített iframe-ek; a teljes változat külön útvonalon működik. A közös `/arlista/` oldal a pillanatkép mind a 19 szolgáltatásnevét és árát tartalmazza, a `v` paraméter megőrzi a választott változat visszalinkjeit.

## Elevation & Depth

Nincsenek dobozárnyékok. A mélységet tónusváltás, vékony elválasztó és a képnagyító sötét áttetsző háttere adja. Nincs automatikus galériamozgás; a gombok rövid színátmenetet használnak. A reduced-motion beállítás kikapcsolja ezt és a sima görgetést.

## Shapes

A munkaképek túlnyomórészt álló, 3:4 arányú kivágások; a C részletképe mobilon 4:3. A nagyító és Szofi portréja az egész kép megőrzéséhez `contain` illesztést használ. A képek és tartalmi szakaszok sarkosak, az akciógombok és a mobil menü finoman kerekítettek; a fotószalag két nyila kör alakú.

## Components

- **Akciógombok:** elsődleges sötét, másodlagos átlátszó felület, vékony keret, legalább 50px magasság. Hoverkor soft-taupe felület; látható fókuszgyűrű (2px, 5px eltartás). A szöveges linkek aláhúzottak és legalább 44px magasak.
- **Navigáció:** desktopon vízszintes linkek és foglalásgomb; 900px alatt natív `details` menü, 44px-es nyitóvezérlővel. Linkválasztás után bezárul. Minden változatból elérhető a tervválasztó; az oldal elején tartalomra ugró link található.
- **Képnagyító:** a munkafotók natív modális `dialog` elemet nyitnak. Bezárógombbal és Escape-pel zárható; bezáráskor a fókusz a megnyitó fényképre tér vissza. A kép felirata és alternatív szövege a választott fotót követi.
- **Fotószalag:** natív görgetés, 44px-es előző/következő gombok; a fókuszált szalagon a bal/jobb nyíl egy képkockával lapoz. Nem lapoz automatikusan.
- **Szolgáltatásválasztó:** normál gombcsoport `aria-pressed` állapottal; egyszerre egy részletpanel látható. Nincs külön tab-billentyűzeti modell.
- **Árlista:** szemantikus leírólista, bal oldalon név és időtartam, jobb oldalon ár. Nincs szerkeszthető mező, foglalási űrlap vagy fiókkomponens ebben a csomagban.

## Do's and Don'ts

- **Do** a `preview.css`, `preview.js` és `build.mjs` forrását tekintsd az előnézet megvalósításának alapjául; a tokenek ezt a pillanatnyi állapotot dokumentálják.
- **Do** őrizd meg a nyolc meglévő fotót, beágyazott eredetadataikat és a `media/provenance.json` nyilvántartását; az árak és szövegek az `adatok.json` pillanatképéből származnak.
- **Do** a három kompozíciót előnézeti választási lehetőségként kezeld. A review kiadhatónak ítélte ezt az összehasonlítási csomagot, végleges redesign kiválasztása nélkül.
- **Don't** tekintsd a foglalás-, fiók- vagy szolgáltatáslinket helyi alkalmazásfunkciónak: ezek a jelenlegi éles oldalra vezetnek. Nincs backend-, Auth- vagy API-hívás, adatírás vagy foglalási próba.
- **Don't** következtess az előnézetből admin/PWA-változtatásra vagy LIVE-kiadási engedélyre. A csomag noindex/nofollow és robots Disallow jelölést kap; az éles projekt nem módosult.
- **Don't** állíts teljes akadálymentességi vagy fizikai készülékes igazolást. A meglévő helyi Chromium-ellenőrzés 320/390/768/1440px szélességre, célzott interakciókra és média/JS/túlcsordulás hibákra terjedt ki; 390/1440px-en hat változatkép és frissített választóoldali kép készült. A `.impeccable/review/public-preview-20261028/detector-notes.md` rögzíti a teljes ellenőrzési előzményt; a `checks.json` csak a végső szűkített futás eredménye.
