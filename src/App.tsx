import React from 'react';
import './App.css';
import {Header} from "./components/layout/common/Header/Header";
import {Route, Routes} from "react-router-dom";
import {AccessView} from "./views/AccessView";
import {RaceView} from "./views/RaceView";

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/race" element={<AccessView/>}/>
                <Route path="/race/:courierNumber/:password" element={<RaceView/>}/>
                {/*<Route path="/results" element={<ResultsView/>}/>*/}
                {/*<Route path="/admin" element={<AdminView/>}/>*/}
            </Routes>
        </>
    )
};