"use strict";

const language = document.querySelector('#language');
const engBtn = document.querySelector('#eng');
const rusBtn = document.querySelector('#rus');
const setItemsName = document.querySelectorAll('.set-item-name');
const setTranc = document.querySelectorAll('.set-tranc');

const greetingTrans = {
  en: ['night', 'morning', 'afternoon', 'evening'],
  ru: ['ночи', 'утро', 'день', 'вечер'],
}

const dateTrans = {
  en: 'en-US',
  ru: 'ru',
}

const weatherTrans = {
  en: {
    speed: 'Wind speed:',
    humidity: 'Humidity:',
    measur: 'm/s',
    errorNotFound: 'Error! city not found for',
    errorNothing: 'Error! Nothing to geocode for',

  },
  ru: {
    speed: 'Скорость ветра:',
    humidity: 'Влажность',
    measur: 'м/с',
    errorNotFound: 'Ошибка! город не найден для',
    errorNothing: 'Ошибка! Нечего геокодировать для',
  },
}

const placeholderTrans = {
  en: {
    name: '[Enter name]',
    city: '[Enter city]',
  },
  ru: {
    name: '[Введите имя]',
    city: '[Введите город]',
  },
}

const cityTrans = {
  en: 'Minsk',
  ru: 'Минск',
}

const settingsTrans = {
  items: {
    en: ['eng', 'rus', 'GitHub', 'Unsplash', 'Flickr', 'Audio', 'Weather', 'Time', 'Date', 'Greeting', 'Quotes'],
    ru: ['анг', 'рус', 'ГитХаб', 'Анплаш', 'Фликр', 'Аудио', 'Погода', 'Время', 'Дата', 'Приветствие', 'Цитаты'],
  },
  title: {
    en: ['Settings', 'Language', 'Photo source', 'Show / Hide'],
    ru: ['Настройки', 'Язык', 'Источник фото', 'Показать / Спрятать'],
  }
}

let isLang = true;
let lang = 'en';

language.addEventListener('change', (e) => toogleLang(e));

setDefaultLang();

function setIsLang() {
  lang === 'en' ? isLang = true : isLang = false;
}

function setDefaultLang() {
  if (isLang) {
    engBtn.setAttribute('checked', true);
  } else {
    rusBtn.setAttribute('checked', true);
  }
}

function toogleLang(e) {
  if (e.target.tagName === 'INPUT') {
    if (e.target.checked) {
      lang = e.target.value;
    }
    setIsLang();
    callLang();
  }
}

function callLang() {
  getWeather();
  getQuotes();
  translateForSet();
}

function translateForSet() {
  setItemsName.forEach((el, i) => {
    el.textContent = settingsTrans.items[lang][i];
  })

  setTranc.forEach((el, i) => {
    el.textContent = settingsTrans.title[lang][i]
  })
}

