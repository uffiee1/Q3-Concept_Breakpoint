import "../css/ComponentCard.scss"

import { useEffect, useState } from "react"

import ComponentCard from "./ComponentCard"

function ComponentList({ components }) {

    const [filteredComponents, setFilteredComponents] = useState([])
    const [notFound, setNotFound] = useState(false)


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
        let filtered = components.filter(filterComponentsByName)
        if (filtered.length === 0) {
            setNotFound(true)
        }
        else { setNotFound(false); }

        setFilteredComponents(filtered.sort(compare))
        return
    }

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

    return (
        <div class="row">
            <div className="Searchbar">
                <label className="searchLabel" htmlFor="search">Search by name:</label>
                <input className="searchField" type="text" onChange={filterComponentsOnChange}></input>
                {notFound === true ? <label>No results found</label> : null}
            </div>
            {
                filteredComponents.length >= 1 ? filteredComponents.map((component) => (
                    <div className="column" >
                        <ComponentCard key={component.id} ComponentName={component.name} ComponentDescription={component.description} />
                    </div>
                )) : components.sort(compare).map((component) => (
                    <div className="column" >
                        <ComponentCard key={component.id} ComponentName={component.name} ComponentDescription={component.description} />
                    </div>
                ))
            }
        </div >
    )
}

export default ComponentList
