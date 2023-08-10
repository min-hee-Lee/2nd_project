import { useSelector } from "react-redux";
import style from "../../css/layout/page_nav.module.css";

const PageNavigation = ({ getBoardList, filename }) => {
  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
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
              getBoardList(Math.max(pv.startPage - pv.blockPage, 1), filename)
            }
          >
            &laquo;
          </a>
        </li>

        {/* 현재페이지 */}
        {pageNamebers.map((pnum, idx) => (
          <li
            key={pnum}
            className={pv.currentPage === pnum ? style.active : style.activeNo}
            aria-current={pv.currentPage === pnum ? "page" : null}
          >
            <span onClick={() => getBoardList(pnum, filename)}>{pnum}</span>
          </li>
        ))}

        <li
          className={
            pv.totalPage === pv.currentPage ? style.nextNo : style.nextYes
          }
        >
          <span
            onClick={() => getBoardList(pv.startPage + pv.blockPage, filename)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
