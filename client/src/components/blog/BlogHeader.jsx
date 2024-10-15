import React, { useEffect } from "react";
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
import { notificationsAtom } from "@/recoil/atom/notificationsAtom";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoMdNotificationsOutline } from "react-icons/io";

const BlogHeader = () => {
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);

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
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/category/getall");
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const searcheHandler = async (e) => {
    e.preventDefault();
    try {
      if (searchValue === "") {
        toast({
          title: "Поле поиска пустое",
          variant: "destructive",
        });
        return;
      }
      const res = await axios.post("http://localhost:3000/api/blog/search", {
        searchValue,
      });
      if (res.data.success) {
        setSearchedBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getNotificationsForUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/notifications/getallnotifications",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      const timer = setInterval(() => {
        getNotificationsForUser();
      }, 25000);
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <div className="px-[60px] gap-4 flex flex-wrap sm:gap-6 justify-between items-center bg-gradient-to-r from-purple-500 to-pink-500 mx-6 mt-2 rounded-lg text-xl shadow-lg py-4">
      <div>
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="cursor-pointer w-[180px]"
        ></img>
      </div>
      <div className="flex gap-4 grow ">
        <div className="inline-flex items-center flex-1 flex-grow justify-center space-x-2 relative max-w-[800px] mx-auto">
          <Input
            type="email"
            placeholder="что искать..."
            className="md:w-full sm:w-[200px]"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button type="submit" onClick={(e) => searcheHandler(e)}>
            Поиск
          </Button>
          {searchedBlogs.length > 0 && (
            <Popover
              open={searchedBlogs.length > 0}
              onOpenChange={() => {
                setSearchedBlogs([]);
                setSearchValue("");
              }}
            >
              <PopoverTrigger></PopoverTrigger>
              <PopoverContent className="md:w-[500px] sm:w-[350px] absolute top-6 -left-[370px] md:-left-[600px] sm:-left-[370px] xl:w-[600px] xl:-left-[650px] xs:w-[250px] xs:-left-[350px]">
                <div className="flex flex-col gap-2">
                  {searchedBlogs.map((blog, index) => (
                    <div key={index}>
                      <button
                        className="w-full flex justify-start gap-2 items-center hover:bg-gray-50 p-2 rounded-md hover:font-semibold hover:px-4 transition-all duration-300 text-lg"
                        key={blog._id}
                        onClick={() => {
                          navigate(`/blog/${blog.slug}`);
                          setSearchedBlogs([]);
                          setSearchValue("");
                        }}
                      >
                        <Avatar>
                          <AvatarImage
                            src={`http://localhost:3000` + blog?.image}
                            alt="blog image"
                          />
                          <AvatarFallback>
                            {blog.title[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {blog.title}
                      </button>
                      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-md mb-2 bg-purple-700 text-white rounded-md text-base font-bold p-3 hover:bg-purple-800">
              Категории
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem
                  onClick={() => {
                    navigate(`/category/${category.slug}`);
                  }}
                  key={category._id}
                  className="flex gap-2 items-center justify-start cursor-pointer min-w-[200px]"
                >
                  <Avatar className="w-7 h-6">
                    <AvatarImage
                      src={`http://localhost:3000` + category?.image}
                      alt="category image"
                    />
                    <AvatarFallback>
                      {category.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div> {category.name}</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {!user?.email && (
            <button
              onClick={() => setShowLoginDialog(true)}
              variant="secondary"
              className="flex gap-2 items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              <CgProfile className="text-white" />
              Вход
            </button>
          )}
          {user?.email && (
            <>
              <button
                onClick={() => logout(user)}
                type="button"
                className="flex gap-2 items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Выйти
                <TbLogout2 />
              </button>

              <Avatar
                className="ml-6 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={() => navigate("/user/profile")}
              >
                <AvatarImage
                  className=" rounded-full"
                  src={`http://localhost:3000` + user?.image}
                />
                <AvatarFallback> {user?.username?.slice(0, 2)}</AvatarFallback>
              </Avatar>

              {user?.role === "admin" && (
                <>
                  <Button
                    onClick={() => navigate("/admin/create-blog")}
                    variant="icon"
                    className=""
                  >
                    <LuLayoutPanelLeft
                      size="34"
                      className="text-white cursor-pointer hover:rotate-180 transition-all duration-300"
                    />
                  </Button>
                  <Button
                    onClick={() => navigate("/admin/notifications")}
                    variant="icon"
                    className="relative inline-flex items-center"
                  >
                    <IoMdNotificationsOutline
                      size="34"
                      className="text-xl text-white"
                    />

                    {notifications?.length > 0 && (
                      <span className="absolute top-0 right-2 p-2 w-3 h-3 bg-red-500 rounded-full text-white flex items-center justify-center text-xs">
                        {notifications?.length}
                      </span>
                    )}
                  </Button>
                </>
              )}
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
