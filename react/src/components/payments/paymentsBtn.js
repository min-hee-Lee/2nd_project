import React from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import KakaoPay from "./kakaoPay/kakaoPay";
import style from "../../css/payments/Calendarp.module.css";

const PaymentsButton = (props) => {
  const clientKey = "test_ck_YPBal2vxj81Wxn1n5vAV5RQgOAND";
  const originUrl = `http://localhost:3000`;

  const { booking } = props;

  const { use_date, main_code, t_id, start_time, end_time, cost, main_name } =
    booking;

  // console.log(booking);
  // console.log(main_name);
  // console.log(use_date);
  // console.log(main_code);
  // console.log(cost);

  const totieTime = end_time + 1 - start_time;

  //console.log(use_date);

  // const booking = {
  //   use_date: selectedDate,
  //   main_code: main_code,
  //   t_id: t_id,
  //   start_time: start,
  //   end_time: end,
  //   cost: totleCost,
  // };

  const payment = () => {
    loadTossPayments(clientKey).then((tossPayments) => {
      tossPayments
        .requestPayment("카드", {
          amount: Number(cost), //상품금액 0
          orderId: `${t_id}_${main_code}_${start_time}_${end_time}_${cost}_${use_date}`, //부킹 코드 0
          orderName: `${main_name}`, // 상품명 0
          customerName: `${t_id}`, // 유저네임 t_id
          successUrl: "http://localhost:3000/success",
          failUrl: "http://localhost:3000/fail",
        })

        //   tossPayments.requestPayment('카드', {
        //   amount: 1, // 가격
        //   orderId: '123', // 주문 id
        //   orderName: `gagyeong`, // 결제 이름
        //   customerName: `123`, // 판매자, 판매처 이름
        //   successUrl: 'http://localhost:3000/success', // 성공시 리다이렉트 주소
        //   failUrl: 'http://localhost:3000/fail', // 실패시 리다이렉트 주소
        //   })
        .catch(function (error) {
          if (error.code === "USER_CANCEL") {
            // 결제 고객이 결제창을 닫았을 때 에러 처리
          } else if (error.code === "INVALID_CARD_COMPANY") {
            // 유효하지 않은 카드 코드에 대한 에러 처리
          }
        });
    });
  };
  // React를 사용하는 경우
  //     useEffect(() => {
  //     return () => {
  //       tossPayments.cancelPayment();
  //     };
  //   }, [tossPayments]);

  return (
    <div className={style.payMethod}>
      <button className="btn_lively" onClick={payment}>
        결제하기
      </button>
      <KakaoPay booking={booking} />
    </div>
  );
};

export default PaymentsButton;
