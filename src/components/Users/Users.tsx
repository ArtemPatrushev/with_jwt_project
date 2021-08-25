import {FC, memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";

import {AppStateType} from "../../redux/reduxStore";
import {getUsersThC} from "../../redux/usersReducer";
import {User} from "./User/User";

import s from './Users.module.css';

export const Users: FC = memo(() => {
  const usersArray = useSelector((state: AppStateType) => state.users.users);
  const token = useSelector((state: AppStateType) => state.auth.token);

  const dispatch = useDispatch();

  const userElement = usersArray.map(u => <User key={u.id} user={u}/>)

  useEffect(() => {
    debugger
    if (token) {
      console.log(token);
      dispatch(getUsersThC());
    }
  }, [token, dispatch]);

  if (!token) {
    debugger
    return <Redirect to='/login'/>
  }

  return (
    <div className={s.users}>
      <b>Users</b>
      {userElement}
    </div>
  )
});
