import { useEffect, useState } from "react"
import LoadingPopup from "../Components/LoadingPopup"
import { Variables } from "../Components/ApiUrls";
import axios from "axios";
import MaintenanceList from "../Components/MaintenanceList";

function MaintenancePage(){
    const [AllMaintenance, SetAllMaintenance] = useState([])
    const [showLoadingPopUp, setShowLoadingPopup] = useState([])

    async function GetAllMaintenance() {
        try {
            const apirequest = await axios.get(Variables.GetAllMaintenance);
            return apirequest.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function SetMaintenance() {
        SetAllMaintenance(await GetAllMaintenance());
        return;
    }

    function WaitForMaintenance() {
        if (AllMaintenance.length >= 0) {
            setShowLoadingPopup(false);
        }
        return;
    }

    useEffect(() => {
        SetMaintenance()
        WaitForMaintenance()

    })

    return(
        <div>
            <div>
        {showLoadingPopUp ? <LoadingPopup /> : null}
        <h1>MaintenancePage</h1>
        {AllMaintenance.length >= 1 ? <MaintenanceList maintenance={AllMaintenance} /> : null}
            </div>
        </div>
    )
    
    
}
export default MaintenancePage