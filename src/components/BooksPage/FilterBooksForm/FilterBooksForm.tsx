import { Formik, Form, Field } from "formik";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBookThC } from "../../../redux/booksReducer";
import { AppStateType } from "../../../redux/reduxStore";

import s from '../AddBookForm/AddBookForm.module.css';

type FormDataType = {
    title: string,
    author: string,
    year: string,
    genre: string
};

export const FilterBooksForm: FC = () => {

    const dispatch = useDispatch();
    const books = useSelector((state: AppStateType) => state.books.books);

    const onFormChanged = (formData: /*FormDataType*/any) => {
        debugger
        let { title, author, year, count, genre } = formData;
        console.log(formData);

        let yearNum = +year;
        let countNum = +count;
        let selectedBook = books.filter((book) => {
            return book.title === title || book.author === author || book.year === yearNum || book.count === countNum || book.genre === genre;
        });
        console.log(selectedBook);

        dispatch(setSelectedBookThC(selectedBook));
    };

    return (
        <div className={s.addBookForm}>
            <p>Choose a book</p>
            <Formik
                initialValues={{ title: '', author: '', year: '', count: '', genre: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    onFormChanged(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field className={s.fieldItem} type="input" name="title" placeholder='name of the book' />
                        <Field className={s.fieldItem} type="input" name="author" placeholder='author' />
                        <Field className={s.fieldItem} type="input" name="year" placeholder='year' />
                        <Field className={s.fieldItem} type="input" name="count" placeholder='count' />
                        <Field className={s.fieldItem} type="input" name="genre" placeholder='genre' />
                        <button type="submit" disabled={isSubmitting}>Filter</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
