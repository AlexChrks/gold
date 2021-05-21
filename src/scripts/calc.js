export default function calc(input, baseDrop, symbolDrop, resultDiv, data) {
  const inputValue = input.value;
  const baseValue = baseDrop.value;
  const symbolValue = symbolDrop.value;

  const euroEq = inputValue / data.rates[baseValue];
  const result = euroEq * data.rates[symbolValue];
  resultDiv.innerText = `${result.toFixed(2)} ${symbolValue}`;
}
