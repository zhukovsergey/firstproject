import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

const RatingBlogs = () => {
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    const getTopBlogs = async () => {
      const res = await axios.get("http://localhost:3000/api/blog/top");
      setTopBlogs(res.data.topBlogs);
      console.log(res);
    };
    getTopBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-4  inline-flex justify-center gap-2 items-center">
        Топ статей <FaChartLine />
      </h1>
      <div className="flex-col gap-4 items-center justify-start">
        {topBlogs.map((blog, index) => (
          <div
            className="flex flex-col items-start justify-center"
            key={blog._id}
          >
            <Link to={`/blog/${blog.slug}`}>
              <div className="flex gap-4 items-center line-clamp-1 mb-4">
                <img
                  src={`http://localhost:3000` + blog.image}
                  className="w-12 h-12 object-cover rounded-full hover:scale-105 transition-all duration-300"
                />
                <span
                  className={` font-semibold ${
                    index == 0
                      ? "text-red-500 text-5xl"
                      : index == 1
                      ? "text-yellow-500 text-4xl"
                      : index === 2
                      ? "text-blue-500 text-3xl"
                      : index === 3
                      ? "text-green-500 text-2xl"
                      : ""
                  }`}
                >
                  {index + 1}.
                </span>
                {blog.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBlogs;