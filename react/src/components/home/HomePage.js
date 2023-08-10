import Banner from "./Banner";
import axios from "axios";
import { useState, useEffect } from "react";
import style from "../../css/home/HomePage.module.css";
import Rec from "./Rec";
import { Code } from "@material-ui/icons";

const Home = () => {
  const [recommendedPlaces, setRecommendedPlaces] = useState("");
  const [recommendedCon, setRecommendedCon] = useState([]);
  const [recommendedLoc, setRecommendedLoc] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  const T_ID = localStorage.getItem("id");
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:8090/recommend/${T_ID}`, config)
      .then((response) => {
        console.log("recommend 호출.");
        console.log(response.data);

        const { hdlist, cdlist, ldlist } = response.data;
        console.log(hdlist);
        console.log(cdlist);
        console.log(ldlist);

        setRecommendedPlaces(hdlist); //이게 이전 값을 출력할 수 있음
        setRecommendedCon(cdlist);
        setRecommendedLoc(ldlist);

        console.log("hdlists");
        console.log(recommendedPlaces); // 이게 이전 값을 출력할 수 있음
      });
  }, []);
  return (
    <div className={style.wrap}>
      <Banner />
      <div className={style.main_inner}>
        <article>
          {recommendedPlaces &&
            recommendedPlaces.map((recommendedPlace) => {
              <div key={recommendedPlace.main_code}></div>;
            })}
          <div className={style.curation}>
            <h3>
              😊<span>{username}</span>😊님이 이용했던 곳과 유사한 장소
            </h3>
            <Rec
              recommendedPlaces={
                recommendedPlaces.length > 1 && recommendedPlaces
              }
            />
          </div>
        </article>

        <article>
          {recommendedCon &&
            recommendedCon.map((recommendedCon) => {
              <div key={recommendedCon.main_code}></div>;
            })}
          <div className={style.curation}>
            <h3>
              😊<span>{username}</span>😊님이 선호하는 편의시설이 있는 장소
            </h3>
            <Rec recommendedCon={recommendedCon.length > 1 && recommendedCon} />
          </div>
        </article>

        <article>
          {recommendedLoc &&
            recommendedLoc.map((recommendedLoc) => {
              <div key={recommendedLoc.main_code}></div>;
            })}
          <div className={style.curation}>
            <h3>
              😊<span>{username}</span>😊님이 이용했던 곳과 가까운 장소
            </h3>
            <Rec recommendedLoc={recommendedLoc.length > 1 && recommendedLoc} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Home;

// const Home = () => {
//   return (
//     <div className={style.wrap}>
//       <Banner />
//       <div className={style.main_inner}>
//         <article>
//           <div className={style.curation}>
//             <h3>😊😊😊님이 이용했던 곳과 유사한 장소</h3>
//             <Rec />
//           </div>
//         </article>

//         <article>
//           <div className={style.curation}>
//             <h3>😊😊😊님이 이용했던 곳과 가까운 장소</h3>
//             <Rec />
//           </div>
//         </article>

//         <article>
//           <div className={style.curation}>
//             <h3>😊😊😊님이 선호하는 편의시설이 있는 장소</h3>
//             <Rec />
//           </div>
//         </article>

//         <article>
//           <div className={style.curation}>
//             <h3>😊다른 회원들의 긍정적 리뷰가 많은 장소😊</h3>
//             <Rec />
//           </div>
//         </article>

//         <article>
//           <div className={style.curation}>
//             <h3>😊😊😊님이 자주 이용하는 시간에 사용 가능한 곳이에요</h3>
//             <Rec />
//           </div>
//         </article>
//       </div>
//     </div>
//   );
// };

// export default Home;
