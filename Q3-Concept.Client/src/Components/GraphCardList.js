import '../css/HomeGraphCard.scss'

import HomeGraphCard from "./HomeGraphCard"
import ProductionLineDetails from './ProductionLineDetails'
import { useState } from 'react'

function GraphCardList({ Cards }) {
    const [showDetailPopUp, setShowDetailPopUp] = useState(false);
    const [productionline, setProductionLine] = useState([]);

    function showPopup(line) {
        setProductionLine(line)
        ToggelDetailPopUp()
    }

    function ToggelDetailPopUp() {
        setShowDetailPopUp(!showDetailPopUp);
    }

    return (
        <div className = 'ProductionLineList'>
            {Cards.map((Card) => (
                    <div key={Card.id} className="ProductionLineListItem" onClick={() => showPopup(Card)}>
                        <HomeGraphCard productionline={Card} />
                    </div>
            ))}
            {showDetailPopUp ? <ProductionLineDetails toggle={() => ToggelDetailPopUp()} productionline={productionline} /> : null}
        </div>
    )
}

export default GraphCardList
