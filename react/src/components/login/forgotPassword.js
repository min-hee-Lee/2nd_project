import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../apiurl";

import style from "../../css/login/Login.module.css";

const ForgotPassword = () => {
  //const [errorMsg, setErrorMsg] = useState('');

  const [inputs, setInputs] = useState({
    t_username: "",
    t_email: "",
  });

  const [message, setMessage] = useState("");

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const config = { headers: { "Content-Type": "application/json" } };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/forget-password`,
        inputs,
        config
      );
      if (response.status === 200 || response.status === 201) {
        setMessage(response.data);

        setInputs({
          t_username: "",
          t_email: "",
        });
      }
    } catch (err) {
      if (err.response.status === 400) {
        setMessage(err.response.data);

        setInputs({
          t_username: "",
          t_email: "",
        });
      }
      console.error(err.message);
    }

    // await axios
    //   .post(`${baseUrl}/forget-password`, inputs, config)
    //   .then((response) => {
    //     if (response.status === 200 || response.status === 201) {
    //       alert(response.data);

    //       setInputs({
    //         t_username: '',
    //         t_email: '',
    //       });
    //     }
    //     //setErrorMsg(response.data);
    //     // console.log(response.statusText());
    //   })
    //   .catch((err) => {
    //     //console.log(err.response.data);
    //     if (err.response.status === 400) {
    //       //setErrorMsg('아이디 또는 비밀번호가 맞지 않습니다.');

    //       alert(err.response.data);

    //       setInputs({
    //         t_username: '',
    //         t_email: '',
    //       });
    //     }
    //     console.error(err.message);
    //   });
  };

  return (
    <>
      {message && <p>{message}</p>}
      {/* {errorMsg && <p>{errorMsg}</p>}
      <p>{errorMsg}</p> */}
      <form onSubmit={onSubmit}>
        <div className={style.form_item}>
          <input
            type="text"
            name="t_username"
            className="form-control"
            id="t_username"
            placeholder="아이디"
            maxLength="20"
            value={inputs.t_username}
            onChange={handleValueChange}
          />
        </div>
        <div className={style.form_item}>
          <input
            type="email"
            className="form-control"
            name="t_email"
            id="t_email"
            placeholder="이메일"
            maxLength="20"
            value={inputs.t_email}
            onChange={handleValueChange}
          />
        </div>
        <div className={style.form_btn}>
          <button type="submit" className="btn_lively">
            비밀번호 찾기
          </button>
        </div>
      </form>
      <p>한번만 클릭해주세요.</p>
    </>
  );
};

export default ForgotPassword;
