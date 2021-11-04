import { Component } from "react"
import ComponentCard from "./ComponentCard"
import "../css/ComponentCard.scss"

function ComponentList({components}) {
    return (
        <div class = "row">
            {components.map((component)=>(
                <div className="column" >
                    <ComponentCard key = {component.id} ComponentName = {component.name} ComponentDescription= {component.description}/>
                </div>
            ))}
        </div>
    )
}

export default ComponentList
