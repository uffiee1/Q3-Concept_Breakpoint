import { Link } from 'react-router-dom';
import React from 'react'

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand" style={{ marginLeft: "20px" }}>Q3</div>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Machines</Link>
          </li>
          <li className="nav-item">
            <Link to={{ pathname: "/ComponentPage", state: { id: -1 } }} className="nav-link">Componenten</Link>
          </li>
          <li className="nav-item">
            <Link to="/MaintenancePage" className="nav-link">Onderhoud</Link>
          </li>
        </ul>
      </div>
    </nav >
  )
}

export default NavBar