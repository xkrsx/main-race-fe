import React, {useEffect, useState} from "react";
import './ResultsView.css';
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import {ResultsTable} from "../components/layout/Results/ResultsTable";
import Countdown from "react-countdown";

export const ResultsView = () => {
    const [raceResults, setRaceResults] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const showRaceResults = async () => {
        setRaceResults(null);
        const res = await fetch(`http://localhost:3001/results`);
        const data = await res.json();
        setRaceResults(data.raceResults);
    };

    useEffect(() => {
        showRaceResults();
    }, []);

    setInterval(() => {
        showRaceResults()
    }, 1000 * 60 * 5);

    if (raceResults === null || loading) {
        return <Spinner/>;
    }

    return (<>
        <div className="results-title">
            <h1>Results</h1>
            <h3>
                Live updated in <Countdown
                date={Date.now() + 1000 * 60 * 5}
            />
            </h3>
        </div>
        <ResultsTable resultsList={raceResults}/>
    </>)
}