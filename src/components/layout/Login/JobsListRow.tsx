import React from 'react';
import {CourierViewEntity} from 'types';
import {CodeInput} from './CodeInput';
import './JobsListRow.css';

interface Props {
    job: CourierViewEntity;
    onJobsChange: () => void;
}

export const JobsListRow = (props: Props) => {

        return (
            <tr className="jobs">
                <td>{props.job.jobNumber}</td>
                <td>{props.job.cp_a_name}</td>
                <CodeInput code={props.job.cp_a_code} jobNumber={props.job.jobNumber}></CodeInput>
                <td>{props.job.cp_b_name}</td>
                <CodeInput code={props.job.cp_b_code} jobNumber={props.job.jobNumber}></CodeInput>
                <td>{props.job.cp_c_name}</td>
                <td>{props.job.cp_c_code}</td>
                {/*<CodeInput code={props.job.cp_c_code} jobNumber={props.job.jobNumber}></CodeInput>*/}
                <td>{props.job.jobPoints}</td>
                <td>{props.job.jobPenalties}</td>
                <td>{props.job.finished}</td>
            </tr>
        )
            ;
    }
;