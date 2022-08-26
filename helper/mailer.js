const otpGenerator = require("otp-generator");
const otp = require("../model/otp");
const nodemailer = require("nodemailer");

exports.Mailer = async (email) => {
  // console.log(otp);
  let otpCode = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
  });
  const otpdata = await otp.create({
    email: email,
    otp: otpCode,
  });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhikantsingh29@gmail.com",
      pass: "mnmiemgavfmujcbc",
    },
  });

  var mailOptions = {
    from: "abhikantsingh29@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text:`Your OTP is = ${otpCode}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
