// Anzahl zu erlaubender Berechtigungen
var numberOfPermissions = 2;
// Höhe: Menü für Objekte
var heightOfObjectMenu = "100%";
// Timeout zur Überprüfung der Internetverbindung (10000 = 10s)
var timeoutCheckInternetConnection = 30000;
// Standard-URL für QR-Code-Erstellung
var standardUrl = "https://marcow2812.github.io/zuse-projekt/main/explorer.html?o="; 

var markerLostTimeout = null;
var isMarkerVisible = false;

// NEU: Für das HTML Element (move-html)
var htmlLostTimeout = null; 
var isHtmlVisible = false;


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
var objectId = "bird-1";


// Objekt-Datenbank
const database = [
    {
        id: "mcd-iceberg",
        oTitle: "Eisberg",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/iceberg.png",
        oSrc: "./data/3d/object/mcd-iceberg.glb",
        oCopyright: `"Low Poly Iceberg Scene" (https://skfb.ly/osFWu) by zephyrin is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 7,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: null,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-garbage1",
        oTitle: "Müll im Meer",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/garbage1.png",
        oSrc: "./data/3d/object/mcd-garbage.glb",
        oCopyright: `"Garbage" (https://skfb.ly/ozWnY) by s_ebo_l is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 7,
        oBackground: "#393531",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-rubbish",
        oTitle: "Müllberg",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/rubbish.png",
        oSrc: "https://cbnb.de/3dobjects/mcd-rubbish.glb",
        oCopyright: `"Urban Trash (Garbage, Rubbish) - Photoscaned" (https://skfb.ly/opDIF) by Cathouse is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 7,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-atmosphere",
        oTitle: "Atmosphäre der Erde",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/atmosphere.png",
        oSrc: "./data/3d/object/mcd-atmosphere.glb",
        oCopyright: `"Earth with Mountains and Atmosphere" (https://skfb.ly/6RPOu) by CHRIS .capycoil is licensed under Creative Commons Attribution-ShareAlike (http://creativecommons.org/licenses/by-sa/4.0/).`,
        oSizeMultiplier: 7,
        oBackground: "black",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-duerre",
        oTitle: "Dürre",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/duerre.png",
        oSrc: "https://cbnb.de/3dobjects/mcd-duerre.glb",
        oCopyright: `"Lake Hefner Cove 10-7-2014" (https://skfb.ly/CvMq) by Matthew Schroyer is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 9,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-gesunde-koralle",
        oTitle: "Gesunde Koralle",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/gesunde-koralle.png",
        oSrc: "./data/3d/object/mcd-gesunde-koralle.glb",
        oCopyright: `"Rainbow Haven Reef - coral" (https://skfb.ly/pxGVy) by Brian Trepanier is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 9,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-gestorbene-koralle",
        oTitle: "Gestorbene Koralle",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/gestorbene-koralle.png",
        oSrc: "https://cbnb.de/3dobjects/mcd-gestorbene-koralle.glb",
        oCopyright: `"Fossil coral 1" (https://skfb.ly/6VDr8) by Sara Carena is licensed under Creative Commons Attribution-NonCommercial (http://creativecommons.org/licenses/by-nc/4.0/).`,
        oSizeMultiplier: 7,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-beach-garbage",
        oTitle: "Müll am Strand",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/beach-garbage.png",
        oSrc: "./data/3d/object/mcd-beach-garbage.glb",
        oCopyright: `"Beach full of garbage" (https://skfb.ly/6TSPp) by Kanisto is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 9,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-glacier-wall",
        oTitle: "Gletscher-Wand",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/glacier-wall.png",
        oSrc: "./data/3d/object/mcd-glacier-wall.glb",
        oCopyright: `"Svalbard Ausfonna Glacier Wall" (https://skfb.ly/6Swvn) by Sircher is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 9,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-hurricane",
        oTitle: "Hurrikan",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/hurricane.png",
        oSrc: "./data/3d/object/mcd-hurricane.glb",
        oCopyright: `"Hurricane Harvey Landfall" (https://skfb.ly/6UxWw) by The COMET Program is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 7,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },

    {
        id: "mcd-flooding",
        oTitle: "Überflutung",
        oDescription: "",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/flooding.png",
        oSrc: "./data/3d/object/mcd-flooding.glb",
        oCopyright: `"Angel Mounds flooding 3" (https://skfb.ly/oDzor) by Advanced Visualization Lab - Indiana University is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 9,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: ``,
    },



    /* ------------------------------------------ */

    {
        id: "klimawandel-hotspots",
        oTitle: "Klimawandel Hotspots",
        oDescription: "Klimazonen sind große Gebiete der Erde, in denen das Klima über sehr lange Zeit relativ gleich bleibt. In Summe kann man die Erde in fünf große Klimazonen einteilen: die polare Zone, die subpolare Zone, die gemäßigte Zone, die subtropische Zone und die tropische Zone.<br><br>Die Auswirkungen des Klimawandels sind an vielen Orten auf der Welt deutlich sichtbar.",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/klimawandel-hotspots.png",
        oSrc: "./data/3d/object/klimawandel-hotspots.glb",
        oCopyright: `"Earth" (https://skfb.ly/6U8BH) by PatelDev is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 9,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        
        oHotspots: `


        <button class="hotspot" slot="hotspot-1" data-position="0.8518005228693186m 0.6623990549342257m -0.28355473118138796m" data-normal="0.7680588463993542m 0.5833445558022308m -0.26418693700406853m" data-visibility-attribute="visible">
        <div class="annotation">Mediterranes Becken – häufigere Hitzewellen, Waldbrände und Wasserknappheit</div>
    </button><button class="hotspot" slot="hotspot-3" data-position="0.7608529917507858m 0.8005489768074671m -0.16574414546848096m" data-normal="0.6854824597476196m 0.7134771259618361m -0.1451350684968714m" data-visibility-attribute="visible">
        <div class="annotation">Lagune von Venedig – häufigere Überschwemmungen durch steigenden Meeresspiegel</div>
    </button><button class="hotspot" slot="hotspot-4" data-position="0.8125386461948105m 0.7657221071054678m -0.004280058235139418m" data-normal="0.7348410221361323m 0.6781792054271665m -0.009035347923647524m" data-visibility-attribute="visible">
        <div class="annotation">Pyrenäen – Rückgang vieler kleiner Gletscher</div>
    </button><button class="hotspot" slot="hotspot-5" data-position="1.0202849057863006m 0.38463744348240747m -0.22826295520175574m" data-normal="0.9177493006860667m 0.3463766292613922m -0.19431791423271214m" data-visibility-attribute="visible">
        <div class="annotation">Sahel – zunehmende Dürren und Desertifikation</div>
    </button><button class="hotspot" slot="hotspot-6" data-position="1.050937318864629m 0.2586522680701989m -0.261865831698228m" data-normal="0.9469135790536249m 0.229694684724895m -0.22493338038847363m" data-visibility-attribute="visible">
        <div class="annotation">Tschadsee – stark geschrumpfter See durch Trockenheit und Nutzung</div>
    </button><button class="hotspot" slot="hotspot-7" data-position="0.8840895320513783m -0.6123796567532291m -0.29535086489785484m" data-normal="0.7941890212368802m -0.5428063396684968m -0.27317590699491545m" data-visibility-attribute="visible">
        <div class="annotation">Kapstadt – extreme Wasserknappheit und Dürren</div>
    </button><button class="hotspot" slot="hotspot-8" data-position="0.8963759515404993m -0.039269140568151055m -0.6587921020491978m" data-normal="0.809878860105198m -0.03662697974959556m -0.5854525568388338m" data-visibility-attribute="visible">
        <div class="annotation">Kilimandscharo – schmelzende Gletscher auf dem Gipfel</div>
    </button><button class="hotspot" slot="hotspot-9" data-position="0.1204082508549859m 0.5371773176020773m -0.9693996286530661m" data-normal="0.1180411849637506m 0.47976195677782046m -0.8694220744155685m" data-visibility-attribute="visible">
        <div class="annotation">Himalaya – rasch schmelzende Hochgebirgsgletscher</div>
    </button><button class="hotspot" slot="hotspot-10" data-position="0.1300315882075603m 0.47786035458313497m -0.9984028553208869m" data-normal="0.12244513342785693m 0.41424662563001774m -0.9018907486242324m" data-visibility-attribute="visible">
        <div class="annotation">Gangesdelta – Überschwemmungen und steigender Meeresspiegel</div>
    </button><button class="hotspot" slot="hotspot-11" data-position="-0.3182375640421568m -0.11765678966989929m -1.0602481612211725m" data-normal="-0.2768655669402852m -0.10949603951860096m -0.9546497133360359m" data-visibility-attribute="visible">
        <div class="annotation">Jakarta – Stadt sinkt zusätzlich zum Meeresspiegelanstieg</div>
    </button><button class="hotspot" slot="hotspot-12" data-position="0.0202578795437738m 0.42361084213071953m -1.030305483631122m" data-normal="0.011434501782511734m 0.36920801032812395m -0.9292764374923825m" data-visibility-attribute="visible">
        <div class="annotation">Sundarbans – Verlust von Mangroven durch steigendes Meerwasser</div>
    </button><button class="hotspot" slot="hotspot-13" data-position="0.3933482030233632m 0.7993826468231531m -0.6734043504575296m" data-normal="0.35278971680851434m 0.7134765975715338m -0.6053846384175238m" data-visibility-attribute="visible">
        <div class="annotation">Aralsee – extreme Austrocknung eines ehemals großen Sees</div>
    </button><button class="hotspot" slot="hotspot-14" data-position="-0.022874959904133532m 0.5652164833481345m 0.9608308608174106m" data-normal="-0.01064362002705227m 0.5010513426935694m 0.8653521048322994m" data-visibility-attribute="visible">
        <div class="annotation">Küste von Louisiana – Küstenverlust und steigender Meeresspiegel</div>
    </button><button class="hotspot" slot="hotspot-15" data-position="-0.430289205512291m 1.0148361005148812m 0.19311933293542244m" data-normal="-0.38068113118497443m 0.9081131541869991m 0.17439144346058966m" data-visibility-attribute="visible">
        <div class="annotation">Alaska – tauender Permafrost und Küstenerosion</div>
    </button><button class="hotspot" slot="hotspot-16" data-position="-0.3636024935700504m 0.6308427616299115m 0.8449437392347221m" data-normal="-0.3255701467800775m 0.5632575575154691m 0.7594372939402613m" data-visibility-attribute="visible">
        <div class="annotation">Colorado-River-Becken – sinkende Wasserstände und Dürren</div>
    </button><button class="hotspot" slot="hotspot-17" data-position="0.40163957776604287m -0.37560039430417264m 0.9688485944941804m" data-normal="0.37285052725684514m -0.3233752804521431m 0.869718869702613m" data-visibility-attribute="visible">
        <div class="annotation">Anden – Rückgang vieler Andengletscher</div>
    </button><button class="hotspot" slot="hotspot-20" data-position="0.5294146950920114m -0.3771090158532781m 0.9046881070755398m" data-normal="0.4764452736837093m -0.32337631157988644m 0.817574254911102m" data-visibility-attribute="visible">
        <div class="annotation">Pantanal – stärkere Dürren und Waldbrände</div>
    </button><button class="hotspot" slot="hotspot-21" data-position="-1.103791756358442m -0.13061205265376652m -0.06181290880569759m" data-normal="-0.992112475630425m -0.10950481377292402m -0.06100435606599511m" data-visibility-attribute="visible">
        <div class="annotation">Tuvalu – Inseln bedroht durch Meeresspiegelanstieg</div>
    </button><button class="hotspot" slot="hotspot-22" data-position="-1.095517166942515m 0.10976100458682425m -0.16489692898490943m" data-normal="-0.9837155793078224m 0.08526568070821153m -0.15821953962908952m" data-visibility-attribute="visible">
        <div class="annotation">Kiribati – häufige Überflutungen und Versalzung von Böden</div>
    </button><button class="hotspot" slot="hotspot-23" data-position="-0.6891659846987037m -0.747122446795006m -0.4616661707760602m" data-normal="-0.6195050865954191m -0.6599555363503098m -0.42505545252705235m" data-visibility-attribute="visible">
        <div class="annotation">Tasmanien – zunehmende Waldbrände und veränderte Ökosysteme</div>
    </button>

    `,


        
        oFacts: `
        <div class="fact"><u><b>Europa</b></u></div>
        <div class="fact">Mediterranes Becken</div>
        <div class="fact">Lagune von Venedig</div>
        <div class="fact">Pyrenäen</div>

        <div class="fact"><u><b>Afrika</b></u></div>
        <div class="fact">Sahel</div>
        <div class="fact">Tschadsee</div>
        <div class="fact">Kapstadt</div>
        <div class="fact">Kilimandscharo</div>

        <div class="fact"><u><b>Asien</b></u></div>
        <div class="fact">Himalaya</div>
        <div class="fact">Gangesdelta</div>
        <div class="fact">Jakarta</div>
        <div class="fact">Sundarbans</div>
        <div class="fact">Aralsee</div>

        <div class="fact"><u><b>Nordamerika</b></u></div>
        <div class="fact">Küste von Louisiana</div>
        <div class="fact">Alaska</div>
        <div class="fact">Colorado-River-Becken</div>

        <div class="fact"><u><b>Südamerika</b></u></div>
        <div class="fact">Anden</div>
        <div class="fact">Pantanal</div>

        <div class="fact"><u><b>Ozeanien und Pazifik</b></u></div>
        <div class="fact">Tuvalu</div>
        <div class="fact">Kiribati</div>
        <div class="fact">Tasmanien</div>
        `,
    },

    {
        id: "klimazonen-erde",
        oTitle: "Klimazonen",
        oDescription: "Klimazonen sind große Gebiete der Erde, in denen das Klima über sehr lange Zeit relativ gleich bleibt. In Summe kann man die Erde in fünf große Klimazonen einteilen: die polare Zone, die subpolare Zone, die gemäßigte Zone, die subtropische Zone und die tropische Zone.<br><br>Die Auswirkungen des Klimawandels sind an vielen Orten auf der Welt deutlich sichtbar.",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/klimazonen-erde.png",
        oSrc: "./data/3d/object/klimazonen-erde.glb",
        oCopyright: `"Earth" (https://skfb.ly/6U8BH) by PatelDev is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 9,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        
        oHotspots: ``,


        
        oFacts: `
        <div class="fact">Polare Zone</div>
        <div class="fact">Subpolare Zone</div>
        <div class="fact">Gemäßigte Zone</div>
        <div class="fact">Subtropische Zone</div>
        <div class="fact">Tropische Zone</div>
        `,
    },

    {
        id: "steckbriefe-klimazonen",
        oTitle: "Steckbriefe Klimazonen",
        oDescription: "Verwendet die auf dem Würfel hinterlegten PDFs zum Ausfüllen eures Booklets.",
        oSubject: "bi",
        oFsk: 0,
        oType: "img",

        oBanner: "./data/3d/img/klimazonen.png",
        oSrc: "",
        oCopyright: "Ohne Copyright",
        oSizeMultiplier: 8,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: null,

        oHotspots: ``,

        oMarker1: `<iframe class="yt-iframe" width="100%" height="100%" src="./data/3d/pdf/WS1.html"></iframe>`,
        oMarker2: `<iframe class="yt-iframe" width="100%" height="100%" src="./data/3d/pdf/WS2.html"></iframe>`,
        oMarker3: `<iframe class="yt-iframe" width="100%" height="100%" src="./data/3d/pdf/WS3.html"></iframe>`,
        oMarker4: `<iframe class="yt-iframe" width="100%" height="100%" src="./data/3d/pdf/WS4.html"></iframe>`,
        oMarker5: `<iframe class="yt-iframe" width="100%" height="100%" src="./data/3d/pdf/WS5.html"></iframe>`,
        oMarker6: `<iframe class="yt-iframe" width="100%" height="100%" src="./data/3d/pdf/WS6.html"></iframe>`,
        
    },
    {
        id: "5-klimazonen",
        oTitle: "Die 5 Klimazonen",
        oDescription: "Auf jeder Seite des Würfels findet ihr eine andere Klimazone",
        oSubject: "bi",
        oFsk: 0,
        oType: "img",

        oBanner: "./data/3d/img/steckbrief.png",
        oSrc: "",
        oCopyright: "Ohne Copyright",
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: null,

        oHotspots: ``,

        oMarker1: `<div class="frame-text-div">Die 5 Klimazonen der Erde</div>`,

        oMarker2: `<img width="100%" src="https://blog.assets.studyflix.de/wp-content/uploads/2021/09/WordPress_PolareZone-1-1024x576.jpg">`,
        oMarker3: `<img width="100%" src="https://blog.assets.studyflix.de/wp-content/uploads/2021/09/WordPress_SubpolareZone-1-1024x576.jpg">`,
        oMarker4: `<img width="100%" src="https://blog.assets.studyflix.de/wp-content/uploads/2021/09/WordPress_gem%C3%A4%C3%9FigteZone-1-1024x576.jpg">`,
        oMarker5: `<img width="100%" src="https://blog.assets.studyflix.de/wp-content/uploads/2021/09/WordPress_SubtropischeZone-1-1024x576.jpg">`,
        oMarker6: `<img width="100%" src="https://blog.assets.studyflix.de/wp-content/uploads/2021/09/WordPress_TropischeZone-1-1024x576.jpg">`,
    },





    {
        id: "sonne-ro",
        oTitle: "Sonne",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/sonne-ro.png",
        oSrc: "./data/3d/object/sonne-ro.glb",
        oCopyright: `"Sun" (https://skfb.ly/6U8EY) by PatelDev is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Stern</div>
        <div class="fact">Astronomisches Symbol: ☉</div>
        <div class="fact">4,57 Mrd. Jahre</div>
        <div class="fact">⌀ 1,4 Mio. km</div>
        `,
    },
    {
        id: "merkur-ro",
        oTitle: "Merkur",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/merkur-ro.png",
        oSrc: "./data/3d/object/merkur-ro.glb",
        oCopyright: `"Mercury (planet)" (https://skfb.ly/6yuRD) by SebastianSosnowski is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Planet</div>
        <div class="fact">Astronomisches Symbol: ☿</div>
        <div class="fact">4,5 Mrd. Jahre</div>
        <div class="fact">⌀ 4880 km</div>
        `,
    },
    {
        id: "venus-ro",
        oTitle: "Venus",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/venus-ro.png",
        oSrc: "./data/3d/object/venus-ro.glb",
        oCopyright: `"Venus" (https://skfb.ly/ITvT) by kongle is licensed under Creative Commons Attribution-ShareAlike (http://creativecommons.org/licenses/by-sa/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Planet</div>
        <div class="fact">Astronomisches Symbol: ♀</div>
        <div class="fact">4,5 Mrd. Jahre</div>
        <div class="fact">⌀ 12104 km</div>
        `,
    },
    {
        id: "erde-ro",
        oTitle: "Erde",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/erde-ro.png",
        oSrc: "./data/3d/object/erde-ro.glb",
        oCopyright: `"Earth" (https://skfb.ly/6U8BH) by PatelDev is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Planet</div>
        <div class="fact">Astronomisches Symbol: 🜨</div>
        <div class="fact">4,54 Mrd. Jahre</div>
        <div class="fact">⌀ 12700 km</div>
        `,
    },
    {
        id: "mars-ro",
        oTitle: "Mars",
        oDescription: `(Beschreibung folgt)`,
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/mars-ro.png",
        oSrc: "./data/3d/object/mars-ro.glb",
        oCopyright: "'Mars' (https://skfb.ly/oyCyK) by JanesBT is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 4,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Planet</div>
        <div class="fact">Astronomisches Symbol: ♂</div>
        <div class="fact">4,5 Mrd. Jahre</div>
        <div class="fact">⌀ 6794 km</div>
        `,
    },
    {
        id: "jupiter-ro",
        oTitle: "Jupiter",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/jupiter-ro.png",
        oSrc: "./data/3d/object/jupiter-ro.glb",
        oCopyright: `"Realistic Jupiter" (https://skfb.ly/oKT8Y) by Shady Tex is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Planet</div>
        <div class="fact">Astronomisches Symbol: ♃</div>
        <div class="fact">4,5 Mrd. Jahre</div>
        <div class="fact">⌀ 142976 km</div>
        `,
    },
    {
        id: "saturn-ro",
        oTitle: "Saturn",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/saturn-ro.png",
        oSrc: "./data/3d/object/saturn-ro.glb",
        oCopyright: `"Saturn" (https://skfb.ly/onNus) by PatelDev is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Planet</div>
        <div class="fact">Astronomisches Symbol: ♄</div>
        <div class="fact">4,5 Mrd. Jahre</div>
        <div class="fact">⌀ 120536 km</div>
        `,
    },
    {
        id: "uranus-ro",
        oTitle: "Uranus",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/uranus-ro.png",
        oSrc: "./data/3d/object/uranus-ro.glb",
        oCopyright: `"Uranus" (https://skfb.ly/6TwIN) by Akshat is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Planet</div>
        <div class="fact">Astronomisches Symbol: ⛢ ♅</div>
        <div class="fact">4,5 Mrd. Jahre</div>
        <div class="fact">⌀ 51118 km</div>
        `,
    },
    {
        id: "neptun-ro",
        oTitle: "Neptun",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/neptun-ro.png",
        oSrc: "./data/3d/object/neptun-ro.glb",
        oCopyright: `"Neptune" (https://skfb.ly/IUFS) by kongle is licensed under Creative Commons Attribution-ShareAlike (http://creativecommons.org/licenses/by-sa/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Planet</div>
        <div class="fact">Astronomisches Symbol: ♆</div>
        <div class="fact">4,5 Mrd. Jahre</div>
        <div class="fact">⌀ 49528 km</div>
        `,
    },
    {
        id: "pluto-ro",
        oTitle: "Pluto",
        oDescription: "(Beschreibung folgt)",
        oSubject: "ph",
        oFsk: 0,
        oType: "3d",

        oBanner: "./data/3d/img/pluto-ro.png",
        oSrc: "./data/3d/object/pluto-ro.glb",
        oCopyright: `"Pluto" (https://skfb.ly/6TwJE) by Akshat is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 3,

        oHotspots: ``,
        oFacts: `
        <div class="fact">Typ: Zwergplanet</div>
        <div class="fact">Astronomisches Symbol: ⯓♇</div>
        <div class="fact">4,5 Mrd. Jahre</div>
        <div class="fact">⌀ 2374 km</div>
        `,
    },


    {
        id: "bird-1",
        oTitle: "Vogel",
        oDescription: "Ein oranger Vogel im Wald",
        oSubject: "bi",
        oFsk: 0,
        oType: "3d",

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
        oType: "3d",

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
        oType: "3d",
        

        oBanner: "./data/3d/img/dog.png",
        oSrc: "./data/3d/object/dog_puppy.glb",
        oCopyright: "'Dog Puppy' (https://skfb.ly/oRKH6) by kenchoo is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 10,
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
        oType: "3d",

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
        oType: "3d",

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


    {
        id: "atom-1",
        oTitle: "Aufbau eines Atoms",
        oDescription: "Atome sind die Bausteine, aus denen alle festen, flüssigen und gasförmigen Stoffe bestehen. <br> Sie bestehen aus Protonen, Neutronen und Elektronen.",

        oType: "3d",

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

        oType: "3d",

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
        oType: "3d",

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


    {
        id: "solar-2",
        oSubject: "ph",
        oBanner: "./data/img/favicon.png",
        oSrc: "./data/3d/object/solar_system2.glb",
        oTitle: "Sonnensystem",
        oDescription: `Das Sonnensystem ist das Planetensystem, in dem sich die Erde befindet. Es besteht aus der Sonne, acht sie umkreisenden Planeten (von innen nach außen: Merkur, Venus, Erde, Mars, Jupiter, Saturn, Uranus und Neptun), deren natürlichen Satelliten, den Zwergplaneten, anderen Kleinkörpern (Kometen, Asteroiden und Meteoroiden) und aus unzähligen Gas- und Staubteilchen, die durch die Anziehungskraft der Sonne an diese gebunden sind.`,
        oSizeMultiplier: 7,
        oBackground: "black",
        oType: "3d",

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
    
        oType: "3d",

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
        oType: "3d",

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
        id: "img-grid",
        oTitle: "img-grid",
        oDescription: "Zuse intern",
        oSubject: "zu",
        oFsk: 0,
        oType: "img",

        oBanner: "./data/img/overlay.png",
        oSrc: null,
        oCopyright: "Ohne Copyright",
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 1,

        oHotspots: ``,

        oMarkerImg1: "./data/img/diashow/img1.png",
        oMarkerImg2: "./data/img/diashow/img2.png",
        oMarkerImg3: "./data/img/diashow/img3.png",
        oMarkerImg4: "./data/img/diashow/img4.png",
        oMarkerImg5: "./data/img/diashow/img5.png",
        oMarkerImg6: "./data/img/diashow/img6.png",
    },
    {
        id: "planeten-grid",
        oTitle: "planeten-grid",
        oDescription: "Zuse intern",
        oSubject: "zu",
        oFsk: 0,
        oType: "img",

        oBanner: "./data/img/overlay.png",
        oSrc: null,
        oCopyright: "Ohne Copyright",
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 1,

        oHotspots: ``,

        oMarkerImg1: "./data/3d/img/venus-ro.png",
        oMarkerImg2: "./data/3d/img/erde-ro.png",
        oMarkerImg3: "./data/3d/img/mars-ro.png",
        oMarkerImg4: "./data/3d/img/jupiter-ro.png",
        oMarkerImg5: "./data/3d/img/neptun-ro.png",
        oMarkerImg6: "./data/3d/img/uranus-ro.png",
    },

    {
        id: "all-html",
        oTitle: "all-html",
        oDescription: "Zuse intern",
        oSubject: "zu",
        oFsk: 0,
        oType: "img",

        oBanner: "./data/img/overlay.png",
        oSrc: "",
        oCopyright: "Ohne Copyright",
        oSizeMultiplier: 6,
        oBackground: "none",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(98, 166, 14, 0.5)",

        oAudioId: 1,

        oHotspots: ``,

        oMarker1: `<iframe class="yt-iframe" id="yt-iframe" width="100%" height="100%" src="https://www.youtube.com/embed/9Al8ZjPiqWg?si=Hbd5nDCJ0hpyMj_k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        oMarker2: `<iframe class="yt-iframe" style="width:100%;height:100%" src="https://www.youtube-nocookie.com/embed/KuVCd5VZKyE?si=nmvtbbzE_m1lKcmj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        oMarker3: `<img style='border-radius:8px;width:100%;height:100%' src='https://de.schubu.org/images/geo/level_5/53-Breitenparallele-Klimazonen-dpr2.webp'>`,
        oMarker4: `<iframe class="yt-iframe" src="https://de.schubu.org/p53/klima" width="100%" height="100%"></iframe>`,
        oMarker5: `<img style='border-radius:8px;width:100%;height:100%' src='https://www.chemie-azubis.de/fileadmin/user_upload/elemente/Wasserstoff_Element.png'>`,
        oMarker6: `<img style='border-radius:8px;width:100%;height:100%' src='https://www.chemie-azubis.de/fileadmin/user_upload/elemente/Wasserstoff_Element.png'>`,
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



function getCurrentObjectId()
{
    return objectId;
}
function getCurrentObjectType()
{
    return database.find(u => u.id === objectId).oType;
}

function getCurrentObjectSrcStatus()
{
    if (!objectId)
    {
        return 0; 
    }

    var foundObject = database.find(u => u.id === objectId);

    if (foundObject && foundObject.oSrc != null && foundObject.oSrc !== "")
    {
        return 1; // Quelle vorhanden
    }
    else
    {
        return 0; // Keine Quelle oder Objekt nicht gefunden
    }
}
function getMarkerImgByCurrentObjectId(markerSite)
{
    const currentObject = database.find(u => u.id === objectId);
    if (!currentObject)
    {
        console.warn("Objekt mit ID '" + objectId + "' wurde in der Datenbank nicht gefunden.");
        return "";
    }
    const propertyName = "oMarkerImg" + markerSite;
    return currentObject[propertyName] || "";
}


function loadThePage()
{
    setObject("bird-1");

    getParameter();

    setMenuFromDatabase();

    checkInternetConnection();

    openWelcomeModal();

    document.getElementById("categoryFilter").addEventListener("change", filterObjects);

    document.getElementById("searchInput").addEventListener("input", filterObjects);

    setTimeout(function()
    {
        document.getElementById("loadingPage").style.display = "none";
        document.getElementById("main").style.display = "block";
    }, 2000)

}

function getParameter()
{
    const urlParams = new URLSearchParams(window.location.search);
    var objectId = urlParams.get('o');

    if (objectId != null)
    {

        if (database.find(u => u.id === objectId))
        {
            console.log("[OK] Parameter gültig: " + objectId);
            setObject(objectId);
        }
        else
        {
            console.log("[ERROR] Parameter ungültig: " + objectId);
        }      
    }
    else
    {
        console.log("[LOG] Kein Parameter übergeben");
        objectId = "bird-1";
    }


    setObject(objectId);
    
}

function getStandardUrl()
{
    return standardUrl;
}

function shareObjectByQrCode()
{
    generateQrCode(objectId);
}

function setMenuFromDatabase(numberOfObjects)
{
    var innerHtmlOfMenu = "";

    for (i = 0; i < database.length; i++)
    {
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
    document.getElementById("subject-container-new").innerHTML = innerHtmlOfMenu;
}

function getCopyright(id)
{
    alert(database.find(u => u.id === id).oCopyright);
}

async function checkInternetConnection()
{
    /* setTimeout(checkInternetConnection, timeoutCheckInternetConnection); */
}

function setDegByMarker(marker, x, y, z)
{
    const invertedZ = (360 - parseFloat(z)) % 360;

    switch (marker)
    {
        case 1:
            rotateObject(invertedZ, 0, 0);
            break;
        case 2:
            rotateObject(0, -90, 0);
            break;
        case 3:
            rotateObject(0, invertedZ, -90);
            break;
        case 4:
            rotateObject(0, -invertedZ, 90);
            break;
        case 5:
            rotateObject(-invertedZ, 0, 180);
            break;
        case 6:
            // Fehler, wie bei Marker 2
            rotateObject(0, 90, 0);
            break;
        default:
            console.log("Anderer Marker");
    }
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
    if (localStorage.getItem("hintClosed") === "true")
    {
        openMaintenanceModal();
    }
    else
    {
        openInfoModal();
    }
}

function openInfoModal()
{
    document.getElementById("infoModal").style.display = "block";
}
function closeInfoModal()
{
    document.getElementById("infoModal").style.display = "none";
    localStorage.setItem("hintClosed", "true");
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

/* Anfang KI-generierter Bereich */
function mapCanvasToScreen(canvasX, canvasY)
{
    const canvasElement = document.getElementById('canvas');

    if (!canvasElement || canvasElement.width === 0 || canvasElement.height === 0)
    {
        return { x: 0, y: 0 };
    }

    const rect = canvasElement.getBoundingClientRect();

    const scaledW = rect.width;
    const scaledH = rect.height;

    const internalW = canvasElement.width;
    const internalH = canvasElement.height;
    
    const scaleFactor = scaledW / internalW;

    const offsetX = rect.left;
    const offsetY = rect.top;

    const screenX = offsetX + (canvasX * scaleFactor);
    const screenY = offsetY + (canvasY * scaleFactor);

    return { x: screenX, y: screenY };
}

function positionModelOnMarker(markers)
{
    var modelViewer = document.getElementById("move-model");
    var canvas = document.getElementById("canvas");

    if (!modelViewer || !canvas)
    {
        console.error("Fehler: move-model oder canvas nicht gefunden!");
        return;
    }

    if (markers && markers.length > 0)
    {
        if (markerLostTimeout)
        {
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
    }
    else
    {
        if (isMarkerVisible && !markerLostTimeout)
        {
            markerLostTimeout = setTimeout(function()
            {
                modelViewer.style.display = "none";
                isMarkerVisible = false;
                markerLostTimeout = null;
            }, 600);
        }
    }
}
/* Ende KI-generierter Bereich */

function positionHTMLOnMarker(markers)
{
    var modelViewer = document.getElementById("move-html");
    var canvas = document.getElementById("canvas");

    if (!modelViewer || !canvas) return;

    if (markers && markers.length > 0)
    {
        if (htmlLostTimeout) {
            clearTimeout(htmlLostTimeout);
            htmlLostTimeout = null;
        }
        
        isHtmlVisible = true;

        var centerX = (markers[0].corners[0].x + markers[0].corners[1].x + markers[0].corners[2].x + markers[0].corners[3].x) / 4;
        var centerY = (markers[0].corners[0].y + markers[0].corners[1].y + markers[0].corners[2].y + markers[0].corners[3].y) / 4;
        
        var dx = markers[0].corners[1].x - markers[0].corners[0].x;
        var dy = markers[0].corners[1].y - markers[0].corners[0].y;
        var angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const rect = canvas.getBoundingClientRect();
        const scaleX = rect.width / canvas.width;
        const scaleY = rect.height / canvas.height;

        modelViewer.style.display = "block";
        modelViewer.style.left = (rect.left + (centerX * scaleX)) + "px";
        modelViewer.style.top = (rect.top + (centerY * scaleY)) + "px";
        modelViewer.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

    }
    else
    {
        if (isHtmlVisible && !htmlLostTimeout)
        {
            htmlLostTimeout = setTimeout(function()
            {
                modelViewer.style.display = "none";
                isHtmlVisible = false;
                htmlLostTimeout = null;
            }, 500);
        }
    }
}

function setAllHTMLOnMarker(marker)
{
    switch (marker)
    {
        case 1:
            document.getElementById("site1").style.display = "block";

            document.getElementById("site2").style.display = "none";
            document.getElementById("site3").style.display = "none";
            document.getElementById("site4").style.display = "none";
            document.getElementById("site5").style.display = "none";
            document.getElementById("site6").style.display = "none";
            break;
        case 2:
            document.getElementById("site2").style.display = "block";

            document.getElementById("site1").style.display = "none";
            document.getElementById("site3").style.display = "none";
            document.getElementById("site4").style.display = "none";
            document.getElementById("site5").style.display = "none";
            document.getElementById("site6").style.display = "none";
            break;
        case 3:
            document.getElementById("site3").style.display = "block";

            document.getElementById("site1").style.display = "none";
            document.getElementById("site2").style.display = "none";
            document.getElementById("site4").style.display = "none";
            document.getElementById("site5").style.display = "none";
            document.getElementById("site6").style.display = "none";
            break;
        case 4:
            document.getElementById("site4").style.display = "block";

            document.getElementById("site1").style.display = "none";
            document.getElementById("site2").style.display = "none";
            document.getElementById("site3").style.display = "none";
            document.getElementById("site5").style.display = "none";
            document.getElementById("site6").style.display = "none";
            break;
        case 5:
            document.getElementById("site5").style.display = "block";

            document.getElementById("site1").style.display = "none";
            document.getElementById("site2").style.display = "none";
            document.getElementById("site3").style.display = "none";
            document.getElementById("site4").style.display = "none";
            document.getElementById("site6").style.display = "none";
            break;
        case 6:
            document.getElementById("site6").style.display = "block";

            document.getElementById("site1").style.display = "none";
            document.getElementById("site2").style.display = "none";
            document.getElementById("site3").style.display = "none";
            document.getElementById("site4").style.display = "none";
            document.getElementById("site5").style.display = "none";
            break;
    }
    
}

function positionAllHTMLOnMarker(markers)
{
    var modelViewer = document.getElementById("all-html");
    var canvas = document.getElementById("canvas");

    if (!modelViewer || !canvas) return;

    if (markers && markers.length > 0)
    {
        if (htmlLostTimeout)
        {
            clearTimeout(htmlLostTimeout);
            htmlLostTimeout = null;
        }

        isHtmlVisible = true;

        var centerX = (markers[0].corners[0].x + markers[0].corners[1].x + markers[0].corners[2].x + markers[0].corners[3].x) / 4;
        var centerY = (markers[0].corners[0].y + markers[0].corners[1].y + markers[0].corners[2].y + markers[0].corners[3].y) / 4;
        
        var dx = markers[0].corners[1].x - markers[0].corners[0].x;
        var dy = markers[0].corners[1].y - markers[0].corners[0].y;
        var angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const rect = canvas.getBoundingClientRect();
        const scaleX = rect.width / canvas.width;
        const scaleY = rect.height / canvas.height;

        modelViewer.style.display = "block";
        modelViewer.style.left = (rect.left + (centerX * scaleX)) + "px";
        modelViewer.style.top = (rect.top + (centerY * scaleY)) + "px";
        modelViewer.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

    }
    else
    {
        if (isHtmlVisible && !htmlLostTimeout)
        {
            htmlLostTimeout = setTimeout(function()
            {
                modelViewer.style.display = "none";
                isHtmlVisible = false;
                htmlLostTimeout = null;
            }, 500);
        }
    }
}

function handleMarkerLost()
{
    const model = document.getElementById('move-model');
    if (model)
    {
        model.style.display = 'none';
    }
}

/* Anfang KI-generierter Bereich */
function normalize(corners, width, height)
{
    var halfWidth = width / 2;
    var halfHeight = height / 2;

    var normalized = [];

    for (var i = 0; i < 4; i++)
    {
        var x = corners[i].x;
        var y = corners[i].y;

        normalized[i] = {
            x: (x - halfWidth) / halfWidth,
            y: (y - halfHeight) / halfHeight
        };
    }

    return normalized;
}
/* Ende KI-generierter Bereich */


var oSrc;
var oTitle;
var oBackground;
var oSizeMultiplier;
var oAudioStartAt;

function getObjectTitle(parameter)
{
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
    console.log(getCurrentObjectType());

    if (getCurrentObjectType() == "img")
    {
        document.getElementById("site1").innerHTML = database.find(u => u.id === objectId).oMarker1;
        document.getElementById("site2").innerHTML = database.find(u => u.id === objectId).oMarker2;
        document.getElementById("site3").innerHTML = database.find(u => u.id === objectId).oMarker3;
        document.getElementById("site4").innerHTML = database.find(u => u.id === objectId).oMarker4;
        document.getElementById("site5").innerHTML = database.find(u => u.id === objectId).oMarker5;
        document.getElementById("site6").innerHTML = database.find(u => u.id === objectId).oMarker6;
    }
    
    
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

    closeObjectMenu();

    var model = document.getElementById("move-model");

    model.style.backgroundColor = "transparent";
    model.style.backgroundImage = "none";

    console.log("Objekt-ID: " + objectId);
    console.log(database.find(u => u.id === objectId).oTitle);
    console.log(database.find(u => u.id === objectId).oSrc);

    model.src = "";
    model.src = database.find(u => u.id === objectId).oSrc;
    document.getElementById("objectTitle").innerHTML = database.find(u => u.id === objectId).oTitle;

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
    

    document.getElementById("title").style.backgroundColor = "rgba(98, 166, 14, 0.5)";
    document.getElementById("title").style.borderColor = "rgba(98, 166, 14, 0.5)";
    document.getElementById("title").style.color = "white";

    document.getElementById("title").style.backgroundColor = database.find(u => u.id === objectId).oMainBgColor;
    document.getElementById("title").style.borderColor = database.find(u => u.id === objectId).oMainBgColor;
    document.getElementById("title").style.color = database.find(u => u.id === objectId).oMainTextColor;   

    if (database.find(u => u.id === objectId).oBackground.includes("url("))
    {
        model.style.backgroundImage = database.find(u => u.id === objectId).oBackground;
    }
    else
    {
        model.style.backgroundColor = database.find(u => u.id === objectId).oBackground;
    }    

    document.getElementById("ar-model").innerHTML = database.find(u => u.id === objectId).oHotspots;

    document.getElementById("move-model").innerHTML = database.find(u => u.id === objectId).oHotspots;
    
}

function openCurrentObjectMenu()
{

    var arModel = document.getElementById("ar-model");

    arModel.style.backgroundColor = "transparent";
    arModel.style.backgroundImage = "none";

    arModel.src = database.find(u => u.id === objectId).oSrc;
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

    document.getElementById("important-facts").innerHTML = database.find(u => u.id === objectId).oFacts;

    document.getElementById("copyright-accordion").innerHTML = database.find(u => u.id === objectId).oCopyright;

    document.getElementById("myBottomModal").style.display = "block";
}



const threshold = 5;
var oldPixelSize_setObjectSize = 0;

function setObjectSize(pixelSize)
{
    // console.log(pixelSize);

    var difference = Math.abs(pixelSize - oldPixelSize_setObjectSize);

    if (difference > threshold)
    {
        document.getElementById("move-model").style.width = (pixelSize * database.find(u => u.id === objectId).oSizeMultiplier) + "px";
        document.getElementById("move-model").style.height = (pixelSize * database.find(u => u.id === objectId).oSizeMultiplier) + "px";

        // console.log("Verändert - " + oldPixelSize_setObjectSize + " zu " + pixelSize);

        oldPixelSize_setObjectSize = pixelSize;
    }
    /*
    else
    {
        console.log("Nicht verändert - " + oldPixelSize_setObjectSize + " zu " + pixelSize);
    }
    */
}



function setHTMLSize(pixelSize)
{
    // Nur bei Marker 7
    
    document.getElementById("move-html").style.width = (pixelSize * 2) + "px";
    document.getElementById("move-html").style.height = (pixelSize * 2) + "px";   
}

var oldPixelSize_setAllHTMLSize = 0;

function setAllHTMLSize(pixelSize)
{

    //console.log(pixelSize);

    var difference = Math.abs(pixelSize - oldPixelSize_setAllHTMLSize);

    if (difference > threshold)
    {
        document.getElementById("all-html").style.width = (pixelSize * database.find(u => u.id === objectId).oSizeMultiplier) + "px";
        document.getElementById("all-html").style.height = (pixelSize * database.find(u => u.id === objectId).oSizeMultiplier) + "px";

        //console.log("Verändert - " + oldPixelSize_setAllHTMLSize + " zu " + pixelSize);

        oldPixelSize_setAllHTMLSize = pixelSize;
    }
    /*
    else
    {
        console.log("Nicht verändert - " + oldPixelSize_setAllHTMLSize + " zu " + pixelSize);
    }
    */


    document.querySelectorAll('.yt-iframe').forEach(function(element)
    {
        element.style.width = "100%";
        // Höhe mit aspect-ratio: 1 / 1 zugewiesen
    });
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

    if (elem.requestFullscreen)
    {
        elem.requestFullscreen();
    }
    else if (elem.webkitRequestFullscreen)
    {
        /* Safari */
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen)
    {
        /* IE11 */
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

