function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
   hours = ((hours + 11) % 12) + 1;
   let minutes = date.getMinutes();
   if (minutes < 10) {
     minutes = `0${minutes}`;
   }
  let ampm =date.getHours() <12 ? "AM" : "PM";
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} ${ampm}`;

}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}



function getForecast(coordinates) {
  let apiKey = "803207aaaf3a18c2e1d94a41af0a3491";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
   

  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");

  

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "803207aaaf3a18c2e1d94a41af0a3491";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  farenheihtLink.classList.add("active");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}



function displayWeatherForecast(response) {
  let dailyForecast=response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
   dailyForecast.forEach(function (forecastDay, index) {
       if (index <6){
         forecastHTML =
           forecastHTML +
           `<div class= "col-2">
                 <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
                     
                     </div>
                     
                 <img src="https://openweathermap.org/img/wn/${
                   forecastDay.weather[0].icon
                 }@2x.png" alt="" width="42" />
                 <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-maximum">${Math.round(
                  forecastDay.temp.max
                )}°</span>  <span class ="weather-forecast-temperature-minimum">${Math.round(
             forecastDay.temp.min
           )}°</span>
                 </div>
            </div>`;
       }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function searchLocation(position) {
  let apiKey = "893f85209adc85644388072cc867bd9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheihtLink = document.querySelector("#farenheit-link");
farenheihtLink.addEventListener("click", showFarenheitTemp);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


search("New York");
