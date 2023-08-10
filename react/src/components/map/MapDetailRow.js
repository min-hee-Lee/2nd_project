import { Link } from "react-router-dom";
import MapDistance from "./mapDistance";

import style from "../../css/map/SearchPlace2.module.css";
import GoIcon from "@material-ui/icons/Input";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import { baseUrl } from "../../apiurl";
import axios from "axios";

const MapDetailRow = ({
  item,
  onClose,
  newDistance,
  searchPlace,
  wishSelectList,
}) => {
  const [wishSelect, setWishSelect] = useState(false);

  const wishIoop = [];
  const wishSelesctNum = [];
  if (wishSelectList) {
    for (let i = 0; i < wishSelectList.length; i++) {
      wishIoop.push(i);
      wishSelesctNum.push(wishSelectList[i].main_code);
    }
  }

  const t_id = localStorage.id;

  const data = {
    t_id: t_id,
    main_code: item.main_code,
  };
  const wishHandler = async () => {
    console.log("버튼눌림");
    //SetWishUserSelect(!wishSelect);
    setWishSelect(!wishSelect);

    await axios
      .post(`${baseUrl}/wishList`, data)
      .then((response) => {
        alert(response.data);
        // if (like.current) {
        //   setLikeOn(!likeOn);
        //   likeOn
        //     ? setLikeImg("/images/heartF.png")
        //     : setLikeImg("/images/heartE.png");
        // }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    // wishSelectList가 변경될 때마다 비교하여 상태 업데이트
    if (wishSelectList) {
      const found = wishSelectList.find(
        (item) => item.main_code === item.main_code
      );
      setWishSelect(found !== undefined);
    }
  }, [wishSelectList, item.main_code]);

  return (
    <>
      <div className={style.box}>
        <div className={style.place}>
          <div style={{ height: "25px" }}>
            <button
              onClick={onClose}
              style={{ float: "right", padding: "5px" }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* <h3>{item.rm}</h3> */}
          {/* <div>고유번호 : {item.main_code}</div> */}
          <div className={style.group}>
            <button
              type="button"
              onClick={wishHandler}
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                marginLeft: "250px",
              }}
            >
              {wishSelect ? (
                <img src={"/images/heartF.png"} />
              ) : (
                <img src={"/images/heartE.png"} />
              )}
            </button>

            <Link to={`/board/list/detail/${item.main_code}`}>
              <img
                alt={item.filename}
                src={item.filepath}
                width="300"
                height="200"
              />
            </Link>

            <div>
              <div className={style.name}>{item.filename}</div>
              <div>{item.title}</div>
              <div className={style.address}>{item.main_address}</div>
              <div>
                <span>₩{Number(item.cost).toLocaleString()}원~</span>
                <span className={style.time}> 🕒{item.time_about}시간당</span>
              </div>
              <div>
                <span>
                  <img src={"/images/starF.png"} />
                  {item.avg_rating}
                </span>
                <span className={style.review}>
                  {" "}
                  ( 후기 {item.count_rating} )
                </span>
              </div>
            </div>
          </div>

          <Link
            to={`/board/list/detail/${item.main_code}`}
            style={{
              width: "100%",
              fontSize: "20px",
              fontWeight: "bold",
              padding: "10px 15px",
              display: "flex",
              lineHeight: "45px",
            }}
          >
            <span>예약하러가기</span>

            <GoIcon style={{ fontSize: "40px", marginLeft: "10px" }} />
          </Link>
        </div>

        <div className={style.trans}>
          <MapDistance
            item={item}
            newDistance={newDistance}
            searchPlace={searchPlace}
          ></MapDistance>
        </div>
      </div>
    </>
  );
};

export default MapDetailRow;
