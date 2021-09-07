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
  document.querySelector("#feelsLike").innerHTML = Math.round(
    showTemperature.data.main.feels_like
  );
  document.querySelector("#iconWind").innerHTML = Math.round(
    showTemperature.data.wind.speed
  );
  document.querySelector("#iconHumidity").innerHTML = Math.round(
    showTemperature.data.main.humidity
  );
  document.querySelector("h1").innerHTML = `HELLO, ${showTemperature.data.name
    .toUpperCase()
    .trim()}`;
}

function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  document.querySelector("h1").innerHTML = `HELLO, ${city.value
    .toUpperCase()
    .trim()}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`; //.value to get input
  axios.get(apiUrl).then(weather);
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
  let currentTempF = (document.querySelector(
    "#currentTemperature"
  ).innerHTML = 70);
}
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
