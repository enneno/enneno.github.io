---
name: Lumi Nails — hero és bemutatkozás
description: Nagy nyitókép, közvetlen bemutatkozással, a meglévő Ivory & Taupe márkában.
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
---

# Design System: Lumi Nails — hero és bemutatkozás

## Overview

**Creative North Star: "Ivory & Taupe, saját munkákkal"**

Ez a dokumentum csak a különálló `design-preview` csomag aktuális állapotát írja le. A felhasználó által rögzített sorrend: külön fejléc menüvel → nagy hero → közvetlenül Szofi bemutatkozása. Utána szolgáltatások, munkák, foglalási meghívó és lábléc következik. Az aktív vendégértesítő a fejléc alatt, a főtartalom és a hero előtt marad.

A kompozíció kérése egyértelmű; képi comp és végleges LIVE-jóváhagyás nincs. A dokumentum nem helyettesíti a projekt gyökérszintű designrendszerét.

**Key Characteristics:**

- Meglévő elefántcsont–taupe márka és sötét szöveg.
- Nagy, teljes szélességű saját nyitókép; külön szöveg és foglalási gomb.
- A hero után közvetlen, teljes bemutatkozás saját portréval.

## Colors

Az ivory a lap alapja, az ink a szöveg és elsődleges gomb színe. A soft-taupe az értesítőt, láblécet, képhátteret és hover állapotot jelöli. A line áttetsző elválasztókat ad. A taupe és clay megőrzött, de jelenleg komponenshez nem rendelt palettatagok.

**The Brand Continuity Rule.** A rögzített palettát őrizd meg; a halvány árnyalatok nem helyettesítik a sötét szöveget.

## Typography

A DM Sans viszi a címsorokat, szöveget és vezérlőket. A Playfair Display csak a szóvédjegy betűje. A két család négy helyi WOFF2 fájlból töltődik, két OFL licenccel; nincs külső font-CDN.

A display token a hero címét írja le; az árlista és hibaoldal alap H1 mérete `clamp(46px, 7vw, 88px)`. A törzsszöveg legfeljebb 65ch; a hero leírása 55ch, desktopon 18px. A bemutatkozás és szolgáltatásszöveg 15px, az árlista 14px, időtartama 12px; a szakaszcím ott 30px. Az árértékek tabuláris számjegyekkel, törés nélkül jelennek meg.

## Layout

A `/` egyetlen kezdőlapi előnézet; nincs variáns- vagy tervválasztó. A külön `/arlista/` oldal az `adatok.json` pillanatkép mind a 19 szolgáltatásnevét és árát tartalmazza. A források: `build.mjs`, `preview.css`, `preview.js`.

A tartalmi szélesség legfeljebb 1200px, folyékony kétoldali margóval. A hero címe, leírása és gombja a fénykép felett helyezkedik el. A fotó a teljes ablak szélességét kitölti; nincs ráhelyezett szöveg vagy sötétítő réteg.

| Szélesség | Megvalósult viselkedés |
| --- | --- |
| 320–639px | Natív mobil menü; egymás alatti hero-szöveg és gomb; 16:9 kép `contain` illesztéssel. Szofi portréja és szövege egymás alatt, a munkák két oszlopban. |
| 640–899px | A hero továbbra is 16:9 és `contain`; a bemutatkozás és több közös szakasz kétoszlopos, a munkák háromoszloposak. |
| 900px-től | Teljes navigáció; a hero-szöveg mellett foglalásgomb. A teljes szélességű nyitókép magassága `clamp(420px, 43vw, 620px)`, középre igazított `cover` kivágással. |

**The Hero–About Rule.** A hero után minden szélességen közvetlenül Szofi bemutatkozása következik; közéjük más szakasz nem kerül.

## Elevation & Depth

Nincsenek dobozárnyékok. A mélységet tónusváltás, vékony elválasztó és a képnagyító sötét áttetsző háttere adja. A gombok rövid színátmenetet használnak; a reduced-motion beállítás ezt és a sima horgonygörgetést kikapcsolja.

## Shapes

A hero széles, sarkos fénykép. A galéria munkaképei álló 3:4 arányú `cover` kivágások. Szofi portréja és a nagyító képe `contain` illesztéssel őrzi a teljes képet. Az akciógombok és a mobil menü finoman kerekítettek; a képek és tartalmi szakaszok sarkosak.

## Components

- **Akciógombok:** elsődleges sötét, másodlagos átlátszó felület; vékony keret és legalább 50px magasság. Hoverkor soft-taupe háttér; fókuszgyűrű 2px, 5px eltartással. A szöveges linkek aláhúzottak és legalább 44px magasak.
- **Navigáció:** desktopon Szofi / Szolgáltatások / Árlista / Munkák és foglalásgomb. 900px alatt natív `details` menü 44px-es nyitóvezérlővel; linkválasztás után bezárul. Tartalomra ugró link segíti a billentyűzetes belépést.
- **Hero és bemutatkozás:** külön fejléc, szöveges hero-fejrész, teljes szélességű saját CMS-kép, majd közvetlenül saját portré és teljes meglévő bemutatkozószöveg.
- **Képnagyító:** a munkafotók natív modális `dialog` elemet nyitnak; bezárógombbal és Escape-pel zárható. Bezáráskor a fókusz a megnyitó fotóra tér vissza. A felirat és alternatív szöveg a választott képet követi.
- **Árlista:** szemantikus leírólista, bal oldalon név és időtartam, jobb oldalon ár. Nincs helyi foglalási űrlap vagy fiókkomponens.

## Do's and Don'ts

- **Do** őrizd meg a kilenc meglévő fotót, beágyazott eredetadataikat és a `media/provenance.json` nyilvántartását; a `hero.jpg` a meglévő CMS-nyitókép másolata.
- **Do** az árakat és szövegeket az `adatok.json` pillanatképéből vedd át. Az előnézet nem hív backendet, Authot vagy API-t, és nem ír adatot.
- **Don't** tekintsd a foglalás-, fiók- és szolgáltatáslinkeket helyi funkciónak: a jelenlegi éles oldalra vezetnek. Nem történt éles foglalási próba.
- **Don't** következtess az előnézetből admin/PWA-módosításra vagy LIVE-kiadási engedélyre. A csomag noindex/nofollow és robots Disallow jelölést kap; az éles projekt nem módosult.
- **Don't** állíts teljes akadálymentességi vagy fizikai készülékes igazolást. A `.impeccable/review/hero-about-20261028` célzott Chromium-ellenőrzése 320/390/768/1440px-en igazolta a sorrendet, méreteket, médiát és túlcsordulást; a menü, nagyító, fókusz, 19 ár, valamint privát és elutasított útvonalak 404-válasza is átment. A független review eredménye: SHIP FOR PREVIEW, érdemi hiba nélkül. A cream-palette jelzés szándékos márkamegőrzés; a padding-jelzéseket a forrás térközei nem igazolták.
