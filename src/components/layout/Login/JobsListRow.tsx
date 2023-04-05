import React, {FormEvent, useState} from 'react';
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

interface Form {
    code: undefined | number;
}

export const JobsListRow = (props: Props) => {
    const [form, setForm] = useState<Form>({
        code: undefined,
    });
    const [isCorrectCode, setIsCorrectCode] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const codeValidation = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        //@TODO na potem: sprawdzenie czy nie ma checkpointu C: else if
        if (Number(form.code) === props.codeB) {
            setIsCorrectCode(true);

            try {
                await fetch(`http://localhost:3001/login/finishedB/${props.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({finishedB: 1, jobPenalties: 0, finishedJob: 1}),
                });
            } finally {
            //@TODO odświeżanie pojedynczego wersa?
                setLoading(false);
            }
        }
    };


    return (
        <tr className="jobs" key={props.job.id}>
            <td>{props.job.jobNumber}</td>
            <td>{props.job.cp_a_name}</td>
            <CodeInputA
                code={props.job.cp_a_code}
                id={props.job.id}
                finishedA={props.job.finishedA}
            />
            <td>{props.job.cp_b_name}</td>
            <CodeInputB
                code={props.job.cp_b_code}
                id={props.job.id}
                finishedB={props.job.finishedB}
                onUpdate={props.onJobsChange}
                onValidation={codeValidation}
            />
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
    );
};