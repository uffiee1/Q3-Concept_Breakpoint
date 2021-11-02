import '../css/HomeGraphCard.scss'

import HomeGraphCard from "./HomeGraphCard"
import ProductionLineDetails from './ProductionLineDetails'
import { useState } from 'react'

function GraphCardList({ Cards }) {
    const [showDetailPopUp, setShowDetailPopUp] = useState(false);

    function ToggelDetailPopUp() {
        setShowDetailPopUp(!showDetailPopUp);
        console.log("toggled")
    }

    return (
        <div className="row">
            {Cards.map((Card) => (
                <div className="column" onClick={() => ToggelDetailPopUp()}>
                    <HomeGraphCard key={Card.id} productionline={Card} />
                </div>
            ))}
            {showDetailPopUp ? <ProductionLineDetails togggle={() => ToggelDetailPopUp()} /> : null}
        </div>
    )
}

export default GraphCardList
