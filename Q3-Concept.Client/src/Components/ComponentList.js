import "../css/ComponentList.scss"

import { useEffect, useState } from "react"

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

    return (
        <div>
            <div className="Searchbar">
                <label className="searchLabel" htmlFor="search">Search by name:</label>
                <input className="searchField" data-testid="searchfieldid" type="text" onChange={filterComponentsOnChange}></input>
                {notFound === true ? <label className="NoResultsLabel">No results found</label> : null}
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Beschrijving</th>
                        <th>Handelingen</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComponents.length >= 1 ? filteredComponents.map(component => (
                        <tr key={component.id}>
                            <th>{component.name}</th>
                            <th>{component.description}</th>
                            <th>{component.actions}</th>
                        </tr>
                    )) : components.sort(OrderByAssending).map((component) => (
                        <tr key={component.id}>
                            <th>{component.name}</th>
                            <th>{component.description}</th>
                            <th>{component.actions}</th>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default ComponentList
