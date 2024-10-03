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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
const BlogCard = ({ blog, admin }) => {
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

  return (
    <>
      <Card className="flex flex-col items-center justify-start gap-3 border relative p-3 border-gray-100">
        {admin && (
          <div className="absolute top-1 left-[70px] flex gap-6 items-center">
            <div className=" ">
              <RiDeleteBinLine
                onClick={(e) => setShowDeleteDialog(true)}
                className="text-2xl cursor-pointer text-red-600 hover:scale-110"
              />
            </div>
            <div onClick={(e) => editHandle(e, blog.slug, blog)}>
              <CiEdit className="text-3xl cursor-pointer hover:scale-110" />
            </div>
          </div>
        )}

        <Link to={`/blog/${blog.slug}`}>
          <CardHeader className="text-center text-xl h-[90px] w-[380px] line-clamp-2">
            {blog.title}
          </CardHeader>

          <div className="absolute top-1 right-1 flex items-center gap-1 justify-center">
            <FaRegEye className="text-gray-400 text-xl" />
            <span className="text-sm text-gray-400">{blog.views}</span>
          </div>
          {blog.category && (
            <div className="absolute rounded-lg left-1 top-1 p-1 bg-rose-300 text-white font-semibold text-sm">
              {blog?.category?.name}
            </div>
          )}

          <CardContent className="">
            <img
              src={`http://localhost:3000` + blog.image}
              className="w-[380px] h-[300px] object-cover rounded-md hover:scale-105 transition-all duration-300"
            />
          </CardContent>
          <CardFooter className="flex">
            <p className="text-sm line-clamp-3 w-[300px] h-[65px] my-2">
              {blog.description}
            </p>
            <hr className="h-[40px] w-[2px] border-gray-100 border-2 mx-2" />
            <p className="text-sm text-right text-gray-400 ">
              {getDay(blog.createdAt)}
            </p>
          </CardFooter>
        </Link>
      </Card>
      {admin && showEdit && (
        <EditBlog
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
