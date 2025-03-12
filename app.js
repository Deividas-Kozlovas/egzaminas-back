const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const userRouter = require("./routes/userRouter");
const questionRouter = require("./routes/questionRouter");


app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/question", questionRouter);



module.exports = app;