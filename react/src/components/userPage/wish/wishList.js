import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../../reduxs/actions/board_action";
import { useNavigate, useParams } from "react-router-dom";
import UserWishPageNavigation from "./wishListPage_nav";
import { useEffect } from "react";
import styles from "../../../css/layout/MyPageLayout.module.css";
import UserWishTableRow from "./wishTable_row";

const WishList = () => {
  const dispatch = useDispatch();

  const t_id = localStorage.id;

  console.log(t_id);

  //const t_id = local 스토리지에서 가져와야함

  const { currentPage } = useParams();

  const UserPageWishList = useSelector((state) => state.board.userWishList);

  console.log(UserPageWishList);

  const pv = useSelector((state) =>
    state.board.pvWishList ? state.board.pvWishList : { currentPage: 1 }
  );

  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getWishList = (currentPage, t_id) => {
    dispatch(boardActions.getWishList(currentPage, t_id));
    //navigator(`/admin/payPage/${currentPage}`);
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getWishList(currentPage, t_id);
  }, []);

  return (
    <>
      <div className={styles.pageTitle}>
        <h1>찜 목록</h1>
      </div>

      <div className={styles.page_inner}>
        <table class="table" style={{ margin: "50px 0", textAlign: "center" }}>
          <thead>
            <tr>
              <th>코드</th>
              <th>사진</th>
              <th>체육관명</th>
              <th>금액</th>
              <th>별점</th>
              <th>후기 개수</th>
              <th>카테고리</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody style={{ lineHeight: "50px" }}>
            {UserPageWishList &&
              UserPageWishList.map((board) => {
                return (
                  <UserWishTableRow
                    board={board}
                    key={board.wish_code}
                  ></UserWishTableRow>
                );
              })}
          </tbody>
        </table>
        {pv ? (
          <UserWishPageNavigation t_id={t_id} getWishList={getWishList} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default WishList;
