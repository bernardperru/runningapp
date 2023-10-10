import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    return (<nav>
        <Link to="/">Website</Link>
        <ul>
            <li>
                <Link to="/activities">activities</Link>
            </li>
            <li>
                <Link to="/weekly">Services</Link>
            </li>
        </ul>
    </nav>);
}

export default Navbar;