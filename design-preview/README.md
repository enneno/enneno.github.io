# LumiNails: hero és bemutatkozás

A felhasználó által kért, egyetlen aktuális publikus kezdőlapi előnézet. Külön TEST ág: codex/public-redesign-preview. Nem módosítja a TEST main ágat vagy az éles oldalt.

## Rögzített felépítés

Fejléc menüvel → nagy hero rész → közvetlenül Szofi bemutatkozása → szolgáltatások → munkák → foglalási meghívó → lábléc. A meglévő aktuális vendégértesítő a fejléc alatt megmarad; a hero és bemutatkozás között nincs más szakasz.

A hero a jelenlegi CMS saját széles nyitóképét használja, a valódi névvel és leírással, külön foglalási gombbal. A felhasználó legújabb kérése alapján a kép asztalon és mobilon is teljes szélességű, cover kitöltéssel. A hero a fejléc és értesítő alatti megmaradó képernyőmagasságot tölti ki. A cím, leírás és világos foglalási gomb a képen van, sötét gradiens overlayen. A fejléc tényleges méretét ResizeObserver követi, ezért tördelés vagy betűbetöltés után is igazodik a magasság. A bemutatkozás saját portréval és a meglévő teljes szöveggel következik.

## Megőrzött tartalom és működés

Saját fotók, a jelenlegi magyar szövegek és 19 valós ár. Elefántcsont–taupe márka, DM Sans és a szóvédjegyhez Playfair Display. HTML/CSS/vanilla JavaScript; új függőség nélkül. Az adatforrás a projekt meglévő nyilvános adatok.json pillanatképe.

Nincs Auth-kliens, Supabase-lekérés, próbaadat, foglalási írás vagy képküldés az előnézetben. A foglalási/fiók- és szolgáltatásrészlet-műveletek a jelenleg működő éles oldalra mutató normál linkek. Az árlista külön statikus oldalon a teljes eredeti árat mutatja.

A galéria natív dialogos nagyítást használ, Escape bezárással és fókusz-visszaadással. Mobilon natív details menü működik; asztalon teljes navigáció. A szélességhez igazodó szakaszok nem változtatják meg a hero–bemutatkozás sorrendet.

## Helyi futtatás és hosztolás

node design-preview/prepare-assets.mjs – a saját publikus képek és nyílt betűk helyi másolata.

node design-preview/build.mjs – csak ezt az előnézetet építi a dist mappába.

node design-preview/serve.mjs – http://127.0.0.1:8118, csak a dist gyökér kiszolgálásával.

node design-preview/check.mjs – célzott helyi sorrend-, méret-, menü-, nagyítás- és árlista-ellenőrzés. A böngésző elérési útját a LUMI_BROWSER_EXECUTABLE környezeti változó adja.

A package.json build:site parancsa csak ezen az előnézeti ágon mutat a külön buildre. A Cloudflare manuális preview deployment ezt az ágat építi, nem a main kiadását. GitHubon nem fut teszt vagy audit.

## Források és határok

A képek eredete a media/provenance.json fájlban és a JPEG-metaadatokban szerepel, pixeladataik változatlanok. A betűk helyben vannak, két OFL-licencükkel együtt. A kimenet nem tartalmazza a dokumentációt, a teszteket, a forrásadatbázis-fájlokat vagy a szerveroldali kódot. Nincs külső font- vagy Tailwind CDN.

Impeccable, 21st katalógusreferenciák és mobile-responsive útmutatás alapján készült, a felhasználó konkrét sorrendje felülírja a korábbi három elrendezést. Nincs képi comp vagy végleges élesítési jóváhagyás. Teljes noindex/nofollow és robots Disallow védelem.
