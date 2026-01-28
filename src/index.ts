import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express(); //express实例
const PORT = process.env.PORT; 

app.use(express.json()); //解析json请求体
app.use("/api/auth", authRoutes); //挂载路由

//启动服务器 暴露端口 连接数据库
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
  connectDB(); //连接数据库
});
