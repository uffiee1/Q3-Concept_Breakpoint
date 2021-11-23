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

function DateFormat(date) {
    return date.getDate() + "-" + date.getHours() + ":" + date.getMinutes()
}

function TimeFormat(date) {
    return date.getHours() + ":" + date.getMinutes()
}

function CalcTimeIntervals(statusarray) {
    const startTime = new Date(statusarray[0].startTime);
    const endTime = new Date(statusarray[statusarray.length - 1].end__Time);
    const difference = endTime - startTime;

    //first date
    let s = [DateFormat(startTime)];
    //intervals
    const intervalCount = 2;
    for (let i = 1; i <= intervalCount; i++) {
        var interval = difference / intervalCount;
        s.push(TimeFormat(new Date(startTime.getTime() + interval * i)));
    }
    //final date
    s.push(DateFormat(endTime))
    return s;
}

function BarItem({ statusarray }) {



    let timeIntervals = CalcTimeIntervals(statusarray);

    let x = 0;

    const tickFormatter = d => {
        var y = timeIntervals[x]
        x = x + 1;
        return y;
    };

    return (
        <XYPlot class="Bar" width={300} height={100} stackBy="x">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickFormat={tickFormatter} xType='time' />
            {statusarray.map((item) => (
                <HorizontalBarSeries data={[{ y: 1, x: item.duration }]} stroke='black' color={GetCollor(item.description)} />
            ))}
        </XYPlot>
    )
}

export default BarItem
