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

const notifyMe = (db) => {
  // grab all listings (date, title and link)
  // format the title like formatTitle
  // use that to join median table 
  // use respective median values to decide to send email or not
  // email should be formmated with date - title - link - price
  db.query(`
    SELECT link, price, median.median_value, date, title, listings.model
    FROM listings
    JOIN median ON median.model = listings.model
    WHERE
      blacklisted = false
    AND
      price < median.median_value - 150
    AND
      price > 800;
  `)
  .then((results) => {
    console.log('results', results.rows);
  })
  .catch((err) => console.log('err', err));
};

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });

module.exports = notifyMe;