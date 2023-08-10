import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../../reduxs/actions/board_action";
import AdminReviewTableRow from "./adminReviewTable_row";
import AdminReviewPageNavigation from "./adminReviewPage_nav";
import style from "../../../css/admin/AdminReview.module.css";
import SearchIcon from "@material-ui/icons/Search"; //검색 Icon

const AdminReview = () => {
  const dispatch = useDispatch();

  const navigator = useNavigate();

  const { currentPage } = useParams();

  const AdminReviewList = useSelector((state) => state.board.Admin_Review_List);

  console.log(AdminReviewList);

  const [newfilename, setFilename] = useState({
    content: "",
  });

  const { content } = newfilename;

  const pv = useSelector((state) =>
    state.board.pvAdmin_Review_List
      ? state.board.pvAdmin_Review_List
      : { currentPage: 1 }
  );

  const handleValueChange = (e) => {
    setFilename((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValueSubmit = () => {
    getAdminReviewList(currentPage, content);
    setFilename({ filename: "" }); // 입력 값 초기화
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleValueSubmit();
    } else if (event.key === "Backspace") {
      setFilename((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value || "",
      }));
    }
  };
  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getAdminReviewList = (currentPage, content) => {
    dispatch(boardActions.getAdminReviewList(currentPage, content));
    //navigator(`/admin/payPage/${currentPage}`);
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getAdminReviewList(currentPage, content);
  }, [currentPage]);

  return (
    <>
      <div className={style.main_inner}>
        <h2>후기 관리</h2>

        <div className={style.search}>
          <input
            type="text"
            className="form-control"
            name="content"
            placeholder="댓글 내용"
            value={newfilename.content}
            onChange={handleValueChange}
            onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 등록
          />
          <button onClick={handleValueSubmit} className={style.btn_search}>
            <SearchIcon style={{ fontSize: "35px" }} />
          </button>
        </div>

        <table
          className={`${style.userInfo} table table-striped`}
          style={{ margin: "50px 0" }}
        >
          <thead>
            <tr>
              <th>아이디</th>
              <th>별점</th>
              <th>날짜</th>
              <th>댓글</th>
              <th>사진</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {AdminReviewList &&
              AdminReviewList.map((board) => {
                return (
                  <AdminReviewTableRow
                    board={board}
                    key={board.rm}
                  ></AdminReviewTableRow>
                );
              })}
          </tbody>
        </table>
      </div>
      {pv ? (
        <AdminReviewPageNavigation
          getAdminReviewList={getAdminReviewList}
          content={content}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AdminReview;
