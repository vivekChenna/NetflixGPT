import React from "react";
import NetflixLogo from "../utils/images/Netflix_Logo_PMS.png";

const Header = () => {
  return (
    <div className="absolute bg-gradient-to-b from-black z-10 py-2 px-5">
      <img src={NetflixLogo} alt="netflix-logo" className=" w-48" />
    </div>
  );
};

export default Header;
