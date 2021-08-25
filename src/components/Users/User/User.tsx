import {FC, memo} from "react";

import {UserType} from "../../../redux/commonTypes/commonTypes";

import s from './User.module.css';

type PropsType = {
  user: UserType
};

export const User: FC<PropsType> = memo(({user}) => {
  console.log(user);
  return (
    <div className={s.user}>
      <p style={{marginRight: '20px'}}><b>E-mail:</b> <i>{user.email}</i></p>
      <p style={{marginRight: '20px'}}><b>Name:</b> <i>{user.userName}</i></p>
    </div>
  )
});
