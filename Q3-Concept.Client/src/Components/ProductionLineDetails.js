import '../css/ProductionLineDetails.css';

import { Link } from 'react-router-dom';

function ProductionLineDetails({ productionline }) {

    function MoreDetails(id) {
        document.getElementById("com" + id).click();
    }

    return (
        <div className="productionLinePopup">
            <h1>{productionline.name}</h1>
            <h5>Actuele componenten</h5>

            {productionline.components.length >= 1 ?
                <table class="table">
                    <thead>
                        <tr id="trnoclick">
                            <th style={{ width: "25%" }}>Naam</th>
                            <th style={{ width: "25%" }}>Beschrijving</th>
                            <th style={{ width: "50%" }}>Start Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productionline.components.map(component => (
                            <tr onClick={() => MoreDetails(component.id)} key={component.id}>
                                <td>{component.name}</td>
                                <td>{component.description}</td>
                                <td>{component.startDate}</td>
                                <Link hidden id={"com" + component.id} to={{ pathname: "/ComponentPage", state: { id: component.id } }} ></Link>

                            </tr>
                        ))
                        }
                    </tbody>
                </table> : <div>Geen componenten gevonden</div>
            }
            <h5>Component geschiedenis</h5>
            {productionline.componentHistory.length >= 1 ?
                <table class="table">
                    <thead>
                        <tr id="trnoclick">
                            <th style={{ width: "25%" }}>Naam</th>
                            <th style={{ width: "25%" }}>Beschrijving</th>
                            <th style={{ width: "25%" }}>Start Datum</th>
                            <th style={{ width: "25%" }}>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productionline.componentHistory.map(component => (
                            component.endDate === '0001-01-01T00:00:00' ?
                                <div />
                                :
                                <tr onClick={() => MoreDetails(component.id)} key={component.id}>
                                    <td>{component.name}</td>
                                    <td>{component.description}</td>
                                    <td>{component.startDate}</td>
                                    <td>{component.endDate}</td>
                                    <Link hidden id={"com" + component.id} to={{ pathname: "/ComponentPage", state: { id: component.id } }} ></Link>
                                </tr>
                        ))

                        }
                    </tbody>
                </table> : <div>Geen componenten gevonden</div>
            }
        </div >
    )
}

export default ProductionLineDetails
