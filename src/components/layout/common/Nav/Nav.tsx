import React from "react";
import './Nav.css';
import {NavLink} from "react-router-dom";

export const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <a href="https://pcmc2023.pl/" target="_blank">Główna</a>
                </li>
                <li>
                    <NavLink to="/login">Logowanie</NavLink>
                </li>
                <li>
                    <NavLink to="/results">Wyniki</NavLink>
                </li>
                <li>
                    <NavLink to="/admin">Admin</NavLink>
                </li>
                <li>
                    <NavLink to="/english">English</NavLink>
                </li>
            </ul>
        </nav>
    )
};