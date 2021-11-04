import '../css/HomeGraphCard.scss'

import HomeGraphCard from "./HomeGraphCard"
import ProductionLineDetails from './ProductionLineDetails'
import { useState } from 'react'

function GraphCardList({ Cards }) {
    const [showDetailPopUp, setShowDetailPopUp] = useState(false);
    const [productionLine, setProductionLine] = useState([]);

    function ToggelDetailPopUp() {

        setShowDetailPopUp(!showDetailPopUp);
    }

    // function ShowCard({ ProductionLine }) {
    //     ProductionLine.statuses.length != 0 ?

    //         <div className="column" onClick={() => ToggelDetailPopUp()}>
    //             <HomeGraphCard key={ProductionLine.id} productionline={ProductionLine} />
    //         </div>
    //         :
    //         null

    // }

    return (
        <div className="row">
            {Cards.map((Card) => (
                Card.statuses.length != 0 ?
                    <div className="column" onClick={() => ToggelDetailPopUp()}>
                        <HomeGraphCard key={Card.id} productionline={Card} />
                    </div>
                    :
                    null
            ))}
            {showDetailPopUp ? <ProductionLineDetails togggle={() => ToggelDetailPopUp()} productionline={productionLine} /> : null}
        </div>
    )

}

export default GraphCardList
