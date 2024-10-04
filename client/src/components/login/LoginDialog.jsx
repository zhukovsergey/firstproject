import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atom/userAtom";

const LoginDialog = ({
  showLoginDialog,
  setShowLoginDialog,
  setShowRegisterDialog,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useRecoilState(userAtom);
  const submitLoginForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast({
          title: "Успешно",
          description: "Вы успешно вошли на сайт",
        });
        console.log(res.data);
        setUser(res.data.user);
        setShowLoginDialog(false);
      }
    } catch (error) {
      console.log(error);

      toast({
        title: "Ошибка",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Страница входа на сайт</DialogTitle>
            <DialogDescription>
              Заполните поля для входа на сайт
            </DialogDescription>
            <form className="flex flex-col space-y-4">
              <Label>Email</Label>
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                name="email"
                autoComplete="email"
              />
              <Label className="text-md">Пароль</Label>
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                name="password"
                autoComplete="current-password"
              />

              <Button
                onClick={(e) => submitLoginForm(e)}
                className="mt-4 w-full text-lg "
              >
                Войти
              </Button>
            </form>
            <span
              onClick={() => {
                setShowLoginDialog(false);
                setShowRegisterDialog(true);
              }}
              className="text-center text-lg cursor-pointer underline"
            >
              У вас нет аккаунта? ЗАРЕГИСТРИРОВАТЬСЯ
            </span>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
