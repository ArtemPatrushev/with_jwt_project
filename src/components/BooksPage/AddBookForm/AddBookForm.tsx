import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {Formik, Form, Field} from "formik";

import {addBookThC} from "../../../redux/booksReducer";
import {AppStateType} from "../../../redux/reduxStore";

import s from './AddBookForm.module.css';

type FormDataType = {
  title: string,
  author: string,
  year: string,
  genre: string,
  count: string
};

export const AddBookForm: FC = () => {

  const dispatch = useDispatch();
  const token = useSelector((state: AppStateType) => state.auth.token);

  const onFormChanged = (formData: FormDataType) => {
    debugger
    let {title, author, year, count, genre} = formData;
    console.log(formData);
    dispatch(addBookThC(title, author, year, count, genre));
  };

  if (!token) {
    debugger
    return <Redirect to='/login'/>
  }

  return (
    <div className={s.addBookForm}>
      <p>Add new Book</p>
      <Formik
        initialValues={{title: '', author: '', year: '', genre: '', count: ''}}
        onSubmit={(values, {setSubmitting}) => {
          onFormChanged(values);
          setSubmitting(false);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Field className={s.fieldItem} type="input" name="title" placeholder='name of the book'/>
            <Field className={s.fieldItem} type="input" name="author" placeholder='author'/>
            <Field className={s.fieldItem} type="input" name="year" placeholder='year'/>
            <Field className={s.fieldItem} type="input" name="count" placeholder='count'/>
            <Field className={s.fieldItem} type="input" name="genre" placeholder='genre'/>
            <button type="submit" disabled={isSubmitting}>Add</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
