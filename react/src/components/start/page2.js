import p2 from "../../css/start/page2.module.css";

const Page2 = () => {
  return (
    <div className={p2.second}>
      <div className={p2.page2} id="pageSecond">
        <img id="img2" src="/images/start/page2.jpg" alt="not image" />
        <h1 className={p2.page2title}>Satisfied Customer</h1>
        <p className={p2.page2sub}>what were they happy with</p>
        <div className={p2.textbox1}>
          <p className={p2.quote1}>"</p>
          <p className={p2.reviewtext1}>
            운동을 처음 시작해서 <br />
            어디로가야할지 몰라서
            <br />
            고민했는데 쉽게 찾을 수<br />
            있어서 다행이에요
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;윤*희
          </p>
        </div>

        <div className={p2.textbox2}>
          <p className={p2.quote2}>"</p>
          <p className={p2.reviewtext2}>
            운동 모임을 할 장소를 <br />
            찾기 쉽지 않았는데
            <br />
            예약까지 빠르게할 수<br />
            있어서 좋았습니다.
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조*수
          </p>
        </div>

        <div className={p2.reviewtext3}>
          <p className={p2.quote3}>"</p>
          <p id={p2.reviewtext3}>
            체육관의 편의시설을 <br />
            한눈에 볼 수 있어서
            <br />
            필요한 시설이 있는 <br />
            곳으로 선택할 수 있다는 <br />
            점이 편리했습니다.
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;오*성
          </p>
        </div>
      </div>
    </div>
  );
};
export default Page2;
