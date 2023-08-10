import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../apiurl";
import axios from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";

import style from "../../css/login/JoinAdd.module.css";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";

const JoinAdd = () => {
  const navigator = useNavigate();
  const [members, setMembers] = useState({
    t_username: "",
    t_password: "",
    t_password2: "",
    t_email: "",
    t_phone: "",
    t_address: "",
    t_role: "",
  });

  const inputPw = useRef(null);
  const inputPwCheck = useRef(null);
  const inputAdress = useRef(null);
  const inputEmail = useRef(null);
  const inputPhone = useRef(null);

  const { t_username, t_password } = members;

  const [errors, setErrors] = useState({});

  //console.log(t_username);

  const config = { headers: { "Content-Type": "application/json" } };

  //여러개 then 가능
  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${baseUrl}/member/signup`, newData, config)
      .then((response) => {
        setMembers({
          t_username: "",
          t_password: "",
          t_password2: "",
          t_email: "",
          t_phone: "",
          t_address: "",
          t_role: "",
        });
      })
      .then((resposne) => {
        navigator("/login");
      })
      .catch((err) => {
        //console.log(err.response.data);
        setErrors(err.response.data);
        //console.error(err.message);
        console.log("ddd : ", errors);
      });
  };
  const [passwordCheck, setPasswordCheck] = useState("");

  const [doubleIdCheck, setDoubleIdCheck] = useState({
    t_password2: "",
  });

  const { t_password2 } = doubleIdCheck;

  const [fullAddress, setFullAddress] = useState("");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    setFullAddress(fullAddress);

    //setMembers({ ...members, ['t_address']: fullAddress });

    // setMembers((prevState) => ({
    //   ...prevState,
    //   t_address: fullAddress,
    // }));
  };

  const newData = {
    t_username: members.t_username,
    t_password: members.t_password,
    t_password2: members.t_password2,
    t_email: members.t_email,
    t_phone: members.t_phone,
    t_address: fullAddress,
    t_role: "",
  };

  const handleValueChange = (e) => {
    //radio 버튼에서는 e.preventDefault()를 하면 더블클릭을 해줘야 한다.
    //e.preventDefault();

    e.preventDefault();

    console.log(e.target.name);
    console.log(e.target.value);

    setMembers({ ...members, [e.target.name]: e.target.value });

    //setMembers({ ...members, ['t_password2']: t_password2 });

    if (e.target.name === "t_password") {
      if (t_password !== e.target.value && t_password2 !== "") {
        setPasswordCheck("비밀번호 불일치");
      } else if (e.target.value === members.t_password2) {
        setPasswordCheck("비밀번호 일치");
      }

      if (e.target.value === "" || members.t_password2 === "") {
        setPasswordCheck("");
      }
    }
  };

  const [duplicateIdCheck, setDuplicateIdCheck] = useState("");
  const inputId = useRef(null);

  const idCheck = async (e) => {
    await axios.post(`${baseUrl}/joinadd/idcheck`, members).then((response) => {
      console.log(response.data);

      if (t_username.length >= 8 && t_username.length <= 20) {
        if (response.data !== 1) {
          setDuplicateIdCheck("사용가능한 아이디입니다.");
        } else {
          setDuplicateIdCheck(
            <span style={{ color: "red" }}>이미 사용중인 아이디입니다.</span>
          );
          inputId.current.style.outlineColor = "red";
          inputId.current.focus();
        }
      } else {
        setDuplicateIdCheck("");
      }
    });
  };

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const passChang = (e) => {
    e.preventDefault();
    if (t_password === "" && t_password2 === "") {
      setPasswordCheck("");
    }

    console.log(e.target.value);
    console.log(e.target.name);

    if (t_password !== e.target.value) {
      setPasswordCheck("비밀번호 불일치");
    } else {
      setPasswordCheck("비밀번호 일치");
    }

    if (t_password === "" || e.target.value === "") {
      setPasswordCheck("");
    }

    setDoubleIdCheck({ ...doubleIdCheck, [e.target.name]: e.target.value });

    setMembers({ ...members, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>회원가입</h1>
      <div className={style.signup}>
        <PersonIcon style={{ fontSize: 50 }} />

        <form onSubmit={onSubmit}>
          <div className={style.form_group}>
            <input
              type="text"
              name="t_username"
              placeholder="아이디"
              value={members.t_username}
              onChange={handleValueChange}
              ref={inputId}
            />
            <button className={style.check} onClick={idCheck}>
              아이디 중복체크
            </button>
          </div>
          <span className="idCh">{duplicateIdCheck}</span>
          {errors && errors.t_username && (
            <div className={style.error}>{errors.t_username}</div>
          )}

          <div className={style.form_group}>
            <input
              type="password"
              name="t_password"
              placeholder="비밀번호"
              value={members.t_password}
              onChange={handleValueChange}
              ref={inputPw}
            />
          </div>
          {errors && errors.t_password && (
            <div className={style.error}>{errors.t_password}</div>
          )}

          <div className={style.form_group}>
            <input
              type="password"
              name="t_password2"
              placeholder="비밀번호 확인"
              value={members.t_password2}
              onChange={passChang}
              ref={inputPwCheck}
            />
          </div>
          {passwordCheck}

          {errors && errors.t_password2 && (
            <div className={style.error}>{errors.t_password2}</div>
          )}

          <div className={style.form_group}>
            <input
              type="text"
              name="t_address"
              placeholder="주소 검색을 눌러주세요"
              //value={members.fullAddress}
              value={fullAddress}
              onChange={handleValueChange}
              ref={inputAdress}
            />
            <button className={style.check} type="button" onClick={handleClick}>
              주소검색
            </button>
          </div>
          {errors && errors.t_address && (
            <div className={style.error}>{errors.t_address}</div>
          )}

          <div className={style.form_group}>
            <input
              type="email"
              name="t_email"
              placeholder="이메일"
              value={members.t_email}
              onChange={handleValueChange}
              ref={inputEmail}
            />
          </div>

          {errors && errors.t_email && (
            <div className={style.error}>{errors.t_email}</div>
          )}
          <div className={style.form_group}>
            <input
              type="text"
              name="t_phone"
              placeholder="연락처"
              value={members.t_phone}
              onChange={handleValueChange}
              ref={inputPhone}
            />
          </div>
          {errors && errors.t_phone && (
            <div className={style.error}>{errors.t_phone}</div>
          )}

          <div className={style.form_btn}>
            <button type="submit" className="btn_lively">
              가입 완료
            </button>
          </div>
        </form>

        <div className={style.signBox}>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </>
  );
};

export default JoinAdd;
