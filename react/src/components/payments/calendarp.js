import axios from "axios";
import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarTime from "./calendarTime";
import CloseIcon from "@material-ui/icons/Close";

import style from "../../css/payments/Calendarp.module.css";
import { baseUrl } from "../../apiurl";

function Calendarp(props) {
  const { setBookingOpen } = props;

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedCost, setSelectedCost] = useState("");

  const [time_about, setTime_about] = useState("");

  const [timeCheck, setTimeCheck] = useState([]);

  const currentDate = new Date();

  const minSelectableDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1
  );

  //console.log('timeCheck : ', timeCheck);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { placeDTO, main_code, t_id, main_name } = props;

  if (!placeDTO) {
    // placeDTO가 null 또는 undefined인 경우
    return <>Loding....</>;
  }

  const placeIoop = [];
  for (let i = 0; i < placeDTO.length; i++) {
    placeIoop.push(i);
  }

  //setplace(placeDTO);

  //console.log(placeDTO.length);
  // console.log(main_code);
  //console.log(t_id);

  //console.log(placeDTO.length);

  const handleDateSelect = async (selectedDate) => {
    const year = selectedDate.getFullYear().toString().substring(2);
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const date = selectedDate.getDate().toString().padStart(2, "0");
    const newDate = `${year}-${month}-${date}`;

    console.log(newDate);

    setSelectedDate(newDate);

    await axios
      .get(`${baseUrl}/bookingTimeCheck`, {
        params: { main_code: main_code, use_date: newDate },
      })
      .then((response) => {
        setTimeCheck(response.data);
      });

    // console.log(new Date().getTime);
    // if (newDate.getTime > new Date().getTime) {
    //   console.log('확인');
    // }

    // HTTP 요청 보내기
    // await axios
    //   .post('http://localhost:8090/calendar', newDate, config)
    //   .then((response) => {
    //     console.log(response.data);
    //     setSelectedDate(selectedDate);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  // const handleTime_about = (e) => {
  //   e.preventDefault();

  //   const value = e.target.value;
  //   console.log('히든창 출력');
  //   console.log(value);

  //   setTime_about(value);
  // };
  //값넘어오는 콘솔
  //console.log(selectedCost);
  const handleCostChange = (e) => {
    //e.preventDefault();
    const values = e.target.value.split(",");
    const selectedCost = values[0];
    const time_about = values[1];

    setSelectedCost(selectedCost);
    setTime_about(time_about);

    // const inputs = document.querySelectorAll('input[name="cost"]');
    // inputs.forEach((input) => {
    //   input.checked = false;
    // });

    // // 선택한 input 요소의 checked 속성을 true로 설정
    // e.target.checked = true;
  };

  return (
    <div className={style.content}>
      <div style={{ padding: "10px", borderBottom: "1px solid lightgray" }}>
        <button
          onClick={() => setBookingOpen(false)}
          style={{ backgroundColor: "transparent" }}
        >
          <CloseIcon />
        </button>
      </div>
      <section>
        <h3>날짜선택</h3>
        <div style={{ width: "350px", margin: "0 auto" }}>
          <Calendar
            onChange={handleDateSelect}
            minDate={minSelectableDate}
            value={selectedDate}
          />
        </div>
      </section>

      <section>
        <h3>사용용도 선택</h3>
        {placeIoop &&
          placeIoop.map((num, idx) => (
            <div className={style.purpose} key={num}>
              <label>
                <input
                  type="radio"
                  name="cost"
                  value={`${placeDTO[num].cost},${placeDTO[num].time_about}`}
                  checked={selectedCost === placeDTO[num].cost}
                  onChange={handleCostChange}
                />
                <span>{placeDTO[num].title}</span>
              </label>
              {placeDTO[num].time_about !== "별도문의" ? (
                <div>
                  <span>
                    ₩{Number(placeDTO[num].cost).toLocaleString()}원~ /
                  </span>
                  <span>🕒{placeDTO[num].time_about}시간당</span>
                </div>
              ) : (
                <p>{placeDTO[num].time_about}</p>
              )}
            </div>
          ))}
      </section>

      <section>
        <h3>이용시간 선택</h3>
        <CalendarTime
          selectedDate={selectedDate}
          selectedCost={selectedCost}
          main_code={main_code}
          t_id={t_id}
          time_about={time_about}
          main_name={main_name}
          timeCheck={timeCheck}
        ></CalendarTime>
      </section>
    </div>
  );
}

export default Calendarp;
