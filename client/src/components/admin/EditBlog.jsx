import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import EditorJS from "@editorjs/editorjs";
import { tools } from "@/components/editor/tools";
import { translate } from "@/components/editor/translate";
import { useRecoilState } from "recoil";
import { editableBlogAtom } from "@/recoil/atom/editableBlogAtom";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "@/hooks/use-toast";

const EditBlog = ({
  showEdit,
  setShowEdit,
  editableBlog,
  setBlogsFromPage,
  blogsFrompage,
}) => {
  const [blog, setBlog] = useState([]);
  const [editor, setEditor] = useState();
  const [content, setContent] = useState([]);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    blogId: "",
    title: "",
    description: "",
    image: "",
    content: null,
    category: "",
  });

  const [editableBlogFromAtom, setEditableBlogFromAtom] =
    useRecoilState(editableBlogAtom);
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/category/getall", {
        withCredentials: true,
      });
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  fetchCategories();

  useEffect(() => {
    const getBlogBySlug = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/blog/${editableBlog}`
        );
        setBlog(res.data.blog);
        setContent(res.data.blog.content);
      } catch (error) {
        console.log(error);
      }
    };

    if (editableBlog && showEdit) {
      getBlogBySlug();
    }

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
  }, [editableBlog, editableBlogFromAtom, showEdit]);

  const saveBloghandler = async (e) => {
    e.preventDefault();

    try {
      if (editor.isReady) {
        const data = await editor.save();
        formData.content = data.blocks;
        formData.blogId = blog._id;
        const res = await axios.put(
          "http://localhost:3000/api/blog/editblog",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          console.log(res.data);
          setShowEdit(false);
          setBlogsFromPage((blogsFrompage) =>
            blogsFrompage.map((blog) => {
              if (blog._id === editableBlogFromAtom._id) {
                blog = res.data.blog;
                setEditableBlogFromAtom(res.data.blog);
              }
              return blog;
            })
          );
          /* blogsFrompage.map((blog) => {
            if (blog._id === editableBlogFromAtom._id) {
              blog = res.data.blog;
            }
          }); */

          toast({
            title: "Успешно",
            description: "Страница блога успешно обновлена",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={showEdit} onOpenChange={(open) => setShowEdit(open)} close>
        <DialogContent className="flex md:h-screen  flex-col gap-4 px-[100px] overflow-auto sm:max-w-lg md:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Редактирование записи</DialogTitle>
            <DialogDescription>{blog.title}</DialogDescription>
          </DialogHeader>
          <Label
            htmlFor="file"
            className="mx-auto flex flex-col items-center  cursor-pointer"
          >
            {blog.image && !preview && (
              <div className="mb-2">
                <img
                  src={`http://localhost:3000${blog.image}`}
                  alt="image"
                  className="w-full h-[300px] object-cover rounded-md"
                />
              </div>
            )}
            {!blog?.image && !preview && (
              <div>
                <FaImage size="60" className="text-center" />
              </div>
            )}

            {preview && (
              <img src={preview} alt="image" className="w-full h-[300px]" />
            )}

            <span className="text-center text-gray-500">
              Сменить изображение
            </span>
          </Label>
          <Input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFormData({ ...formData, image: e.target.files[0] });
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <Label>Заголовок</Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            name="title"
            defaultValue={blog.title}
            placeholder="Название"
          />
          <Label>Описание</Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            name="description"
            defaultValue={blog.description}
            placeholder="Описание"
          />
          <Select
            name="category"
            defaultValue={editableBlogFromAtom?.category?._id}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Категория" className="w-[220px]" />
            </SelectTrigger>
            <SelectContent className="w-[220px]">
              {categories.map((category, index) => (
                <SelectItem key={index} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div id="editor" className="bg-white "></div>
          <div className="w-full flex flex-col relative">
            <Button
              onClick={(e) => saveBloghandler(e)}
              className="mt-2 sticky bottom-0 cursor-pointer"
            >
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBlog;
