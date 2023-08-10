import { Link } from "react-router-dom";
import style from "../../css/map/SearchPlace2.module.css";

const MapTableRow = ({ board, isSelected, onSelect }) => {
  //console.log(board);
  //console.log(board.main_code);

  return (
    <div
      className={style.list}
      onClick={onSelect}
      style={{
        backgroundColor: isSelected ? "rgba(211, 211, 211, 0.4)" : "white",
      }}
    >
      <div className={style.listItem}>
        <div>{board.rm}</div>
        <div className={style.data}>
          <div>{board.filename}</div>
          <div>{board.main_address}</div>
        </div>
      </div>

      {/* <div>{board.main_code}</div>
      <Link to={`/board/list/detail/${board.main_code}`}>
        <img alt={board.filename} src={board.filepath} width="50" height="50" />
      </Link>
      <div>가격 : {board.cost}</div>
      <div>시간당 : {board.time_about}</div>
      <div>별점 : {board.avg_rating}</div>
      <div>총 개수 : {board.count_rating}</div>
      <div>사용목적 : {board.title}</div> */}
    </div>
  );
};

export default MapTableRow;
