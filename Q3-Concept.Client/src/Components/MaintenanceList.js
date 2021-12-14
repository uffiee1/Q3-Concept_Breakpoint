
function MaintenanceList(maintenance){


    return(
        <div className="background">
            <div className="page">
                <table className="table">
                    <thead>
                        <tr id="trnoclick">
                            <th style={{ width: "35%" }}>Naam</th>
                            <th style={{ width: "15%" }}>Beschrijving</th>
                            <th style={{ width: "15%" }}>Handelingen</th>
                            <th style={{ width: "35%" }}>Maximaal aantal handelingen</th>
                        </tr>
                    </thead>
                    
                    </table>

            </div>
        </div>
    )
}
export default MaintenanceList