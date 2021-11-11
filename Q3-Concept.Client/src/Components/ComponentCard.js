import "../css/ComponentCard.scss"

function ComponentCard({ ComponentName, ComponentDescription, ComponentActions }) {
    return (
        <div class="card">
            <div className="card-body">
                <p>Naam: {ComponentName}</p>
                <p>Beschrijving: {ComponentDescription}</p>
                <p>Handelingen: {ComponentActions}</p>
            </div>
        </div>
    )
}

export default ComponentCard
