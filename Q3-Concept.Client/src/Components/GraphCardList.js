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

        console.log("toggled")
    }

    return (
        <div class = 'table'>
            {Cards.map((Card) => (
                    <div className="tableItem" onClick={() => showPopup(Card)}>
                        <HomeGraphCard key={Card.id} productionline={Card} />
                    </div>
            ))}
            {showDetailPopUp ? <ProductionLineDetails togggle={() => ToggelDetailPopUp()} productionline={productionline} /> : null}
        </div>
    )
}

export default GraphCardList
