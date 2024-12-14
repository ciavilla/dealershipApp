import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <NavLink to="/models" className="nav-link">Models</NavLink>
            </li>
            <li>
              <NavLink to="/models/create" className="nav-link">Create a Model</NavLink>
            </li>
            <li>
              <NavLink to="/manufacturers" className="nav-link">Manufacturers</NavLink>
            </li>
            <li>
              <NavLink to="/manufacturers/create/" className="nav-link">Create a Manufacturer</NavLink>
            </li>
            <li>
              <NavLink to="/automobiles" className="nav-link">Automobiles</NavLink>
            </li>
            <li>
              <NavLink to="/automobiles/create/" className="nav-link">Create a Automobile</NavLink>
            </li>
            <li>
              <NavLink to="/technicians/" className="nav-link">Technicians</NavLink>
            </li>
            <li>
              <NavLink to="/technicians/create/" className="nav-link">Add A Technician</NavLink>
            </li>
            <li>
              <NavLink to="/appointments/" className="nav-link">Service Appointments</NavLink>
            </li>
            <li>
              <NavLink to="/appointments/create/" className="nav-link">Create A Service Appointment</NavLink>
            </li>
            <li>
              <NavLink to="/servicehistory/" className="nav-link">Service History</NavLink>
            </li>
            <li>
              <NavLink to="/salespeople" className="nav-link">Salespeople</NavLink>
            </li>
            <li>
              <NavLink to="/salespeople/create/" className="nav-link">Add a Salesperson</NavLink>
            </li>
            <li>
              <NavLink to="/customers" className="nav-link">Customers</NavLink>
            </li>
            <li>
              <NavLink to="/customers/create/" className="nav-link">Add a Customer</NavLink>
            </li>
            <li>
              <NavLink to="/sales" className="nav-link">Sales</NavLink>
            </li>
            <li>
              <NavLink to="/sales/create/" className="nav-link">Add a Sale</NavLink>
            </li>
            <li>
              <NavLink to="/sales/history/" className="nav-link">Salesperson History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
