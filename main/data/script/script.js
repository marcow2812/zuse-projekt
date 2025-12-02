var numberOfPermissions = 2;

function loadPage()
{
    var loadingPage = document.getElementById("loadingPage");
    var mainPage = document.getElementById("main");

    let w = window.innerWidth;
    let h = window.innerHeight;

    console.log(w);
    console.log(h);

    checkInternetConnection();


    openWelcomeModal();

    setTimeout(function()
    {
        loadingPage.style.display = "none";
        mainPage.style.display = "block";
    }, 3500)

    

}

var closeValue = 0;
function checkCloseOption()
{
    closeValue = closeValue + 1;
    if (closeValue == numberOfPermissions)
    {
        // Alles erlaubt
        closeWelcomeModal();
    }
    else
    {
        // Noch nicht alles erlaubt, weiterhin sichtbar
    }    
    
}

function openNav() {
  document.getElementById("mySidenav").style.width = "220px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/*
async function startWebcam()
{
      const video = document.getElementById('video-webcame');
      var headerIcon = document.getElementById("header-icon-cam");
    
      headerIcon.classList.add("header-icon");

    try
    {
        // Zugriff auf Kamera anfragen
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        
        // Videostream an <video> binden
        video.srcObject = stream;


        headerIcon.classList.remove("icon-red");
        headerIcon.classList.add("icon-green");
        
    }
    catch (err) 
    {
        console.error("Fehler beim Zugriff auf die Kamera:", err);

        headerIcon.classList.remove("icon-green");
        headerIcon.classList.add("icon-red");
    }
}
*/

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
    document.getElementById("infoModal").style.display = "block";
}

function closeInfoModal()
{
    document.getElementById("infoModal").style.display = "none";
}

async function checkInternetConnection()
{
    var headerIcon = document.getElementById("header-icon-connection");

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


    /*
    console.log(navigator.onLine);

    if (navigator.onLine)
    {
        // Connected
        headerIcon.classList.remove("icon-red");
        headerIcon.classList.add("icon-green");
    }
    else
    {
        // Not connected
        headerIcon.classList.remove("icon-green");
        headerIcon.classList.add("icon-red");
    }
    */

    setTimeout(checkInternetConnection, 60000); // Alle 60 Sekunden prüfen
}

function getDegByMarker(marker, x, y, z)
{

    switch (marker)
    {
        case 1:
            console.log("Marker 1");
            //           Drehung nach rechts oder links von vorne
            //              nach vorne und hinten neigen
            rotateObject(z, 0, 0);


            // Korrektur: Den Wert negieren
            // const correctedZ = parseFloat(z) * -1;
            
            // Oder einfacher: 360 - z, um den Wert im 0-360° Bereich zu halten
            const invertedZ = (360 - parseFloat(z)) % 360; 
            
            // Wir verwenden die Inversion, da sie sauberer ist:
            rotateObject(invertedZ, 0, 0);




            break;
        case 2:
            console.log("Marker 2");
        
        case 3:
            console.log("Marker 3");
        
        case 4:
            console.log("Marker 4");

        case 5:
            console.log("Marker 5");
        
        case 6:
            console.log("Marker 6");
        
        default:
            console.log("Anderer Marker");
    }
    console.log("x: " + x + " y: " + y + " z: " + z);
}

