import {CourierViewEntity, SimpleCourierEntity} from "types";
import React, {FormEvent, useEffect, useState} from "react";
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import {JobsList} from "../components/layout/Login/JobsList";
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

    console.log(courierJobList);

    return (
        <div className="jobs-wrapper">
<div>NAME: {courierJobList[0].courierName}</div>
<div>NR: {courierJobList[0].courierNumber}</div>

            <form onSubmit={newJobForm}>
                {/*<input*/}
                {/*    type="number"*/}
                {/*    value={form.courierNumber}*/}
                {/*    onChange={e => updateForm('courierNumber', e.target.value)}*/}
                {/*/>*/}
                <div className="new-job-btn">
                    <button>NEW JOB</button>
                </div>
            </form>

            {/*@TODO rozdzielić tabele na unfinished i finished jobs*/}
            <h1>Unfinished Jobs</h1>
            <JobsList jobs={courierJobList} onJobsChange={refreshView}/>
            <h2>Finished Jobs</h2>
        </div>
    )
}