"use strict";

const playPrevBtn = document.querySelector('.play-prev');
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

const progressDuration = document.querySelector('.progress-duration');
const trackName = document.querySelector('.track-name');
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');

const volumeBtn = document.querySelector('.volume-btn');
const progressVolume = document.querySelector('.progress-volume');

const audio = new Audio();

let isPlay = false;
let playNum = 0;
let vol = null;

const playList = [
  {
    title: 'Aqua Caelestis',
    src: './assets/sounds/Aqua Caelestis.mp3',
    duration: '00:39'
  },
  {
    title: 'River Flows In You',
    src: './assets/sounds/River Flows In You.mp3',
    duration: '01:37'
  },
  {
    title: 'Ennio Morricone',
    src: './assets/sounds/Ennio Morricone.mp3',
    duration: '01:37'
  },
  {
    title: 'Summer Wind',
    src: './assets/sounds/Summer Wind.mp3',
    duration: '01:50'
  }
]

playList.forEach((el, i) => {
  createElement(el, i);
  setSource(i);
});

const playItems = document.querySelectorAll('.play-item');

audio.addEventListener('loadeddata', () => {
  handleDuration();
  handleVolume();
  setTrackName();

  durationTime.textContent = formatSec(audio.duration);
});

audio.addEventListener('ended', () => {
  if (isPlay) {
    playNext()
  }
});

playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
playBtn.addEventListener('click', () => toggleAudio(playNum));

playItems.forEach(el => el.addEventListener('click', () => playItem(el)));
audio.addEventListener("timeupdate", handleDuration);
progressDuration.addEventListener("input", changeCurrrentTime);

progressVolume.addEventListener('input', handleVolume);
volumeBtn.addEventListener('click', toggleSound)


function handleDuration() {
  progressDuration.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = formatSec(audio.currentTime);
}

function changeCurrrentTime() {
  audio.currentTime = (progressDuration.value * audio.duration) / 100;
}

function handleVolume() {
  audio.volume = progressVolume.value / 100;
  vol = audio.volume;

  if (audio.volume === 0) {
    volumeBtn.classList.add('mute');
  } else {
    volumeBtn.classList.remove('mute');
  }
}

function toggleSound() {
  if (audio.volume) {
    audio.volume = 0;
    progressVolume.value = audio.volume;
  } else {
    audio.volume = vol;
    progressVolume.value = vol * 100;
  }

  if (vol) {
    volumeBtn.classList.toggle('mute');
  }
}

function playItem(el) {
  playNum = +el.dataset.num;

  if (!el.classList.contains('is_clicked')) {
    playPrevNext(playNum);
  } else {
    toggleAudio(playNum);
  }

  playItems.forEach(item => item.classList.remove('is_clicked'))
  el.classList.add('is_clicked');
}

function playAudio() {
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  setTrackName()
}

function setTrackName() {
  trackName.textContent = `${playNum + 1}. ${playList[playNum].title}`;
}

function pauseAudio() {
  audio.pause();
  isPlay = false;
}

function playPrev() {
  playNum--;
  if (playNum < 0) playNum = playList.length - 1;
  playPrevNext(playNum);
}

function playNext() {
  playNum++;
  if (playNum > playList.length - 1) playNum = 0;
  playPrevNext(playNum);
}

function toggleAudio(n) {
  setSource(n);
  isPlay ? pauseAudio() : playAudio();
  playBtn.classList.toggle('pause');
  decorateActive();
}

function playPrevNext(n) {
  setSource(n);
  playAudio();
  playBtn.classList.add('pause');
  decorateActive();
}

function decorateActive() {
  playItems.forEach((el, i) => {
    el.classList.remove('item-active');
    el.classList.remove('is_clicked');
    if (isPlay) {
      if (i === playNum) {
        el.classList.add('item-active');
        el.classList.add('is_clicked');
      }
    }
  })
}

function setSource(n) {
  audio.src = playList[n].src;
}

function createElement(el, i) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.setAttribute('data-num', i)
  li.textContent = `${el.title} - ${playList[i].duration}`;
  playListContainer.append(li);
}

function formatSec(sec) {
  sec = Math.trunc(sec);
  let m = Math.trunc(sec / 60);
  let s = sec - m * 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
