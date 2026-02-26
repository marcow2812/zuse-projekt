/*    INSTANZVARIABLEN    */
// Anzahl zu erlaubender Berechtigungen
var numberOfPermissions = 2;
// Höhe: Menü für Objekte
var heightOfObjectMenu = "100%";
// Timeout zur Überprüfung der Internetverbindung (10000 = 10s)
var timeoutCheckInternetConnection = 30000;
// Standard-URL für QR-Code-Erstellung
var standardUrl = "https://marcow2812.github.io/zuse-projekt/main/explorer.html?o="; 

var markerLostTimeout;
var isMarkerVisible = false;


// Wartungsarbeiten
// 0 = keine, 1 = derzeitige Wartungsarbeiten, 2 = angekündigt
var maintenanceStatus = 0; 
// Datum
var maintenanceDate = "24.12.2025";
// Start der Wartungsarbeiten
var maintenanceStartTime = "08:00";
// Geplantes Ende der Wartungsarbeiten
var maintenanceEndTime = "12:00";

// Derzeitig gewähltes Objekt
var objectId;

// Objekt-Datenbank

/* 
-------------------------------------------------

Weitere Objekte:
- Rätselaufgabe (Tag der offenen Tür Hünfeld)
- Periodensystem der Elemente (einzelne Elemente)
- Sonnensystem / einzelne Planeten

-------------------------------------------------
*/

