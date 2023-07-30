import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_0hPbxFamY05lE2M7cXQuRYvAWDvYf9NcaMNRk1hPW3JqdcXDEmKVab3K1qW3UolF';

const BASE_URL = `https://api.thecatapi.com/v1/breeds`;

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
}
