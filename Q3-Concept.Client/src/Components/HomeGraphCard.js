import '../css/HomeGraphCard.scss';

import {
    HorizontalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot
} from 'react-vis';

import BarItem from './BarItem';

const BarSeries = HorizontalBarSeries

function HomeGraphCard({productionline}) {
    let currentStatusString = "undefined"

    if(productionline.statuses.length >= 1){
        currentStatusString = productionline.statuses[productionline.statuses.length - 1].description
    }

    return (
        <div class = { `card ${currentStatusString}`}>
            <div className="card-body">
                <p>{productionline.name}</p>
                <BarItem statusarray = {productionline.statuses} />
            </div>
            <p>More Info</p>
        </div>
    )
}

export default HomeGraphCard
