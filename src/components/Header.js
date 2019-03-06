import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        OST Mappy Client
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu"
              aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="menu">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/custom">
              Custom
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </React.Fragment>
);

export default Header;
