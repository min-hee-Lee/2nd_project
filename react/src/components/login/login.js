import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../apiurl";
import axios from "axios";

import style from "../../css/login/Login.module.css";
import PersonIcon from "@material-ui/icons/Person";
import ForgotPassword from "./forgotPassword";
import { Modal } from "@material-ui/core";

const Login = () => {
  const [inputs, setInputs] = useState({
    t_username: "",
    t_password: "",
  });

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const { t_username, t_password } = inputs;

  const config = { headers: { "Content-Type": "application/json" } };

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  /* 비밀번호 찾기*/
  const [findOpen, setFindOpen] = useState(false);
  const handleOpen = (index) => {
    setFindOpen(true);
  };
  const handleClose = () => {
    setFindOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseUrl}/login`, inputs, config)
      .then((response) => {
        let jwtToken = response.headers.get("Authorization");
        let userInfo = response.data;
        //console.log("response", usetInfo);
        //console.log("jwtToken", jwtToken)

        let jwtId = userInfo.t_id;
        let jwtusername = userInfo.t_username;
        let jwtRole = userInfo.t_role;

        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("id", jwtId);
        localStorage.setItem("username", jwtusername);
        localStorage.setItem("role", jwtRole);
        localStorage.setItem("isLogin", "true");

        //초기화 시켜주는것
        setInputs({ t_username: "", t_password: "" });
      })
      .then((response) => {
        if (localStorage.getItem("role") !== "ROLE_ADMIN") {
          window.location.replace("/home");
        } else {
          window.location.replace("admin/payPage/1");
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 401) {
            setmemberCheck("아이디 또는 비밀번호를 확인해주세요");
            usernameRef.current.style.border = "0";
            usernameRef.current.style.border = "3px solid red";
            passwordRef.current.style.border = "0";
            passwordRef.current.style.border = "3px solid red";
          }
        }
      });
  };
  const [memberCheck, setmemberCheck] = useState("");

  return (
    <>
      <h1>LOGIN</h1>
      <div className={style.login}>
        <PersonIcon style={{ fontSize: 50 }} />
        <div style={{ color: "red" }}>{memberCheck}</div>
        <form onSubmit={onSubmit}>
          <div className={style.form_item}>
            <input
              type="text"
              name="t_username"
              id="t_username"
              value={t_username}
              placeholder="아이디"
              maxLength="20"
              onChange={handleValueChange}
              ref={usernameRef}
            />
          </div>
          <div className={style.form_item}>
            <input
              type="password"
              name="t_password"
              id="t_password"
              value={t_password}
              placeholder="비밀번호"
              maxLength="20"
              onChange={handleValueChange}
              ref={passwordRef}
            />
          </div>
          <div className={style.form_btn}>
            <button type="submit" className="btn_lively">
              로그인
            </button>
          </div>
        </form>

        <div className={style.signBox}>
          <div>
            <Link to="/joinadd">회원가입</Link>
          </div>
          <div>
            <button onClick={handleOpen}>비밀번호 찾기</button>
          </div>
        </div>
        <Modal
          open={findOpen}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={style.find}>
            <button onClick={handleClose}>X</button>
            <div className={style.findBox}>
              <h4>비밀번호 찾기</h4>
              <ForgotPassword />
            </div>
          </div>
        </Modal>

        <div className={style.other_login}>
          <hr />
          <p>다른 방법으로 로그인</p>
          <div className={style.btn}>
            <a href="http://localhost:8090/oauth2/authorization/google?redirect_uri=http://localhost:3000/login/redirect">
              <img src={"/images/login/btn_google.png"} />
            </a>
          </div>
          <div className={style.btn}>
            <a href="http://localhost:8090/oauth2/authorization/naver?redirect_uri=http://localhost:3000/login/redirect">
              <img src={"/images/login/btn_naver.png"} />
            </a>
          </div>
          <div className={style.btn}>
            <a href="http://localhost:8090/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login/redirect">
              <img src={"/images/login/btn_kakao.png"} />
            </a>
          </div>
          <div className={style.btn}>
            <a href="http://localhost:8090/oauth2/authorization/facebook?redirect_uri=http://localhost:3000/login/redirect">
              <img src={"/images/login/btn_facebook.png"} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
