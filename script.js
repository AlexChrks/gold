let reserve = {
  base: "EUR",
  date: "2021-05-04",
  rates: {
    AUD: 1.5608,
    BGN: 1.9558,
    BRL: 6.5785,
    CAD: 1.4836,
    CHF: 1.098,
    CNY: 7.8136,
    CZK: 25.841,
    DKK: 7.4361,
    GBP: 0.8677,
    HKD: 9.3374,
    HRK: 7.5408,
    HUF: 360.31,
    IDR: 17395.47,
    ILS: 3.9097,
    INR: 88.814,
    ISK: 148.8,
    JPY: 131.26,
    KRW: 1353.56,
    MXN: 24.404,
    MYR: 4.9563,
    NOK: 10.0123,
    NZD: 1.6887,
    PHP: 57.787,
    PLN: 4.5584,
    RON: 4.9275,
    RUB: 90.2438,
    SEK: 10.1673,
    SGD: 1.6073,
    THB: 37.475,
    TRY: 10.011,
    USD: 1.2021,
    ZAR: 17.4433,
  }
}

const wrapper = document.querySelector('.global-wrapper');

function showErrorNotification() {
  const error = document.createElement('div');
  error.innerText = 'Impossible to load rates. Try later';
  wrapper.append(error);
  
  error.addEventListener('click', () => {
    error.parentNode.removeChild(error);
    ratesApp();
  });
}

async function query() {
  const url = 'https://api.ratesapi.io/api/latests';
  let response = await fetch(url);
  return response;
}

function fillCurrency(parent, data) {
  for (let key in data.rates) {
    const option = document.createElement('option')
    option.innerText = key;
    parent.append(option);
  }
}


async function ratesApp() {
  let response = await query();
  let data = await response.json();
  
  if (response.status !== 200) {
    showErrorNotification();
    return;
  }



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
    data = await (await query()).json();
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
  

  wrapper.append(input, baseDrop, symbolDrop, btnCalculate, resultDiv);
}

  ratesApp();


