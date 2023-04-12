import React from 'react';
import {ResultEntity} from 'types';


interface Props {
    result: ResultEntity;
    index: number;
}

export const ResultsTableRow = (props: Props) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.result.courierNumber}</td>
            <td>{props.result.courierName}</td>
            <td>{props.result.category}</td>
            <td>{props.result.courierPoints}</td>
            <td>{props.result.courierPenalties}</td>
            <td>{props.result.sum}</td>
        </tr>
    )

}