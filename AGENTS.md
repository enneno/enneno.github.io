# AGENTS.md — LumiNails TEST fejlesztési szabályzat

Ez a fájl a `D:\Asztal\LumiNails_Test` projektben végzett minden munkára kötelező szabályokat rögzíti.

## Környezetek és kötelező kiadási folyamat

- Az éles helyi projekt: `D:\Asztal\Luminails`.
- A fejlesztési és ellenőrzési projekt: `D:\Asztal\LumiNails_Test`.
- Minden fejlesztést először és kizárólag a TEST projektben kell elkészíteni.
- A TEST-változtatásokat a feladat jellegének megfelelően vizuálisan és funkcionálisan ellenőrizni kell.
- Az ellenőrzés eredményét röviden, pontosan jelenteni kell a felhasználónak.
- A TEST-ben elkészült változtatás csak külön, kifejezett felhasználói jóváhagyás után vihető át az éles helyi projektbe vagy az éles `luminails.hu` oldalra.
- A TEST-re adott fejlesztési kérés önmagában soha nem jelent engedélyt az éles projekt vagy az éles oldal módosítására, telepítésére vagy közzétételére.
- Külön élesítési jóváhagyás nélkül az éles projekt alkalmazáskódját, konfigurációját, tartalmát és generált fájljait tilos módosítani.
- Élesítés előtt ismét ellenőrizni kell a pontos változási kört; csak a jóváhagyott TEST-változtatások vihetők át.

## Kódtisztaság és CSS-felelősség

- Egy elem vagy komponens alapmegjelenésének pontosan egy egyértelmű CSS-tulajdonosa legyen.
- Későbbi kontextusszabály csak valódi eltérést módosíthat, például pozíciót, elrendezést, térközt, reszponzív viselkedést vagy szemantikus variánst.
- Tilos hibát egymásra halmozott felülírásokkal, növelt specificitással, `!important` használatával vagy teljes stílusmásolatokkal elfedni.
- Takarításkor a duplikált felelősséget meg kell szüntetni; tilos azt újabb felülírás mögé rejteni.
- Kódtakarítás vizuális és funkcionális változás nélkül történjen, hacsak a felhasználó kifejezetten mást nem kér.
- A módosítás maradjon a lehető legkisebb, jól körülhatárolt és könnyen ellenőrizhető.
- Az alapstílus, a komponensvariáns és a környezeti eltérés felelőssége legyen világosan elkülönítve.

## Normál weboldal és PWA

- A normál weboldal és a PWA megjelenése vagy viselkedése indokolt esetben eltérhet; nem követelmény a feltétel nélküli azonosság.
- Az eltéréseket környezetspecifikus, világosan elhatárolt szabályokkal kell megvalósítani, az általános felület indokolatlan módosítása nélkül.
- Az admin standalone PWA nagyítása szándékosan tiltott.
- Az admin standalone PWA nagyítását tilos visszakapcsolni, megkerülni vagy olyan viewport-, gesztus-, CSS- vagy JavaScript-változtatással feloldani, amely újra lehetővé teszi a nagyítást.
- A nagyítási tilalom csak külön, kifejezett felhasználói utasításra változtatható meg.

## Munkavégzési korlátok

- Mindig a felhasználó által megadott változási körön belül kell maradni.
- A működő funkciókat és a meglévő felhasználói folyamatokat meg kell őrizni, hacsak a feladat kifejezetten nem kér változtatást.
- A publikus felületet, az admin felületet, a SEO-t, a sitemapet és a PWA-kódot csak akkor szabad módosítani, ha az aktuális feladat ezt kifejezetten kéri.
- Generált fájl helyett az irányadó forrásfájlt kell módosítani.
- Titkokat, kulcsokat, tokeneket és személyes adatokat tilos forráskódba vagy naplóba írni.

## Arányos tesztelés

- A tesztelés mértéke mindig igazodjon a módosítás tényleges hatóköréhez és kockázatához.
- Kis, jól körülhatárolt változtatásnál a célzott ellenőrzés az alapértelmezés; ilyenkor tilos indok nélkül a teljes böngészős tesztcsomagot futtatni.
- Adminfelületi módosításnál az admin alaptesztek fussanak, kiegészítve csak az érintett PWA-, elérhetőségi, tartalomkezelési vagy kommunikációs tesztekkel.
- Publikus vagy foglalási módosításnál csak a publikus oldal, a foglalás, az ügyfélfiók és a CSS-architektúra releváns tesztjei fussanak.
- Dokumentáció, fejlesztési szabályzat vagy kizárólag GitHub-workflow módosítása nem indokol böngészős tesztfuttatást és nem telepíti újra a TEST-oldalt.
- Teljes tesztcsomag csak közös vagy több területet érintő fájl, buildrendszer, függőség, hitelesítés, Supabase-konfiguráció, service worker, ismeretlen hatókör vagy kifejezett felhasználói kérés esetén indokolt.
- Ugyanazt a teljes tesztcsomagot helyben és a GitHubon egymás után megismételni tilos, hacsak egy konkrét hiba kivizsgálása ezt nem teszi szükségessé.
- Fejlesztés közben rövid, célzott helyi ellenőrzés használható; a GitHub a változott fájlok alapján automatikusan választ célzott vagy teljes ellenőrzést.
- Sikertelen ellenőrzés után csak a hibához kapcsolódó javítást és tesztet kell megismételni; változatlan, már sikeres ellenőrzéseket tilos indok nélkül újrafuttatni.
- Az élesítés nem tesztel újra: kizárólag olyan TEST commit emelhető át, amelyhez már sikeres TEST GitHub Pages ellenőrzés és telepítés tartozik.

## Ellenőrzés és jelentés

- Módosítás előtt ellenőrizni kell a Git-állapotot és a releváns fájlokat.
- Módosítás után ellenőrizni kell a Git-diffet, hogy csak a kért fájlok változtak-e.
- A felhasználónak pontosan fel kell sorolni a módosított vagy létrehozott fájlokat és az elvégzett ellenőrzéseket.
- Külön jelezni kell, hogy történt-e bármilyen változás az éles projektben. Alapértelmezés szerint ennek válasza: nem.
