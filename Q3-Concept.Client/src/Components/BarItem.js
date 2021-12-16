
import { Translate } from '@material-ui/icons';
import {
    HorizontalBarSeries,
    XAxis,
    XYPlot,
    FlexibleXYPlot,
    HorizontalRectSeries,
    YAxis
} from 'react-vis';

import '../css/Baritem.scss'

let intervalCount = 1

const graphWidth = 300
let tickAmount = 2

const tickspace = [
]



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
    let Hour = date.getHours();
    let Minute = date.getMinutes();

    if (Hour < 10) {
        Hour = '0' + Hour;
    }
    if (Minute < 10) {
        Minute = '0' + Minute;
    }
    
    return Hour + ":" + Minute;
}

function CalcTimeIntervals(statusarray) {
    if(statusarray.length >= 1){
        intervalCount = 1
        tickAmount = 2 
        const startTime = new Date(statusarray[0].startTime);
        const endTime = new Date(statusarray[statusarray.length - 1].end__Time);
        const difference = endTime - startTime;
    
        //first date
        let DateArray = [DateFormat(startTime)];
    
        //intervals
        intervalCount = statusarray.length - 2;
        for (let i = 1; i <= intervalCount; i++) {
            var interval = difference / intervalCount;
            DateArray.push(DateFormat(new Date(startTime.getTime() + interval * i)));
        }
        //final date
        DateArray.push(DateFormat(endTime))
        tickAmount = DateArray.length
        return DateArray;
    }

    return
}

function calcTickSpacing(){
    let space = 0

    const sa = (graphWidth / tickAmount)
    const ts = Math.round(sa / 2)

    tickspace.push(`translate(${space}px, 10px)`)
    for(let i = 0; i < tickAmount; i++ ){
        space += ts-1
        tickspace.push(`translate(${space}px, 10px)`)
    }
    return
}

function GetTitle(statusarray){
    if(statusarray.length >= 1){
        const startTime = new Date(statusarray[0].startTime);
        
        const formatedstart = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`

        const endTime = new Date(statusarray[statusarray.length - 1].end__Time);

        const formatedend = `${endTime.getDate()}/${endTime.getMonth() + 1}/${endTime.getFullYear()}`

        return(`${formatedstart} - ${formatedend}`)
    }
    return("")
}

function BarItem({ statusarray }) {

    let timeIntervals = CalcTimeIntervals(statusarray);
    let x = 0;

    let nextspace = -1

    let nextkey = 0

    const Values = [
    ]

    function getNextSpace(){
        return tickspace[x]
    }

    function tickFormatter() {
        var y = timeIntervals[x]
        let transform = tickspace[x]
        x = x + 1;
        return <text position transform = {transform}>{y}</text>;
    };

    function getposition(){
        nextkey += 1
        return nextkey
    }

    function getXValues(){
        let nextX = 0

        function processitem(item){
            if(nextX === 0){
                nextX = item.startTime
            }
            Values.push({data: [{ x: item.duration, y: 0}], color: GetCollor(item.description)})
            nextX = item.startTime
        }
        
        statusarray.map((item) => (
            processitem(item)
        ))
        console.log(Values)
        return
    }


    calcTickSpacing()
    getXValues()

    return (
        <div>
            <XYPlot width = {graphWidth} height = {100} stackBy="x">
                <XAxis tickLabelAngle = {-90} style =
                {
                    {
                        ticks:{
                            textAnchor: 'start',
                            fontSize: 20,
                        },
                    }

                }/>
                {Values.map((item) => (
                    <HorizontalBarSeries key = {getposition} data = {item.data} stroke = 'black' color = {item.color}/>
                ))}
            </XYPlot>
            <div className = "GraphTitle">{GetTitle(statusarray)}</div>
        </div>
    )
}

export default BarItem
