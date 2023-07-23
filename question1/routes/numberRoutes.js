const express = require("express");
const numbersRouter = express.Router();
const { getNumbers } = require("../controllers/numberController");

numbersRouter.get("/", getNumbers);

module.exports = numbersRouter;
