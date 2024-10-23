import React, { useRef, useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { CiFaceSmile } from "react-icons/ci";

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
  const [formData, setFormData] = useState();
  const [comment, setComment] = useState("");
  const [choosenEmoji, setChoosenEmoji] = useState(null);

  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef(null);
  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/blog/addcomment",
        {
          blogId: blog._id,
          comment: comment,
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

  const onEmojiClick = (emojiObject, event) => {
    const cursorPosition = inputRef.current.selectionStart;
    console.log(cursorPosition);
    setComment(
      (prev) =>
        prev.slice(0, cursorPosition) +
        emojiObject.emoji +
        prev.slice(cursorPosition)
    );
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
              <div className="relative">
                <Input
                  ref={inputRef}
                  className="rounded-lg pr-8"
                  name="comment"
                  value={comment}
                  placeholder="Комментарий"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <CiFaceSmile
                  className="w-6 h-6 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowEmoji(!showEmoji)}
                />
              </div>
              <EmojiPicker
                open={showEmoji}
                categories={[
                  {
                    category: "smileys_people",
                    name: "Смайлы",
                  },
                ]}
                onEmojiClick={onEmojiClick}
                searchDisabled={true}
                emojiStyle={"apple"}
                skinTonesDisabled={true}
                emojiTooltip={true}
                lazyLoadEmojis={true}
                suggestedEmojisMode={"recent"}
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
