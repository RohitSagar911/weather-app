const apiKey = "b2176373590021015aacd1311e81844c";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found"); // Handle invalid city
    const data = await response.json();

    console.log("Weather Data:", data); // Debugging

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Move weather conditions inside the try block
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "assets/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "assets/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "assets/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (data.weather[0].main === "Thunderstorm") {
      weatherIcon.src = "assets/thunderstorm.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "assets/snow.png";
    } else if (
      data.weather[0].main === "Mist" ||
      data.weather[0].main === "Fog"
    ) {
      weatherIcon.src = "assets/mist.png";
    } else {
      weatherIcon.src = "assets/clear.png"; // Default icon
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// ✅ Call function when clicking search button
searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value.trim()); // Trim spaces from input
});

// ✅ Load default city on page load
checkWeather("Agra");
