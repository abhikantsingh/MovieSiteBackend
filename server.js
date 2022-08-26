const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AuthRoutes = require("./Routes/AuthRoute");
const BuyRouter =require("./Routes/buyRouter")

const { application } = require("express");

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/auth", AuthRoutes);
app.use("/event",BuyRouter);
// app.use("/quiz", QuizRouter);
// app.use("/leaderboard", LeaderBoardRouter);
// app.use("/movie",)
app.use((request, response, next) => {
  const err = new Error("Page Not found");
  err.status = 404;
  next(err);
});
app.use((error, request, response, next) => {
  let status = error.status || 422;
  response.status(status).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server up and running");
    });
  });
