import React from "react";
import {Logo} from "./Logo";
import {Nav} from "./Nav";
import './Header.css';

export const Header = () => {
    return (
        <header>
            <Logo/>
            <Nav/>
        </header>
    )
};