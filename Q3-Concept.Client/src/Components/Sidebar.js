import '../css/Sidebar.css';

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import SidebarMachineList from './SidebarMachineList';

import Home from '../pages/Home';

import jQuery from 'jquery';

function Sidebar({productionlinearray = machinelist}) {

  return (
    <div className='side-menu'>
        <ul className='side-menu-items'>
            <SidebarMachineList Machines={productionlinearray} />
        </ul>
    </div>
  );
}

  //default dummy array
  const machinelist = [
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
  ];

export default Sidebar