import { Blog } from "../models/blog.model.js";
import { nanoid } from "nanoid";
import fs from "fs";
import sharp from "sharp";

import { translit } from "./../utils/translit.js";
export const newblog = async (req, res) => {
  try {
    if (!req.id) {
      return res
        .status(400)
        .json({ success: false, message: "Пользователь не авторизован" });
    }
    const image = req.file;
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Файл не был загружен" });
    }
    const { title, description, content } = req.body;

    if (!title || !description || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Вы заполнили не все поля" });
    }

    const newFileName = `${Date.now()}-${image.originalname}`;
    const id = nanoid(4);
    fs.mkdirSync(`./uploads/${id}`, { recursive: true });
    await sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("webp")
      .toFile(`./uploads/${id}/${newFileName}`);

    const slug =
      translit(title)
        .replace(/[^a-zA-Z0-9]/g, " ")
        .replace(/\s+/g, "-")
        .toLowerCase()
        .trim() +
      "-" +
      nanoid(3);

    const newBlog = new Blog({
      title,
      slug: slug,
      description,
      image: `/uploads/${id}/${newFileName}`,
      content,
    });

    await newBlog.save();
    res.status(201).json({ success: true, message: "Блог успешно создан" });
  } catch (error) {
    console.log(error);
  }
};
