"use strict";

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
const quoteWrap = document.querySelector('.quote-wrap');


changeQuoteBtn.addEventListener('click', changeQuote);

getQuotes();

async function getQuotes() {
  // const url = 'https://www.breakingbadapi.com/api/quotes';
  // const res = await fetch(url);
  // const data = await res.json();

  const res = JSON.stringify(quoteExmpl);
  const data = await JSON.parse(res);

  let quoteNum = randomRange(1, data[lang].length - 1);

  quote.textContent = data[lang][quoteNum].text;
  author.textContent = data[lang][quoteNum].author;

  quote.style.opacity = 1;
  author.style.opacity = 1;
}


function changeQuote() {
  changeQuoteBtn.style.transform += `rotate(90deg)`;
  quote.style.opacity = 0;
  author.style.opacity = 0;

  getQuotes();
}