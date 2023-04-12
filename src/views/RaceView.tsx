import React, {useEffect, useState} from "react";
import {CourierViewEntity} from "types";
import {useParams} from "react-router-dom";
import {useFormik} from "formik";
import {AccessPanel} from "../components/layout/AccessPanel/AccessPanel";
import {UnfinishedJobs} from "../components/layout/Race/UnfinishedJobs";
import {FinishedJobs} from "../components/layout/Race/FinishedJobs";
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import "./RaceView.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRotateRight} from '@fortawesome/free-solid-svg-icons'

export const RaceView = () => {
    const {courierNumber, password} = useParams();
    const [courierJobList, setCourierJobList] = useState<CourierViewEntity[] | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    //@TODO pobieranie podstawowych danych o kurierze do sekcji info
    const validateCredentials = async () => {
        const res = await fetch(`http://localhost:3001/login/${courierNumber}/${password}`);
        const data = await res.json();

        if (data.loginView === true) {
            await refreshView();
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
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
        !(isCorrect) ?
            <AccessPanel/>
            : (
                <div className="jobs-wrapper">
                    {/*//@TODO zrobić jeden komponent dla pojedynczych informacji o kurierach*/}
                    {/*//@TODO poprawić wyświetlanie: jeśli dane logowania są poprawne, dodać komunikat, o tym, żeby kliknąć przycisk dodaj nowe zadanie */}
                    <div className="courier_info">
                        {/*<CourierInfo info={courierName}/>*/}
                        {/*<CourierInfo info={courierNumber}/>*/}
                        {/*<CourierInfo info={category}/>*/}
                        {/*<CourierInfo info={courierPoints}/>*/}
                        {/*<CourierInfo info={courierPenalties}/>*/}
                        {/*<CourierInfo info={courierPoints} info={courierPenalties}/>*/}

                        <div className="courier_info">NAME:
                            {courierJobList[0] ?
                                <p>{courierJobList[0].courierName}</p>
                                : <p>click Race in menu to log in</p>
                            }
                        </div>
                        <div className="courier_info">NR:
                            {courierJobList[0] ?
                                <p>{courierNumber}</p>
                                : <p>click Race in menu to log in</p>
                            }
                        </div>
                        <div className="courier_info">CATEGORY:
                            {courierJobList[0] ?
                                <p>{courierJobList[0].category}</p>
                                : <p>click Race in menu to log in</p>
                            }
                        </div>
                        <div className="courier_points">POINTS:
                            {courierJobList[0] ?
                                <p>{courierJobList[0].courierPoints}</p>
                                : <p>click Race in menu to log in</p>
                            }
                        </div>
                        <div className="courier_penalties">POINTS:
                            {courierJobList[0] ?
                                <p>{courierJobList[0].courierPenalties}</p>
                                : <p>click Race in menu to log in</p>
                            }
                        </div>
                        <div className="courier_sum">SUM:
                            {courierJobList[0] ?
                                <p>{courierJobList[0].courierPoints - courierJobList[0].courierPenalties}</p>
                                : <p>click Race in menu to log in</p>
                            }
                        </div>
                    </div>
                    <div className="new-job-btn">
                        {Number(jobCount()) < 5 ?
                            (<div>
                                <form onSubmit={formikNewJob.handleSubmit}>
                                    <div>
                                        <button>OPEN NEW JOB
                                            (
                                            {5 - Number(jobCount())}
                                            )
                                        </button>

                                    </div>
                                </form>
                            </div>)
                            : (<div>
                                <button>MAX 5 OPEN JOBS!</button>
                            </div>)
                        }
                        <form>
                            <div className="refresh-btn">
                                <button><FontAwesomeIcon icon={faArrowRotateRight}/> refresh list
                                </button>
                            </div>
                        </form>
                    </div>

                    <h1>Unfinished Jobs</h1>
                    <UnfinishedJobs jobs={courierJobList} onJobsChange={refreshView}/>

                    <h2>Finished Jobs</h2>
                    <FinishedJobs jobs={courierJobList} onJobsChange={refreshView}/>
                </div>
            )
    )
}