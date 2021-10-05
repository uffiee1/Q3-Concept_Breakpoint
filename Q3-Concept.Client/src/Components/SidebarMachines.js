import Sidebar_machine_info  from './Sidebar_machine_info'
import {PropTypes} from 'react'

const SidebarMachines = ({ Machines }) => {
  return (
    <>
      {Machines.map((Machine) => (
        <Sidebar_machine_info key={Machine.id} machine={Machine} />
        ))}
    </>
  )

}

SidebarMachines.defaultProps={
  Machines: []

}

export default SidebarMachines