import {CourierViewEntity} from "types";
import React, {FormEvent, useEffect, useState} from "react";
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import {UnfinishedJobs} from "../components/layout/Race/UnfinishedJobs";
import {FinishedJobs} from "../components/layout/Race/FinishedJobs";
import "./AccessView.css";
import {useParams} from "react-router-dom";

export const RaceView = () => {
    const {courierNumber, password} = useParams();

    // const [selected, setSelected] = useState<string>(selectedId);
    // const [form, setForm] = useState<Omit<SimpleCourierEntity, 'courierName' | 'category'>>({
    //     courierNumber: 111,
    // });

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
        const res = await fetch(`http://localhost:3001/race/${courierNumber}`);
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
            const res = await fetch(`http://localhost:3001/race`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //@TODO przenosić numer startowy jako JSON do API zamiast pobierać z useState
                body: JSON.stringify({courierNumber: courierNumber}),
            });
            console.log(res)
            await refreshView();

        } finally {
            setLoading(false);
        }
    };

    if (courierJobList === null || loading) {
        return <Spinner/>;
    }

    // @TODO: poprawić czytanie danych kuriera z bazy couriers po logowaniu
    return (
        <div className="jobs-wrapper">
            <div className="courier_info">
                <div className="courier_info">NAME:
                    {courierJobList[0] ?
                        <p>{courierJobList[0].courierName}</p>
                        : <p>click Race in menu to log in</p>
                    }
                </div>
                <div className="courier_info">NR:
                    {courierJobList[0] ?
                        <p>{courierJobList[0].courierNumber}</p>
                        : <p>click Race in menu to log in</p>
                    }
                </div>
                <div className="courier_info">CATEGORY:
                    {courierJobList[0] ?
                        <p>{courierJobList[0].category}</p>
                        : <p>click Race in menu to log in</p>
                    }
                </div>
                {/*//@TODO zrobić BE mysql SUM dla liczenia punktów (punkty - kary)!*/}
                <div className="courier_points">POINTS:
                    {courierJobList[0] ?
                        <p>{courierJobList[0].jobPoints}</p>
                        : <p>click Race in menu to log in</p>
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