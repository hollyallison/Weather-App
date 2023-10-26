let datetimeElement = document.querySelector("#current-day-time");

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function updateDayTime() {
  let now = new Date();
  let dayOfWeek = daysOfWeek[now.getDay()];
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let currentTime = `${dayOfWeek} ${hours}:${minutes}`;
  datetimeElement.textContent = currentTime;
}
updateDayTime();
setInterval(updateDayTime, 60000);

function search(city, position) {
  let apiKey = "2c40a31a9bebb30oc02aftf7a42a8b2e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(forecastApiUrl).then(forecastResponse);
}

function searchLocation(position) {
  let apiKey = "2c40a31a9bebb30oc02aftf7a42a8b2e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}`;
  axios.get(forecastApiUrl).then(forecastResponse);
}

function response(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.temperature.current
  )}`;
  celsiusTemperature = response.data.temperature.current;
  fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector(
    "#Condition"
  ).innerHTML = ` ${response.data.condition.description}`;
  document.querySelector(
    ".weather-info #Humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  document.querySelector(".weather-info #Wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}m/s`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function forecastResponse(response) {
  let forecastData = response.data.daily;
  let weatherForecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (day, index) {
    if (0 < index && index <= 6) {
      forecastHTML += `
        <div class="col-12 col-md-4 col-lg-2"> 
          <div class="week-ahead-container">
            <ul>
              <li class="days">${formatDay(day.time)}</li>
              <li id="forecast-condition">${day.condition.description}</li>
            </ul>
            <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              day.condition.icon
            }.png" alt="" class="forecast-weather-icon">
            <ul>
              <li class="forecast-temperature-max">${Math.round(
                day.temperature.maximum
              )}°C /
             <span class="forecast-temperature-min">${Math.round(
               day.temperature.minimum
             )}°C </span> </li>
            </ul>
          </div>
        </div>
      `;
    }
  });

  forecastHTML += `</div>`; // End the Bootstrap row
  weatherForecast.innerHTML = forecastHTML;
}


function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation, function (error) {
    console.error(error.message);
  });
}

window.addEventListener("load", function () {
  getCurrentLocation();
});

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", response);
