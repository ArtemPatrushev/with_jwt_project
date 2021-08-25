import {FC, memo} from "react";

import {BookType} from "../../../redux/booksReducer";

import s from './Book.module.css';

type PropsType = {
  book: BookType
}

export const Book: FC<PropsType> = memo(({book}) => {
  console.log(book);
  return (
    <div className={s.book}>
      <p>Title: {book.title}</p>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <p>Genre: {book.genre}</p>
      <p>Count: {book.count}</p>
    </div>
  )
});
