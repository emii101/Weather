const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = 'ff91e8c4cf93a29ac832c633961e06b8';
const diffKelvin = 273.15;

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);//llamar a la api para recibir la informacion del clima
    } else {
        alert('Enter a valid city');
    }
});

function fetchWeather(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
        .then(data => data.json())
        .then(data => showWeatherData(data))
}

//los datos y nombres son obtenidos gracias a la app Postman, que sirve para testear APis
function showWeatherData(data) {
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = '';
    const cityName = data.name;
    const countryName = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    //icono
    const icon = data.weather[0].icon;

    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName}, ${countryName}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `Temperature: ${Math.floor(temp - diffKelvin)}°C`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `Humidity: ${humidity}%`;

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png` //verificar en la documentacion como insertar una imagen

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `Description: ${description}`;

    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(iconInfo);
    divResponseData.appendChild(descriptionInfo);
}