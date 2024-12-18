import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import EditorJS from "@editorjs/editorjs";
import { tools } from "@/components/editor/tools";
import { translate } from "@/components/editor/translate";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewBlogPage = () => {
  const ref = useRef();
  const [contentOfEditor, setContentOfEditor] = useState();
  const [editor, setEditor] = useState();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    content: null,
    category: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/category/getall",
          {
            withCredentials: true,
          }
        );
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    setEditor(
      new EditorJS({
        holder: "editor",
        placeholder: "Начните писать...",
        tools: tools,
        i18n: translate,
      })
    );
  }, []);

  const handlePublishEvent = async (e) => {
    e.preventDefault();
    try {
      if (editor.isReady) {
        const data = await editor.save();

        formData.content = data.blocks;
        console.log(formData);
        const res = await axios.post(
          "http://localhost:3000/api/blog/newblog",
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
            title: "Успешно",
            description: "Страница блога создана",
          });
        }
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

  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const preview = URL.createObjectURL(file);
    setPreview(preview);
    formData.image = file;
  };

  return (
    <>
      <div className="flex flex-col gap-4 mx-auto max-w-[900px] w-full ">
        <h1 className="text-center"> Создание страницы блога</h1>
        <div className="flex flex-col gap-4">
          <Label
            htmlFor="file"
            className="cursor-pointer mx-auto flex flex-col items-center gap-2 border-2 border-dashed p-4"
          >
            {preview && (
              <img
                className="w-[250px] rounded-md"
                src={preview}
                alt="preview"
              />
            )}
            <FaRegImage size={50} />
            <span>Нажмите для добавления главного фото</span>
          </Label>
          <Input
            ref={ref}
            id="file"
            name="file"
            onChange={(e) => {
              imageUploadHandler(e);
            }}
            className="hidden"
            placeholder="Главное фото записи"
            type="file"
            accept="image/*"
          />
          <Label>Название страницы</Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Название записи"
          />
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Короткое описание</Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Короткое описание"
          />
        </div>

        <div
          id="editor"
          className="font-gelasio min-h-screen   bg-white p-2"
        ></div>

        <Button onClick={handlePublishEvent}>Опубликовать</Button>
      </div>
    </>
  );
};

export default NewBlogPage;
