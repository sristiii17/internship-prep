async function getWeather(){

    let city =
    document.getElementById("cityInput").value;

    let apiKey = "055ab8fdefabcc65d277e6cb78511e26";

    let url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

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

    }

    catch(error){

        document.getElementById("weatherResult")
        .innerHTML = "Something went wrong";
    }
}