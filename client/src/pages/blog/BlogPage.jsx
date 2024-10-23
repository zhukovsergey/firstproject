import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogContent from "@/components/blog/BlogContent";
import Helmet from "react-helmet";
import { useScroll, motion } from "framer-motion";
import SocialPanel from "@/components/blog/SocialPanel";
import AnimationWrapper from "@/common/page-animation";
import Comments from "@/components/blog/Comments";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPage = () => {
  const box = useRef();

  const params = useParams();

  const [blog, setBlog] = useState({});
  const [content, setContent] = useState([]);
  const { scrollY, scrollYProgress } = useScroll();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlogBySlug = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/blog/${params.slug}`
        );
        console.log(res.data.blog);
        setBlog(res.data.blog);
        setContent(res.data.blog.content);
        setComments(res.data.blog.comments);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getBlogBySlug();
  }, [params.slug]);

  return (
    <div className="mainElement">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <Helmet>
        <title>{blog?.title + " | Zhukovka"}</title>
        <meta name="description" content={blog?.description} />
        <meta property="og:title" content={blog?.title} />
        <meta property="og:description" content={blog?.description} />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content={`http://localhost:3000/${blog?.image}`}
        />
        <meta property="og:site_name" content={"Zhukovka"} />
      </Helmet>
      <AnimationWrapper>
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-3 ">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-[250px] w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4] w-[350px] my-2 py-2 mx-2 px-2" />
              <Skeleton className="h-4] w-[300px] my-2 py-2 mx-2 px-2" />
              <Skeleton className="h-4] w-[250px] my-2 py-2 mx-2 px-2" />
            </div>
          </div>
        )}
        {!loading && (
          <div className="flex flex-col items-center justify-center px-10">
            <h1 className="text-center text-2xl mb-8">{blog?.title}</h1>
            <img
              src={`http://localhost:3000${blog?.image}`}
              className="my-10 w-[600px] h-[500px] object-cover rounded-md hover:scale-105 transition-all duration-300"
              alt=""
            />
            {content.map((item, index) => (
              <div
                className="px-[50px] md:px-[30px] sm:px-[20px] lg:px-[50px]"
                key={index}
              >
                <BlogContent
                  block={item}
                  className="flex items-center justify-center "
                />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="mx-[50px] md:mx-[50px] sm:mx-[20px] lg:mx-[90px] ">
            <SocialPanel
              blog={blog}
              setBlog={setBlog}
              setComments={setComments}
              comments={comments}
            />
          </div>
        )}
        {!loading && <h3 className="text-center">Комментарии</h3>}

        {comments.length == 0 && (
          <div className="text-center mt-4 text-gray-400">Нет комментариев</div>
        )}
        <div className="flex flex-col mx-[200px] md:mx-[80px] sm:mx-[20px] lg:mx-[100px]">
          <Comments comments={comments} setComments={setComments} />
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default BlogPage;
