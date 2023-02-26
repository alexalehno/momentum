"use strict";

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('change', getWeather);

function setCity(e) {
  if (e.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=e304680c10f4d309111ce5037f438375&units=metric`
    const res = await fetch(url);
    const data = await res.json();

    city.setAttribute('placeholder', `${placeholderTrans[lang].city}`)
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${weatherTrans[lang].speed} ${Math.floor(data.wind.speed)} ${weatherTrans[lang].measur}`;
    humidity.textContent = `${weatherTrans[lang].humidity} ${data.main.humidity}%`;

  } catch {
    if (city.value) {
      weatherError.textContent = `${weatherTrans[lang].errorNotFound} '${city.value}'!`;
    } else {
      weatherError.textContent = `${weatherTrans[lang].errorNothing} '${city.value}'!`;
    }

    temperature.textContent = ``;
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
}





