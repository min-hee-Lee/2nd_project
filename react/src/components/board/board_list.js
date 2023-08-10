import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../reduxs/actions/board_action";
import TableRow from "./table_row";
import PageNavigation from "./page_nav";

import Filter from "./filter/filter"; //검색 필터
import Pagefiltergation from "./page_nav_filter";

import style from "../../css/board/BoardList.module.css";
import SearchIcon from "@material-ui/icons/Search"; //검색 Icon

const BoardList = () => {
  const [check, setCheck] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [checkItemSuper, setcheckItemSuper] = useState([]);

  const [userWish, setUserWish] = useState({
    t_id: localStorage.id,
  });

  if (localStorage.getItem("t_id")) {
    setUserWish(localStorage.getItem("t_id"));
  }

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
    getBoardList(currentPage, filename);
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

  const dispatch = useDispatch();

  const navigator = useNavigate();

  const { currentPage } = useParams();

  const boardList = useSelector((state) => state.board.boardList);

  const filterboardList = useSelector((state) => state.board.filter_board_list);

  const pvfilter = useSelector((state) =>
    state.board.pvfilter ? state.board.pvfilter : { currentPage: 1 }
  );

  const wishSelectList = useSelector((state) => state.board.wish_Select_List);

  console.log(wishSelectList);

  console.log(boardList);

  console.log(filterboardList);

  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
  );

  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const resetHendler = () => {
    getBoardList(1, filename);
    setCheck(false);
  };

  const getBoardList = (currentPage, filename) => {
    dispatch(boardActions.getBoardList(currentPage, filename));
    navigator(`/board/list/${currentPage}`);
  };

  const getFilterList = (currentPage, checkItems) => {
    dispatch(boardActions.getFilterList(currentPage, checkItems));
  };

  const getWishSelectList = (t_id) => {
    dispatch(boardActions.getWishSelectList(t_id));
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getBoardList(currentPage, filename);
    setCheck(false);
    getWishSelectList(userWish);
  }, []);

  return (
    <div className={style.main_inner}>
      {/* 검색창 */}
      <div className={style.search}>
        <input
          type="text"
          className="form-control"
          name="filename"
          placeholder="체육관 이름"
          value={newfilename.filename}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 등록
        />
        <button onClick={handleValueSubmit} className={style.btn_search}>
          <SearchIcon style={{ fontSize: "35px" }} />
        </button>
      </div>

      {/* 검색필터 */}
      <Filter
        currentPage={currentPage}
        setCheck={setCheck}
        getFilterList={getFilterList}
        setcheckItemSuper={setcheckItemSuper}
      ></Filter>

      <div className={style.reset}>
        <button className="btn_lively" onClick={resetHendler}>
          기본페이지
        </button>
      </div>

      {!check ? (
        <>
          <div className={style.list_wrap}>
            {/* 체육관목록 */}
            <ul>
              {boardList &&
                boardList.map((board) => {
                  return (
                    <TableRow
                      board={board}
                      key={board.main_code}
                      wishSelectList={wishSelectList}
                    ></TableRow>
                  );
                })}
            </ul>
          </div>
          {pv && pv ? (
            <PageNavigation getBoardList={getBoardList} filename={filename} />
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <div className={style.list_wrap}>
            {/* 필터 처리 체육관목록 */}
            <ul>
              {filterboardList &&
                filterboardList.map((board, index) => {
                  return <TableRow board={board} key={board.am}></TableRow>;
                })}
            </ul>
          </div>
          {pvfilter && pvfilter ? (
            <Pagefiltergation
              checkItemSuper={checkItemSuper}
              getFilterList={getFilterList}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default BoardList;
