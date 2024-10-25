import React from "react";
import BlogHeader from "./BlogHeader";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./Footer";
import AnimationWrapper from "@/common/page-animation";
import ScrollToTop from "@/helpers/scrollToTop";

const BlogLayout = () => {
  return (
    <AnimationWrapper>
      <ScrollToTop />
      <div className=" min-h-screen flex flex-col">
        {/* Header */}
        <div className="">
          <BlogHeader />
        </div>

        {/* Outlet */}
        <div className="bg-[url('./assets/imgs/back.png')] flex-1 flex p-8 md:px-28 md:py-4  h-screen bg-gray-100 ">
          <div className="bg-white rounded-lg w-full p-4 shadow-lg">
            <Outlet />
            <Toaster />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </AnimationWrapper>
  );
};

export default BlogLayout;
