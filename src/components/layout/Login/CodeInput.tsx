import React, {FormEvent, useEffect, useState} from "react";
import {CourierViewEntity} from "types";
import './CodeInput.css';

interface Props {
    jobNumber: undefined | number;
    code: undefined | number;
}

export const CodeInput = (props: Props) => {
    const [form, setForm] = useState<Props>({
        //@TODO zrobić pobieranie numeru zadania z rodzica
        jobNumber: undefined,
        code: undefined,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [courierJobList, setCourierJobList] = useState<CourierViewEntity[] | null>(null);

    const refreshView = async () => {
        setCourierJobList(null);
        const res = await fetch('http://localhost:3001/login');
        const data = await res.json();
        setCourierJobList(data.courierViewList);
    };

    useEffect(() => {
        refreshView();
    }, []);

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
    };

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const codeValidation = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (Number(form.code) !== props.code) {
            alert('Wrong code');
        } else {
            alert('good!')
        }

        // try {
        // //@TODO zmienić API: na BE stworzyć url do pobierania kodu z konkretnego zadania i tutaj to wstawić
        //     const res = await fetch(`http://localhost:3001/login`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         // body: JSON.stringify(form.jobNumber),
        //         body: JSON.stringify(form),
        //     });
        //
        //     await refreshView();
        // } finally {
        //     setLoading(false);
        // }

    };

    return (
        <form onSubmit={codeValidation}>
            <label>
                <td className="code_td">
                    <input
                        type="number"
                        name={"code"}
                        value={form.code}
                        min={1000}
                        max={9999}
                        onChange={e => updateForm('code', e.target.value)}
                        // style={{backgroundColor: codeValidation()}}
                    />
                    <button>VERIFY</button>
                </td>
            </label>
        </form>
    )
};