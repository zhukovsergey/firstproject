import React, { useState } from "react";
import { getDay } from "@/common/date";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Comments = ({ comments }) => {
  console.log(comments);
  return (
    <div>
      {comments.map((comment, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 items-start mb-2 border-b-[1px] pb-4 border-b-gray-100"
        >
          <div className="flex items-center gap-2  ">
            <div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
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
      ))}
    </div>
  );
};

export default Comments;
