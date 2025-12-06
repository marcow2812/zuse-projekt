function setObject(objectId)
{
    var oSrc;
    var oTitle;

    switch (objectId)
    {
        case "heart-1":
            oSrc = "./data/3d/heart-23.glb";
            oTitle = "Rotes Herz";
            break;
        case "atom-1":
            oSrc = "./data/3d/atom.glb";
            oTitle = "Aufbau eines Atoms";
            break;
        case "city-1":
            oSrc = "./data/3d/city_pack_5.glb";
            oTitle = "Stadt";
            break;
        case "davinci-1":
            oSrc = "./data/3d/da_vinci_code_cryptex.glb";
            oTitle = "Da Vinci Cryptex";
            break;
        case "enigma-1":
            oSrc = "./data/3d/enigma_machine_1934.glb";
            oTitle = "Enigma";
            break;
            
    }

    document.getElementById("model").src = oSrc;
    document.getElementById("objectTitle").innerHTML = oTitle;
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