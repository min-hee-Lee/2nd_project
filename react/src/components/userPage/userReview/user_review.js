import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../../reduxs/actions/board_action";
import UserReviewTableRow from "./userBookingTable_row";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import UserReviewPageNavigation from "./userReview_nav";
import styles from "../../../css/layout/MyPageLayout.module.css";
import ur from "../../../css/userPage/review.module.css";

const UserReview = () => {
  const dispatch = useDispatch();

  //const navigator = useNavigate();

  const t_id = localStorage.id;

  //const t_id = local 스토리지에서 가져와야함

  const { currentPage } = useParams();

  const UserReviewList = useSelector((state) => state.board.UserReviewList);

  console.log(UserReviewList);

  const pv = useSelector((state) =>
    state.board.pvUserReviewList
      ? state.board.pvUserReviewList
      : { currentPage: 1 }
  );

  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getUserReviewList = (currentPage, t_id) => {
    dispatch(boardActions.getUserReviewList(currentPage, t_id));
    //navigator(`/admin/payPage/${currentPage}`);
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getUserReviewList(currentPage, t_id);
  }, []);

  return (
    <>
      <div className={styles.pageTitle}>
        <h1>댓글 목록</h1>
      </div>

      <div className={styles.page_inner}>
        <table class="table" style={{ margin: "50px 0" }}>
          <thead>
            <tr>
              <th>코드</th>
              <th>사진</th>
              <th>후기 작성일</th>
              <th>후기 수정일</th>
              <th>별점</th>
              <th>후기 내용</th>
              <th>후기 이미지</th>
            </tr>
          </thead>
          <tbody>
            {UserReviewList &&
              UserReviewList.map((board) => {
                return (
                  <UserReviewTableRow
                    board={board}
                    key={board.review_code}
                  ></UserReviewTableRow>
                );
              })}
          </tbody>
        </table>
        {pv ? (
          <UserReviewPageNavigation
            t_id={t_id}
            getUserReviewList={getUserReviewList}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UserReview;
