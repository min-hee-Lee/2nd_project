import { Link } from "react-router-dom";
import KakaoPayCancle from "../payments/bookingCencel/kakaoPayCancle";
import PaymentsCancle from "../payments/bookingCencel/paymenstCancle";

const UserBookingTableRow = (props) => {
  const { board } = props;

  //console.log(board);
  //console.log(board.main_code);

  return (
    <tr style={{ lineHeight: "50px" }}>
      {/* 코드 */}
      <td>{board.booking_code}</td>
      {/* 체육관사진 */}
      <td>
        <>
          <Link to={`/board/list/detail/${board.main_code}`}>
            <img
              alt={board["user_PageDTO"].filename}
              src={board["user_PageDTO"].filepath}
              width="50"
              height="50"
            />
          </Link>
        </>
      </td>
      {/* 체육관명 */}
      <td>{board.user_PageDTO.filename}</td>
      {/* 예약 날짜 */}
      <td>{board.booking_date.split(" ")[0]}</td>
      {/* 예약 상태 
      <td>{board.booking_state}</td> */}
      {/* 사용 날짜 */}
      <td>{board.use_date.split(" ")[0]}</td>
      {/* 구매 가격 */}
      <td>{board.cost.toLocaleString()}원</td>
      {/* 예약 시간 */}
      <td>
        🕒{board.start_time} ~ {board.end_time}
      </td>
      {/* 유저 번호 */}
      {/* <td>{board.t_id}</td> */}
      {/* 결제 타입
      <td>{board.type}</td> */}
      {/* 결제 방법*/}
      <td>{board.provider}</td>

      {/* 취소날짜/ 없으면 null */}
      <td>{board.cancle_date}</td>

      <td style={{ textAlign: "center" }}>
        {board.provider === "kakaoPay" ? (
          <KakaoPayCancle booking_code={board.booking_code}></KakaoPayCancle>
        ) : (
          <PaymentsCancle booking_code={board.booking_code}></PaymentsCancle>
        )}
      </td>
    </tr>
  );
};

export default UserBookingTableRow;
