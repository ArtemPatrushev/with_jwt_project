import axios from 'axios';
import {fields, sesStorage} from '../services/localstorage';

// export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
//   data: D,
//   messages: Array<string>,
//   status: RC
// };

// export enum ResultCodeEnum {
//     Success = 200,
//     AuthError = 401,
//     NotValid = 422,
// };

export const instance = axios.create({
  //withCredentials: true,
  //если есть proxy в package.json, то baseURL не прописывается
  //baseURL: 'localhost:5000/'
  headers: {
    // здесь получаем токен, который сохранили через storage.save в thunk, через load
    //'Authorization': sesStorage.load(fields.token),
    //'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use((config) => {
  const token = `Bearer ${sesStorage.load(fields.token)}`;
  config.headers.Authorization = token ? token : '';
  return config;
});

export const authApi = {
  signUp(
    email: string,
    password: string,
    role: [],
    userName: string
  ) {
    debugger
    return instance.post('Api/Account/SignUp', {email, password, userName, role})
      .then(response => {
        return response;
      });
  },
  signIn(
    email: string,
    password: string
  ) {
    debugger
    return instance.post('/Api/Account/SignIn', {email, password})
      .then(response => {
        return response;
      });
  },
  refreshToken(accessToken: string, refreshToken: string) {
    debugger
    return instance.post('/Api/Account/RefreshToken', {accessToken, refreshToken})
      .then(response => {
        return response;
      });
  }
};

export const usersApi = {
  getUsers() {
    console.log(sesStorage.load(fields.token));
    debugger
    return instance.get('/Api/Customers'/*, { headers: {"Authorization" : sesStorage.load(fields.token)}}*/)
      .then(response => {
        return response;
      })
      .catch((error) => {
        console.log(error.response.status);
        return error.response;
        // if (error.response.status === 401) {
        //     // _apiWithRefresh('/Api/Customers', instance.get, {});
        // }
      });
  }
};

export const booksApi = {
  addBook(
    title: string,
    author: string,
    year: number,
    count: number,
    genre: string
  ) {
    return instance.post('/Api/Books', {title, author, year, count, genre})
      .then(response => {
        return response;
      });
  },
  getBooks() {
    return instance.get('/Api/Books')
      .then(response => {
        return response;
      });
  }
};
