import React, { useState } from "react";
import Header from "./Header";
import { APP_BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  return (
    <div>
      <Header />
      <div className=" absolute">
        <img
          src={APP_BG_URL}
          alt="bg-img"
          className=" bg-cover bg-opacity-50"
        />
      </div>
      <form className=" flex flex-col bg-black absolute py-10  px-14 w-[440px] top-44 mx-auto right-0 left-0 bg-opacity-80">
        <p className=" text-white text-4xl font-semibold mb-9">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </p>

        {isSignInForm ? null : (
          <input
            className=" px-4 py-3 bg-gray-600 mb-4 outline-none rounded-md"
            type="text"
            placeholder="Name"
          />
        )}

        <input
          className=" px-4 py-3 bg-gray-600 mb-4 outline-none rounded-md"
          type="email"
          placeholder="Email"
        />
        <input
          className=" mb-8  rounded-md bg-gray-600 py-3 px-4 outline-none"
          type="password"
          placeholder="Password"
        />
        <button className=" text-white bg-red-600 py-2 rounded-md text-xl mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className=" text-gray-400">
          {isSignInForm ? "New to Netflix? " : "Already Registered? "}
          <span
            className=" text-white cursor-pointer"
            onClick={() => {
              setIsSignInForm(!isSignInForm);
            }}
          >
            {isSignInForm ? "Sign Up Now" : "Sign In Now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
