import "../css/ComponentCard.scss"

import ComponentCard from "./ComponentCard"

function ComponentList({ components }) {
    return (
        <div class="row">
            {components.map((component) => (
                <div className="column" >
                    <ComponentCard key={component.id} ComponentName={component.name} ComponentDescription={component.description} ComponentActions={component.actions} />
                </div>
            ))}
        </div>
    )
}

export default ComponentList
