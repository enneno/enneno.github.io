# Publikus LumiNails látványváltozatok

Külön, kódolt előnézeti csomag a `codex/public-redesign-preview` TEST ágon. Nem váltja le a TEST vagy LIVE főoldalt. A kiválasztott változat később kerülhet a tényleges oldal forrásába.

## Közös feltételek

Saját képek, a meglévő magyar szövegek, a pillanatkép 19 valós ára és a meglévő elefántcsont–taupe paletta. DM Sans és a szóvédjegyhez Playfair Display; HTML/CSS/vanilla JS, új függőség nélkül. Az adatforrás a projekt meglévő nyilvános `adatok.json` pillanatképe. Nincs Auth-kliens, Supabase-lekérés, próbaadat, foglalási írás vagy képküldés. A tényleges foglalási és fiókműveletek a jelenlegi éles oldalra mutató normál linkeken érhetők el.

## Három felépítés

- **A — Portfólió:** aszimmetrikus képfal és rövid nyitószöveg; alatta munkák, szolgáltatások és Szofi. A fényképek adják az első benyomást. Interakció: nagyítás natív dialogban, billentyűzettel bezárható és fókusz-visszaadással. Kockázat: hosszabb görgetés az árakig.
- **B — Fotószalag:** a galéria maga a nyitófelület. Nagy portréképek natív vízszintes görgetéssel, scroll-snappel, nyilakkal és billentyűzettel; teljes szöveges szolgáltatások és bemutatkozás alatta. Kockázat: a vízszintes galériát jól felismerhető lapozóvezérlőknek kell segíteniük.
- **C — Válassz szolgáltatást:** a szolgáltatásválasztó nyitja az oldalt; a választott szolgáltatás valódi leírása, képe és árai egy helyen láthatók. Munkák és bemutatkozás utána. Kockázat: a hosszú árlisták mobilon több görgetést kérnek.

A színek helyett legalább két szerkezeti tengely változik: tartalmi sorrend és nyitófelület, illetve statikus portfólió / böngészhető képszalag / szolgáltatásválasztó. A sorrend az Impeccable felületi kiosztásának 5, 7, 6 eredményét követi (seed: afc30d86); a rögzített márka felülírja az idegen katalógusvilágokat. E körben a felhasználó kódolt, helyben futó és hosztolt előnézetet kért; nincs jóváhagyott képi comp vagy kiválasztott végleges irány.

21st referenciák: [Portfolio Gallery](https://21st.dev/@isaiahbjork/components/portfolio-gallery), [Portfolio and Image Gallery](https://21st.dev/@iamsatish4564/components/portfolio-and-image-gallery). A katalógus képi böngészési és nagy képes elrendezése inspiráció; nem importáltunk React-komponenst. A 21st AI a kapcsolt ingyenes fiókban nem engedélyezett, a kredit 0. A márkától eltérő 3D/WebGL-kezelést és automatikus mozgó szalagot nem vettük át.

## Helyi parancsok

`node design-preview/prepare-assets.mjs` – saját nyilvános képek és nyílt licencű betűk helyi másolata.

`node design-preview/build.mjs` – csak a külön előnézetet építi a `dist` mappába.

`node design-preview/serve.mjs` – http://127.0.0.1:8118, a kiszolgált gyökér kizárólag a `dist`.

A gyökér `package.json` build:site parancsa csak ezen az előnézeti ágon mutat erre a buildre. A `main` változatlan marad. A Cloudflare Pages manuális preview deploymentje a külön ág forrását építi; nincs élesítés és nincs GitHubon futó teszt.

A képek eredete: `media/provenance.json`. A forrásképek pixeladatai változatlanok. A Google Fonts betűk helyben vannak, nincs külső font- vagy Tailwind CDN. A teljes csomag noindex/nofollow és robots Disallow védelmet kap.
