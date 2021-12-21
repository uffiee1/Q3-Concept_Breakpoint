import '../css/SidebarMachineInfo.scss'

import React from 'react'

function SidebarMachineItem({ machine }) {
    let currentStatusString = "undefined"

    if (machine.statuses.length >= 1) {
        currentStatusString = machine.statuses[machine.statuses.length - 1].description
    }

    return (
        <div className={`MachineCard ${currentStatusString}`}>
            <h3> {machine.name} </h3>
        </div>
    )

}

export default SidebarMachineItem
