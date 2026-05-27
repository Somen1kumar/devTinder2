import React, { useState , useReducer} from "react";
import { useDispatch } from "react-redux";
import { loginDetails } from "@/store/loginCluster";
import fetchData from "@/utils/fetchData";
import { LOGIN_URL } from "@/utils/constants";
import {onInputValidation} from '@/utils/inputValidation';

const Login = (props) => {
    const {onLoggedInHandler} = props;
    const dispatch = useDispatch();
  const reducerHandler = (state, action) => {
    switch (action.type) {
      case "Email":
        return {
          ...state,
          email: action.payLoad,
        };
      case "Password":
        return {
          ...state,
          password: action.payLoad,
        };

      default:
        return state;
    }
  };
  const [loginData, setLoginData] = useReducer(reducerHandler, {
    email: "somen12@gmail.com",
    password: "K1234567890s",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeHandler = (e, inputType) => {
    e.preventDefault();
    setLoginData({ type: inputType, payLoad: e.target.value });
  };
  const onClickHandler = async (e) => {
    e.preventDefault();
    const inputErrorMessage = onInputValidation(loginData, "login");
    if(inputErrorMessage) {
        setErrorMessage(inputErrorMessage);
    }else {
        const loginDataObj = await fetchData(LOGIN_URL, 'POST', loginData);
        if(loginDataObj) {
            const loggedInDataID = loginDataObj?.data;
            sessionStorage.setItem("currentLoggedInUser", JSON.stringify(loggedInDataID));

            dispatch(loginDetails({loginData: loggedInDataID}));
            onLoggedInHandler(loggedInDataID)
        } else {
            console.error("login Error", loginDataObj.errorMessage);
        }
    }
}

  return (
    <React.Fragment>
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Login
      </h2>

      {/* Form */}
      <form className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            onChange={(e) => onChangeHandler(e, "Email")}
            value={loginData.email}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            onChange={(e) => onChangeHandler(e, "Password")}
            value={loginData.password}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center flex-col">
        <button
          type="submit"
          onClick={onClickHandler}
          onKeyDown={onClickHandler}
          className="w-[50%] bg-[#ff2358] text-white py-2 rounded-full font-semibold hover:opacity-90 transition mx-auto"
        >
          Login
        </button>
        {errorMessage && <div className="text-red-600 text-center my-2">{errorMessage}</div>}

        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
