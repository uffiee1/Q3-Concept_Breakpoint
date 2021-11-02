import SidebarMachineItem from './SidebarMachineItem'

const SidebarMachineList = ({ Machines }) => {
  return (
    <>
      {Machines.map((Machine) => (
        <SidebarMachineItem key={Machine.id} machine={Machine} />
      ))}
    </>
  )

}

SidebarMachineList.defaultProps = {
  Machines: []

}

export default SidebarMachineList