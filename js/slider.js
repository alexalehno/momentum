"use strict";

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const photoBlock = document.querySelector('#photo-src');
const photoSrcItems = document.querySelectorAll('.photo-src-item');

const photoSrcNames = {
  github: 'github',
  unsplash: 'unsplash',
  flickr: 'flickr',
}

let randomNum = randomRange(1, 20);
let photoSrc = 'github';

photoBlock.addEventListener('change', (e) => tooglePhotoSrc(e));
slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);


setsetDefaultBg();
setBg(photoSrc);

function tooglePhotoSrc(e) {
  if (e.target.tagName === 'INPUT') {
    if (e.target.checked) {
      photoSrc = e.target.value;
    }
  }

  setBg(photoSrc);
}

function setsetDefaultBg() {
  switch (photoSrc) {
    case 'github': photoSrcItems[0].setAttribute('checked', true);
      break;
    case 'unsplash': photoSrcItems[1].setAttribute('checked', true);
      break;
    case 'flickr': photoSrcItems[2].setAttribute('checked', true);
      break;
  }
}

function setBg(source) {
  switch (source) {
    case 'github': setBgGitHub();
      break;
    case 'unsplash': setBgUnsplash();
      break;
    case 'flickr': setBgFlickr();
      break;
  }
}

async function setBgFlickr() {
  console.log('photoSrc ->' + photoSrc);
  let timeOfDay = getTimeOfDay(greetingTrans.en);
  let other = 'nature';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1713ee05b31071453a14c93ab6f2ce05&tags=${timeOfDay},${other}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();

  let randomNum = randomRange(1, data.photos.photo.length - 1);

  const img = new Image();
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => document.body.style.backgroundImage = `url(${img.src})`;
}

async function setBgUnsplash() {
  console.log('photoSrc ->' + photoSrc);
  let timeOfDay = getTimeOfDay(greetingTrans.en);
  let other = 'nature';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay},${other}&client_id=Ql7B3qHA22ax1DBBh5QFL2PcN66bF5lu-sfsS2q9azw`;
  const res = await fetch(url);
  const data = await res.json();

  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => document.body.style.backgroundImage = `url(${img.src})`;
}


function setBgGitHub() {
  console.log('photoSrc ->' + photoSrc);
  let timeOfDay = getTimeOfDay(greetingTrans.en);
  let bgNum = randomNum.toString().padStart(2, "0");

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/alexalehno/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => document.body.style.backgroundImage = `url(${img.src})`;
}

function getSlidePrev() {
  if (photoSrc === 'github') {
    randomNum--;
    if (randomNum < 1) randomNum = 20;
  }
  setBg(photoSrc);
}

function getSlideNext() {
  if (photoSrc === 'github') {
    randomNum++;
    if (randomNum > 20) randomNum = 1;
  }
  setBg(photoSrc);
}

function randomRange(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

