/* eslint-disable react-hooks/exhaustive-deps */

import '../css/ActivityGraph.scss'

import React, { useEffect, useRef, useState } from "react";
import { axisBottom, axisLeft, scaleBand, scaleLinear, scalePoint, select, stack } from 'd3';

import { event } from "jquery";

function ActivityGraph({ statusarray }) {
    const [ran] = useState(false)

    const sgvRef = useRef()
    const wrapperRef = useRef()
    const Width = 360;
    const Height = 75;

    let keys = []
    let colors = []

    function GetTitle(statusarray) {
        if (statusarray.length >= 1) {
            const startTime = new Date(statusarray[0].startTime);

            const formatedstart = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`

            const endTime = new Date(statusarray[statusarray.length - 1].end__Time);

            const formatedend = `${endTime.getDate()}/${endTime.getMonth() + 1}/${endTime.getFullYear()}`

            return (`${formatedstart} - ${formatedend}`)
        }
        return ("No data")
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

    function GetStack() {
        if (statusarray.length >= 1) {
            const result = []
            const entries = []
            const keyslist = []
            const colorlist = []

            entries.push(["y", 1])
            for (var i = 0; i < statusarray.length; i++) {
                entries.push([`status${i + 1}`, statusarray[i].duration])
                entries.push([`statusdetails${i + 1}`, {
                    duration: statusarray[i].duration,
                    startTime: statusarray[i].startTime,
                    endTime: statusarray[i].end__Time,

                }])
                colorlist.push([`status${i + 1}`, GetCollor(statusarray[i].description)])

                keyslist.push([`status${i + 1}`])
            }
            const obj = Object.fromEntries(entries)
            keys = keyslist
            const obj2 = Object.fromEntries(colorlist)

            result.push(obj)
            colors.push(obj2)

            return result
        }
    }

    function MakeXAxisItems() {
        if (statusarray.length >= 1) {
            let intervalCount = 5
            const startTime = new Date(statusarray[0].startTime);
            const endTime = new Date(statusarray[statusarray.length - 1].end__Time);
            const difference = endTime - startTime;

            //first date
            let DateArray = [FormatDate(startTime)];

            //intervals
            for (let i = 1; i <= intervalCount; i++) {
                var interval = difference / intervalCount;
                DateArray.push(FormatDate(new Date(startTime.getTime() + interval * i)));
            }
            //final date
            DateArray.push(FormatDate(endTime))

            return DateArray;
        }
    }

    function showTooltip(evt, text) {
        let tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = text;
        tooltip.style.display = "block";
        tooltip.style.left = evt.pageX + 10 + 'px';
        tooltip.style.top = evt.pageY + 10 + 'px';

    }

    function hideTooltip() {
        var tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
    }

    useEffect(() => {
        if (ran === false && statusarray.length >= 1) {
            const data = GetStack();

            const svg = select(sgvRef.current);

            const stackgen = stack().keys(keys)
            const layers = stackgen(data)
            // console.log(stackgen(data))

            //scales
            const yScale = scaleBand()
                .domain([1])
                .range([0, Height - 25])

            const xscale = scaleLinear()
                .domain([0, 86400]) //seconds in a day
                .range([0 + 30, Width - 30])


            const xscale2 = scalePoint()
                .domain(MakeXAxisItems())
                .range([0 + 30, Width - 30])

            //rendering
            svg.selectAll(".layer")
                .data(layers)
                .join("g")
                .attr("class", "layer")
                .attr("fill", layer => {

                    var colorobj = colors[0]
                    return colorobj[layer.key]
                })
                .selectAll('rect')
                .data(layer => layer)
                .join("rect")
                .attr("x", sequence => xscale(sequence[0]))
                .attr("width", sequence => xscale(sequence[1]) - xscale(sequence[0]))
                .attr("y", sequence => {
                    return yScale(1)
                })
                .attr("height", yScale.bandwidth)
                .attr("stroke", "black")
                .attr("onmousemove", showTooltip(event, 'Hello world'))
                .attr("onmouseout", hideTooltip())




            //axes
            const xAxis = axisBottom(xscale);
            const yAxis = axisLeft(yScale)
            const xAxis2 = axisBottom(xscale2)

            svg.select(".XAxis")
                .attr("transform", `translate(0, ${Height - 25})`)
                .attr("display", "none")
                .call(xAxis)

            svg.select(".XAxis2")
                .attr("transform", `translate(0, ${Height - 25})`)
                .call(xAxis2)

            svg.select(".YAxis")
                .attr("transform", `translate(30, 0)`)
                .attr("display", "none")
                .call(yAxis)
        }
    }, [GetStack, MakeXAxisItems, colors, keys, ran, statusarray.length])

    return (
        <React.Fragment>
            <div id="tooltip" display="none"></div>
            <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
                <svg ref={sgvRef} width={Width} height={Height}>
                    <g className='XAxis' />
                    <g className='XAxis2' />
                    <g className='YAxis' />
                </svg>
            </div>
            <div className='GraphTitle'>{GetTitle(statusarray)}</div>
        </React.Fragment>
    )
}

export default ActivityGraph
