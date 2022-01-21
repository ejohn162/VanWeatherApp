function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours <10){
    hours = `0${hours}`;
}
let minutes= date.getMinutes();
if (minutes <10){
    minutes=`0${minutes}`;
}
let days=[
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",

];
let day= days[date.getDay()];
return `${day} ${hours}:${minutes}`;

return ` ${day} ${hours}: ${minutes}`;
}
function formatDay(timestamp){
    let date= new date(timestamp *1000);
    let day=date.getDay();
    let days= ["Sun", "Mon", "Tue","Wed","Thur","Fri","Sat"];

    return days[day]
;}

function displayTemperature(response){
    
    let temperatureElement= document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    let descriptionElement= document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=response.data.wind.speed;
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML= formatDate(response.data.dt *1000);
    let iconElement=document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    

    console.log(response.data);


}

let apiKey = "803207aaaf3a18c2e1d94a41af0a3491";
let city= "San Francisco";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);