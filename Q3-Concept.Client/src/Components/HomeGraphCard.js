import '../css/HomeGraphCard.scss';

import ActivityGraph from './ActivityGraph';

function HomeGraphCard({ productionline }) {
    let currentStatusString = "undefined"

    if (productionline.components.length <= 1) {
        currentStatusString = "undefined";

    } else if (productionline.statuses.length >= 1) {
        currentStatusString = productionline.statuses[productionline.statuses.length - 1].description
    }
    else {
        currentStatusString = "off";
    }

    return (
        <div className={`card ${currentStatusString}`}>
            <div className="card-body">
                <p>{productionline.name}</p>
                <ActivityGraph statusarray={productionline.statuses} />
            </div>
        </div>
    )
}

export default HomeGraphCard