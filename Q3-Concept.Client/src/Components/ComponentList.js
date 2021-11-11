import "../css/ComponentCard.scss"
import ComponentCard from "./ComponentCard"


function ComponentList({ components }) {
    return (
        //component table //npm install react-bootstrap bootstrap@5.1.3
        <table class="table">
            <thead>
                <tr>
                    <th>Naam</th>
                    <th>Beschrijving</th>
                    <th>Handelingen</th>
                </tr>
            </thead>
            <tbody>
                {components.map(component => (
                    <tr key={component.id}>
                        <th>{component.name}</th>
                        <th>{component.description}</th>
                        <th>{component.actions}</th>
                    </tr>
                ))}
            </tbody>
        </table>
        //component cards
        // <div class="row">
        //     {components.map((component) => (
        //         <div className="column" >
        //             <ComponentCard key={component.id} ComponentName={component.name} ComponentDescription={component.description} ComponentActions={component.actions} />
        //         </div>
        //     ))}
        // </div>
    )
}

export default ComponentList
