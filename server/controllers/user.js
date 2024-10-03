import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Пользователь с таким Email не найден" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({ message: "Неверный пароль, попробуйте еще раз" });
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
