import { useEffect, useState } from "react"
import axios from "axios";

import ComponentList from "../Components/ComponentList"
import LoadingPopup from "../Components/LoadingPopup";
import { Variables } from "../Components/ApiUrls";

function ComponentPage() {
    const [AllComponents, SetAllComponents] = useState([])

    async function GetAllComponents() {
        try {
            const apirequest = await axios.get(Variables.GetAllComponentsUrl);
            return apirequest.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function SetComponents() {
        SetAllComponents(await GetAllComponents());
        return;
    }

    useEffect(() => {
        SetComponents()
    })
    
    return (
        <div>
            {AllComponents.length >= 1 ? <ComponentList components={AllComponents} /> : <LoadingPopup />}
        </div>
    )
}

export default ComponentPage
