import axios from 'axios';

const API_KEY =
  'live_0hPbxFamY05lE2M7cXQuRYvAWDvYf9NcaMNRk1hPW3JqdcXDEmKVab3K1qW3UolF';
axios.defaults.headers.common['x-api-key'] = API_KEY;

const BASE_URL = `https://api.thecatapi.com/v1/breeds`;

export function fetchBreeds() {
  return fetch(`${BASE_URL}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
