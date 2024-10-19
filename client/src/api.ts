import * as API from './api-sdk';

API.OpenAPI.BASE =
  process.env.NEXT_PUBLIC_SERVER_URL ??
  'https://knowtes-api-g7d4q.ondigitalocean.app';

export default API;
