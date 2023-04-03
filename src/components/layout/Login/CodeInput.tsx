import React, {FormEvent, useState} from "react";
import './CodeInput.css';

interface Props {
    code: undefined | number;
    id: undefined | string;
    finished: boolean;
}

interface Form {
    code: undefined | number;
}

export const CodeInput = (props: Props) => {
    const [form, setForm] = useState<Form>({
        code: undefined,
    });
    const [isCorrectCode, setIsCorrectCode] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    // @TODO odczytywać czy zadanie jest wykonane
    // if (props.finished) {
    //     setIsCorrectCode(true);
    // }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const codeValidation = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (Number(form.code) === props.code) {
            setIsCorrectCode(true);

            //@TODO przenieść zapisywanie do JobsListRow
            try {
                await fetch(`http://localhost:3001/login/finishedA/${props.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({finishedA: 1}),
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (<td className="code_td">
            {
                isCorrectCode
                    ? <div className="correct_code">
                        <p>OK!</p>
                    </div>
                    : <div className="incorrect_code">
                        <form onSubmit={codeValidation}>
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