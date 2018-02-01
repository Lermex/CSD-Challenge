import { fetchUrl } from './api';

const apiUrl = 'http://localhost:5050/legacy';

export const getPhones = userId => fetchUrl(`${apiUrl}/${userId}/phone`);

export const getAdditional = userId => fetchUrl(`${apiUrl}/${userId}/additional`);
