const mongoose = require("mongoose");
const user = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Otp = require("../model/otp");
const SECRET_KEY = process.env.SECRET_KEY;
const Password = process.env.PASSWORD;
const Mailer = require("../helper/mailer");


exports.login = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const User = await user.findOne({ email });
    if (!User) {
      const error = new Error("User does not exist");
      error.status = 401;
      throw error;
    }
    if (await bcrypt.compare(password, User.password)) {
      const token = jwt.sign(
        {
          id: User._id,
          username: User.username,
        },
        SECRET_KEY
      );
      console.log(token);
      res.status(200).json({
        userId: User._id,
        data: token,
        message: "token send",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const pass = bcrypt.hashSync(password, 10);
  // console.log(pass);
  try {
    const data = await user.findOne({ email });
    if (data) {
      const error = new Error("User already exist");
      error.status = 401;
      throw error;
    }
    const User = await user.create({
      username: username,
      email: email,
      password: pass,
    });

    const token = jwt.sign(
      {
        id: User._id,
        username: User.username,
      },
      SECRET_KEY
    );
    res.status(200).json({
      userId: User._id,
      data: token,
      message: "token and id created",
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      const error = new Error("Email does not exist");
      error.status = 422;
      throw error;
    }
    const User = await user.findOne({ email });
    if (!User) {
      const error = new Error("User not found");
      error.status = 422;
      throw error;
    }
    Mailer.Mailer(email);

    res.status(200).json({
      email: email,
      message: "OTP send successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.passwordchange = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const User = await user.findOne({ email });

    const pass = req.body.password;
    const PASSWORD = bcrypt.hashSync(pass, 10);

    User.update(
      {
        info: "some new info",
        password: PASSWORD,
      },
      function (err, affected, resp) {
        console.log(resp);
      }
    );

    res.status(200).json({
      message: "Password change successfull",
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(otp);
  try {
    if (!otp) {
      const error = new Error("Invalid OTP");
      error.status = 401;
      throw error;
    }
    const OTP = await Otp.findOne({ otp });

    if (!OTP) {
      const error = new Error("Wrong OTP");
      error.status = 401;
      throw error;
    }

    await Otp.deleteOne({ _id: OTP._id });
    res.status(200).json({
      message: "OTP sent successfull",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
