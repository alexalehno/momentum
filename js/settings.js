"use strict";

const settingsBtn = document.querySelector('.settings-btn');
const settingsBlock = document.querySelector('.settings-block');
const hideBlocks = document.querySelectorAll('[data-hide]');
const checkItems = document.querySelectorAll('.check-label > input');
const showHideBlock = document.querySelector('#show-hide-block');
const blockClose = document.querySelector('.block-close');


settingsBtn.addEventListener('click', showSettings);
showHideBlock.addEventListener('change', toogleShowHide);
blockClose.addEventListener('click', () => settingsBlock.classList.remove('settings-block-show'));

let valAtr = [true, true, true, true, true, true];

setCheckItemAtr();

function showHide() {
  valAtr.forEach((el, i) => {
    if (!el) {
      hideBlocks[i].classList.add('show-hide');
    }
  })
}

function setCheckItemAtr() {
  checkItems.forEach((el, i) => {
    el.removeAttribute('checked');
    if (valAtr[i]) {
      el.setAttribute('checked', true);
    }

    el.setAttribute('value', i);
  })
}

function toogleShowHide(e) {
  if (e.target.tagName === 'INPUT') {
    let value = +e.target.value;
    if (!e.target.checked) {
      hideBlocks[value].classList.add('show-hide');
      valAtr[value] = false;
    } else {
      hideBlocks[value].classList.remove('show-hide');
      valAtr[value] = true;
    }
  }
}

function showSettings() {
  settingsBlock.classList.toggle('settings-block-show');
}
