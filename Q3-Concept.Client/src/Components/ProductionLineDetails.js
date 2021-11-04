import '../css/ProductionLineDetails.css';

function ProductionLineDetails({ productionline }) {
    return (
        <div className="productionLinePopup">
            <h1>Machine Info</h1>
            <div>
                <h3>{productionline.id}</h3>
                <h5>{productionline.name}</h5>
            </div>
        </div>
    )
}

export default ProductionLineDetails
