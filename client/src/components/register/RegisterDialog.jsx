import React from "react";
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

const RegisterDialog = ({ showRegisterDialog, setShowRegisterDialog }) => {
  return (
    <div>
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Страница регистрации</DialogTitle>
            <DialogDescription>
              Заполните поля для регистрации на сайте
            </DialogDescription>
            <form>
              <Label className="text-md">Логин</Label>
              <Input type="text" name="username" autoComplete="username" />
              <Label>Email</Label>
              <Input type="email" name="email" autoComplete="email" />
              <Label className="text-md">Пароль</Label>
              <Input
                type="password"
                name="password"
                autoComplete="current-password"
              />
              <Button className="mt-4 w-full text-lg ">
                Зарегистрироваться
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterDialog;
