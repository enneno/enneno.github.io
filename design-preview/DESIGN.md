---
name: Lumi Nails — hero és bemutatkozás
description: Teljes képernyős nyitókép ráhelyezett szöveggel, közvetlen bemutatkozással.
colors:
  canvas: "#fff8f7"
  soft: "#f5e1e8"
  ink: "#392630"
  accent: "#873b59"
  accent-strong: "#65283f"
  on-accent: "#fffaf7"
  line: "rgb(85 34 52 / 22%)"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(44px, 5.3vw, 76px)"
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
spacing:
  gutter: "clamp(20px, 4.8vw, 80px)"
  section-gap: "clamp(56px, 7vw, 104px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.on-accent}"
---

# Design System: Lumi Nails — hero és bemutatkozás

## Overview

**Creative North Star: "Lumi Nails, saját munkákkal és színpróbákkal"**

Ez a dokumentum csak a különálló `design-preview` csomag aktuális állapotát írja le. A felhasználó által rögzített sorrend: külön fejléc menüvel → teljes képernyős hero, a képre helyezett címmel és foglalási gombbal → közvetlenül Szofi bemutatkozása. Utána szolgáltatások, munkák, foglalási meghívó és lábléc következik. Az aktív vendégértesítő a fejléc alatt, a főtartalom és a hero előtt marad.

A felhasználó kérésére a fejléc görgetéskor is látható, és három élénkebb, váltható színpróba készült. Ezek kísérleti előnézeti paletták; nincs végleges arculatválasztás, képi comp vagy LIVE-jóváhagyás. A dokumentum nem helyettesíti a projekt gyökérszintű designrendszerét.

**Key Characteristics:**

- Mályva, Terrakotta és Zsálya színpróba; hangsúlyos gombok, címek és lábléc.
- Görgetéskor is látható, tömör hátterű fejléc; teljes képernyős saját nyitókép ráhelyezett szöveggel.
- A hero után közvetlen, teljes szélességű tónusos bemutatkozósáv saját portréval.

## Colors

A frontmatter a kezdő Mályva palettát rögzíti; a váltható készletek pontos értékei a `design.json` kiterjesztésében vannak. A canvas az oldal és a fejléc háttere, valamint a hero szövege. A soft az értesítő, bemutatkozósáv, képhely és kijelölt palettagomb felülete; az ink a törzsszöveg. Az accent színezi az akciókat, szakaszcímeket, fejlécbeli szóvédjegyet és láblécet; az accent-strong az elsődleges hover. Az on-accent a színes gombok és lábléc közös világos szövege, a line az elválasztó.

| Előnézeti paletta | Accent | Erősebb accent | Canvas | Soft | Ink |
| --- | --- | --- | --- | --- | --- |
| Mályva — alapértelmezett | #873b59 | #65283f | #fff8f7 | #f5e1e8 | #392630 |
| Terrakotta | #96452f | #74321f | #fff8f0 | #f4dfd2 | #3c2920 |
| Zsálya | #3c6655 | #294d3e | #f8fbf5 | #e1ecdf | #243c32 |

**The Preview Color Rule.** A színpróbák az előnézethez tartoznak; egyik sem végleges arculati döntés. Az accent a hangsúly, az ink a törzsszöveg.

## Typography

A DM Sans viszi a címsorokat, szöveget és vezérlőket. A Playfair Display csak a szóvédjegy betűje. A két család négy helyi WOFF2 fájlból töltődik, két OFL licenccel; nincs külső font-CDN.

A display token a hero címét írja le; az árlista és hibaoldal alap H1 mérete `clamp(46px, 7vw, 88px)`. A törzsszöveg legfeljebb 65ch; a hero leírása 55ch, desktopon 18px. A bemutatkozás és szolgáltatásszöveg 15px, az árlista 14px, időtartama 12px; a szakaszcím ott 30px. Az árértékek tabuláris számjegyekkel, törés nélkül jelennek meg.

## Layout

A `/` egyetlen kezdőlapi előnézet; nincs variáns- vagy tervválasztó. A külön `/arlista/` oldal az `adatok.json` pillanatkép mind a 19 szolgáltatásnevét és árát tartalmazza. A források: `build.mjs`, `preview.css`, `preview.js`.

A tartalmi szélesség legfeljebb 1200px, folyékony kétoldali margóval. A hero fotója minden szélességen teljes felületű `cover` háttér; a cím, leírás és foglalási gomb a sötétített képen jelenik meg. A hero minimális magassága `calc(100svh - var(--opening-chrome, 0px))`. A `preview.js` a preview-sáv, fejléc és értesítő tényleges összmagasságát méri, és `ResizeObserver` segítségével frissíti az `--opening-chrome` értékét. Így a hero a külön fejléc alatti képernyőterületet tölti ki; a tartalom szükség esetén növelheti a magasságát.

A fejléc `position: sticky; top: 0; z-index: 50`, tömör canvas háttérrel. Ugyanaz a megfigyelő a fejléc mért magasságát az `--sticky-header-height` értékbe írja; a dokumentum horgonygörgetési eltartása ez a magasság + 24px. A palettaválasztó a fejléc előtti preview-sávban van; 640px alatt saját sorba törik. A `#szofi` a teljes szélességű soft hátterű `.about-band`, benne a középre rendezett `.about.section` tartalommal.

