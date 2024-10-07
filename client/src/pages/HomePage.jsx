import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import CarouselComponent from "@/components/blog/Carousel";
import RatingBlogs from "@/components/blog/RatingBlogs";
import logo from "../assets/imgs/logo.png";

import Helmet from "react-helmet";
import AnimationWrapper from "@/common/page-animation";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const res = await axios.get("http://localhost:3000/api/blog/getall");
      console.log(res.data);

      setBlogs(res.data.blogs);
    };

    getBlogs();
  }, []);
  return (
    <>
      <Helmet>
        <title>{"Статьи о корейских сериалах и шоу | Zhukovka"}</title>
        <meta
          name="description"
          content={"Статьи о корейских сериалах и шоу"}
        />
        <meta
          property="og:title"
          content={"Статьи о корейских сериалах и шоу"}
        />
        <meta
          property="og:description"
          content={"Статьи о корейских сериалах и шоу"}
        />
        <meta property="og:url" content={logo} />
        <meta property="og:site_name" content={"Zhukovka"} />
      </Helmet>
      <AnimationWrapper>
        <div className="flex flex-col flex-wrap gap-4 items-center justify-start w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 w-full ">
            {/*Топ статей*/}
            <div className="mx-2">
              <RatingBlogs />
            </div>
            <div className="col-span-2">
              <CarouselComponent blogs={blogs} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-center sm:justify-center md:justify-start">
            {blogs.map((blog) => (
              <BlogCard blog={blog} key={blog._id} />
            ))}
          </div>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default HomePage;
