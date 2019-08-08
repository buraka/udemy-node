const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASS // generated ethereal password
  }
});

const sendWelcomeEmail = async (name, email) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Merhaba", // Subject line
    html: `<b> Merhaba ${name}, Hosgeldiniz...</b>` // html body
  });
}

const sendCancelationEmail = async (name, email) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Gule gule", // Subject line
    html: `<b> Merhaba ${name}, tekrar gorusmek dilegiyle...</b>` // html body
  });
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
};

// const sgMail = require('@sendgrid/mail');
//
// sgMail.setApiKey('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');
//
// const sendEmail = (name) => {
//   const msg = {
//     to: 'bburakalp@gmail.com',
//     from: 'bburakalp@gmail.com',
//     subject: 'Sending with Twilio SendGrid is Fun',
//     html: `<strong>${name} and easy to do anywhere, even with Node.js</strong>`,
//   };
//   sgMail.send(msg);
// }
//
// module.exports = sendEmail
