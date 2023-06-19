const express = require("express");
const path = require("path");
const rateLimit = require("express-rate-limit");
const toDoRouter = require("./routes/toDoRoutes");
const usersRouter = require("./routes/usersRoutes");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");

const AppError = require("./utils/appError");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP please try again in hour",
});
// app.use("/", limiter);
app.use(cookieParser());

app.use(express.json({ limit: "10 kb" }));
app.use("/todo", toDoRouter);
app.use("/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
