import './HomeGraphCard.css'

import HomeGraphCard from "./HomeGraphCard"

function GraphCards({ Cards }) {
    return (
        <div className="row">
            {Cards.map((Card) => (
                <div className="column">
                    <HomeGraphCard />
                </div>
            ))}
        </div>
    )
}

export default GraphCards
