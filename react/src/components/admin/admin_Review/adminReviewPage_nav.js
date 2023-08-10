import { useSelector } from "react-redux";
import style from "../../../css/layout/page_nav.module.css";

const AdminReviewPageNavigation = ({ getAdminReviewList, content }) => {
  const pv = useSelector((state) =>
    state.board.pvAdmin_Review_List
      ? state.board.pvAdmin_Review_List
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
              getAdminReviewList(
                Math.max(pv.startPage - pv.blockPage, 1),
                content
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
            <span onClick={() => getAdminReviewList(pnum, content)}>
              {pnum}
            </span>
          </li>
        ))}

        <li
          className={pv.endPage >= pv.totalpage ? style.nextNo : style.nextYes}
        >
          <span
            onClick={() =>
              getAdminReviewList(pv.startPage + pv.blockPage, content)
            }
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default AdminReviewPageNavigation;
