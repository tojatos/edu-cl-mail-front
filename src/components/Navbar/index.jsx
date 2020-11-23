import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { logUserOut } from '../../actions/userActions';
import './index.sass';

function Navbar() {
    // @ts-ignore
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    return (
        <nav className="navbar">
            <ul className="left">
                <li>
                <Link to="/">Strona główna</Link>
                </li>
                <li>
                <Link to="/about">O stronie</Link>
                </li>
            </ul>
            <ul className="right">
                <li>
                { userReducer.loggedIn ?
                <button onClick={() => dispatch(logUserOut())}>Logout {userReducer.user.login}</button>
                : <Link to="/login">Zaloguj się</Link>
                }
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
