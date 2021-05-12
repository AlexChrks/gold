import './index.html';
import '../src/styles/styles.css';

require("@babel/polyfill");
require('es6-promise').polyfill();
require('fetch-everywhere');


const wrapper = document.querySelector('.global-wrapper');

function showErrorNotification() {
  const error = document.createElement('div');
  error.innerText = 'Impossible to load rates. Try later';
  wrapper.appendChild(error);
  
  error.addEventListener('click', () => {
    error.parentNode.removeChild(error);
    ratesApp();
  });
}

async function query() {
  const url = 'https://api.ratesapi.io/api/latest';
  let response = await fetch(url);
  if (response.status !== 200) {
    showErrorNotification();
    return;
  }
  return response.json();
}

function fillCurrency(parent, data) {
  for (let key in data.rates) {
    const option = document.createElement('option')
    option.innerText = key;
    parent.appendChild(option);
  }
}

async function ratesApp() {
  let data = await query();

  const input = document.createElement('input');
  input.placeholder = 'Count';
  input.classList.add('form-control');
  
  const baseDrop = document.createElement('select');
  baseDrop.classList.add('form-select');

  const symbolDrop = document.createElement('select');
  symbolDrop.classList.add('form-select');

  const btnCalculate = document.createElement('button');
  btnCalculate.classList.add('btn', 'btn-primary');
  btnCalculate.innerText = 'Calculate';

  const resultDiv = document.createElement('div');

  baseDrop.addEventListener('change', async function changeQuery() {
    data = await query();
  });

  fillCurrency(baseDrop, data);
  fillCurrency(symbolDrop, data);

  btnCalculate.addEventListener('click', (e) => {
    const inputValue = input.value;
    const baseValue = baseDrop.value;
    const symbolValue = symbolDrop.value;

    const euroEq = inputValue / data.rates[baseValue];
    const result = euroEq * data.rates[symbolValue];
    resultDiv.innerText = `${result.toFixed(2)} ${symbolValue}`;
  });
  

  wrapper.appendChild(input);
  wrapper.appendChild(baseDrop);
  wrapper.appendChild(symbolDrop);
  wrapper.appendChild(btnCalculate);
  wrapper.appendChild(resultDiv);
}

  ratesApp();
