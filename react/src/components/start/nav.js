import React from "react";
import { HashLink } from "react-router-hash-link";
import sn from "../../css/start/nav.module.css";

const Nav = () => {
  return (
    <div className={sn.Navcontainer}>
      <div className={sn.nav}>
        {/* 페이지 내 이동은 HashLink 사용 (id) */}
        <HashLink smooth to="/#pageFirst">
          🏈
        </HashLink>
        <br />
        <HashLink smooth to="/#pageSecond">
          🏐
        </HashLink>
        <br />
        <HashLink smooth to="/#pageThird">
          🏀
        </HashLink>
        <br />
        <HashLink smooth to="/#pageFourth">
          ⚽
        </HashLink>
        <br />
        <HashLink smooth to="/#pageFifth">
          ⚾
        </HashLink>
      </div>
    </div>
  );
};

export default Nav;
