import React from "react";
import logo from "../../assets/imgs/logo.png";
const Footer = () => {
  return (
    <div className="bg-slate-100 rounded-md flex justify-between px-10">
      <div>
        <img src={logo} className="w-[180px] mx-auto" />
      </div>
      <div>
        <img src={logo} className="w-[180px] mx-auto" />
      </div>
    </div>
  );
};

export default Footer;
