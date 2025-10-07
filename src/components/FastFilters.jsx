import "../styles/fast-filters.css";

function FastFilters({selected}) {

    return (

        <div className="fast-filters">

            <div className="common-fast-filters">
                <button className="fast-filter-button">Pokémon</button>
                <button className="fast-filter-button">Trainer</button>
                <button className="fast-filter-button">Item</button>
                <button className="fast-filter-button">Supporter</button>
                <button className="fast-filter-button">Tool</button>
            </div>

            {selected === "ptcg" && (
                <div className="ptcg-fast-filters">
                    <button className="fast-filter-button">Stadium</button>
                    <button className="fast-filter-button">Energy</button>
                    <button className="fast-filter-button">Standard</button>
                    <button className="fast-filter-button">Expanded</button>
                </div>
            )}

        </div>

    );
}

export default FastFilters;