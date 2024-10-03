import React from "react";
import BlogHeader from "./BlogHeader";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./Footer";

const BlogLayout = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      {/* Header */}
      <div className="">
        <BlogHeader />
      </div>

      {/* Outlet */}
      <div className="flex-1 flex bg-muted/40 p-8 md:px-28 md:py-4  h-screen bg-gray-100 ">
        <div className="bg-white rounded-lg w-full p-4 shadow-lg">
          <Outlet />
          <Toaster />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogLayout;
