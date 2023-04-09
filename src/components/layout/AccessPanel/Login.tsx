import React, {FormEvent, useState} from "react";
import {FormikErrors, useFormik} from "formik";


interface Values {
    courierNumber: number | undefined;
    password: number | undefined;
}

export const Login = () => {
    const [isPwdPreview, setIsPwdPreview] = useState(false);
    const [checkLoginBox, setCheckLoginBox] = useState({
        display: 'none',
        backgroundColor: '',
        text: '',
    });

    const validate = (values: Values) => {
        const errors: FormikErrors<{ [field: string]: any }> = {};
        if (values.courierNumber === undefined) {
            errors.courierNumber = 'Required.';
        } else if (values.courierNumber < 1) {
            errors.courierNumber = 'Courier number must be higher than 1.';
        } else if (values.courierNumber > 999) {
            errors.courierNumber = 'Courier number must be lower than 1000.';
        }

        if (values.password === undefined) {
            errors.password = 'Required';
        } else if (values.password < 1000) {
            errors.password = 'Password must have 4 digits and be higher than 1000.';
        } else if (values.password > 9999) {
            errors.password = 'Password must have 4 digits and be lower than 9999';
        }
        return errors;
    };

    const {display, backgroundColor, text} = checkLoginBox;

    const formikLogin = useFormik({
        initialValues: {
            courierNumber: undefined,
            password: undefined,
        },
        validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            //@TODO funkcja która waliduje login z DB, podaje że jest niepoprawny albo przekierowuje dalej
            window.location.replace(`/race/${values.courierNumber}/${values.password}`);

            setCheckLoginBox({
                display: 'block',
                backgroundColor: 'green',
                text: 'Successfully logged in!',
            });
        }
    });

    const showPwd = (e: FormEvent) => {
        e.preventDefault();
        if (!isPwdPreview) {
            setIsPwdPreview(true)
        } else {
            setIsPwdPreview(false)
        }
    };

    return (
        <div className="LogIn">
            <h1>Log In</h1>
            <form onSubmit={formikLogin.handleSubmit}>
                <label>
                    <p>courier number:</p>
                    <input
                        type="number"
                        min={1}
                        max={999}
                        required
                        value={formikLogin.values.courierNumber}
                        name="courierNumber"
                        onChange={formikLogin.handleChange}
                    />
                </label>
                {formikLogin.errors.courierNumber ? <div>{formikLogin.errors.courierNumber}</div> : null}
                <hr/>
                <label>
                    <p>password:</p>
                    <input
                        type={isPwdPreview ? "number" : "password"}
                        min={1000}
                        max={9999}
                        required
                        value={formikLogin.values.password}
                        name="password"
                        onChange={formikLogin.handleChange}
                    />
                </label>
                {formikLogin.errors.password ? <div>{formikLogin.errors.password}</div> : null}

                <div>
                    <button type="submit">Log in</button>
                    <button onClick={showPwd}>
                        {isPwdPreview ? 'Hide Password' : 'Show Password'}
                    </button>
                </div>

                <div style={{backgroundColor, display}}>
                    <p>{text}</p>
                    <p>

                    </p>
                </div>
            </form>

        </div>
    )
}