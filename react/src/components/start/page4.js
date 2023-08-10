import p4 from "../../css/start/page4.module.css";

const Page4 = () => {
  return (
    <div className={p4.page4} id="pageFourth">
      <section className={p4.section4}>
        {/* <img id="img4" src="/images/page4.jpg" alt="not image" /> */}
        <div className={p4.textbox5}>
          <h3 className={p4.tt2}>Lively의 서비스</h3>
          <p className={p4.st2}>
            Lively는 고객의 알고리즘을 파악하여 알맞은 체육시설을 <br />
            추천해 주고, 지역별, 스포츠 종목별로 카테고리를 나누어 <br />
            쉽게 나에게 맞는 스포츠실을 찾을 수 있습니다.
          </p>
        </div>
        <img
          className={p4.arrow2}
          src="/images/start/button.png"
          alt="not image"
        />
      </section>
    </div>
  );
};
export default Page4;
