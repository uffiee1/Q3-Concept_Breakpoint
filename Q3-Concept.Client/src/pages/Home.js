import './Home.css'

import GraphCardList from '../Components/GraphCardList';
import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from "axios";
import { Variables } from '../Components/ApiUrls';

function Home() {
    const [cards] = useState([

        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        }
    ]);

    const [productionlines, setproductionlines] = useState([])

    async function getAllLines(){
        try {
            const apirequest = await axios.get(Variables.GetAllProductionLinesUrl);
            return apirequest.data;
          } catch (error) {
            console.error(error);
          }
    }

    async function getLines(){
        setproductionlines(await getAllLines());
    }

    useEffect(() =>{
        getLines();
    })

    return (
    <div>
        <Sidebar productionlinearray = {productionlines}/>
        <div className = 'container'>
            <GraphCardList Cards={cards} />
        </div>
    </div>

    )
}

export default Home