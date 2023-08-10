import axios from "axios";
import { baseUrl } from "../../../apiurl";

const KakaoPayCancle = (props) => {
  const { booking_code } = props;

  console.log(booking_code);

  const CancleHendler = async (e) => {
    e.preventDefault();

    alert("정말 취소하시겠습니까?");

    await axios
      .post(`${baseUrl}/kakaoPay/refund`, {
        booking_code: booking_code,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <button className="btn_lively" onClick={CancleHendler}>
        카카오페이 예약취소
      </button>
    </>
  );
};

export default KakaoPayCancle;
