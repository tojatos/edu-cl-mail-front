import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { logUserOut } from '../../actions/userActions';
import './index.sass';

function Navbar() {
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    return (
        <nav className="navbar">
            <ul className="left">
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
            <ul className="right">
                <li>
                { userReducer.loggedIn ?<button onClick={() => dispatch(logUserOut())}>Logout {userReducer.user.login}</button> : "" }
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
