import React, {useEffect, useState} from "react";
import './CodeInput.css';
import {FormikErrors, useFormik} from "formik";

interface Props {
    code: undefined | number;
    id: undefined | string;
    finishedA: any;
    onUpdate: () => void;
}

interface Values {
    code: undefined | number;
}

const validate = (values: Values) => {
    const errors: FormikErrors<{ [field: string]: any }> = {};
    if (values.code === undefined) {
        errors.courierNumber = 'Required.';
    } else if (values.code < 1000) {
        errors.code = 'Code must be higher than 1000.';
    } else if (values.code > 9999) {
        errors.code = 'Code must be lower than 9999.';
    }

    return errors;
}

export const CodeInputA = (props: Props) => {
    const [isCorrectCode, setIsCorrectCode] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (props.finishedA.data[0] === 1) {
            setIsCorrectCode(true);
        }
    }, []);

    const formikCodeInput = useFormik({
        initialValues: {
            code: undefined,
        },
        validate,
        onSubmit: async (values) => {
            setLoading(true);

            if (Number(formikCodeInput.values.code) === props.code) {
                setIsCorrectCode(true);

                try {
                    await fetch(`http://localhost:3001/race/finishedA/${props.id}`, {
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
        }
    });
    const refreshView = () => {
        setTimeout(() => {
            props.onUpdate();
        }, 500);

    }

    return (<td className="code_td">
            {
                isCorrectCode
                    ? <div className="correct_code">
                        <p>OK!</p>
                    </div>
                    : <div className="incorrect_code">
                        <form onSubmit={formikCodeInput.handleSubmit}>
                            <label>
                                <input
                                    type="number"
                                    name={"code"}
                                    value={formikCodeInput.values.code}
                                    min={1000}
                                    max={9999}
                                    onChange={formikCodeInput.handleChange}
                                />
                                <button onClick={() => refreshView()}>VERIFY</button>
                            </label>
                        </form>
                    </div>
            }
        </td>
    )
};