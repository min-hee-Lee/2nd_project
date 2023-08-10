import { Link } from "react-router-dom";

const AdminBookingTableRow = (props) => {
  const { board } = props;

  console.log(board);

  //console.log(board.main_code);

  return (
    <tr>
      {/* 예약 번호 */}
      <td>{board.booking_code}</td>
      {/* 구매 날짜 */}
      <td>{board.booking_date}</td>
      {/* 예약 상태 */}
      <td>{board.booking_state}</td>
      {/* 사용 날짜 */}
      {/* <td>{board.use_date}</td> */}
      {/* 사용 날짜 */}
      <td>{board.use_date.split(" ")[0]}</td>

      {/*금액*/}
      {/* <td>₩{board.cost}</td> */}
      {/*금액*/}
      <td>₩{board.cost.toLocaleString()}원</td>

      {/* 사용 시간 */}
      <td>
        🕒{board.start_time}시 ~ {board.end_time}시
      </td>
      {/* 유저 번호 */}
      <td>{board.t_id}</td>
      {/* 결제 타입*/}
      <td>{board.type}</td>
      {/* 결제 방법*/}
      <td>{board.provider}</td>

      {/* 취소날짜/ 없으면 null */}
      <td>{board.cancle_date}</td>
    </tr>
  );
};

export default AdminBookingTableRow;
