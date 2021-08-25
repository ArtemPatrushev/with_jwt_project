import {ThunkAction} from "redux-thunk";
import {booksApi} from "../api/api";
import {AppStateType, InferActionsType} from "./reduxStore";

const SET_BOOK = 'SET_BOOK';
const SET_SELECTED_BOOK = 'SET_SELECTED_BOOK';

export type BookType = {
  title: string,
  author: string,
  year: number,
  count: number,
  id: number,
  genre: string
};

const initialState = {
  books: [] as Array<BookType>
};

type initialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const booksReducer = (state = initialState, action: ActionsType): initialStateType => {
  debugger
  switch (action.type) {
    case SET_BOOK:
    case SET_SELECTED_BOOK: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state;
  }
  ;
};

const actions = {
  setBook: (books: BookType[]) => ({type: SET_BOOK, payload: {books}}),
  setSelectedBook: (books: BookType[]) => ({type: SET_SELECTED_BOOK, payload: {books}})
};

export const addBookThC = (title: string, author: string, year: string, count: string, genre: string): ThunkType => async () => {
  debugger
  let yearNum = +year;
  let countNum = +count;
  const response = await booksApi.addBook(title, author, yearNum, countNum, genre);
  console.log(response);
};


// санка, но не санка  - нет await
export const setSelectedBookThC = (selectedBook: BookType[]): ThunkType => async (dispatch) => {
  debugger
  dispatch(actions.setSelectedBook(selectedBook));
};

export const getBooksThC = (): ThunkType => async (dispatch) => {
  debugger
  const response = await booksApi.getBooks();
  console.log(response);

  if (response.status === 200) {
    console.log('ok');
    dispatch(actions.setBook(response.data.books));
  } else if (response.status === 401) {
    console.error('401');
    //dispatch(refreshGetUsersThC());
  } else {
    console.error('some error');
  }
}