import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const CategoriesPage = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);

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
        {categories.map((category, index) => (
          <div
            key={category._id}
            className="flex gap-6 items-center justify-start mb-4"
          >
            <h1 className="text-lg">{index + 1}</h1>
            <p className="text-lg w-[300px]">{category.name}</p>
            <p>
              <MdDeleteOutline
                className="text-3xl text-red-500 cursor-pointer"
                onClick={(e) => handleDeleteCategory(e, category._id)}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
