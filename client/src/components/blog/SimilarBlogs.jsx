import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
const SimilarBlogs = ({ blog }) => {
  const [simBlogs, setSimBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSimilarBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `http://localhost:3000/api/blog/similar/${blog.category}`,
          {
            blogId: blog._id,
          }
        );

        setSimBlogs(res.data.blogs);
        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };

    if (blog?.category) {
      getSimilarBlogs();
    }
  }, []);
  return (
    <div>
      <h3 className="text-center my-2">Советуем прочитать</h3>
      {/* skeleton */}
      {loading && (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-36 w-36 " />
          <div className="space-y-2">
            <Skeleton className="h-4 w-96 " />
            <Skeleton className="h-4 w-[100%]" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 items-center justify-start">
        {simBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      {/* skeleton */}
    </div>
  );
};

export default SimilarBlogs;
