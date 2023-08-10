import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../reduxs/actions/board_action";
import { useEffect } from "react";
import AdminBookingTableRow from "./adminBookingTable_row";
import AdminBookingPageNavigation from "./adminbookingPage_nav";

import style from "../../css/admin/AdminBooking.module.css";

const AdminBookingList = () => {
  const dispatch = useDispatch();

  const navigator = useNavigate();

  const { currentPage } = useParams();

  const AdminPageBookingList = useSelector((state) => state.board.AdminPayList);

  // console.log(AdminPageBookingList);

  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
  );

  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getAdminPayList = (currentPage) => {
    dispatch(boardActions.getAdminPayList(currentPage));
    // navigator(`/admin/payPage/${currentPage}`);
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getAdminPayList(currentPage);
  }, []);

  return (
    <>
      <div className={style.main_inner}>
        <h2>사용자 결제목록 페이지</h2>
        <table class="table table-striped" style={{ margin: "50px 0" }}>
          <thead>
            <tr>
              <th>예약번호</th>
              <th>구매 날짜</th>
              <th>예약 상태</th>
              <th>사용 날짜</th>
              <th>금액</th>
              <th>사용시간</th>
              <th>유저번호</th>
              <th>결제타입</th>
              <th>결제방법</th>
              <th>취소날짜</th>
            </tr>
          </thead>
          <tbody>
            {AdminPageBookingList &&
              AdminPageBookingList.map((board) => {
                return (
                  <AdminBookingTableRow
                    board={board}
                    key={board.booking_code}
                  ></AdminBookingTableRow>
                );
              })}
          </tbody>
        </table>
      </div>
      {pv ? (
        <AdminBookingPageNavigation getAdminPayList={getAdminPayList} />
      ) : (
        ""
      )}
    </>
  );
};

export default AdminBookingList;
