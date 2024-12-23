import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import videoRouter from "./routes/video.route.js"
import commentRouter from './routes/comment.route.js'

app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
export default app;
