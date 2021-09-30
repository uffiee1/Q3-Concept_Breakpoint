import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sidebar_machine_info } from './sidebar_machine_info'
import { SideBarMachines} from './SidebarMachines'
import './Sidebar.css';

// const SideBarMachines = () => {
//     const [Si]
// }

function Sidebar() {
    const [SidebarMachines, setMachines] = useState([
      {
        machineName: "Machine 12", 
      },
      {
        machineName: "Machine 13", 
      },
      {
        machineName: "Machine 14", 
      }
    ]);

    const [sidebar] = useState(false)

    return (

        <>
            <div className='sidebar'>
                <Link to='#' className='menu-bars'>
                </Link>
            </div>
            <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
                <ul className='side-menu-items'>
                  {/* <SidebarMachines Machines= {SidebarMachines} /> */}
                </ul>
            </nav>
        </>
    );
}

export default Sidebar

//     <div>
//         <div className = 'sidebar' >
//         <Link to = '#' className = 'menu-bars' >
//             </Link> </div> 
//             <nav className = { sidebar ? 'side-menu active' : 'side-menu' }>
//         <ul className = 'side-menu-items'>
//         <li> 
//             {
//             SidebarData.map((item, index) => { 
//                 <span key = { index }>
//                     <h1> { item.title } </h1> </
//                 span >
//             })
//         } <
//         /li> < /
//         ul >

//         <
//         /nav> 
//         </div>
//     );
// }

// export default Sidebar