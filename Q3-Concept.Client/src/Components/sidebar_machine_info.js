import React from 'react'
import './Sidebar_machine_info.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const Sidebar_machine_info = ({machine}) => {
    return (
        <div class={`MachineCard ${machine.status}`}>
            <Link to={machine.path} class='link'>
                <h3> {machine.machineName} </h3>
            </Link>
        </div>
    )

}


export default Sidebar_machine_info
