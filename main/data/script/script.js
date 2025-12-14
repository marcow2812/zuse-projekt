/*    INSTANZVARIABLEN    */
var numberOfPermissions = 2; // Anzahl zu erlaubender Berechtigungen
var heightOfObjectMenu = "100%"; // Höhe Menü für Objekte
var timeoutCheckInternetConnection = 30000; // Timeout zur Überprüfung der Internetverbindung
var standardUrl = "https://marcow2812.github.io/zuse-projekt/main/explorer.html?o="; // Standard-URL für QR-Code-Erstellung

var objectId;


const users = [
      { id: 1, name: "Max Mustermann", alter: 28, beruf: "Entwickler" },
      { id: 2, name: "Erika Musterfrau", alter: 34, beruf: "Designerin" },
      { id: 3, name: "Hans Wurst", alter: 45, beruf: "Projektmanager" }
    ];

    console.log(users[0]);
    
    console.log(users[0].name);

    console.log(users.find(u => u.id === 2).name);



function loadThePage()
{
    setObject("disco-1");

    getParameter();

    checkInternetConnection();

    openWelcomeModal();

    /*
    var valueForInnerHtml = "";

    for (i = 0; i < 12; i++)
    {
        valueForInnerHtml = valueForInnerHtml + "<p>This is great</p>";
    }

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


async function checkInternetConnection()
{
    var headerIcon = document.getElementById("header-icon-connection");

    if (navigator.onLine)
    {
        // Online
        console.log("Online");
        headerIcon.classList.remove("icon-red");
        headerIcon.classList.add("icon-green");
    }
    else
    {
        // Offline
        console.log("Offline");
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
    // console.log("Auswertung: " + marker)
    switch (marker)
    {
        case 1:
            console.log("Marker 1");
            const invertedZ = (360 - parseFloat(z)) % 360; 
            //           Drehung nach rechts oder links (im/gegen Uhrzeigersinn)
            //              nach vorne und hinten neigen (auf einen zu/von einem weg)
            rotateObject(invertedZ, 0, 0);
            break;
        case 2:
            console.log("Marker 2");
            break;
        case 3:
            console.log("Marker 3");
            break;
        case 4:
            console.log("Marker 4");
            break;
        case 5:
            console.log("Marker 5");
            break;
        case 6:
            console.log("Marker 6");
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
var oStartAudioAt;

function getObjectTitle(parameter)
{
    setObject(parameter);
    return oTitle;
}

function setObject(objectId)
{
    closeObjectMenu(); // Wenn von Menü aufgerufen

    var model = document.getElementById("model");

    switch (objectId)
    {
        case "heart-1":
            oSrc = "./data/3d/heart-23.glb";
            oTitle = "Rotes Herz";
            oSizeMultiplier = 3;
            oBackground = "rgb(255, 179, 179, 0.3)";
            oStartAudioAt = 5;
            break;
        case "disco-1":
            oSrc = "./data/3d/disco-ball-2730.glb";
            oTitle = "Disco-Kugel";
            oSizeMultiplier = 3;
            oBackground = "transparent";
            oStartAudioAt = 1.5;
            break;
        case "atom-1":
            oSrc = "./data/3d/atom.glb";
            oTitle = "Aufbau eines Atoms";
            oSizeMultiplier = 4;
            oBackground = "black";
            oStartAudioAt = 5;
            break;
        case "city-1":
            oSrc = "./data/3d/city_pack_5.glb";
            oTitle = "Stadt";
            oSizeMultiplier = 4;
            oBackground = "#e6e6e6";
            oStartAudioAt = 5;
            break;
        case "davinci-1":
            oSrc = "./data/3d/da_vinci_code_cryptex.glb";
            oTitle = "Da Vinci Cryptex";
            oSizeMultiplier = 3;
            oBackground = "transparent";
            oStartAudioAt = 5;
            break;
        case "enigma-1":
            oSrc = "./data/3d/enigma_machine_1934.glb";
            oTitle = "Enigma";
            oSizeMultiplier = 3;
            oBackground = "url('./data/img/favicon.png')"; // black
            oStartAudioAt = 5;
            break;
    }

    // Werte auf Standard zurücksetzen
    model.style.backgroundColor = "transparent";

    // Zuweisung und Anwendung
    model.src = oSrc;
    document.getElementById("objectTitle").innerHTML = oTitle;
    setAudioPlayTime(oStartAudioAt);
    
    // variable.includes("url(")

    if (oBackground.includes("url("))
    {
        model.style.backgroundImage = oBackground;
    }
    else
    {
        model.style.backgroundColor = oBackground;
    }    
    
}

function setObjectSize(pixelSize)
{
    // console.log(pixelSize);
    document.getElementById("model").style.width = (pixelSize * oSizeMultiplier) + "px";
    document.getElementById("model").style.height = (pixelSize * oSizeMultiplier) + "px";
}