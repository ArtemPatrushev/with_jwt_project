import { FC } from "react";
import { NavLink } from "react-router-dom";

import s from './Navbar.module.css';

export const Navbar: FC = () => {
    return (
        <div className={s.navbar}>
            <NavLink to='./users' className={s.navLink} activeClassName={s.activeNavLink}>Users</NavLink>
            <NavLink to='./books' className={s.navLink} activeClassName={s.activeNavLink}>Books</NavLink>
        </div>
    )
};