import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.UKR_NET_MAIL,
    pass: process.env.UKR_NET_PASSWORD,
  },
});

const sendMail = data =>
  transporter.sendMail({
    from: process.env.UKR_NET_MAIL,
    ...data,
  });

export default sendMail;
