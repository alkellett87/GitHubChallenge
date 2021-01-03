function formatDate(timestamp) {
  let date = new Date(timestamp);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Fed",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${days[date.getDay()]}, ${date.getDate()}
    ${months[date.getMonth()]}
    ${date.getFullYear()}`;
}

function formatHours(timestamp) {
  let time = new Date(timestamp);

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "fd8290157d5eeba71b9dabe5d7447fd1";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "fd8290157d5eeba71b9dabe5d7447fd1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
