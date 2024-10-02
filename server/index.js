import express, { urlencoded } from "express";
import cors from "cors";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import sharp from "sharp";
import mongoose from "mongoose";
import dotenv from "dotenv";
import upload from "./middlewares/multer.js";
import fs from "fs";
import { nanoid } from "nanoid";
import blogRoute from "./routes/blog.js";
import categoryRoute from "./routes/category.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/category", categoryRoute);
app.use("/uploads", express.static("uploads"));

//upload files from wysywig

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
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

    return res.json({ url: `/uploads/${id}/${newFileName}` });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/deletefile", async (req, res) => {
  const { url } = req.body;
  const folderName = url.split("/").at(-2);
  const fileName = url.split("/").at(-1);
  console.log(fileName + "filename");

  await fs.unlink(`./uploads/${folderName}/${fileName}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  await fs.readdir(`./uploads/${folderName}`, (err, files) => {
    if (err) throw err; // не прочитать содержимое папки
    console.log("В папке находятся файлы:" + files);
    if (files.length === 0) {
      fs.rmdir(`./uploads/${folderName}`, (err) => {
        if (err) throw err;
      });
    }
  });

  console.log(url);
});
