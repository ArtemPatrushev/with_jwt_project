import {useDispatch, useSelector} from "react-redux"
import {signOutThC} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

export const Header = () => {

  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(signOutThC());
  };

  const userName = useSelector((state: AppStateType) => state.auth.userName);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  return (
    <div style={{
      height: '50px',
      background: 'orange',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px'
    }}>
      {isAuth
        ? <p><b>Name:</b> {userName}</p>
        : <p>This is header</p>}
      <button onClick={onSignOut}>Log out</button>
    </div>
  )
};