import { useSelector } from "react-redux";
import style from "../../css/layout/page_nav.module.css";

const Pagefiltergation = ({ getFilterList, checkItemSuper }) => {
  const pv = useSelector((state) =>
    state.board.pvfilter ? state.board.pvfilter : { currentPage: 1 }
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
              getFilterList(
                Math.max(pv.startPage - pv.blockPage, 1),
                checkItemSuper
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
            <span onClick={() => getFilterList(pnum, checkItemSuper)}>
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
              getFilterList(pv.startPage + pv.blockPage, checkItemSuper)
            }
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagefiltergation;
