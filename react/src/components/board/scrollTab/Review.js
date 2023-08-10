import styles from "../../../css/board/scrollTab/ScrollTab.module.css"; //공통 css
import style from "../../../css/board/scrollTab/Review.module.css";
import star from "../../../img/star.gif";
import BoardReView from "../../review/board_Review";

const Review = (props) => {
  const { boardDetail } = props;

  return (
    <div className={styles.inner}>
      <div className={styles.box}>
        <div className={style.list}>
          <div className={style.mold}>
            <div className={style.count}>
              후기&nbsp;<span>{boardDetail.count_rating}</span>
              건&nbsp;&nbsp;&nbsp;답변&nbsp;
              <span>{boardDetail.manager_coment}</span>건
            </div>
            <div className={style.area}>
              <div className={style.rt}>
                <div className={style.star}>
                  <img src={star} />
                  <span>{boardDetail.avg_rating}</span>
                </div>
                <div className={style.total}>
                  <div className={style.totalp}>
                    <span>{boardDetail.count_rating}</span>
                    건의 후기 중
                    <br />
                    <span>{boardDetail.five_star_percentage}%</span>의 고객님이
                    5점을 주었어요.
                  </div>
                </div>
              </div>
            </div>
            <BoardReView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
