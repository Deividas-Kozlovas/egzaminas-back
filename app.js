const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const userRouter = require("./routes/userRouter");


app.use(express.json());
app.use("/api/v1/user", userRouter);


module.exports = app;