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
import { CiShare2 } from "react-icons/ci";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  VKShareButton,
  VKIcon,
  TelegramShareButton,
  TelegramIcon,
  OKShareButton,
  OKIcon,
} from "react-share";
const SocialPanel = ({ blog, setBlog, setComments, comments }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  useEffect(() => {
    if (blog?.likes?.includes(user?.id)) {
      setLiked(true);
    }
    if (blog?.dislikes?.includes(user?.id)) {
      setDisliked(true);
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
            <span className="text-sm text-gray-500">
              {blog?.likes ? blog?.likes?.length : 0}
            </span>
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
            <span className="text-sm text-gray-500">
              {blog?.dislikes ? blog?.dislikes?.length : 0}
            </span>
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
            <span className="text-sm text-gray-500">
              {" "}
              {comments ? comments?.length : 0}
            </span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <PiEyeLight size="1.6rem" className="text-gray-500" />
          <span className="text-xs text-gray-500">{blog?.views}</span>

          <Popover>
            <PopoverTrigger>
              <CiShare2 size="1.6rem" className="text-gray-500" />
            </PopoverTrigger>
            <PopoverContent className="flex gap-4 justify-center">
              <VKShareButton
                url={`http://localhost:5173/blog/${blog?.slug}`}
                title={blog?.title}
                image={
                  "http://localhost:5173/uploads/BJqA/1729673975077-109296478-66553680-7841-11eb-9eab-a6063f634266.png"
                }
                className="Demo__some-network__share-button"
              >
                <VKIcon size={32} round />
              </VKShareButton>
              <TelegramShareButton
                url={window.location.href}
                title={blog?.title}
                className="Demo__some-network__share-button"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <OKShareButton
                url={window.location.href}
                title={blog?.title}
                className="Demo__some-network__share-button"
                image="http://localhost:5173/uploads/BJqA/1729673975077-109296478-66553680-7841-11eb-9eab-a6063f634266.png"
              >
                <OKIcon size={32} round />
              </OKShareButton>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <CommentDialog
        comments={comments}
        setComments={setComments}
        blog={blog}
        showCommentDialog={showCommentDialog}
        setShowCommentDialog={setShowCommentDialog}
      />
    </div>
  );
};

export default SocialPanel;
