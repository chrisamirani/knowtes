import * as API from './api-sdk';

API.OpenAPI.BASE = process.env.SERVER_URL ?? 'http://localhost:5000';

export default API;
