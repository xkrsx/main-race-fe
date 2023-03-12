import {CourierViewEntity} from "types";
import React, {useEffect, useState} from "react";
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import {JobsList} from "../components/layout/Login/JobsList";

export const LoginView = () => {
    const [courierJobList, setCourierJobList] = useState<CourierViewEntity[] | null>(null);

    const refreshView = async () => {
        setCourierJobList(null);
        const res = await fetch('http://localhost:3001/login');
        const data = await res.json();
        setCourierJobList(data.courierViewList);
    };

    useEffect(() => {
        refreshView();
    }, []);

    if (courierJobList === null) {
        return <Spinner/>;
    }

    return <>
        <h1>List of jobs</h1>
        <JobsList jobs={courierJobList} onJobsChange={refreshView}/>
    </>
}