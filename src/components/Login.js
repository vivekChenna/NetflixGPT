import React, { useRef, useState } from "react";
import Header from "./Header";
import { APP_BG_URL } from "../utils/constants";
import { ValidateForm } from "../utils/validate";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsFillEyeSlashFill } from "react-icons/bs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const password = useRef(null);
  const email = useRef(null);
  const name = useRef(null);

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(password);
    console.log(email);

    const message = ValidateForm(password.current.value, email.current.value);
    setErrorMessage(message);

    if (message) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    // create a new user
    // keep the data of the user in the firebase

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, displayName, email } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                })
              );
              // ...
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("user already registered");
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          } else {
            setErrorMessage(errorCode + "-" + errorMessage);
          }
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/invalid-login-credentials") {
            setErrorMessage("Invalid email or password");
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          } else {
            setErrorMessage(errorCode + "-" + errorMessage);
          }
        });
    }
  };

  return (
    <div className="">
      <Header />
      <div className=" absolute">
        <img
          src={APP_BG_URL}
          alt="bg-img"
          className=" bg-center bg-opacity-50  h-screen w-screen"
        />
      </div>
      <form
        onSubmit={SubmitHandler}
        className=" flex flex-col bg-black absolute py-10  px-14 w-[440px] top-44 mx-auto right-0 left-0 bg-opacity-80"
      >
        <p className=" text-white text-4xl font-semibold mb-9">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </p>

        {isSignInForm ? null : (
          <input
            ref={name}
            className=" px-4 py-3 bg-gray-700 mb-4 outline-none rounded-md text-white"
            type="text"
            placeholder="Name"
          />
        )}

        <input
          ref={email}
          className=" px-4 py-3 bg-gray-700 mb-4 outline-none rounded-md text-white"
          type="email"
          placeholder="Email"
        />

        <div
          className={
            errorMessage
              ? " mb-3 max-w-full flex items-center justify-center pr-2 bg-gray-700 rounded-md"
              : " mb-7 max-w-full flex items-center justify-center pr-2  bg-gray-700 rounded-md"
          }
        >
          <input
            ref={password}
            className={
              "rounded-md bg-gray-700 py-3 px-4 outline-none text-white w-full"
            }
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />

          {showPassword ? (
            <BsFillEyeFill
              fontSize="1.5rem"
              color="gray"
              cursor="pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          ) : (
            <BsFillEyeSlashFill
              fontSize="1.5rem"
              color="gray"
              cursor="pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          )}
        </div>

        {errorMessage ? (
          <p className=" text-red-600 mb-2">{errorMessage}</p>
        ) : (
          ""
        )}
        <button className=" text-white bg-red-600 py-3 rounded-md text-[16px] font-semibold mb-6">
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
