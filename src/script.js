function formatDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}

function forecast(response) {
  let forecastData = response.data.daily;

  let displayForecast = document.querySelector("#forecast");
  let forecast = `<div class="row"><div class="col-1"></div>`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecast =
        forecast +
        `
      <div class="col-2">
      <div class="col" id="day">${formatDay(forecastDay.dt)}</div>
      <div class="col" id="dayIcon"><img src = "https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }.png"/></div>
      <div class="col" id="dayHigh">${Math.round(forecastDay.temp.max)}°</div>
      <div class="col" id="dayLow">${Math.round(forecastDay.temp.min)}°</div>
      </div>`;
    }
  });
  forecast = forecast + `<div class="col-1"></div></div>`;
  displayForecast.innerHTML = forecast;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocationTemperature);
}
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showCurrentLocationTemperature(currentTemperature) {
  let latitude = currentTemperature.coords.latitude;
  let longitude = currentTemperature.coords.longitude;
  let currentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(currentLocation).then(weather);
}

function weather(showTemperature) {
  celciusTemperature = showTemperature.data.main.temp;
  document.querySelector("#currentTemperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#weatherDescription").innerHTML =
    showTemperature.data.weather[0].description;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    showTemperature.data.main.feels_like
  )}°c`;
  document.querySelector("#iconWind").innerHTML = ` ${Math.round(
    showTemperature.data.wind.speed
  )} metre/sec`;
  document.querySelector("#iconHumidity").innerHTML = ` ${Math.round(
    showTemperature.data.main.humidity
  )}%`;
  document.querySelector("h1").innerHTML = `HELLO, ${showTemperature.data.name
    .toUpperCase()
    .trim()}`;
  let currentWeatherIconElement = document.querySelector("#currentWeatherIcon");
  currentWeatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${showTemperature.data.weather[0].icon}@4x.png`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    showTemperature.data.weather[0].description
  );
  getForecast(showTemperature.data.coord);
}

function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  document.querySelector("h1").innerHTML = `HELLO, ${city.value
    .toUpperCase()
    .trim()}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
  axios.get(apiUrl).then(tempF);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", searchEngine);

function tempC(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTempC = document.querySelector("#currentTemperature");
  currentTempC.innerHTML = Math.round(celciusTemperature);
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", tempC);

function tempF(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let currentTempF = document.querySelector("#currentTemperature");
  let fahrenheitLink = (celciusTemperature * 9) / 5 + 32;
  currentTempF.innerHTML = Math.round(fahrenheitLink);
}
let celciusTemperature = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tempF);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

let apiKey = "56623de7e1f90faf5cccde1396a53f83";

let now = new Date();
let currentTime = (document.querySelector("h2").innerHTML = formatDate(now));
