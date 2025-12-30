/*    INSTANZVARIABLEN    */
// Anzahl zu erlaubender Berechtigungen
var numberOfPermissions = 2;
// Höhe: Menü für Objekte
var heightOfObjectMenu = "100%";
// Timeout zur Überprüfung der Internetverbindung (10000 = 10s)
var timeoutCheckInternetConnection = 30000;
// Standard-URL für QR-Code-Erstellung
var standardUrl = "https://marcow2812.github.io/zuse-projekt/main/explorer.html?o="; 


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
const database = [
    {
        id: "mystery",
        oTitle: "Rätselaufgabe",
        oDescription: "Tag der offenen Tür 2026 - Konrad-Zuse-Schule Hünfeld",
        oSubject: "biologie",
        oFsk: 0,

        oBanner: "./data/img/favicon.png",
        oSrc: "./data/3d/object/disco-ball-2730.glb",
        oCopyright: "3D model by <a href='https://pixabay.com/users/blendertimer-9538909/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=23'>Daniel Roberts</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=23'>Pixabay</a>",
        oSizeMultiplier: 3,
        oBackground: "rgba(255, 179, 179, 0.3)",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(0, 102, 204, 0.5)",

        oAudioSrc: "./data/music/night-before-dawn-129272.mp3",
        oAudioCopyright: "Music by <a href='https://pixabay.com/users/sweet_kr-27931391/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=129272'>Artur Buriak</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=129272'>Pixabay</a>",
        oAudioStartAt: 2.0,
    },

    {
        id: "newton-1",
        oTitle: "Kugelstoßpendel",
        oDescription: "Eine Erfindung von Newton",
        oSubject: "biologie",
        oFsk: 0,

        oBanner: "./data/img/favicon.png",
        oSrc: "./data/3d/object/newtons_cradle.glb",
        oCopyright: "'Newton's cradle' (https://skfb.ly/onFvQ) by BlackCube is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
        oSizeMultiplier: 6,
        oBackground: "white",
        oBackgroundSrc: "",

        oMainTextColor: "white",
        oMainBgColor: "rgba(0, 102, 204, 0.5)",

        oAudioSrc: "./data/music/night-before-dawn-129272.mp3",
        oAudioCopyright: "Music by <a href='https://pixabay.com/users/sweet_kr-27931391/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=129272'>Artur Buriak</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=129272'>Pixabay</a>",
        oAudioStartAt: 2.0,
    },

    

    {
        id: "heart-1",
        oTitle: "Rotes Herz",
        oDescription: "Rote Herzen symbolisieren in vielen Kulturen ein Zeichen von Liebe",
        oSubject: "biologie",
        oFsk: 0,

        oBanner: "./data/3d/img/heart-1.webp",
        oSrc: "./data/3d/object/heart-23.glb",
        oCopyright: "3D model by <a href='https://pixabay.com/users/blendertimer-9538909/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=23'>Daniel Roberts</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=23'>Pixabay</a>",
        oSizeMultiplier: 3,
        oBackground: "rgb(255, 179, 179, 0.3)",
        oBackgroundSrc: "",

        oAudioSrc: "./data/music/racing-speed-action-music-416097.mp3",
        oAudioCopyright: "Music by <a href='https://pixabay.com/users/tatamusic-51344851/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=416097'>Mykola Sosin</a> from <a href='https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=416097'>Pixabay</a>",
        oAudioStartAt: 1.5,
    },

    {
        id: "disco-1",
        oSubject: "biologie",
        oBanner: "./data/3d/img/disco-1.webp",
        oSrc: "./data/3d/object/disco-ball-2730.glb",
        oTitle: "Disco-Kugel",
        oSizeMultiplier: 3,
        oBackground: "transparent",
        oAudioStartAt: 1.5,
        oCopyright: "3D model by <a href='https://pixabay.com/users/lyocrypt-50042056/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2730'>NaxiLyo Crypt</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2730'>Pixabay</a>",
    },

    {
        id: "atom-1",
        oSubject: "biologie",
        oBanner: "./data/img/favicon.png",
        oSrc: "./data/3d/object/atom.glb",
        oTitle: "Aufbau eines Atoms",
        oSizeMultiplier: 4,
        oBackground: "black",
        oAudioStartAt: 1.5,
        oCopyright: "'Atom' (https://skfb.ly/onXKz) by LucasPresoto is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    },
    
    {
        id: "earth-1",
        oSubject: "biologie",
        oBanner: "./data/3d/img/earth-1.webp",
        oSrc: "./data/3d/object/earth-9.glb",
        oTitle: "Erdkugel",
        oSizeMultiplier: 4,
        oBackground: "black",
        oAudioStartAt: 1.5,
        oCopyright: "3D model by <a href='https://pixabay.com/users/blendertimer-9538909/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=9'>Daniel Roberts</a> from <a href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=9'>Pixabay</a>",
    },
    
    { id: "solar-1", oSubject: "biologie", oBanner: "./data/img/favicon.png", oSrc: "./data/3d/object/solar_system1.glb", oTitle: "Sonnensystem (1)", oSizeMultiplier: 4, oBackground: "black", oAudioStartAt: 10, oCopyright: "'Solar system' (https://skfb.ly/oKYnC) by dannzjs is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/)." },
    { id: "solar-2", oSubject: "biologie", oBanner: "./data/img/favicon.png", oSrc: "./data/3d/object/solar_system2.glb", oTitle: "Sonnensystem (2)", oSizeMultiplier: 7, oBackground: "transparent", oAudioStartAt: 10, oCopyright: "'Solar System : المجموعة الشمسية' (https://skfb.ly/YnDQ) by shooogp is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/)." },
    { id: "mars-rover-1", oSubject: "biologie", oBanner: "./data/3d/img/mars-rover1.png", oSrc: "./data/3d/object/mars-rover.glb", oTitle: "Mars Rover", oSizeMultiplier: 4, oBackground: "url('./data/3d/img/mars.jpg')", oAudioStartAt: 10, oCopyright: "'Curiosity Mars rover' (https://skfb.ly/oTPHp) by Cybertron B-127 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\nFoto von RDNE Stock project: https://www.pexels.com/de-de/foto/wuste-trocken-felsen-konzept-8474500/" },
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
    setObject("disco-1");

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

                <div class="icon-copyright" onclick="getCopyright('${database[i].id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-c-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503"/>
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

function getCopyright(id)
{
    alert(database.find(u => u.id === id).oCopyright);
}


async function checkInternetConnection()
{
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


function getDegByMarker(marker, x, y, z)
{

    const invertedZ = (360 - parseFloat(z)) % 360; 


    // console.log("Auswertung: " + marker)
    switch (marker)
    {
        case 1:
            console.log("Marker 1");

            
            //           Drehung nach rechts oder links (im/gegen Uhrzeigersinn)
            //              nach vorne und hinten neigen (auf einen zu/von einem weg)
            rotateObject(invertedZ, 0, 0);

            break;
        case 2:
            console.log("Marker 2");

            rotateObject(0, -90, 0);

            break;
        case 3:
            console.log("Marker 3");
            
            rotateObject(0, -invertedZ, -90);

            break;
        case 4:
            console.log("Marker 4");

            rotateObject(0, invertedZ, 90);

            break;
        case 5:
            console.log("Marker 5");

            rotateObject(0, 0, 180);

            break;
        case 6:
            console.log("Marker 6");

            rotateObject(0, 90, 0);

            break;
        default:
            console.log("Anderer Marker");
    }

    console.log("x: " + x + " | y: " + y + " | z: " + z);
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
function positionModelOnMarker(canvasX, canvasY) {
    const model = document.getElementById('model');
    
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

// Hides the model when the marker is lost (already mentioned in previous steps)
function handleMarkerLost() {
    const model = document.getElementById('model');
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

function setObject(objectIdParameter)
{
    objectId = objectIdParameter;

    closeObjectMenu(); // Wenn von Menü aufgerufen

    var model = document.getElementById("model");

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
    model.src = database.find(u => u.id === objectId).oSrc;
    document.getElementById("objectTitle").innerHTML = database.find(u => u.id === objectId).oTitle;
    setAudioPlayTime(database.find(u => u.id === objectId).oAudioStartAt);

    document.getElementById("audioPlayer").src = database.find(u => u.id === objectId).oAudioSrc;

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
    
}

function setObjectSize(pixelSize)
{
    // console.log(pixelSize);
    console.log(objectId);

    document.getElementById("model").style.width = (pixelSize * database.find(u => u.id === objectId).oSizeMultiplier) + "px";
    document.getElementById("model").style.height = (pixelSize * database.find(u => u.id === objectId).oSizeMultiplier) + "px";
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