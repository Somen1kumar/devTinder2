import React from "react";
import { useState, useReducer } from "react";
import fetchData from "@/utils/fetchData";
import { SIGNUP_URL } from "@/utils/constants";
import { validateSignUpCredentials } from "@/utils/inputValidation";

const SignUp = (props) => {
  const { setOnSignUp } = props;
  const GENDER_INFO = ["Male", "Female", "Other"];
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      case "FirstName":
        return {
          ...state,
          firstName: action.payLoad,
        };
      case "LastName":
        return {
          ...state,
          lastName: action.payLoad,
        };
      case "Age":
        return {
          ...state,
          age: action.payLoad,
        };
      case "PhotoUrl":
        return {
          ...state,
          photoUrl: action.payLoad,
        };
      case "Description":
        return {
          ...state,
          description: action.payLoad,
        };
      case "Gender":
        return {
          ...state,
          gender: action.payLoad,
        };

      default:
        return state;
    }
  };
  const [signUpData, setSignUpData] = useReducer(reducerHandler, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    photoUrl: '',
    description: '',
    gender: GENDER_INFO[0],
  });

  const onChangeHandler = (e, inputType) => {
    e.preventDefault();
    setSignUpData({ type: inputType, payLoad: e.target.value });
  };
  const onClickHandler = async (e) => {
    e.preventDefault();
    const inputErrorMessage = validateSignUpCredentials(signUpData);
    if (inputErrorMessage) {
        setErrorMessage(inputErrorMessage);
    } else {
        console.log(signUpData);
      const sendLoginCredentials = await fetchData(
        SIGNUP_URL,
        "POST",
        signUpData,
      );
      if (!sendLoginCredentials.errorCode) {
        setSignUpStatus(true);
        setTimeout(() => {
          setOnSignUp((prev) => !prev);
        }, 100);
      } else {
        console.error("login Error", sendLoginCredentials.errorMessage);
      }
    }
  };

  return (
    <React.Fragment>
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Signup
      </h2>

      {/* Form */}
      <form className="space-y-4">
        <div className="max-h-[42vh] px-1 overflow-scroll">
          {/* FirstName */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              FirstName
            </label>
            <input
              type="text"
              required
              id="firstName"
              placeholder="Enter your FirstName"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              onChange={(e) => onChangeHandler(e, "FirstName")}
            />
          </div>
          {/* LastName */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600 mb-1 pt-3"
              htmlFor="lastName"
            >
              LastName
            </label>
            <input
              type="text"
              id="lastName"
              required
              placeholder="Enter your LastName"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              onChange={(e) => onChangeHandler(e, "LastName")}
            />
          </div>
          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600 mb-1 pt-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              onChange={(e) => onChangeHandler(e, "Email")}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600 mb-1 pt-3"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              onChange={(e) => onChangeHandler(e, "Password")}
            />
          </div>
          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600 mb-1 pt-3"
            >
              Age
            </label>
            <input
              type="number"
              required
              id="age"
              placeholder="Enter your Age"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              onChange={(e) => onChangeHandler(e, "Age")}
            />
          </div>
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-1 pt-3"
            >
              Description
            </label>
            <input
              type="text"
              required
              id="description"
              placeholder="Enter your Description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              onChange={(e) => onChangeHandler(e, "Description")}
            />
          </div>
          {/* PhotoUrl */}
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-gray-600 mb-1 pt-3"
            >
              PhotoUrl
            </label>
            <input
              type="text"
              required
              id="photoUrl"
              placeholder="Enter your PhotoUrl"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              onChange={(e) => onChangeHandler(e, "PhotoUrl")}
            />
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-600 mb-1 pt-3"
            >
              Gender
            </label>
            <select id="gender" onChange={(e) => onChangeHandler(e, "Gender")}>
              {GENDER_INFO.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              className="w-[50%] bg-[#ff2358] text-white py-2 rounded-full font-semibold hover:opacity-90 transition mt-3 mb-4"
            >
              SignUp
            </button>
          </div>
        {errorMessage && <div className="text-red-600 text-center my-2">{errorMessage}</div>}

          {signUpStatus && (
            <div className="text-green-600 text-center my-2">
              User Registered Successfully.Please Login
            </div>
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
