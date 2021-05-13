export default async function ratesApp(parent) {

  const {default: query} = await import('./query.js')
  let data = await query(parent);
  
  const {default: createUI} = await import('./createUI.js');
  const {input, baseDrop, symbolDrop, btnCalculate, resultDiv} = createUI(parent);

  const {default: fillCurrency} = await import('./fillCurrency.js');
  fillCurrency(baseDrop, data);
  fillCurrency(symbolDrop, data);

  baseDrop.addEventListener('change', async function changeQuery() {
    data = await query();
  });
  
  const {default: calc} = await import('./calc.js');

  btnCalculate.addEventListener('click', () => {
    calc(input, baseDrop, symbolDrop, resultDiv, data)
  });
}
