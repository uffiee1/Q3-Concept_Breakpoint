import "../css/ComponentList.scss"

import { useEffect, useState } from "react"

import ComponentDetails from "./ComponentDetails";
import { Variables } from "../Components/ApiUrls";
import axios from "axios";

function ComponentList({ components, id = null }) {
    const [showDetailPopUp, setShowDetailPopUp] = useState(false);
    const [popupRendered, setPopupRendered] = useState(false);
    const [givenComponent, setComponent] = useState([]);
    const [filteredComponents, setFilteredComponents] = useState([])
    const [notFound, setNotFound] = useState(false)

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
        <div className="background">
            <div className="page">
                <div style={{ margin: "1%" }} className="Searchbar">
                    <a style={{ fontSize: "25px" }}>🔎︎</a><input className="searchField" data-testid="searchfieldid" type="text" onChange={filterComponentsOnChange}></input>
                    {notFound ? <label className="NoResultsLabel">No results found</label> : null}
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr id="trnoclick">
                            <th>Naam</th>
                            <th>Beschrijving</th>
                            <th>Handelingen</th>
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
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                {showDetailPopUp ?
                    <div id="dimScreen" onClick={() => ToggleDetailPopUp()}>
                        <ComponentDetails component={givenComponent} />
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default ComponentList
