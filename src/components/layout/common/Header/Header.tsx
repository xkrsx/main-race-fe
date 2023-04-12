import React from "react";
import './Header.css';
import {Nav} from "../Nav/Nav";
import {Logo} from "../Logo/Logo";

export const Header = () => {
    return (
        <>
            <Logo/>
            <Nav/>
        </>
    )
};