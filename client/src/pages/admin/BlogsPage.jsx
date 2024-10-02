import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await axios.get("http://localhost:3000/api/blog/getall");
      console.log(res);
      setBlogs(res.data.blogs);
    };
    getBlogs();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 items-center justify-start">
      {blogs.map((blog, index) => (
        <div key={index}>
          <BlogCard blog={blog} admin={true} />
        </div>
      ))}
    </div>
  );
};

export default BlogsPage;