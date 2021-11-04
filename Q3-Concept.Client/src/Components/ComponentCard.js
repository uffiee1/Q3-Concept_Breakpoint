import "../css/ComponentCard.scss"

function ComponentCard({ ComponentName, ComponentDescription }) {
    return (
        <div class="card">
            <div className="card-body">
                <p> Name: {ComponentName}</p>
                <p>Description: {ComponentDescription}</p>
            </div>

        </div>
    )
}

export default ComponentCard
