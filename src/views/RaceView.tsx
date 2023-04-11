import {CourierViewEntity} from "types";
import React, {useEffect, useState} from "react";
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import {UnfinishedJobs} from "../components/layout/Race/UnfinishedJobs";
import {FinishedJobs} from "../components/layout/Race/FinishedJobs";
import "./AccessView.css";
import {useParams} from "react-router-dom";
import {useFormik} from "formik";
import {AccessPanel} from "../components/layout/AccessPanel/AccessPanel";

export const RaceView = () => {
    const {courierNumber, password} = useParams();
    const [credentials, setCredentials] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [courierJobList, setCourierJobList] = useState<CourierViewEntity[] | null>(null);

    const validateCredentials = async () => {
        const res = await fetch(`http://localhost:3001/login/${courierNumber}/${password}`);
        const data = await res.json();

        if (data.loginView === true) {
            await refreshView();
        } else {
            setCredentials(false);
        }
    };

    const refreshView = async () => {
        setCourierJobList(null);
        const res = await fetch(`http://localhost:3001/race/${courierNumber}`);
        const data = await res.json();
        setCourierJobList(data.courierViewList);
    };

    useEffect(() => {
        validateCredentials();
        refreshView();
    }, []);

    const jobCount = () => {
        if (courierJobList !== null) {
            const unfinishedJobs = courierJobList.filter(job => job.finishedJob === 0);
            return unfinishedJobs.length;
        }
    };

    const formikNewJob = useFormik({
        initialValues: {},
        onSubmit: async (values) => {
            setLoading(true);

            try {
                const res = await fetch(`http://localhost:3001/race`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({courierNumber: courierNumber}),
                });
                await refreshView();
            } finally {
                setLoading(false);
            }
        }
    });

    if (courierJobList === null || loading) {
        return <Spinner/>;
    }

    return (
        !credentials ?
            <AccessPanel/>
            : (
                <div className="jobs-wrapper">
                    {/*//@TODO zrobić jeden komponent dla pojedynczych informacji o kurierach*/}
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
                        {/*//@TODO zrobić BE mysql SUM dla liczenia punktów (punkty - kary), który się odświeża wraz z odświeżeniem listy zadań!*/}
                        <div className="courier_points">POINTS:
                            {courierJobList[0] ?
                                <p>{courierJobList[0].jobPoints}</p>
                                : <p>click Race in menu to log in</p>
                            }
                        </div>
                    </div>

                    {Number(jobCount()) < 5 ?
                        (<form onSubmit={formikNewJob.handleSubmit}>
                            <div className="new-job-btn">
                                <button>OPEN NEW JOB</button>
                            </div>
                        </form>)
                        : (<div className="new-job-btn">
                            <button>MAX 5 OPEN JOBS!</button>
                        </div>)
                    }

                    <h1>Unfinished Jobs</h1>
                    <UnfinishedJobs jobs={courierJobList} onJobsChange={refreshView}/>

                    <h2>Finished Jobs</h2>
                    <FinishedJobs jobs={courierJobList} onJobsChange={refreshView}/>
                </div>
            )
    )
}