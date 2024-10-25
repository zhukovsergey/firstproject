import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import CarouselComponent from "@/components/blog/Carousel";
import RatingBlogs from "@/components/blog/RatingBlogs";
import logo from "../assets/imgs/logo.png";

import Helmet from "react-helmet";
import AnimationWrapper from "@/common/page-animation";
import CategoryCard from "@/components/blog/CategoryCard";
import { TbCategory2 } from "react-icons/tb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopCommentsBlogs from "@/components/blog/TopCommentsBlogs";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

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
    const getBlogs = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/blog/getall");
      console.log(res.data);

      setBlogs(res.data.blogs);
      setLoading(false);
    };
    getAllCategories();
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
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            ></div>
          </div>
        ) : null}
        <div className="flex flex-col flex-wrap gap-4 items-center justify-start w-full">
          <div className="grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
            {/*Топ статей*/}
            <div className="mx-2 md:col-span-2 lg:col-span-1 col-span-1 w-full text-center">
              <Tabs defaultValue="toprating" className="">
                <TabsList>
                  <TabsTrigger
                    value="toprating"
                    className="text-purple-400 font-semibold"
                  >
                    Топ по рейтингу
                  </TabsTrigger>
                  <TabsTrigger
                    value="topcomments"
                    className="text-purple-400 font-semibold"
                  >
                    Топ по комментариям
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="toprating">
                  <RatingBlogs />
                </TabsContent>
                <TabsContent value="topcomments">
                  <TopCommentsBlogs />
                </TabsContent>
              </Tabs>
            </div>
            <div className="lg:col-span-2 md:col-span-2 col-span-1">
              <CarouselComponent blogs={blogs} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold flex gap-2 items-center justify-center">
              <span>
                <TbCategory2 />
              </span>
              <span className="text-gray-500">Категории</span>
            </div>
            <div className="flex flex-wrap gap-4 my-4 text-gray-500">
              {categories.map((category) => (
                <CategoryCard category={category} key={category._id} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-center sm:justify-center md:justify-start">
            {blogs.map((blog, index) => (
              <Fragment key={blog._id}>
                {index < 12 ? <BlogCard blog={blog} key={blog._id} /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default HomePage;
