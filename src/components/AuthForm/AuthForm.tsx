import {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {Formik, Form, Field, ErrorMessage} from "formik";

import {signInThC, singUpThC} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

import s from './AuthForm.module.css';

type FormDataType = {
  email: string,
  password: string,
  userName: string,
  role: []
};

type ErrorsType = {
   email: string | null,
};

export const AuthForm: FC = () => {

  const dispatch = useDispatch();

  const userName = useSelector((state: AppStateType) => state.auth.userName);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const [registered, changePage] = useState(false);

  const onFormChanged = (formData: /*FormDataType*/any) => {
    debugger
    if (formData.role !== '') {
      let {email, password, userName, role} = formData;
      dispatch(singUpThC(email, password, userName, role));
    } else {
      let {email, password} = formData;
      dispatch(signInThC(email, password));
    }
  };

  if (isAuth) {
    return <Redirect to='/users'/>
  }

  return (
    <div className={s.authForm}>
      {registered
        ? <p>Sing in</p>
        : <p>Registration process</p>
      }
      {userName}
      <Formik
        initialValues={{email: '', password: '', userName: '', role: ''}}
        // validate={values => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = 'Required';
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address';
        //   }
        //   return errors;
        // }}
        onSubmit={(values, {setSubmitting}) => {
          onFormChanged(values);
          setSubmitting(false);
        }}
      >
        {({isSubmitting}) => (
          <Form className={s.form}>
            <Field className={s.field} type="email" name="email" placeholder='email'/>
            <ErrorMessage name="email" component="div"/>
            <Field className={s.field} type="password" name="password" placeholder='password'/>
            <ErrorMessage name="password" component="div"/>
            {!registered
            && <Field className={s.field} type="input" name="userName" placeholder='name'/>}
            {!registered
            && <Field className={s.field} type="input" name="role" placeholder='role'/>
            }
            <button className={s.button} type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
      <div className={s.changeFormButton}>
        {registered
          ? <button onClick={() => changePage(false)}>Sign up</button>
          : <button onClick={() => changePage(true)}>Sign in</button>}
      </div>
    </div>
  )
};