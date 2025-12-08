var oSrc;
var oTitle;

function setObject(objectId)
{
    closeObjectMenu(); // Wenn von Menü aufgerufen

    switch (objectId)
    {
        case "heart-1":
            oSrc = "./data/3d/heart-23.glb";
            oTitle = "Rotes Herz";
            oSizeMultiplier = 3;
            oBackgroundColor = "rgb(255, 179, 179, 0.3)";
            break;
        case "disco-1":
            oSrc = "./data/3d/disco-ball-2730.glb";
            oTitle = "Disco Kugel";
            oSizeMultiplier = 3;
            oBackgroundColor = "transparent";
            break;
        case "atom-1":
            oSrc = "./data/3d/atom.glb";
            oTitle = "Aufbau eines Atoms";
            oSizeMultiplier = 4;
            oBackgroundColor = "transparent";
            break;
        case "city-1":
            oSrc = "./data/3d/city_pack_5.glb";
            oTitle = "Stadt";
            oSizeMultiplier = 4;
            oBackgroundColor = "#e6e6e6";
            break;
        case "davinci-1":
            oSrc = "./data/3d/da_vinci_code_cryptex.glb";
            oTitle = "Da Vinci Cryptex";
            oSizeMultiplier = 3;
            oBackgroundColor = "transparent";
            break;
        case "enigma-1":
            oSrc = "./data/3d/enigma_machine_1934.glb";
            oTitle = "Enigma";
            oSizeMultiplier = 3;
            oBackgroundColor = "black";
            break;
            
    }

    document.getElementById("model").src = oSrc;
    document.getElementById("objectTitle").innerHTML = oTitle;
    document.getElementById("model").style.backgroundColor = oBackgroundColor;
    
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