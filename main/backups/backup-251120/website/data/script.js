function loadPage()
{
    var loadingPage = document.getElementById("loadingPage");
    var mainPage = document.getElementById("main");

    let w = window.innerWidth;
    let h = window.innerHeight;

    console.log(w);
    console.log(h);

    setTimeout(function()
    {
        loadingPage.style.display = "none";
        mainPage.style.display = "block";
    }, 3500)

    

}

function openNav() {
  document.getElementById("mySidenav").style.width = "220px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

async function startWebcam()
{
      const video = document.getElementById('video');
      const startBtn = document.getElementById('startBtn');

    try
    {
        // Zugriff auf Kamera anfragen
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        
        // Videostream an <video> binden
        video.srcObject = stream;

        // Button-Status anpassen
        startBtn.disabled = true;
        startBtn.textContent = "Webcam läuft ✅";
    }
    catch (err) 
    {
        console.error("Fehler beim Zugriff auf die Kamera:", err);
        alert("Kamera konnte nicht gestartet werden. Bitte Zugriffsrechte prüfen.");
    }
}