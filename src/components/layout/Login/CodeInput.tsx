import React, {FormEvent, useState} from "react";
import './CodeInput.css';

interface Props {
    code: undefined | number;
}

export const CodeInput = (props: Props) => {
    const [form, setForm] = useState<Props>({
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

        // @TODO zapisanie TRUE w bazie
        if (Number(form.code) === props.code) {
            setIsCorrectCode(true);
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
                                    // style={{backgroundColor: codeValidation()}}
                                />
                                <button>VERIFY</button>
                            </label>
                        </form>
                    </div>
            }
        </td>
    )
};