import { FC, memo } from "react";
import { UserType } from "../../../redux/commonTypes/commonTypes";

type PropsType = {
    user: UserType
};

export const User: FC<PropsType> = memo(({user}) => {
    console.log(user);

    return (
        <div style={{
            display: 'flex',
            width: '80%', 
            height: 'auto', 
            background: 'lightblue', 
            border: '1px solid darkblue',
            margin: '20px 0 20px 0',
            padding: '10px',
            boxSizing: 'border-box'
        }}>
            <p style={{marginRight: '20px'}}><b>E-mail:</b> <i>{user.email}</i></p>
            <p style={{marginRight: '20px'}}><b>Name:</b> <i>{user.userName}</i></p>
        </div>
    )
});
