import {CourierViewEntity, SimpleCourierEntity} from "types";
import React, {FormEvent, useEffect, useState} from "react";
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import {UnfinishedJobs} from "../components/layout/Login/UnfinishedJobs";
import {FinishedJobs} from "../components/layout/Login/FinishedJobs";
import "./LoginView.css";

export const LoginView = () => {
    const [form, setForm] = useState<Omit<SimpleCourierEntity, 'courierName' | 'category'>>({
        courierNumber: 111,
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [courierJobList, setCourierJobList] = useState<CourierViewEntity[] | null>(null);

    // const updateForm = (key: string, value: any) => {
    //     setForm(form => ({
    //         ...form,
    //         [key]: value,
    //     }));
    // };

    const refreshView = async () => {
        setCourierJobList(null);
        const res = await fetch('http://localhost:3001/login');
        const data = await res.json();
        setCourierJobList(data.courierViewList);
    };

    useEffect(() => {
        refreshView();
    }, []);

    const newJobForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //@TODO przenosić numer startowy jako JSON do API zamiast pobierać z useState
                body: JSON.stringify(form),
            });
            await refreshView();

        } finally {
            setLoading(false);
        }
    };

    if (courierJobList === null || loading) {
        return <Spinner/>;
    }

    return (
        <div className="jobs-wrapper">
            {/*@TODO zrobić pobieranie imienia i numeru zawodnika z logowania*/}
            {/*<div className="courier_name">NAME: <p>{courierJobList[0].courierName}</p></div>*/}
            {/*<div className="courier_number">NR: <p>{courierJobList[0].courierNumber}</p></div>*/}
            {/*<div className="courier_category">CATEGORY: <p>{courierJobList[0].category}</p></div>*/}

            <form onSubmit={newJobForm}>
                <div className="new-job-btn">
                    <button>NEW JOB</button>
                </div>
            </form>

            <h1>Unfinished Jobs</h1>
            <UnfinishedJobs jobs={courierJobList} onJobsChange={refreshView}/>

            <h2>Finished Jobs</h2>
            <FinishedJobs jobs={courierJobList} onJobsChange={refreshView}/>

        </div>
    )
}