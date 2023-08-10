import { useEffect, useState } from "react";
import { baseUrl } from "../../apiurl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import styles from "../../css/layout/MyPageLayout.module.css";
import ei from "../../css/userPage/edit.module.css";

const EditInfo = () => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsValid(true); // input 값이 변경되면 유효성 상태를 초기화합니다.
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
      // 유효한 경우에 대한 추가 로직을 처리합니다.
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////

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

  const { t_username, t_password } = members;

  const [errors, setErrors] = useState({});

  //console.log(t_username);

  const config = { headers: { "Content-Type": "application/json" } };
  const [fullAddress, setFullAddress] = useState("");

  const userInfo = {
    t_username: members.t_username,
    t_password: members.t_password,
    t_password2: members.t_password2,
    t_email: members.t_email,
    t_phone: members.t_phone,
    t_address: fullAddress,
  };

  //여러개 then 가능
  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`${baseUrl}/user/userInfoUpdate`, userInfo, config)
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
        navigator("/home");
      })
      .catch((err) => {
        //console.log(err.response.data);
        setErrors(err.response.data);
        console.error(err.message);
      });
  };
  const [passwordCheck, setPasswordCheck] = useState("");

  const [doubleIdCheck, setDoubleIdCheck] = useState({
    t_password2: "",
  });

  const { t_password2 } = doubleIdCheck;

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

  //   if(!localStorage.getItem('t_username')){

  //   }

  //로컬 스토리지에서 값 받아야됌
  const userInfoHanlder = async () => {
    await axios
      .get(`${baseUrl}/user/userInfo`, {
        params: { t_username: localStorage.getItem("username") },
      })
      .then((response) => {
        console.log(response.data);

        const userDate = {
          t_username: localStorage.getItem("username"),
          t_email: response.data.t_email,
          t_address: response.data.t_address,
          t_phone: response.data.t_phone,
          t_password: "",
          t_password2: "",
          t_role: "",
        };

        setMembers(userDate);

        setFullAddress(response.data.t_address);
      });
  };

  useEffect(() => {
    userInfoHanlder();
  }, []);

  return (
    <>
      <div className={styles.pageTitle}>
        <h1>개인 정보 수정</h1>
      </div>

      <div className={styles.page_inner}>
        <form onSubmit={onSubmit}>
          <div className={ei.infoBox}>
            <div className={ei.idInfo}>
              <div className={ei.infoImg}>
                <img src={"/images/profile.gif"} />
              </div>
              <input
                type="text"
                className={ei.infoidtext}
                name="t_username"
                placeholder="아이디"
                value={localStorage.getItem("username")}
                onChange={handleValueChange}
              />
            </div>
          </div>
          <div className={ei.infoBottom}>
            <span>{duplicateIdCheck}</span>
            {errors && errors.t_username && (
              <div className={ei.error}>{errors.t_username}</div>
            )}

            <div className={ei.newpw}>
              <p className={ei.item}>새비밀번호</p>
              <input
                type="password"
                className="form-control"
                id={`${ei.input} ${
                  errors && errors.t_password ? ei.invalid : ""
                }`}
                name="t_password"
                placeholder="비밀번호"
                value={members.t_password}
                onChange={handleValueChange}
              />
            </div>
            <div style={{ color: "red", textAlign: "right" }}>
              {passwordCheck}
            </div>
            {errors && errors.t_password && (
              <>
                <div className={ei.error}>{errors.t_password}</div>
              </>
            )}

            <div className={ei.newpwch}>
              <p className={ei.item}>비밀번호 확인</p>
              <input
                type="password"
                className="form-control"
                id={`${ei.input} ${
                  errors && errors.t_password2 ? ei.invalid : ""
                }`}
                name="t_password2"
                placeholder="비밀번호 확인"
                value={members.t_password2}
                onChange={passChang}
              />
            </div>
            <span style={{ color: "red", float: "right" }}>
              {passwordCheck}
            </span>

            {errors && errors.t_password2 && (
              <div className={ei.error}>{errors.t_password2}</div>
            )}

            <div className={ei.adBox}>
              <p className={ei.item}>주소 변경</p>
              <input
                type="text"
                className="form-control"
                name="t_address"
                placeholder="주소 검색을 눌러주세요"
                //value={members.fullAddress}
                value={fullAddress}
                onChange={handleValueChange}
              />
              <button className={ei.adBtn} type="button" onClick={handleClick}>
                주소검색
              </button>
            </div>

            {errors && errors.t_address && (
              <div className={ei.error}>{errors.t_address}</div>
            )}

            <div className={ei.infoemail}>
              <p className={ei.item}>e-mail 변경</p>
              <input
                type="email"
                className="form-control"
                id={`${ei.input} ${errors && errors.t_email ? ei.invalid : ""}`}
                name="t_email"
                placeholder="이메일"
                value={members.t_email}
                onChange={handleValueChange}
              />
            </div>

            {errors && errors.t_email && (
              <div className={ei.error}>{errors.t_email}</div>
            )}
            <div className={ei.phnum}>
              <p className={ei.item}>전화번호 변경</p>
              <input
                type="text"
                className="form-control"
                id={`${ei.input} ${errors && errors.t_phone ? ei.invalid : ""}`}
                name="t_phone"
                placeholder="연락처"
                value={members.t_phone}
                onChange={handleValueChange}
              />
            </div>

            {errors && errors.t_phone && (
              <div className={ei.error}>{errors.t_phone}</div>
            )}
          </div>
          <button
            className={ei.infoEndBtn}
            style={{
              background: "black",
              color: "white",
              fontSize: "16",
              width: "180px",
              height: "50px",
              borderRadius: "20px",
            }}
            type="submit"
          >
            수정 완료
          </button>
        </form>
      </div>
    </>
  );
};

export default EditInfo;
