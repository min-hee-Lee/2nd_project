import { useSelector } from "react-redux";
import style from "../../css/layout/page_nav.module.css";

const PageNavigationReview = (props) => {
  const { main_code, getBoardReviewList } = props;
  //console.log(getBoardReviewList);

  //console.log(main_code);

  const pv = useSelector((state) =>
    state.board.pvReview ? state.board.pvReview : { currentPage: 1 }
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
              getBoardReviewList(
                Math.max(pv.startPage - pv.blockPage, 1),
                main_code
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
            <span onClick={() => getBoardReviewList(pnum, main_code)}>
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
              getBoardReviewList(pv.startPage + pv.blockPage, main_code)
            }
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigationReview;
