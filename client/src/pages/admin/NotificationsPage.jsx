import { userAtom } from "@/recoil/atom/userAtom";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { notificationsAtom } from "@/recoil/atom/notificationsAtom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const NotificationsPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);

  const notificationsDelete = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/notifications/readallnotifications",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setNotifications([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full relative">
      {notifications.length > 0 && (
        <div className="fixed bottom-5 right-5 bg-purple-500 text-white p-2 rounded-md cursor-pointer hover:bg-purple-600 font-bold">
          <span onClick={notificationsDelete} className="text-sm">
            Отметить все прочитанными
          </span>
        </div>
      )}

      <h1 className=" text-center text-xl text-indigo-500 ">
        Уведомления для пользователя {user?.username}
      </h1>

      {notifications.length === 0 && (
        <div className="text-center mt-2">
          <p className="text-lg text-gray-500">
            Уведомлений пока нет <span className="text-3xl">🙁 </span>
          </p>
        </div>
      )}

      {notifications.map((notification, index) => (
        <div key={index}>
          <div className="flex flex-wrap items-center justify-between">
            <span>Пользователь</span>
            <Avatar>
              <AvatarImage
                src={"http://localhost:3000/" + notification.user.image}
              />
              <AvatarFallback>
                {notification.user.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="ml-2  font-semibold text-indigo-500">
              {notification.user.username}
            </span>
            <span>
              {notification.type === "like" ? "лайкнул" : "прокомментировал"}{" "}
              запись{" "}
              <Link
                className="cursor-pointer font-semibold text-indigo-500"
                to={`/blog/${notification.blog.slug}`}
              >
                {notification.blog.title.slice(0, 26)} ...
              </Link>
            </span>
            <p className="text-lg text-gray-500">
              {notification.comment.comment.slice(0, 26)}{" "}
              {notification.comment.comment.length > 25 ? "..." : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
