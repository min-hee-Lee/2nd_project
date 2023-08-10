import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import style from "../../css/layout/MyPageLayout.module.css";
import Sidebar from "./etc/Sidebar";
import UserBooking from "../userPage/userBooking"; //예약내역
import WishList from "../userPage/wish/wishList"; //찜
import UserReview from "../userPage/userReview/user_review"; //후기
import EditInfo from "../userPage/editInfo"; //개인정보수정

const MyPageLayout = () => {
  const [currentPage, setCurrentPage] = useState("payPage/1"); // 현재 페이지 상태 추가

  return (
    <div className={style.main_inner}>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.page_container}>
        {/* 현재 페이지 상태에 따라 렌더링할 페이지를 선택 */}
        <Routes>
          <Route
            path="payPage/1"
            element={<UserBooking setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="wishList/:currentPage"
            element={<WishList setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="reviewList/1"
            element={<UserReview setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="myInfo"
            element={<EditInfo setCurrentPage={setCurrentPage} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default MyPageLayout;
