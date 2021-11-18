import '../css/ProductionLineDetails.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Variables } from '../Components/ApiUrls';


function ProductionLineDetails({ productionline }) {
    const [componentHistory, setComponentHistory] = useState([])

    async function getComponentHistory() {
        try {
            const apirequest = await axios.get(Variables.GetAllComponentsUrl);

            console.log(apirequest.data);
            return apirequest.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function GetComponentHistory() {
        setComponentHistory(await getComponentHistory());
        return;
    }

    useEffect(() => {
        GetComponentHistory()
    })


    return (
        <div className="productionLinePopup">
            <h1>Machine Info</h1>
            <div>
                <h3>{productionline.id}</h3>
                <h5>{productionline.name}</h5>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Beschrijving</th>
                        <th>Start Datum</th>
                        <th>Eind Datum</th>
                    </tr>
                </thead>
                <tbody>
                    {componentHistory.length >= 1 ? componentHistory.map(component => (
                        <tr key={component.id}>
                            <th>{component.name}</th>
                            <th>{component.description}</th>
                            <th>{component.startdate}</th>
                            <th>{component.enddate}</th>
                        </tr>
                    )) :
                        <div />
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ProductionLineDetails
