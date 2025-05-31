import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path, { join } from "path";
import apiRouter from "../routers/api/index.js";
import pagesRouter from "../routers/pages/index.js";
import errorMiddleware from "../middlewares/error.middleware.js";

export const web = express();
web.set("proxy trust", true);
web.set("view engine", "ejs");
web.set("views", path.join("public/views"));
web.use("/", express.static("public/assets"));

web.use(cors());
web.use(cookieParser());
web.use(bodyParser.json());

web.use("/api", apiRouter);
web.use(pagesRouter);
web.use(errorMiddleware.NotFound);
web.use(errorMiddleware.ErrorHandler);
