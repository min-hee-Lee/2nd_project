import Nav from "./start/nav";
import Page1 from "./start/page1";
import Page2 from "./start/page2";
import Page3 from "./start/page3";
import Page4 from "./start/page4";
import Page5 from "./start/page5";

const Start = () => {
  return (
    <div
      className="all"
      style={{
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <style>{`
      html, body, .all {
        margin: 0;
        padding: 0;
      }
    `}</style>
      <Nav />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
    </div>
  );
};

export default Start;
