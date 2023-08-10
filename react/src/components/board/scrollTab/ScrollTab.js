import { Link } from "react-router-dom";
import style from "../../../css/board/scrollTab/ScrollTab.module.css";
import Caution from "./Caution";
import Detail from "./Detail";
import Review from "./Review";
import BoardReView from "../../review/board_Review";

const ScrollTab = (props) => {
  const { boardDetail } = props;

  const refundRuleIoop = [];
  for (let i = 0; i < boardDetail.refundRuleDTO.length; i++) {
    refundRuleIoop.push(i);
  }

  //menuClick 함수는 메뉴의 각 항목(li)을 클릭했을 때 실행되는 이벤트 핸들러
  const menuClick = (e) => {
    const tab = e.target.dataset.tab; // 클릭한 li 요소의 data-tab 속성 값

    //tab 변수에는 1부터 시작하는 정수가 들어가기 때문에 -1을 해야함. 선택된 요소는 tabContent 변수에 할당
    const tabContent = document.querySelectorAll(".box")[tab - 1]; //box 클래스에서 tab - 1번째 요소를 선택
    const headerHeight = document.querySelector(".menu").offsetHeight; //스크롤 위치 계산에 사용하기 위한 ul의 높이 구하기
    const scrollTo = tabContent.offsetTop - headerHeight + 1000; //tabContent.offsetTop : tabContent 요소의 top 위치를 구함
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
    //scrollTo : 스크롤 위치, behavior : 스크롤 애니메이션 효과를 설정, smooth : 부드러운 애니메이션 효과
  };

  return (
    <div className={style.tab}>
      <ul className={`${style.menu} menu`} id="menu">
        <li data-tab="1" onClick={menuClick}>
          상세설명
        </li>
        <li data-tab="2" onClick={menuClick}>
          주의/환불
        </li>
        <li data-tab="3" onClick={menuClick}>
          후기
        </li>
      </ul>

      <div className={style.content}>
        <div className={`${style.box1} box`}>
          <Detail boardDetail={boardDetail} />
        </div>
        <div className={`${style.box2} box`}>
          <Caution boardDetail={boardDetail} />
        </div>
        <div className={`${style.box3} box`}>
          <Review boardDetail={boardDetail} />
        </div>
      </div>
    </div>
  );
};

export default ScrollTab;
