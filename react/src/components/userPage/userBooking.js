import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../reduxs/actions/board_action";
import { useEffect } from "react";
import UserBookingPageNavigation from "./userBookingPage_nav";
import UserBookingTableRow from "./userBookingTable_row";
import styles from "../../css/layout/MyPageLayout.module.css";

const UserBooking = () => {
  const dispatch = useDispatch();

  const navigator = useNavigate();

  const t_id = localStorage.id;

  //const t_id = local 스토리지에서 가져와야함

  const { currentPage } = useParams();

  const UserPageBookingList = useSelector((state) => state.board.UserPayList);

  console.log(UserPageBookingList);

  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
  );

  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getUserPayList = (currentPage, t_id) => {
    dispatch(boardActions.getUserPayList(currentPage, t_id));
    //navigator(`/admin/payPage/${currentPage}`);
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getUserPayList(currentPage, t_id);
  }, []);

  return (
    <>
      <div className={styles.pageTitle}>
        <h1>나의 예약내역</h1>
      </div>

      <div className={styles.page_inner}>
        <table class="table" style={{ margin: "50px 0" }}>
          <thead>
            <tr>
              <th>코드</th>
              <th>사진</th>
              <th>체육관명</th>
              <th>예약날짜</th>
              <th>사용 날짜</th>
              <th>금액</th>
              <th>사용시간</th>
              {/* <th>결제타입</th> */}
              <th>결제방법</th>
              <th>취소날짜</th>
              <th style={{ textAlign: "center" }}>취소하기</th>
            </tr>
          </thead>
          <tbody>
            {UserPageBookingList &&
              UserPageBookingList.map((board) => {
                return (
                  <UserBookingTableRow
                    board={board}
                    key={board.booking_code}
                  ></UserBookingTableRow>
                );
              })}
          </tbody>
        </table>

        {pv ? (
          <UserBookingPageNavigation
            t_id={t_id}
            getUserPayList={getUserPayList}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UserBooking;
