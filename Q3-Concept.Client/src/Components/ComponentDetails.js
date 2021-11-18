import '../css/ComponentDetails.css';


function ComponentDetails({ component }) {
    return (
        <div className="componentPopup">
            <h1>{component.name}</h1>
            <h5>Machine Historie</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Start Datum</th>
                        <th>Eind Datum</th>
                    </tr>
                </thead>
                <tbody>
                    {component.machineHistory.length >= 1 ? component.machineHistory.map(machine => (
                        <tr>
                            <th>{machine.name}</th>
                            <th>{machine.startDate}</th>
                            <th>{machine.endDate}</th>
                        </tr>
                    )) :
                        <div />
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ComponentDetails
