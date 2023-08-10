import { useSelector } from "react-redux";
import style from "../../css/layout/page_nav.module.css";

const MapPageNavigation = ({ getMapList, newDistance }) => {
  console.log(newDistance);

  const pv = useSelector((state) =>
    state.board.pvMap ? state.board.pvMap : { currentPage: 1 }
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
              getMapList(Math.max(pv.startPage - pv.blockPage, 1), newDistance)
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
            <span onClick={() => getMapList(pnum, newDistance)}>{pnum}</span>
          </li>
        ))}

        <li
          className={
            pv.totalPage === pv.currentPage ? style.nextNo : style.nextYes
          }
        >
          <span
            onClick={() => getMapList(pv.startPage + pv.blockPage, newDistance)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default MapPageNavigation;
