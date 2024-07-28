import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/toDo.routes.js";
import { ApiError } from "./utils/apiError.utils.js";
import errorHandler from "./middleware/error.middleware.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("*", (req) => {
  throw new ApiError(404, `Can't find ${req.originalUrl} on the server`);
});

app.use(errorHandler);

export default app;
