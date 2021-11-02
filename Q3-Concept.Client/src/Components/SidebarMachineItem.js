import '../css/SidebarMachineInfo.scss'

import { Link } from 'react-router-dom';
import React from 'react'

function SidebarMachineItem({ machine }) {
    let currentStatusString = "undefined"

    if (machine.statuses.length >= 1) {
        currentStatusString = machine.statuses[machine.statuses.length - 1].description
    }

    return (
        <div class={`MachineCard ${currentStatusString}`}>
            <Link to="/" class='link'>
                <h3> {machine.name} </h3>
            </Link>
        </div>
    )

}

export default SidebarMachineItem
