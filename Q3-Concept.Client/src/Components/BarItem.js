import {
    HorizontalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot
} from 'react-vis';

function GetCollor(status) {
    switch (status) {
        case 'on':
            return ('green')
        case 'off':
            return ('red')
        case 'requiresmaintance':
            return ('orange')
        default:
            return ('grey')
    }
    //if you change the colors make sure to change them in statuscollors.scss as well
}


function BarItem({ statusarray }) {
    var s = [0, 4, 8, 12, 16, 20, 24].reverse();
    var x = 0;

    const tickFormatter = d => {
        var y = s[x]
        x = x + 1;
        return y;
    };

    return (
        <XYPlot class="Bar" width={276} height={100} stackBy="x">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickTotal={[7]} tickFormat={tickFormatter} xDomain={[0, 30]} />
            {statusarray.map((item) => (
                <HorizontalBarSeries data={[{ y: 1, x: item.duration }]} stroke='black' color={GetCollor(item.description)} />
            ))}
        </XYPlot>
    )
}

export default BarItem
