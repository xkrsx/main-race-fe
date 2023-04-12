import React from 'react';
import {CourierViewEntity} from 'types';
import {CodeInputA} from './CodeInputA';
import {CodeInputB} from "./CodeInputB";
import './JobsListRow.css';

interface Props {
    job: CourierViewEntity;
    codeA: undefined | number;
    codeB: undefined | number;
    id: undefined | string;
    finishedA: any;
    finishedB: any;
    onJobsChange: () => void;
}

export const JobsListRow = (props: Props) => <tr className="jobs" key={props.job.id}>
    <td>{props.job.jobNumber}</td>
    <td>{props.job.cp_a_name}</td>
    <CodeInputA
        code={props.job.cp_a_code}
        id={props.job.id}
        finishedA={props.job.finishedA}
        onUpdate={props.onJobsChange}
    />
    <td>{props.job.cp_b_name}</td>

    {(props.finishedA.data[0]) ?
        (<CodeInputB
            courierNumber={props.job.courierNumber}
            code={props.job.cp_b_code}
            id={props.job.id}
            finishedB={props.job.finishedB}
            points={props.job.jobPoints}
            jobPenalties={props.job.jobPenalties}
            onUpdate={props.onJobsChange}
        />)
        : (<div className="code-input-disabled">
                <strong>X</strong>
            </div>
        )
    }

    {/*<td>{props.job.cp_c_name}</td>*/}
    {/*<td>{props.job.cp_c_code}</td>*/}
    {/*
            <CodeInputC
            code={props.job.cp_c_code}
            id={props.job.id}
            finished={props.job.finishedC}
            />
            */}
    <td>{props.job.jobPoints}</td>
    <td>{props.job.jobPenalties}</td>
</tr>
