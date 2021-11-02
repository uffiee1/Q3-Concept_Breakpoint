import '../css/Sidebar.css';

import SidebarMachineList from './SidebarMachineList';

// import React, { useEffect, useState } from 'react';


function Sidebar({ productionlinearray }) {

  return (
    <div className='side-menu'>
      <ul className='side-menu-items'>
        <SidebarMachineList Machines={productionlinearray} />
      </ul>
    </div>
  );
}

//default dummy array
// const machinelist = [
//   {
//     id: 1,
//     machineName: "Machine 11",
//     path: '/',
//     status: 'active',
//   },
//   {
//     id: 2,
//     machineName: "Machine 12",
//     path: '/',
//     status: 'inactive'
//   },
//   {
//     id: 3,
//     machineName: "Machine 13",
//     path: '/',
//     status: 'maintenance'
//   },
//   {
//     id: 4,
//     machineName: "Machine 14",
//     path: '/',
//     status: 'requires-maintance'
//   }
// ];

export default Sidebar