import axios from "axios";
import { baseUrl } from "../../../apiurl";

const PaymentsCancle = (props) => {
  const { booking_code } = props;

  const CancleHendler = async (e) => {
    e.preventDefault();

    alert("정말 취소하시겠습니까?");

    await axios
      .post(`${baseUrl}/payments/cancel`, {
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
        토스페이먼츠 예약취소
      </button>
    </>
  );
};

export default PaymentsCancle;
