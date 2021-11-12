const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const newEmail = {
    ...data,
    from: "",
  };
  try {
    await transporter.sendMail(newEmail);
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
