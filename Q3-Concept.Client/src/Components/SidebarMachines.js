import { sidebar_machine_info } from './sidebar_machine_info'
import {PropTypes} from 'react'

const SidebarMachines = ({ Machines }) => {
  return (
    <>
      {Machines.map((Machine) => (
        <h3 key={Machine.id}>{Machine.machineName}</h3>
        ))}
    </>
  )

}

SidebarMachines.defaultProps={
  Machines: []

}

export default SidebarMachines