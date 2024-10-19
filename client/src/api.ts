import * as API from './api-sdk';

API.OpenAPI.BASE =
  process.env.SERVER_URL ?? 'https://knowtes-api-g7d4q.ondigitalocean.app';

export default API;
