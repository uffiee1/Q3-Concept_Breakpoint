import '../css/ProductionLineDetails.css';
import { Link, useHistory } from 'react-router-dom';


function ProductionLineDetails({ productionline }) {


    return (
        <div className="productionLinePopup">
            <h1>{productionline.name}</h1>
            <h5>Actuele componenten</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Beschrijving</th>
                        <th>Start Datum</th>
                    </tr>
                </thead>
                <tbody>
                    {productionline.components.length >= 1 ? productionline.components.map(component => (
                        <tr key={component.id}>
                            <th>{component.name}</th>
                            <th>{component.description}</th>
                            <th>{component.startDate}</th>
                        </tr>
                    )) :
                        <div />
                    }
                </tbody>
            </table>
            <h5>Component geschiedenis</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Beschrijving</th>
                        <th>Start Datum</th>
                        <th>Eind Datum</th>
                    </tr>
                </thead>
                <tbody>
                    {productionline.componentHistory.length >= 1 ? productionline.componentHistory.map(component => (
                        component.endDate === '0001-01-01T00:00:00' ?
                            <div />
                            :
                            <tr key={component.id}>
                                {<Link to={{ pathname: "/ComponentPage", state: { id: component.id } }} >ga dan </Link>}
                                <th>{component.name}</th>
                                <th>{component.description}</th>
                                <th>{component.startDate}</th>
                                <th>{component.endDate}</th>
                            </tr>
                    ))
                        :
                        <div />
                    }
                </tbody>
            </table>
        </div >
    )
}

export default ProductionLineDetails
