import "../css/ComponentList.scss"

import { useEffect, useState } from "react"

import ComponentDetails from "./ComponentDetails";
import { Variables } from "../Components/ApiUrls";
import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";

function ComponentList({ components, id = null }) {
    const [showDetailPopUp, setShowDetailPopUp] = useState(false);
    const [popupRendered, setPopupRendered] = useState(false);
    const [givenComponent, setComponent] = useState([]);
    const [filteredComponents, setFilteredComponents] = useState([]);
    const [notFound, setNotFound] = useState(false);

    async function UpdateComponentHandles(event, componentId) {
        event.stopPropagation();


        try {
            let maxActions = document.getElementById('editingfield' + componentId).value;
            if (maxActions == null) {
                alert("geef geldig aantal handelingen op")
            } else {
                const apirequest = await axios.patch(Variables.PatchOnderhoudByComponentIdUrl + "?treeviewId=" + componentId + "&warning=" + maxActions);
                DisableEditing(event, componentId)
                console.log("max number of actions: " + maxActions);
                return apirequest.data;
            }
        } catch (error) {
            alert("Connectie gefaald")
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

    function ShowPopup(component) {
        setComponent(component)
        ToggleDetailPopUp()
    }

    function ToggleDetailPopUp() {
        setShowDetailPopUp(!showDetailPopUp);
        console.log(givenComponent)
    }

    function DisableEditing(event, id) {
        event.stopPropagation();

        var v = document.getElementById("editicon" + id);
        var w = document.getElementById("editinglabel" + id);
        var x = document.getElementById("editingcheck" + id);
        var y = document.getElementById("editingcross" + id);
        var z = document.getElementById("editingfield" + id);

        v.style.display = "inline"
        w.style.display = "inline";
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
    }

    function EnableEditing(event, id) {
        event.stopPropagation();

        var v = document.getElementById("editicon" + id);
        var w = document.getElementById("editinglabel" + id);
        var x = document.getElementById("editingcheck" + id);
        var y = document.getElementById("editingcross" + id);
        var z = document.getElementById("editingfield" + id);

        v.style.display = "none"
        w.style.display = "none";
        x.style.display = "inline";
        y.style.display = "inline";
        z.style.display = "inline";
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
                            <th style={{ width: "35%" }}>Maximaal aantal handelingen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredComponents.length >= 1 ? filteredComponents.map(component => (
                                <tr onClick={() => ShowPopup(component)} key={component.id}>
                                    <td>{component.name}</td>
                                    <td>{component.description}</td>
                                    <td>{component.actions}</td>
                                    <td>
                                        <svg id={"editicon" + component.id} onClick={(e) => EnableEditing(e, component.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                        <p id={"editinglabel" + component.id} style={{ width: "70%" }} className="changeActionsTr" onClick={(e) => EnableEditing(e, component.id)}>{component.actions}</p>
                                        <input id={"editingfield" + component.id} style={{ width: "70%", display: "none" }} class="changeActionsTr" type="number" placeholder={component.actions} onClick={(e) => DoNotPropagate(e)} />
                                        <p id={"editingcheck" + component.id} style={{ width: "15%", display: "none" }} class="changeActionsTr" onClick={(e) => UpdateComponentHandles(e, component.id)}>{"\u2705"}</p>
                                        <p id={"editingcross" + component.id} style={{ width: "15%", display: "none" }} class="changeActionsTr" onClick={(e) => DisableEditing(e, component.id)}>{"\u274C"}
                                        </p>
                                    </td>
                                </tr>
                            )) : components.sort(OrderByAssending).map((component) => (
                                <tr onMouseEnter={() => HoverEnter(component.id)} onMouseLeave={() => HoverLeave(component.id)} onClick={() => ShowPopup(component)} key={component.id}>
                                    <td>{component.name}</td>
                                    <td>{component.description}</td>
                                    <td>{component.actions}</td>
                                    <td>
                                        <svg style={{ display: "none" }} id={"editicon" + component.id} onClick={(e) => EnableEditing(e, component.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                        <p id={"editinglabel" + component.id} style={{ width: "20%" }} className="changeActionsTr" >{component.actions}</p>
                                        <input id={"editingfield" + component.id} style={{ width: "20%", display: "none" }} class="changeActionsTr" type="number" placeholder={component.actions} onClick={(e) => DoNotPropagate(e)} />
                                        <p id={"editingcheck" + component.id} style={{ width: "15%", display: "none" }} class="changeActionsTr" onClick={(e) => UpdateComponentHandles(e, component.id)}>{"\u2705"}</p>
                                        <p id={"editingcross" + component.id} style={{ width: "15%", display: "none" }} class="changeActionsTr" onClick={(e) => DisableEditing(e, component.id)}>{"\u274C"}
                                        </p>
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
            </div>
        </div >
    )
}

export default ComponentList
