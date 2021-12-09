import "../css/ComponentList.scss"

import { useEffect, useState } from "react"

import ComponentDetails from "./ComponentDetails";
import { Variables } from "../Components/ApiUrls";
import axios from "axios";

function ComponentList({ components, id = null }) {
    const [showDetailPopUp, setShowDetailPopUp] = useState(false);
    const [popupRendered, setPopupRendered] = useState(false);
    const [givenComponent, setComponent] = useState([]);
    const [filteredComponents, setFilteredComponents] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [maxOperationEditing, setToggleEditing] = useState(false);

    async function UpdateComponentHandles(event, componentId, maxActions) {
        event.stopPropagation();
        try {
            const apirequest = await axios.patch(Variables.PatchOnderhoudByComponentIdUrl + "?treeviewId=" + componentId + "&warning=" + maxActions);
            console.log(apirequest.data)
            console.log("max number of handles is " + maxActions);
            return apirequest.data;
        } catch (error) {
            console.log("big bean burrito")
            console.error(error);
        }
    }

    async function GetComponentById(id) {
        try {
            const apirequest = await axios.get(Variables.GetComponentByIdUrl + "?id=" + id);
            console.log(apirequest.data)
            return apirequest.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function SetPopupComponent(id) {//van redirect
        setComponent(await GetComponentById(id));
        ToggleDetailPopUp();
        return;
    }

    function showPopup(component) {
        setComponent(component)
        ToggleDetailPopUp()
    }

    function ToggleDetailPopUp() {
        setShowDetailPopUp(!showDetailPopUp);
        console.log(givenComponent)
    }


    function toggleEditingField(event) { //catch event:any
        event.stopPropagation();
        setToggleEditing(!maxOperationEditing);
        console.log("toggled editing")
    }
    function doNotPropagate(event) {
        event.stopPropagation();
    }

    let searchInput = ""

    function filterComponentsByName(component) {
        if (component.name.toLowerCase().includes(searchInput.toLowerCase()) || component.description.toLowerCase().includes(searchInput.toLowerCase())) {
            return true
        }
        return false
    }

    async function filterComponentsOnChange(event) {
        searchInput = event.target.value;
        console.log(searchInput)
        setFilteredComponents([])
        if (searchInput === "") {
            return
        }

        let filtered = components.filter(filterComponentsByName)
        if (filtered.length === 0) {
            setNotFound(true)
        }
        else { setNotFound(false); }

        setFilteredComponents(filtered.sort(OrderByAssending))
        return
    }

    // wordt nog aangepast, en later getest
    function OrderByAssending(a, b) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0;
    }

    useEffect(() => {
        console.log(filteredComponents)
    }, [filteredComponents])

    useEffect(() => {
        console.log(notFound)
    }, [notFound])

    useEffect(() => {
        if (!popupRendered && id !== -1) {
            SetPopupComponent(id);
            setPopupRendered(true);
        }
    })

    return (
        <div>
            <div style={{ margin: "1%" }} className="Searchbar">
                <a style={{ fontSize: "25px" }}>🔎︎</a><input className="searchField" data-testid="searchfieldid" type="text" onChange={filterComponentsOnChange}></input>
                {notFound ? <label className="NoResultsLabel">No results found</label> : null}
            </div>
            <table className="table">
                <thead>
                    <tr id="trnoclick">
                        <th>Naam</th>
                        <th>Beschrijving</th>
                        <th>Handelingen</th>
                        <th>Maximaal aantal handelingen</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComponents.length >= 1 ? filteredComponents.map(component => (
                        <tr onClick={() => showPopup(component)} key={component.id}>
                            <th>{component.name}</th>
                            <th>{component.description}</th>
                            <th>{component.actions}</th>
                        </tr>
                    )) : components.sort(OrderByAssending).map((component) => (
                        <tr onClick={() => showPopup(component)} key={component.id}>
                            <th>{component.name}</th>
                            <th>{component.description}</th>
                            <th>{component.actions}</th>
                            <th>{maxOperationEditing ?
                                <div onClick={(e) => toggleEditingField(e)}><input id="maxActionsField" type="number" onClick={(e) => doNotPropagate(e)} />
                                    <button class="btn warning" onClick={(e) => UpdateComponentHandles(e, component.id, document.getElementById('maxActionsField').value)}>Submit</button>
                                    <button class="btn danger" onClick={(e) => toggleEditingField(e)}>Cancel</button></div> :

                                <div onClick={(e) => toggleEditingField(e)}><p>✎ false</p></div>}
                            </th>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            {showDetailPopUp ? <ComponentDetails component={givenComponent} /> : null}
        </div>
    )
}

export default ComponentList
