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
                            <th>Naam</th>
                            <th>Beschrijving</th>
                            <th>Start Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productionline.components.map(component => (
                            <tr onClick={() => MoreDetails(component.id)} key={component.id}>
                                <th>{component.name}</th>
                                <th>{component.description}</th>
                                <th>{component.startDate}</th>
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
                            <th>Naam</th>
                            <th>Beschrijving</th>
                            <th>Start Datum</th>
                            <th>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productionline.componentHistory.map(component => (
                            component.endDate === '0001-01-01T00:00:00' ?
                                <div />
                                :
                                <tr onClick={() => MoreDetails(component.id)} key={component.id}>
                                    <th>{component.name}</th>
                                    <th>{component.description}</th>
                                    <th>{component.startDate}</th>
                                    <th>{component.endDate}</th>
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
