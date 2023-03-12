import React from 'react';
import './App.css';
import {Header} from "./components/layout/common/Header/Header";
import {Route, Routes} from "react-router-dom";
import {LoginView} from "./views/LoginView";

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/login" element={<LoginView/>}/>
                {/*<Route path="/results" element={<ResultsView/>}/>*/}
                {/*<Route path="/admin" element={<AdminView/>}/>*/}
                {/*<Route path="/english" element={<EnglishView/>}/>*/}
            </Routes>
        </>
    )
};