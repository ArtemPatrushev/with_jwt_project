import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare, {ThunkAction} from 'redux-thunk';

import {authReducer} from "./authReducer";
import {booksReducer} from "./booksReducer";
import {usersReducer} from "./usersReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  books: booksReducer
});

type RootReducerType = typeof rootReducers;

export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleWare));

// @ts-ignore
window.store = store;
