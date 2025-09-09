import { tcgdexApi } from '../services/TCGApiService';
import {useState} from "react";

export const usePokemonCardsbyName = (name) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            const cards = await tcgdexApi.getCardsByName(name);
            setData(cards);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return {data, isLoading, error, refetch: fetchData};
};

export const usePokemonAllCards = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            const cards = await tcgdexApi.getAllCards();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return {data, isLoading, error, refetch: fetchData};
}

export const useSets = async () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            const sets = await tcgdexApi.getSets();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return {data, isLoading, error, refetch: fetchData};
}



