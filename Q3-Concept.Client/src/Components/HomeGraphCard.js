import '../css/HomeGraphCard.scss';

import BarItem from './BarItem';

// import {
//     HorizontalBarSeries,
//     HorizontalGridLines,
//     VerticalGridLines,
//     XAxis,
//     XYPlot
// } from 'react-vis';


// const BarSeries = HorizontalBarSeries

function HomeGraphCard({ productionline }) {
    let currentStatusString = "undefined"

    if (productionline.statuses.length >= 1) {
        currentStatusString = productionline.statuses[productionline.statuses.length - 1].description
    }

    return (
        <div className={`card ${currentStatusString}`}>
            <div className="card-body">
                <p>{productionline.name}</p>
                <BarItem statusarray={productionline.statuses} />
            </div>
        </div>
    )
}

export default HomeGraphCard
