import styles from "../../../css/board/scrollTab/ScrollTab.module.css"; //공통 css
import style from "../../../css/board/scrollTab/Detail.module.css";

import DriveEtaIcon from "@material-ui/icons/DriveEta"; //주차Icon
import WcIcon from "@material-ui/icons/Wc"; //화장실Icon
import AcUnitIcon from "@material-ui/icons/AcUnit"; //에어컨Icon
import DeckIcon from "@material-ui/icons/Deck"; //기타Icon
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import block from "../../../img/block.gif";

const Detail = (props) => {
  const { boardDetail } = props;

  return (
    <div className={styles.inner}>
      <div className={styles.box}>
        <h4>소개</h4>
        <pre className={style.intro}>{boardDetail.info_detail}</pre>
      </div>
      {/* <div className={`${styles.box} ${style.tip}`}>
        <h4>공간이용팁</h4>
        <div className={style.data}>여기에 공간이용팁 데이터</div>
      </div> */}
      <div className={styles.box}>
        <h4>시설정보</h4>
        <div className={style.info}>
          <div className={style.data}>
            <img src={block} />
          </div>

          {/* 체육관 시설관리 정보 */}
          <div className={style.data}>
            <div className={style.left}>
              <div>면적</div>
              <div>가로</div>
              <div>세로</div>
              <div>천정높이</div>
              <div>최대인원</div>
            </div>

            <div className={style.right}>
              <div>
                {boardDetail.placeInfoDTO.area
                  ? boardDetail.placeInfoDTO.area
                  : "--"}
              </div>
              <div>
                {boardDetail.placeInfoDTO.width
                  ? boardDetail.placeInfoDTO.width
                  : "-"}
              </div>
              <div>
                {boardDetail.placeInfoDTO.length
                  ? boardDetail.placeInfoDTO.length
                  : "--"}
              </div>
              <div>
                {boardDetail.placeInfoDTO.heigth
                  ? boardDetail.placeInfoDTO.heigth
                  : "--"}
              </div>
              <div>
                {boardDetail.placeInfoDTO.max
                  ? boardDetail.placeInfoDTO.max
                  : "--"}
              </div>
            </div>
          </div>
        </div>

        <div className={style.infoIcon}>
          <div className={style.group}>
            <div className={style.icon}>
              <DriveEtaIcon style={{ fontSize: "40px" }} />
            </div>
            <div className={style.item}>
              <p>주차공간</p>
              <p>{boardDetail.mainConDTO.parking}</p>
            </div>
          </div>

          <div className={style.group}>
            <div className={style.icon}>
              <WcIcon style={{ fontSize: "40px" }} />
            </div>
            <div className={style.item}>
              <p>화장실</p>
              <p>{boardDetail.mainConDTO.toilet}</p>
            </div>
          </div>

          <div className={style.group}>
            <div className={style.icon}>
              <AcUnitIcon style={{ fontSize: "40px" }} />
            </div>
            <div className={style.item}>
              <p>냉방</p>
              <p>{boardDetail.mainConDTO.aircon}</p>
            </div>
          </div>

          <div className={style.group}>
            <div className={style.icon}>
              <DeckIcon style={{ fontSize: "40px" }} />
            </div>
            <div className={style.item}>
              <p>편의시설</p>
              <p>{boardDetail.mainConDTO.comfort}</p>
            </div>
          </div>

          <div className={style.group}>
            <div className={style.icon}>
              <PlaylistAddIcon style={{ fontSize: "40px" }} />
            </div>
            <div className={style.item}>
              <p>기타</p>
              <p>{boardDetail.mainConDTO.etc}</p>
            </div>
          </div>

          <div className={style.group}>
            <div className={style.icon}>
              <PlaylistAddIcon style={{ fontSize: "40px" }} />
            </div>
            <div className={style.item}>
              <p>기타</p>
              <p>{boardDetail.mainConDTO.sound}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
