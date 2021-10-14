import './Home.css'

import GraphCards from '../Components/GraphCards';
import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar'
import Axios from 'Axios'

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

    const [productionline, setproductionlines] = useState([])

    async function getAllLines(){
        try {
            const apirequest = await axios.get('/ProductionLine/ProductionLineDetails');
            console.log(response);
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() =>{
        getAllLines();
    })

    return (
    <div>
        <Sidebar />
        <div className = 'container'>
            <GraphCards Cards={cards} />
        </div>
    </div>

    )
}

export default Home