import { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { AppStateType } from "../../redux/reduxStore";
import { getUsersThC } from "../../redux/usersReducer";
import { User } from "./User/User";

export const Users: FC = memo(() => {

    const usersArray = useSelector((state: AppStateType) => state.users.users)
    const refreshToken = useSelector((state: AppStateType) => state.auth.refreshToken);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const token = useSelector((state: AppStateType) => state.auth.token);
    const userName = useSelector((state: AppStateType) => state.auth.userName);
    const users = useSelector((state: AppStateType) => state.users.users);

    const dispatch = useDispatch();

    const userElement = usersArray.map(u => <User key={u.id} user={u} />)

    useEffect(() => {
        debugger
        if (token) {
            console.log(token);
            dispatch(getUsersThC());
        };
    }, [token, /*users,*/ dispatch]);

    if (!token) {
        debugger
        return <Redirect to='/login' />
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '45px'
        }}>
            <b>Users</b>
            {userElement}
            <p><b>Refresh:</b> <i>{refreshToken}</i></p>
            <p><b>User name:</b> <i>{userName}</i></p>
        </div>
    )
});
