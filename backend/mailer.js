require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yoo.phil92@gmail.com',
    pass: process.env.GMAIL_PASS,
  },
});

const mailOptions = {
  from: 'yoo.phil92@gmail.com',
  to: 'yoo.phil92@gmail.com',
  subject: 'Testing NodeMailer',
  text: 'That was easy peassy'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent:', info.response);
  }
});