import React, {FormEvent, useEffect, useState} from "react";
import {CourierViewEntity} from 'types';
import './CodeInput.css';

interface Props {
    code: undefined | number;
}

export const CodeInput = (props: Props) => {
    const [form, setForm] = useState<Props>({
        code: undefined,
    });
    const [loading, setLoading] = useState<boolean>(false);

    // const onUpdateField = (e: FormEvent) => {
    //     const nextFormState = {
    //         ...form,
    //         [key]: value,
    //     };
    //     setForm(nextFormState)
    // };

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        alert(JSON.stringify(form, null, 2));
    };

    // const [visible, setVisible] = useState(true);
    // const [courierJobList, setCourierJobList] = useState<CourierViewEntity[] | null>(null);
    //
    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    // const refreshView = async () => {
    //     setCourierJobList(null);
    //     const res = await fetch('http://localhost:3001/login');
    //     const data = await res.json();
    //     setCourierJobList(data.courierViewList);
    // };

    // useEffect(() => {
    //     refreshView();
    // }, []);

    // const codeApproved = () => {
    //     setVisible((prev) => !prev);
    // };

    // const codeForm = (e: FormEvent) => {
    //     e.preventDefault();
    //
    //     setLoading(true);
    //
    //     // if ((form.code_a).length >= 4) {
    //     if (form.code === props.code) {
    //         console.log('OK')
    //         setVisible((prev) => !prev);
    //         // codeApproved();
    //         //@TODO wywołanie funkcji zamieniającej number input na zielone OK :)
    //     }
    //     // }
    // };

    return (
        <form onSubmit={onSubmitForm}>
            <label>
                <td>
                    {/*{visible &&*/}
                    <input
                        type="number"
                        name={"code"}
                        value={form.code}
                        // onChange={onUpdateField}
                        min={1000}
                        max={9999}
                        onChange={e => updateForm('code', e.target.value)}
                    />

                    {/*}*/}
                </td>
            </label>
        </form>
    )
};