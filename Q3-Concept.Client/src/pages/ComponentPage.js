import { useEffect, useState } from "react"

import ComponentList from "../Components/ComponentList"
import LoadingPopup from "../Components/LoadingPopup";
import { Variables } from "../Components/ApiUrls";
import axios from "axios";

function ComponentPage(props) {
    const [AllComponents, SetAllComponents] = useState([])
    const [showLoadingPopUp, setShowLoadingPopup] = useState(true)

    let componentId;
    try {
        componentId = props.location.state.id
    } catch {
        componentId = -1
    }


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
        if (AllComponents.length !== null) {
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
            {showLoadingPopUp ? <LoadingPopup /> : null}
            <div>
                {AllComponents.length >= 1 ? <ComponentList components={AllComponents} id={componentId} /> : null}
            </div>
        </div>
    )
}

export default ComponentPage
