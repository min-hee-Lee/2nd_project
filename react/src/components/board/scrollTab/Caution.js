import styles from "../../../css/board/scrollTab/ScrollTab.module.css"; //공통 css
import style from "../../../css/board/scrollTab/Caution.module.css";

const Caution = (props) => {
  const { boardDetail } = props;

  const refundRuleIoop = [];
  for (let i = 0; i < boardDetail.refundRuleDTO.length; i++) {
    refundRuleIoop.push(i);
  }

  return (
    <div className={styles.inner}>
      <div className={styles.box}>
        <h4>주의사항</h4>
        <div className={style.caution}>
          {/*<span>{boardDetail.warningDTO.warn_info}</span>
          <br /> */}
          <div
            className={style.data}
            dangerouslySetInnerHTML={{
              __html: boardDetail.warningDTO.warn_info_detail.replace(
                /\//g,
                "<br />"
              ),
            }}
          ></div>
        </div>
      </div>

      <div className={styles.box}>
        <h4>환불규정</h4>
        <div className={style.refund}>
          {refundRuleIoop.map((num, idx) => (
            <div key={num} className={style.rf}>
              <span>{boardDetail.refundRuleDTO[num].refund_info}</span>
              <br />
              <div
                className={style.data}
                dangerouslySetInnerHTML={{
                  __html: boardDetail.refundRuleDTO[
                    num
                  ].refund_info_detail.replace(/\//g, "<br />"),
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Caution;
