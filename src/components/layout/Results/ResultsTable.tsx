import React from 'react';
import { ResultEntity } from "types";
import {ResultsTableRow} from "./ResultsTableRow";

interface Props {
    resultsList: ResultEntity[];
}

export const ResultsTable = (props: Props) => {
    return (
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
            {
                props.resultsList.map((result, index) => (
                    <ResultsTableRow
                        index={index}
                        key={result.courierId}
                        result={result}
                    />
                ))
            }
            </tbody>

        </table>
    )

}

