import "../styles/card-selector.css";
import {usePokemonCardsByName} from "../hooks/usePokemonAPI.js";
import {useState} from "react";


function CardSelector() {
    const [searchQuery, setSearchQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const { data, isLoading, error, refetch } = usePokemonCardsByName(searchQuery);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setHasSearched(true);
            refetch();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    console.log(searchQuery);

    return (
        <div className="layout-card-selector">

            <div className="search-bar">
                <input type="search" id="card-search" onKeyPress={handleKeyPress} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button className="tcgButton" onClick={handleSearch}>Search</button>
            </div>

            {hasSearched && isLoading && (
                <div className="results-loading">
                    <div className="spinner"></div>
                    <p>Loading cards...</p>
                </div>
            )}

            <div className="cards-container">
                {data?.data?.map((card) => (
                    <img
                        key={card.id}
                        src={card.images.small}
                        alt={card.name}
                        className="card-image"
                    />
                ))}
            </div>
        </div>
    )
}

export default CardSelector;
