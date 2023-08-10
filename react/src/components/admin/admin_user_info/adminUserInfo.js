import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../../reduxs/actions/board_action";
import { useEffect, useState } from "react";
import AdminUserInfoTableRow from "./adminUserInfoTable_row";
import AdminUserInfoPageNavigation from "./adminUserInfoPage_nav";
import style from "../../../css/admin/AdminUserInfo.module.css";
import SearchIcon from "@material-ui/icons/Search"; //검색 Icon

const AdminUserInfo = () => {
  const dispatch = useDispatch();

  const navigator = useNavigate();

  const { currentPage } = useParams();

  const [newfilename, setFilename] = useState({
    filename: "",
  });

  const { filename } = newfilename;

  const handleValueChange = (e) => {
    setFilename((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValueSubmit = () => {
    getAdminUserList(currentPage, filename);
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

  const AdminUserInfo = useSelector((state) => state.board.Admin_User_Info);

  console.log(AdminUserInfo);

  const pv = useSelector((state) =>
    state.board.pvAdmin_User_Info
      ? state.board.pvAdmin_User_Info
      : { currentPage: 1 }
  );

  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getAdminUserList = (currentPage, filename) => {
    dispatch(boardActions.getAdminUserList(currentPage, filename));
    // navigator(`/admin/userInfo/${currentPage}`);
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getAdminUserList(currentPage, filename);
  }, []);

  return (
    <>
      <div className={style.main_inner}>
        <h2>회원 정보 상세 페이지</h2>

        <div className={style.search}>
          <input
            type="text"
            className="form-control"
            name="filename"
            placeholder="사용자 ID ..."
            value={newfilename.filename}
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
            <tr className={style.head}>
              <th>회원 코드</th>
              <th>아이디</th>
              <th>이메일</th>
              <th>주소</th>
              <th>가입일</th>
              <th>개인정보 수정일</th>
              <th>전화번호</th>
              <th>...</th>
              <th>...</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {AdminUserInfo &&
              AdminUserInfo.map((board, index) => {
                return (
                  <AdminUserInfoTableRow
                    board={board}
                    key={board.t_id}
                  ></AdminUserInfoTableRow>
                );
              })}
          </tbody>
        </table>
      </div>
      {pv ? (
        <AdminUserInfoPageNavigation
          getAdminUserList={getAdminUserList}
          filename={filename}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AdminUserInfo;
