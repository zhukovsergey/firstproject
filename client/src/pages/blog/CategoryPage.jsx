import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import { Helmet } from "react-helmet";
import AnimationWrapper from "@/common/page-animation";

const CategoryPage = () => {
  const params = useParams();
  console.log(params);
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState({});

  const geyBlogsBySlug = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/blog/category/${params.slug}`
      );
      console.log(res.data.blogs);

      setBlogs(res.data.blogs);
      setCategory(res.data.category);
      console.log(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    geyBlogsBySlug();
  }, [params]);
  return (
    <>
      <Helmet>
        <title>{category?.name + " | Zhukovka"}</title>
        <meta name="description" content={category?.name} />
        <meta property="og:title" content={category?.name} />
        <meta property="og:description" content={category?.name} />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content={`http://localhost:3000/categories/${category?.image}`}
        />
        <meta property="og:site_name" content={"Zhukovka"} />
      </Helmet>
      <AnimationWrapper>
        <div className="relative">
          <h1 className="text-center my-2 mb-6 text-lg">{category?.name}</h1>
          {blogs.length > 0 ? (
            <p className="text-center my-2 mb-6 text-sm text-dark-grey absolute -top-1 right-1">
              Всего статей ({blogs.length})
            </p>
          ) : (
            <p className="text-center my-2 mb-6 text-base text-dark-grey">
              Нет статей
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4 items-center justify-start">
            {blogs.map((blog, index) => (
              <div key={index}>
                <BlogCard
                  blog={blog}
                  admin={true}
                  setBlogsFromPage={setBlogs}
                  blogsFrompage={blogs}
                />
              </div>
            ))}
          </div>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default CategoryPage;
