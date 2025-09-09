import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../services/TCGApiService';

export const usePokemonCards = (searchParams = {}) => {
    return useQuery({
        queryKey: ['pokemon-cards', searchParams],
        queryFn: () => pokemonApi.getAllCards(searchParams),
        staleTime: 5 * 60 * 1000,
    });
};

export const usePokemonSets = (searchParams = {}) => {
    return useQuery({
        queryKey: ['pokemon-sets', searchParams],
        queryFn: () => pokemonApi.getSets(searchParams),
        staleTime: 5 * 60 * 1000,
    });
};

export const usePokemonCardsByName = (searchQuery = '', searchParams = {}) => {
    return useQuery({
        queryKey: ['pokemon-cards-by-name', searchQuery, searchParams],
        queryFn: () => {
            return pokemonApi.getCardsByName(searchQuery, searchParams);
            },
        staleTime: 5 * 60 * 1000,
        enabled: false,
    });
};
