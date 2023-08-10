// 결제실패.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../apiurl';

const PaymentFailContainer = async () => {
  const location = useLocation(); // location.search = ?token=asdfasdf&refreshToken=asdf

  const navigate = useNavigate();

  const params = new URLSearchParams(location.search); // params = token:asdfasdf, refreshToken=asdf key-value 형태로 저장
  const code = params.get('code');
  const message = params.get('message');

  return (
    <div>
      <div>결제 실패했으니 다시 시도해주세요</div>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <div>{code}</div>
      <div>{message}</div>
    </div>
  );
};

export default PaymentFailContainer;
