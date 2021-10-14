import './HomeGraphCard.scss';

import {
    HorizontalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot
} from 'react-vis';

const BarSeries = HorizontalBarSeries

function HomeGraphCard() {
    return (
        <div className="card">
            <div className="card-body">
                <XYPlot width={300} height={100} stackBy="x">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <BarSeries data={[{ y: 1, x: 5 }]} color="green" />
                    <BarSeries data={[{ y: 1, x: 2 }]} color="purple" />
                    <BarSeries data={[{ y: 1, x: 7 }]} color="orange" />
                    <BarSeries data={[{ y: 1, x: 9 }]} color="red" />
                </XYPlot>
            </div>
            <p>More Info</p>
        </div>
    )
}

export default HomeGraphCard
