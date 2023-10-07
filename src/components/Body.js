import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        // after user sign up or sign in then navigate him/her to browse page
      } else {
        // User is signed out
        dispatch(removeUser());
    // after user is signed out then navigate to home page
    
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Body;
