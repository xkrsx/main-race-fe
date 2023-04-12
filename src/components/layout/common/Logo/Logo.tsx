import gryf from "../../../../assets/img/gryf-trans.png";
import napis from "../../../../assets/img/pcmc-napis-trans.png";
import React from "react";
import './Logo.css';

export const Logo = () => {
    return (
        <div className="logo">
            <img className="gryf" src={gryf} alt="Logo gryf"/>
            <img className="napis" src={napis} alt="Logo napis PCMC 2023 Szczecin"/>
        </div>
    )
};