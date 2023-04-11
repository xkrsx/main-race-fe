import React, {useEffect, useState} from "react";
import './ResultsView.css';
import {useFormik} from "formik";
import {ResultsListRow} from "../components/layout/Results/ResultsListRow";

export const ResultsView = () => {
    const [raceResults, setRaceResults] = useState(null);

    const formikResults = useFormik({
        initialValues: {},
        onSubmit: async (values) => {
            const showRaceResults = async () => {
                setRaceResults(null);
                const res = await fetch(`http://localhost:3001/results`);
                const data = await res.json();
                setRaceResults(data.raceResults);
            };
        }
    });

    const results = raceResults.map(result =>
        <ResultsListRow
            key={result.id}
            number={result.courierNumber}
            name={result.courierName}
            category={result.category}
            points={result.points}
            penalties={result.penalties}
        />)

            return (<>
                <div className="results-title">
                    <h1>Results</h1>
                    <h3>Live updated</h3>
                </div>
                <form>


                </form>

                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Points</th>
                        <th>Penalties</th>
                        <th>Sum</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>

                </table>
            </>
            )
            }
