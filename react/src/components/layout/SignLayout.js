import { NavLink, Outlet } from "react-router-dom";
import style from "../../css/layout/SignLayout.module.css";
import logo from "../../img/logo_header.png";
import Footer from "./etc/footer";

function SignLayout() {
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <div className={style.header_wrap}>
          <div className={style.header_inner}>
            <NavLink className={style.logo} to="/home">
              <img src={logo} />
            </NavLink>
          </div>
        </div>
      </header>

      <main className={style.main}>
        <div className={style.main_wrap}>
          <div className={style.main_inner}>
            <Outlet />
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default SignLayout;
