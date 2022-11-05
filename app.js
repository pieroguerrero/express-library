/* eslint-disable no-unused-vars */
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import createError from "http-errors";
import logger from "morgan";
import { join } from "path";

import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { catalogRouter } from "./routes/catalog.js";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
//import { router } from "./routes/superCatalog.js";

export const app = express();
app.use(helmet());

//const __dirname = new URL(".", import.meta.url).pathname.substring(1);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Set up mongoose connection

const mongoDB =
  "mongodb+srv://library:sa1DgfsfbfCANa2s@cluster0.lnchkji.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoDB)
  .then((response) => {
    const db = mongoose.connection;
  })
  .catch((err) => {
    console.error.bind(console, "MongoDB connection error:");
  });

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);
//app.use("/catalog", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//export app;
