import React from "react";
import { Button } from "../ui/button";
import { CiLogin } from "react-icons/ci";
import { BiSlideshow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { useState } from "react";
import RegisterDialog from "../register/RegisterDialog";

const BlogHeader = () => {
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="px-[60px] flex flex-wrap justify-between items-center bg-gradient-to-r from-purple-500 to-pink-500 mx-6 mt-2 rounded-lg text-xl shadow-lg">
      <div>
        <img
          src={logo}
          onClick={() => navigate("/")}
          className="cursor-pointer w-[180px]"
        ></img>
      </div>
      <div>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/login")}
            variant="secondary"
            className="text-md inline-flex gap-2 bg-gray-300 hover:opacity-70 "
          >
            <BiSlideshow className="text-rose-700" />
            Шоу
          </Button>
          <Button
            onClick={() => setShowRegisterDialog(true)}
            variant="secondary"
            className="text-md inline-flex gap-2 bg-gray-300 hover:opacity-70 "
          >
            <CiLogin className="text-rose-700" />
            Войти
          </Button>
        </div>
        <RegisterDialog
          showRegisterDialog={showRegisterDialog}
          setShowRegisterDialog={setShowRegisterDialog}
        />
      </div>
    </div>
  );
};

export default BlogHeader;
