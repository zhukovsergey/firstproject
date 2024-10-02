import { Blog } from "../models/blog.model.js";
import { nanoid } from "nanoid";
import fs from "fs";
import sharp from "sharp";

import { translit } from "./../utils/translit.js";
import { User } from "../models/user.model.js";
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
    const { title, description, content, category } = req.body;

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

    const findBlogBySlug = await Blog.findOne({ slug: slug });
    const findBlogByTitle = await Blog.findOne({ title: title });

    if (findBlogBySlug || findBlogByTitle) {
      return res.status(400).json({
        success: false,
        message: "Блог с таким заголовком уже существует, поменяйте заголовок",
      });
    }

    const newBlog = new Blog({
      title,
      slug: slug.toLowerCase(),
      description,
      image: `/uploads/${id}/${newFileName}`,
      content,
      category,
    });

    await newBlog.save();
    res.status(201).json({ success: true, message: "Блог успешно создан" });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("category");
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log(error);
  }
};

export const topBlogs = async (req, res) => {
  try {
    const topBlogs = await Blog.find().sort({ views: -1 }).limit(5);
    res.status(200).json({ success: true, topBlogs });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    blog.views++;
    await blog.save();
    res.status(200).json({ success: true, blog });
    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "Запись не найдена" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findOne({ _id: id });
    if (user.role !== "admin") {
      return res.status(400).json({ success: false, message: "Вы не админ" });
    }
    console.log(user);

    const blog = await Blog.findOne({ slug: req.params.slug });
    console.log(blog);
    const folderName = blog.image.split("/").at(-2);
    const fileName = blog.image.split("/").at(-1);
    console.log(fileName + "filename");
    console.log(folderName + "folderName");
    fs.unlink(`./uploads/${folderName}/${fileName}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    setTimeout(() => {
      fs.readdir(`./uploads/${folderName}`, (err, files) => {
        if (err) throw err; // не прочитать содержимое папки
        console.log("В папке находятся файлы:" + files);
        if (files.length === 0) {
          fs.rmdir(`./uploads/${folderName}`, (err) => {
            if (err) throw err;
          });
        }
      });
    }, 1000);

    await blog.deleteOne();
    // fs.rmSync(`./uploads/${blog._id}`, { recursive: true });
    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "Запись не найдена" });
    }
    res.status(200).json({ success: true, message: "Запись удалена" });
  } catch (error) {
    console.log(error);
  }
};
