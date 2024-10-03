import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userAtom } from "@/recoil/atom/userAtom";
import React from "react";
import { useRecoilState } from "recoil";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <div>
      <h1 className="text-center text-lg">
        Профиль пользователя: {user?.username}
      </h1>
      <div className="flex flex-col gap-2 items-center my-4">
        <Label
          htmlFor="file"
          className="cursor-pointer text-center mx-auto flex flex-col items-center"
        >
          <MdOutlinePhotoSizeSelectActual className="text-5xl text-gray-500" />
          <p className="text-sm text-gray-400">Изменить фото</p>
        </Label>
        <div className="flex flex-col gap-2 w-full">
          <input id="file" type="file" className="hidden" />
          <Label>Имя пользователя</Label>
          <Input defaultValue={user?.username} />
          <Label>Почта</Label>
          <Input defaultValue={user?.email} />
        </div>
        <Button className="mt-4">Сохранить</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
