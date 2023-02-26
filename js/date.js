"use strict";

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');

requestAnimationFrame(go);

function go() {
  const dateObj = new Date();
  showTime(dateObj);
  showDate(dateObj);
  showGreeting(greetingTrans[lang]);
  requestAnimationFrame(go);
}

function showTime(dateObj) {
  time.textContent = `${dateObj.toLocaleTimeString("arabext", { hour12: isLang })}`;
}

function showDate(dateObj) {
  date.textContent = `${dateObj.toLocaleDateString(`${dateTrans[lang]}`, { weekday: 'long', month: 'long', day: 'numeric' })}`;
}

function showGreeting(arrLng) {
  let dayTime = getTimeOfDay(arrLng)
  let good = lang === 'en' ? 'Good' : rusLang();

  greeting.textContent = `${good} ${dayTime}`;
  userName.setAttribute('placeholder', `${placeholderTrans[lang].name}`)
  function rusLang() {
    switch (dayTime) {
      case 'ночи': return 'Доброй';
      case 'утро': return 'Доброе';
      default: return 'Добрый';
    }
  }
}

function getTimeOfDay(p) {
  return p[Math.trunc(new Date().getHours() / 6)]
}




