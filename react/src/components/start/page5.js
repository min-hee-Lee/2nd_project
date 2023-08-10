import p5 from "../../css/start/page5.module.css";

const Page5 = () => {
  return (
    <div className={p5.page5} id="pageFifth">
      <section className={p5.section5}>
        {/* <img src="/images/page5.jpg" alt="not image" /> */}
        <div className={p5.textbox6}>
          <h3 className={p5.tt3}>Lively의 기능</h3>
          <p className={p5.st3}>
            Lively는 고객의 알고리즘을 파악하여 알맞은 체육시설을
            <br />
            추천해 주고, 지역별, 스포츠 종목별로 카테고리를 나누어
            <br />
            쉽게 나에게 맞는 스포츠실을 찾을 수 있습니다.
          </p>
        </div>
        <img
          className={p5.arrow3}
          src="/images/start/button.png"
          alt="not image"
        />
      </section>
    </div>
  );
};
export default Page5;
