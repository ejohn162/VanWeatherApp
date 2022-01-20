function displayTemperature(response){
    console.log(response.data);

}

let apiKey = "803207aaaf3a18c2e1d94a41af0a3491";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);