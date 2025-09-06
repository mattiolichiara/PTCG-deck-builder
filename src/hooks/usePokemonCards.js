import { useQuery } from 'react-query';
import { pokemonApi } from '../services/TCGApiService.js';

export const usePokemonCards = (searchParams = {}) => {
    return useQuery(
        ['pokemon-cards'],
        () => pokemonApi.getSets(),
        { staleTime: 5 * 60 * 1000 }
    );
};