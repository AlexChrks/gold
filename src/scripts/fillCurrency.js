export default function fillCurrency(parent, data) {
  for (let key in data.rates) {
    const option = document.createElement('option')
    option.innerText = key;
    parent.appendChild(option);
  }
}
