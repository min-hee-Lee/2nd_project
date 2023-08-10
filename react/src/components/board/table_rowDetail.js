import style from "../../css/board/BoardListDetail.module.css";
//import fsBox from "../../css/board/top/FsLightBox.module.css";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import TextsmsIcon from "@material-ui/icons/Textsms";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FsLightBox from "./FsLightBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../apiurl";

const TableRowDetail = (props) => {
  const { boardDetail, wishSelectList } = props;

  //console.log(props);
  //console.log(boardDetail.imagesDTO[0].filepath);
  //console.log(boardDetail.main_address);
  const [wishSelect, setWishSelect] = useState(false);

  console.log("boardDetail" + wishSelect);

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
    main_code: boardDetail.main_code,
  };

  const wishHandler = async () => {
    console.log("버튼눌림");

    if (wishSelesctNum)
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

  const imagseIoop = [];
  for (let i = 0; i < boardDetail.imagesDTO.length; i++) {
    imagseIoop.push(i);
  }

  const placeIoop = [];
  for (let i = 0; i < boardDetail.placeDTO.length; i++) {
    placeIoop.push(i);
  }

  // const refundRuleIoop = [];
  // for (let i = 0; i < boardDetail.refundRuleDTO.length; i++) {
  //   refundRuleIoop.push(i);
  // }

  useEffect(() => {
    // wishSelectList가 변경될 때마다 비교하여 상태 업데이트

    if (wishSelectList) {
      console.log("boardDetail useEffect 호출");
      console.log(boardDetail.main_code);
      console.log(wishSelectList);

      const found = wishSelectList.find(
        (item) => item.main_code === boardDetail.main_code
      );
      setWishSelect(found !== undefined);
    }
  }, [wishSelectList, boardDetail.main_code]);

  return (
    <>
      {/* 상세페이지 상단 왼쪽 이미지 슬라이드 */}
      <section className={style.infoBox}>
        <section className={style.left}>
          {/*<button
            type="button"
            onClick={wishHandler}
            style={{
              position: "absolute",
              backgroundColor: "transparent",
              marginLeft: "290px",
            }}
          >
            {wishSelect ? (
              <img src={"/images/heartF.png"} />
            ) : (
              <img src={"/images/heartE.png"} />
            )}
          </button>
           체육관 서브 사진 */}
          {/* {imagseIoop.map((num, idx) => (
            <div key={num}>
              <>
                <img
                  alt={boardDetail.imagesDTO[num].filename}
                  src={boardDetail.imagesDTO[num].filepath}
                  width="50"
                  height="50"
                />
              </>
            </div>
          ))} */}
          <FsLightBox boardDetail={boardDetail} />
        </section>

        {/* 상세페이지 상단 오른쪽 정보 */}
        <section className={style.right}>
          {/* 체육관 로고 & 이름 */}
          <div className={style.inner}>
            <img
              alt={boardDetail.main_name}
              src={boardDetail.main_logo}
              width="50"
              height="50"
              style={{ borderRadius: "50%" }}
            />
            <div className={style.main_name}>{boardDetail.main_name}</div>
          </div>
          {/* 체육관 주소 */}
          <div className={style.inner}>
            <RoomOutlinedIcon style={{ fontSize: "25" }} />
            {boardDetail.main_address}
          </div>
          {/* 체육관 좋아요 & 별점 & 후기 수 */}
          <div className={style.inner}>
            <div>
              <img src={"/images/heartF.png"} width={20} height={20} />
              <span>{boardDetail.wish_count}</span>
            </div>
            <div>
              <img src={"/images/starF.png"} width={20} height={20} />
              <span>{boardDetail.avg_rating}</span>
            </div>
            <div style={{ display: "flex" }}>
              <TextsmsIcon style={{ fontSize: "20" }} />
              {boardDetail.count_rating}
            </div>
          </div>
          {/* 금액 */}
          <div className={style.inner}>
            <span>
              ₩{Number(boardDetail.placeDTO[0].cost).toLocaleString()}원~ /
            </span>
            <span> 🕒{boardDetail.placeDTO[0].time_about}시간당</span>
          </div>
          {/* 사장님 코멘트 */}
          <div className={style.inner}>{boardDetail.main_comment}</div>

          {/* 체육관 금액정보 */}
          <div className={style.inner}>
            {placeIoop.map((num, idx) => (
              <div className={style.mark} key={num}>
                <div>
                  <BookmarkIcon style={{ fontSize: "50" }} />
                </div>
                <div className={style.option}>
                  <div>{boardDetail.placeDTO[num].title}</div>
                  <div>
                    <div>
                      ₩{Number(boardDetail.placeDTO[num].cost).toLocaleString()}
                      원~ /
                    </div>
                    <div>🕒{boardDetail.placeDTO[num].time_about}시간당</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* 체육관 소개글 
      <div>{boardDetail.info_detail}</div> */}

      {/* 체육관 편의 시설 정보 */}
      {/* <tr>
        <td>{boardDetail.mainConDTO.aircon}</td>
        <td>{boardDetail.mainConDTO.comfort}</td>
        <td>{boardDetail.mainConDTO.etc}</td>
        <td>{boardDetail.mainConDTO.parking}</td>
        <td>{boardDetail.mainConDTO.sound}</td>
        <td>{boardDetail.mainConDTO.toilet}</td>
      </tr> */}

      {/* 평점/ 댓글 갯수*/}
      {/* <tr>
        <td>{boardDetail.avg_rating} : 평점</td>
        <td>{boardDetail.count_rating} : 댓글 개수</td>
      </tr> */}

      {/* 체육관 환불 규정 
      <tr>
        {refundRuleIoop.map((num, idx) => (
          <td key={num}>
            {boardDetail.refundRuleDTO[num].refund_info}
            {boardDetail.refundRuleDTO[num].refund_info_detail}
          </td>
        ))}
      </tr> */}
      {/* 체육관 주의 사항 
      <tr>
        <td>
          {boardDetail.warningDTO.warn_info}
          {boardDetail.warningDTO.warn_info_detail}
        </td>
      </tr>*/}
    </>
  );
};

export default TableRowDetail;
