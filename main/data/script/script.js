/*    INSTANZVARIABLEN    */
var numberOfPermissions = 2; // Anzahl zu erlaubender Berechtigungen
var heightOfObjectMenu = "100%"; // Höhe Menü für Objekte
var timeoutCheckInternetConnection = 60000; // Timeout zur Überprüfung der Internetverbindung


function loadThePage()
{
    checkInternetConnection();

    openWelcomeModal();

    setTimeout(function()
    {
        document.getElementById("loadingPage").style.display = "none";
        document.getElementById("main").style.display = "block";
    }, 3500)
}


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
    }
    else
    {
        console.log("Canvas volle Breite");
        // canvas.style.width = "100%";
        canvas.style.width = w+"px";
        canvas.style.height = "auto";
    }
}



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
    console.log("Auswertung: " + marker)
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
    setCanvasSize();
    document.getElementById("infoModal").style.display = "block";
}
function closeInfoModal()
{
    document.getElementById("infoModal").style.display = "none";
}