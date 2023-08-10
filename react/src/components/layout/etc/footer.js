import { NavLink } from "react-router-dom";
import style from "../../../css/layout/Footer.module.css";
import ScrollToTop from "./ScrollTop";
import TopBtn from "./TopBtn";

const Footer = () => {
  return (
    <div className={style.footer_wrap}>
      <div className={style.footer_inner}>
        <div className={style.content1}>
          <ul>
            <li>
              <NavLink to="">회사소개</NavLink>
            </li>
            <li>
              <NavLink to="">채용</NavLink>
            </li>
            <li>
              <NavLink to="">이용약관</NavLink>
            </li>
            <li>
              <NavLink to="">개인정보처리방침</NavLink>
            </li>
          </ul>
        </div>
        <div className={style.content2}>
          <div>
            <h2>LIVELY</h2>
            <p>(주)오부장 사업장 정보</p>
            <p>법인명:오부장주식회사 대표이사: 오부장</p>
            <p>주소 : 서울특별시 서초구 1303-37 서초W타워</p>
            <p>사업체등록번호: 123-456-789789 통신판매업: 1234-이젠-4567</p>
            <p>개인정보보호책임자: ***</p>
          </div>
        </div>
      </div>
      <div className={style.footer_inner}>
        <div className={style.content3}>
          {/* 최상단으로 이동하는 버튼 */}
          <div className={style.topBtn}>
            <TopBtn />
          </div>
          <p>대표번호 : 12-3456-7890</p>
          <p>문의시간 : 평일 10:00 ~ 19:00</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
