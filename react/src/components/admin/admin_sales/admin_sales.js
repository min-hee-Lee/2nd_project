import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../../reduxs/actions/board_action";
import AdminSalesTableRow from "./adminSalesTable_row";
import AdminSalesPageNavigation from "./adminSalesPage_nav";
import style from "../../../css/admin/AdminSales.module.css";
import SearchIcon from "@material-ui/icons/Search"; //검색 Icon

const AdminSales = () => {
  const dispatch = useDispatch();

  const navigator = useNavigate();

  const [selectRowId, setSelectRowId] = useState(null);

  const { currentPage } = useParams();

  const AdminSalesList = useSelector((state) => state.board.Admin_sales_List);

  const [newfilename, setFilename] = useState({
    filename: "",
  });

  const { filename } = newfilename;

  console.log(AdminSalesList);

  const pv = useSelector((state) =>
    state.board.pvAdmin_sales_List
      ? state.board.pvAdmin_sales_List
      : { currentPage: 1 }
  );

  const handleValueChange = (e) => {
    setFilename((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValueSubmit = () => {
    getAdminSalesList(currentPage, filename);
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

  const getAdminSalesList = (currentPage, filename) => {
    dispatch(boardActions.getAdminSalesList(currentPage, filename));
    // navigator(`/admin/sales/${currentPage}`);
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getAdminSalesList(currentPage, filename);
  }, [currentPage]);

  return (
    <>
      <div className={style.main_inner}>
        <h2>체육관 매출 관리</h2>

        <div className={style.search}>
          <input
            type="text"
            className="form-control"
            name="filename"
            placeholder="체육관명 ..."
            value={newfilename.filename}
            onChange={handleValueChange}
            onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 등록
          />
          <button onClick={handleValueSubmit} className={style.btn_search}>
            <SearchIcon style={{ fontSize: "35px" }} />
          </button>
        </div>

        <div className={style.container}>
          {AdminSalesList &&
            AdminSalesList.map((board) => (
              <AdminSalesTableRow
                board={board}
                key={board.rm}
                isSelected={selectRowId === board.rm}
                onSelect={() => setSelectRowId(board.rm)}
              ></AdminSalesTableRow>
            ))}
        </div>
      </div>
      {pv ? (
        <AdminSalesPageNavigation
          getAdminSalesList={getAdminSalesList}
          filename={filename}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AdminSales;
