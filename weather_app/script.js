let currentTemp = null;
let isCelsius = true;

loadSearchHistory();

function saveSearch(city){

    let searches =
    JSON.parse(localStorage.getItem("searches")) || [];

    if(!searches.includes(city)){

        searches.unshift(city);

        if(searches.length > 5){
            searches.pop();
        }

        localStorage.setItem(
            "searches",
            JSON.stringify(searches)
        );
    }

    loadSearchHistory();
}

function loadSearchHistory(){

    let searches =
    JSON.parse(localStorage.getItem("searches")) || [];

    let history =
    document.getElementById("searchHistory");

    history.innerHTML = "";

    searches.forEach(function(city){

        let li =
        document.createElement("li");

        li.innerText = city;

        li.onclick = function(){

            document.getElementById("cityInput").value = city;

            getWeather();
        };

        history.appendChild(li);
    });
}
async function getWeather(){

    let city =
    document.getElementById("cityInput").value;

    let apiKey = "055ab8fdefabcc65d277e6cb78511e26";

    let url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        document.getElementById("loading").innerHTML = "Loading...";

        let response = await fetch(url);

        let data = await response.json();

        currentTemp = data.main.temp;

        if(data.cod === "404"){

            document.getElementById("weatherResult")
            .innerHTML = "City not found";

            return;
        }

        document.getElementById("weatherResult")
        .innerHTML = `
            <h2>${data.name}</h2>
            <p>
                Temperature:
                <span id="temperature">${data.main.temp}</span>
                <span id="unit">°C</span>
            </p>
            <p> Weather: ${data.weather[0].main}</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById("loading").innerHTML = "";
        saveSearch(city);
    }

    catch(error){

        document.getElementById("weatherResult")
        .innerHTML = "Something went wrong";
        document.getElementById("loading").innerHTML = "";
    }
} 
document
.getElementById("clearHistoryBtn")
.addEventListener("click", function(){

    localStorage.removeItem("searches");

    loadSearchHistory();
});

document
.getElementById("unitToggle")
.addEventListener("click", function(){

    if(currentTemp === null){
        return;
    }

    let displayTemp;

    if(isCelsius){

        displayTemp =
        (currentTemp * 9/5) + 32;

        this.innerText = "Switch to °C";

        isCelsius = false; 

        document.getElementById("temperature")
        .innerText = displayTemp.toFixed(1);

        document.getElementById("unit")
        .innerText = "°F";

    } 
    else {

        displayTemp = currentTemp;

        this.innerText = "Switch to °F";

        isCelsius = true;
        document.getElementById("temperature")
        .innerText = displayTemp.toFixed(1);

        document.getElementById("unit")
        .innerText = "°C";
    }

    document
    .getElementById("temperature")
    .innerText =
    displayTemp.toFixed(1);
});