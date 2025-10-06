function CardDetails({card, onClose}) {
    if(!card) return null;
    const imageUrl = `${card.image}/high.jpg`;

    return (
        <div className="card-details-container">
            <div className="top-info">
                <button className="close-button" onClick={onClose}>x</button>
                <p>{card.name}</p>
            </div>
            <div className="card-content">
                <img className="card-image" src={imageUrl} alt={card.name} />
            </div>
            <div className="card-info">
                <div className="card-details">
                    <p>{card.category} • {card.types}</p>
                    <p>{card.stage} • {card.evolveFrom} • {card.hp}</p>
                </div>
                <div className="attacks-abilities">
                    <p>Ability: {card.abilities}</p>

                </div>
                {/*<div className="weakness-retreat-cost">*/}
                {/*    <p>Weakness: {card.weaknesses.type} {card.weaknesses.value}</p>*/}
                {/*    <p>Retreat: {card.retreat}</p>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default CardDetails;