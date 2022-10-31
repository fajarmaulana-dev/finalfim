require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
      secure: false,
      auth: {
        user: "m.fajars.net",
        pass: process.env.PASS,
      },
      debug: false,
      logger: true,
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email telah terkirim");
  } catch (error) {
    console.log("Email gagal terkirim");
    console.log(error);
  }
};

module.exports = sendEmail;
