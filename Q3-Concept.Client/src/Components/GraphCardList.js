import '../css/HomeGraphCard.scss'

import HomeGraphCard from "./HomeGraphCard"

function GraphCardList({ Cards }) {
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

export default GraphCardList
