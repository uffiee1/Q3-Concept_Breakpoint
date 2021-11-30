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



function DateFormat(date, DateTrue = true) {
    let Date = date.getDate();
    let Hour = date.getHours();
    let Minute = date.getMinutes();

    if (Date < 10) {
        date = '0' + Date;
    }
    if (Hour < 10) {
        Hour = '0' + Hour;
    }
    if (Minute < 10) {
        Minute = '0' + Minute;
    }
    if (DateTrue) {
        return Date + "-" + Hour + ":" + Minute;
    }
    else {
        return Hour + ":" + Minute;
    }
}

function CalcTimeIntervals(statusarray) {
    const startTime = new Date(statusarray[0].startTime);
    const endTime = new Date(statusarray[statusarray.length - 1].end__Time);
    const difference = endTime - startTime;

    //first date
    let DateArray = [DateFormat(startTime)];

    //intervals
    const intervalCount = 2;
    for (let i = 1; i <= intervalCount; i++) {
        var interval = difference / intervalCount;
        DateArray.push(DateFormat(new Date(startTime.getTime() + interval * i), false));
    }

    //final date
    DateArray.push(DateFormat(endTime))
    return DateArray;
}

function BarItem({ statusarray }) {
    let timeIntervals = []

    if(statusarray.lenght >= 1){
        timeIntervals = CalcTimeIntervals(statusarray)
    }

    let x = 0;
    const tickFormatter = d => {
        var y = 0
        if(timeIntervals.lenght >= 1 ){
            y = timeIntervals[x]
        }
        x = x + 1;
        return y;
    };

    return (
        <XYPlot className="Bar" width={300} height={100} stackBy="x">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickFormat={tickFormatter} xType='time' />
                {statusarray.length >= 1 ? statusarray.map((item) => (
                    	<HorizontalBarSeries data={[{ y: 1, x: item.duration }]} stroke='black' color={GetCollor(item.description)} />
                )): null}
        </XYPlot>
    )
}

export default BarItem
