import { useEffect, useState } from "react"

import ComponentList from "../Components/ComponentList"
import LoadingPopup from "../Components/LoadingPopup";
import { Variables } from "../Components/ApiUrls";
import axios from "axios";

function ComponentPage() {
    const [AllComponents, SetAllComponents] = useState([])
    const [ShowLoadingPopUp, setShowLoadingPopup] = useState(true)

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

    function WaitForComponents() {
        if (AllComponents.length !== 0) {
            setShowLoadingPopup(false);
        }
        return;
    }


    useEffect(() => {
        SetComponents()
        WaitForComponents()
    })
    return (
        <div>
            {ShowLoadingPopUp ? <LoadingPopup /> : null}

            <div>
                {AllComponents.length >= 1 ? <ComponentList components={AllComponents} /> : null}
            </div>

        </div>
    )
}

export default ComponentPage