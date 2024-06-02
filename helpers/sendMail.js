import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_COM_MAIL,
    pass: process.env.GMAIL_COM_PASSWORD,
  },
});

const sendMail = data =>
  transporter.sendMail({
    from: process.env.GMAIL_COM_MAIL,
    ...data,
  });

export default sendMail;
