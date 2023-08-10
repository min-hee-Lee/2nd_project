import ReactPlayer from "react-player";
import p1 from "../../css/start/page1.module.css";
import Header from "./Header";

const Page1 = () => {
  return (
    <div className={p1.startpageall}>
      <Header />
      <div className={p1.page1} id="pageFirst">
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=Wf6A6OkohXo"}
          width="1900px"
          height="937px"
          loop={true}
          playing={true}
          muted={true}
          controls={false}
        />

        {/* 영상 명도 조절 */}
        <div className={p1.bo}></div>
        {/* 로고 */}
        <div className={p1.logo}>
          <img src="/images/logo.png" alt="not image" />
        </div>
      </div>
    </div>
  );
};

export default Page1;
