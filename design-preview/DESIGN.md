---
name: Lumi Nails — hero és bemutatkozás
description: Teljes képernyős nyitókép ráhelyezett szöveggel, közvetlen bemutatkozással.
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
  button-hero:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
---

# Design System: Lumi Nails — hero és bemutatkozás

## Overview

**Creative North Star: "Ivory & Taupe, saját munkákkal"**

Ez a dokumentum csak a különálló `design-preview` csomag aktuális állapotát írja le. A felhasználó által rögzített sorrend: külön fejléc menüvel → teljes képernyős hero, a képre helyezett címmel és foglalási gombbal → közvetlenül Szofi bemutatkozása. Utána szolgáltatások, munkák, foglalási meghívó és lábléc következik. Az aktív vendégértesítő a fejléc alatt, a főtartalom és a hero előtt marad.

A kompozíció kérése egyértelmű; képi comp és végleges LIVE-jóváhagyás nincs. A dokumentum nem helyettesíti a projekt gyökérszintű designrendszerét.

**Key Characteristics:**

- Meglévő elefántcsont–taupe márka; világos felületen sötét, a herón ivory szöveg.
- Teljes képernyős saját nyitókép sötét átmenetes réteggel, ráhelyezett címmel és világos foglalási gombbal, mobilon is.
- A hero után közvetlen, teljes bemutatkozás saját portréval.

## Colors

Az ivory a lap alapja, a hero szövege és világos gombjának háttere. Az ink a világos felületek szövege, az általános elsődleges gomb háttere és a hero gombfelirata. A soft-taupe az értesítőt, láblécet, képhátteret és hover állapotot jelöli. A line áttetsző elválasztókat ad. A taupe és clay megőrzött, de jelenleg komponenshez nem rendelt palettatagok.

**The Brand Continuity Rule.** A rögzített palettát őrizd meg; világos felületen sötét, a sötétített herón ivory szöveget használj.

## Typography

A DM Sans viszi a címsorokat, szöveget és vezérlőket. A Playfair Display csak a szóvédjegy betűje. A két család négy helyi WOFF2 fájlból töltődik, két OFL licenccel; nincs külső font-CDN.

A display token a hero címét írja le; az árlista és hibaoldal alap H1 mérete `clamp(46px, 7vw, 88px)`. A törzsszöveg legfeljebb 65ch; a hero leírása 55ch, desktopon 18px. A bemutatkozás és szolgáltatásszöveg 15px, az árlista 14px, időtartama 12px; a szakaszcím ott 30px. Az árértékek tabuláris számjegyekkel, törés nélkül jelennek meg.

## Layout

A `/` egyetlen kezdőlapi előnézet; nincs variáns- vagy tervválasztó. A külön `/arlista/` oldal az `adatok.json` pillanatkép mind a 19 szolgáltatásnevét és árát tartalmazza. A források: `build.mjs`, `preview.css`, `preview.js`.

A tartalmi szélesség legfeljebb 1200px, folyékony kétoldali margóval. A hero fotója minden szélességen teljes felületű `cover` háttér; a cím, leírás és foglalási gomb a sötétített képen jelenik meg. A hero minimális magassága `calc(100svh - var(--opening-chrome, 0px))`. A `preview.js` a preview-sáv, fejléc és értesítő tényleges összmagasságát méri, és `ResizeObserver` segítségével frissíti az `--opening-chrome` értékét. Így a hero a külön fejléc alatti képernyőterületet tölti ki; a tartalom szükség esetén növelheti a magasságát.

| Szélesség | Megvalósult viselkedés |
| --- | --- |
| 320–639px | Natív mobil menü; a teljes képernyős képen egymás alatti cím, leírás és gomb. Képfókusz `70% center`, 56px függőleges tartalmi térköz. Szofi portréja és szövege egymás alatt, a munkák két oszlopban. |
| 640–899px | Ugyanaz a teljes képernyős hero és képfókusz; a bemutatkozás és több közös szakasz kétoszlopos, a munkák háromoszloposak. |
| 900px-től | Teljes navigáció; középre igazított képkivágás. A hero szövege és gombja továbbra is a képen, egymás alatt; 80px függőleges tartalmi térközzel. |

