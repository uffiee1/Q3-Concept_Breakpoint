import './HomeGraphCard.scss'

import HomeGraphCard from "./HomeGraphCard"

function GraphCards({ Cards }) {
    return (
        <div className="row">
            {Cards.map((Card) => (
                <div className="column">
                    <HomeGraphCard key={Card.id} />
                </div>
            ))}
        </div>
    )
}

export default GraphCards
