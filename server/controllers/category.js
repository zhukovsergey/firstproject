import { Category } from "../models/category.model.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
  }
};
