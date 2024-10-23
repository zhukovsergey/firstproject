import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import noPhoto from "../../assets/imgs/noPhoto.jpeg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineAddAPhoto } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CategoriesPage = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

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
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/category/newcategory",
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast({
          title: "Успешно",
          description: "Категория создана",
        });
        setShowAddCategoryModal(false);
        setFormData({});
        setCategories([...categories, res.data.category]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/category/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast({
          title: "Успешно",
          description: "Категория удалена",
        });
        setCategories(categories.filter((category) => category._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editCategoryHandle = async (e, category) => {
    e.preventDefault();
    setShowEditCategoryModal(true);
    setFormData(category);
  };
  const updateCategoryHandle = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.put(
        "http://localhost:3000/api/category/editcategory",
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
          description: "Категория обновлена",
        });
        setCategories(
          categories.map((category) =>
            category._id === res.data.category._id
              ? res.data.category
              : category
          )
        );
        setShowEditCategoryModal(false);
        setFormData({});
        setFile(null);
        setPreview(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative w-full h-screen flex  ">
      <div className="absolute top-1 right-1">
        <FaCirclePlus
          onClick={() => {
            setShowAddCategoryModal(true);
          }}
          className="text-3xl text-blue-500 hover:text-blue-700 cursor-pointer transition-all duration-300"
        />
      </div>

      <Dialog
        open={showAddCategoryModal}
        onOpenChange={setShowAddCategoryModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавление новой категории</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Label>Название</Label>
          <Input
            placeholder="Название категории"
            name="name"
            id="name"
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Button onClick={(e) => handleSubmit(e)}>Добавить</Button>
        </DialogContent>
      </Dialog>
      <div className="w-full">
        <h1 className="my-8 text-center mx-auto">Категории</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Номер</TableHead>
              <TableHead>Фото</TableHead>
              <TableHead>Название</TableHead>
              <TableHead className="">Редактировать</TableHead>
              <TableHead className="">Удалить</TableHead>
            </TableRow>
          </TableHeader>
          {categories.map((category, index) => (
            <TableBody key={category._id} className="">
              <TableRow>
                <TableCell className="font-medium">{index + 1}</TableCell>

                {category?.image && (
                  <TableCell>
                    <img
                      className="rounded-full w-[60px] h-[60px] object-cover"
                      src={"http://localhost:3000" + category?.image}
                      alt={category?.name}
                    />
                  </TableCell>
                )}
                {!category?.image && (
                  <TableCell>
                    <img
                      className="rounded-full w-[60px] h-[60px] object-cover"
                      src={noPhoto}
                      alt={category?.name}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <p className="text-lg w-[300px]">{category?.name}</p>
                </TableCell>
                <TableCell className=" mx-auto">
                  <MdOutlineModeEdit
                    size={30}
                    className="cursor-pointer text-gray-600 hover:text-blue-500"
                    onClick={(e) => editCategoryHandle(e, category)}
                  />
                </TableCell>
                <TableCell className="">
                  <MdDeleteOutline
                    className="text-3xl text-red-500 cursor-pointer"
                    onClick={(e) => handleDeleteCategory(e, category._id)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      <Dialog
        open={showEditCategoryModal}
        onOpenChange={setShowEditCategoryModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование категории {formData?.name}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Label htmlFor="image">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-[200px] h-[200px] object-cover rounded-md mx-auto"
              />
            ) : (
              <>
                {formData?.image && (
                  <img
                    src={`http://localhost:3000` + formData?.image}
                    alt="preview"
                    className="w-[200px] h-[200px] object-cover rounded-md"
                  />
                )}
              </>
            )}
            {!preview && !formData?.image && (
              <MdOutlineAddAPhoto
                size={60}
                className="mx-auto hover:text-gray-400 cursor-pointer transition-all duration-300"
              />
            )}
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFormData({ ...formData, image: e.target.files[0] });
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <Label>Название</Label>
          <Input
            placeholder="Название категории"
            name="name"
            id="name"
            type="text"
            defaultValue={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Button onClick={(e) => updateCategoryHandle(e)}>Обновить</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesPage;
