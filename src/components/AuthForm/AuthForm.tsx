import { Formik, Form, Field, ErrorMessage } from "formik";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signInThC, singUpThC } from "../../redux/authReducer";
import { AppStateType } from "../../redux/reduxStore";

type FormDataType = {
    email: string, 
    password: string, 
    userName: string, 
    role: []
};

export const AuthForm: FC = () => {

    const dispatch = useDispatch();

    const userName = useSelector((state: AppStateType) => state.auth.userName);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const [registered, changePage] = useState(false);

    const onFormChanged = (formData: /*FormDataType*/any) => {
        debugger
        if (formData.role !== '') {
            let { email, password, userName, role } = formData;
            dispatch(singUpThC(email, password, userName, role));
        } else {
            let { email, password } = formData;
            dispatch(signInThC(email, password));
        };
    };

    if (isAuth) {
        return <Redirect to='/users' />
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px'
        }}>
            {registered
                ? <p>Sing in</p>
                : <p>Registration process</p>
            }
            {userName}
            <Formik
                initialValues={{ email: '', password: '', userName: '', role: '' }}
                // validate={values => {
                //     const errors = {};
                //     if (!values.email) {
                //         errors.email = 'Required';
                //     } else if (
                //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //     ) {
                //         errors.email = 'Invalid email address';
                //     }
                //     return errors;
                // }}
                onSubmit={(values, { setSubmitting }) => {
                    onFormChanged(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '30%',
                        margin: '0 auto',
                        marginTop: '100px'
                    }}>
                        <Field style={{ marginTop: '20px' }} type="email" name="email" placeholder='email' />
                        <ErrorMessage name="email" component="div" />
                        <Field style={{ marginTop: '20px' }} type="password" name="password" placeholder='password' />
                        <ErrorMessage name="password" component="div" />
                        {!registered
                            && <Field style={{ marginTop: '20px' }} type="input" name="userName" placeholder='name' />}
                        {!registered
                            && <Field style={{ marginTop: '20px' }} type="input" name="role" placeholder='role' />
                        }
                        <button style={{ width: '100px', margin: '20px auto' }} type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {registered
                    ? <button onClick={() => changePage(false)}>Sign up</button>
                    : <button onClick={() => changePage(true)}>Sign in</button>}
            </div>
        </div>
    )
};