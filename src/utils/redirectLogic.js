import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "./helperFunction";
import { useSelector } from "react-redux";

const RedirectLogic = () => {
const cookieToken = getCookie("token") || "";
const loginCredentials1 = sessionStorage.getItem("currentLoggedInUser") || '';

  // const loginCredentials = useSelector(
  //   (itr) => itr?.loginReducer?.loginDetails?.loginData,
  // );
  const loginCredentials = loginCredentials1 ? JSON.parse(loginCredentials1): '';
  const currentPathName = window?.location?.pathname || '';
  const navigation = useNavigate();
  useEffect(() => {
    if (!cookieToken) {
      navigation("/login");
    } 
    else if (cookieToken && !loginCredentials?.id) {
      navigation("/");
    }
    else if(cookieToken && loginCredentials?.id && currentPathName ==='/login') {
       navigation("/");
    }
  }, [navigation, cookieToken, loginCredentials]);

  return {
    loginCredentials,
  };
};

export default RedirectLogic;
