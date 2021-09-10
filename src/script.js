function forecast(day) {
  document.querySelector("#dayOneIcon").innerHTML =
    day.data.list[0].weather[0].icon;
  document.querySelector("#dayTwoIcon").innerHTML =
    day.data.list[7].weather[0].icon;
  document.querySelector("#dayThreeIcon").innerHTML =
    day.data.list[15].weather[0].icon;
  document.querySelector("#dayFourIcon").innerHTML =
    day.data.list[23].weather[0].icon;
  document.querySelector("#dayFiveIcon").innerHTML =
    day.data.list[31].weather[0].icon;

  document.querySelector("#dayOneHigh").innerHTML = Math.round(
    day.data.list[0].main.temp_max
  );
  document.querySelector("#dayTwoHigh").innerHTML = Math.round(
    day.data.list[7].main.temp_max
  );
  document.querySelector("#dayThreeHigh").innerHTML = Math.round(
    day.data.list[15].main.temp_max
  );
  document.querySelector("#dayFourHigh").innerHTML = Math.round(
    day.data.list[23].main.temp_max
  );
  document.querySelector("#dayFiveHigh").innerHTML = Math.round(
    day.data.list[31].main.temp_max
  );
  document.querySelector("#dayOneLow").innerHTML = Math.round(
    day.data.list[0].main.temp_min
  );
  document.querySelector("#dayTwoLow").innerHTML = Math.round(
    day.data.list[7].main.temp_min
  );
  document.querySelector("#dayThreeLow").innerHTML = Math.round(
    day.data.list[15].main.temp_min
  );
  document.querySelector("#dayFourLow").innerHTML = Math.round(
    day.data.list[23].main.temp_min
  );
  document.querySelector("#dayFiveLow").innerHTML = Math.round(
    day.data.list[31].main.temp_min
  );
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
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    showTemperature.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    showTemperature.data.weather[0].description;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    showTemperature.data.main.feels_like
  )}°`;
  document.querySelector("#iconWind").innerHTML = `${Math.round(
    showTemperature.data.wind.speed
  )}km/h`;
  document.querySelector("#iconHumidity").innerHTML = `${Math.round(
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
}

function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  document.querySelector("h1").innerHTML = `HELLO, ${city.value
    .toUpperCase()
    .trim()}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`; //.value to get input
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
  axios.get(apiUrlForecast).then(forecast);
  axios.get(apiUrl).then(tempF);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", searchEngine);

function tempC(event) {
  event.preventDefault();
  document.querySelector("#currentTemperature").innerHTML = 0;
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", tempC);

function tempF(event) {
  event.preventDefault();
  let currentTempF = document.querySelector("#currentTemperature");
  let fahrenheit = currentTempF.innerHTML;
  let fahrenheitLink = (fahrenheit * 9) / 5 + 32;
  document.querySelector("#currentTemperature").innerHTML =
    Math.round(fahrenheitLink);
}

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

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tempF);

let now = new Date();
let currentTime = (document.querySelector("h2").innerHTML = formatDate(now));
