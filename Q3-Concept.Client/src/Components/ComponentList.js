import "../css/ComponentCard.scss"
import { useState, useEffect } from "react"

import ComponentCard from "./ComponentCard"

function ComponentList({ components }) {

    const [filteredComponents, setFilteredComponents] = useState([])



    function filterComponentsOnChange(event){
        const searchInput = event.target.value;
        console.log(searchInput)
        setFilteredComponents(components.filter( c => c.name.includes(searchInput)))
        console.log(filteredComponents)
        return 
    }
    return (
        
        <div class="row">
            <div className="Searchbar">
                <label htmlFor="search">Search by name</label>
                <input id="searchField" type="text" onChange={filterComponentsOnChange}></input>
            </div>
            {components.map((component) => (
                <div className="column" >
                    <ComponentCard key={component.id} ComponentName={component.name} ComponentDescription={component.description} />
                </div>
            ))}
        </div>
    )
}

export default ComponentList
