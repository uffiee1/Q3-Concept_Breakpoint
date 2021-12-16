import { Variables } from "../Components/ApiUrls";
import axios from "axios";

function MaintenanceList(maintenance){

        async function GetComponentById(id){
        if(id != NaN){
        try {
            const apirequest = await axios.get(Variables.GetComponentByIdUrl + "?id=" + id);
            console.log(apirequest.data)
            return apirequest.data;
        } catch (error) {
            console.error(error);
        }
        }
    }

   async function GetThemComponents(id){ // deze doorgeef functie fixt: Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead. 
        (await GetComponentById(id))
    }


    return(
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
                    
                        {maintenance.maintenance.map(maintenance, i => (
                            <tr>
                                <td><p>{GetThemComponents(maintenance.treeviewId)}{console.log(GetThemComponents(maintenance.treeviewId))}</p></td>
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