"use strict";


window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
  if (localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }

  if (localStorage.getItem('photoSrc')) {
    photoSrc = localStorage.getItem('photoSrc');
    setBg(photoSrc);
    setsetDefaultBg();
  }

  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather();
  } else {
    city.value = cityTrans[lang];
    getWeather();
  }

  if (localStorage.getItem('valAtr')) {
    valAtr = JSON.parse(localStorage.getItem('valAtr'));
    setCheckItemAtr();
    showHide();
  }

  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
    setIsLang();
    setDefaultLang();
    callLang();
  }
}

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('lang', lang);
  localStorage.setItem('photoSrc', photoSrc);
  localStorage.setItem('valAtr', JSON.stringify(valAtr));

  if (city.value) {
    localStorage.setItem('city', city.value);
  } else {
    localStorage.setItem('city', cityTrans[lang]);
  }

}