import {
    HorizontalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot
} from 'react-vis';

import statuscolors from "../css/StatusCollors.scss";

function GetCollor(status){
    switch(status){
        case 'on':
            return(statuscolors.on)
        case 'off':
            return(statuscolors.off)
        case 'requiresmaintance':
            return(statuscolors.requiresmaintance)
        default:
            return(statuscolors.undefined)        
    }
}

function BarItem({statusarray}) {
    if(statusarray.length >= 1){
        return (
            <XYPlot width={300} height={100} stackBy="x">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                {statusarray.map((item) => (
                    <HorizontalBarSeries data={[{ y: 1, x: item.duration }]} color = {String(GetCollor(item.description))}/>
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
                <HorizontalBarSeries data = {[{y: 1, x: 86400}]} color = {`${GetCollor()}`}/>
            </XYPlot>
        )
    }
}

export default BarItem
