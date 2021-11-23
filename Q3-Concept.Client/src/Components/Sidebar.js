import '../css/Sidebar.css';

import SidebarMachineList from './SidebarMachineList';

function Sidebar({ productionlinearray }) {

  return (
    <div className='side-menu'>
      <ul className='side-menu-items'>
        <SidebarMachineList Machines={productionlinearray} />
      </ul>
    </div>
  );
}

export default Sidebar