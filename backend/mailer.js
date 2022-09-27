require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yoo.phil92@gmail.com',
    pass: process.env.GMAIL_PASS,
  },
});

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
    const templateVars = { deals: results.rows };

    const sendEmail = async() => {
      const templatePath = path.join(__dirname + "/views/mail_deal.ejs");
      const mailHTML = await ejs.renderFile(templatePath, templateVars);

      const mailOptions = {
        from: 'yoo.phil92@gmail.com',
        to: 'yoo.phil92@gmail.com',
        subject: 'Scraper Alert',
        html: mailHTML,
      };


      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    if (results.rows.length > 0) {
      sendEmail();
    }
    
  })
  .catch((err) => console.log('err', err));
};

module.exports = notifyMe;