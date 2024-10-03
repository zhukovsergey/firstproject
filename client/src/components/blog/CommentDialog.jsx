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
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atom/userAtom";
import { Link } from "react-router-dom";
import LoginDialog from "../login/LoginDialog";
import RegisterDialog from "../register/RegisterDialog";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const CommentDialog = ({
  showCommentDialog,
  setShowCommentDialog,
  blog,
  setComments,
  comments,
}) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [formData, setFormData] = useState({});

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/blog/addcomment",
        {
          blogId: blog._id,
          comment: formData.comment,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        setShowCommentDialog(false);
        setComments([res.data.newComment, ...comments]);
        toast({
          title: "Успешно",
          description: "Комментарий добавлен",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {user ? (
        <div>
          <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Форма добавления комментария</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <Label>Комментарий</Label>
              <Input
                placeholder="Комментарий"
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              />
              <Button onClick={(e) => commentSubmitHandler(e)}>
                Отправить
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Форма добавления комментария</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="text-xl font-bold">
                Для отправки комментария необходимо авторизоваться
                <div className="flex gap-4 mt-4">
                  <div
                    className="cursor-pointer bg-slate-400 text-white p-2 rounded-md hover:bg-slate-300 transition-all duration-300"
                    onClick={(e) => setShowLoginDialog(true)}
                  >
                    ВХОД если есть аккаунт
                  </div>
                  <div
                    className="cursor-pointer bg-slate-400 text-white p-2 rounded-md hover:bg-slate-300 transition-all duration-300"
                    onClick={(e) => setShowRegisterDialog(true)}
                  >
                    РЕГИСТРАЦИЯ
                  </div>
                </div>
              </div>
              <RegisterDialog
                showLoginDialog={showLoginDialog}
                setShowLoginDialog={setShowLoginDialog}
                setShowRegisterDialog={setShowRegisterDialog}
                showRegisterDialog={showRegisterDialog}
              />
              <LoginDialog
                showLoginDialog={showLoginDialog}
                setShowLoginDialog={setShowLoginDialog}
                setShowRegisterDialog={setShowRegisterDialog}
                showRegisterDialog={showRegisterDialog}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default CommentDialog;
