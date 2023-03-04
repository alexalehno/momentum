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

// ..............dragAndDrop....................

dragAndDrop();

function dragAndDrop() {
  let outer = document.body;
  let inner = settingsBlock;
  let grabArea = settingsBlock.querySelector('.grab-area');
  let isDrag = false;

  let limits = {
    top: outer.offsetTop,
    left: outer.offsetLeft,
    right: outer.offsetWidth + outer.offsetLeft - inner.offsetWidth,
    bottom: outer.offsetHeight + outer.offsetTop - inner.offsetHeight,
  };


  grabArea.addEventListener("dragstart", (e) => e.preventDefault());

  grabArea.addEventListener("pointerdown", (e) => {
    let shiftX = e.clientX - inner.getBoundingClientRect().left;
    let shiftY = e.clientY - inner.getBoundingClientRect().top;

    isDrag = true;
    setStyles();
    document.body.prepend(inner);

    document.addEventListener("pointermove", (e) => {
      if (isDrag) {
        move(e);
      }
    });

    document.addEventListener("pointerup", () => {
      isDrag = false;
      inner.style.transition = '';
    });

    function move(e) {
      let left = e.pageX - shiftX;
      let top = e.pageY - shiftY;

      if (left > limits.right) {
        left = limits.right;
      }

      if (left < limits.left) {
        left = limits.left;
      }

      if (top < limits.top) {
        top = limits.top;
      }

      if (top > limits.bottom) {
        top = limits.bottom;
      }

      inner.style.left = `${left}px`;
      inner.style.top = `${top}px`;
    }

    function setStyles() {
      inner.style.position = 'absolute';
      inner.style.left = `${e.pageX - shiftX}px`;
      inner.style.top = `${e.pageY - shiftY}px`;
      inner.style.bottom = 'auto';
      inner.style.zIndex = 1000;
      inner.style.transition = '0s';
    }
  });

  window.addEventListener('resize', () => {
    let newLimits = {
      top: outer.offsetTop,
      left: outer.offsetLeft,
      right: outer.offsetWidth + outer.offsetLeft - inner.offsetWidth,
      bottom: outer.offsetHeight + outer.offsetTop - inner.offsetHeight,
    };
  
    limits = newLimits;
  })
}
