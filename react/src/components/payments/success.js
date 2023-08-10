// 결제성공.tsx
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../apiurl";

const PaymentSuccessContainer = () => {
  const navigate = useNavigate();

  const location = useLocation(); // location.search = ?token=asdfasdf&refreshToken=asdf
  const params = new URLSearchParams(location.search); // params = token:asdfasdf, refreshToken=asdf key-value 형태로 저장
  const paymentKey = params.get("paymentKey");
  const orderId = params.get("orderId");
  const amount = params.get("amount");

  useEffect(() => {
    axios
      .post(
        `${baseUrl}/payments/success?paymentKey=${paymentKey}&amount=${amount}&orderId=${orderId}`
      )
      .then((response) => {
        if (response.data == "success") {
          window.alert("결제가 완료되었습니다!");
          navigate("user/payPage/1");
        }
      })
      .catch((err) => {
        navigate("/fail");
      });
  }, []);
  return (
    <div>
      <div>결제 성공</div>
      <div>{paymentKey}</div>
      <div>{orderId}</div>
      <div>{amount}</div>
    </div>
  );
};

export default PaymentSuccessContainer;
