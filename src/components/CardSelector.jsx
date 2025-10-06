import "../styles/card-selector.css";
import {usePokemonCardbyId, usePokemonCardsbyName} from "../hooks/usePokemonAPI.js";
import {useState, useEffect} from "react";
import CardDetails from "./CardDetails.jsx";
import ErrorIcon from "../assets/alert-cirlcle-error-svgrepo-com.svg?react";


function CardSelector({selected}) {
    const [searchedName, setSearchedName] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const { data, isLoading, error, refetch: refetchCardsbyName, reset } = usePokemonCardsbyName();
    const { data: cardDetails, isLoading: isLoadingDetails, error: errorDetails, refetch: refetchCardById } = usePokemonCardbyId();

    const getCardDetails = async (card) => {
        setSelectedCard(card);
        console.log(`Selected Card: ${card}`);
        refetchCardById(card.id);
    }

    const handleSearch = () => {
        if (searchedName.trim()) {
            setHasSearched(true);
            console.log(`Searched Name: ${searchedName}`);
            refetchCardsbyName(searchedName, selected);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const addCardOnClick = (card) => {
        const dropEvent = new Event("add-card");
        dropEvent.card = card;
        window.dispatchEvent(dropEvent);
    };

    useEffect(() => {
        setSearchedName("");
        setHasSearched(false);
        setSelectedCard(null);
        reset();
    }, [selected]);

    return (
        <div className="layout-card-selector">

            <div className="search-bar">
                <input type="search" id="card-search" value={searchedName} onKeyDown={handleKeyPress} onChange={(e) => setSearchedName(e.target.value)}/>
                <button className="tcgButton" onClick={handleSearch}>Search</button>
            </div>

            {hasSearched && isLoading && (
                <div className="results-loading">
                    <div className="spinner"></div>
                    <p>Loading cards...</p>
                </div>
            )}

            {hasSearched && error && (
                <div className="results-error">
                    <ErrorIcon className="error-icon" />
                    <p>Couldn't find cards</p>
                </div>
            )}

            <div className="cards-container">
                {data?.map((card) => {
                    console.log(card);
                    const imageUrl = `${card.image}/low.png`;

                    return(
                        <img
                        key={card.id}
                        src={imageUrl}
                        alt={card.name}
                        className="card-image"
                        draggable={true}
                        onDragStart={(e) => e.dataTransfer.setData("application/json", JSON.stringify(card))}
                        onClick={() => addCardOnClick(card)}
                        // onClick={() => getCardDetails(card)}
                        />
                    )
                })}
            </div>

            <CardDetails card={selectedCard} onClose={() => setSelectedCard(null)} />
        </div>
    )
}

export default CardSelector;
