import React, { useEffect, useState } from "react";
import { SlLike, SlDislike, SlBubbles } from "react-icons/sl";
import { PiEyeLight } from "react-icons/pi";
import { userAtom } from "@/recoil/atom/userAtom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import CommentDialog from "./CommentDialog";
import Comments from "./Comments";
const SocialPanel = ({ blog, setBlog, setComments, comments }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  console.log(blog);
  useEffect(() => {
    if (blog?.likes?.includes(user?.id)) {
      setLiked(true);
      console.log("liked");
    }
    if (blog?.dislikes?.includes(user?.id)) {
      setDisliked(true);
      console.log("disliked");
    }
  }, [blog]);
  const likeHandler = async (blogData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/blog/like/" + blogData.slug,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setBlog(res.data.blog);
        setLiked(true);
        setDisliked(false);
        toast({
          title: "Успешно",
          description: "Вы поставили лайк",
          status: "success",
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: error.response.data.message,
        status: "error",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const dislikeHandler = async (blogData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/blog/dislike/" + blogData.slug,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setBlog(res.data.blog);
        setLiked(false);
        setDisliked(true);
        toast({
          title: "Успешно",
          description: "Вы поставили дизлайк",
          status: "success",
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: error.response.data.message,
        status: "error",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="mt-10 mb-4">
      <div className="flex gap-8 justify-between">
        <div className="flex gap-8">
          <div className="flex gap-2 items-center justify-center">
            {!liked ? (
              <SlLike
                size="1.5rem"
                onClick={() => likeHandler(blog)}
                className="text-gray-500 cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-full"
              />
            ) : (
              <BiSolidLike
                onClick={() => likeHandler(blog)}
                size="1.8rem"
                className="text-gray-500 cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-full"
              />
            )}

            {blog?.likes ? blog?.likes?.length : 0}
          </div>
          <div className="flex gap-2 items-center">
            {!disliked ? (
              <SlDislike
                onClick={() => dislikeHandler(blog)}
                size="1.5rem"
                className="text-gray-500 cursor-pointer "
              />
            ) : (
              <BiSolidDislike
                onClick={() => dislikeHandler(blog)}
                size="1.8rem"
                className="text-gray-500 cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-full"
              />
            )}

            {blog?.dislikes ? blog?.dislikes?.length : 0}
          </div>
          <div
            onClick={() => setShowCommentDialog(true)}
            className="flex gap-2 items-center relative cursor-pointer"
          >
            <div className="absolute -top-3 left-8 text-sm text-gray-500">
              Написать
            </div>
            <SlBubbles
              size="1.6rem"
              className="text-gray-500  cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-full"
            />
            {blog.comments ? blog?.comments?.length : 0}
          </div>
        </div>
        <div className="flex gap-2 tems-center">
          <PiEyeLight size="1.6rem" className="text-gray-500" />
          {blog?.views}
        </div>
      </div>
      <CommentDialog
        comments={comments}
        setComments={setComments}
        blog={blog}
        showCommentDialog={showCommentDialog}
        setShowCommentDialog={setShowCommentDialog}
      />
      <div></div>
    </div>
  );
};

export default SocialPanel;
