import SidebarMachineInfo  from './SidebarMachineInfo'

const SidebarMachines = ({ Machines }) => {
  return (
    <>
      {Machines.map((Machine) => (
        <SidebarMachineInfo key={Machine.id} machine={Machine} />
        ))}
    </>
  )

}

SidebarMachines.defaultProps={
  Machines: []

}

export default SidebarMachines