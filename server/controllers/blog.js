import { Blog } from "../models/blog.model.js";
import { nanoid } from "nanoid";
import fs from "fs";
import sharp from "sharp";

import { translit } from "./../utils/translit.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { Category } from "../models/category.model.js";
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
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Вы не выбрали категорию" });
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
    const blogs = await Blog.find()
      .populate("category")
      .sort({ createdAt: -1 });
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
    const blog = await Blog.findOne({ slug: req.params.slug }).populate({
      path: "comments",
      options: { sort: { commentedAt: -1 } },
    });

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

export const likePost = async (req, res) => {
  const slug = req.params.slug;
  try {
    const blog = await Blog.findOne({ slug: slug });
    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "Запись не найдена" });
    }
    if (blog.likes.includes(req.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Вы уже поставили лайк" });
    }
    if (blog.dislikes.includes(req.id)) {
      blog.dislikes.splice(blog.dislikes.indexOf(req.id), 1);
    }

    blog.likes.push(req.id);
    await blog.save();
    res
      .status(200)
      .json({ success: true, message: "Блог успешно отмечен", blog });
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (req, res) => {
  const slug = req.params.slug;
  try {
    const blog = await Blog.findOne({ slug: slug });
    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "Запись не найдена" });
    }
    if (blog.likes.includes(req.id)) {
      blog.likes.splice(blog.likes.indexOf(req.id), 1);
    }
    if (blog.dislikes.includes(req.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Вы уже поставили дизлайк" });
    }
    blog.dislikes.push(req.id);
    await blog.save();
    res.status(200).json({
      success: true,
      message: "Вы поставили дизлайк этой записи",
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCommentToBlog = async (req, res) => {
  const user = await User.findById(req.id);
  const { comment, blogId } = req.body;
  const blog = await Blog.findById(blogId);
  const newComment = await Comment.create({
    blog_id: blogId,
    comment: comment,
    commented_by: req.id,
    userName: user.username,
  });
  blog.comments.push(newComment._id);
  await blog.save();
  res
    .status(200)
    .json({ success: true, message: "Комментарий добавлен", newComment });
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

export const searchBlogs = async (req, res) => {
  console.log(req.body);
  const { searchValue } = req.body;
  try {
    const blogs = await Blog.find({
      title: { $regex: searchValue, $options: "i" },
    }).limit(10);
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log(error);
  }
};

export const editblog = async (req, res) => {
  try {
    const image = req.file;
    const { blogId, title, description, content, category } = req.body;
    const blog = await Blog.findOne({ _id: blogId }).populate("category");
    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not found" });
    }
    if (image && blog.image) {
      const folderName = blog.image.split("/").at(-2);
      const fileName = blog.image.split("/").at(-1);
      fs.unlink(`./uploads/${folderName}/${fileName}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
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

      blog.image = `/uploads/${id}/${newFileName}`;
    }
    console.log(blog);
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (content) blog.content = content;
    if (category) {
      Category.findOne({ _id: category }).then((cat) => {
        blog.category = cat._id;
        blog.categoryName = cat.name;
        blog.save();
      });
    }

    await blog.save();
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.log(error);
  }
};
