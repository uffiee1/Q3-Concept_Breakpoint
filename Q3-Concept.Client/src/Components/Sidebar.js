import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sidebar_machine_info } from './sidebar_machine_info'
import './Sidebar.css';
import SideBarMachines from './SidebarMachines'


function Sidebar() {
  //Temp dummy array
    const [machinelist, setMachines] = useState([
      {
        id: 1,
        machineName: "Machine 11", 
      },
      {
        id: 2,
        machineName: "Machine 12", 
      },
      {
        id: 3,
        machineName: "Machine 13", 
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