import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import fs from "fs";
import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Вы заполнили не все поля" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Пользователь уже существует" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res
    .status(201)
    .json({ success: true, message: "Пользователь успешно создан" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    if (!user?.email) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, попробуйте еще раз" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.userName,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Успешный вход",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        username: user.username,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: "Произошла ошибка при входе" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    console.log(res.cookie);
    res.clearCookie("token");
    res.cookie("token", "", { maxAge: 0 });
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Вы вышли из аккаунта",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { username, email, userId } = req.body;
  const image = req.file;
  console.log(userId);
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Пользователь не найден" });
  }
  if (email) user.email = email;
  if (username) user.username = username;
  if (image) {
    if (user.image) {
      fs.unlinkSync(`.${user.image}`);
    }
    const newFileName = `${Date.now()}-${image.originalname}`;
    await sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("webp")
      .toFile(`./uploads/users/${newFileName}`);

    user.image = `/uploads/users/${newFileName}`;
  }

  await user.save();
  res.status(200).json({
    success: true,
    message: "Пользователь обновлен",
    user: {
      email: user.email,
      role: user.role,
      id: user._id,
      username: user.username,
      image: user.image,
    },
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" });
  res.status(200).json({ success: true, users });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Пользователь не найден" });
  }
  if (user.image) {
    fs.unlinkSync(`.${user.image}`);
  }
  const comments = await Comment.find({ commented_by: userId });
  console.log(comments);
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const blog = await Blog.findById(comment.blog_id);
    blog.comments = blog.comments.filter(
      (commentId) => commentId.toString() !== comment._id.toString()
    );
    await blog.save();
    await comment.deleteOne();
  }
  await user.deleteOne();
  res.status(200).json({ success: true, message: "Пользователь удален" });
};

export const editUserFromAdminPanel = async (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;
  console.log(userId, username, email);
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Пользователь не найден" });
  }
  if (username) user.username = username;
  if (email) user.email = email;
  await user.save();
  res.status(200).json({ success: true, message: "Пользователь обновлен" });
};
