import React, {FormEvent, useEffect, useState} from "react";
import './CodeInput.css';

interface Props {
    code: undefined | number;
    id: undefined | string;
    finishedB: any;
    //refreshes view in LoginView
    onUpdate: () => void;
}

interface Form {
    code: undefined | number;
}

export const CodeInputB = (props: Props) => {
    const [form, setForm] = useState<Form>({
        code: undefined,
    });
    const [isCorrectCode, setIsCorrectCode] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (props.finishedB.data[0] === 1) {
            setIsCorrectCode(true);
        }
    }, []);

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
        if (Number(form.code) === props.code) {
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
                props.onUpdate();
                setLoading(false);
            }
        }
    };

    const onSubmit = () => {
        // codeValidation();
        props.onUpdate();
    }

    return (<td className="code_td">
            {
                isCorrectCode
                    ? <div className="correct_code">
                        <p>OK!</p>
                    </div>
                    : <div className="incorrect_code">
                        <form onSubmit={() => onSubmit}>
                            <label>
                                <input
                                    type="number"
                                    name={"code"}
                                    value={form.code}
                                    min={1000}
                                    max={9999}
                                    onChange={e => updateForm('code', e.target.value)}
                                />
                                <button>VERIFY</button>
                            </label>
                        </form>
                    </div>
            }
        </td>
    )
};