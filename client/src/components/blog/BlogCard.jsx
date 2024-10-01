import { getDay } from "@/common/date";
import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <>
      <div className="flex flex-col gap-3 border p-3 border-gray-100">
        <h2 className="text-center">{blog.title}</h2>
        <div className="">
          <img
            src={`http://localhost:3000` + blog.image}
            className="w-[300px] h-[200px] object-cover rounded-md hover:scale-105 transition-all duration-300"
          />
        </div>
        <p>{blog.description}</p>
        <p className="text-sm text-right text-gray-400">
          {getDay(blog.createdAt)}
        </p>
      </div>
    </>
  );
};

export default BlogCard;
