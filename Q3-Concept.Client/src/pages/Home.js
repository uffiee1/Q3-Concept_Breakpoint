import './Home.css'

import { useEffect, useState } from 'react';

import GraphCardList from '../Components/GraphCardList';
import LoadingPopup from '../Components/LoadingPopup';
import React from 'react'
import Sidebar from '../Components/Sidebar';
import { Variables } from '../Components/ApiUrls';
import axios from "axios";

// import { buttonBaseClasses } from '@mui/material';
// import { display } from '@mui/system';


function Home() {

    const [productionlines, setproductionlines] = useState([])

    const [showLoadingPopUp, setShowLoadingPopup] = useState(true);

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

    function WaitForProductionLines() {
        if (productionlines !== null) {
            setShowLoadingPopup(false);
        }
        return;
    }


    useEffect(() => {
        getLines()
        WaitForProductionLines()
    })

    return (
        <div>
            {showLoadingPopUp ? <LoadingPopup /> : null}
            <Sidebar productionlinearray={productionlines} />
            <div className='container'>
                {productionlines != null ? <GraphCardList Cards={productionlines} /> : <a>No pruductionlines found</a>}
            </div>
        </div>

    )
}

export default Home