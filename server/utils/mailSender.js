const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Mind Mapping" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    });

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.log("❌ Error sending email:");
    console.log(error.message);
    throw error;
  }
};

module.exports = mailSender;
