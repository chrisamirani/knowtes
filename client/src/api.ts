import * as API from './api-sdk';

API.OpenAPI.BASE =
  process.env.NEXT_PUBLIC_SERVER_URL ??
  'https://knowtes-api-g7d4q.ondigitalocean.app';

if (typeof window !== 'undefined') {
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('token');
  API.OpenAPI.TOKEN = urlToken ?? localStorage.getItem('TOKEN') ?? '';

  localStorage.setItem('TOKEN', API.OpenAPI.TOKEN);
}
export default API;
