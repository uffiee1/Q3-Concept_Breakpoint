import "../css/ComponentList.scss"

import { useEffect, useState } from "react"
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
            console.log("yohallo2 " + id);
            return apirequest.data;
        } catch (error) {
            console.log("big bean burrito")
            console.error(error);
        }
    }

    async function SetPopupComponent(id) {//van redirect
        console.log("hallo1 " + id);

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
        if (component.name.includes(searchInput)) {
            return true
        }
        return false
    }

    async function filterComponentsOnChange(event) {
        searchInput = event.target.value;
        console.log(searchInput)
        setFilteredComponents([])
        if(searchInput === ""){
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
    function compare(a, b) {
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
        if (!popupRendered && id != -1) {
            SetPopupComponent(id);
        }
        setPopupRendered(true);
    })

    return (
        <div>
            <div className="Searchbar">
                <label className="searchLabel" htmlFor="search">Search by name:</label>
                <input className="searchField" data-testid="searchfieldid" type="text" onChange={filterComponentsOnChange}></input>
                {notFound === true ? <label className="NoResultsLabel">No results found</label> : null}
            </div>
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
            {showDetailPopUp ? <ComponentDetails component={givenComponent} /> : null}
        </div >
    )
}

export default ComponentList
