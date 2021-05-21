import showErrorNotification from './showErrorNotification.js';

export default async function query(errorParent) {
  const url = 'https://api.exchangerate.host/latest';
  let response = await fetch(url).catch((e) => {
    console.log('Api error')
  });

  if (response === undefined) {
    const {default: showErrorNotification} = await import('./showErrorNotification.js');
    showErrorNotification(errorParent);
    return;
  }

  return response.json();
}
