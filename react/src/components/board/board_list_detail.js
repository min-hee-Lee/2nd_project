import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { boardActions } from "../../reduxs/actions/board_action";
import { useEffect, useRef, useState } from "react";
import TableRowDetail from "./table_rowDetail";
import Calendarp from "../payments/calendarp";

import styles from "../../css/board/BoardListDetail.module.css";
import ScrollTab from "./scrollTab/ScrollTab";

const BoardListDetail = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingBtnRef = useRef();

  const [userWish, setUserWish] = useState({
    t_id: localStorage.id,
  });

  if (localStorage.getItem("t_id")) {
    setUserWish(localStorage.getItem("t_id"));
  }

  const BtnOpenClick = () => {
    setBookingOpen(true);
    // bookingBtnRef.current.style.marginRight = "400px";
  };

  // const BtnCloseClick = () => {
  //   setBookingOpen(false);
  //   bookingBtnRef.current.style.marginRight = "0";
  // };

  // useEffect(() => {
  //   if (bookingOpen && bookingBtnRef.current) {
  //     bookingBtnRef.current.style.marginRight = `${bookingBtnRef.current.offsetWidth}px`;
  //   } else if (!bookingOpen && bookingBtnRef.current) {
  //     bookingBtnRef.current.style.marginRight = "0";
  //   }
  // }, [bookingOpen]);

  const dispatch = useDispatch();
  const { main_code } = useParams();

  //console.log(main_code);
  const BoardListDetail = useSelector((state) => state.board.boardListDetail);

  console.log(BoardListDetail);

  const wishSelectList = useSelector((state) => state.board.wish_Select_List);

  //console.log(BoardListDetail[0]);
  // console.log(BoardListDetail[0]['main_code']);
  // const getBoardListDetail = (main_code) => {
  //   dispatch(boardActions.getBoardListDetail(main_code));
  //   //navigator(`board/list/detail/${main_code}`);
  // };

  const getWishSelectList = (t_id) => {
    dispatch(boardActions.getWishSelectList(t_id));
  };

  useEffect(() => {
    dispatch(boardActions.getBoardListDetail(main_code));
    getWishSelectList(userWish);
  }, [dispatch, main_code]);

  // useEffect(() => {
  //   console.log("useEffect 호출");
  //   getBoardListDetail(main_code);
  // }, []);

  return (
    <div className={styles.main_inner}>
      {BoardListDetail ? (
        BoardListDetail.map((boardDetail) => (
          <TableRowDetail
            boardDetail={boardDetail}
            key={boardDetail.main_code}
          ></TableRowDetail>
        ))
      ) : (
        <div>게시글이 존재하지 않습니다.</div>
      )}

      <div className={styles.bookingBtn} ref={bookingBtnRef}>
        <button onClick={BtnOpenClick} className="btn_lively">
          예약하기
        </button>
        {/* {bookingOpen ? (
          <button onClick={BtnCloseClick} className="btn_lively">
            닫기
          </button>
        ) : (
          <button onClick={BtnOpenClick} className="btn_lively">
            예약하기
          </button>
        )} */}
        {bookingOpen && BoardListDetail[0] ? (
          <Calendarp
            main_code={BoardListDetail[0].main_code}
            placeDTO={BoardListDetail[0].placeDTO}
            main_name={BoardListDetail[0].main_name}
            t_id={localStorage.id}
            setBookingOpen={setBookingOpen}
          />
        ) : // <Calendarp />
        null}
      </div>

      {/* 지우기
      <section className={style.infoBox}>
       이미지 슬라이드 
        <section className={style.left}>
          <FsLightBox /> 이미지 클릭시 이미지 크게 슬라이드로 보기 
        </section>

        정보 및 예약 
        <section className={style.right}>
          <div className={style.inner}>placeName</div>
          <div className={style.inner}>placeTitle</div>
          <div className={style.inner}>placeAdress</div>
          <div className={style.inner} style={{ display: "flex" }}>
            <div>
              <span>좋아요 수</span>
              <img src={heartF} />
            </div>
            <div>
              <span>후기</span>
              <img src={starF} />
            </div>
          </div>
          <div className={style.inner}>placeCost</div>
        </section>
      </section> */}

      {/* 상세정보, 후기, 주의사항 */}
      {BoardListDetail && BoardListDetail ? (
        BoardListDetail.map((boardDetail) => (
          <ScrollTab
            boardDetail={boardDetail}
            key={boardDetail.main_code}
            wishSelectList={wishSelectList}
          ></ScrollTab>
        ))
      ) : (
        <div>게시글이 존재하지 않습니다.</div>
      )}
    </div>
  );
};

export default BoardListDetail;
