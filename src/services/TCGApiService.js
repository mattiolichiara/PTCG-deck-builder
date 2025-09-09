import TCGdex, {Query} from '@tcgdex/sdk'

const tcgdex = new TCGdex('en');

const set = await tcgdex.card.list(new Query().equal('name', ));

export const tcgdexApi = {
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

    getCardsByName: async (name) => {
        try {
            if (!name || name.trim() === '') {
                throw new Error('Search query is required')
            }

            const cards = await tcgdex.card.list(
                new Query().contains('name', name),
            );

            const tcgLiveCards = cards.filter(card =>
                card.image && !card.image.includes('/tcgp/')
            );

            if (!tcgLiveCards || tcgLiveCards.length === 0) {
                throw new Error('No cards found')
            }

            return tcgLiveCards;
        } catch (e) {
            console.error("[CARDS BY NAME] Fetching Error", e);
            throw new Error('Failed to fetch cards by name.');
        }
    }
};