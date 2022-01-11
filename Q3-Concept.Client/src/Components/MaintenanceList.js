import { Variables } from "../Components/ApiUrls";
import axios from "axios";

function MaintenanceList(maintenance) {





    return (
        <div className="background">
            <div className="page">
                <table className="table">
                    <thead>
                        <tr id="trnoclick">
                            <th style={{ width: "35%" }}>Component</th>
                            <th style={{ width: "15%" }}>Max Handelingen</th>
                            <th style={{ width: "15%" }}>Notities</th>
                            <th style={{ width: "35%" }}>Status</th>
                        </tr>
                    </thead>
                    {maintenance.maintenance.map(maintenance => (
                        <tr>{console.log(maintenance.name)}
                            <td>{maintenance.name}</td>
                            <td>{maintenance.warning}</td>
                            <td>{maintenance.notes}</td>
                            <td>{maintenance.status === 0 ? <p>Gepland</p> : null} {maintenance.status === 1 ? <p>In Behandeling</p> : null} {maintenance.status === 2 ? <p>Klaar</p> : null}</td>
                        </tr>
                    ))}

                </table>

            </div>
        </div>
    )
}
export default MaintenanceList