import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import GlobalHeader from "@/components/GlobalHeader/index";
import Modal from "@/modal";

import { loginDetails } from "../store/loginCluster";
import Login from "../components/Login/index";
import RedirectLogic from "../utils/redirectLogic";
import fetchData from "../utils/fetchData";
import { GET_PROFILE_DATA_URL } from "../utils/constants";
import { getCookie } from "../utils/helperFunction";

const Body = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { loginCredentials } = RedirectLogic();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInData, setIsLoggedInData] = useState({});

  const onLoggedInHandler = (data) => {
    setIsLoggedInData(data);
    setIsOpen(false);
    navigation("/");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const fetchProfileData = await fetchData(GET_PROFILE_DATA_URL, "GET");
      if (fetchProfileData?.id) {
        console.log(fetchProfileData);
        sessionStorage.setItem(
          "currentLoggedInUser",
          JSON.stringify(fetchProfileData),
        );
        dispatch(loginDetails(fetchProfileData));
        setIsLoggedInData(fetchProfileData);
      }
    };
    const jwtToken = getCookie("token");
    if (!jwtToken) {
      sessionStorage.removeItem("currentLoggedInUser");
      fetchProfileData();
    }
  }, [dispatch, loginCredentials?.id]);
  return (
    <div className={`${loginCredentials?.id ? "lg:flex" : ""}`}>
      <GlobalHeader
        isLoggedIn={loginCredentials}
        setIsOpen={setIsOpen}
        setIsLoggedInData={setIsLoggedInData}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Login onLoggedInHandler={onLoggedInHandler} />
      </Modal>
      <Outlet />
    </div>
  );
};

export default Body;
