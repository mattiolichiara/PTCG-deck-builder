import axios from 'axios';

const API_KEY = import.meta.env.VITE_POKEMON_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Invalid API Key');
        }
        if (error.response?.status === 500) {
            console.error('Server Error');
        }
        if (error.response?.status === 400) {
            console.error('Bad Request');
        }
        return Promise.reject(error);
    }
);

export const pokemonApi = {
    getSets: (params = {}) =>
        api.get('/sets', { params }).then(response => response.data),

    getAllCards: (params = {}) =>
        api.get(`/cards?orderBy=-set.releaseDate&pageSize=250&${new URLSearchParams(params).toString()}`)
            .then(response => response.data),

    getCardsByName: (searchQuery, params = {}) =>
        api.get(`/cards?q=name:${encodeURIComponent(searchQuery)}*&orderBy=-set.releaseDate&pageSize=250&${new URLSearchParams(params).toString()}`)
            .then(response => response.data),
};

export default pokemonApi;