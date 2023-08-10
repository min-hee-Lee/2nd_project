import style from "../../css/home/HomePage.module.css";

const Rec = ({ recommendedPlaces, recommendedCon, recommendedLoc }) => {
  console.log("recommendedPlaces: ", recommendedPlaces);
  console.log("recommendedCon: ", recommendedCon);
  console.log("recommendedLoc: ", recommendedLoc);

  return (
    <div className={style.inner}>
      {recommendedPlaces &&
        recommendedPlaces.map((loc, idx) => (
          <div className={style.img} key={`${loc} - ${idx}`}>
            <a
              href={`http://localhost:3000/board/list/detail/${loc.main_code}`}
            >
              <img src={loc.main_logo} alt={`${loc.main_name} logo`} />
              <p>{loc.main_name}</p>
            </a>
          </div>
        ))}

      {recommendedCon &&
        recommendedCon.map((loc, idx) => (
          <div className={style.img} key={`${loc} - ${idx}`}>
            <a
              href={`http://localhost:3000/board/list/detail/${loc.main_code}`}
            >
              <img src={loc.main_logo} alt={`${loc.main_name} logo`} />
              <p>{loc.main_name}</p>
            </a>
          </div>
        ))}
      {recommendedLoc &&
        recommendedLoc.map((loc, idx) => (
          <div className={style.img} key={`${loc} - ${idx}`}>
            <a
              href={`http://localhost:3000/board/list/detail/${loc.main_code}`}
            >
              <img src={loc.main_logo} alt={`${loc.main_name} logo`} />
              <p>{loc.main_name}</p>
            </a>
          </div>
        ))}
    </div>
  );
};

export default Rec;
