import React, {FormEvent, useState} from "react";
import {Login} from "./Login";
import {Registration} from "./Registration";

import './AccessPanel.css';

export const AccessPanel = () => {
    const [isPreview, setIsPreview] = useState(true);

    const showLogIn = (e: FormEvent) => {
        e.preventDefault();
        setIsPreview(true)
    };

    const showRegistration = (e: FormEvent) => {
        e.preventDefault();
        setIsPreview(false)
    };

    return (
        <div className="App__Credentials">
            <p className="App__Credentials__Link"><a href="#" onClick={showLogIn}>log in</a> | <a
                href="#" onClick={showRegistration}>register</a>
            </p>
            {
                isPreview
                    ?
                    <Login/>
                    : <Registration/>
            }
        </div>
    )
}