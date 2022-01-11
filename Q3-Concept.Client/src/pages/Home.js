import './Home.css'

import { useEffect, useState } from 'react';
import LoadingPopup from "../Components/LoadingPopup";
import GraphCardList from '../Components/GraphCardList';
import Sidebar from '../Components/Sidebar';
import { Variables } from '../Components/ApiUrls';
import axios from "axios";

function Home() {
    const [showLoadingPopUp, setShowLoadingPopup] = useState([])
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

    function WaitForProductionLines() {
        if (productionlines !== undefined && productionlines.length !== 0) {
            setShowLoadingPopup(false);
        }
        return;
    }

    useEffect(() => {
        getLines()
        WaitForProductionLines()
    })

    return (

        showLoadingPopUp ? <LoadingPopup /> :
            <>
                <Sidebar productionlinearray={productionlines} />
                <div className='container'>
                    {productionlines != null ? <GraphCardList Cards={productionlines} /> : <a>No pruductionlines found</a>}
                </div>
            </>

    )
}

export default Home