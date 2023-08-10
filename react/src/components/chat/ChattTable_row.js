import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../apiurl";
import cr from "../../css/chat/Chatting2.module.css";
import { useEffect, useState } from "react";
// import KakaoPayCancle from '../payments/bookingCencel/kakaoPayCancle';
// import PaymentsCancle from '../payments/bookingCencel/paymenstCancle';

const ChatTableRow = (props) => {
  const { board, wishSelectList } = props;

  //console.log(board);

  //console.log(board.main_code);

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
    main_code: board.main_code,
  };

  const wishHandler = async () => {
    console.log("버튼눌림");
    setWishSelect(!wishSelect);

    await axios
      .post(`${baseUrl}/wishList`, data)
      .then((response) => {
        alert(response.data);
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
    <>
      <tr className={cr.size} key={board.main_code}>
        <td className={cr.crtd}>{board.main_code}</td>
        <td className={cr.crtd}>
          <>
            <Link to={`/board/list/detail/${board.main_code}`}>
              <img
                alt={board.filename}
                src={board.filepath}
                width="50"
                height="50"
              />
            </Link>
          </>
        </td>
        <td className={cr.crtd}>{board.filename}</td>
        {/*<td className={cr.crtd}>{board.time_about}시간당</td>*/}

        <td className={cr.crtd}>{board.avg_rating}점</td>
        {/* <td>{board.count_rating} : 총 개수 /</td> */}
        <td className={cr.crtd}>{board.title}</td>
        {/* <td>{board.main_address}</td> */}
        <td className={cr.crtd}>
          <button
            type="button"
            onClick={wishHandler}
            style={{ backgroundColor: "transparent" }}
          >
            {wishSelect ? (
              <img src={"/images/heartF.png"} />
            ) : (
              <img src={"/images/heartE_black.png"} />
            )}
          </button>
        </td>
        {/* <td>
          <button type="button">바로가기</button>
        </td> */}
      </tr>
    </>
  );
};

export default ChatTableRow;
