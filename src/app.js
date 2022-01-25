function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;

  return ` ${day} ${hours}: ${minutes}`;
}
function formatDay(timestamp) {
  let date = new date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates){
    let apiKey = "803207aaaf3a18c2e1d94a41af0a3491";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
    
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

function showCelsiusTemp(event){
    event.preventDefault();
    farenheihtLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);


}

function displayWeatherForecast(response){
    console.log(response.data.daily);
    let forecastElement=document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let days=[
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        
        
    ]
    days.forEach(function(day){
 forecastHTML = forecastHTML +
   `<div class= "col-2">
                 <div class="weather-forecast-date">
                     ${day}
                     </div>
                 <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" width="42" />

                 <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-maximum">18°</span>  <span class ="weather-forecast-temperature-minimum">12°</span>
                 </div>
            </div>`;


    })
    
  
         forecastHTML= forecastHTML+ `</div>`;
    forecastElement.innerHTML=forecastHTML;
    
}
let celsiusTemperature=null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheihtLink = document.querySelector("#farenheit-link");
farenheihtLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("New York");

