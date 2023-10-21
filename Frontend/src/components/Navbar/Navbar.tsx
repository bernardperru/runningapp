import React from 'react';
import "./Navbar.css";
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <nav>
        <Link to="/" className="title">Home</Link>
        <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>          
            <li>
                <NavLink to="/activities">activities</NavLink>
            </li>
            <li>
                <NavLink to="/weekly">weekly</NavLink>
            </li>
        </ul>
    </nav>
    );
}

export default Navbar;