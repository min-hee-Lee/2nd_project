import { useSelector } from "react-redux";
import style from "../../css/layout/page_nav.module.css";

const AdminBookingPageNavigation = ({ getAdminPayList }) => {
  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
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
              getAdminPayList(Math.max(pv.startPage - pv.blockPage, 1))
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
            <span onClick={() => getAdminPayList(pnum)}>{pnum}</span>
          </li>
        ))}

        <li
          className={
            pv.totalPage === pv.currentPage ? style.nextNo : style.nextYes
          }
        >
          <span onClick={() => getAdminPayList(pv.startPage + pv.blockPage)}>
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default AdminBookingPageNavigation;
