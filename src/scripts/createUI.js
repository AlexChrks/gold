export default function createUI(parent) {
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

  parent.appendChild(input);
  parent.appendChild(baseDrop);
  parent.appendChild(symbolDrop);
  parent.appendChild(btnCalculate);
  parent.appendChild(resultDiv);
  
  return {input, baseDrop, symbolDrop, btnCalculate, resultDiv};
}