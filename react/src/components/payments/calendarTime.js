import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./calendarTime.css";
import style from "../../css/payments/Calendarp.module.css";
import Booking from "./booking";
import CheckIcon from "@material-ui/icons/Check";

const PrevArrow = ({ onClick }) => (
  <button className="slick-prev" onClick={onClick}></button>
);

const NextArrow = ({ onClick }) => (
  <button className="slick-next" onClick={onClick}></button>
);

const CalendarTime = (props) => {
  const [dataArray, setDataArray] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const {
    selectedDate,
    main_code,
    t_id,
    selectedCost,
    time_about,
    main_name,
    timeCheck,
  } = props;

  console.log(timeCheck);
  // console.log(time_about);
  // console.log(selectedCost);
  // console.log(selectedDate);

  // console.log(main_code);
  // console.log(t_id);

  const handleButtonClick = async (time) => {
    if (dataArray.includes(time)) {
      return; // dataArray에 있는 시간값이면 클릭이 안 되도록 처리
    }

    if (start && end) {
      // 시작시간과 끝시간이 이미 설정된 경우, 초기화
      setStart(null);
      setEnd(null);
    } else if (!start) {
      // 시작시간 설정
      setStart(time);
    } else {
      // 끝시간 설정

      setEnd(time);
    }

    // if (end === null) {
    //setEnd(start + 1);
    //setEnd(start + 1);
    // await axios
    //   .post(
    //     'http://localhost:8090/gettime',
    //     { first: start, second: end },
    //     config
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //   });
    // }
  };

  console.log(dataArray);

  const getButtonColor = (time) => {
    console.log("getButtonColor 버튼 호출");

    //console.log(time);
    //console.log(dataArray);
    //console.log(dataArray.includes(time));
    //console.log(dataArray.some((element) => element === time));

    if (dataArray && dataArray.some((element) => element === time)) {
      console.log("dataArray.includes 호출");

      return "예약불가";
    }

    if (start && end) {
      // 시작시간과 끝시간이 모두 설정된 경우
      if (time >= start && time <= end) {
        return "on"; // 선택된 시간 범위의 버튼 색상
      }
    } else if (start && time === start) {
      // 시작시간만 설정된 경우
      return "on"; // 선택된 시작시간 버튼 색상
    }
    return null; // 기본 버튼 색상
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const renderButtons = () => {
    const buttons = [];

    for (let i = 1; i < 25; i++) {
      buttons.push(
        <div key={i}>
          <div
            key={i}
            className={
              getButtonColor(i) === "on"
                ? "timeBtn btnColor"
                : getButtonColor(i) === "예약 불가"
                ? "timeBtn btnCheckColor"
                : "timeBtn"
            }
            onClick={() => handleButtonClick(i)}
          >
            {/*{i}
            {getButtonColor(i)} */}
            {getButtonColor(i) === "예약불가" ? (
              <span className="btnCheckColor">{getButtonColor(i)}</span>
            ) : (
              <>{getButtonColor(i)}</>
            )}
          </div>
          <p className="timeText">{i}:00</p>
        </div>
      );
    }
    return buttons;
  };

  useEffect(() => {
    if (timeCheck) {
      const timeCheckArr = Object.values(timeCheck);
      setDataArray(timeCheckArr[0]);
    }

    //   const dataArray = [];
    // if (timeCheck) {
    //   const timeCheckArr = Object.values(timeCheck);
    //   dataArray.push(...timeCheckArr);
    // }
  }, [timeCheck]);

  return (
    <div className="timeTable">
      {time_about !== "별도문의 " || time_about < 5 ? (
        <>
          <Slider {...settings}>{renderButtons()}</Slider>
          <div className={style.pay}>
            <Booking
              selectedDate={selectedDate}
              main_code={main_code}
              t_id={t_id}
              selectedCost={selectedCost}
              time_about={time_about}
              start={start}
              end={end}
              main_name={main_name}
            />
          </div>
        </>
      ) : (
        "별도 문의입니다"
      )}
    </div>
  );
};

export default CalendarTime;
