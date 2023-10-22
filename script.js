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

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;
  document.querySelector(
    ".weather-info #Precipitation"
  ).innerHTML = `Precipitation: ${response.data.condition.description}`;
  document.querySelector(
    ".weather-info #Humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  document.querySelector(".weather-info #Wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}m/s`;
}

function search(city) {
  let apiKey = "2c40a31a9bebb30oc02aftf7a42a8b2e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", response);

window.addEventListener("load", getCurrentLocation);

