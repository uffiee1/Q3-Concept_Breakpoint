import '../css/ProductionLineDetails.css';

function ProductionLineDetails({productionline}) {
    return (
        <div class ="DetailPopUp">g
            <p>bart is een legend</p>
            <h6> {productionline.id }</h6>
            <h6>{productionline.name}</h6>
           

        </div>
    )
}

export default ProductionLineDetails
