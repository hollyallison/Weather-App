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
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

document.querySelector(
  ".weather-info #Precipitation"
).innerHTML = `Precipitation: ${response.data.weather[0].main}`;

  document.querySelector(
    ".weather-info #Humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

 document.querySelector(
   ".weather-info #Wind"
 ).innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;

}


function search(city) {
  let apiKey = "7aeb699c904164dfc2b866e5bdebdbf1"; // Replace with your API key
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function response(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "7aeb699c904164dfc2b866e5bdebdbf1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

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