const database = [
    /*
    {
        id: "mystery",
        oTitle: "Zuse Tatort",
        oDescription: "Willkommen zum Tag der offenen Tür 2026 an der Konrad-Zuse-Schule Hünfeld!<br><br>Wir haben einen kleinen Tatort nachgebaut und insgesamt <b>6 Beweisspuren</b> versteckt. Könnt ihr alle finden?",
        oSubject: "zu",
        oFsk: 0,

        oBanner: "./data/img/ecube/CrimeScene_green_top_big.png",
        oSrc: "https://www.cbnb.de/3dobjects/zuse-tatort.glb",
        oCopyright: "Copyright: Zusammengestellt durch Marco Weber, 2026<br>Verwendete Objekte:<br>Boden: Laminate Floor 03: https://polyhaven.com/a/laminate_floor_03 Pokal: 3D model by <a href='https://pixabay.com/users/jeremywoodsster-25048718/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2440'>jeremywoodsster</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2440'>Pixabay</a> Sofa: 3D model by <a href='https://pixabay.com/users/pixelmotion4096-32809140/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2656'>Pixelmotion4096</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2656'>Pixabay</a> Tresor: 3D model by <a href='https://pixabay.com/users/pixelmotion4096-32809140/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2653'>Pixelmotion4096</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2653'>Pixabay</a> Zauberwürfel: 3D model by <a href='https://pixabay.com/users/pixelmotion4096-32809140/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=78'>Pixelmotion4096</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=78'>Pixabay</a> Mülleimer: 3D model by <a href='https://pixabay.com/users/soykhaler-6351521/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1967'>Diego Ortiz</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1967'>Pixabay</a> Weißes Regal (Hochkant): 3D model by <a href='https://pixabay.com/users/quaternius_cc0-51322708/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1327'>Quaternius_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1327'>Pixabay</a> Stehlampe: 3D model by <a href='https://pixabay.com/users/quaternius_cc0-51322708/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1146'>Quaternius_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1146'>Pixabay</a> Hammer: 3D model by <a href='https://pixabay.com/users/plaggy_cc0-51322723/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=531'>Plaggy_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=531'>Pixabay</a> Schraubenzieher: 3D model by <a href='https://pixabay.com/users/plaggy_cc0-51322723/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=591'>Plaggy_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=591'>Pixabay</a> Zeitung: 3D model by <a href='https://pixabay.com/users/mastertux-470906/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1545'>MasterTux</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1545'>Pixabay</a> Hand: 3D model by <a href='https://pixabay.com/users/pixelmotion4096-32809140/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1949'>Pixelmotion4096</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1949'>Pixabay</a> Stuhl: 3D model by <a href='https://pixabay.com/users/quaternius_cc0-51322708/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1192'>Quaternius_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1192'>Pixabay</a> Uhr: 3D model by <a href='https://pixabay.com/users/arunangshubanerjee-29054022/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2041'>Arunangshu Banerjee</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2041'>Pixabay</a> Regal-Tisch: 3D model by <a href='https://pixabay.com/users/quaternius_cc0-51322708/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1330'>Quaternius_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1330'>Pixabay</a> Bücher: 3D model by <a href='https://pixabay.com/users/pixelmotion4096-32809140/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2639'>Pixelmotion4096</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2639'>Pixabay</a> Tasse: 3D model by <a href='https://pixabay.com/users/mastertux-470906/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=209'>MasterTux</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=209'>Pixabay</a> Croissant: 3D model by <a href='https://pixabay.com/users/-promptplay--51430280/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1721'>-PromptPlay-</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1721'>Pixabay</a> Klavier: 3D model by <a href='https://pixabay.com/users/manseok_kim-1005494/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2114'>manseok Kim</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2114'>Pixabay</a> Teppich: 3D model by <a href='https://pixabay.com/users/quaternius_cc0-51322708/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=793'>Quaternius_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=793'>Pixabay</a> Blumentopf: 3D model by <a href='https://pixabay.com/users/plaggy_cc0-51322723/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=573'>Plaggy_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=573'>Pixabay</a> Kaktus: 3D model by <a href='https://pixabay.com/users/quaternius_cc0-51322708/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=771'>Quaternius_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=771'>Pixabay</a> Teller: 3D model by <a href='https://pixabay.com/users/plaggy_cc0-51322723/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=578'>Plaggy_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=578'>Pixabay</a> Karton: 3D model by <a href='https://pixabay.com/users/tiny_planet_friends_3d-52823822/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2960'>TWIN REBEL</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2960'>Pixabay</a> Hamster: 3D model by <a href='https://pixabay.com/users/bsmercantile5-50929094/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2267'>BSmercantile5</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2267'>Pixabay</a> Deckenlampe: 3D model by <a href='https://pixabay.com/users/quaternius_cc0-51322708/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1143'>Quaternius_CC0</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=1143'>Pixabay</a>",
        oSizeMultiplier: 3,
        oBackground: "#f2f2f2",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioSrc: "./data/music/night-before-dawn-129272.mp3",
        oAudioCopyright: "Music by <a href='https://pixabay.com/users/sweet_kr-27931391/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=129272'>Artur Buriak</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=129272'>Pixabay</a>",
        oAudioStartAt: 2.0,
    },
    {
        id: "wwm",
        oTitle: "Zuse - Wer wird Millionär",
        oDescription: "Willkommen zum Tag der offenen Tür 2026 an der Konrad-Zuse-Schule Hünfeld!",
        oSubject: "zu",
        oFsk: 0,

        oBanner: "./data/img/ecube/CrimeScene_green_top_big.png",
        oSrc: "",
        oCopyright: "Copyright: Zusammengestellt durch Marco Weber",
        oSizeMultiplier: 3,
        oBackground: "transparent",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(46, 65, 168, 0.8)",

        oAudioId: 1,
    },
    */

    {
        id: "sonne-ro",
        oTitle: "Sonne",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/sonne-ro.png",
        oSrc: "./data/3d/object/sonne-ro.glb",
        oCopyright: `"Sun" (https://skfb.ly/6U8EY) by PatelDev is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "merkur-ro",
        oTitle: "Merkur",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/merkur-ro.png",
        oSrc: "./data/3d/object/merkur-ro.glb",
        oCopyright: `"Mercury (planet)" (https://skfb.ly/6yuRD) by SebastianSosnowski is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "venus-ro",
        oTitle: "Venus",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/venus-ro.png",
        oSrc: "./data/3d/object/venus-ro.glb",
        oCopyright: `"Venus" (https://skfb.ly/ITvT) by kongle is licensed under Creative Commons Attribution-ShareAlike (http://creativecommons.org/licenses/by-sa/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "erde-ro",
        oTitle: "Erde",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/erde-ro.png",
        oSrc: "./data/3d/object/erde-ro.glb",
        oCopyright: `"Earth" (https://skfb.ly/6U8BH) by PatelDev is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "mars-ro",
        oTitle: "Mars",
        oDescription: `(Beschreibung folgt)`,
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/mars-ro.png",
        oSrc: "./data/3d/object/mars-ro.glb",
        oCopyright: "'Mars' (https://skfb.ly/oyCyK) by JanesBT is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "#2d2d2dff",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 4,

        oHotspots: ``,
    },
    {
        id: "jupiter-ro",
        oTitle: "Jupiter",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/jupiter-ro.png",
        oSrc: "./data/3d/object/jupiter-ro.glb",
        oCopyright: `"Realistic Jupiter" (https://skfb.ly/oKT8Y) by Shady Tex is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "saturn-ro",
        oTitle: "Saturn",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/saturn-ro.png",
        oSrc: "./data/3d/object/saturn-ro.glb",
        oCopyright: `"Saturn" (https://skfb.ly/onNus) by PatelDev is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "uranus-ro",
        oTitle: "Uranus",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/uranus-ro.png",
        oSrc: "./data/3d/object/uranus-ro.glb",
        oCopyright: `"Uranus" (https://skfb.ly/6TwIN) by Akshat is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "neptun-ro",
        oTitle: "Neptun",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/neptun-ro.png",
        oSrc: "./data/3d/object/neptun-ro.glb",
        oCopyright: `"Neptune" (https://skfb.ly/IUFS) by kongle is licensed under Creative Commons Attribution-ShareAlike (http://creativecommons.org/licenses/by-sa/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "pluto-ro",
        oTitle: "Pluto",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/3d/img/pluto-ro.png",
        oSrc: "./data/3d/object/pluto-ro.glb",
        oCopyright: `"Pluto" (https://skfb.ly/6TwJE) by Akshat is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },





    

    {
        id: "bird-1",
        oTitle: "Vogel",
        oDescription: "Ein oranger Vogel im Wald",
        oSubject: "bi",
        oFsk: 0,

        oBanner: "./data/3d/img/bird.png",
        oSrc: "./data/3d/object/bird_orange.glb",
        oCopyright: "'Bird Orange' (https://skfb.ly/oGo8E) by Wen Yeh is licensed under CC Attribution-NonCommercial-ShareAlike (http://creativecommons.org/licenses/by-nc-sa/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "url('./data/3d/img/nature-1311619_640.jpg')",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "cat-1",
        oTitle: "Katze",
        oDescription: "Eine lebendige Katze",
        oSubject: "bi",
        oFsk: 0,

        oBanner: "./data/3d/img/cat.png",
        oSrc: "./data/3d/object/an_animated_cat.glb",
        oCopyright: "'An Animated Cat' (https://skfb.ly/6YPwH) by Evil_Katz is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 8,
        oBackground: "transparent",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "dog-1",
        oTitle: "Hund",
        oDescription: "Ein Hund - der beste Freund des Menschen",
        oSubject: "bi",
        oFsk: 0,

        oBanner: "./data/3d/img/dog.png",
        oSrc: "./data/3d/object/dog_puppy.glb",
        oCopyright: "'Dog Puppy' (https://skfb.ly/oRKH6) by kenchoo is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 8,
        oBackground: "transparent",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },
    {
        id: "fish-1",
        oTitle: "Koi",
        oDescription: "Koi ist die japanische Bezeichnung für 'Karpfen' und beschreibt eine Zuchtform des Karpfens",
        oSubject: "bi",
        oFsk: 0,

        oBanner: "./data/3d/img/fish.png",
        oSrc: "./data/3d/object/koi_fish.glb",
        oCopyright: "'Koi Fish' (https://skfb.ly/oNCWq) by 7PLUS is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "url('./data/3d/img/meer-4898934_640.jpg')",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 5,

        oHotspots: ``,
    },






    {
        id: "newton-1",
        oTitle: "Kugelstoßpendel",
        oDescription: "Bei dem Kugelstoßpendel (auch Kugelpendel genannt) handelt es sich um eine Erfindung von Newton.<br>Es besteht aus einer geraden Reihe gleicher elastischer Kugeln, jede an zwei gleichen Fäden (bifilar) so aufgehängt, dass sie von ihren Nachbarkugeln gerade berührt wird und nur in Richtung zu ihren Nachbarkugeln schwingen kann. Alle Kugeln bilden Pendel gleicher Masse und Pendellänge und vorgegebenem Bewegungspfad.",
        oSubject: "ph",
        oFsk: 0,

        oBanner: "./data/img/favicon.png",
        oSrc: "./data/3d/object/newtons_cradle.glb",
        oCopyright: "'Newton's cradle' (https://skfb.ly/onFvQ) by BlackCube is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "white",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 1,

        oHotspots: ``,
    },

    /*
    {
        id: "heart-1",
        oTitle: "Rotes Herz",
        oDescription: "Rote Herzen symbolisieren in vielen Kulturen ein Zeichen von Liebe",
        oSubject: "bi",
        oFsk: 0,

        oBanner: "./data/3d/img/heart-1.webp",
        oSrc: "./data/3d/object/heart-23.glb",
        oCopyright: "3D model by <a href='https://pixabay.com/users/blendertimer-9538909/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=23'>Daniel Roberts</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=23'>Pixabay</a>",
        oSizeMultiplier: 3,
        oBackground: "rgb(255, 179, 179, 0.3)",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 2,
    },

    {
        id: "disco-1",
        oTitle: "Disco-Kugel",
        oDescription: "Hier sehen Sie eine Disco-Kugel",
        oSubject: "bi",
        oFsk: 0,

        oBanner: "./data/3d/img/disco-1.webp",
        oSrc: "./data/3d/object/disco-ball-2730.glb",
        oCopyright: "3D model by <a href='https://pixabay.com/users/lyocrypt-50042056/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2730'>NaxiLyo Crypt</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2730'>Pixabay</a>",
        oSizeMultiplier: 3,
        oBackground: "transparent",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 2,
    },
    */

    {
        id: "atom-1",
        oTitle: "Aufbau eines Atoms",
        oDescription: "Atome sind die Bausteine, aus denen alle festen, flüssigen und gasförmigen Stoffe bestehen. <br> Sie bestehen aus Protonen, Neutronen und Elektronen.",

        oSubject: "ch",
        oBanner: "./data/img/favicon.png",
        oSrc: "./data/3d/object/atom.glb",
        
        oSizeMultiplier: 4,
        oBackground: "black",
        oAudioStartAt: 1.5,
        oCopyright: "'Atom' (https://skfb.ly/onXKz) by LucasPresoto is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    
        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oHotspots: ``,
    },
    
    {
        id: "earth-pixel",
        oSubject: "er",
        oBanner: "./data/3d/img/earth-1.webp",
        oSrc: "./data/3d/object/earth-9.glb",
        oTitle: "Erdkugel",
        oDescription: `Entdecke unseren 4,5 Millionen Jahre alten Planeten - die Erde.<br>Mit seinen 7 Kontinenten bedeckt sie rund 510 Millionen Quadratkilometer. Rund 71% der Oberfläche sind mit Wasser bedeckt, was einer Fläche von 361 Millionen Quadratkilometern entspricht.<br>Erlebe einen Rundflug über den blauen Planeten.<br>Der Nachbarplanet im <a class='cross-reference' onclick="setCrossReferenceObject('solar-2')">Sonnensystem</a> ist der <a class='cross-reference' onclick="setCrossReferenceObject('mars-1')">Mars</a>.`,

        oSizeMultiplier: 4,
        oBackground: "black",
        oAudioStartAt: 1.5,
        oCopyright: "3D model by <a href='https://pixabay.com/users/blendertimer-9538909/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=9'>Daniel Roberts</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=9'>Pixabay</a>",
    
        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oHotspots: ``,
    
    },
    {
        id: "earth-2",
        oTitle: "Cartoon Erdkugel",
        oDescription: `Entdecke unseren 4,5 Millionen Jahre alten Planeten - die Erde.<br>Mit seinen 7 Kontinenten bedeckt sie rund 510 Millionen Quadratkilometer. Rund 71% der Oberfläche sind mit Wasser bedeckt, was einer Fläche von 361 Millionen Quadratkilometern entspricht.<br>Erlebe einen Rundflug über den blauen Planeten.<br>Der Nachbarplanet im <a class='cross-reference' onclick="setCrossReferenceObject('solar-2')">Sonnensystem</a> ist der <a class='cross-reference' onclick="setCrossReferenceObject('mars-1')">Mars</a>.`,
        oSubject: "er",
        oFsk: 0,

        oBanner: "./data/3d/img/earth2.png",
        oSrc: "./data/3d/object/earth_cartoon.glb",
        oCopyright: "'Earth cartoon' (https://skfb.ly/oYy8F) by onirix is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },


    /*
    {
        id: "solar-1",
        oSubject: "ph",
        oBanner: "./data/img/favicon.png",
        oSrc: "./data/3d/object/solar_system1.glb",
        oTitle: "Sonnensystem (1)",
        oSizeMultiplier: 4,
        oBackground: "black",
        oAudioStartAt: 10,
        oCopyright: "'Solar system' (https://skfb.ly/oKYnC) by dannzjs is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    
        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",
    },
    */

    {
        id: "solar-2",
        oSubject: "ph",
        oBanner: "./data/img/favicon.png",
        oSrc: "./data/3d/object/solar_system2.glb",
        oTitle: "Sonnensystem",
        oDescription: `Das Sonnensystem ist das Planetensystem, in dem sich die Erde befindet. Es besteht aus der Sonne, acht sie umkreisenden Planeten (von innen nach außen: Merkur, Venus, Erde, Mars, Jupiter, Saturn, Uranus und Neptun), deren natürlichen Satelliten, den Zwergplaneten, anderen Kleinkörpern (Kometen, Asteroiden und Meteoroiden) und aus unzähligen Gas- und Staubteilchen, die durch die Anziehungskraft der Sonne an diese gebunden sind.`,
        oSizeMultiplier: 7,
        oBackground: "black",

        oCopyright: "'Solar System : المجموعة الشمسية' (https://skfb.ly/YnDQ) by shooogp is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    
        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oHotspots: `

        <button class="hotspot" slot="hotspot-18" data-surface="17 0 615 616 617 0.353 0.031 0.616" data-visibility-attribute="visible">
        <div class="annotation">Sonne</div>
    </button>


        <button class="hotspot" slot="hotspot-8" data-surface="16 0 162 163 164 0.089 0.601 0.310" data-visibility-attribute="visible">
        <div class="annotation">Merkur</div>
    </button>

    <button class="hotspot" slot="hotspot-10" data-surface="15 0 4015 4016 4017 0.518 0.169 0.313" data-visibility-attribute="visible">
        <div class="annotation">Venus</div>
    </button>

    <button class="hotspot" slot="hotspot-11" data-surface="13 0 30 31 32 0.475 0.387 0.138" data-visibility-attribute="visible">
        <div class="annotation">Erde</div>
    </button>

    <button class="hotspot" slot="hotspot-12" data-surface="12 0 3155 3156 3157 0.021 0.482 0.497" data-visibility-attribute="visible">
        <div class="annotation">Mars</div>
    </button>

    <button class="hotspot" slot="hotspot-14" data-surface="11 0 3175 3177 3178 0.046 0.759 0.195" data-visibility-attribute="visible">
        <div class="annotation">Jupiter</div>
    </button>

    <button class="hotspot" slot="hotspot-15" data-surface="10 0 2547 2549 2550 0.000 0.419 0.580" data-visibility-attribute="visible">
        <div class="annotation">Saturn</div>
    </button>

    <button class="hotspot" slot="hotspot-16" data-surface="9 0 659 661 662 0.211 0.162 0.628" data-visibility-attribute="visible">
        <div class="annotation">Uranus</div>
    </button>

    <button class="hotspot" slot="hotspot-17" data-surface="8 0 959 960 961 0.035 0.202 0.762" data-visibility-attribute="visible">
        <div class="annotation">Neptun</div>
    </button>

    

        `,
    },

    {
        id: "mars-rover-1",
        oSubject: "ph",
        oBanner: "./data/3d/img/mars-rover1.png",
        oSrc: "./data/3d/object/mars-rover.glb",
        oTitle: "Mars Rover",
        oDescription: `Ein Mars-Rover wird bei Einsätzen auf dem Mars und anderen Planeten zur Aufklärung eingesetzt.`,
        oSizeMultiplier: 4,
        oBackground: "url('./data/3d/img/mars.jpg')",
        oCopyright: "'Curiosity Mars rover' (https://skfb.ly/oTPHp) by Cybertron B-127 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\nFoto von RDNE Stock project: https://www.pexels.com/de-de/foto/wuste-trocken-felsen-konzept-8474500/",
    
        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oHotspots: ``,

        oAudioId: null,
    },

    {
        id: "tectonic-1",
        oTitle: "Plattentektonik",
        oDescription: "Erkundet die Plattentektonik, bei der zwei Kontinentalplatten aufeinandertreffen",
        oSubject: "er",
        oFsk: 0,

        oBanner: "./data/3d/img/tectonic1.png",
        oSrc: "./data/3d/object/tectonic_plates_animated.glb",
        oCopyright: "'tectonic plates Animated' (https://skfb.ly/ptRST) by Syafani is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
    },

    


    /*
    {
        id: "tectonic-2",
        oTitle: "Plattentektonik (aufeinander)",
        oDescription: "Erkundet die Plattentektonik",
        oSubject: "er",
        oFsk: 0,

        oBanner: "./data/3d/img/tectonic2.png",
        oSrc: "./data/3d/object/moving_tectonic_plates.glb",
        oCopyright: "'Moving Tectonic Plates' (https://skfb.ly/oSw8D) by eugenek818 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,
    },
    */

    
];



const audioDatabase = [
    {
        id: 1,
        aSrc: "./data/music/night-before-dawn-129272.mp3",
        aStartAt: 2.5,
        aCopyright: "Music by <a href='https://pixabay.com/users/sweet_kr-27931391/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=129272'>Artur Buriak</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=129272'>Pixabay</a>",
    },
    {
        id: 2,
        aSrc: "./data/music/racing-speed-action-music-416097.mp3",
        aStartAt: 1.5,
        aCopyright: "Music by <a href='https://pixabay.com/users/tatamusic-51344851/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=416097'>Mykola Sosin</a> from <a href='https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=416097'>Pixabay</a>",
    },
    {
        id: 3,
        aSrc: "./data/music/birds-forrest-457845.mp3",
        aStartAt: 0,
        aCopyright: "Sound Effect by <a href='https://pixabay.com/users/u_thlvfy3fsc-53936441/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=457845'>u_thlvfy3fsc</a> from <a href='https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=457845'>Pixabay</a>",
    },
    {
        id: 4,
        aSrc: "./data/music/the_mountain-space-438391.mp3",
        aStartAt: 0,
        aCopyright: "Music by <a href='https://pixabay.com/users/the_mountain-3616498/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=438391'>Dmitrii Kolesnikov</a> from <a href='https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=438391'>Pixabay</a>",
    },
    {
        id: 5,
        aSrc: "./data/music/liecio-water-bubbles-257594.mp3",
        aStartAt: 0,
        aCopyright: "Sound Effect by <a href='https://pixabay.com/users/liecio-3298866/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=257594'>LIECIO</a> from <a href='https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=257594'>Pixabay</a>",
    },


    

    
];

/*
{ id: "city-1", oBanner: "./data/img/favicon.png", oSrc: "./data/3d/city_pack_5.glb", oTitle: "Stadt", oSizeMultiplier: 4, oBackground: "#e6e6e6", oAudioStartAt: 1.5, oCopyright: "" },
    { id: "davinci-1", oBanner: "./data/img/favicon.png", oSrc: "./data/3d/da_vinci_code_cryptex.glb", oTitle: "Da Vinci Cryptex", oSizeMultiplier: 3, oBackground: "transparent", oAudioStartAt: 1.5, oCopyright: "" },
    { id: "enigma-1", oBanner: "./data/img/favicon.png", oSrc: "./data/3d/enigma_machine_1934.glb", oTitle: "Enigma", oSizeMultiplier: 3, oBackground: "url('./data/img/favicon.png')", oAudioStartAt: 1.5, oCopyright: "" },
*/

/*
console.log(database[0]);
console.log(database[0].oTitle);
console.log(database.find(u => u.id === "atom-1").oTitle);

console.log(database.length);
*/



function loadThePage()
{
    setObject("bird-1");

    getParameter();

    setMenuFromDatabase();

    checkInternetConnection();

    openWelcomeModal();


    // 🟢 JETZT erst Listener setzen
    document.getElementById("categoryFilter")
        .addEventListener("change", filterObjects);

    document.getElementById("searchInput")
        .addEventListener("input", filterObjects);



    /*
    var valueForInnerHtml = "";

    for (i = 0; i < 12; i++)
    {
        valueForInnerHtml = valueForInnerHtml + "<p>This is great</p>";
    }oImg

    document.getElementById("testInnerHtml").innerHTML = valueForInnerHtml;
    */


    setTimeout(function()
    {
        document.getElementById("loadingPage").style.display = "none";
        document.getElementById("main").style.display = "block";
    }, 3500)

    /*
    console.log(imagesById);
    imagesById[19] = "./data/img/overlay.png";
    console.log(imagesById);
    */

}

/* --- GETTER-METHODEN --- */

function getParameter()
{
    const urlParams = new URLSearchParams(window.location.search);
    var objectId = urlParams.get('o');

    if (objectId != null)
    {
        console.log("Parameter: " + objectId);
        setObject(objectId);
    }
    else
    {
        console.log("Kein Parameter");
    }
}

function getStandardUrl()
{
    return standardUrl;
}

/* --- SETTER-METHODEN --- */

function shareObjectByQrCode()
{
    generateQrCode(objectId);
}


function setMenuFromDatabase(numberOfObjects)
{
    var innerHtmlOfMenu = "";
    /* var runForThisNumber;

    if (numberOfObjects <= database.length)
    {
        runForThisNumber = numberOfObjects;
    }
    else
    {
        runForThisNumber = database.length;
    } */

    for (i = 0; i < database.length; i++)
    {



        /* innerHtmlOfMenu = innerHtmlOfMenu + "<div class='subject-box-new' onclick='setObject('heart-1')'><div class='subject-box-image-container'><div class='icon-qrcode' onclick='generateQrCode('heart-1')'><svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' class='bi bi-qr-code-scan' viewBox='0 0 16 16'><path d='M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z'/><path d='M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z'/><path d='M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z'/><path d='M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z'/><path d='M12 9h2V8h-2z'/></svg></div><div class='icon-copyright'><svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' class='bi bi-c-circle-fill' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503'/></svg></div><img src='./data/3d/img/heart-1.webp'></div><div class='subject-box-title'>Rotes Herz</div></div>"; */
        innerHtmlOfMenu = innerHtmlOfMenu + `
        <div class="subject-box-new" onclick="setObject('${database[i].id}')" data-category="${database[i].oSubject}" data-title="${database[i].oTitle}">
            <div class="subject-box-image-container">

                <div class="icon-qrcode" onclick="generateQrCode('${database[i].id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-qr-code-scan" viewBox="0 0 16 16">
                        <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z"/>
                        <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z"/>
                        <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z"/>
                        <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z"/>
                        <path d="M12 9h2V8h-2z"/>
                    </svg>
                </div>




                <img src="${database[i].oBanner}">

            </div>
            <!-- <div class="subject-box-title"> -->
                <span class="objectTitle">${database[i].oTitle}</span>
            <!-- </div> -->
        </div>
        `;
        
    }

    /*

                    <div class="icon-copyright" onclick="getCopyright('${database[i].id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-c-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503"/>
                    </svg>
                </div>

    */

    document.getElementById("subject-container-new").innerHTML = innerHtmlOfMenu;
}



/*
function setCanvasSize()
{
    var canvas = document.getElementById("canvas");
    var canvasQuotient = canvas.height / canvas.width;

    console.log("C-W: " + canvas.width + " C-H: " + canvas.height + " Q: " + canvasQuotient);

    let w = window.innerWidth;
    let h = window.innerHeight;
    console.log("W-W: " + w + " W-H: " + h);

    var x = ((w - canvas.width) * canvasQuotient);

    console.log(x);

    if ((x + canvas.height) <= h)
    {
        console.log("Canvas volle Höhe");

        canvas.style.height = h+"px";
        canvas.style.width = "auto";

        // canvas.style.left = "px";
    }
    else
    {
        console.log("Canvas volle Breite");

        // canvas.style.width = "100%";
        canvas.style.width = w+"px";
        canvas.style.height = "auto";
    }
}
*/

/*
var closeValue = 0;
function checkCloseOption()
{
    closeValue = closeValue + 1;
    if (closeValue >= numberOfPermissions)
    {
        // Alles erlaubt
        closeWelcomeModal();
    }
}
    */

function getCopyright(id)
{
    alert(database.find(u => u.id === id).oCopyright);
}


async function checkInternetConnection()
{

    /*


    var headerIcon = document.getElementById("header-icon-connection");

    if (navigator.onLine)
    {
        // Online
        // console.log("Online");
        headerIcon.classList.remove("icon-red");
        headerIcon.classList.add("icon-green");
    }
    else
    {
        // Offline
        // console.log("Offline");
        headerIcon.classList.remove("icon-green");
        headerIcon.classList.add("icon-red");
    }

    */

    /*
    try
    {
        const response = await fetch("./data/img/1pixel.png");
        if (response.status >= 200 && response.status < 300)
        {
            console.log("Online");
            headerIcon.classList.remove("icon-red");
            headerIcon.classList.add("icon-green");
        }
        else
        {
            console.log("Offline oder Datei nicht gefunden");
            headerIcon.classList.remove("icon-green");
            headerIcon.classList.add("icon-red");
        }
    }
    catch (err)
    {
        console.log("Offline (Fetch Fehler)", err);
        headerIcon.classList.remove("icon-green");
        headerIcon.classList.add("icon-red");
    }
    */

    setTimeout(checkInternetConnection, timeoutCheckInternetConnection);
}


function setDegByMarker(marker, x, y, z)
{

    const invertedZ = (360 - parseFloat(z)) % 360; 


    // console.log("Auswertung: " + marker)
    switch (marker)
    {
        case 1:
            // fertig

            //           Drehung nach rechts oder links (im/gegen Uhrzeigersinn)
            //              nach vorne und hinten neigen (auf einen zu/von einem weg)
            
            rotateObject(invertedZ, 0, 0);

            break;
        case 2:
            // Fehler, dreht sich nur hin und her
            // rotateObject(0, -90, 0);
            rotateObject(0, -90, 0);

            break;
        case 3:
            // fertig
            
            rotateObject(0, invertedZ, -90);

            break;
        case 4:
            // fertig

            rotateObject(0, -invertedZ, 90);

            break;
        case 5:
            // fertig

            rotateObject(-invertedZ, 0, 180);

            break;
        case 6:
            // Fehler, wie bei Marker 2

            rotateObject(0, 90, 0);

            break;
        default:
            console.log("Anderer Marker");
    }

    // console.log(marker+"\nx: " + x + "\ny: " + y + "\nz: " + z);
}


function openObjectMenu()
{
    document.getElementById("mySidenav").style.height = heightOfObjectMenu;
}
function closeObjectMenu()
{
    document.getElementById("mySidenav").style.height = "0%";
}


function openWelcomeModal()
{
    document.getElementById("welcomeModal").style.display = "block";
}
function closeWelcomeModal()
{
    document.getElementById("welcomeModal").style.display = "none";
    openInfoModal();
}


function openInfoModal()
{
    // setCanvasSize();
    document.getElementById("infoModal").style.display = "block";
}
function closeInfoModal()
{
    document.getElementById("infoModal").style.display = "none";
    openMaintenanceModal();
}

function openMaintenanceModal()
{

    if (maintenanceStatus == 2)
    {
        // Geplant
        document.getElementById("maintenance-info").innerHTML = `Am <b>${maintenanceDate}</b> führen wir zwischen <b>${maintenanceStartTime}</b> und <b>${maintenanceEndTime}</b> Uhr Wartungsarbeiten am System durch. Einige Funktionen können in dieser Zeit nicht verfügbar sein.`;
    }
    else if (maintenanceStatus == 1)
    {
        // Derzeit
        document.getElementById("maintenance-info").innerHTML = `Wegen laufenden Wartungsarbeiten bis <b>${maintenanceEndTime}</b> Uhr können einige Funktionen nur eingeschränkt verfügbar sein.`;
    }

    if (maintenanceStatus != 0)
    {
        setServerAnimation();
        document.getElementById("maintenanceModal").style.display = "block";
    }
    
        
}

function closeMaintenanceModal()
{
    document.getElementById("maintenanceModal").style.display = "none";
}


/**
 * 1. Berechnet die tatsächlichen Bildschirmkoordinaten eines Punktes (x, y) 
 * basierend auf den internen Canvas-Koordinaten.
 * Dies berücksichtigt die Skalierung und Zentrierung des Canvas.
 */
/**
 * 1. Berechnet die tatsächlichen Bildschirmkoordinaten eines Punktes (x, y) 
 * basierend auf den internen Canvas-Koordinaten.
 * Dies berücksichtigt die Skalierung und Zentrierung des Canvas.
 */
function mapCanvasToScreen(canvasX, canvasY) {
    const canvasElement = document.getElementById('canvas');
    
    // Sicherheitspuffer
    if (!canvasElement || canvasElement.width === 0 || canvasElement.height === 0) {
        return { x: 0, y: 0 };
    }

    // NEU: getBoundingClientRect liefert die tatsächliche gerenderte Größe und Position
    const rect = canvasElement.getBoundingClientRect();

    // 1. Aktuelle skalierte Abmessungen in Bildschirm-Pixeln
    const scaledW = rect.width;
    const scaledH = rect.height;

    // 2. Interne (unskalierte) Abmessungen (aus canvas.width/height Attributen)
    const internalW = canvasElement.width;
    const internalH = canvasElement.height;
    
    // 3. Skalierungsfaktor berechnen
    // Der Marker-Punkt muss mit diesem Faktor skaliert werden
    const scaleFactor = scaledW / internalW;

    // 4. Offset des skalierten Canvas zur linken/oberen Kante des Viewports
    // rect.left und rect.top liefern den exakten Abstand vom Viewport-Rand.
    const offsetX = rect.left;
    const offsetY = rect.top;

    // 5. Finales Ergebnis: Skalierter Canvas-Punkt plus Offset
    const screenX = offsetX + (canvasX * scaleFactor);
    const screenY = offsetY + (canvasY * scaleFactor);

    return { x: screenX, y: screenY };
}


/**
 * 2. Positioniert das 3D-Modell (model-viewer) auf dem Bildschirm.
 * Zentriert das Modell um die übergebenen Canvas-Koordinaten.
 */

/*
function positionModelOnMarker(canvasX, canvasY) {
    const model = document.getElementById('move-model');
    
    if (!model) return;

    const screenCoords = mapCanvasToScreen(canvasX, canvasY);

    // Dimensionen des <model-viewer> abrufen, um es zu zentrieren
    const modelWidth = model.offsetWidth;
    const modelHeight = model.offsetHeight;

    // Position des Modells so setzen, dass dessen Mitte auf den Marker-Koordinaten liegt
    const finalX = screenCoords.x - (modelWidth / 2);
    const finalY = screenCoords.y - (modelHeight / 2);

    // CSS-Position anwenden
    model.style.left = `${finalX}px`;
    model.style.top = `${finalY}px`;
    model.style.display = 'block'; // Modell anzeigen
}
    */

function positionModelOnMarker(markers) {
    // Die ID muss exakt mit der ID im HTML übereinstimmen: "move-model"
    var modelViewer = document.getElementById("move-model");
    var canvas = document.getElementById("canvas");

    // Sicherheitscheck: Wenn eines der Elemente nicht existiert, Funktion abbrechen
    if (!modelViewer || !canvas) {
        console.error("Fehler: move-model oder canvas nicht gefunden!");
        return;
    }

    if (markers && markers.length > 0) {
        // --- MARKER GEFUNDEN ---
        
        // Falls ein Ausblend-Timer läuft, stoppen wir ihn sofort
        if (markerLostTimeout) {
            clearTimeout(markerLostTimeout);
            markerLostTimeout = null;
        }
        isMarkerVisible = true;

        // 1. Mittelpunkt des Markers berechnen
        var centerX = (markers[0].corners[0].x + markers[0].corners[1].x + markers[0].corners[2].x + markers[0].corners[3].x) / 4;
        var centerY = (markers[0].corners[0].y + markers[0].corners[1].y + markers[0].corners[2].y + markers[0].corners[3].y) / 4;

        // 2. Skalierung und Position des Canvas berechnen
        const rect = canvas.getBoundingClientRect();
        const scaleX = rect.width / canvas.width;
        const scaleY = rect.height / canvas.height;

        // 3. Position auf dem Bildschirm berechnen
        const screenX = rect.left + (centerX * scaleX);
        const screenY = rect.top + (centerY * scaleY);

        // 4. Position zuweisen und anzeigen
        modelViewer.style.display = "block";
        modelViewer.style.left = screenX + "px";
        modelViewer.style.top = screenY + "px";
        modelViewer.style.transform = "translate(-50%, -50%)";

    } else {

        if (isMarkerVisible && !markerLostTimeout) {
            markerLostTimeout = setTimeout(function() {
                modelViewer.style.display = "none";
                isMarkerVisible = false;
                markerLostTimeout = null;
            }, 600); // 400ms Toleranzzeit gegen Flackern
        }
    }
}





// Hides the model when the marker is lost (already mentioned in previous steps)
function handleMarkerLost() {
    const model = document.getElementById('move-model');
    if (model) {
        model.style.display = 'none';
    }
}

/**
 * Konvertiert Pixel-Koordinaten in normalisierte Koordinaten für den POSIT-Algorithmus.
 */
function normalize(corners, width, height) {
    var halfWidth = width / 2;
    var halfHeight = height / 2;

    var normalized = [];

    for (var i = 0; i < 4; i++) {
        var x = corners[i].x;
        var y = corners[i].y;

        // Verschiebt den Nullpunkt in die Mitte des Canvas und skaliert auf den Bereich [-1, 1]
        normalized[i] = {
            x: (x - halfWidth) / halfWidth,
            y: (y - halfHeight) / halfHeight
        };
    }

    return normalized;
}






var oSrc;
var oTitle;
var oBackground;
var oSizeMultiplier;
var oAudioStartAt;

function getObjectTitle(parameter)
{
    /* setObject(parameter);
    return oTitle; */
    return database.find(u => u.id === parameter).oTitle;
}

function setCrossReferenceObject(id)
{
    document.getElementById('myBottomModal').style.display="none";
    setObject(id);
    openCurrentObjectMenu();
}



function setObject(objectIdParameter)
{

    

    /* Zusatzfunktion für Zuse Tatort */
    
    if (objectIdParameter == "mystery")
    {
        document.getElementById("ar-model").innerHTML = `<!-- Handabdruck auf Stuhl -->
    <button id="hotspot-chair" slot="hotspot-chair"
        class="hotspot-hint"
        data-position="-3.2 6 9.3"
        data-normal="-1 0 0"
        onclick="showHotspotInfobox(this);foundHint('hotspot-chair')">
        <div class="hotspot-info">Blutiger Handabdruck</div>
    </button>

    <!-- Handabdruck auf Tresor -->
    <button id="hotspot-safe" slot="hotspot-safe"
        class="hotspot-hint"
        data-position="-10.5 6.5 3"
        data-normal="-1 0 0"
        onclick="showHotspotInfobox(this);foundHint('hotspot-safe')">
        <div class="hotspot-info">Blutiger Handabdruck</div>
    </button>

    <!-- Bluttropfen auf Tisch -->
    <button id="hotspot-blood1" slot="hotspot-blood1"
        class="hotspot-hint"
        data-position="-12.5 4.5 6"
        data-normal="-1 0 0"
        onclick="showHotspotInfobox(this);foundHint('hotspot-blood1')">
        <div class="hotspot-info">Bluttropfen</div>
    </button>

    <!-- Bluttropfen am Boden -->
    <button id="hotspot-blood2" slot="hotspot-blood2"
        class="hotspot-hint"
        data-position="-11.8 0.5 5.8"
        data-normal="-1 0 0"
        onclick="showHotspotInfobox(this);foundHint('hotspot-blood2')">
        <div class="hotspot-info">Bluttropfen</div>
    </button>

    <!-- Werkzeug im Mülleimer -->
    <button id="hotspot-tool1" slot="hotspot-tool1"
        class="hotspot-hint"
        data-position="-13.5 1 -11.5"
        data-normal="-1 0 0"
        onclick="showHotspotInfobox(this);foundHint('hotspot-tool1')">
        <div class="hotspot-info">Schraubenzieher</div>
    </button>

    <!-- Werkzeug auf Sofa -->
    <button id="hotspot-tool2" slot="hotspot-tool2"
        class="hotspot-hint"
        data-position="12 2.5 -12.5"
        data-normal="-1 0 0"
        onclick="showHotspotInfobox(this);foundHint('hotspot-tool2')">
        <div class="hotspot-info">Hammer</div>
    </button>`;
    }
    /*
    else if (objectIdParameter == "newton-1")
    {
        document.getElementById("ar-model").innerHTML = `
        <button class="hotspot" slot="hotspot-visor" data-position="0 1.75 0.35" data-normal="0 0 1">
    <div class="annotation">
      <strong>Visier-Info</strong><br>
      Dies ist das goldbeschichtete Visier des Astronauten.
    </div>
  </button>

  <button class="hotspot" slot="hotspot-visor" data-position="0 1 0.35" data-normal="0 0 1">
    <div class="annotation">
      <strong>Visier-Info</strong><br>
      Dies ist das goldbeschichtete Visier des Astronauten.
    </div>
  </button>
    `;


    }
    */
    else
    {
        document.getElementById("ar-model").innerHTML = "";
    }

    if (objectIdParameter == "wwm")
    {
        document.getElementById("wwm-box").style.display = "block";
        imagesById[1] = "./data/img/marco.png";
        imagesById[2] = "./data/img/marco.png";
    }
    else
    {
        document.getElementById("wwm-box").style.display = "none";
        imagesById[1] = "";
        imagesById[2] = "";
    }

    objectId = objectIdParameter;

    closeObjectMenu(); // Wenn von Menü aufgerufen

    var model = document.getElementById("move-model");

    /*
    switch (objectId)
    {
        case "heart-1":
            oSrc = "./data/3d/heart-23.glb";
            oTitle = "Rotes Herz";
            oSizeMultiplier = 3;
            oBackground = "rgb(255, 179, 179, 0.3)";
            oAudioStartAt = 5;
            break;
        case "disco-1":
            oSrc = "./data/3d/disco-ball-2730.glb";
            oTitle = "Disco-Kugel";
            oSizeMultiplier = 3;
            oBackground = "transparent";
            oAudioStartAt = 1.5;
            break;
        case "atom-1":
            oSrc = "./data/3d/atom.glb";
            oTitle = "Aufbau eines Atoms";
            oSizeMultiplier = 4;
            oBackground = "black";
            oAudioStartAt = 5;
            break;
        case "city-1":
            oSrc = "./data/3d/city_pack_5.glb";
            oTitle = "Stadt";
            oSizeMultiplier = 4;
            oBackground = "#e6e6e6";
            oAudioStartAt = 5;
            break;
        case "davinci-1":
            oSrc = "./data/3d/da_vinci_code_cryptex.glb";
            oTitle = "Da Vinci Cryptex";
            oSizeMultiplier = 3;
            oBackground = "transparent";
            oAudioStartAt = 5;
            break;
        case "enigma-1":
            oSrc = "./data/3d/enigma_machine_1934.glb";
            oTitle = "Enigma";
            oSizeMultiplier = 3;
            oBackground = "url('./data/img/favicon.png')"; // black
            oAudioStartAt = 5;
            break;
    }
    */

    // Werte auf Standard zurücksetzen
    model.style.backgroundColor = "transparent";
    model.style.backgroundImage = "none";

    // Zuweisung und Anwendung
    model.src = ""; // Zurücksetzen für Ladebild
    model.src = database.find(u => u.id === objectId).oSrc;
    document.getElementById("objectTitle").innerHTML = database.find(u => u.id === objectId).oTitle;
    


    // setAudioPlayTime(database.find(u => u.id === objectId).oAudioStartAt);
    // document.getElementById("audioPlayer").src = database.find(u => u.id === objectId).oAudioSrc;

    var audioId = database.find(u => u.id === objectId).oAudioId;

    if (audioId != null)
    {
        setAudioPlayTime(audioDatabase.find(u => u.id === audioId).aStartAt);
        document.getElementById("audioPlayer").src = audioDatabase.find(u => u.id === audioId).aSrc;
    }
    else
    {
        document.getElementById("audioPlayer").src = null;
    }
    

    // console.warn(audioId);

    //console.warn(audioDatabase.find(u => u.id === audioId).aStartAt);
    //console.warn(audioDatabase.find(u => u.id === audioId).aSrc);

    



    document.getElementById("title").style.backgroundColor = "rgba(98, 166, 14, 0.5)";
    document.getElementById("title").style.borderColor = "rgba(98, 166, 14, 0.5)";
    document.getElementById("title").style.color = "white";

    document.getElementById("title").style.backgroundColor = database.find(u => u.id === objectId).oMainBgColor;
    document.getElementById("title").style.borderColor = database.find(u => u.id === objectId).oMainBgColor;
    document.getElementById("title").style.color = database.find(u => u.id === objectId).oMainTextColor;
    
    // variable.includes("url(")



    

    if (database.find(u => u.id === objectId).oBackground.includes("url("))
    {
        model.style.backgroundImage = database.find(u => u.id === objectId).oBackground;
    }
    else
    {
        model.style.backgroundColor = database.find(u => u.id === objectId).oBackground;
    }    

    document.getElementById("ar-model").innerHTML = database.find(u => u.id === objectId).oHotspots;
    
}

function openCurrentObjectMenu()
{

    var arModel = document.getElementById("ar-model");

    arModel.style.backgroundColor = "transparent";
    arModel.style.backgroundImage = "none";

    arModel.src = database.find(u => u.id === objectId).oSrc; // objectId = Instanzvariable
    if (database.find(u => u.id === objectId).oBackground.includes("url("))
    {
        arModel.style.backgroundImage = database.find(u => u.id === objectId).oBackground;
    }
    else
    {
        arModel.style.backgroundColor = database.find(u => u.id === objectId).oBackground;
    }    


    document.getElementById("bottom-modal-title").innerHTML = database.find(u => u.id === objectId).oTitle + " betrachten";

    var subjectName;

    switch (database.find(u => u.id === objectId).oSubject)
    {
        case "zu":
            subjectName = "Zuse intern";
            break;

        case "ph":
            subjectName = "Physik";
            break;
        case "bi":
            subjectName = "Biologie";
            break;
        case "ch":
            subjectName = "Chemie";
            break;
        case "er":
            subjectName = "Erdkunde";
            break;

        default:
            subjectName = "Keine Kategorie";
            
    }

    document.getElementById("subject-badge").innerHTML = subjectName;
    
    document.getElementById("bottom-modal-description").innerHTML = database.find(u => u.id === objectId).oDescription;
    document.getElementById("copyright-accordion").innerHTML = database.find(u => u.id === objectId).oCopyright;

    // Audio abspielen?

    

    document.getElementById("myBottomModal").style.display = "block";
}

function setObjectSize(pixelSize)
{
    // console.log(pixelSize);
    // console.log(objectId);

    document.getElementById("move-model").style.width = (pixelSize * database.find(u => u.id === objectId).oSizeMultiplier) + "px";
    document.getElementById("move-model").style.height = (pixelSize * database.find(u => u.id === objectId).oSizeMultiplier) + "px";
}

function getContactInformation(parameter)
{
    if (parameter == null)
    {
        var address1 = "mailto:marco.weber@konrad-zuse-schule.de";
        window.open(address1);
    }
    else if (parameter == "pp")
    {
        var address2 = "mailto:marco.weber@konrad-zuse-schule.de?subject=Anfrage%20Pilotprojekt";
        // Pilotprojekt
        window.open(address2);
    }
}

function setFullscreenForObject(id)
{
    var elem = document.getElementById(id);

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }

}


function openAiMenu()
{
    alert("Die KI-Funktion befindet sich derzeit noch in der Entwicklungsphase.");
}


function shareObjectByLink(source)
{
    var title = database.find(u => u.id === objectId).oTitle;
    switch (source)
    {
        case "whatsapp":
            //console.log("whatsapp://send?text=" + objectId + " mit dem AR-Cube entdecken!\n" + standardUrl + objectId);
            window.open("whatsapp://send?text=" + title + " mit dem AR-Cube entdecken!\n" + standardUrl + objectId);
            //window.open("https://api.whatsapp.com/send?phone=whatsappphonenumber&text=urlencodedtext");
            break;
        case "linkedin":
            window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + standardUrl + objectId);
            break;
        case "twitter-x":
            window.open("https://twitter.com/intent/tweet?text=" + title + " mit dem AR-Cube entdecken!&url=" + standardUrl + objectId);
            break;
        case "facebook":
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + standardUrl + objectId);
            break;
        case "mail":
            window.open("mailto:?subject=AR-Cube&body=" + title + " mit dem AR-Cube entdecken\n" + standardUrl + objectId);
            break;
        case "url":
            copyQrCodeUrl();
            break;
        case "image":
            downloadPNG();
            break;


        
        default:
            console.error("Ungültige Quelle");
            break;
    }
}


/*
function setWebcamSize(x, y)
{
    //console.log("Webcam width: " + x);
    //console.log("Webcam height: " + y);

    let ww = window.innerWidth;
    let wh = window.innerHeight;
    //console.log(ww);
    //console.log(wh);

    // x = Webcame width
    // y = Webcame height
    // ww = Fenster width
    // wh = Fenster height

    w1 = ww / x;
    w2 = wh / y;
    console.log(w1);
    console.log(w2);

    
    if (w1 >= w2)
    {
        // w1 >= w2
        console.log("Fall 1");
        document.getElementById("canvas").style.width = "100%";
    }
    else
    {
        // w2 > w1
        console.log("Fall 2");
        document.getElementById("canvas").style.height = wh;
    }
        

}
*/

