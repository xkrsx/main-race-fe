import React, {FormEvent, useEffect, useState} from "react";
import {CourierViewEntity} from 'types';
import './CodeInput.css';

interface Props {
    code: undefined | number;
}

export const CodeInput = (props: Props) => {
    const [form, setForm] = useState<Props>({
            code: undefined,
        })
    ;
    const [visible, setVisible] = useState(true);
    const [courierJobList, setCourierJobList] = useState<CourierViewEntity[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const refreshView = async () => {
        setCourierJobList(null);
        const res = await fetch('http://localhost:3001/login');
        const data = await res.json();
        setCourierJobList(data.courierViewList);
    };

    useEffect(() => {
        refreshView();
    }, []);

    const codeApproved = () => {
        setVisible((prev) => !prev);
    };

    const codeForm = (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        // if ((form.code_a).length >= 4) {
        if (form.code === props.code) {
            console.log('OK')
            setVisible((prev) => !prev);
            // codeApproved();
            //@TODO wywołanie funkcji zamieniającej number input na zielone OK :)
        }
        // }
    };

    return (
        <form onSubmit={codeForm}>
            <label>
                <td>
                    {visible && (
                        <input
                            type="number"
                            min={1000}
                            max={9999}
                            value={form.code}
                            onChange={e => updateForm('code', e.target.value)}
                        />
                    )}
                </td>
            </label>
        </form>
    )
};