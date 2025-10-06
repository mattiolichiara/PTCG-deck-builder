// import TCGdex, {Query} from '@tcgdex/sdk'
import TCGdex from '@tcgdex/sdk';
const tcgdex = new TCGdex('en');

export const ptcgdexApi = {
    getSets: async () => {
        try {
            return await tcgdex.set.list();
        } catch (e) {
            console.error("[SETS] Fetching Error", e);
            throw new Error('Failed to fetch set.');
        }
    },

    getAllCards: async () => {
        try {
            return await tcgdex.card.list();
        } catch (e) {
            console.error("[ALL CARDS] Fetching Error", e);
            throw new Error('Failed to fetch all cards.');
        }
    },

    getCardsByName: async (name, selection) => {
        try {
            if (!name || name.trim() === '') {
                throw new Error('Search query is required')
            }

            console.log("[API] Fetching cards by name");

            const url = `https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(name)}&sort:field=releaseDate&sort:order=ASC`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network Error.');
            const cards = await response.json();
            let PTCGCards = [];

            if(selection === "ptcg") {
                PTCGCards = cards.filter(card =>
                    card.image && !card.image.includes('/tcgp/')
                );
            } else
                if(selection === "ptcgp") {
                PTCGCards = cards.filter(card =>
                    card.image && card.image.includes('/tcgp/')
                );
            }


            if (!PTCGCards || PTCGCards.length === 0) {
                throw new Error('No cards found')
            }

            return PTCGCards;
        } catch (e) {
            console.error("[CARDS BY NAME] Fetching Error", e);
            throw new Error('Failed to fetch cards by name.');
        }
    },

    getCardById: async (id) => {
        try {
            if (!id || id.trim() === '') {
                throw new Error('ID is required')
            }

            console.log("[API] Fetching cards by id");

            const url = `https://api.tcgdex.net/v2/en/cards/${id}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network Error.');

            return await response.json();
        } catch (e) {
            console.error("[CARD BY ID] Fetching Error", e);
            throw new Error('Failed to fetch card by ID.');
        }
    }
};