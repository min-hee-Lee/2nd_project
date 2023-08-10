/* 다른방법로그인시 redirect */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Redircet = () => {
  const location = useLocation(); // location.search = ?token=asdfasdf&refreshToken=asdf
  const params = new URLSearchParams(location.search); // params = token:asdfasdf, refreshToken=asdf key-value 형태로 저장

  const token = params.get("token");
  const t_id = params.get("t_id");
  const t_username = params.get("t_username");
  const t_role = params.get("t_role");

  console.log(token);

  useEffect(() => {
    // token 저장
    localStorage.setItem("Authorization", token);

    localStorage.setItem("id", t_id);
    localStorage.setItem("username", t_username);
    localStorage.setItem("role", t_role);
    localStorage.setItem("isLogin", "true");
  });

  //redirect
  window.location.href = "/board/list/1";

  return <></>;
};

export default Redircet;
