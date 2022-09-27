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

const notifyMe = (items) => {
  console.log('listings to email', items);
    const templateVars = { deals: items };

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

    if (items.length > 0) {
      sendEmail();
    } else {
      console.log('no listings worth emailing you about');
    }

  // db.query(`
  //   SELECT link, price, median.median_value, date, title, listings.model
  //   FROM listings
  //   JOIN median ON median.model = listings.model
  //   WHERE
  //     blacklisted = false
  //   AND
  //     price < median.median_value - 150
  //   AND
  //     price > 800;
  // `)
  // .then((results) => {
  //   console.log('listings to email', items);
  //   const templateVars = { deals: items };

  //   const sendEmail = async() => {
  //     const templatePath = path.join(__dirname + "/views/mail_deal.ejs");
  //     const mailHTML = await ejs.renderFile(templatePath, templateVars);

  //     const mailOptions = {
  //       from: 'yoo.phil92@gmail.com',
  //       to: 'yoo.phil92@gmail.com',
  //       subject: 'Scraper Alert',
  //       html: mailHTML,
  //     };

  //     await transporter.sendMail(mailOptions, (error, info) => {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log('Email sent:', info.response);
  //       }
  //     });
  //   }

  //   if (items.length > 0) {
  //     sendEmail();
  //   } else {
  //     console.log('no listings worth emailing you about');
  //   }
    
  // })
  // .catch((err) => console.log('err', err));
};

module.exports = notifyMe;