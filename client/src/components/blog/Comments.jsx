import React, { useEffect, useState } from "react";
import { getDay } from "@/common/date";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atom/userAtom";
import axios from "axios";
import { useParams } from "react-router-dom";
import AnimationWrapper from "@/common/page-animation";
import { CiCircleRemove } from "react-icons/ci";

const Comments = ({ comments, setComments }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const params = useParams();
  const [page, setPage] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/comments/allcomments/` + params.slug
        );
        if (res.data.success) {
          console.log(res.data);
          setComments(res.data.comments);
          setPage(res.data.page);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);

  const showMoreComments = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/comments/allcomments/` + params.slug,
        { page: page + 1 }
      );
      if (res.data.success) {
        setComments([...comments, ...res.data.comments]);
        if (res.data.comments.length < 10) setShowMoreButton(false);
        console.log(res.data);
        console.log(res.data.comments.length);
        setPage(res.data.page);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AnimationWrapper>
      <div>
        {comments.map((comment, index) => (
          <div
            key={index}
            className="group justify-between flex gap-4 items-start mb-2 border-b-[1px] pb-4 border-b-gray-100 hover:bg-gray-50"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2  ">
                <div>
                  <Avatar>
                    <AvatarImage
                      src={
                        `http://localhost:3000` + comment?.commented_by?.image
                      }
                    />
                    <AvatarFallback>
                      {comment?.userName?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-sm">{comment?.userName}</div>
                <div className="text-sm text-gray-500 text-left">
                  {getDay(comment?.commentedAt)}
                </div>
              </div>
              <div>
                <p>{comment.comment}</p>
              </div>
            </div>
            <div>
              {user?._id === comment?.commented_by?._id ||
                (user?.role === "admin" && (
                  <CiCircleRemove className="text-red-500 cursor-pointer text-3xl " />
                ))}
            </div>
          </div>
        ))}
        {showMoreButton && comments.length > 9 && (
          <div
            onClick={(e) => {
              showMoreComments(e);
            }}
            className="text-center cursor-pointer text-lg text-gray-500"
          >
            Показать еще...
          </div>
        )}
        {!showMoreButton && comments.length > 0 && (
          <div className="text-gray-500 text-center my-2">
            Все комментарии загружены
          </div>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default Comments;
