import { useEffect, useState } from 'react';
import SidebarMachineItem from './SidebarMachineItem'

function SidebarMachineList({ Machines }) {
  const [filteredMachines, setFilteredMachines] = useState([])
  const [filtered, setFiltered] = useState(true)

  function FilterMachines(machines) {
    machines.forEach(x => {
      if (x.statuses.length !== 0) {
        if (x.statuses[x.statuses.length - 1].description === "off") {
          filteredMachines.push(x);
        }
      }
    });
  }

  useEffect(() => {
    if (filtered) {
      setFiltered(false);
      FilterMachines(Machines)
    }
  })

  return (
    <>
      <h3 style={{ width: '150px' }}>Stilstaande machines</h3>
      {filteredMachines.map((Machine) => (
        <SidebarMachineItem key={Machine.id} machine={Machine} />
      ))}
    </>
  )

}

export default SidebarMachineList