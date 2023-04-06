import {CourierViewEntity, SimpleCourierEntity} from "types";
import React, {FormEvent, useEffect, useState} from "react";
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import {UnfinishedJobs} from "../components/layout/Login/UnfinishedJobs";
import {FinishedJobs} from "../components/layout/Login/FinishedJobs";
import "./LoginView.css";

export const LoginView = () => {
    // const [selected, setSelected] = useState<string>(selectedId);
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

    //@TODO funkcja do wyboru kuriera - API z BE
    const selectCourier = async (e: FormEvent) => {
    e.preventDefault();

    };

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
            {/*@TODO zrobić pobieranie imienia i numeru zawodnika z logowania/listy rozwijanej*/}
            <div className="courier_info">
                <form onSubmit={selectCourier}>
                    {/*<select value={selected} onChange={e => setSelected(e.target.value)}>*/}

                    {/*</select>*/}

                </form>

                <div className="courier_info">NAME:
                    {courierJobList[0] ?
                        <p>{courierJobList[0].courierName}</p>
                        : <p>select a courier first</p>
                    }
                </div>
                <div className="courier_info">NR:
                    {courierJobList[0] ?
                        <p>{courierJobList[0].courierNumber}</p>
                        : <p>select a courier first</p>
                    }
                </div>
                <div className="courier_info">CATEGORY:
                    {courierJobList[0] ?
                        <p>{courierJobList[0].category}</p>
                        : <p>select a courier first</p>
                    }
                </div>
                {/*//@TODO zrobić BE mysql SUM dla liczenia punktów (punkty - kary)*/}
                <div className="courier_points">POINTS:
                    {courierJobList[0] ?
                    <p>{courierJobList[0].jobPoints}</p>
                    : <p>select a courier first</p>
                    }
                </div>
            </div>

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