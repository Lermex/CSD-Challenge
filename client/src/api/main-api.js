import { fetchUrl } from './api';

const apiUrl = 'http://localhost:5050/api';

export const getUsers = () => fetchUrl(`${apiUrl}/user`);

export const search = text => fetchUrl(`${apiUrl}/search/${text}`);
