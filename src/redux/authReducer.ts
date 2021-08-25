import {ThunkAction} from "redux-thunk";
import {authApi} from "../api/api";
import {fields, sesStorage} from "../services/localstorage";
import {AppStateType, InferActionsType} from "./reduxStore";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_TOKEN = 'SET_TOKEN';

//const user = sesStorage.load(fields.userData) || {};

export const initialStateAuth = {
  //userData: { },
  id: sesStorage.load(fields.id) || null,
  email: sesStorage.load(fields.email) || null,
  userName: sesStorage.load(fields.userName) || null,
  roles: sesStorage.load(fields.roles) || [],
  token: sesStorage.load(fields.token) || null, // пояснить, он же записывается чере action
  refreshToken: sesStorage.load(fields.refreshToken) || null,
  isAuth: sesStorage.load(fields.isAuth) || false
};

export type initialStateAuthType = typeof initialStateAuth;
type ActionsType = InferActionsType<typeof actionsAuth>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const authReducer = (state = initialStateAuth, action: ActionsType): initialStateAuthType => {
  debugger
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
        // userData: {...action.payload},
        // isAuth: action.payload.isAuth,
      }
    default:
      return state;
  }
};

export const actionsAuth = {
  setUserData: (
    email: string | null,
    id: string | null,
    refreshToken: string | null,
    roles: [] | null,
    token: string | null,
    userName: string | null,
    isAuth: boolean | null
  ) => ({
    type: SET_USER_DATA, payload: {email, id, refreshToken, roles, token, userName, isAuth}
  } as const),
  saveToken: (token: string) => ({
    type: SET_TOKEN, token
  } as const)
};

export const singUpThC = (email: string, password: string, userName: string, role: []): ThunkType => async (dispatch) => {
  const response = await authApi.signUp(email, password, role, userName);
  console.log(response);
  debugger
  // TODO: catch the errors
};

export const signInThC = (email: string, password: string): ThunkType => async (dispatch) => {
  debugger
  const response = await authApi.signIn(email, password);

  if (response.status === 200) {
    //const token = response.data.accessToken;
    const token = response.data.accessToken;
    let {email, id, refreshToken, roles, userName} = response.data;
    // сохраняем localStorage --- теперь от доступен через storage.load - это используется в api для headers
    sesStorage.save(email, fields.email);
    sesStorage.save(id, fields.id);
    sesStorage.save(refreshToken, fields.refreshToken);
    sesStorage.save(roles, fields.roles);
    sesStorage.save(token, fields.token);
    sesStorage.save(userName, fields.userName);
    sesStorage.save(true, fields.isAuth);
    dispatch(actionsAuth.setUserData(email, id, refreshToken, roles, token, userName, true));
    console.log(token);
    console.log(response.data);
  } else {
    console.error(response.status);
  }
};

export const signOutThC = (): ThunkType => async (dispatch) => {
  debugger
  sesStorage.remove(fields.email);
  sesStorage.remove(fields.id);
  sesStorage.remove(fields.refreshToken);
  sesStorage.remove(fields.roles);
  sesStorage.remove(fields.token);
  sesStorage.remove(fields.userName);
  sesStorage.remove(fields.isAuth);
  dispatch(actionsAuth.setUserData(null, null, null, null, null, null, false));
};
