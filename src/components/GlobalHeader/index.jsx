import { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutDetails } from "@/store/loginCluster";
import { Link, useNavigate } from "react-router";
import fetchData from "@/utils/fetchData";
import { LOGOUT_API_URL } from "@/utils/constants";

const GlobalHeader = (props) => {
  const { isLoggedIn, setIsOpen, setIsLoggedInData } = props;
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const isLoggedInFlag = isLoggedIn?.id;
  const [profileExpand, setProfileExpand] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const onProfileClickHandler = (e) => {
    e.preventDefault();
    setProfileExpand((prev) => !prev);
  };
  const onLogoutHandler = async (e) => {
    e.preventDefault();
    // const logoutAPI = await fetch("http://localhost:3000/auth/logout", {
    //   credentials: "include",
    // });
    // const responce = await logoutAPI.json();
    const responce = await fetchData(LOGOUT_API_URL);
    if (responce.status) {
      dispatch(logoutDetails({}));
      sessionStorage.removeItem("currentLoggedInUser");
      setIsLoggedInData({});
      navigation("/");
    } else {
      console.error("error", responce.errorMessage);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setProfileExpand(false);
      }
    };
    // if(loginCredentials.id && cookieStore.get("token)")) setIsLoggedIn(!isLoggedIn);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`global-Header ${isLoggedInFlag ? "lg:w-[27%] lg:h-[100vh] lg:bg-red-500" : ""}`}
    >
      <div
        className={`navbar bg-white rounded-2xl shadow-md m-3 mx-6 flex py-3 px-8 mt-6 ${isLoggedInFlag ? "lg:h-[100px] lg:rounded-none lg:m-0" : ""}`}
      >
        <div className={`flex-1 ${isLoggedInFlag ? "lg:pt-5" : ""}`}>
          <Link to={"/"} className="btn btn-ghost text-xl leading-10">
            <span>DevSocial</span>
          </Link>
        </div>
        {isLoggedInFlag ? (
          <div className="flex lg:pt-5">
            <div className="indicator pt-2 pr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />{" "}
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
            <div className="w-10 ">
              <img
                className="rounded-full cursor-pointer"
                ref={buttonRef}
                onClick={onProfileClickHandler}
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
              <ul
                tabIndex="-1"
                ref={menuRef}
                className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-1 w-52 p-2 shadow absolute text-center flex flex-col gap-3 bg-white rounded-xl border border-black ${!isLoggedInFlag && "right-[13px]"} ${profileExpand ? "" : "hidden"}`}
              >
                <li>
                  <Link to={"/profile"} className="flex justify-between px-3">
                    {`Welcome ${isLoggedIn?.firstName}`}
                  </Link>
                </li>
                <li className="text-left px-3">
                  <Link to={"/review"}>Review Connections</Link>
                </li>
                <li
                  className="text-left px-3 cursor-pointer"
                  onClick={onLogoutHandler}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="text-base bg-[#ff2358] text-white rounded-full px-11 py-2"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Log In
            </button>
          </div>
        )}
      </div>
      {isLoggedInFlag && <div className="flex justify-evenly mt-3 w-[50%] m-auto">
        <button className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${
            activeTab === "chat"
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 bg-white hover:text-gray-900 hover:bg-gray-50/50'
          }`}
          onClick={() => setActiveTab("chat")}
          >Chat</button>
      </div>}
    </div>
  );
};

export default GlobalHeader;
