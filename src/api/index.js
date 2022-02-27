import axios from 'axios';

const host = 'http://127.0.0.1:3000';

const apiPath = '/api/v1/';

const normalizePath = (path) => {
  let p = path;
  if (p.endsWith('/')) p = p.substring(0, p.length - 1);
  if (p.startsWith('/')) p = p.substring(1);
  return p;
};

const url = (path, api = true) => {
  const fullpath = api ? `${apiPath}${normalizePath(path)}` : path;
  return (new URL(fullpath, host)).href;
};

const normalizeError = (err) => {
  if (!err) {
    return { message: 'An unknown error encountered. Please try again.' };
  }
  if (err.response) {
    return { message: err.response.data.message || JSON.stringify(err.response.data) };
  }
  if (err.request) {
    return { message: 'Server is not responding. One possibility is that CORS is disabled on server. Check your console to see' };
  }
  if (err.message) {
    return { message: err.message };
  }
  if (typeof err === 'string') {
    return { message: err };
  }
  return { message: 'An unknown error encountered. Please try again.' };
};

const instantiate = () => {
  const config = { responseType: 'json' };
  return axios.create(config);
};

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @returns Promise that resolves to fetched data when request is successful
 * and rejects with error when request fails
 */
const get = (path) => new Promise((resolve, reject) => {
  instantiate().get(path)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(normalizeError(err)));
});

export const getCategories = () => get(url('/categories'));

export const getNotes = () => get(url('/notes'));

export const getNote = (id) => get(url(`/notes/${id}`));
