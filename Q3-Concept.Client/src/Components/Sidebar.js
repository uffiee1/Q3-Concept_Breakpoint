import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import SideBarMachines from './SidebarMachines'


function Sidebar() {
  //Temp dummy array
    const [machinelist, setMachines] = useState([
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

    const [sidebar] = useState(false)

    return (

        <>
            <div className='sidebar'>
                <Link to='#' className='menu-bars'>
                </Link>
            </div>
            <nav className = 'side-menu'>
              <ul className = 'side-menu-items'>
                <SideBarMachines Machines= {machinelist}/>
              </ul>
              
            </nav>
        </>
    );
}

export default Sidebar