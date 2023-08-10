import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./access/PrivateRoute"; //접근권한
import Start from "./components/Start"; //시작 root페이지
import AboutPage from "./components/start/AboutPage"; //웹사이트에 관한 정보 페이지
/* BaseLayout ----------------------------------------------------------------------------------------------------- */
import BaseLayout from "./components/layout/BaseLayout";
import Home from "./components/home/HomePage";
/* board List */
import BoardList from "./components/board/board_list";
/* board Detail */
import BoardListDetail from "./components/board/board_list_detail";
/* board Detail에서 booking(예약) */
import Calendarp from "./components/payments/calendarp";
import CalendarTime from "./components/payments/calendarTime";
import PaymentsButton from "./components/payments/paymentsBtn";
import PaymentSuccessContainer from "./components/payments/success";
import PaymentFailContainer from "./components/payments/fail";
/* board Detail에서 Review(후기) */
import BoardReView from "./components/review/board_Review";
/* 지도검색 */
import SearchPlace2 from "./components/map/searchPlace2";
/* 채팅 */
import TestChat2 from "./components/chat/testChat2";

/* MyPageLayout -------------- */
import MyPageLayout from "./components/layout/MyPageLayout";
import UserBooking from "./components/userPage/userBooking"; //나의 예약정보
import WishList from "./components/userPage/wish/wishList"; //나의 찜
import UserReview from "./components/userPage/userReview/user_review"; //나의 후기
import EditInfo from "./components/userPage/editInfo"; //나의 정보

/* AdimLayout ------------------*/
import AdminBookingList from "./components/admin/adminBooking";
import AdminSales from "./components/admin/admin_sales/admin_sales";
import AdminUserInfo from "./components/admin/admin_user_info/adminUserInfo";
import AdminReview from "./components/admin/admin_Review/adminReview";

/* SignLayout ----------------------------------------------------------------------------------------------------- */
import SignLayout from "./components/layout/SignLayout";
import Login from "./components/login/login";
import LogOut from "./components/login/logout";
import ForgotPassword from "./components/login/forgotPassword";
import JoinAdd from "./components/login/join_add";
import Postcode from "./components/login/address/daum_address";
import Redircet from "./components/login/loginRedirect";

function App() {
  return (
    <Routes>
      {/* Start : 시작페이지(영상) ----------------------------------------------------------------------------------- */}
      <Route index element={<Start />} />
      <Route path="/about" element={<AboutPage />} />

      {/* BaseLayout : HOME, GYM, 게시판, 마이페이지 --------------------------------------------------------------- */}
      <Route path="/" element={<BaseLayout />}>
        {/* Home */}
        <Route
          path="home"
          element={<PrivateRoute isAuth={true} RouteComponent={Home} />}
        />

        {/* board (GYM) : 체육관 목록리스트, 상세페이지 */}
        <Route path="board/list/:currentPage" element={<BoardList />} />
        <Route
          path="board/list/detail/:main_code"
          element={<BoardListDetail />}
        />
        <Route
          path="/board/review/:currentPage/:main_code"
          element={<BoardReView />}
        />
        <Route path="Calendarp" element={<Calendarp />} />
        <Route path="CalendarTime" element={<CalendarTime />} />
        <Route path="payments" element={<PaymentsButton />} />
        <Route path="success" element={<PaymentSuccessContainer />} />
        <Route path="fail" element={<PaymentFailContainer />} />

        {/* 지도검색 페이지 */}
        <Route path="map2/:currentPage" element={<SearchPlace2 />} />

        {/* 채팅 페이지 */}
        <Route
          path="user/chatList"
          element={<PrivateRoute isAuth={true} RouteComponent={TestChat2} />}
        />

        {/* MyPageLayout : 마이페이지 (예약 : 진행중,결제,취소및환불 / 리뷰관리 / 내정보수정 ) */}
        <Route path="/user" element={<MyPageLayout />}>
          {/* 예약관리 : 예약내역 */}
          <Route
            path="payPage/:currentPage"
            element={
              <PrivateRoute isAuth={true} RouteComponent={UserBooking} />
            }
          />
          {/* 나의 활동 : 찜 ♥ / 후기관리 */}
          <Route
            path="wishList/:currentPage"
            element={<PrivateRoute isAuth={true} RouteComponent={WishList} />}
          />
          <Route
            path="reviewList/:currentPage"
            element={<PrivateRoute isAuth={true} RouteComponent={UserReview} />}
          />
          {/* 내 정보 : 개인정보 수정 */}
          <Route
            path="myInfo"
            element={<PrivateRoute isAuth={true} RouteComponent={EditInfo} />}
          />
        </Route>

        {/* AdimLayout : 관리자 틀 -------------------------------------------------------------------------- */}
        {/* 예약내역 */}
        <Route
          path="admin/payPage/:currentPage"
          element={
            <PrivateRoute isAuth={true} RouteComponent={AdminBookingList} />
          }
        />

        {/* 체육관 관리 및 판매 정보 */}
        <Route
          path="admin/sales/:currentPage"
          element={<PrivateRoute isAuth={true} RouteComponent={AdminSales} />}
        />

        {/* 사용자 정보 관리 */}
        <Route
          path="admin/userInfo/:currentPage"
          element={
            <PrivateRoute isAuth={true} RouteComponent={AdminUserInfo} />
          }
        />

        {/* 사용자 댓글 관리 */}
        <Route
          path="admin/review/:currentPage"
          element={<PrivateRoute isAuth={true} RouteComponent={AdminReview} />}
        />
      </Route>

      {/* SignLayout : 로그인, 회원가입 틀 -------------------------------------------------------------------------- */}
      <Route path="/" element={<SignLayout />}>
        {/* LOGIN 로그인 (login) */}UserBooking
        <Route
          path="login"
          element={<PrivateRoute isAuth={false} RouteComponent={Login} />}
        />
        {/* SIGN UP 회원가입 (join_add) */}
        <Route
          path="joinadd"
          element={<PrivateRoute isAuth={false} RouteComponent={JoinAdd} />}
        />
      </Route>
      {/* LOGOUT 로그아웃 (logout) */}
      <Route
        path="logout"
        element={<PrivateRoute isAuth={true} RouteComponent={LogOut} />}
      />
      {/* 다른방법로그인시 redirect */}
      <Route path="login/redirect" element={<Redircet />} />
      {/* 회원가입시 주소검색 */}
      <Route path="address" element={<Postcode />} />
      {/* 비밀번호 찾기 */}
      <Route path="ForgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
