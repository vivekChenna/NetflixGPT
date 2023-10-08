import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NetflixLogo from "../utils/images/Netflix_Logo_PMS.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";

const Header = () => {
  const [showSignOut, setShowSignOut] = useState(false);

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    console.log("signout function called");
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        // after user sign up or sign in then navigate him/her to browse page
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        // after user is signed out then navigate to home page
        navigate("/");
      }
    });

    // this unsubscribe method is like an event listener therefore we have to remove it whenever header unmounts(unloads)
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <div className="absolute bg-gradient-to-b from-black z-10 py-2 px-5 w-full flex justify-between">
      <img src={NetflixLogo} alt="netflix-logo" className=" w-52" />
      {user && (
        <div className=" flex flex-col mt-4 mr-4 justify-center gap-2">
          <div className=" flex items-center">
            <p className=" text-xl font-bold px-2">{`Hye ,${user?.displayName}`}</p>
            <img
              src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
              alt="icon"
              className=" cursor-pointer  w-10"
              onClick={() => {
                setShowSignOut(!showSignOut);
              }}
            />
          </div>
          {showSignOut ? (
            <button
              className=" text-black text-lg font-bold hover:text-red-600"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Header;
