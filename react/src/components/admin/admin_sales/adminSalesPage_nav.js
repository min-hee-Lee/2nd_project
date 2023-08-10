import { useSelector } from "react-redux";
import style from "../../../css/layout/page_nav.module.css";

const AdminSalesPageNavigation = ({ getAdminSalesList, filename }) => {
  const pv = useSelector((state) =>
    state.board.pvAdmin_sales_List
      ? state.board.pvAdmin_sales_List
      : { currentPage: 1 }
  );
  const pageNamebers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNamebers.push(i);
  }

  return (
    <nav
      arial-label="..."
      className={style.pageNav}
      style={{ paddingBottom: "50px" }}
    >
      <ul>
        <li className={pv.startPage <= 1 ? style.prevNo : style.prevYes}>
          <a
            href="#!"
            onClick={() =>
              getAdminSalesList(
                Math.max(pv.startPage - pv.blockPage, 1),
                filename
              )
            }
          >
            &laquo;
          </a>
        </li>
        {pageNamebers.map((pnum, idx) => (
          <li
            key={pnum}
            className={pv.currentPage === pnum ? style.active : style.activeNo}
            aria-current={pv.currentPage === pnum ? "page" : null}
          >
            <span onClick={() => getAdminSalesList(pnum, filename)}>
              {pnum}
            </span>
          </li>
        ))}

        <li
          className={
            pv.totalPage === pv.currentPage ? style.nextNo : style.nextYes
          }
        >
          <span
            onClick={() =>
              getAdminSalesList(pv.startPage + pv.blockPage, filename)
            }
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSalesPageNavigation;
