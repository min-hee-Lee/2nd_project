import { NavLink } from "react-router-dom";
import sh from "../../css/start/Header.module.css";

function Header() {
  return (
    <div className={sh.header}>
      <div className={sh.homecss}>
        <NavLink className={sh.nav_link} to="/home">
          HOME
        </NavLink>
      </div>
      <div className={sh.aboutcss}>
        <NavLink className={sh.nav_link} to="/about">
          About Lively
        </NavLink>
      </div>
      <div className={sh.log}>
        <div className={sh.signupcss}>
          <NavLink className={sh.nav_link} to="/joinadd">
            Signup
          </NavLink>
        </div>

        <div className={sh.logincss}>
          <NavLink className={sh.nav_link} to="/login">
            <div className={sh.lb}>Login</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
