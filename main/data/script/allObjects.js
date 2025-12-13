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


/*
    const modelMap = {
    "123": heart,
    "456": atom
    };

    const heart = {
    "src": "./data/3d/heart-23.glb"
    }
    const atom = {
    "src": "./data/3d/atom.glb"
    }


    modelMap[objectId].src
*/

