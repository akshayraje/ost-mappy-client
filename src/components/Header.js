import React from 'react';
import {Link} from "react-router-dom";

const Header = () => (
    <React.Fragment>
        <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">OST Mappy Client</Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
            </ul>
        </nav>
    </React.Fragment>
);

export default  Header;
