

function openNavMenu()
{
    document.getElementById("navMenu").style.width = "100%";
}

function closeNavMenu()
{
    document.getElementById("navMenu").style.width = "0%";
}


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 
async function setSwitchContainer()
{

    var liste = [
        "Bildung",
        "Lernen",
        "Entdecken",
        "Experimentieren",
        "Verstehen",
        "Erkunden",
        "Forschen",
        "Unterrichten"
    ]

    var sleeptime = 1700;
    var lettertime = 130;
            
    var lastPart = "neu gedacht";
    var currentValue = "";

    var p = document.getElementById("switch-span");

    while (true)
    {
        for (i = 0; i < liste.length; i++)
        {
            var firstPart = liste[i];

            for (j = 0; j < firstPart.length; j++)
            {
            await sleep(lettertime);
            currentValue = currentValue + firstPart[j];
            p.innerHTML = `<span class="green-text">${currentValue}</span> ${lastPart}`;
            }
            await sleep(sleeptime);
            while (currentValue.length > 0)
            {
                await sleep(lettertime);
                currentValue = currentValue.slice(0, -1);
                p.innerHTML = `<span class="green-text">${currentValue}</span> ${lastPart}`;
            }

        }    
    }       
}
