const express = require("express");
const app = express();

// const userRouter = require("./routes/user.route");
const numbersRouter = require("./routes/numberRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/numbers", numbersRouter);

module.exports = app;
