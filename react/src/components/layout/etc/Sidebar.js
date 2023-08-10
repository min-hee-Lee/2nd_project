import React from "react";
import { NavLink } from "react-router-dom";
import style from "../../../css/layout/MyPageLayout.module.css";

const Sidebar = () => {
  const activeStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "", //현재 페이지 표시
    color: isActive ? "black" : "",
  });

  return (
    <div className={style.sideMenu}>
      <div className={style.menuGroup}>
        <h3>예약 관리</h3>
        <ul>
          <li>
            <NavLink to="payPage/1" style={activeStyle}>
              예약 내역
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={style.menuGroup}>
        <h3>나의 활동</h3>
        <ul>
          <li>
            <NavLink to="wishList/1" style={activeStyle}>
              찜 ♥
            </NavLink>
          </li>
          <li>
            <NavLink to="reviewList/1" style={activeStyle}>
              후기 관리
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={style.menuGroup}>
        <div>
          <h3>내 정보</h3>
          <ul>
            <li>
              <NavLink to="myInfo" style={activeStyle}>
                개인정보 수정
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
