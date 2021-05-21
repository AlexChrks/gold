export default function showErrorNotification(parent) {
  const error = document.createElement('div');
  error.innerText = 'Impossible to load rates. Try later';
  parent.appendChild(error);
  
  error.addEventListener('click', () => {
    error.parentNode.removeChild(error);
    ratesApp();
  });
}
