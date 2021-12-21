import { useEffect, useState } from "react"
import LoadingPopup from "../Components/LoadingPopup"
import { Variables } from "../Components/ApiUrls";
import axios from "axios";
import MaintenanceList from "../Components/MaintenanceList";

function MaintenancePage(){
    const [AllMaintenance, SetAllMaintenance] = useState([])
    const [showLoadingPopUp, setShowLoadingPopup] = useState([])
    const [components, SetComponents] = useState([])



    var compIdarr = [];
    var compNameArr = [];

    async function GetAllMaintenance() {
        try {
            const apirequest = await axios.get(Variables.GetAllOnderhoud);
            console.log(apirequest.data);
            return apirequest.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function SetMaintenance() {
        SetAllMaintenance(await GetAllMaintenance());
        return;
    }

    async function GetComponentById(id){
        try {
            const apirequest = await axios.get(Variables.GetComponentByIdUrl + "?id=" + id);
            console.log(apirequest.data.name)

            return apirequest.data.name;
        } catch (error) {
            console.error(error);
        }
        
    }

    async function getComponentNames(){
        SetComponents(await GetComponentById())
        return;
    }

    function WaitForMaintenance() {

        if (AllMaintenance.length >= 0) {
            AllMaintenance.forEach(maintenance => {
                compIdarr.push(maintenance.treeviewId)
            });

            compIdarr.forEach(id => {compNameArr.push(GetComponentById(id))
            });

        }
        return;
    
}
    function WaitForComponentNames() {
        if (components !== 0) {
            setShowLoadingPopup(false);
        }
        return;
    }

    useEffect(() => {
        SetMaintenance()
        WaitForMaintenance()
        WaitForComponentNames()

    })

    return(
        <div>
            <div>
        {showLoadingPopUp ? <LoadingPopup /> : null}
        <h1>MaintenancePage</h1>
        {AllMaintenance.length >= 1 ? <MaintenanceList maintenance={AllMaintenance}/> : <p>No Data</p> }
            </div>
        </div>
    )
    
    
}
export default MaintenancePage