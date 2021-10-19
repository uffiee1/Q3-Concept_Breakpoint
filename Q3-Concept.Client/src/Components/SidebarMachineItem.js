import '../css/SidebarMachineInfo.scss'

import { Link } from 'react-router-dom';
import React from 'react'

function SidebarMachineItem({ machine }) {
    return (
        <div class={`MachineCard ${machine.status}`}>
            <Link to={machine.path} class='link'>
                <h3> {machine.machineName} </h3>
            </Link>
        </div>
    )

}

export default SidebarMachineItem
