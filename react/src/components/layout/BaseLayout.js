import { NavLink, Outlet } from "react-router-dom";
import style from "../../css/layout/BaseLayout.module.css";

import Chat from "./etc/Chat";
import Footer from "./etc/footer";
import Header from "./etc/header";

function BaseLayout() {
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Header />
      </header>

      <main className={style.main}>
        <div className={style.main_wrap}>
          <Outlet />
          <div className={style.chat}>
            <Chat />
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default BaseLayout;
