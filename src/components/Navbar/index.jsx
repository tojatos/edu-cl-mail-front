import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './index.sass';

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                <Link to="/">Pobierz maile</Link>
                </li>
                <li>
                <Link to="/mailbox">Przeglądaj maile</Link>
                </li>
                <li>
                <Link to="/about">O stronie</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
