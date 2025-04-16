import clsx from "clsx";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <header>
      <h2 className={s.heading}>Routes</h2>
      <nav className={s.navLinks}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
