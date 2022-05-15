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
let dateTime = document.querySelector("h4");
let currentDate = new Date();
dateTime.innerHTML = formatDate(currentDate);

function fahrengeit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let fTemp = Math.round((18 * 9) / 5 + 32);
  temp.innerHTML = ` ${fTemp}`;
}
let fTemp = document.querySelector("#fahrenheit-link");
fTemp.addEventListener("click", fahrengeit);

function celcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `18`;
}
let cTemp = document.querySelector("#celsius-link");
cTemp.addEventListener("click", celcius);

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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

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

let currentButton = document.querySelector("#geo-button");
currentButton.addEventListener("click", getCurrentPosition);
