const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const User = require("../model/user");
const stripe = require("stripe")(
  "sk_test_51Hp8UIADAJ7Tatd8C9dGe2tS9NgNMAhVB1H7aYXLNLua0ossjDPFqPdAVxTeBgJKcLOGxKMAT4sAJ9tiMsCPEpUL00ecrfZuSr"
);
const uuid = require("uuid");
// import { v4 as uuidv4 } from "uuid";

exports.booktickets = (req, res, next) => {
  console.log("aagyaa");
  const { event, token, address, amount, state, city, postal_code, id } =
    req.body;
  console.log(id);
  const indempotencykey = uuid.v4();
  console.log(token);

  console.log("event", event);
  console.log("amount", amount);
  console.log("aagyaa");
  stripe.customers
    .create({
      email: token.email,
      source: token.id,
      address: {
        line1: address,
        postal_code: postal_code,
        city: city,
        state: state,
        country: "India",
      },
    })
    .then((customer) => {
      console.log(customer);

      return stripe.charges.create({
        amount: 100,
        currency: "INR",
        description: `Movie tickets`,
        customer: customer.id,
      });
    })
    .then((data) => {
      return res.status(200).json({
        msg: "created",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


