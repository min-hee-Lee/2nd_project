import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuth, RouteComponent }) => {
  const isLogin = localStorage.getItem("isLogin");
  console.log(isAuth, isLogin);
  // 인증이 반드시 필요한 페이지이고 인증이 된 페이지
  if (isAuth && isLogin) {
    return <RouteComponent />;
  }

  // 인증이 반드시 필요한 페이지이고 인증이 안된 페이지
  else if (isAuth && !isLogin) {
    return <Navigate to="/login" />;
  }

  //인증이 필요하지 않은 페이지
  else {
    return <RouteComponent />;
  }

  // return <Navigate to='/' />;
};

export default PrivateRoute;

/* 
 isAuth는 해당 페이지에 접근하기 위해서 인증이 필요한지를 나타내며, RouteComponent는 렌더링할 컴포넌트이다.

 컴포넌트 내부에서는 localStorage를 사용하여 사용자가 로그인 했는지를 확인
 사용자 로그인O, isAuth가 참(true) => RouteComponent를 반환하여 페이지를 렌더링
 사용자 로그인X, isAuth가 참(true) => /login으로 이동하는 Navigate 컴포넌트를 반환
 인증이 필요하지 않은 페이지일 경우, RouteComponent를 반환
*/
