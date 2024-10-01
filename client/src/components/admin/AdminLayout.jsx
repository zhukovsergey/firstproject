import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atom/userAtom";

const AdminLayout = () => {
  const [user, setUser] = useRecoilState(userAtom);

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Доступ запрещен</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex">
      <div className="w-[250px]">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex bg-muted/40 p-6 md:px-8 md:py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
