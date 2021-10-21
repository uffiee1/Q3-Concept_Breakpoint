import '../css/ProductionLineDetails.css';

    function ProductionLineDetails({productionline}) {
        function handleClick(){

        }
        return(
            <div class = "DetailPopUp">
                <div class = "popupbody">
                    <span class = "close" onClick = {handleClick}>
                    </span>
                    <h2>Hello World</h2>
                </div>
            </div>
        )
    }

export default ProductionLineDetails