| Szélesség | Megvalósult viselkedés |
| --- | --- |
| 320–639px | Natív mobil menü; a teljes képernyős képen egymás alatti cím, leírás és gomb. Képfókusz `70% center`, 56px függőleges tartalmi térköz. Szofi portréja és szövege egymás alatt, a munkák két oszlopban. |
| 640–899px | Ugyanaz a teljes képernyős hero és képfókusz; a bemutatkozás és több közös szakasz kétoszlopos, a munkák háromoszloposak. |
| 900px-től | Teljes navigáció; középre igazított képkivágás. A hero szövege és gombja továbbra is a képen, egymás alatt; 80px függőleges tartalmi térközzel. |

**The Hero–About Rule.** A hero után minden szélességen közvetlenül Szofi bemutatkozása következik; közéjük más szakasz nem kerül.

## Elevation & Depth

Nincsenek dobozárnyékok. A hero sötétítő rétege mobilon `linear-gradient(0deg, rgb(23 20 18 / 86%), rgb(23 20 18 / 68%) 65%, rgb(23 20 18 / 40%))`, 900px-től `linear-gradient(90deg, rgb(23 20 18 / 84%), rgb(23 20 18 / 68%) 65%, rgb(23 20 18 / 35%))`. Ez ad olvasható hátteret a világos szövegnek. Másutt tónusváltás, vékony elválasztó és a képnagyító áttetsző háttere ad mélységet. A gombok rövid színátmenetet használnak; a reduced-motion beállítás ezt és a sima horgonygörgetést kikapcsolja.

## Shapes

A hero széles, sarkos fénykép. A galéria munkaképei álló 3:4 arányú `cover` kivágások. Szofi portréja és a nagyító képe `contain` illesztéssel őrzi a teljes képet. Az akciógombok és a mobil menü finoman kerekítettek; a képek és tartalmi szakaszok sarkosak.

## Components

- **Akciógombok:** elsődleges accent háttér és on-accent szöveg; másodlagos átlátszó háttér és accent felirat; vékony keret és legalább 50px magasság. A hero ugyanazt az elsődleges gombot használja. Hoverkor az elsődleges accent-strong, a másodlagos soft hátteret kap. A fókuszgyűrű 2px, 5px eltartással, általában accent, a herón canvas színnel.
- **Navigáció:** végig látható sticky fejléc; desktopon Szofi / Szolgáltatások / Árlista / Munkák és accent foglalásgomb. 900px alatt natív `details` menü 44px-es nyitóvezérlővel; linkválasztás után bezárul. Tartalomra ugró link segíti a billentyűzetes belépést.
- **Palettaválasztó:** három natív gomb, 44px minimális magassággal. Az aktív állapotot `aria-pressed`, accent keret, soft háttér és pipa jelzi. A `szin` query elsőbbséget kap, utána a `lumi-preview-palette` sessionStorage-érték, végül Mályva az alap. A belső linkek átviszik a választást az árlistára is; tárolás nélkül a query-alapú működés megmarad.
- **Hero és bemutatkozás:** külön fejléc, teljes képernyős saját CMS-kép sötétítő réteggel és ráhelyezett szöveggel, majd közvetlenül saját portré és teljes meglévő bemutatkozószöveg.
- **Képnagyító:** a munkafotók natív modális `dialog` elemet nyitnak; bezárógombbal és Escape-pel zárható. Bezáráskor a fókusz a megnyitó fotóra tér vissza. A felirat és alternatív szöveg a választott képet követi.
- **Árlista:** szemantikus leírólista, bal oldalon név és időtartam, jobb oldalon ár. Nincs helyi foglalási űrlap vagy fiókkomponens.

## Do's and Don'ts

- **Do** őrizd meg a kilenc meglévő fotót, beágyazott eredetadataikat és a `media/provenance.json` nyilvántartását; a `hero.jpg` a meglévő CMS-nyitókép másolata.
- **Do** az árakat és szövegeket az `adatok.json` pillanatképéből vedd át. Az előnézet nem hív backendet, Authot vagy API-t, és nem ír adatot.
- **Don't** tekintsd a foglalás-, fiók- és szolgáltatáslinkeket helyi funkciónak: a jelenlegi éles oldalra vezetnek. Nem történt éles foglalási próba.
- **Don't** következtess az előnézetből admin/PWA-módosításra vagy LIVE-kiadási engedélyre. A csomag noindex/nofollow és robots Disallow jelölést kap; az éles projekt nem módosult.
- **Don't** állíts teljes akadálymentességi vagy fizikai készülékes igazolást. A `.impeccable/review/sticky-colors-20261028` célzott ellenőrzése 320/390/768/1440px-en igazolta a fejléc rögzülését a láblécnél is, a látható horgonycélokat, a palettaváltást és árlistára átvitelt, valamint a túlcsordulás és szkripthibák hiányát. A számított kontraszt a tényleges szerepekben: törzsszöveg ≥11,37; akció/lábléc ≥6,28; accent cím soft felületen ≥5,12. Ehhez a szűk változtatáshoz nem készült új független finish review; a korábbi SHIP nem az új színek jóváhagyása. A korábbi hero-, nagyító- és árlista-bizonyíték a változatlan részekhez tartozik. Nincs fizikai készülékes vagy éles foglalási próba.
