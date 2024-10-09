import React from "react";
import { LuLayoutPanelTop } from "react-icons/lu";
import { Link } from "react-router-dom";
import { TbLogs } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRecoilState } from "recoil";
import { notificationsAtom } from "@/recoil/atom/notificationsAtom";

const AdminSidebar = () => {
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);
  return (
    <div className="flex flex-col gap-2 h-screen">
      <h1 className="text-2xl text-indigo-500 inline-flex justify-center gap-6 items-center">
        <LuLayoutPanelTop />
        Панель
      </h1>
      <div className="flex flex-col items-center justify-start">
        <Link
          to="/admin/blogs"
          className="inline-flex justify-start gap-2 items-center hover:bg-gray-50 w-full p-2 rounded-md hover:font-semibold hover:px-4 transition-all duration-300 text-lg"
        >
          <TbLogs className="text-xl" />
          Все записи
        </Link>
        <Link
          to="/admin/create-blog"
          className="inline-flex justify-start gap-2 items-center hover:bg-gray-50 w-full p-2 rounded-md hover:font-semibold hover:px-4 transition-all duration-300 text-lg"
        >
          <FiPlusCircle className="text-xl" />
          Новая запись
        </Link>
        <Link
          to="/admin/categories"
          className="inline-flex justify-start gap-2 items-center hover:bg-gray-50 w-full p-2 rounded-md hover:font-semibold hover:px-4 transition-all duration-300 text-lg"
        >
          <BiCategory className="text-xl" />
          Категории
        </Link>
        <Link
          to="/admin/users"
          className="inline-flex justify-start gap-2 items-center hover:bg-gray-50 w-full p-2 rounded-md hover:font-semibold hover:px-4 transition-all duration-300 text-lg"
        >
          <FaUsers className="text-xl text-gray-600" />
          Пользователи
        </Link>
        <Link
          to="/admin/notifications"
          className="inline-flex justify-start gap-2 items-center hover:bg-gray-50 w-full p-2 rounded-md hover:font-semibold hover:px-4 transition-all duration-300 text-lg"
        >
          <div className="relative inline-flex items-center">
            <IoMdNotificationsOutline className="text-xl text-gray-600" />
            Уведомления
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 p-2 w-3 h-3 bg-red-500 rounded-full text-white flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
