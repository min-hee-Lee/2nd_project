import { useSelector } from "react-redux";
import style from "../../../css/layout/page_nav.module.css";

const UserReviewPageNavigation = (props) => {
  const { t_id, getUserReviewList } = props;

  const pv = useSelector((state) =>
    state.board.pvUserReviewList
      ? state.board.pvUserReviewList
      : { currentPage: 1 }
  );

  const pageNamebers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNamebers.push(i);
  }

  return (
    <nav arial-label="..." className={style.pageNav}>
      <ul>
        <li className={pv.startPage <= 1 ? style.prevNo : style.prevYes}>
          <a
            href="#!"
            onClick={() =>
              getUserReviewList(Math.max(pv.startPage - pv.blockPage, 1), t_id)
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
            <span onClick={() => getUserReviewList(pnum, t_id)}>{pnum}</span>
          </li>
        ))}

        <li
          className={
            pv.totalPage === pv.currentPage ? style.nextNo : style.nextYes
          }
        >
          <span
            onClick={() => getUserReviewList(pv.startPage + pv.blockPage, t_id)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default UserReviewPageNavigation;
