import { useEffect } from "react";

const LogOut = () => {
  useEffect(() => {
    localStorage.removeItem("t_username");
    localStorage.clear();

    window.location.replace("/");
  });
};

export default LogOut;
