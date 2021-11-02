import {
    HorizontalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot
} from 'react-vis';

function GetCollor(status){
    switch(status){
        case 'on':
            return('green')
        case 'off':
            return('red')
        case 'requiresmaintance':
            return('orange')
        default:
            return('grey')        
    }
    //if you change the colors make sure to change them in statuscollors.scss as well
}

function BarItem({statusarray}) {
    if(statusarray.length >= 1){
        return (
            <XYPlot width={300} height={100} stackBy="x">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                {statusarray.map((item) => (
                    <HorizontalBarSeries data={[{ y: 1, x: item.duration }]} stroke = 'black' color = {GetCollor(item.description)}/>
                ))}
            </XYPlot>
        )
    }

    else{
        return(
            <XYPlot width={300} height={100} stackBy="x">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <HorizontalBarSeries data = {[{y: 1, x: 86400}]} stroke = 'black' color = {GetCollor()}/>
            </XYPlot>
        )
    }
}

export default BarItem
