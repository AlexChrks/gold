export default async function query(errorParent) {
  const url = 'https://api.ratesapi.io/api/latest';
  let response = await fetch(url);

  if (response.status !== 200) {
    const {default: showErrorNotification} = await import('./showErrorNotification.js');
    showErrorNotification(errorParent);
    return;
  }

  return response.json();
}
