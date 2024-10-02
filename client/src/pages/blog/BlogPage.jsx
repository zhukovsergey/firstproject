import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogContent from "@/components/blog/BlogContent";
import Helmet from "react-helmet";
const BlogPage = () => {
  const params = useParams();
  const [blog, setBlog] = useState({});
  const [content, setContent] = useState([]);

  useEffect(() => {
    const getBlogBySlug = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/blog/${params.slug}`
        );
        console.log(res);
        setBlog(res.data.blog);
        setContent(res.data.blog.content);
      } catch (error) {
        console.log(error);
      }
    };

    getBlogBySlug();
  }, [params.slug]);

  return (
    <>
      <Helmet>
        <title>{blog.title + " | Zhukovka"}</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content={`http://localhost:3000/${blog.image}`}
        />
        <meta property="og:site_name" content={"Zhukovka"} />
      </Helmet>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl mb-8">{blog?.title}</h1>
        <img
          src={`http://localhost:3000${blog.image}`}
          className="w-[600px] h-[500px] object-cover rounded-md hover:scale-105 transition-all duration-300"
          alt=""
        />
        {content.map((item, index) => (
          <BlogContent
            key={index}
            block={item}
            className="flex items-center justify-center"
          />
        ))}
      </div>
    </>
  );
};

export default BlogPage;
