import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import CarouselComponent from "@/components/blog/Carousel";

const HomePage = () => {
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
    <div className="flex flex-col flex-wrap gap-4 items-center justify-start ">
      <div>
        <CarouselComponent blogs={blogs} />
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-start">
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
