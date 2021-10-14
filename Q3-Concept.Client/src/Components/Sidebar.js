import './Sidebar.css';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import SideBarMachines from './SidebarMachines'

function Sidebar() {
  //Temp dummy array
  const [machinelist] = useState([
    {
      id: 1,
      machineName: "Machine 11",
      path: '/',
      status: 'active',
    },
    {
      id: 2,
      machineName: "Machine 12",
      path: '/',
      status: 'inactive'
    },
    {
      id: 3,
      machineName: "Machine 13",
      path: '/',
      status: 'maintenance'
    },
    {
      id: 4,
      machineName: "Machine 14",
      path: '/',
      status: 'requires-maintance'
    }
  ]);

  return (
    <div className='side-menu'>
        <ul className='side-menu-items'>
            <SideBarMachines Machines={machinelist} />
        </ul>
    </div>
  );
}

export default Sidebar