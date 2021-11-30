import { useEffect, useState } from "react"
import axios from "axios";

import ComponentList from "../Components/ComponentList"
import LoadingPopup from "../Components/LoadingPopup";
import { Variables } from "../Components/ApiUrls";

function ComponentPage(props) {
    const [AllComponents, SetAllComponents] = useState([])

    if (props.location.state.id != null) {
        console.log(props.location.state.id);
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
        if (AllComponents.length !== 0) {
            setShowLoadingPopup(false);
        }
        return;
    }

    useEffect(() => {
        SetComponents()
    })

    return (
        <div>
            {ShowLoadingPopUp ? <LoadingPopup /> : null}

            <div>
                {AllComponents.length >= 1 ? <ComponentList components={AllComponents} id={props.location.state.id} /> : null}
            </div>
        </div>
    )
}

export default ComponentPage
