const apiKey = "b725b5892ac3f3964b7f215114b2040b";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather-box").style.display = "none";
    } else {
      document.querySelector(".error").style.display = "none";
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + " °C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      }
      document.querySelector(".weather-box").style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching the weather data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-box").style.display = "none";
  }
}

const searchBox = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".searchBox button");

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  checkWeather(city);
});
