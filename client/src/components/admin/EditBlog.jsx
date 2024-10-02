import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import EditorJS from "@editorjs/editorjs";
import { tools } from "@/components/editor/tools";
import { translate } from "@/components/editor/translate";
import { useRecoilState } from "recoil";
import { editableBlogAtom } from "@/recoil/atom/editableBlogAtom";

const EditBlog = ({ showEdit, setShowEdit, editableBlog }) => {
  const [blog, setBlog] = useState([]);
  const [editor, setEditor] = useState();
  const [content, setContent] = useState([]);
  const [editableBlogFromAtom, setEditableBlogFromAtom] =
    useRecoilState(editableBlogAtom);
  useEffect(() => {
    const getBlogBySlug = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/blog/${editableBlog}`
        );

        setBlog(res.data.blog);
        setContent(res.data.blog.content);
        setEditor(
          new EditorJS({
            holder: "editor",
            data: {
              blocks: editableBlogFromAtom.content,
            },

            placeholder: "Начните писать...",
            tools: tools,
            i18n: translate,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (editableBlog && showEdit) {
      getBlogBySlug();
    }
  }, [editableBlog]);

  return (
    <div>
      <Dialog open={showEdit} onOpenChange={(open) => setShowEdit(open)}>
        <DialogContent className="flex  flex-col gap-4 px-[100px] overflow-auto sm:max-w-lg md:h-[900px] md:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Редактирование статьи</DialogTitle>
            <DialogDescription>{blog.title}</DialogDescription>
          </DialogHeader>
          <Label>Заголовок</Label>
          <Input defaultValue={blog.title} placeholder="Название" />
          <Label>Описание</Label>
          <Input defaultValue={blog.description} placeholder="Описание" />
          <div id="editor" className="h-[400px] bg-white"></div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBlog;
