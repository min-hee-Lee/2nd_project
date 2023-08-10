import p3 from "../../css/start/page3.module.css";

const Page3 = () => {
  return (
    <div className={p3.page3} id="pageThird">
      <section className={p3.section3}>
        {/* <img id="img3" src="/images/page3.jpg" alt="not image" /> */}
        <div className={p3.textbox4}>
          <h3 className={p3.tt1}>Lively의 기능</h3>
          <p className={p3.st1}>
            실내 스포츠 시작이 어렵다면? <br />
            힘들게 검색하고 돌아다닐 필요 없이 <br />
            Lively를 이용하세요 400개 이상의
            <br />
            실내 체육관의 정보를 볼 수 있습니다.
          </p>
        </div>
        <img
          className={p3.arrow1}
          src="/images/start/button.png"
          alt="not image"
        />
      </section>
    </div>
  );
};
export default Page3;
