import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getBooksThC} from "../../redux/booksReducer";
import {AddBookForm} from "./AddBookForm/AddBookForm";
import {FilterBooksForm} from "./FilterBooksForm/FilterBooksForm";
import {Book} from "./Book/Book";
import {AppStateType} from "../../redux/reduxStore";

import s from './BooksPage.module.css';

export const BooksPage: FC = () => {
  console.log('render');
  const [booksList, switchBookList] = useState(false);
  const booksArray = useSelector((state: AppStateType) => state.books.books);
  const token = useSelector((state: AppStateType) => state.auth.token);
  const dispatch = useDispatch();

  const bookElement = booksArray.map(b => <Book key={b.id} book={b}/>);

  // todo: доработать, при такой зависимости получается бесконечный цикл запросов, хотя state не менялся
  useEffect(() => {
    debugger
    if (token) {
      dispatch(getBooksThC());
    }
  }, [token]);

  return (
    <div className={s.booksPage}>
      <div>Books</div>
      <AddBookForm/>
      <FilterBooksForm/>
      <div className={s.bookButton}>
        {booksList
          ? <button onClick={() => switchBookList(false)}>Show books</button>
          : <button onClick={() => switchBookList(true)}>Hide books</button>}
      </div>
      {booksList
        ? <p>no books</p>
        : bookElement}
    </div>
  );
};
