function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day.toUpperCase()}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "2f508dedc6bfa0bf55aae24e4db29f0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 section-2">
              <div class="block-day">
                <p class="dayweek">${formatDay(forecastDay.dt)}</p>

                <img
                src= "http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt = ""
                width = "50"
                />
                <p class="tempweek"> <span id="temp-week" class= "maxTempWeek">${Math.round(
                  forecastDay.temp.max
                )}</span>° - <span id="temp-week"></span>${Math.round(
          forecastDay.temp.min
        )}</span>°</p>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function fahrengeit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let fahrengeitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrengeitTemperature);
}
function fahrengeitWeek(event) {
  event.preventDefault();
  let weekTemp = document.querySelector("temp-week");
  let fahrengeitTemperatureWeek = (weekTemp * 9) / 5 + 32;
  weekTemp.innerHTML = Math.round(fahrengeitTemperatureWeek);
}
function celsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemperature);
}

function searchWeath(responce) {
  document.querySelector("#temperature").innerHTML = Math.round(
    responce.data.main.temp
  );
  document.querySelector("#current-city").innerHTML = responce.data.name;
  document.querySelector("#high-temp").innerHTML = Math.round(
    responce.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    responce.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    responce.data.weather[0].main;
  document.querySelector("#about-weather").innerHTML =
    responce.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
  document.querySelector("#feels-temp").innerHTML = Math.round(
    responce.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = responce.data.wind.speed;
  document
    .querySelector("#icon-weather")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
    );
  celsiusTemperature = responce.data.main.temp;
  getForecast(responce.data.coord);
}
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
function search(city) {
  let units = "metric";
  let apiKey = "2f508dedc6bfa0bf55aae24e4db29f0a";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiLink = `${apiUrl}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiLink).then(searchWeath);
}

function geoTemp(responce) {
  document.querySelector("#temperature").innerHTML = Math.round(
    responce.data.main.temp
  );
  document.querySelector("#current-city").innerHTML = responce.data.name;
}

function geoPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "2f508dedc6bfa0bf55aae24e4db29f0a";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiLink = `${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiLink).then(geoTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(geoPosition);
}

let dateTime = document.querySelector("h4");
let currentDate = new Date();
dateTime.innerHTML = formatDate(currentDate);

let celsiusTemperature = null;

let fahrengeitLink = document.querySelector("#fahrenheit-link");
fahrengeitLink.addEventListener("click", fahrengeit, fahrengeitWeek);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

let currentButton = document.querySelector("#geo-button");
currentButton.addEventListener("click", getCurrentPosition);

search("Lisbon");
