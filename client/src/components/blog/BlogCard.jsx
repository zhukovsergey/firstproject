import { getDay } from "@/common/date";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import EditBlog from "../admin/EditBlog";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { editableBlogAtom } from "@/recoil/atom/editableBlogAtom";
import { toast } from "@/hooks/use-toast";
import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/ru";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import SocialPanel from "./SocialPanel";
const BlogCard = ({ blog, admin, setBlogsFromPage, blogsFrompage }) => {
  const formatter = buildFormatter(frenchStrings);
  const [showEdit, setShowEdit] = useState(false);
  const [editableBlog, setEditableBlog] = useState([]);
  const [test, setTest] = useRecoilState(editableBlogAtom);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const editHandle = (e, slug, blog) => {
    e.preventDefault();
    setTest(blog);
    setEditableBlog(slug);
    setShowEdit(true);
  };

  const deleteBlogHandler = async (e, slug) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/blog/delete/${slug}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setShowDeleteDialog(false);
        toast({
          title: "Успешно",
          description: "Страница блога удалена",
        });
        window.location.reload();
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const countSymbols = (blog) => {
    let countSymbols = 0;
    blog?.content.forEach((item) => {
      if (item.type === "paragraph") {
        countSymbols += item.data.text.length;
      }
    });

    if (countSymbols < 300) {
      return <>1 минута на прочтение</>;
    }
    if (countSymbols > 300) {
      return <>2 минуты на прочтение</>;
    }
    if (countSymbols > 600) {
      return <>5 минут на прочтение</>;
    }
    if (countSymbols > 900) {
      return <>10 минут на прочтение</>;
    }
    if (countSymbols > 1200) {
      return <>15 минут на прочтение</>;
    }
    if (countSymbols > 1900) {
      return <>20 минут на прочтение</>;
    }
  };

  return (
    <>
      <Card className="flex w-full flex-col items-center justify-start gap-2 border relative p-2 border-gray-100">
        {admin && (
          <div className="absolute top-1 left-[80px] flex gap-6 items-center">
            <div className=" ">
              <RiDeleteBinLine
                onClick={(e) => setShowDeleteDialog(true)}
                className="text-xl cursor-pointer text-red-600 hover:scale-110"
              />
            </div>
            <div onClick={(e) => editHandle(e, blog.slug, blog)}>
              <CiEdit className="text-2xl cursor-pointer hover:scale-110" />
            </div>
          </div>
        )}

        <Link to={`/blog/${blog?.slug}`}>
          <CardHeader className="text-center text-xl h-[90px]  line-clamp-2 ">
            {blog?.title}
          </CardHeader>

          <div className="absolute top-1 right-1 flex items-center gap-2 justify-center">
            {!admin && (
              <div className="text-gray-400 text-xs">{countSymbols(blog)}</div>
            )}
            <FaRegEye className="text-gray-400 text-xs" />
            <span className="text-xs text-gray-400">{blog?.views}</span>
          </div>
          {blog?.category && (
            <div className="absolute rounded-lg left-1 top-1 p-1 bg-rose-300 text-white font-semibold text-xs">
              {blog?.category?.name}
            </div>
          )}

          <CardContent className="">
            <img
              src={`http://localhost:3000` + blog?.image}
              alt={blog?.title}
              className="object-cover mx-auto min-h-[350px] max-h-[350px] rounded-md hover:scale-105 transition-all duration-300"
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex flex-row items-center">
              <p className="text-sm line-clamp-3 h-[65px] my-2 flex-1">
                {blog?.description}
              </p>
              <hr className="h-[40px] w-[2px] border-gray-100 border-2 mx-2" />
              <p className="text-xs text-right text-gray-400 w-12">
                <TimeAgo date={blog?.createdAt} formatter={formatter} />
              </p>
            </div>
            <hr className="w-full border-gray-100 border-2" />
            <div className="flex justify-between  gap-2 w-full mt-2 -mb-2 text-gray-500">
              <div className=" flex gap-2 items-center text-lg ">
                <AiOutlineLike />{" "}
                <span className="text-sm"> {blog?.likes.length} </span>
              </div>
              <div className=" flex gap-2 items-center text-lg">
                <AiOutlineDislike />
                <span className="text-sm">{blog?.dislikes.length}</span>
              </div>
              <div className=" flex gap-2 items-center text-lg">
                <FaRegComments />{" "}
                <span className="text-sm">{blog?.comments.length}</span>
              </div>
            </div>
          </CardFooter>
        </Link>
      </Card>
      {admin && showEdit && (
        <EditBlog
          setBlogsFromPage={setBlogsFromPage}
          blogsFrompage={blogsFrompage}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editableBlog={editableBlog}
        />
      )}

      {showDeleteDialog && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowDeleteDialog(false)}
        >
          <div
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Вы уверены, что хотите удалить запись?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={(e) => deleteBlogHandler(e, blog.slug)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Да
              </button>
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
