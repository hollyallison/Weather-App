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

function search(city) {
  let apiKey = "2c40a31a9bebb30oc02aftf7a42a8b2e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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



function response(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "2c40a31a9bebb30oc02aftf7a42a8b2e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}



window.addEventListener("load", getCurrentLocation);

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