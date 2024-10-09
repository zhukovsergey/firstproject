import { Category } from "../models/category.model.js";
import sharp from "sharp";
import { translit } from "../utils/translit.js";
import { nanoid } from "nanoid";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const slug =
      translit(name)
        .replace(/[^a-zA-Z0-9]/g, " ")
        .replace(/\s+/g, "-")
        .toLowerCase()
        .trim() +
      "-" +
      nanoid(3).toLowerCase();

    const category = await Category.create({
      name,
      slug,
    });

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

export const updateCategory = async (req, res) => {
  const { _id, name } = req.body;
  const image = req.file;

  if (!_id) {
    return res
      .status(400)
      .json({ success: false, message: "ID не может быть пустым" });
  }
  try {
    const category = await Category.findOne({ _id });
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Категория не найдена" });
    }
    if (name) category.name = name;

    if (image) {
      const newFileName = `${Date.now()}-${image.originalname}`;
      await sharp(image.buffer)
        .resize({
          width: 800,
          height: 800,
          fit: "inside",
        })
        .toFormat("webp")
        .toFile(`./uploads/categories/${newFileName}`);
      category.image = `/uploads/categories/${newFileName}`;
    }

    await category.save();
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
  }
};
