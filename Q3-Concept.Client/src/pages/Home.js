import './Home.css'

import GraphCardList from '../Components/GraphCardList';
import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from "axios";
import { Variables } from '../Components/ApiUrls';
import ProductionLineDetails from '../Components/ProductionLineDetails';
import { buttonBaseClasses } from '@mui/material';
import { display } from '@mui/system';

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

    const[Firstproductionline, setproductionline] = useState({
        name: "fetching line",
        id : 0
    })

    const [ShowPopUp, togglepopup ] = useState(true);

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

    function WaitForProductionLines(){
        if(productionlines.length != 0){
            
            togglepopup(false);
        }
        return ;
    }
    function HandleSubmit(){
        
    }

    function ShowPopUP(){
        if(ShowPopUp ){
           let popup =  document.getElementById("popup");
           popup.style.display ="block";
        }
        else{
            popup.style.display="none";
        }
    }

    useEffect(() =>{
        getLines();
        WaitForProductionLines();
        ShowPopUp();
    })

    return (
    <div>
        <ProductionLineDetails id="popup" productionline ={Firstproductionline}/>
        <Sidebar productionlinearray = {productionlines}/>
        <div className = 'container'>
            <GraphCardList Cards={productionlines} />
        </div>
    </div>

    )
}

export default Home