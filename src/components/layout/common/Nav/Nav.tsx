import React from "react";
import './Nav.css';
import {NavLink} from "react-router-dom";

export const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <a href="https://pcmc2023.pl/" target="_blank">Home</a>
                </li>
                <li>
                    <NavLink to="/login">Race</NavLink>
                </li>
                <li>
                    <NavLink to="/results">Results</NavLink>
                </li>
                <li>
                    <NavLink to="/admin">Admin</NavLink>
                </li>
                {/*<li>*/}
                {/*    <NavLink to="/polish">Polish</NavLink>*/}
                {/*</li>*/}
            </ul>
        </nav>
    )
};