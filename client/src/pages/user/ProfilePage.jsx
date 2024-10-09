import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userAtom } from "@/recoil/atom/userAtom";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/common/page-animation";
import defaultprofile from "../../assets/imgs/defaultprofile.png";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const submitProfileHandler = async (e) => {
    e.preventDefault();
    formData.image = image;
    formData.userId = user?.id;

    try {
      const res = await axios.put(
        "http://localhost:3000/api/user/edit/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast({
          title: "Профиль успешно обновлен",
          description: "Ваш профиль был успешно обновлен",
        });
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AnimationWrapper>
      <div>
        <h1 className="text-center text-lg">
          Профиль пользователя: {user?.username}
        </h1>
        <div className="flex flex-col gap-4 items-center my-4 px-2">
          <Label
            htmlFor="file"
            className="cursor-pointer text-center mx-auto flex flex-col items-center"
          >
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={previewImage || "http://localhost:3000" + user?.image}
                alt="avatar"
              />
              <AvatarFallback> {user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <p className="text-sm text-gray-400 mt-2">Изменить фото</p>
          </Label>
          <div className="flex flex-col gap-4 w-full">
            <input
              id="file"
              type="file"
              className="hidden"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <Label>Имя пользователя</Label>
            <Input
              defaultValue={user?.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
            <Label>Почта</Label>
            <Input
              defaultValue={user?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <Button className="mt-4" onClick={(e) => submitProfileHandler(e)}>
            Сохранить
          </Button>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default ProfilePage;
