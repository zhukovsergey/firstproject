import React from "react";
import { Button } from "../ui/button";
import { LuLayoutPanelLeft } from "react-icons/lu";

import { BiSlideshow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { useState } from "react";
import RegisterDialog from "../register/RegisterDialog";
import { CgProfile } from "react-icons/cg";
import LoginDialog from "../login/LoginDialog";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atom/userAtom";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const BlogHeader = () => {
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const logout = async (user) => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(null);
        toast({
          title: "Вы вышли из аккаунта",
        });
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
          {!user?.email && (
            <Button
              onClick={() => setShowLoginDialog(true)}
              variant="secondary"
              className="text-md inline-flex gap-2 bg-gray-300 hover:opacity-70 "
            >
              <CgProfile className="text-rose-700" />
              Вход
            </Button>
          )}
          {user?.email && (
            <>
              <Button
                onClick={() => logout(user)}
                className="text-md inline-flex gap-2 bg-gray-300 hover:opacity-70 "
                variant="secondary"
              >
                <TbLogout2 />
                Выйти
              </Button>
              <Button variant="icon" className="">
                <CgProfile size="30" className="text-white cursor-pointer" />
              </Button>
              <Button
                onClick={() => navigate("/admin/create-blog")}
                variant="icon"
                className=""
              >
                <LuLayoutPanelLeft
                  size="34"
                  className="text-white cursor-pointer"
                />
              </Button>
            </>
          )}
        </div>
        <RegisterDialog
          showRegisterDialog={showRegisterDialog}
          setShowRegisterDialog={setShowRegisterDialog}
        />
        <LoginDialog
          showRegisterDialog={showRegisterDialog}
          setShowRegisterDialog={setShowRegisterDialog}
          showLoginDialog={showLoginDialog}
          setShowLoginDialog={setShowLoginDialog}
        />
      </div>
    </div>
  );
};

export default BlogHeader;
