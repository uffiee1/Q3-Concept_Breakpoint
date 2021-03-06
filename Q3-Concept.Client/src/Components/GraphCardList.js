import '../css/HomeGraphCard.scss'

import HomeGraphCard from "./HomeGraphCard"
import ProductionLineDetails from './ProductionLineDetails'
import { useState } from 'react'

function GraphCardList({ Cards }) {
    const [showDetailPopUp, setShowDetailPopUp] = useState(false);
    const [productionline, setProductionLine] = useState([]);

    function showPopup(line) {
        setProductionLine(line)
        ToggleDetailPopUp()
    }

    window.onkeydown = function (event) {
        if (event.keyCode === 27) {
            setShowDetailPopUp(false);
        }
    };

    function ToggleDetailPopUp() {
        setShowDetailPopUp(!showDetailPopUp);
    }

    return (
        <div className='ProductionLineList'>
            {Cards.map((Card) => (
                <div key={Card.id} className="ProductionLineListItem" onClick={() => showPopup(Card)}>
                    <HomeGraphCard productionline={Card} />
                </div>
            ))}
            {showDetailPopUp ?
                <div id="dimScreen" onClick={() => ToggleDetailPopUp()}>
                    <ProductionLineDetails toggle={() => ToggleDetailPopUp()} productionline={productionline} />
                </div>
                : null}
        </div>
    )
}

export default GraphCardList
