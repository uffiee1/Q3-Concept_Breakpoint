import '../css/HomeGraphCard.scss';

import ActivityGraph from './ActivityGraph';

function HomeGraphCard({ productionline }) {
    let currentStatusString = "undefined"

    if (productionline.statuses.length >= 1) {
        currentStatusString = productionline.statuses[productionline.statuses.length - 1].description
    }

    return (
        <div className={`card ${currentStatusString}`}>
            <div className="card-body">
                <p className='ProductionLinetitle'>{productionline.name}</p>
                <ActivityGraph statusarray={productionline.statuses} />
            </div>
        </div>
    )
}

export default HomeGraphCard