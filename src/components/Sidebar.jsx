import { NavLink } from "react-router-dom";



function Sidebar() {

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>OCEANSYNC</h2>
        <span>POLAR OCEAN MONITORING</span>
      </div>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Overview
        </NavLink>

        <NavLink
          to="/live-map"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Live Map
        </NavLink>

        <NavLink
          to="/sensor-data"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Sensor Data
        </NavLink>

        
        <NavLink to="/alerts">Alerts</NavLink>

        <NavLink to="/reports">Reports</NavLink>

        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
