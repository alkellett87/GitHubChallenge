//Current Date
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
    "Feb",
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

//Current Time
setInterval (showTime, 1000);
function showTime() {
  let time = new Date ();
  let hour = time.getHours();
  let min = time.getMinutes();
    am_pm = "AM";

  if (hour > 12){
    hour -= 12;
    am_pm = "PM";
  }

  if (hour == 0){
    hr = 12;
    am_pm = "AM";
  }

  hour = hour < 10 ? + hour : hour;
  min = min < 10 ? "0" + min : min;

  let currentTime = hour + ":"
      + min + am_pm;

  document.getElementById("clock")
          .innerHTML = currentTime;
}
showTime();

//Search Engine
function searchCity(city) {
  let apiKey = "fd8290157d5eeba71b9dabe5d7447fd1";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
//Forecast
function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
     forecastElement.innerHTML +=
    `<div class="col-2">
          <h4>
            ${formatHours(forecast.dt * 1000)}
          </h4>
          <img
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            alt=""/>
            <div class = "forecast_temp">
              <strong>${Math.round(forecast.main.temp_max)}°
              </strong>/ ${Math.round(forecast.main.temp_min)}°
            </div>
      </div>`;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  searchCity(cityInputElement.value);
}

//Current Location
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  
  let apiKey = "fd8290157d5eeba71b9dabe5d7447fd1";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=m${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

//Weather
function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
    
  let cityElement = document.querySelector("#currentCity");
  cityElement.innerHTML = response.data.name;
  
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  
  let dateElement = document.querySelector("#currentDate");
  dateElement.innerHTML = formatDate(response.data.dt*1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute ("alt", response.data.weather[0].main);

  celsiusTemp = response.data.main.temp;
}

let celsiusTemp = null;

//Fahrenheit Temp
function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
  fahrenheitLink.addEventListener("click", showFahrenheitTemp)

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit); 
  
searchCity("New York");  