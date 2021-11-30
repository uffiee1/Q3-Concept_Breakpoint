import './Home.css'

import { useEffect, useState } from 'react';

import GraphCardList from '../Components/GraphCardList';
import Sidebar from '../Components/Sidebar';
import { Variables } from '../Components/ApiUrls';
import axios from "axios";

function Home() {

    const [productionlines, setproductionlines] = useState([])

    async function getAllLines() {
        try {
            const apirequest = await axios.get(Variables.GetAllProductionLinesUrl);
            return apirequest.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getLines() {
        setproductionlines(await getAllLines());
        return;
    }

    useEffect(() => {
        getLines()
    })

    return (
        <div className='screen'>
            <Sidebar productionlinearray={productionlines} />
            <div className='container'>
                {productionlines != null ? <GraphCardList Cards={productionlines} /> : <a>No pruductionlines found</a>}
            </div>
        </div>
    )
}

export default Home