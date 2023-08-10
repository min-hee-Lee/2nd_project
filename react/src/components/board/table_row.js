import { Link } from "react-router-dom";
import style from "../../css/board/BoardList.module.css";
import { baseUrl } from "../../apiurl";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const TableRow = (props) => {
  const { board, wishSelectList } = props;
  console.log("wishSelectList", wishSelectList);

  //const [wishSelect, SetWishSelect] = useState(false);
  //console.log(board);
  const [wishSelect, setWishSelect] = useState(false);

  console.log("boardList" + wishSelect);

  const wishIoop = [];
  const wishSelesctNum = [];
  if (wishSelectList) {
    for (let i = 0; i < wishSelectList.length; i++) {
      wishIoop.push(i);
      wishSelesctNum.push(wishSelectList[i].main_code);
    }
  }

  console.log(wishSelesctNum);

  const t_id = localStorage.id;

  const data = {
    t_id: t_id,
    main_code: board.main_code,
  };

  // const [likeOn, setLikeOn] = useState(mylike.includes(board.main_code));
  // const [likeImg, setLikeImg] = useState(
  //   likeOn ? "/images/heartF.png" : "/images/heartE.png"
  // );
  // const like = useRef();

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
        (item) => item.main_code === board.main_code
      );
      setWishSelect(found !== undefined);
    }
  }, [wishSelectList, board.main_code]);

  return (
    <li className={style.group} key={board.main_code}>
      {/* <div>{board.main_code}</div> */}

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

      <Link to={`/board/list/detail/${board.main_code}`}>
        <img
          alt={board.filename}
          src={board.filepath}
          width="300"
          height="200"
        />
      </Link>
      <div>
        <div className={style.name}>{board.filename}</div>
        <div>{board.title}</div>
        <div className={style.address}>{board.main_address}</div>
        <div>
          <span>₩{Number(board.cost).toLocaleString()}원~</span>
          <span className={style.time}> 🕒{board.time_about}시간당</span>
        </div>

        <div>
          <span>
            <img src={"/images/starF.png"} />
            {board.avg_rating}
          </span>
          <span className={style.review}> ( 후기 : {board.count_rating} )</span>
        </div>
      </div>
    </li>
  );
};

export default TableRow;
