import "../css/ComponentList.scss"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"

import ComponentDetails from "./ComponentDetails";
import { Variables } from "../Components/ApiUrls";
import axios from "axios";
import NewMaintenancePopup from "./NewMaintenancePopup";


function ComponentList({ components, id = null }) {
    const [showDetailPopUp, setShowDetailPopUp] = useState(false);
    const [popupRendered, setPopupRendered] = useState(false);
    const [givenComponent, setComponent] = useState([]);
    const [filteredComponents, setFilteredComponents] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [showMaintenancePopup, setShowMaintenancePopup] = useState(false);
    const [componentId, setComponentId] = useState(-1)



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

    function ShowPopup(component) {
        setComponent(component)
        ToggleDetailPopUp()
    }

    function ToggleDetailPopUp() {
        setShowDetailPopUp(!showDetailPopUp);
        console.log(givenComponent)
    }

    function EnableMaintenancePopup(event, id) {
        event.stopPropagation();

        setComponentId(id);
        console.log("EVENT")
        console.log(event);
        setShowMaintenancePopup(true);

        console.log(showMaintenancePopup)
    }

    function DisableMaintenancePopup() {
        setShowMaintenancePopup(false);
    }

    function HoverLeave(componentId) {
        document.getElementById("editicon" + componentId).style.display = "none"
    }

    function HoverEnter(componentId) {
        document.getElementById("editicon" + componentId).style.display = "inline"
    }

    function DoNotPropagate(event) {
        event.stopPropagation();
    }

    let searchInput = ""

    function FilterComponentsByName(component) {
        if (component.name.toLowerCase().includes(searchInput.toLowerCase()) || component.description.toLowerCase().includes(searchInput.toLowerCase())) {
            return true
        }
        return false
    }

    async function FilterComponentsOnChange(event) {
        searchInput = event.target.value;
        console.log(searchInput)
        setFilteredComponents([])
        if (searchInput === "") {
            return
        }

        let filtered = components.filter(FilterComponentsByName)
        if (filtered.length === 0) {
            setNotFound(true)
        }
        else { setNotFound(false); }

        setFilteredComponents(filtered.sort(OrderByAssending))
        return
    }

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
        <div className="background">
            <div className="page">
                <div style={{ margin: "1%" }} className="Searchbar">
                    <a style={{ fontSize: "25px" }}>🔎︎</a><input className="searchField" data-testid="searchfieldid" type="text" onChange={FilterComponentsOnChange}></input>
                    {notFound ? <label className="NoResultsLabel">No results found</label> : null}
                </div>
                <table className="table">
                    <thead>
                        <tr id="trnoclick">
                            <th style={{ width: "35%" }}>Naam</th>
                            <th style={{ width: "15%" }}>Beschrijving</th>
                            <th style={{ width: "15%" }}>Handelingen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredComponents.length >= 1 ? filteredComponents.map(component => (
                                <tr onMouseEnter={() => HoverEnter(component.id)} onMouseLeave={() => HoverLeave(component.id)} onClick={() => ShowPopup(component)} key={component.id}>
                                    <td>{component.name}</td>
                                    <td>{component.description}</td>
                                    <td>{component.actions}</td>
                                    <td>
                                        <button className="btn-dark" style={{ display: "none", borderRadius: '5px' }} id={"editicon" + component.id} onClick={(e) => EnableMaintenancePopup(e, component.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            Onderhoud inplannen
                                        </button>
                                    </td>
                                </tr>
                            )) : components.sort(OrderByAssending).map((component) => (
                                <tr onMouseEnter={() => HoverEnter(component.id)} onMouseLeave={() => HoverLeave(component.id)} onClick={() => ShowPopup(component)} key={component.id}>
                                    <td>{component.name}</td>
                                    <td>{component.description}</td>
                                    <td>{component.actions}</td>
                                    <td>
                                        <button className="btn-dark" style={{ display: "none", borderRadius: '5px' }} id={"editicon" + component.id} onClick={(e) => EnableMaintenancePopup(e, component.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            Onderhoud inplannen
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    showDetailPopUp ?
                        <div id="dimScreen" onClick={() => ToggleDetailPopUp()}>
                            <ComponentDetails component={givenComponent} />
                        </div>
                        : null
                }
                {
                    showMaintenancePopup ?
                        <div id="dimScreen" onClick={() => DisableMaintenancePopup()}>
                            <NewMaintenancePopup componentId={componentId} />
                        </div>
                        : null
                }
            </div>
        </div >
    )
}

export default ComponentList
