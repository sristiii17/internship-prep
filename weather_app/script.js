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

    }

    catch(error){

        document.getElementById("weatherResult")
        .innerHTML = "Something went wrong";
        document.getElementById("loading").innerHTML = "";
    }
}