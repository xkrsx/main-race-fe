import React from 'react';
import {CourierViewEntity} from 'types';
import {CodeInputA} from './CodeInputA';
import {CodeInputB} from "./CodeInputB";
import './JobsListRow.css';

interface Props {
    codeA: undefined | number;
    codeB: undefined | number;
    id: undefined | string;
    finishedA: any;
    finishedB: any;
    job: CourierViewEntity;
    onJobsChange: () => void;
}

export const JobsListRow = (props: Props) => {
    return <tr className="jobs" key={props.job.id}>
        <td>{props.job.jobNumber}</td>
        <td>{props.job.cp_a_name}</td>
        <CodeInputA
            code={props.job.cp_a_code}
            id={props.job.id}
            finishedA={props.job.finishedA}
        />
        <td>{props.job.cp_b_name}</td>

        {(props.finishedA.data[0]) ?
            (<CodeInputB
                code={props.job.cp_b_code}
                id={props.job.id}
                finishedB={props.job.finishedB}
                onUpdate={props.onJobsChange}
            />)
            : (<div className="code-input-disabled">
                    <strong>X</strong>
                </div>
            )
        }

        {/*if props.job.finishedA === 0 > finishedB input disabled*/}
        {/*if props.job.finishedB === 1 */}
        {/*{ finishedB === 0 && onCodeInput={updateFinishedB} }*/}
        {/*@TODO zrobić disable input jeśli A nie jest poprawne*/}

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
}