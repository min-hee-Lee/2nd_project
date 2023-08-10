import { NavLink, Outlet } from "react-router-dom";
import style from "../../../css/layout/BaseLayout.module.css";
import logo from "../../../img/logo_header.png";

const Header = () => {
  const handleClick = () => {
    window.location.replace("/home");
  };

  //현재 페이지 표시
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "black" : "gray",
    fontWeight: isActive ? "bold" : "",
  });

  return (
    <>
      {localStorage.getItem("role") === "ROLE_ADMIN" ? (
        <>
          {/* 관리자 header */}
          <div className={style.header_wrap}>
            <div className={style.header_inner}>
              <div className={style.logo}>
                <img src={logo} />
              </div>

              <div className={style.login_state}>
                <ul>
                  {localStorage.getItem("username") !== null ? (
                    <>
                      <li className={style.nav_state}>
                        <div
                          className={style.nav_who}
                          style={{ color: "white" }}
                        >
                          {localStorage.getItem("username") + "님"}
                        </div>
                      </li>

                      <li className={style.nav_state}>
                        <NavLink className={style.nav_who} to="/logout">
                          LOGOUT
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={style.nav_state}>
                        <NavLink
                          style={activeStyle}
                          className={style.nav_who}
                          to="/login"
                        >
                          LOGIN
                        </NavLink>
                      </li>

                      <li className={style.nav_state}>
                        <NavLink
                          style={activeStyle}
                          className={style.nav_who}
                          to="/joinadd"
                        >
                          SIGN UP
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <nav className={style.nav}>
            <ul>
              <li className={style.nav_menu}>
                <NavLink
                  style={activeStyle}
                  className={style.nav_link}
                  to="/admin/payPage/1"
                >
                  예약내역 관리
                </NavLink>
              </li>

              <li className={style.nav_menu}>
                <NavLink
                  style={activeStyle}
                  className={style.nav_link}
                  to="/admin/sales/1"
                >
                  체육관 관리
                </NavLink>
              </li>

              <li className={style.nav_menu}>
                <NavLink
                  style={activeStyle}
                  className={style.nav_link}
                  to="/admin/userInfo/1"
                >
                  회원 관리
                </NavLink>
              </li>

              <li className={style.nav_menu}>
                <NavLink
                  style={activeStyle}
                  className={style.nav_link}
                  to="admin/review/1"
                >
                  후기 관리
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          {/* 사용자 header */}
          <div className={style.header_wrap}>
            <div className={style.header_inner}>
              <NavLink className={style.logo} to="/home" onClick={handleClick}>
                <img src={logo} />
              </NavLink>

              <div className={style.login_state}>
                <ul>
                  {localStorage.getItem("username") !== null ? (
                    <>
                      <li className={style.nav_state}>
                        <NavLink className={style.nav_who} to="/user/payPage/1">
                          {localStorage.getItem("username") + "님"}
                        </NavLink>
                      </li>

                      <li className={style.nav_state}>
                        <NavLink className={style.nav_who} to="/logout">
                          LOGOUT
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={style.nav_state}>
                        <NavLink
                          style={activeStyle}
                          className={style.nav_who}
                          to="/login"
                        >
                          LOGIN
                        </NavLink>
                      </li>

                      <li className={style.nav_state}>
                        <NavLink
                          style={activeStyle}
                          className={style.nav_who}
                          to="/joinadd"
                        >
                          SIGN UP
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <nav className={style.nav}>
            <ul>
              <li className={style.nav_menu}>
                <NavLink
                  style={activeStyle}
                  className={style.nav_link}
                  to="/home"
                >
                  HOME
                </NavLink>
              </li>

              <li className={style.nav_menu}>
                <NavLink
                  style={activeStyle}
                  className={style.nav_link}
                  to="/board/list/1"
                >
                  GYM
                </NavLink>
              </li>

              <li className={style.nav_menu}>
                <NavLink
                  style={activeStyle}
                  className={style.nav_link}
                  to="/map2/1"
                >
                  지도검색
                </NavLink>
              </li>

              <li className={style.nav_menu}>
                <NavLink
                  style={activeStyle}
                  className={style.nav_link}
                  to="user/chatList"
                >
                  채팅하기
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
