import SidebarMachineItem from './SidebarMachineItem'

function SidebarMachineList({ Machines }) {
  return (
    <>
      {Machines.map((Machine) => (
        <SidebarMachineItem key={Machine.id} machine={Machine} />
      ))}
    </>
  )

}

export default SidebarMachineList