import axios from "axios";
import { baseUrl } from "../../../apiurl";

const KakaoPay = (props) => {
  const { booking } = props;

  console.log("kakao : " + booking);

  const kakaoEventHandler = async (e) => {
    e.preventDefault();

    //const data = { booking_code: 1, t_id: 2, pay: 3000 };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${baseUrl}/pay/kakaopay/`, booking, config)
      .then((response) => {
        console.log(response.data);

        const box = response.data.next_redirect_pc_url;

        window.location.href = box;
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <button className="btn_lively" onClick={kakaoEventHandler}>
      카카오페이 결제
    </button>
  );
};

export default KakaoPay;
