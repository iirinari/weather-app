let now = new Date();

let h5 = document.querySelector("h5");
let currentDate = now.getDate();
if (currentDate < 10) {
	currentDate = `0${currentDate}`;
}
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
	hours = `0${hours}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
	"Jan",
	"Feb",
	"March",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Nov",
	"Dec",
];
let month = months[now.getMonth()];
h5.innerHTML = `${day}, ${hours}:${minutes}, ${month} ${currentDate}/${year}`;

function displayWeatherCondition(response) {
	celsiusTemperature = response.data.main.temp;

	document.querySelector("#temperatureNow").innerHTML =
		Math.round(celsiusTemperature);
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#description").innerHTML =
		response.data.weather[0].main;
	document.querySelector("#feels-like").innerHTML = Math.round(
		response.data.main.feels_like
	);
	
	let iconElement = document.querySelector("#current-weather-icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);

	getForecast(response.data.coord);
}

function search(city) {
	let apiKey = "30d625d03dd23e91996028ac924ded11";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#search-button").value;
	search(city);
}
let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", handleSubmit);


function convertToFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperatureNow");
	temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);

	celsiuslink.classList.remove("active");
	fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperatureNow");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);

	celsiuslink.classList.add("active");
	fahrenheitLink.classList.remove("active");
}

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;


search("Lviv");

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
      <div class="col-2">
                <div class="card">
                  <div class="card-body">
                    <ul>
                      <li class="day">${formatDay(forecastDay.dt)}</li>
                      <li class="">
                      <img class="animated-icon" src="http://openweathermap.org/img/wn/${
																							forecastDay.weather[0].icon
																						}@2x.png" alt="" width="55" /></li>
                      <li class="day-temperature">
                      <strong> ${Math.round(forecastDay.temp.max)}°</strong>⁄
                      ${Math.round(forecastDay.temp.min)}°</li>
                    </ul>
                  </div>
                </div>
              </div>
  `;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
	console.log(forecastHTML);
}

function getForecast(coordinates) {
	let apiKey = "30d625d03dd23e91996028ac924ded11";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
	celsiusTemperature = response.data.main.temp;

	document.querySelector("#temperatureNow").innerHTML =
		Math.round(celsiusTemperature);
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#description").innerHTML =
		response.data.weather[0].main;
	document.querySelector("#feels-like").innerHTML = Math.round(
		response.data.main.feels_like
	);

	let iconElement = document.querySelector("#current-weather-icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);

	getForecast(response.data.coord);
}
