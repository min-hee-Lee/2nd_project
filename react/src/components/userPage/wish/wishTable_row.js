import { Link } from "react-router-dom";

const UserWishTableRow = (props) => {
  const { board } = props;

  //console.log(board);

  //console.log(board.main_code);

  return (
    <tr>
      <td>{board.rm}</td>
      <td>
        <>
          <Link to={`/board/list/detail/${board.main_code}`}>
            <img
              alt={board.filename}
              src={board.filepath}
              width="50"
              height="50"
            />
          </Link>
        </>
      </td>
      <td>{board.filename}</td>
      <td>
        {board.cost.toLocaleString()}원 / 🕒{board.time_about}시간당
      </td>
      <td>{board.avg_rating}점</td>
      <td>{board.count_rating}개</td>
      <td>{board.title}</td>
      {/* <td>{board.main_address}</td> */}
      <td style={{ textAlign: "center" }}>
        <Link
          to={`/board/list/detail/${board.main_code}`}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          상세페이지로 이동
        </Link>
      </td>
    </tr>
  );
};

export default UserWishTableRow;
