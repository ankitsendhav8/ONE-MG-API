"use strict";

/* eslint-disable no-console */
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'ankitsendhav8@gmail.com',
    pass: 'sendhav888#'
  }
});
const mailOptions = {
  from: 'ankitsendhav8@gmail.com',
  to: 'ajay.rathor@hiddenbrains.in',
  subject: 'Practice purpose',
  text: 'hello from tutorial'
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('email has been sent ', info.response);
  }
});