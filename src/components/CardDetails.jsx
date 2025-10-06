import "../styles/card-details.css";
import {useEffect, useState} from "react";
import colorless from '../assets/colorless_energy.png';
import psychic from '../assets/psychic_energy.png';
import dark from '../assets/dark_energy.png';
import dragon from '../assets/dragon_energy.png';
import electric from '../assets/electric_energy.png';
import fairy from '../assets/fairy_energy.png';
import fighting from '../assets/fighting_energy.png';
import fire from '../assets/fire_energy.png';
import grass from '../assets/grass_energy.png';
import steel from '../assets/steel_energy.png';
import water from '../assets/water_energy.png';

function CardDetails({card, onClose, selected}) {
    // const [visible, setVisible] = useState(false);
    const [tooltip, setTooltip] = useState({ x: 0, y: 0, text: "" });

    const energyIcons = {
        Colorless: colorless,
        Psychic: psychic,
        Darkness: dark,
        Dragon: dragon,
        Lightning: electric,
        Fairy: fairy,
        Fighting: fighting,
        Fire: fire,
        Grass: grass,
        Steel: steel,
        Water: water,
    };

    if(!card) return null;
    const imageUrl = `${card.image}/high.jpg`;

    // useEffect(() => {
    //     if (card) {
    //         setVisible(true);
    //     }
    // }, [card]);
    //
    // const handleClose = () => {
    //     setVisible(false);
    //     setTimeout(() => onClose(), 300);
    // };

    const handleMouseMove = (e) => {
        const isPokemon = card.category === "Pokemon";
        const isTCG = selected === "ptcg";

        const renderTypes = card.types?.length
            ? <div style={{ display: "inline-flex", gap: "4px" }}>
                {card.types}
                {card.types.map((t, i) => (
                    <img key={i} src={energyIcons[t]} alt={t} style={{ width: 16, height: 16 }} />
                ))}
            </div>
            : <span>N/A</span>;

        const renderWeaknesses = card.weaknesses?.length
            ? <div style={{ display: "inline-flex", gap: "8px" }}>
                {card.weaknesses.map((w, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        {energyIcons[w.type] && <img src={energyIcons[w.type]} alt={w.type} style={{ width: 16, height: 16 }} />}
                        <span>{w.value ?? "N/A"}</span>
                    </div>
                ))}
            </div>
            : <span>N/A</span>;

        const renderAttacks = card.attacks?.length
            ? card.attacks.map((a, i) => (
                <div key={i} style={{ marginBottom: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "2px" }}>
                        {a.cost?.map((c, j) => (
                            <img key={j} src={energyIcons[c]} alt={c} style={{ width: 14, height: 14, marginRight: 2 }} />
                        )) ?? "N/A"}
                        &nbsp;{a.name ?? "N/A"} {a.damage ?? "N/A"}
                    </div>

                    <div><br/><i>{a.effect ?? ""}</i></div> <br/>
                </div>
            ))
            : <div>N/A</div>;

        setTooltip({
            x: e.clientX + 15,
            y: e.clientY + 15,
            jsx: (
                <div>
                    <div><strong>Name:</strong> {card.name ?? "N/A"}</div><br/>
                    <div><strong>Category:</strong> {card.category ?? "N/A"}</div><br/>
                    <div><strong>Expansion:</strong> {card.set?.name ?? "N/A"}</div><br/>
                    <div><strong>Rarity:</strong> {card.rarity ?? "N/A"}</div><br/>
                    <div><strong>Illustrator:</strong> {card.illustrator ?? "N/A"}</div><br/><br/>
                    {isPokemon && (
                        <>
                            <div><strong>HP:</strong> {card.hp ?? "N/A"}</div><br/>
                            <div><strong>Type:</strong> {renderTypes}</div><br/>
                            <div><strong>Attacks:</strong><br/><br/> {renderAttacks}</div>
                            <div><strong>Weakness:</strong> {renderWeaknesses}</div><br/>
                            <div><strong>Evolves From:</strong> {card.evolveFrom ?? "N/A"}</div><br/>
                            <div><strong>Stage:</strong> {card.stage ?? "N/A"}</div><br/>
                            <div><strong>Retreat Cost:</strong> {card.retreat ?? "N/A"}</div><br/><br/>
                        </>
                    )}
                    {isTCG && (
                        <>
                            <div><strong>Legality • Standard:</strong> {card.legal?.standard != null ? (card.legal.standard ? "Yes" : "No") : "N/A"}</div><br/>
                            <div><strong>Legality • Expanded:</strong> {card.legal?.expanded != null ? (card.legal.expanded ? "Yes" : "No") : "N/A"}</div><br/>
                            <div><strong>Regulation Mark:</strong> {card.regulationMark ?? "N/A"}</div><br/>
                        </>
                    )}
                </div>
            )
        });
    };


    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, text: "" });
    };

    return (
        <div className="card-details-container" onClick={onClose}>
                <div className="card-content" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <img className="card-detail-image" src={imageUrl} alt={card.name} />
                    {tooltip.jsx && (
                        <div
                            className="tooltip"
                            style={{ left: tooltip.x, top: tooltip.y }}
                        >
                            {tooltip.jsx}
                        </div>
                    )}
                </div>
        </div>
    )
}

export default CardDetails;