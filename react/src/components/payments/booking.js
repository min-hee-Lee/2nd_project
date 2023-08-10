import PaymentsButton from "./paymentsBtn";
import { useEffect, useState } from "react";
import style from "../../css/payments/Calendarp.module.css";

const Booking = (props) => {
  const [totleCost, setTotleCost] = useState("");

  const [newEnd, setNewEnd] = useState("");

  const {
    selectedDate,
    main_code,
    t_id,
    selectedCost,
    time_about,
    start,
    end,
    main_name,
  } = props;

  if (end === null) {
  }

  console.log(time_about);
  console.log(selectedCost);
  console.log(selectedDate);

  console.log(main_code);
  console.log(t_id);
  console.log(start);
  console.log("end : " + end);
  console.log("newEnd : " + newEnd);

  console.log(totleCost);

  console.log((selectedCost / time_about) * (end + 1 - start));

  // if (time_about !== '별도문의') {
  //   // const totle = (selectedCost % time_about) * (end + 1 - start);
  // }

  const booking = {
    use_date: selectedDate,
    main_code: main_code,
    t_id: t_id,
    start_time: start,
    end_time: newEnd,
    cost: totleCost,
    main_name: main_name,
  };

  useEffect(() => {
    if (start === null) {
      setTotleCost(0);
    } else if (start !== null && end === null) {
      setTotleCost((selectedCost / time_about) * (start + 1 - start));
      setNewEnd(start + 1);
    } else {
      setTotleCost((selectedCost / time_about) * (end + 1 - start));
      setNewEnd(end + 1);
    }
  });

  return (
    <>
      <h3>결제하기</h3>
      {totleCost > 0 ? (
        <div className={style.totalCost}>
          합계 금액 : ₩ {totleCost.toLocaleString()}원
        </div>
      ) : (
        <div className={style.totalCost}>합계 금액 : ₩</div>
      )}
      <PaymentsButton booking={booking}></PaymentsButton>
    </>
  );
};

export default Booking;
