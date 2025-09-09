import "../styles/card-selector.css";
import {usePokemonCardsbyName} from "../hooks/usePokemonAPI.js";
import {useState} from "react";
import ErrorIcon from "../assets/alert-cirlcle-error-svgrepo-com.svg?react";


function CardSelector() {
    const [searchedName, setSearchedName] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const { data, isLoading, error, refetch } = usePokemonCardsbyName(searchedName);

    const handleSearch = () => {
        if (searchedName.trim()) {
            setHasSearched(true);
            refetch();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="layout-card-selector">

            <div className="search-bar">
                <input type="search" id="card-search" onKeyPress={handleKeyPress} onChange={(e) => setSearchedName(e.target.value)}/>
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
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CardSelector;
