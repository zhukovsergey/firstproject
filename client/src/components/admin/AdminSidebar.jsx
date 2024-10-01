import React from "react";
import { LuLayoutPanelTop } from "react-icons/lu";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col gap-2 h-screen">
      <h1 className="text-2xl text-indigo-500 inline-flex justify-center gap-2 items-center">
        <LuLayoutPanelTop />
        Панель
      </h1>
      <div>Все записи</div>
    </div>
  );
};

export default AdminSidebar;
