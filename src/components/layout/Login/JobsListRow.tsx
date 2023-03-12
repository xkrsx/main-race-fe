import React from 'react';
import {CourierViewEntity} from 'types';

interface Props {
    job: CourierViewEntity;
    onJobsChange: () => void;
}

export const JobsListRow = (props: Props) => {
    return (
        <tr>
            <td>{props.job.jobNumber}</td>
            <td>{props.job.cp_a_name}</td>
            <td>{props.job.cp_a_code}</td>
            <td>{props.job.cp_b_name}</td>
            <td>{props.job.cp_b_code}</td>
            <td>{props.job.cp_c_name}</td>
            <td>{props.job.cp_c_code}</td>
            <td>{props.job.jobPoints}</td>
        </tr>
    );
};