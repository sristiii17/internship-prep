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

        if(data.cod === "404"){

            document.getElementById("weatherResult")
            .innerHTML = "City not found";

            return;
        }

        document.getElementById("weatherResult")
        .innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
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