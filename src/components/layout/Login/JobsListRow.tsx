import React, {FormEvent, useState} from 'react';
import {CourierViewEntity} from 'types';
import {CodeInput} from './CodeInput';
import './JobsListRow.css';

interface Props {
    job: CourierViewEntity;
    onJobsChange: () => void;
}

export const JobsListRow = (props: Props) => {

    //@TODO callback do przekazania do kodów: poprawny A włącza B, poprawny B aktualizuje finishedJob na 1 i ustawia kary na 0 albo włącza C, itd.
    //@TODO poprawić i uruchomić ten callback, zamiast tego wewnątrz CodeInput?
    // const updateFinishedA = async () => {
    //     await fetch(`http://localhost:3001/login/update/${props.job.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         //@TODO jak wbić tutaj boolean, że kod A jest poprawny
    //         body: JSON.stringify({
    //             finishedA: 1,
    //         })
    //     });
    // };


    return (
        <tr className="jobs" key={props.job.id}>
            <td>{props.job.jobNumber}</td>
            <td>{props.job.cp_a_name}</td>
            <CodeInput
                code={props.job.cp_a_code}
                id={props.job.id}
                finished={props.job.finishedA}
                // onCodeInput={updateFinishedA}
            />
            <td>{props.job.cp_b_name}</td>
            <CodeInput
                code={props.job.cp_b_code}
                id={props.job.id}
                finished={props.job.finishedB}
                // onCodeInput={updateFinishedB}
                // {/*@TODO zrobić disable input jeśli A nie jest poprawne*/}
                // isVisible={}
            />
            <td>{props.job.cp_c_name}</td>
            <td>{props.job.cp_c_code}</td>
            {/*
            <CodeInput
            code={props.job.cp_c_code}
            id={props.job.id}
            finished={props.job.finishedC}
            />
            */}
            <td>{props.job.jobPoints}</td>
            <td>{props.job.jobPenalties}</td>
            {/*<td>{props.job.finishedJob}</td>*/}
        </tr>
    );
};