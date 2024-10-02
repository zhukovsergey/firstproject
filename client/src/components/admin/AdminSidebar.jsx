import React from "react";
import { LuLayoutPanelTop } from "react-icons/lu";
import { Link } from "react-router-dom";
import { TbLogs } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

const AdminSidebar = () => {
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
      </div>
    </div>
  );
};

export default AdminSidebar;
