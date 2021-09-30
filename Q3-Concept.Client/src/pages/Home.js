import React from 'react'
import './Home.css'
import {
    XYPlot,
    XAxis,
    HorizontalGridLines,
    VerticalGridLines,
    HorizontalBarSeries 
} from 'react-vis';

function Home() {

    const BarSeries = HorizontalBarSeries


    return (
        <div className='asd' >

            <div>
                <XYPlot width={300} height={300} stackBy="x">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <BarSeries data={[{ y: 1, x: 5 }]} color="green" />
                    <BarSeries data={[{ y: 1, x: 2 }]} color="purple" />
                    <BarSeries data={[{ y: 1, x: 7 }]} color="orange" />
                    <BarSeries data={[{ y: 1, x: 9 }]} color="red" />
                </XYPlot>
            </div>

            <div>
                <div>
                    <XYPlot width={300} height={300} stackBy="x">
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <BarSeries data={[{ y: 1, x: 5 }]} color="green" />
                        <BarSeries data={[{ y: 1, x: 2 }]} color="purple" />
                        <BarSeries data={[{ y: 1, x: 7 }]} color="orange" />
                        <BarSeries data={[{ y: 1, x: 9 }]} color="red" />
                    </XYPlot>
                </div>

            </div>


            {/* 
<XYPlot width={300} height={300} stackBy="x">
<HorizontalGridLines style={{stroke: '#B7E9ED'}} />
         
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
            <HorizontalBarSeries data={[
            {x: 1, y: 1},
            {x: 2, y: 2}
        
        ]}
        />
        </XYPlot> */}


            {/*     
<XYPlot width={300} height={300} color="red">
      <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
      
      <XAxis
        title="X Axis"
       
      />
      <YAxis title="Y Axis" />
      <LineSeries
        className="first-series"
        data={[
            {x: 1, y: 12}, 
            {x: 2, y: 5}, 
            {x: 3, y: 15}, 
            {x: 4, y: 12}]}
        style={{
          strokeLinejoin: 'round',
          strokeWidth: 4,
          fill: 'none'
        }}
      />
      
    </XYPlot>
     */}


        </div>


    )


}

export default Home