**The Hero–About Rule.** A hero után minden szélességen közvetlenül Szofi bemutatkozása következik; közéjük más szakasz nem kerül.

## Elevation & Depth

Nincsenek dobozárnyékok. A hero sötétítő rétege mobilon `linear-gradient(0deg, rgb(23 20 18 / 86%), rgb(23 20 18 / 68%) 65%, rgb(23 20 18 / 40%))`, 900px-től `linear-gradient(90deg, rgb(23 20 18 / 84%), rgb(23 20 18 / 68%) 65%, rgb(23 20 18 / 35%))`. Ez ad olvasható hátteret az ivory szövegnek. Másutt tónusváltás, vékony elválasztó és a képnagyító áttetsző háttere ad mélységet. A gombok rövid színátmenetet használnak; a reduced-motion beállítás ezt és a sima horgonygörgetést kikapcsolja.

## Shapes

A hero széles, sarkos fénykép. A galéria munkaképei álló 3:4 arányú `cover` kivágások. Szofi portréja és a nagyító képe `contain` illesztéssel őrzi a teljes képet. Az akciógombok és a mobil menü finoman kerekítettek; a képek és tartalmi szakaszok sarkosak.

## Components

- **Akciógombok:** elsődleges sötét, másodlagos átlátszó felület; vékony keret és legalább 50px magasság. A hero gombja ivory hátteret és keretet, ink feliratot kap. Hoverkor soft-taupe háttér; fókuszgyűrű 2px, 5px eltartással, a herón ivory színnel. A szöveges linkek aláhúzottak és legalább 44px magasak.
- **Navigáció:** desktopon Szofi / Szolgáltatások / Árlista / Munkák és foglalásgomb. 900px alatt natív `details` menü 44px-es nyitóvezérlővel; linkválasztás után bezárul. Tartalomra ugró link segíti a billentyűzetes belépést.
- **Hero és bemutatkozás:** külön fejléc, teljes képernyős saját CMS-kép sötétítő réteggel és ráhelyezett szöveggel, majd közvetlenül saját portré és teljes meglévő bemutatkozószöveg.
- **Képnagyító:** a munkafotók natív modális `dialog` elemet nyitnak; bezárógombbal és Escape-pel zárható. Bezáráskor a fókusz a megnyitó fotóra tér vissza. A felirat és alternatív szöveg a választott képet követi.
- **Árlista:** szemantikus leírólista, bal oldalon név és időtartam, jobb oldalon ár. Nincs helyi foglalási űrlap vagy fiókkomponens.

## Do's and Don'ts

- **Do** őrizd meg a kilenc meglévő fotót, beágyazott eredetadataikat és a `media/provenance.json` nyilvántartását; a `hero.jpg` a meglévő CMS-nyitókép másolata.
- **Do** az árakat és szövegeket az `adatok.json` pillanatképéből vedd át. Az előnézet nem hív backendet, Authot vagy API-t, és nem ír adatot.
- **Don't** tekintsd a foglalás-, fiók- és szolgáltatáslinkeket helyi funkciónak: a jelenlegi éles oldalra vezetnek. Nem történt éles foglalási próba.
- **Don't** következtess az előnézetből admin/PWA-módosításra vagy LIVE-kiadási engedélyre. A csomag noindex/nofollow és robots Disallow jelölést kap; az éles projekt nem módosult.
- **Don't** állíts teljes akadálymentességi vagy fizikai készülékes igazolást. A `.impeccable/review/fullscreen-hero-20261028` célzott Chromium-ellenőrzése 320/390/768/1440px-en igazolta a hero geometriáját és a vízszintes túlcsordulás hiányát. A korábbi `.impeccable/review/hero-about-20261028` menü-, nagyító-, fókusz-, 19 ár- és 404-ellenőrzése a változatlan részekre továbbra is érvényes; az ottani független review eredménye SHIP FOR PREVIEW. Nincs fizikai készülékes vagy éles foglalási próba.
