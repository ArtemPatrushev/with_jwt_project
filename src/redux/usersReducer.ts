import {ThunkAction} from "redux-thunk";
import {authApi, usersApi} from "../api/api";
import {fields, sesStorage} from "../services/localstorage";
import {actionsAuth} from "./authReducer";
import {UserType} from "./commonTypes/commonTypes";
import {AppStateType, InferActionsType} from "./reduxStore";

const SET_USERS = 'SET_USERS';

const initialState = {
  users: [] as Array<UserType>
};

type initialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const usersReducer = (state = initialState, action: ActionsType): initialStateType => {
  debugger
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
};

export const actions = {
  setUsers: (users: []) => ({type: SET_USERS, payload: {users}} as const)
};

// todo: как типизировать - диспатчит action из другого reducer
export const refreshGetUsersThC = (): ThunkType => async (dispatch) => {
  debugger
  const response = await authApi.refreshToken(sesStorage.load(fields.token), sesStorage.load(fields.refreshToken));
  const token = response.data.accessToken;
  //dispatch(actionsAuth.saveToken(token));
  sesStorage.save(token, fields.token);
  getUsersThC();
};

export const getUsersThC = (): ThunkType => async (dispatch) => {
  debugger
  const response = await usersApi.getUsers();
  console.log(response.status);
  if (response.status === 200) {
    console.log('ok');
    dispatch(actions.setUsers(response.data.customers));
  } else if (response.status === 401) {
    console.error('401');
    dispatch(refreshGetUsersThC());
  } else {
    console.error('some error');
  };
};

// todo: сделать общую функцию, которая будет обрабатывать запросы с токеном и вызывать нужные запросы из api
