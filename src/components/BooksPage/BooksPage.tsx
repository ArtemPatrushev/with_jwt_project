import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksThC } from "../../redux/booksReducer";
import { AppStateType } from "../../redux/reduxStore";
import { AddBookForm } from "./AddBookForm/AddBookForm";
import { Book } from "./Book/Book";

import s from './BooksPage.module.css';
import { FilterBooksForm } from "./FilterBooksForm/FilterBooksForm";

export const BooksPage: FC = () => {

    const booksArray = useSelector((state: AppStateType) => state.books.books);
    const booksState = useSelector((state: AppStateType) => state.books);
    const token = useSelector((state: AppStateType) => state.auth.token);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch();

    const bookElement = booksArray.map(b => <Book /*key={b.id}*/ book={b} />);

    // при такой зависимости получается бесконечный цикл запросов, хотя state не менялся
    useEffect(() => {
        debugger
        if (token && isAuth) {
            dispatch(getBooksThC());
        };
    }, []);

    const [hide, changeHide] = useState(true);

    const showMyBooks = () => {
        changeHide(false);
        dispatch(getBooksThC());
    };

    return (
        <div className={s.booksPage}>
            <div>Books</div>
            <AddBookForm />
            <FilterBooksForm />
                <button onClick={showMyBooks}>My books</button>
            <div>
                <button onClick={() => changeHide(false)}>Show books</button>
                <button onClick={() => changeHide(true)}>Hide books</button>
            </div>
            {hide
                ? <p>no books</p>
                : bookElement}
        </div>
    );
};