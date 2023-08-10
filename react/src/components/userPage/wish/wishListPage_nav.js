import { useSelector } from "react-redux";
import style from "../../../css/layout/page_nav.module.css";

const UserWishPageNavigation = (props) => {
  const { t_id, getWishList } = props;

  const pv = useSelector((state) =>
    state.board.pvWishList ? state.board.pvWishList : { currentPage: 1 }
  );

  const pageNamebers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNamebers.push(i);
  }

  return (
    <nav arial-label="..." className={style.pageNav}>
      <ul>
        <li className={pv.startPage <= 1 ? style.No : style.prevYes}>
          <a
            href="#!"
            onClick={() =>
              getWishList(Math.max(pv.startPage - pv.blockPage, 1), t_id)
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
            <span onClick={() => getWishList(pnum, t_id)}>{pnum}</span>
          </li>
        ))}

        <li
          className={
            pv.totalPage === pv.currentPage ? style.nextNo : style.nextYes
          }
        >
          <span onClick={() => getWishList(pv.startPage + pv.blockPage, t_id)}>
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default UserWishPageNavigation;
