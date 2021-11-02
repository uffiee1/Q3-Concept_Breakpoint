import './Home.css'

import GraphCardList from '../Components/GraphCardList';
import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from "axios";
import { Variables } from '../Components/ApiUrls';
import { buttonBaseClasses } from '@mui/material';
import { display } from '@mui/system';

import LoadingPopup from '../Components/LoadingPopup';

function Home() {

    const [productionlines, setproductionlines] = useState([])

    const [showLoadingPopUp, setShowLoadingPopup] = useState(true);

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
        return;
    }

    function WaitForProductionLines(){
        if(productionlines.length !== 0){
            setShowLoadingPopup(false);
        }
        return ;
    }


    useEffect(() =>{
        getLines()
        WaitForProductionLines()
    })

    return (
    <div>
        {showLoadingPopUp ? <LoadingPopup /> : null}
        <Sidebar productionlinearray = {productionlines}/>
        <div className = 'container'>
            {productionlines.length >= 1 ? <GraphCardList Cards={productionlines} /> : null}
        </div>
    </div>

    )
}

export default Home