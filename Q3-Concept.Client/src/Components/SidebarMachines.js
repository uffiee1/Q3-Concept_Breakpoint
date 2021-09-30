import { sidebar_machine_info } from './sidebar_machine_info'
import {PropTypes} from 'react'

const SidebarMachines = ({Machines}) => {
  return (
    <li>
      {Machines.map((Machine) => (Machine))}
    </li>
  )

}

SidebarMachines.defaultProps={
  Machines: []

}

export default SidebarMachines

// {SidebarData.map((Machine, index) => {
//   return (
//       <li>

//       </li>
//   );
// })}