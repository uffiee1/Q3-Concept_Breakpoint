import { Form } from 'react-bootstrap';
import React from 'react'
import { Variables } from "../Components/ApiUrls";
import axios from "axios";


import "../css/NewMaintenancePopup.css"

function NewMaintenancePopup({ componentId }) {
    console.log(componentId);


    async function AddNewMaintenance(componentId) {
        try {
            let maxActions = document.getElementById('maxActions').value;
            let description = document.getElementById('description').value;
            if (maxActions == null || description == "") {
                alert("vul alle velden in.")
            } else {//api call werkt nog niet
                const apirequest = await axios.patch(Variables.PatchPlanOnderhoud + "treeviewId=" + componentId + "&warning=" + maxActions + "&text=" + description)
                return apirequest.data;
            }
        } catch (error) {
            alert("Connectie gefaald")
            console.error(error);
        }
    }

    function DoNotPropagate(e) {
        e.stopPropagation();
    }

    return (
        <div className='NewMaintenancePopup' onClick={(e) => DoNotPropagate(e)}>


            <Form style={{ margin: "50px" }}>
                <h3>Onderhoud inplannen</h3>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Na hoeveel aantal operaties:</Form.Label>
                    <Form.Control id='maxActions' type="number" placeholder="aantal operaties" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Beschrijving</Form.Label>
                    <Form.Control rows='9' id='description' as="textarea" />
                </Form.Group>

                <button class="btn-dark" style={{ padding: '3px', borderRadius: '5px' }} onClick={(e) => AddNewMaintenance(componentId)}>
                    Plan in
                </button>
            </Form>
        </div>
    )
}

export default NewMaintenancePopup
