import {useEffect, useState} from "react";
import { FaTrash } from "react-icons/fa";
import "../styles/cards-list.css";
import {useBeforeUnload} from "react-router-dom";
import {usePokemonCardbyId} from "../hooks/usePokemonAPI.js";
import CardDetails from "./CardDetails.jsx";

const MAX_DUPLICATES_PTCG = 4;
const MAX_DECK_SIZE_PTCG = 60;
const MAX_DUPLICATES_PTCGP = 2;
const MAX_DECK_SIZE_PTCGP = 20;

function CardsList({selected, addCard}) {
    const [deckCards, setDeckCards] = useState([]);
    const [isDirty, setIsDirty] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const { data: cardDetails, isLoading: isLoadingDetails, error: errorDetails, refetch: refetchCardById } = usePokemonCardbyId();

    const getCardDetails = (id) => {
        refetchCardById(id);
    };

    useEffect(() => {
        if (cardDetails) {
            setSelectedCard(cardDetails);
            console.log("Selected Card:", cardDetails);
        }
    }, [cardDetails]);

    const emptyDeck = () => {
        setDeckCards([]);
        setIsDirty(false);
    };

    const getDeckSize = (cards) => cards.reduce((sum, c) => sum + c.count, 0);

    const handleCardDrop = (e) => {
        e.preventDefault();
        const cardData = JSON.parse(e.dataTransfer.getData("application/json"));
        addCardToDeck(cardData)
    };

    const addCardToDeck = (cardData) => {
        setIsDirty(true);
        setDeckCards((prev) => {
            const existing = prev.find((card) => card.name === cardData.name);
            if(selected === "ptcg") {
                return handlePTCGCount(existing, prev, cardData);
            } else if(selected === "ptcgp") {
                return handlePTCGPCount(existing, prev, cardData);
            } else {
                return [...prev, { ...cardData, count: 1 }];
            }
        });
    };

    const removeCardFromDeck = (cardId) => {
        setDeckCards((prev) =>
            prev.map((c) =>
                c.id === cardId ? { ...c, count: c.count - 1 } : c)
                .filter((c) => c.count > 0)
        );
    }

    const handlePTCGCount = (existing, prev, cardData) => {
        const total = getDeckSize(prev);
        if (total >= MAX_DECK_SIZE_PTCG) return prev;

        const sameNameCount = prev.filter(c => c.name === cardData.name).reduce((sum, c) => sum + c.count, 0);

        if (sameNameCount >= MAX_DUPLICATES_PTCG) return prev;

        const exact = prev.find(c => c.id === cardData.id);
        if (exact) {
            return prev.map(c =>
                c.id === cardData.id ? { ...c, count: c.count + 1 } : c
            );
        } else {
            return [...prev, { ...cardData, count: 1 }];
        }
    };

    const handlePTCGPCount = (existing, prev, cardData) => {
        const total = getDeckSize(prev);
        if (total >= MAX_DECK_SIZE_PTCGP) return prev;

        const sameNameCount = prev.filter(c => c.name === cardData.name).reduce((sum, c) => sum + c.count, 0);

        if (sameNameCount >= MAX_DUPLICATES_PTCGP) return prev;

        const exact = prev.find(c => c.id === cardData.id);
        if (exact) {
            return prev.map(c =>
                c.id === cardData.id ? { ...c, count: c.count + 1 } : c
            );
        } else {
            return [...prev, { ...cardData, count: 1 }];
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleCardRemovalDragEnd = (cardId, e) => {
        const dropOutside = !document
            .elementFromPoint(e.clientX, e.clientY)
            ?.closest(".layout-card-list");

        if (dropOutside) {
            removeCardFromDeck(cardId);
        }
    };

    useBeforeUnload(
        isDirty ? (event) => {
            event.preventDefault();
            event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        } : undefined
    );

    useEffect(() => {
        if (isDirty) {
            const confirmLeave = window.confirm(
                "Changes that you made may not be saved. Continue?"
            );
            if (!confirmLeave) return;
        }
        emptyDeck();
    }, [selected]);

    useEffect(() => {
        getDeckSize(deckCards) === 0 ? setIsDirty(false) : setIsDirty(true);
    }, [deckCards]);

    useEffect(() => {
        const listener = (e) => addCardToDeck(e.card);
        window.addEventListener("add-card", listener);
        return () => window.removeEventListener("add-card", listener);
    }, [selected]);

    return (
            <div className="layout-card-list" onDrop={handleCardDrop} onDragOver={handleDragOver}>
                <div id="deck-size">
                    <div>Deck</div>
                    <div id="deck-handling">
                        <div>{getDeckSize(deckCards)} / {selected === "ptcg" ? MAX_DECK_SIZE_PTCG : MAX_DECK_SIZE_PTCGP}</div>
                        <FaTrash onClick={emptyDeck} cursor="pointer" />
                    </div>
                </div>
                {deckCards.map((card) => (
                    <div key={card.name} className="card-wrapper">
                        <img
                            key={card.id}
                            src={`${card.image}/low.png`}
                            alt={card.name}
                            className="card-image"
                            // style={{ transform: "none", transition: "none" }}
                            draggable={true}
                            onDragEnd={(e) => handleCardRemovalDragEnd(card.id, e)}
                            onClick={() => getCardDetails(card.id)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                removeCardFromDeck(card.id);
                            }}
                        />

                        <div className="card-counter">
                            <button onClick={() => removeCardFromDeck(card.id)}>-</button>
                            <span>{card.count}</span>
                            <button onClick={() => addCardToDeck(card)}>+</button>
                        </div>

                    </div>
                ))}

                <CardDetails card={selectedCard} onClose={() => setSelectedCard(null)} selected={selected} />
            </div>
    );
}

export default CardsList;
