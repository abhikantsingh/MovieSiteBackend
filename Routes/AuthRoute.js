// const id="62f7853327510ea8e8823d0f";

const express = require("express");
const AuthController = require("../controller/AuthController");
const MovieController = require("../controller/MovieController")
const router = express.Router();
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/changepassword", AuthController.changePassword);
router.post("/verifyOtp", AuthController.verifyOtp);
router.post("/passwordchange", AuthController.passwordchange);
router.get("/movies",MovieController.Movies);
module.exports = router;
