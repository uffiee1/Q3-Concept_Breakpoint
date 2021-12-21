import React, { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';
import '../css/ActivityGraph.scss'

function temp() {
    const [ran, setRan] = useState(false)

    const canvas = useRef(null)
 
     const GraphWidth  = 300;
     const GraphHeight = 50;
 
     let GraphItems = []
     let XAxisItems = []
     let XAxisValues = []
 
     let TotalSeconds = 0
     const TotalX = 300
 
     const XValueOfSecond = TotalX/TotalSeconds
     const WidthOfSecond = GraphWidth/TotalSeconds
     let LastUsedXValue = 0
 
 
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
 
     function FormatDate(date) {
         let Hour = date.getHours();
         let Minute = date.getMinutes();
 
         if (Hour < 10) {
             Hour = '0' + Hour;
         }
         if (Minute < 10) {
             Minute = '0' + Minute;
         }
         
         return `${Hour}:${Minute}`;
     }
     
     function getTotalSeconds(){
         if(TotalSeconds !== 0){
             let result = 0 
             statusarray.map((item) => (
                 result += item.duration
             ))
             TotalSeconds = result
             console.log(`total seconds: ${TotalSeconds}`)
         }
 
         return TotalSeconds
     }
 
     function ProcessStatus(Status){
         MakeBar(Status);
     }
 
     function MakeBar(Status){
         let XofStart = LastUsedXValue
         const XofEnd = XofStart + XValueOfSecond * Status.duration
         let BarWidth = WidthOfSecond * Status.duration
 
         GraphItems.push({X: XofStart, Y: 1, Width: BarWidth, Height: GraphHeight, Description: Status.description})
         LastUsedXValue = XofEnd
     }
 
     function MakeXAxisItems(){
         if(statusarray.length >= 1){
             let intervalCount = 1
             const startTime = new Date(statusarray[0].startTime);
             const endTime = new Date(statusarray[statusarray.length - 1].end__Time);
             const difference = endTime - startTime;
         
             //first date
             let DateArray = [FormatDate(startTime)];
         
             //intervals
             intervalCount = statusarray.length - 2;
             for (let i = 1; i <= intervalCount; i++) {
                 var interval = difference / intervalCount;
                 DateArray.push(FormatDate(new Date(startTime.getTime() + interval * i)));
             }
             //final date
             DateArray.push(FormatDate(endTime))
 
             console.log(`Xaxis: ${DateArray}`)
 
             return DateArray;
         }
     
         return
     }
 
 
     function ProcessStatuses(){
         const svg = d3.select(canvas.current)
 
         addAxes(svg)
 
         getTotalSeconds()
         GraphItems = []
 
         statusarray.map((status) => (
             ProcessStatus(status)
         ));
         setRan(true)
         console.log('ran')
     
         return
     }
 
     const addAxes = (Svg) =>{
         MakeXAxisItems()
 
         let xscale =  d3.scaleTime()
             .range([0 , 300])
         
         let xAxis = d3.axisBottom(xscale)
         .tickFormat((d, i) => XAxisItems[i])
 
         
         Svg.append('g')
             .call(xAxis)
             .attr("transform" , `translate(0, 50)`)
     }
 
     function MakeGraph(){
         var graph = d3.select('svg')
                     .attr('height' , GraphHeight)
                     .attr('width' , getTotalSeconds())
         console.log('made')
     }
     useEffect(() => {
         if(ran === false && statusarray.length >= 1){
             MakeGraph()
         }
         return
     },[ran])
 
 
     return (
         <div className = "graphfield">
             <svg></svg>
             <div className = 'GraphTitle'>{GetTitle(statusarray)}</div>
         </div>
     )
}

export default temp
