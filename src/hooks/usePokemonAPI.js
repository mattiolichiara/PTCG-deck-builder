import { ptcgdexApi } from '../services/PTCGApiService.js';
import {useState} from "react";

export const usePokemonCardsbyName = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (name, selected) => {
        if(!name) return;

        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            console.log(`Name: ${name}`);
            const cards = await ptcgdexApi.getCardsByName(name, selected);
            setData(cards);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    const reset = () => setData(null);

    return {data, isLoading, error, refetch: fetchData, reset};
};

export const usePokemonCardbyId = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (id) => {
        if(!id) return;

        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            console.log(`CARD ID: ${id}`);
            const card = await ptcgdexApi.getCardById(id);
            setData(card);
            return card;
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return { data, isLoading, error, refetch: fetchData };
}

export const usePokemonSetById = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (id) => {
        if(!id) return;

        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            console.log(`SET ID: ${id}`);
            const set = await ptcgdexApi.getSetById(id);
            setData(set);
            return set;
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { data, isLoading, error, refetch: fetchData };
}

export const usePokemonAllCards = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            const cards = await ptcgdexApi.getAllCards();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return {data, isLoading, error, refetch: fetchData};
}

export const useSets = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            const sets = await ptcgdexApi.getSets();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return {data, isLoading, error, refetch: fetchData};
}



